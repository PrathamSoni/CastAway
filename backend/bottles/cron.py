from django_cron import CronJobBase, Schedule
from .models import Message


class BottleJob(CronJobBase):
    RUN_EVERY_MINS = .25  # every 15s

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'bottles.update'  # a unique code

    def do(self):
        for message in Message.objects.all():
            self.update(message)

    def update(self, object):
        object.save()
