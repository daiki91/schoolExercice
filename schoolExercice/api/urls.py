from django.urls import path
from .views import RoomView,  CreateRoomView

urlpatterns = [
    path('room',RoomView.as_view(), name='room-list'),
    path('create-room/', CreateRoomView.as_view(), name='create-room'),
]