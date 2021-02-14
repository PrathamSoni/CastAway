from django_cron import CronJobBase, Schedule
from .models import Message
import requests
import datetime
import random

class BottleJob(CronJobBase):
    RUN_EVERY_MINS = .25  # every 15s

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'bottles.update'  # a unique code

    def do(self):
        for message in Message.objects.all():
            self.update(message)

    def update(self, object):
        print(object.tta)
        if object.tta > datetime.timedelta(seconds=15):
            object.tta=object.tta-datetime.timedelta(seconds=15)
        object.long = object.long + random.random() -.5
        object.lat = object.lat + random.random() -.5
        if object.long > 170:
            object.long = 170
        if object.long < -170:
            object.long = -170
        if object.long < -80:
            object.long = -80
        if object.lat > 80:
            object.lat = 80
        object.save()

