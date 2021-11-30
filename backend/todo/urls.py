"""backend URL Configuration 

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from todo import views

urlpatterns = [
    path('api/',views.apiOverview,name="apiOverview"),

    path('todo-list/',views.todoList,name="todo-list"),
    path('todo-detail/<str:pk>/',views.todoDetail,name="todo-detail"),
    path('todo-create/',views.todoCreate,name="todo-create"),
    path('todo-update/<str:pk>/',views.todoUpdate,name="todo-update"),
    path('todo-delete/<str:pk>/',views.todoDelete,name="todo-delete"),

]