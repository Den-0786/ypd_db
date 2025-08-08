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
    path("api/home-stats/", views.api_home_stats, name="api_home_stats"),
    # Notification API URLs
    path("api/notifications/", views.api_notifications, name="api_notifications"),
    path("api/notifications/mark-read/", views.api_mark_notification_read, name="api_mark_notification_read"),
    path("api/notifications/clear/", views.api_clear_notifications, name="api_clear_notifications"),
    path("api/notifications/send/", views.api_send_manual_notification, name="api_send_manual_notification"),
    # Birthday SMS URLs
    path("birthdays/", views.birthday_dashboard, name="birthday_dashboard"),
    path(
        "birthdays/send-sms/<int:guilder_id>/",
        views.send_birthday_sms,
        name="send_birthday_sms",
    ),
    # Quiz API URLs
    path("api/quizzes/", views.api_quizzes, name="api_quizzes"),
    path("api/quizzes/active/", views.api_active_quiz, name="api_active_quiz"),
    path("api/quizzes/submit/", views.api_submit_quiz, name="api_submit_quiz"),
    path("api/quizzes/results/", views.api_quiz_results, name="api_quiz_results"),
    path("api/quizzes/results/<int:quiz_id>/", views.api_quiz_results, name="api_quiz_results_detail"),
    path("api/quizzes/create/", views.api_create_quiz, name="api_create_quiz"),
    path("api/quizzes/<int:quiz_id>/end/", views.api_end_quiz, name="api_end_quiz"),
    path("api/quizzes/<int:quiz_id>/delete/", views.api_delete_quiz, name="api_delete_quiz"),
    path("api/quizzes/cleanup/", views.api_cleanup_expired_quizzes, name="api_cleanup_expired_quizzes"),
    path("api/quizzes/congregation-stats/", views.api_congregation_quiz_stats, name="api_congregation_quiz_stats"),
    # Y-Store API URLs
    path("api/ystore/", views.api_ystore_items, name="api_ystore_items"),
    path("api/ystore/admin/", views.api_ystore_admin_items, name="api_ystore_admin_items"),
    path("api/ystore/create/", views.api_ystore_create_item, name="api_ystore_create_item"),
    path("api/ystore/<int:item_id>/update/", views.api_ystore_update_item, name="api_ystore_update_item"),
    path("api/ystore/<int:item_id>/delete/", views.api_ystore_delete_item, name="api_ystore_delete_item"),
    
    # Branch President API endpoints
    path('api/branch-presidents/', views.api_branch_presidents, name='api_branch_presidents'),
    path('api/branch-presidents/admin/', views.api_branch_presidents_admin, name='api_branch_presidents_admin'),
    path('api/branch-presidents/create/', views.api_branch_president_create, name='api_branch_president_create'),
    path('api/branch-presidents/<int:president_id>/update/', views.api_branch_president_update, name='api_branch_president_update'),
    path('api/branch-presidents/<int:president_id>/delete/', views.api_branch_president_delete, name='api_branch_president_delete'),
    
    # Settings API URLs
    path('api/settings/profile/', views.api_settings_profile, name='api_settings_profile'),
    path('api/settings/security/', views.api_settings_security, name='api_settings_security'),
    path('api/settings/website/', views.api_settings_website, name='api_settings_website'),
    
    # Blog API URLs
    path('api/blog/', views.api_blog, name='api_blog'),
    path('api/blog/<int:blog_id>/', views.api_blog, name='api_blog_detail'),
    
    # Media API URLs
    path('api/media/', views.api_media, name='api_media'),
    path('api/media/<int:media_id>/', views.api_media, name='api_media_detail'),
    
    # Events API URLs
    path('api/events/', views.api_events, name='api_events'),
    path('api/events/<int:event_id>/', views.api_events, name='api_events_detail'),
    
    # Council API URLs
    path('api/council/', views.api_council, name='api_council'),
]
