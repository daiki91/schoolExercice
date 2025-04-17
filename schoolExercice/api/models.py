from django.db import models
import string
import random
<<<<<<< HEAD
from django.contrib.auth.models import AbstractUser

def generate_unique_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if not Room.objects.filter(code=code).exists():
            break
    return code


class Room(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)



class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('eleve', 'Élève'),
        ('enseignant', 'Enseignant'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
=======


def generate_unique_code():
    length=6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase,k=length))
        if Room.object.filter(code=code).count()==0:
            break
    return code

# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length = 8, default=generate_unique_code,unique=True)
    host = models.CharField(max_length=50 , unique= True)
    guest_can_pause = models.BooleanField(null=False , default=False)
    votes_to_skip = models.IntegerField(null=False,default=1)
    created_at = models.DateTimeField(auto_now_add=True)


>>>>>>> ccf2c0db (Premier commit)
