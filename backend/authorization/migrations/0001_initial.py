# Generated by Django 3.1.6 on 2021-02-14 07:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BankInfo',
            fields=[
                ('user_id', models.EmailField(max_length=254)),
                ('id', models.CharField(max_length=8, primary_key=True, serialize=False)),
                ('bank_id', models.CharField(max_length=32)),
                ('key', models.CharField(max_length=32)),
                ('secret', models.CharField(max_length=32)),
            ],
        ),
    ]
