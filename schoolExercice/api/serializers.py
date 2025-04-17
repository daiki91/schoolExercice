from rest_framework import serializers
from .models import Room
<<<<<<< HEAD
from .models import CustomUser

=======
>>>>>>> ccf2c0db (Premier commit)

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
<<<<<<< HEAD
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at')
=======
        fields = ('id','code','host','guest_can_pause','votes_to_skip','created_at')

>>>>>>> ccf2c0db (Premier commit)


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
<<<<<<< HEAD
        fields = ('guest_can_pause', 'votes_to_skip')

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'role']
=======
        fields=('guest_can_pause','votes_to_skip')
>>>>>>> ccf2c0db (Premier commit)
