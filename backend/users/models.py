# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    
    # We use the built-in first_name and last_name from AbstractUser
    
    def __str__(self):
        return self.username