from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

# Executive Position Choices
LOCAL_EXECUTIVE_POSITIONS = [
    ("president", "President"),
    ("vice_president", "Vice President"),
    ("secretary", "Secretary"),
    ("assistant_secretary", "Assistant Secretary"),
    ("financial_secretary", "Financial Secretary"),
    ("treasurer", "Treasurer"),
    ("organizer", "Organizer"),
    ("evangelism_coordinator", "Evangelism Coordinator"),
]

DISTRICT_EXECUTIVE_POSITIONS = [
    ("president", "President"),
    ("presidents_rep", "President's Rep"),
    ("secretary", "Secretary"),
    ("assistant_secretary", "Assistant Secretary"),
    ("financial_secretary", "Financial Secretary"),
    ("treasurer", "Treasurer"),
    ("organizer", "Organizer"),
    ("evangelism_coordinator", "Evangelism Coordinator"),
]


class Congregation(models.Model):
    name = models.CharField(max_length=100, unique=True)
    location = models.CharField(max_length=100, blank=True)
    background_color = models.CharField(max_length=20, default="#f0f0f0")
    pin = models.CharField(
        max_length=6, default="123456", help_text="6-digit PIN for congregation access"
    )
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text="User account for this congregation",
    )
    is_district = models.BooleanField(
        default=False, help_text="Is this a district congregation?"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Guilder(models.Model):
    # Section A – Personal Information
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(
        max_length=10, choices=[("Male", "Male"), ("Female", "Female")]
    )
    phone_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(blank=True)
    place_of_residence = models.CharField(max_length=100)
    residential_address = models.CharField(max_length=100)
    profession = models.CharField(max_length=100, blank=True)
    hometown = models.CharField(max_length=100)
    relative_contact = models.CharField(max_length=100)
    congregation = models.ForeignKey(Congregation, on_delete=models.CASCADE)

    # Section B – Church Participation
    membership_status = models.CharField(
        max_length=20,
        choices=[("Active", "Active"), ("Distant", "Distant")],
        default="Active",
    )
    position = models.CharField(max_length=100, blank=True)
    favorite_quote = models.TextField(blank=True)
    is_baptized = models.BooleanField(default=True)
    is_confirmed = models.BooleanField(default=True)
    is_communicant = models.BooleanField(default=True)
    attends_weekly_meetings = models.BooleanField(default=True)
    attends_sunday_service = models.BooleanField(default=True)
    joins_other_activities = models.BooleanField(default=True)

    # Executive Information
    is_executive = models.BooleanField(
        default=False, help_text="Is this person an executive member?"
    )
    executive_position = models.CharField(
        max_length=50,
        choices=LOCAL_EXECUTIVE_POSITIONS + DISTRICT_EXECUTIVE_POSITIONS,
        blank=True,
        null=True,
        help_text="Executive position if applicable",
    )

    # Permissions/roles
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.phone_number}) - {self.congregation.name}"

    class Meta:
        ordering = ["first_name", "last_name"]


class SundayAttendance(models.Model):
    congregation = models.ForeignKey(Congregation, on_delete=models.CASCADE)
    date = models.DateField()
    male_count = models.PositiveIntegerField()
    female_count = models.PositiveIntegerField()
    total_count = models.PositiveIntegerField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ["congregation", "date"]
        ordering = ["-date"]

    def save(self, *args, **kwargs):
        self.total_count = self.male_count + self.female_count
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.congregation.name} - {self.date} | Total: {self.total_count}"


class BirthdayMessageLog(models.Model):
    guilder = models.ForeignKey(Guilder, on_delete=models.CASCADE)
    sent_date = models.DateField(default=timezone.now)
    message = models.TextField()

    class Meta:
        unique_together = ["guilder", "sent_date"]

    def __str__(self):
        return f"{self.guilder} - {self.sent_date}"


class BulkProfileCart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    congregation = models.ForeignKey(Congregation, on_delete=models.CASCADE)
    profiles = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    submitted = models.BooleanField(default=False)

    def __str__(self):
        return f"Cart by {self.user.username} for {self.congregation.name} ({'Submitted' if self.submitted else 'Pending'})"


class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ("birthday", "Birthday"),
        ("new_member", "New Member"),
        ("attendance", "Attendance"),
        ("system", "System"),
        ("edit", "Edit"),
        ("delete", "Delete"),
        ("manual", "Manual"),
    ]

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="notifications_sent"
    )
    congregation = models.ForeignKey(Congregation, on_delete=models.CASCADE)
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    title = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    # New fields for change tracking and recipient
    recipient = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="notifications_received",
        null=True,
        blank=True,
    )
    change_details = models.JSONField(default=dict, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} - {self.user.username}"
