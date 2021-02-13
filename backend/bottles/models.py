from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Message(models.Model):
    content = models.CharField(max_length=1024)
    created = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent")
    recipient = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE, related_name="recieved")
    lat = models.DecimalField(max_digits=20, decimal_places=15)
    long = models.DecimalField(max_digits=20, decimal_places=15)
    opened = models.BooleanField()
    tta = models.DurationField()
