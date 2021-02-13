from rest_framework import serializers
from django.db.models import F
from django.utils.translation import gettext_lazy as _
from machina.conf import settings as machina_settings
from machina.core.db.models import get_model
from machina.core.loading import get_class
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User
from django.utils.encoding import force_str
from .models import models

import logging
logger = logging.getLogger('testlogger')

class BottleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message