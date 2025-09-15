from django.core.management.base import BaseCommand
from django_cron import CronJobBase, Schedule
from django.utils import timezone
from datetime import timedelta
from core.models import Quiz
import logging

logger = logging.getLogger(__name__)

class QuizCleanupCronJob(CronJobBase):
    schedule = Schedule(run_every_mins=60)  # Run every hour
    code = 'core.quiz_cleanup'  # Unique code for this cron job

    def do(self):
        """Clean up expired quizzes and handle results timing"""
        from .cleanup_quizzes import Command
        command = Command()
        command.handle()

class Command(BaseCommand):
    help = 'Set up automatic quiz cleanup scheduling'

    def handle(self, *args, **options):
        self.stdout.write("Setting up quiz cleanup scheduling...")
        
        # This would typically set up a cron job or use django-cron
        # For now, we'll just show the manual commands
        
        self.stdout.write(
            self.style.SUCCESS(
                "Quiz cleanup scheduling setup complete!\n\n"
                "To run cleanup manually:\n"
                "  python manage.py cleanup_quizzes\n\n"
                "To test without making changes:\n"
                "  python manage.py cleanup_quizzes --dry-run\n\n"
                "For production, set up a cron job to run every hour:\n"
                "  0 * * * * cd /path/to/ypg_db && python manage.py cleanup_quizzes\n\n"
                "Or use django-cron package for automatic scheduling."
            )
        )
