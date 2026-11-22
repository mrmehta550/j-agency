from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0005_message_and_project_details_optional'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='state',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='contact',
            name='country',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='contact',
            name='city',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
    ]
