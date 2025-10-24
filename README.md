# Adobe Acrobat Pro PDF Timesheet Calculation Scripts

This repository contains JavaScript scripts designed for Adobe Acrobat PDF forms to calculate total hours on employee timesheets automatically. When I needed them, I really wished they already existed, so I'm sharing them.

---

## Features

- **Supports multiple time formats with regexes**: 8:30, 8.5, 1:45 PM, arrived at 7:15 a. m., etc.
- **Quarter-hour rounding**: Automatically rounds total hours to the nearest 0.25.
- **Validation**: Alerts users on invalid entries like '13 PM' or '8:75'.  
- **Break handling**: Supports calculating breaks between shifts.  

---

## Usage

1. Create your timesheet PDF in Adobe Acrobat or use the sample provided
2. Edit the pairs variable to include the name of your fields you would like to calculate 
3. Enter Prepare Form mode in Adobe Acrobat  
4. Select the field where you want the total calculated (Don't use the side bar, click the field in the PDF itself. It should be blacked out. For some reason, if you access the properties from the side bar, the script will not save.)  
5. Right-click → Properties → Calculate → Custom Calculation Script → Edit.  
6. Paste the desired script from this repository.  
7. Press OK and test by entering IN/OUT times.

There is a timesheet with the scripts already applied in the sample timesheets folder :)

---

## Notes

- Scripts are designed for **Adobe Acrobat Pro**, not just Acrobat Reader.  
- Use plain text editors when copying scripts to avoid hidden characters that break Acrobat.
- The Math.round implementation for quarter hours causes anything within 7 minutes of a quarter hour to be counted as one. For example, both 1:30 to 1:53 and 1:30 to 2:07 are counted as .5 hours total.

## To Do

- At this time the script does not handle cases where users do not specify AM and PM in cases where time worked is in both. For example, a user puts 10 for IN and 1 for OUT, meaning 10 AM and 1 PM but failing to specify, the total time difference (1 - 10) would be negative and nothing would be displayed. I will update it soon so that, if the total between times is negative, the out time will automatically be +=12.

---
