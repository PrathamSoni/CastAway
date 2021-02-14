# Generated by Django 3.1.6 on 2021-02-14 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bottles', '0009_message_amount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=3),
        ),
    ]