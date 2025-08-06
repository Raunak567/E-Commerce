from django.contrib import admin
from .models import Product , ProductReview

class ProductReviewInline(admin.TabularInline):
  model = ProductReview
  extra = 1

class ProductVarietyAdmin(admin.ModelAdmin):
  list_display = ('name', 'type', 'date_added')
  inlines = [ProductReviewInline]

admin.site.register(Product , ProductVarietyAdmin )