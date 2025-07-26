import csv
import json
from collections import defaultdict
from datetime import datetime, timedelta
from io import BytesIO

from django.contrib import messages
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.models import User
from django.core.paginator import Paginator
from django.db import transaction
from django.db.models import Avg, Count, Q, Sum
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import (require_GET, require_http_methods,
                                          require_POST)
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (Paragraph, SimpleDocTemplate, Spacer, Table,
                                TableStyle)

from .forms import (BulkGuilderForm, ChangePINForm, CongregationForm,
                    GuilderForm, NewCongregationForm, PINForm, RoleForm,
                    SearchForm, SundayAttendanceForm)
from .models import (DISTRICT_EXECUTIVE_POSITIONS, LOCAL_EXECUTIVE_POSITIONS,
                     BirthdayMessageLog, BulkProfileCart, Congregation,
                     Guilder, Notification, Role, SundayAttendance)


# Utility function to create notifications
def create_notification(
    user,
    congregation,
    notification_type,
    title,
    message,
    recipient=None,
    change_details=None,
):
    Notification.objects.create(
        user=user,
        congregation=congregation,
        notification_type=notification_type,
        title=title,
        message=message,
        recipient=recipient,
        change_details=change_details or {},
    )


# Dashboard Views
@login_required
def dashboard(request):
    # Check if user is district admin
    try:
        user_congregation = Congregation.objects.get(user=request.user)
        is_district = user_congregation.is_district
    except Congregation.DoesNotExist:
        is_district = False

    if is_district:
        # District Dashboard - Show all congregations
        congregations = Congregation.objects.all()
        total_members = Guilder.objects.count()
        total_male = Guilder.objects.filter(gender="Male").count()
        total_female = Guilder.objects.filter(gender="Female").count()
        active_members = Guilder.objects.filter(membership_status="Active").count()
        distant_members = Guilder.objects.filter(membership_status="Distant").count()
        total_congregations = congregations.count()

        # Get executives and members for district view
        district_executives = Guilder.objects.filter(
            is_executive=True, congregation__is_district=True
        ).order_by("executive_position", "first_name")

        local_executives = Guilder.objects.filter(
            is_executive=True, congregation__is_district=False
        ).order_by("congregation__name", "executive_position", "first_name")

        members = Guilder.objects.filter(is_executive=False).order_by(
            "first_name", "last_name"
        )

    else:
        # Local Dashboard - Show only user's congregation
        congregations = [user_congregation]
        total_members = Guilder.objects.filter(congregation=user_congregation).count()
        total_male = Guilder.objects.filter(
            congregation=user_congregation, gender="Male"
        ).count()
        total_female = Guilder.objects.filter(
            congregation=user_congregation, gender="Female"
        ).count()
        active_members = Guilder.objects.filter(
            congregation=user_congregation, membership_status="Active"
        ).count()
        distant_members = Guilder.objects.filter(
            congregation=user_congregation, membership_status="Distant"
        ).count()
        total_congregations = 1

        # Get executives and members for local view
        executives = Guilder.objects.filter(
            congregation=user_congregation, is_executive=True
        ).order_by("executive_position", "first_name")

        members = Guilder.objects.filter(
            congregation=user_congregation, is_executive=False
        ).order_by("first_name", "last_name")

    context = {
        "congregations": congregations,
        "total_members": total_members,
        "total_male": total_male,
        "total_female": total_female,
        "active_members": active_members,
        "distant_members": distant_members,
        "total_congregations": total_congregations,
        "is_district": is_district,
        "user_congregation": (
            user_congregation if "user_congregation" in locals() else None
        ),
    }

    # Add executives and members to context based on dashboard type
    if is_district:
        context.update(
            {
                "district_executives": district_executives,
                "local_executives": local_executives,
                "members": members,
            }
        )
    else:
        context.update(
            {
                "executives": executives,
                "members": members,
            }
        )

    return render(request, "core/dashboard.html", context)


@login_required
def congregation_dashboard(request, congregation_id):
    congregation = get_object_or_404(Congregation, id=congregation_id)

    # Check if user has access to this congregation
    try:
        user_congregation = Congregation.objects.get(user=request.user)
        if not user_congregation.is_district and user_congregation != congregation:
            messages.error(request, "You don't have access to this congregation.")
            return redirect("core:dashboard")
    except Congregation.DoesNotExist:
        messages.error(request, "You don't have access to this congregation.")
        return redirect("core:dashboard")

    if request.method == "POST":
        pin_form = PINForm(request.POST)
        if pin_form.is_valid():
            # PIN validation logic here
            pass
    else:
        pin_form = PINForm()

    members = Guilder.objects.filter(congregation=congregation)
    recent_attendance = SundayAttendance.objects.filter(
        congregation=congregation
    ).order_by("-date")[:5]

    context = {
        "congregation": congregation,
        "members": members,
        "recent_attendance": recent_attendance,
        "pin_form": pin_form,
    }
    return render(request, "core/congregation_dashboard.html", context)


# Credential Management Views
@login_required
def change_pin(request):
    try:
        user_congregation = Congregation.objects.get(user=request.user)
    except Congregation.DoesNotExist:
        messages.error(request, "No congregation found for this user.")
        return redirect("core:dashboard")

    if request.method == "POST":
        form = ChangePINForm(request.POST)
        if form.is_valid():
            current_pin = form.cleaned_data["current_pin"]
            new_pin = form.cleaned_data["new_pin"]

            if user_congregation.pin == current_pin:
                user_congregation.pin = new_pin
                user_congregation.save()
                messages.success(request, "PIN changed successfully!")
                return redirect("core:dashboard")
            else:
                messages.error(request, "Current PIN is incorrect.")
    else:
        form = ChangePINForm()

    context = {"form": form, "congregation": user_congregation}
    return render(request, "core/change_pin.html", context)


@login_required
def change_password(request):
    try:
        user_congregation = Congregation.objects.get(user=request.user)
    except Congregation.DoesNotExist:
        messages.error(request, "No congregation found for this user.")
        return redirect("core:dashboard")

    if request.method == "POST":
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)
            messages.success(request, "Password changed successfully!")
            return redirect("core:dashboard")
    else:
        form = PasswordChangeForm(request.user)

    context = {"form": form, "congregation": user_congregation}
    return render(request, "core/change_password.html", context)


@login_required
def create_congregation(request):
    # Only district admins can create congregations
    try:
        user_congregation = Congregation.objects.get(user=request.user)
        if not user_congregation.is_district:
            messages.error(
                request, "Only district admins can create new congregations."
            )
            return redirect("core:dashboard")
    except Congregation.DoesNotExist:
        messages.error(request, "You don't have permission to create congregations.")
        return redirect("core:dashboard")

    if request.method == "POST":
        form = NewCongregationForm(request.POST)
        if form.is_valid():
            # Create new user account
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]

            user = User.objects.create_user(username=username, password=password)

            # Create congregation
            congregation = form.save(commit=False)
            congregation.user = user
            congregation.save()

            messages.success(
                request, f"Congregation '{congregation.name}' created successfully!"
            )
            return redirect("core:dashboard")
    else:
        form = NewCongregationForm()

    context = {"form": form}
    return render(request, "core/create_congregation.html", context)


# Theme Management
@login_required
def update_theme(request):
    if request.method == "POST":
        try:
            user_congregation = Congregation.objects.get(user=request.user)
            background_color = request.POST.get("background_color")

            if background_color:
                user_congregation.background_color = background_color
                user_congregation.save()
                return JsonResponse(
                    {"success": True, "message": "Theme updated successfully"}
                )
        except Congregation.DoesNotExist:
            return JsonResponse({"success": False, "message": "Congregation not found"})

    return JsonResponse({"success": False, "message": "Invalid request"})


# Member Management Views
@login_required
def member_list(request):
    search_form = SearchForm(request.GET)
    members = Guilder.objects.all()

    # Filter by user's congregation if not district admin
    try:
        user_congregation = Congregation.objects.get(user=request.user)
        if not user_congregation.is_district:
            members = members.filter(congregation=user_congregation)
    except Congregation.DoesNotExist:
        messages.error(request, "No congregation found for this user.")
        return redirect("core:dashboard")

    if search_form.is_valid():
        search = search_form.cleaned_data.get("search")
        congregation = search_form.cleaned_data.get("congregation")

        if search:
            members = members.filter(
                Q(first_name__icontains=search)
                | Q(last_name__icontains=search)
                | Q(phone_number__icontains=search)
            )

        if congregation and user_congregation.is_district:
            members = members.filter(congregation=congregation)

    paginator = Paginator(members, 20)
    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)

    context = {
        "page_obj": page_obj,
        "search_form": search_form,
    }
    return render(request, "core/member_list.html", context)


@login_required
@transaction.atomic
def add_member(request):
    try:
        user_congregation = Congregation.objects.get(user=request.user)
    except Congregation.DoesNotExist:
        messages.error(request, "No congregation found for this user.")
        return redirect("core:dashboard")

    if request.method == "POST":
        form = GuilderForm(request.POST)
        if form.is_valid():
            member = form.save()
            # Notification for district
            create_notification(
                user=request.user,
                congregation=user_congregation,
                notification_type="new_member",
                title=f"New Guilder Added in {user_congregation.name}",
                message=f"{member.first_name} {member.last_name} was added by {request.user.username}.",
            )
            messages.success(
                request,
                f"Member {member.first_name} {member.last_name} added successfully!",
            )
            return redirect("member_detail", member.id)
    else:
        form = GuilderForm()
        if not user_congregation.is_district:
            form.fields["congregation"].initial = user_congregation

    context = {"form": form}
    return render(request, "core/member_form.html", context)


@login_required
@transaction.atomic
def edit_member(request, member_id):
    member = get_object_or_404(Guilder, id=member_id)
    try:
        user_congregation = Congregation.objects.get(user=request.user)
        if (
            not user_congregation.is_district
            and member.congregation != user_congregation
        ):
            messages.error(request, "You don't have permission to edit this member.")
            return redirect("core:member_list")
    except Congregation.DoesNotExist:
        messages.error(request, "No congregation found for this user.")
        return redirect("core:dashboard")

    old_data = {
        field: getattr(member, field)
        for field in ["first_name", "last_name", "phone_number", "congregation_id"]
    }
    if request.method == "POST":
        form = GuilderForm(request.POST, instance=member)
        if form.is_valid():
            member = form.save()
            # Detect changes
            changes = {}
            for field in old_data:
                new_value = getattr(member, field)
                if old_data[field] != new_value:
                    changes[field] = {"from": old_data[field], "to": new_value}
            # Notification for district
            if changes:
                create_notification(
                    user=request.user,
                    congregation=member.congregation,
                    notification_type="edit",
                    title=f"Edit in {member.congregation.name}",
                    message=f"{member.first_name} {member.last_name} was edited by {request.user.username}.",
                    change_details=changes,
                )
            messages.success(
                request,
                f"Member {member.first_name} {member.last_name} updated successfully!",
            )
            return redirect("member_detail", member.id)
    else:
        form = GuilderForm(instance=member)

    context = {"form": form, "member": member}
    return render(request, "core/member_form.html", context)


@login_required
def member_detail(request, member_id):
    member = get_object_or_404(Guilder, id=member_id)

    # Check if user has permission to view this member
    try:
        user_congregation = Congregation.objects.get(user=request.user)
        if (
            not user_congregation.is_district
            and member.congregation != user_congregation
        ):
            messages.error(request, "You don't have permission to view this member.")
            return redirect("core:member_list")
    except Congregation.DoesNotExist:
        messages.error(request, "No congregation found for this user.")
        return redirect("core:dashboard")

    context = {"member": member}
    return render(request, "core/member_detail.html", context)


@login_required
@transaction.atomic
def delete_member(request, member_id):
    member = get_object_or_404(Guilder, id=member_id)
    try:
        user_congregation = Congregation.objects.get(user=request.user)
        if (
            not user_congregation.is_district
            and member.congregation != user_congregation
        ):
            messages.error(request, "You don't have permission to delete this member.")
            return redirect("core:member_list")
    except Congregation.DoesNotExist:
        messages.error(request, "No congregation found for this user.")
        return redirect("core:dashboard")

    if request.method == "POST":
        pin = request.POST.get("pin")
        if pin == user_congregation.pin:
            # Notification for district
            create_notification(
                user=request.user,
                congregation=member.congregation,
                notification_type="delete",
                title=f"Delete in {member.congregation.name}",
                message=f"{member.first_name} {member.last_name} was deleted by {request.user.username}.",
            )
            member.delete()
            messages.success(request, "Member deleted successfully!")
            return redirect("member_list")
        else:
            messages.error(request, "Incorrect PIN. Deletion cancelled.")

    context = {"member": member}
    return render(request, "core/member_confirm_delete.html", context)


# Attendance Views
@login_required
def attendance_list(request):
    attendance_records = SundayAttendance.objects.all().order_by("-date")

    # Filter by user's congregation if not district admin
    try:
        user_congregation = Congregation.objects.get(user=request.user)
        if not user_congregation.is_district:
            attendance_records = attendance_records.filter(
                congregation=user_congregation
            )
    except Congregation.DoesNotExist:
        messages.error(request, "No congregation found for this user.")
        return redirect("core:dashboard")

    paginator = Paginator(attendance_records, 20)
    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)

    context = {"page_obj": page_obj}
    return render(request, "core/attendance_list.html", context)


@login_required
def log_attendance(request):
    try:
        user_congregation = Congregation.objects.get(user=request.user)
    except Congregation.DoesNotExist:
        messages.error(request, "No congregation found for this user.")
        return redirect("core:dashboard")

    if request.method == "POST":
        form = SundayAttendanceForm(request.POST)
        if form.is_valid():
            attendance = form.save()
            messages.success(
                request,
                f"Attendance logged for {attendance.congregation.name} on {attendance.date}",
            )
            return redirect("attendance_list")
    else:
        form = SundayAttendanceForm()
        # Pre-select user's congregation if not district admin
        if not user_congregation.is_district:
            form.fields["congregation"].initial = user_congregation

    context = {"form": form}
    return render(request, "core/attendance_form.html", context)


@login_required
def attendance_analytics(request):
    congregations = Congregation.objects.all()

    # Filter congregations if not district admin
    try:
        user_congregation = Congregation.objects.get(user=request.user)
        if not user_congregation.is_district:
            congregations = [user_congregation]
    except Congregation.DoesNotExist:
        messages.error(request, "No congregation found for this user.")
        return redirect("core:dashboard")

    today = timezone.now().date()
    last_sunday = today - timedelta(days=today.weekday() + 1)

    attendance_data = []
    for congregation in congregations:
        current_attendance = SundayAttendance.objects.filter(
            congregation=congregation, date=last_sunday
        ).first()

        previous_attendance = SundayAttendance.objects.filter(
            congregation=congregation, date=last_sunday - timedelta(days=7)
        ).first()

        growth = 0
        if current_attendance and previous_attendance:
            growth = current_attendance.total_count - previous_attendance.total_count

        attendance_data.append(
            {
                "congregation": congregation,
                "current": current_attendance,
                "previous": previous_attendance,
                "growth": growth,
            }
        )

    context = {"attendance_data": attendance_data, "last_sunday": last_sunday}
    return render(request, "core/attendance_analytics.html", context)


# Advanced Analytics Views
@login_required
def advanced_analytics(request):
    context = {}
    return render(request, "core/advanced_analytics.html", context)


@login_required
def analytics_dashboard(request):
    context = {}
    return render(request, "core/analytics_dashboard.html", context)


# Bulk Operations
@login_required
def bulk_registration(request):
    try:
        user_congregation = Congregation.objects.get(user=request.user)
    except Congregation.DoesNotExist:
        messages.error(request, "No congregation found for this user.")
        return redirect("core:dashboard")

    if request.method == "POST":
        form = BulkGuilderForm(request.POST)
        if form.is_valid():
            congregation = form.cleaned_data["congregation"]

            # Check if user has permission for this congregation
            if not user_congregation.is_district and congregation != user_congregation:
                messages.error(
                    request,
                    "You don't have permission to add members to this congregation.",
                )
                return redirect("core:bulk_registration")

            cart, created = BulkProfileCart.objects.get_or_create(
                user=request.user, congregation=congregation, submitted=False
            )
            return redirect("bulk_cart", cart.id)
    else:
        form = BulkGuilderForm()
        # Pre-select user's congregation if not district admin
        if not user_congregation.is_district:
            form.fields["congregation"].initial = user_congregation

    context = {"form": form}
    return render(request, "core/bulk_registration.html", context)


@login_required
def bulk_cart(request, cart_id):
    cart = get_object_or_404(BulkProfileCart, id=cart_id, user=request.user)

    if request.method == "POST":
        action = request.POST.get("action")
        if action == "add_profile":
            profile_data = request.POST.get("profile_data")
            if profile_data:
                profiles = cart.profiles
                profiles.append(json.loads(profile_data))
                cart.profiles = profiles
                cart.save()

        elif action == "submit":
            for profile_data in cart.profiles:
                form = GuilderForm(profile_data)
                if form.is_valid():
                    form.save()

            cart.submitted = True
            cart.save()
            messages.success(
                request, f"{len(cart.profiles)} members added successfully!"
            )
            return redirect("member_list")

    context = {"cart": cart}
    return render(request, "core/bulk_cart.html", context)


# Export Views
@login_required
def export_members_csv(request):
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = 'attachment; filename="members.csv"'

    writer = csv.writer(response)
    writer.writerow(
        [
            "First Name",
            "Last Name",
            "Phone Number",
            "Email",
            "Gender",
            "Date of Birth",
            "Congregation",
            "Membership Status",
            "Position",
        ]
    )

    members = Guilder.objects.all()

    # Filter by user's congregation if not district admin
    try:
        user_congregation = Congregation.objects.get(user=request.user)
        if not user_congregation.is_district:
            members = members.filter(congregation=user_congregation)
    except Congregation.DoesNotExist:
        return response

    for member in members:
        writer.writerow(
            [
                member.first_name,
                member.last_name,
                member.phone_number,
                member.email,
                member.gender,
                member.date_of_birth,
                member.congregation.name,
                member.membership_status,
                member.position,
            ]
        )

    return response


@login_required
def export_attendance_csv(request):
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = 'attachment; filename="attendance.csv"'

    writer = csv.writer(response)
    writer.writerow(
        ["Date", "Congregation", "Male Count", "Female Count", "Total Count"]
    )

    attendance_records = SundayAttendance.objects.all().order_by("-date")

    # Filter by user's congregation if not district admin
    try:
        user_congregation = Congregation.objects.get(user=request.user)
        if not user_congregation.is_district:
            attendance_records = attendance_records.filter(
                congregation=user_congregation
            )
    except Congregation.DoesNotExist:
        return response

    for record in attendance_records:
        writer.writerow(
            [
                record.date,
                record.congregation.name,
                record.male_count,
                record.female_count,
                record.total_count,
            ]
        )

    return response


@login_required
def export_members_pdf(request):
    response = HttpResponse(content_type="application/pdf")
    response["Content-Disposition"] = 'attachment; filename="members_report.pdf"'

    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    elements = []

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "CustomTitle",
        parent=styles["Heading1"],
        fontSize=16,
        spaceAfter=30,
        alignment=1,
    )

    # Title
    title = Paragraph("YPG Members Report", title_style)
    elements.append(title)
    elements.append(Spacer(1, 20))

    # Get members data
    members = Guilder.objects.all().order_by("congregation__name", "first_name")

    # Filter by user's congregation if not district admin
    try:
        user_congregation = Congregation.objects.get(user=request.user)
        if not user_congregation.is_district:
            members = members.filter(congregation=user_congregation)
    except Congregation.DoesNotExist:
        return response

    # Prepare table data
    data = [["Name", "Phone", "Congregation", "Status", "Gender"]]

    for member in members:
        data.append(
            [
                f"{member.first_name} {member.last_name}",
                member.phone_number,
                member.congregation.name,
                member.membership_status,
                member.gender,
            ]
        )

    # Create table
    table = Table(data)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, 0), 12),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 12),
                ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
                ("TEXTCOLOR", (0, 1), (-1, -1), colors.black),
                ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 1), (-1, -1), 10),
                ("GRID", (0, 0), (-1, -1), 1, colors.black),
                ("ALIGN", (0, 0), (-1, -1), "LEFT"),
            ]
        )
    )

    elements.append(table)

    # Build PDF
    doc.build(elements)
    pdf = buffer.getvalue()
    buffer.close()

    response.write(pdf)
    return response


@login_required
def export_attendance_pdf(request):
    response = HttpResponse(content_type="application/pdf")
    response["Content-Disposition"] = 'attachment; filename="attendance_report.pdf"'

    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    elements = []

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "CustomTitle",
        parent=styles["Heading1"],
        fontSize=16,
        spaceAfter=30,
        alignment=1,
    )

    # Title
    title = Paragraph("YPG Attendance Report", title_style)
    elements.append(title)
    elements.append(Spacer(1, 20))

    # Get attendance data
    attendance_records = SundayAttendance.objects.all().order_by("-date")

    # Filter by user's congregation if not district admin
    try:
        user_congregation = Congregation.objects.get(user=request.user)
        if not user_congregation.is_district:
            attendance_records = attendance_records.filter(
                congregation=user_congregation
            )
    except Congregation.DoesNotExist:
        return response

    # Prepare table data
    data = [["Date", "Congregation", "Male", "Female", "Total"]]

    for record in attendance_records:
        data.append(
            [
                record.date.strftime("%Y-%m-%d"),
                record.congregation.name,
                str(record.male_count),
                str(record.female_count),
                str(record.total_count),
            ]
        )

    # Create table
    table = Table(data)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, 0), 12),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 12),
                ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
                ("TEXTCOLOR", (0, 1), (-1, -1), colors.black),
                ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 1), (-1, -1), 10),
                ("GRID", (0, 0), (-1, -1), 1, colors.black),
                ("ALIGN", (0, 0), (-1, -1), "LEFT"),
            ]
        )
    )

    elements.append(table)

    # Build PDF
    doc.build(elements)
    pdf = buffer.getvalue()
    buffer.close()

    response.write(pdf)
    return response


# API Views
@csrf_exempt
@require_http_methods(["GET"])
def api_members(request):
    congregation_id = request.GET.get("congregation")
    search = request.GET.get("search")

    members = Guilder.objects.all()

    if congregation_id:
        members = members.filter(congregation_id=congregation_id)

    if search:
        members = members.filter(
            Q(first_name__icontains=search)
            | Q(last_name__icontains=search)
            | Q(phone_number__icontains=search)
        )

    data = []
    for member in members:
        data.append(
            {
                "id": member.id,
                "first_name": member.first_name,
                "last_name": member.last_name,
                "phone_number": member.phone_number,
                "congregation": member.congregation.name,
                "membership_status": member.membership_status,
            }
        )

    return JsonResponse({"members": data})


@csrf_exempt
@require_http_methods(["GET"])
def api_attendance_stats(request):
    congregation_id = request.GET.get("congregation")

    if congregation_id:
        attendance = SundayAttendance.objects.filter(congregation_id=congregation_id)
    else:
        attendance = SundayAttendance.objects.all()

    total_attendance = attendance.aggregate(
        total_male=Sum("male_count"),
        total_female=Sum("female_count"),
        total=Sum("total_count"),
    )

    return JsonResponse(total_attendance)


@csrf_exempt
@require_http_methods(["POST"])
def api_add_member(request):
    try:
        data = json.loads(request.body)
        form = GuilderForm(data)

        if form.is_valid():
            member = form.save()
            return JsonResponse(
                {
                    "success": True,
                    "message": "Member added successfully",
                    "member_id": member.id,
                }
            )
        else:
            return JsonResponse({"success": False, "errors": form.errors}, status=400)

    except json.JSONDecodeError:
        return JsonResponse({"success": False, "error": "Invalid JSON"}, status=400)


# Advanced Analytics API Endpoints
@csrf_exempt
@require_http_methods(["GET"])
def api_attendance_chart_data(request):
    """API endpoint for attendance chart data"""
    weeks = int(request.GET.get("weeks", 8))
    congregation_id = request.GET.get("congregation")

    end_date = timezone.now().date()
    start_date = end_date - timedelta(weeks=weeks)

    if congregation_id:
        attendance_records = SundayAttendance.objects.filter(
            congregation_id=congregation_id, date__gte=start_date, date__lte=end_date
        ).order_by("date")
    else:
        attendance_records = SundayAttendance.objects.filter(
            date__gte=start_date, date__lte=end_date
        ).order_by("date")

    # Group by date and sum totals
    attendance_by_date = defaultdict(int)
    for record in attendance_records:
        attendance_by_date[record.date.strftime("%Y-%m-%d")] += record.total_count

    dates = sorted(attendance_by_date.keys())
    totals = [attendance_by_date[date] for date in dates]

    return JsonResponse({"labels": dates, "data": totals, "weeks": weeks})


@csrf_exempt
@require_http_methods(["GET"])
def api_congregation_pie_data(request):
    """API endpoint for congregation distribution pie chart"""
    congregations = Congregation.objects.all()

    labels = []
    data = []
    colors = []

    for congregation in congregations:
        member_count = Guilder.objects.filter(congregation=congregation).count()
        if member_count > 0:
            labels.append(congregation.name)
            data.append(member_count)
            colors.append(congregation.background_color)

    return JsonResponse({"labels": labels, "data": data, "colors": colors})


@csrf_exempt
@require_http_methods(["GET"])
def api_gender_distribution(request):
    """API endpoint for gender distribution histogram"""
    congregations = Congregation.objects.all()

    labels = []
    male_data = []
    female_data = []

    for congregation in congregations:
        labels.append(congregation.name)
        male_count = Guilder.objects.filter(
            congregation=congregation, gender="Male"
        ).count()
        female_count = Guilder.objects.filter(
            congregation=congregation, gender="Female"
        ).count()

        male_data.append(male_count)
        female_data.append(female_count)

    return JsonResponse(
        {"labels": labels, "male_data": male_data, "female_data": female_data}
    )


@csrf_exempt
@require_http_methods(["GET"])
def api_attendance_trends(request):
    """API endpoint for attendance trends over time"""
    months = int(request.GET.get("months", 6))
    congregation_id = request.GET.get("congregation")

    end_date = timezone.now().date()
    start_date = end_date - timedelta(days=months * 30)

    if congregation_id:
        attendance_records = SundayAttendance.objects.filter(
            congregation_id=congregation_id, date__gte=start_date, date__lte=end_date
        ).order_by("date")
    else:
        attendance_records = SundayAttendance.objects.filter(
            date__gte=start_date, date__lte=end_date
        ).order_by("date")

    # Group by month
    monthly_data = defaultdict(list)
    for record in attendance_records:
        month_key = record.date.strftime("%Y-%m")
        monthly_data[month_key].append(record.total_count)

    # Calculate averages
    months = sorted(monthly_data.keys())
    averages = [sum(monthly_data[month]) / len(monthly_data[month]) for month in months]

    return JsonResponse({"labels": months, "data": averages, "months": months})


@csrf_exempt
@require_http_methods(["GET"])
def api_executive_positions(request):
    """API endpoint for executive positions"""
    return JsonResponse(
        {
            "local": dict(LOCAL_EXECUTIVE_POSITIONS),
            "district": dict(DISTRICT_EXECUTIVE_POSITIONS),
        }
    )


@csrf_exempt
@require_http_methods(["GET"])
def api_dashboard_stats(request):
    """API endpoint for dashboard statistics"""
    try:
        user_congregation = Congregation.objects.get(user=request.user)
        is_district = user_congregation.is_district
    except Congregation.DoesNotExist:
        return JsonResponse(
            {"error": "User not associated with any congregation"}, status=400
        )

    if is_district:
        # District stats
        total_members = Guilder.objects.count()
        total_male = Guilder.objects.filter(gender="Male").count()
        total_female = Guilder.objects.filter(gender="Female").count()
        active_members = Guilder.objects.filter(membership_status="Active").count()
        distant_members = Guilder.objects.filter(membership_status="Distant").count()
        total_congregations = Congregation.objects.count()

        # Get executives and members
        district_executives = Guilder.objects.filter(
            is_executive=True, congregation__is_district=True
        ).order_by("executive_position", "first_name")

        local_executives = Guilder.objects.filter(
            is_executive=True, congregation__is_district=False
        ).order_by("congregation__name", "executive_position", "first_name")

        members = Guilder.objects.filter(is_executive=False).order_by(
            "first_name", "last_name"
        )

        return JsonResponse(
            {
                "is_district": True,
                "stats": {
                    "total_members": total_members,
                    "total_male": total_male,
                    "total_female": total_female,
                    "active_members": active_members,
                    "distant_members": distant_members,
                    "total_congregations": total_congregations,
                },
                "district_executives": [
                    {
                        "id": exec.id,
                        "name": f"{exec.first_name} {exec.last_name}",
                        "position": exec.executive_position,
                        "congregation": exec.congregation.name,
                    }
                    for exec in district_executives
                ],
                "local_executives": [
                    {
                        "id": exec.id,
                        "name": f"{exec.first_name} {exec.last_name}",
                        "position": exec.executive_position,
                        "congregation": exec.congregation.name,
                    }
                    for exec in local_executives
                ],
                "members": [
                    {
                        "id": member.id,
                        "name": f"{member.first_name} {member.last_name}",
                        "congregation": member.congregation.name,
                        "status": member.membership_status,
                    }
                    for member in members
                ],
            }
        )
    else:
        # Local stats
        total_members = Guilder.objects.filter(congregation=user_congregation).count()
        total_male = Guilder.objects.filter(
            congregation=user_congregation, gender="Male"
        ).count()
        total_female = Guilder.objects.filter(
            congregation=user_congregation, gender="Female"
        ).count()
        active_members = Guilder.objects.filter(
            congregation=user_congregation, membership_status="Active"
        ).count()
        distant_members = Guilder.objects.filter(
            congregation=user_congregation, membership_status="Distant"
        ).count()

        # Get executives and members
        executives = Guilder.objects.filter(
            congregation=user_congregation, is_executive=True
        ).order_by("executive_position", "first_name")

        members = Guilder.objects.filter(
            congregation=user_congregation, is_executive=False
        ).order_by("first_name", "last_name")

        return JsonResponse(
            {
                "is_district": False,
                "stats": {
                    "total_members": total_members,
                    "total_male": total_male,
                    "total_female": total_female,
                    "active_members": active_members,
                    "distant_members": distant_members,
                },
                "executives": [
                    {
                        "id": exec.id,
                        "name": f"{exec.first_name} {exec.last_name}",
                        "position": exec.executive_position,
                    }
                    for exec in executives
                ],
                "members": [
                    {
                        "id": member.id,
                        "name": f"{member.first_name} {member.last_name}",
                        "status": member.membership_status,
                    }
                    for member in members
                ],
            }
        )


# Birthday SMS Views
@login_required
def birthday_dashboard(request):
    today = timezone.now().date()
    birthdays_today = Guilder.objects.filter(
        date_of_birth__month=today.month, date_of_birth__day=today.day
    )

    sent_messages = BirthdayMessageLog.objects.filter(sent_date=today)

    context = {"birthdays_today": birthdays_today, "sent_messages": sent_messages}
    return render(request, "core/birthday_dashboard.html", context)


def send_birthday_sms(request, guilder_id):
    guilder = get_object_or_404(Guilder, id=guilder_id)
    today = timezone.now().date()

    # Check if message already sent today
    if BirthdayMessageLog.objects.filter(guilder=guilder, sent_date=today).exists():
        return JsonResponse({"success": False, "message": "SMS already sent today"})

    # TODO: Integrate with Twilio or SMS provider
    message = (
        f"Happy Birthday {guilder.first_name}! May God bless you abundantly. - YPG"
    )

    # Log the message
    BirthdayMessageLog.objects.create(guilder=guilder, sent_date=today, message=message)

    return JsonResponse({"success": True, "message": "Birthday SMS sent successfully"})


# --- Notification API Endpoints ---
@login_required
@require_GET
def api_notifications(request):
    user = request.user
    is_district = False
    try:
        user_congregation = Congregation.objects.get(user=user)
        is_district = user_congregation.is_district
    except Congregation.DoesNotExist:
        pass

    # District sees all, local sees only their congregation or direct notifications
    if is_district:
        notifications = Notification.objects.filter(congregation__is_district=False)
    else:
        notifications = Notification.objects.filter(
            congregation=user_congregation
        ) | Notification.objects.filter(recipient=user)
    notifications = notifications.order_by("-created_at")[:50]
    unseen_count = notifications.filter(is_read=False).count()

    data = [
        {
            "id": n.id,
            "title": n.title,
            "message": n.message,
            "type": n.notification_type,
            "is_read": n.is_read,
            "created_at": n.created_at.strftime("%Y-%m-%d %H:%M"),
            "change_details": n.change_details,
            "sender": n.user.username,
            "congregation": n.congregation.name,
        }
        for n in notifications
    ]
    return JsonResponse({"notifications": data, "unseen_count": unseen_count})


@login_required
@require_POST
def api_mark_notification_read(request):
    notif_id = request.POST.get("id")
    try:
        notif = Notification.objects.get(id=notif_id, recipient=request.user)
        notif.is_read = True
        notif.save()
        return JsonResponse({"success": True})
    except Notification.DoesNotExist:
        return JsonResponse({"success": False, "error": "Notification not found"})


@login_required
@require_POST
def api_clear_notifications(request):
    Notification.objects.filter(recipient=request.user).delete()
    return JsonResponse({"success": True})


@login_required
@require_POST
def api_send_manual_notification(request):
    user = request.user
    try:
        user_congregation = Congregation.objects.get(user=user)
        if not user_congregation.is_district:
            return JsonResponse(
                {
                    "success": False,
                    "error": "Only district admins can send notifications",
                }
            )
    except Congregation.DoesNotExist:
        return JsonResponse({"success": False, "error": "No congregation found"})

    data = json.loads(request.body)
    target = data.get("target")  # 'all' or 'local'
    message = data.get("message")
    title = data.get("title")
    local_id = data.get("local_id")

    if target == "all":
        for congregation in Congregation.objects.filter(is_district=False):
            create_notification(
                user=user,
                congregation=congregation,
                notification_type="manual",
                title=title,
                message=message,
            )
    elif target == "local" and local_id:
        congregation = Congregation.objects.get(id=local_id)
        create_notification(
            user=user,
            congregation=congregation,
            notification_type="manual",
            title=title,
            message=message,
        )
    else:
        return JsonResponse({"success": False, "error": "Invalid target"})
    return JsonResponse({"success": True})
