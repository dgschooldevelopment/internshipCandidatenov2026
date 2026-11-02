/**
 * =========================================================================
 * DreamsGuider & Sarvaj Edtech Pvt. Ltd.
 * Google Apps Script for Automated Two-Stage Registration & Payment Tracking
 * =========================================================================
 *
 * HOW IT WORKS:
 * 1. Stage 1 (Payment Page Reached):
 *    When a student fills the form and reaches the payment page, a new row is created.
 *    - Column C "Enrolled": "No (Pending Payment)" (Highlighted Amber)
 *    - Column D "Stage / Status": "Payment Page Reached"
 *    - Column E "Transaction / UTR ID": "Pending"
 *
 * 2. Stage 2 (Payment Completed):
 *    When the student pays and enters their 12-digit UTR / Reference ID,
 *    this script searches for their "Registration ID" and UPDATES the existing row:
 *    - Column C "Enrolled": "Yes (Enrolled)" (Highlighted Emerald Green)
 *    - Column D "Stage / Status": "Payment Completed"
 *    - Column E "Transaction / UTR ID": [User's 12-digit UTR ID]
 *    - Column A "Timestamp": Updated with the payment time
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for other processes to finish
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Auto-create header row with nice styling if the sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp",
        "Registration ID",
        "Enrolled",
        "Stage / Status",
        "Transaction / UTR ID",
        "Program Fee (INR)",
        "Full Name",
        "Phone Number",
        "Email Address",
        "Internship Track",
        "Duration",
        "College / Institution",
        "Degree",
        "Passout Year",
        "Current Status",
        "Experience Level",
        "LinkedIn Profile",
        "GitHub Profile",
        "Additional Notes"
      ];
      sheet.appendRow(headers);

      // Header row styling: Dark Indigo background with white bold text
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#312e81"); // Indigo 900
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(10);
      sheet.setFrozenRows(1);
    }

    var regId = data.regId || "";
    var existingRow = -1;

    // Search for existing Registration ID in Column B (Column 2)
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var regIds = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      for (var i = 0; i < regIds.length; i++) {
        if (regIds[i][0] == regId) {
          existingRow = i + 2; // +2 offset for 1-based indexing and header row
          break;
        }
      }
    }

    var enrolledVal = data.enrolled || (data.paymentStatus === "PAID" ? "Yes (Enrolled)" : "No (Pending Payment)");
    var stageVal = data.stage || (data.paymentStatus === "PAID" ? "Payment Completed" : "Payment Page Reached");
    var utrVal = data.utrNumber || (data.paymentStatus === "PAID" ? "" : "Pending");

    if (existingRow !== -1) {
      // UPDATE EXISTING ROW (Candidate completed payment)
      sheet.getRange(existingRow, 1).setValue(new Date());   // Column A: Update Timestamp
      sheet.getRange(existingRow, 3).setValue(enrolledVal);  // Column C: Enrolled
      sheet.getRange(existingRow, 4).setValue(stageVal);     // Column D: Stage / Status
      sheet.getRange(existingRow, 5).setValue(utrVal);       // Column E: UTR / Transaction ID

      // Apply Green badge style for Enrolled candidates
      if (enrolledVal.indexOf("Yes") !== -1) {
        sheet.getRange(existingRow, 3).setBackground("#dcfce7").setFontColor("#15803d").setFontWeight("bold");
      }
    } else {
      // INSERT NEW ROW (Candidate just reached payment page)
      var newRow = [
        new Date(),
        regId,
        enrolledVal,
        stageVal,
        utrVal,
        data.amount || "",
        data.fullName || "",
        "'" + (data.phone || ""), // Prefix with ' to preserve phone formatting in Excel/Sheets
        data.email || "",
        data.trackName || "",
        data.duration || "",
        data.college || "",
        data.degree || "",
        data.passoutYear || "",
        data.currentStatus || "",
        data.experienceLevel || "",
        data.linkedinUrl || "",
        data.githubUrl || "",
        data.notes || ""
      ];
      sheet.appendRow(newRow);

      var addedRowNum = sheet.getLastRow();
      if (enrolledVal.indexOf("Yes") !== -1) {
        // Enrolled
        sheet.getRange(addedRowNum, 3).setBackground("#dcfce7").setFontColor("#15803d").setFontWeight("bold");
      } else {
        // Pending Payment
        sheet.getRange(addedRowNum, 3).setBackground("#fef3c7").setFontColor("#b45309").setFontWeight("bold");
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      regId: regId,
      enrolled: enrolledVal,
      stage: stageVal
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
