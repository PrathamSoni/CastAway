# Generated by Django 3.1.6 on 2021-02-13 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bottles', '0003_message_parent'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='can_reply',
            field=models.BooleanField(default=True),
        ),
    ]