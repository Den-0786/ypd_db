from django.utils.timezone import now

from .models import SundayAttendance


def get_sunday_comparison():
    today = now().date()

    sundays = (
        SundayAttendance.objects.order_by("-date")
        .values_list("date", flat=True)
        .distinct()
    )[:2]

    if len(sundays) < 2:
        return None

    latest, previous = sundays[0], sundays[1]

    latest_data = (
        SundayAttendance.objects.filter(date=latest)
        .values("congregation__name")
        .annotate(male=sum("male_count"), female=sum("female_count"))
    )

    previous_data = (
        SundayAttendance.objects.filter(date=previous)
        .values("congregation__name")
        .annotate(total=sum("male_count") + sum("female_count"))
    )

    prev_map = {entry["congregation__name"]: entry["total"] for entry in previous_data}

    comparison = []
    for item in latest_data:
        name = item["congregation__name"]
        total_now = item["male"] + item["female"]
        total_before = prev_map.get(name, 0)
        growth = total_now - total_before
        change = "increase" if growth > 0 else "decrease" if growth < 0 else "no change"

        comparison.append(
            {
                "name": name,
                "male": item["male"],
                "female": item["female"],
                "total": total_now,
                "previous_total": total_before,
                "change": change,
                "growth": abs(growth),
            }
        )

    return comparison
