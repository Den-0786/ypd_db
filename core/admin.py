from django.contrib import admin

from .models import (BirthdayMessageLog, BulkProfileCart, Congregation,
                     Guilder, Role, SundayAttendance)


@admin.register(Congregation)
class CongregationAdmin(admin.ModelAdmin):
    list_display = ("name", "location")
    search_fields = ("name", "location")


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("name", "description")
    search_fields = ("name",)


@admin.register(Guilder)
class GuilderAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "phone_number", "gender", "congregation")
    search_fields = ("first_name", "last_name", "phone_number")
    list_filter = ("gender", "congregation", "membership_status")


@admin.register(SundayAttendance)
class SundayAttendanceAdmin(admin.ModelAdmin):
    list_display = ("congregation", "date", "male_count", "female_count", "total_count")
    list_filter = ("congregation", "date")
    search_fields = ("congregation__name",)


@admin.register(BirthdayMessageLog)
class BirthdayMessageLogAdmin(admin.ModelAdmin):
    list_display = ("guilder", "sent_date")
    list_filter = ("sent_date",)


@admin.register(BulkProfileCart)
class BulkProfileCartAdmin(admin.ModelAdmin):
    list_display = ("user", "congregation", "created_at", "submitted")
    list_filter = ("congregation", "submitted", "created_at")
