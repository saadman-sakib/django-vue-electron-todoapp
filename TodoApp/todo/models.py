from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Task(models.Model):
	author = models.ForeignKey(User, on_delete=models.CASCADE)
	title = models.TextField()
	time = models.DateTimeField(default=timezone.now)
	is_done = models.BooleanField(default=False)