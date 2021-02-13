from rest_framework import serializers
from django.db.models import F
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User
from django.utils.encoding import force_str
from .models import Message

import logging
logger = logging.getLogger('testlogger')

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'