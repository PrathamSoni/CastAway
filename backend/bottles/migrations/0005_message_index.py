# Generated by Django 3.1.6 on 2021-02-13 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bottles', '0004_message_can_reply'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='index',
            field=models.IntegerField(default=0),
        ),
    ]
