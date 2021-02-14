from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Message

import logging

logger = logging.getLogger('testlogger')


class MessageSerializer(serializers.ModelSerializer):
    id = serializers.CharField(required=False)
    sender = serializers.CharField(source="sender.username", read_only=True)
    recipient = serializers.CharField(source="recipient.username", read_only=True)
    amount = serializers.DecimalField(max_digits=20, decimal_places=15, required=False,min_value=0.01,max_value=1999.99)

    class Meta:
        model = Message
        fields = '__all__'

    def save(self, user, recipient=None):
        message = super().save()

        message.sender = user
        if recipient is not None and recipient != "":
            message.recipient = User.objects.get(username=recipient)
        message.save()
        return message