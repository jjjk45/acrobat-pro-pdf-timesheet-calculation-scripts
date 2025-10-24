var days = [
    "HourSunday_2",
    "HourMonday_2",
    "HourTuesday_2",
    "HourWednesday_2",
    "HourThursday_2",
    "HourFriday_2",
    "HourSaturday_2"
];

var total = 0;
for(var i=0; i<days.length; i++)    {
    var current = parseFloat(getField(days[i]).value);
    if(!isNaN(current)) { total += current; }
}

event.value = (total > 0 ? total : "");
