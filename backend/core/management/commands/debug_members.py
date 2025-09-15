from django.core.management.base import BaseCommand
from core.models import Guilder, Congregation

class Command(BaseCommand):
    help = 'Debug members data in the database'

    def handle(self, *args, **options):
        self.stdout.write("Checking members in database...")
        
        # Get all members
        members = Guilder.objects.all()
        self.stdout.write(f"Total members in database: {members.count()}")
        
        if members.count() > 0:
            # Show first few members with their data
            for i, member in enumerate(members[:5]):
                self.stdout.write(f"\nMember {i+1}:")
                self.stdout.write(f"  ID: {member.id}")
                self.stdout.write(f"  Name: {member.first_name} {member.last_name}")
                self.stdout.write(f"  Phone: {member.phone_number}")
                self.stdout.write(f"  Gender: {member.gender}")
                self.stdout.write(f"  Email: {member.email}")
                self.stdout.write(f"  Congregation: {member.congregation.name if member.congregation else 'None'}")
                self.stdout.write(f"  Membership Status: {member.membership_status}")
                self.stdout.write(f"  Is Baptized: {member.is_baptized}")
                self.stdout.write(f"  Is Confirmed: {member.is_confirmed}")
                self.stdout.write(f"  Is Communicant: {member.is_communicant}")
                self.stdout.write(f"  Is Executive: {member.is_executive}")
        else:
            self.stdout.write("No members found in database!")
            
        # Check congregations
        congregations = Congregation.objects.all()
        self.stdout.write(f"\nTotal congregations: {congregations.count()}")
        for congregation in congregations:
            member_count = Guilder.objects.filter(congregation=congregation).count()
            self.stdout.write(f"  {congregation.name}: {member_count} members")
