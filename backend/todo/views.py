from django.shortcuts import render
from rest_framework import serializers, viewsets
from .serializers import TodoSerializer
from .models import Todo
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.
class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List':'/todo-list/',
        'Detail View':'/todo-detail/<str:pk>/',
        'Create':'/todo-create/',
        'Update':'/todo-update/<str:pk>/',
        'Delete':'/todo-delete/<str:pk>/'
    }
    return Response(api_urls)

@api_view(['GET'])
def todoList(request):
    todo = Todo.objects.all()
    serializer = TodoSerializer(todo,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def todoDetail(request,pk):
    todo = Todo.objects.get(id=pk)
    serializer = TodoSerializer(todo,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def todoCreate(request):
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def todoUpdate(request,pk):
    todo = Todo.objects.get(id=pk)
    serializer = TodoSerializer(instance=todo,data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def todoDelete(request,pk):
    todo = Todo.objects.get(id=pk)
    todo.delete()
    return Response('Item successfully deleted!')