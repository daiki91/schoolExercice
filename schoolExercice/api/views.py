from django.shortcuts import render
<<<<<<< HEAD
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import RoomSerializer, CreateRoomSerializer, CustomUserSerializer
from .models import Room, CustomUser


@api_view(['GET'])
def list_users(request):
    students = CustomUser.objects.filter(role='eleve')
    teachers = CustomUser.objects.filter(role='enseignant')

    data = {
        'students': CustomUserSerializer(students, many=True).data,
        'teachers': CustomUserSerializer(teachers, many=True).data,
    }
    return Response(data)



class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        # Récupérer le code de la salle depuis les paramètres GET
        code = request.GET.get(self.lookup_url_kwarg)
        if code is not None:
            # Rechercher la salle avec le code donné
            room = Room.objects.filter(code=code)
            if room.exists():
                # Si la salle existe, renvoyer les données sérialisées
                data = RoomSerializer(room[0]).data
                return Response(data, status=status.HTTP_200_OK)
            # Si la salle n'existe pas
            return Response({"Room Not Found": "Invalid code"}, status=status.HTTP_404_NOT_FOUND)
        # Si le code est manquant
        return Response({"Bad Request": "Code param missing"}, status=status.HTTP_400_BAD_REQUEST)

class JoinRoom(APIView):
    def post(self, request, format=None):
        # Obtenir le code de la salle à partir de la requête
        code = request.data.get("code")
        if code is not None:
            room = Room.objects.filter(code=code)
            if room.exists():
                # Si la salle existe, renvoyer une réponse de succès
                return Response({"message": "Room joined"}, status=status.HTTP_200_OK)
            # Si la salle n'existe pas
            return Response({"Bad Request": "Invalid Room Code."}, status=status.HTTP_404_NOT_FOUND)
        # Si le code n'est pas fourni
        return Response({"Bad Request": "Code not provided."}, status=status.HTTP_400_BAD_REQUEST)

class RoomView(generics.ListAPIView):
    # Afficher toutes les salles
=======
from rest_framework import generics
from .serializers import RoomSerializer,CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response


class RoomView(generics.ListAPIView):
>>>>>>> ccf2c0db (Premier commit)
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer
<<<<<<< HEAD
    
    def post(self, request, format=None):
        # Si la session n'existe pas, en créer une nouvelle
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key

            # Vérifier si une salle existe déjà pour l'hôte
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
            else:
                # Si aucune salle n'existe pour cet hôte, en créer une nouvelle
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()

            # Retourner les données sérialisées de la salle créée
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
=======
    def post(self,request,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data = request.data)

        if serializer.is_valid():
            guest_can_pause=serializer.data.get('guest_can_pause')
            votes_to_skip=serializer.data.get('votes_to_skip')
            host=self.request.session.session_key
            queryset= Room.objects.filter(host=host)
            if queryset.exists():
                room=queryset[0]
                room.guest_can_pause=guest_can_pause
                room.votes_to_skip=votes_to_skip
                room.save(update_fields=['guest_can_pause','votes_to_skip'])
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause,votes_to_skip=votes_to_skip)
                room.save()

            return Response(RoomSerializer(room).data, status=status.HTTP_201_Created)



>>>>>>> ccf2c0db (Premier commit)
