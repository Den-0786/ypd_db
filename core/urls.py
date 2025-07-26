from django.urls import path

from . import views

app_name = "core"

urlpatterns = [
    # Dashboard URLs
    path("", views.dashboard, name="dashboard"),
    path(
        "congregation/<int:congregation_id>/",
        views.congregation_dashboard,
        name="congregation_dashboard",
    ),
    # Credential Management URLs
    path("change-pin/", views.change_pin, name="change_pin"),
    path("change-password/", views.change_password, name="change_password"),
    path("create-congregation/", views.create_congregation, name="create_congregation"),
    path("update-theme/", views.update_theme, name="update_theme"),
    # Member Management URLs
    path("members/", views.member_list, name="member_list"),
    path("members/add/", views.add_member, name="add_member"),
    path("members/<int:member_id>/", views.member_detail, name="member_detail"),
    path("members/<int:member_id>/edit/", views.edit_member, name="edit_member"),
    path("members/<int:member_id>/delete/", views.delete_member, name="delete_member"),
    # Attendance URLs
    path("attendance/", views.attendance_list, name="attendance_list"),
    path("attendance/log/", views.log_attendance, name="log_attendance"),
    path(
        "attendance/analytics/", views.attendance_analytics, name="attendance_analytics"
    ),
    path("analytics/", views.analytics_dashboard, name="analytics_dashboard"),
    path("analytics/advanced/", views.advanced_analytics, name="advanced_analytics"),
    # Bulk Operations URLs
    path("bulk/", views.bulk_registration, name="bulk_registration"),
    path("bulk/cart/<int:cart_id>/", views.bulk_cart, name="bulk_cart"),
    # Export URLs
    path("export/members/csv/", views.export_members_csv, name="export_members_csv"),
    path(
        "export/attendance/csv/",
        views.export_attendance_csv,
        name="export_attendance_csv",
    ),
    path("export/members/pdf/", views.export_members_pdf, name="export_members_pdf"),
    path(
        "export/attendance/pdf/",
        views.export_attendance_pdf,
        name="export_attendance_pdf",
    ),
    # API URLs
    path("api/members/", views.api_members, name="api_members"),
    path(
        "api/attendance/stats/", views.api_attendance_stats, name="api_attendance_stats"
    ),
    path("api/members/add/", views.api_add_member, name="api_add_member"),
    path(
        "api/analytics/attendance-chart/",
        views.api_attendance_chart_data,
        name="api_attendance_chart_data",
    ),
    path(
        "api/analytics/congregation-pie/",
        views.api_congregation_pie_data,
        name="api_congregation_pie_data",
    ),
    path(
        "api/analytics/gender-distribution/",
        views.api_gender_distribution,
        name="api_gender_distribution",
    ),
    path(
        "api/analytics/attendance-trends/",
        views.api_attendance_trends,
        name="api_attendance_trends",
    ),
    path(
        "api/executive-positions/",
        views.api_executive_positions,
        name="api_executive_positions",
    ),
    path("api/dashboard-stats/", views.api_dashboard_stats, name="api_dashboard_stats"),
    # Birthday SMS URLs
    path("birthdays/", views.birthday_dashboard, name="birthday_dashboard"),
    path(
        "birthdays/send-sms/<int:guilder_id>/",
        views.send_birthday_sms,
        name="send_birthday_sms",
    ),
]
