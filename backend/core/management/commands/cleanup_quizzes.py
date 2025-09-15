from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from core.models import Quiz, QuizSubmission
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Clean up expired quizzes and handle results timing'

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be done without actually doing it',
        )

    def handle(self, *args, **options):
        dry_run = options['dry_run']
        now = timezone.now()
        
        self.stdout.write(f"Running quiz cleanup at {now}")
        
        # Find quizzes that ended more than 2 days ago
        cutoff_date = now - timedelta(days=2)
        expired_quizzes = Quiz.objects.filter(
            end_time__lt=cutoff_date,
            is_active=True
        )
        
        if expired_quizzes.exists():
            self.stdout.write(f"Found {expired_quizzes.count()} expired quizzes")
            
            for quiz in expired_quizzes:
                if not dry_run:
                    # Deactivate the quiz
                    quiz.is_active = False
                    quiz.save()
                    self.stdout.write(f"Deactivated quiz: {quiz.title}")
                else:
                    self.stdout.write(f"Would deactivate quiz: {quiz.title}")
        else:
            self.stdout.write("No expired quizzes found")
        
        # Handle results timing - quizzes that ended 2+ hours ago but less than 2 days ago
        # should have results available
        results_cutoff = now - timedelta(hours=2)
        results_available_quizzes = Quiz.objects.filter(
            end_time__lt=results_cutoff,
            end_time__gte=cutoff_date,
            is_active=True
        )
        
        if results_available_quizzes.exists():
            self.stdout.write(f"Found {results_available_quizzes.count()} quizzes with results available")
            
            for quiz in results_available_quizzes:
                submissions_count = quiz.submissions.count()
                correct_count = quiz.submissions.filter(is_correct=True).count()
                
                self.stdout.write(
                    f"Quiz '{quiz.title}' results: "
                    f"{submissions_count} participants, "
                    f"{correct_count} correct answers"
                )
        
        self.stdout.write(self.style.SUCCESS('Quiz cleanup completed successfully'))
