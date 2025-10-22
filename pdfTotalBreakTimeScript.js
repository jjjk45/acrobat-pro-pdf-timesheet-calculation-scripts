invalidFlag = false; 

//IMPLEMENTATION CAUSES ANYTHING WITHIN 7 MINUTES TO BE COUNTED AS A QUARTER HOUR E.G. BOTH 1:30 TO 1:53 AND 1:30 TO 2:07 EQUAL .5 HOURS WORKED
function toQuarterHour(num) {
    return Math.round(num * 4)/ 4;
}

function extractHourDecimal(str) {
    if (!str) { return 0; }
    var match = str.match(/\b(\d+)(?::(\d+)|\.(\d+))?\s*(A\.?M\.?|P\.?M\.?)?/i);
    if (!match) { return 0; }
    var hour = parseInt(match[1]);
    var colonMinute = match[2] ? parseInt(match[2]) : 0;
    var decimalMinute = match[3] ? parseFloat("0." + match[3])*60 : 0;
    var minute = colonMinute + decimalMinute;
    var ampm = match[4] ? match[4].toUpperCase() : "";
    if ((hour > 12 && ampm) || (hour > 24 && !ampm) || minute >= 60) {
        app.alert("Invalid time entry: " + str);
        invalidFlag = true;
        return 0;
    }
    if (ampm === "PM" && hour < 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
    return hour + minute/60;
}

//hardcoded, searching for fields would slow down the script unnecessarily
var pair = ["OUTSunday", "INSunday_2"];

var outBreakVal = getField(pair[0]).valueAsString;
var inBreakVal = getField(pair[1]).valueAsString;

var total = 0;

if(inBreakVal && outBreakVal) {
    var inBreakTime = extractHourDecimal(inBreakVal);
    var outBreakTime = extractHourDecimal(outBreakVal);
    total += toQuarterHour(inBreakTime - outBreakTime);
}

if(total <= 0 || invalidFlag)  {
    event.value = "";
}
else    {
    event.value = total;
}