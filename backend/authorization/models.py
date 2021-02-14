from django.db import models
from django.contrib.auth.models import User

from pk_gen.app import pk_gen

# Create your models here.

class BankInfo(models.Model):
    user_id = models.EmailField()
    id = models.CharField(max_length=8, primary_key=True)
    bank_id = models.CharField(max_length=32)
    key = models.CharField(max_length=32)
    secret = models.CharField(max_length=32)

    def save(self, *args,**kwargs):
        if not self.pk:
            self.pk = pk_gen(BankInfo.objects.all(), 8)
        return super(BankInfo, self).save(*args, **kwargs)