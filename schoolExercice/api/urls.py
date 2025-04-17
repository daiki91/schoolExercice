from django.urls import path
<<<<<<< HEAD
from .views import list_users, GetRoom, JoinRoom, RoomView, CreateRoomView

urlpatterns = [
    path('create-room/', CreateRoomView.as_view(), name='create-room'),
    path('rooms/', RoomView.as_view(), name='room-list'),
    path('users/', list_users),
    path('get-room/', GetRoom.as_view()),
    path('join-room/', JoinRoom.as_view()),
]
=======
from .views import RoomView,  CreateRoomView

urlpatterns = [
    path('room',RoomView.as_view(), name='room-list'),
    path('create-room/', CreateRoomView.as_view(), name='create-room'),
]
>>>>>>> ccf2c0db (Premier commit)
