from itertools import product
from django.contrib.auth import login, logout
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login
from django.db.models import Sum, Count
from .models import Product
from .forms import product_Form,registeration_Form
import random

def home(request):
    products = Product.objects.all().order_by('-date_added')
    # Pick one featured product per category (latest by date_added)
    featured_by_category = {}
    for code, _label in Product.PRODUCT_CATAGORY:
        featured_product = Product.objects.filter(type=code).order_by('-date_added').first()
        if featured_product:
            featured_by_category[code] = featured_product

    return render(request, 'store/Home.html', {
        'products': products,
        'featured_by_category': featured_by_category,
    })

def shop(request):
    type_filter = request.GET.get('type')
    products_qs = Product.objects.filter(is_available=True)
    if type_filter:
        products_qs = products_qs.filter(type=type_filter)

    products = products_qs.order_by('-date_added')

    # Build category metadata for the category grid
    counts_qs = Product.objects.filter(is_available=True).values('type').annotate(count=Count('id'))
    type_to_count = {row['type']: row['count'] for row in counts_qs}

    categories = []
    for code, label in Product.PRODUCT_CATAGORY:
        latest = Product.objects.filter(is_available=True, type=code).order_by('-date_added').first()
        cover_url = latest.image.url if latest and latest.image else ''
        categories.append({
            'code': code,
            'label': label,
            'count': type_to_count.get(code, 0),
            'cover_url': cover_url,
        })

    return render(request, 'store/shop.html', {
        'products': products,
        'type_choices': Product.PRODUCT_CATAGORY,
        'active_type': type_filter or '',
        'categories': categories,
    })

def Electronics_slider(request):
    products = list(Product.objects.filter(category__iexact='Headphones and Earbuds'))
    random.shuffle(products)
    return render(request, 'store/Home.html', {'products': products})

def Fashion_slider(request):
    products = list(Product.objects.filter(category__iexact='Headphones and Earbuds'))
    random.shuffle(products)
    return render(request, 'store/Home.html', {'products': products})

def Home_slider(request):
    products = list(Product.objects.filter(category__iexact='Headphones and Earbuds'))
    random.shuffle(products)
    return render(request, 'store/Home.html', {'products': products})

def Sports_slider(request):
    products = list(Product.objects.filter(category__iexact='Headphones and Earbuds'))
    random.shuffle(products)
    return render(request, 'store/Home.html', {'products': products})

def product_detail(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    type_label = dict(Product.PRODUCT_CATAGORY).get(product.type, 'Others')
    related_products = Product.objects.filter(is_available=True, type=product.type).exclude(id=product.id).order_by('-date_added')[:8]
    return render(request, 'store/product_detail.html', {
        'product': product,
        'type_label': type_label,
        'related_products': related_products,
    })

@login_required
def admin_dashboard(request):
    # Create product handling
    if request.method == 'POST':
        form = product_Form(request.POST, request.FILES)
        if form.is_valid():
            product = form.save()
            return redirect('product_detail', product_id=product.id)
    else:
        form = product_Form()

    # Filters & search
    search_query = request.GET.get('q', '').strip()
    type_filter = request.GET.get('type')
    availability_filter = request.GET.get('available')

    products_qs = Product.objects.all()
    if search_query:
        products_qs = products_qs.filter(name__icontains=search_query)
    if type_filter:
        products_qs = products_qs.filter(type=type_filter)
    if availability_filter in {"true", "false"}:
        products_qs = products_qs.filter(is_available=(availability_filter == "true"))

    products = products_qs.order_by('-date_added')

    # Metrics
    total_products = products_qs.count()
    total_stock = products_qs.aggregate(total=Sum('stock'))['total'] or 0
    available_products = products_qs.filter(is_available=True).count()
    unavailable_products = total_products - available_products

    context = {
        'form': form,
        'products': products,
        'search_query': search_query,
        'type_filter': type_filter or '',
        'availability_filter': availability_filter or '',
        'metrics': {
            'total_products': total_products,
            'total_stock': total_stock,
            'available_products': available_products,
            'unavailable_products': unavailable_products,
        },
        'type_choices': Product.PRODUCT_CATAGORY,
    }
    return render(request, 'admin/admin.html', context)

@login_required
def admin_delete_product(request, product_id):
    if request.method == 'POST':
        product = get_object_or_404(Product, id=product_id)
        product.delete()
    return redirect('admin_dashboard')

def register(request):
    if request.method == 'POST':
        form = registeration_Form(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password1'])
            user.save()
            login(request , user)
            return redirect('home')
        
    else:
        form = registeration_Form()
    return render(request, 'registration/register.html',{'form':form})

def logout_view(request):
    logout(request)
    return redirect('home')