from django.contrib import admin

from .models import (BirthdayMessageLog, BulkProfileCart, Congregation,
                     Guilder, Role, SundayAttendance, Notification, SystemSettings)


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


@admin.register(SystemSettings)
class SystemSettingsAdmin(admin.ModelAdmin):
    list_display = ["setting_type", "title", "is_active", "updated_at"]
    list_filter = ["setting_type", "is_active"]
    search_fields = ["title", "message_template"]
    readonly_fields = ["created_at", "updated_at"]
    
    fieldsets = (
        ("Basic Information", {
            "fields": ("setting_type", "title", "is_active"),
            "description": "Configure system-wide message templates for different notifications."
        }),
        ("Message Template", {
            "fields": ("message_template",),
            "description": "Use placeholders in your message template. Available placeholders: {congregation}, {date}, {day}, {name}, {location}"
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )
    
    def get_readonly_fields(self, request, obj=None):
        if obj:  # Editing an existing object
            return self.readonly_fields + ("setting_type",)
        return self.readonly_fields
    
    def save_model(self, request, obj, form, change):
        """Custom save to provide helpful feedback"""
        super().save_model(request, obj, form, change)
        if change:
            messages.success(request, f"'{obj.title}' settings updated successfully!")
        else:
            messages.success(request, f"'{obj.title}' settings created successfully!")
    
    def get_queryset(self, request):
        """Order by setting type for better organization"""
        return super().get_queryset(request).order_by('setting_type')
    
    def get_list_display(self, request):
        """Add helpful actions"""
        list_display = list(super().get_list_display(request))
        return list_display
    
    def get_actions(self, request):
        """Add bulk actions"""
        actions = super().get_actions(request)
        actions['activate_selected'] = self.activate_selected
        actions['deactivate_selected'] = self.deactivate_selected
        return actions
    
    def activate_selected(self, request, queryset):
        """Bulk activate selected settings"""
        updated = queryset.update(is_active=True)
        self.message_user(request, f"Successfully activated {updated} setting(s).")
    activate_selected.short_description = "Activate selected settings"
    
    def deactivate_selected(self, request, queryset):
        """Bulk deactivate selected settings"""
        updated = queryset.update(is_active=False)
        self.message_user(request, f"Successfully deactivated {updated} setting(s).")
    deactivate_selected.short_description = "Deactivate selected settings"
