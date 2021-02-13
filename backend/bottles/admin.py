from django.contrib import admin

from .models import Message

class BottleAdmin(admin.ModelAdmin):
    """ The Topic model admin. """

admin.site.register(Message, BottleAdmin)
