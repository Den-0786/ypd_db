

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_loginattempt'),
    ]

    operations = [
        migrations.AlterField(
            model_name='congregation',
            name='pin',
            field=models.CharField(default='1234', help_text='4-digit PIN for congregation access', max_length=4),
        ),
    ]
