from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('join', index),
<<<<<<< HEAD
    path('create', index),
    path('register', index),  
    path('login', index),  
    path('question', index),  
=======
    path('create', index)
>>>>>>> ccf2c0db (Premier commit)
]
