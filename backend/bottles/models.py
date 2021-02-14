from django.db import models
from django.contrib.auth.models import User

from pk_gen.app import pk_gen

# Create your models here.

class Message(models.Model):
    content = models.CharField(max_length=1024)
    created = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent",null=True)
    recipient = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE, related_name="recieved")
    lat = models.DecimalField(max_digits=20, decimal_places=15)
    long = models.DecimalField(max_digits=20, decimal_places=15)
    opened = models.BooleanField()
    tta = models.DurationField()
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True)
    can_reply = models.BooleanField(default=True)
    index = models.IntegerField(default=0)
    dm = models.BooleanField(default=False)
    id = models.CharField(max_length=8, primary_key=True)
    amount = models.IntegerField(default=0)

    def save(self, *args,**kwargs):
        if not self.pk:
            self.pk = pk_gen(Message.objects.all(), 8)
        return super(Message, self).save(*args, **kwargs)
