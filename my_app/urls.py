from django.urls import path , include
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('product/<int:product_id>/', views.product_detail, name='product_detail'),

    path("__reload__/", include("django_browser_reload.urls")),
]
