from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Product(models.Model):
    PRODUCT_CATAGORY = [
    ('EL', 'Mobile Phones'),
    ('HE', 'Headphones and Earbuds'),
    ('HK', 'Home & Kitchen'),
    ('LP', 'Laptops'),
    ('CM', 'Cameras'),
    ('OT', 'Others'),
   ]
    name = models.CharField(max_length=100)
    description = models.TextField(default='')
    type = models.CharField(max_length=2, choices=PRODUCT_CATAGORY, default='OT')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    is_available = models.BooleanField(default=True)
    model_number = models.CharField(max_length=50, default='N/A')
    image = models.ImageField(upload_to='products/')
    date_added = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

class ProductReview(models.Model):
  Product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  rating = models.IntegerField()
  comment = models.TextField()
  date_added = models.DateTimeField(default=timezone.now)

  def __str__(self):
    return f'{self.user.username} review for {self.Product.name}'


