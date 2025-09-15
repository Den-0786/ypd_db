from django.core.management.base import BaseCommand
from django.utils import timezone

from core.models import BirthdayMessageLog, Guilder


class Command(BaseCommand):
    help = "Send birthday SMS messages to guilders"

    def handle(self, *args, **options):
        today = timezone.now().date()
        birthdays_today = Guilder.objects.filter(
            date_of_birth__month=today.month, date_of_birth__day=today.day
        )

        sent_count = 0
        for guilder in birthdays_today:
            # Check if message already sent today
            if not BirthdayMessageLog.objects.filter(
                guilder=guilder, sent_date=today
            ).exists():

                # TODO: Integrate with Twilio or SMS provider
                message = f"Happy Birthday {guilder.first_name}! May God bless you abundantly. - YPG"

                # Log the message
                BirthdayMessageLog.objects.create(
                    guilder=guilder, sent_date=today, message=message
                )

                self.stdout.write(
                    self.style.SUCCESS(
                        f"SMS sent to {guilder.first_name} {guilder.last_name}"
                    )
                )
                sent_count += 1

        self.stdout.write(
            self.style.SUCCESS(f"Successfully sent {sent_count} birthday messages")
        )
