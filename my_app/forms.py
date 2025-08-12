from enum import unique
from pyexpat import model
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Product

class product_Form(forms.ModelForm):
    class Meta:
        model = Product
        fields = [
            'name',
            'description',
            'type',
            'price',
            'stock',
            'is_available',
            'image',
        ]
        labels = {
            'name': 'Product name',
            'description': 'Description',
            'type': 'Category',
            'price': 'Price (USD)',
            'stock': 'Stock quantity',
            'is_available': 'Available for sale',
            'image': 'Product image',
        }
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'input input-bordered w-full',
                'placeholder': 'Enter product name',
            }),
            'description': forms.Textarea(attrs={
                'class': 'textarea textarea-bordered w-full',
                'rows': 4,
                'placeholder': 'Write a short description',
            }),
            'type': forms.Select(attrs={
                'class': 'select select-bordered w-full',
            }),
            'price': forms.NumberInput(attrs={
                'class': 'input input-bordered w-full',
                'step': '0.01',
                'min': '0',
                'placeholder': '0.00',
            }),
            'stock': forms.NumberInput(attrs={
                'class': 'input input-bordered w-full',
                'min': '0',
                'placeholder': '0',
            }),
            'is_available': forms.CheckboxInput(attrs={
                'class': 'toggle toggle-primary',
            }),
            'image': forms.ClearableFileInput(attrs={
                'class': 'file-input file-input-bordered w-full',
            }),
        }

class registeration_Form(UserCreationForm):
    email = forms.EmailField(required=True)
    first_name = forms.CharField(max_length=30, required=True)
    last_name = forms.CharField(max_length=30, required=True)
    username = forms.CharField(max_length=30, required=True)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2')
