from rest_framework import serializers
from .models import Task
from django.contrib.auth.models import User


class TaskSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Task
        fields = ('id', 'title', 'author', 'time', 'is_done')
        read_only_fields = ('author',)