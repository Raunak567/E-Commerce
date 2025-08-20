from django.urls import path , include
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('shop/', views.shop, name='shop'),
    path('about/', views.about, name='about'),
    path('product/<int:product_id>/', views.product_detail, name='product_detail'),
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('admin-dashboard/delete/<int:product_id>/', views.admin_delete_product, name='admin_delete_product'),
    path('register/', views.register , name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('Home/shop/new/', views.Shop_now, name='shop_now'),
    path('Error-404/', views.working, name='working'),
    
    path("__reload__/", include("django_browser_reload.urls")),
]
