//hardcoded, searching through all fields would slow down the script unnecessarily
var pairs = [
    ["INSunday", "OUTSunday"],
    ["INSunday_2", "OUTSunday_2"]
];

var invalidFlag = false; 

//IMPLEMENTATION CAUSES ANYTHING WITHIN 7 MINUTES TO BE COUNTED AS A QUARTER HOUR E.G. BOTH 1:30 TO 1:53 AND 1:30 TO 2:07 EQUAL .5 HOURS WORKED
function toQuarterHour(num) {
    return Math.round(num * 4)/ 4;
}

function extractHourDecimal(str) {
    if (!str) { return 0; }
    var match = str.match(/\b(\d+)(?::(\d+)|\.(\d+))?\s*(A\s*\.?\s*M\.?|P\s*\.?\s*M\.?)?\b/i);
    if (!match) { return 0; }
    var hour = parseInt(match[1]);
    var colonMinute = match[2] ? parseInt(match[2]) : 0;
    var decimalMinute = match[3] ? parseFloat("0." + match[3])*60 : 0;
    var minute = colonMinute + decimalMinute;
    var ampm = match[4] ? match[4].replace(/[\.\s]/g, "").toUpperCase() : "";
    if ((hour > 12 && ampm) || (hour > 24 && !ampm) || minute >= 60) {
        app.alert("Invalid time entry: " + str);
        invalidFlag = true;
        return 0;
    }
    if (ampm === "PM" && hour < 12) { hour += 12; }
    if (ampm === "AM" && hour === 12) { hour = 0; }
    return hour + minute/60;
}

var inVal = getField(pairs[0][0]).valueAsString;
var outBreakVal = getField(pairs[0][1]).valueAsString;
var inBreakVal = getField(pairs[1][0]).valueAsString;
var outVal = getField(pairs[1][1]).valueAsString;

var total = 0;

if(inVal && outVal) {
    var inTime = extractHourDecimal(inVal);
    var outTime = extractHourDecimal(outVal);
    if(outTime < inTime) {
        //handles 9 to 5 without explicit am & pm as well as overnights
        outTime += (inTime <= 12 && outTime <=12) ? 12 : 24;
    }
    total += toQuarterHour(outTime - inTime);
    if(outBreakVal && inBreakVal)   {
        var outBreakTime = extractHourDecimal(outBreakVal);
        var inBreakTime = extractHourDecimal(inBreakVal);
        if(inBreakTime < outBreakTime) {
            inBreakTime += (inBreakTime <= 12 && outBreakTime <= 12) ? 12 : 24; 
        }
        total -= toQuarterHour(inBreakTime - outBreakTime);
    }
}

if(total <= 0 || invalidFlag)  {
    event.value = "";
}
else    {
    event.value = total;
}