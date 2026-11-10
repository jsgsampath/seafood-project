from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = (
        ('fish', 'Fish'),
        ('seed', 'Seed'),
    )

    name = models.CharField(max_length=100)
    price = models.IntegerField()
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    image = models.URLField()

    def __str__(self):
        return self.name