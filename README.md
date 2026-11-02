# DreamsGuider & Sarvaj Edtech Pvt. Ltd.
## GenAI with Data Science: Training & Internship Portal

हा **DreamsGuider** आणि **Sarvaj Edtech Pvt. Ltd.** यांच्या **GenAI with Data Science: Training & Internship Program** चा अधिकृत लँडिंग पेज, नोंदणी अर्ज आणि पेमेंट पोर्टल आहे.

---

## 🎯 मुख्य वैशिष्ट्ये (Key Features)

1. **दोन विशेष इंटर्नशिप ट्रॅक्स आणि अचूक फी (Internship Tracks & Fees):**
   - **Option 1: Fast-Track 1.5-Month Internship (६ आठवडे)**
     - **Program Fee:** **₹2,899** (मूळ फी: ₹5,999 — 51% OFF)
     - **फोकस:** Rapid skill upgrade आणि focused project development.
     - **मिळणारी प्रमाणपत्रे:** 
       - Internship Completion Certificate (Sarvaj Edtech Pvt. Ltd.)
       - Project Completion Certificate
   - **Option 2: Comprehensive 3-Month Internship (१२ आठवडे - सर्व समावेशक)**
     - **Program Fee:** **₹4,398** (मूळ फी: ₹8,999 — 51% OFF)
     - **फोकस:** Deep technical mastery आणि professional credentialing.
     - **मिळणारी अधिकृत कागदपत्रे:**
       - Internship Completion Certificate (Sarvaj Edtech Pvt. Ltd.)
       - Project Completion Certificate (if applicable)
       - Experience Letter (where applicable)
       - Letter of Recommendation (for eligible candidates)
       - Performance Evaluation Report
       - Appreciation Certificate (for outstanding performers)

2. **अचूक UPI पेमेंट आणि संपर्क माहिती (Official Contact & UPI):**
   - **अधिकृत UPI ID:** `9373346490-2@ybl`
   - **अधिकृत मोबाईल / WhatsApp:** `+91 9373346490`
   - **अधिकृत ईमेल:** `dreamsguider@gmail.com`
   - ट्रॅक निवडल्यानुसार बरोबर **₹2,899** किंवा **₹4,398** चा डायनॅमिक QR कोड आणि मोबाईल UPI लिंक जनरेट होते.
   - विद्यार्थी Google Pay, PhonePe, Paytm, BHIM द्वारे पेमेंट करून त्यांचा 12-अंकी UTR / Transaction ID नोंदवतात.

3. **कोणताही ॲडमिन पोर्टल नाही — संपूर्ण डेटा थेट तुमच्या Google Sheet मध्ये (Direct Google Sheets Only):**
   - तुमच्या सूचनेनुसार वेबसाइटवरून **Admin Portal पूर्णपणे काढून टाकण्यात आले आहे**.
   - कोणालाही ॲडमिन पासवर्ड किंवा पोर्टल दिसणार नाही. संपूर्ण डेटा फक्त तुमच्या **Google Sheet** मध्ये जमा होईल.

4. **टू-स्टेज ट्रॅकिंग आणि "Enrolled" कॉलम (Two-Stage Tracking):**
   - **स्टेज १ (पेमेंट पेजपर्यंत कोण आले?):**
     विद्यार्थ्याने फॉर्म भरून "Apply & Proceed to Payment" वर क्लिक करताच त्याची Google Sheet मध्ये नोंद होते:
     - **Enrolled कॉलम:** `No (Pending Payment)` (पिवळ्या रंगात)
     - **Stage / Status कॉलम:** `Payment Page Reached`
     - **Transaction / UTR ID कॉलम:** `Pending`
   - **स्टेज २ (पेमेंट कोणी पूर्ण केले?):**
     विद्यार्थ्याने पेमेंट करून त्याचा १२-अंकी Transaction / UTR ID सबमिट करताच त्याच विद्यार्थ्याची ओळ Google Sheet मध्ये आपोआप अपडेट होते:
     - **Enrolled कॉलम:** `Yes (Enrolled)` (हिरव्या रंगात)
     - **Stage / Status कॉलम:** `Payment Completed`
     - **Transaction / UTR ID कॉलम:** विद्यार्थ्याने टाकलेला प्रत्यक्ष UTR नंबर
     - **Timestamp:** पेमेंट झालेली वेळ

---

## 📊 तुमच्या Google Sheet सोबत कसे कनेक्ट करायचे? (२ मिनिटांचा सोपा मार्ग)

तुमचा गुगल शीट लिंक:
`https://docs.google.com/document/d/1iOjhMCmMdCqTZPJRYVBho67QpajEPFnLsi9dj4DOobc/edit?usp=sharing`

Google Sheet मध्ये थेट डेटा येण्यासाठी खालील ३ सोप्या स्टेप्स करा:

### स्टेप १: Google Sheets मध्ये Apps Script उघडा
1. [Google Sheets](https://sheets.google.com) उघडा (किंवा नवीन Spreadsheet तयार करा).
2. वरच्या मेनूमध्ये **Extensions** वर क्लिक करा आणि **Apps Script** निवडा.

### स्टेप २: `GoogleSheet_Code.gs` मधील कोड पेस्ट करा
Apps Script मधील जुना कोड खोडून खालील कोड (किंवा प्रोजेक्टमधील `GoogleSheet_Code.gs` फाईल) पेस्ट करा:

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // जर शीट रिकामी असेल तर आपोआप सर्व हेडिंग तयार होतील
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp", "Registration ID", "Enrolled", "Stage / Status", "Transaction / UTR ID",
        "Program Fee (INR)", "Full Name", "Phone Number", "Email Address", "Internship Track",
        "Duration", "College / Institution", "Degree", "Passout Year", "Current Status",
        "Experience Level", "LinkedIn Profile", "GitHub Profile", "Additional Notes"
      ];
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#312e81");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    var regId = data.regId || "";
    var existingRow = -1;

    // आधीच्या ओळीत Registration ID आहे का ते तपासणे (Column B)
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var regIds = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      for (var i = 0; i < regIds.length; i++) {
        if (regIds[i][0] == regId) {
          existingRow = i + 2;
          break;
        }
      }
    }

    var enrolledVal = data.enrolled || (data.paymentStatus === "PAID" ? "Yes (Enrolled)" : "No (Pending Payment)");
    var stageVal = data.stage || (data.paymentStatus === "PAID" ? "Payment Completed" : "Payment Page Reached");
    var utrVal = data.utrNumber || (data.paymentStatus === "PAID" ? "" : "Pending");

    if (existingRow !== -1) {
      // जर विद्यार्थी आधीच पेमेंट पेजवर आला होता, तर आता त्याचीच ओळ अपडेट करा (Stage 2: Payment Done)
      sheet.getRange(existingRow, 1).setValue(new Date());
      sheet.getRange(existingRow, 3).setValue(enrolledVal);
      sheet.getRange(existingRow, 4).setValue(stageVal);
      sheet.getRange(existingRow, 5).setValue(utrVal);

      if (enrolledVal.indexOf("Yes") !== -1) {
        sheet.getRange(existingRow, 3).setBackground("#dcfce7").setFontColor("#15803d").setFontWeight("bold");
      }
    } else {
      // नवीन नोंद (Stage 1: Reached Payment Page)
      var newRow = [
        new Date(),
        regId,
        enrolledVal,
        stageVal,
        utrVal,
        data.amount || "",
        data.fullName || "",
        "'" + (data.phone || ""),
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
        sheet.getRange(addedRowNum, 3).setBackground("#dcfce7").setFontColor("#15803d").setFontWeight("bold");
      } else {
        sheet.getRange(addedRowNum, 3).setBackground("#fef3c7").setFontColor("#b45309").setFontWeight("bold");
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", regId: regId, enrolled: enrolledVal }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

### स्टेप ३: Deploy (Web App पब्लिश) करा
1. Apps Script मध्ये वरच्या उजव्या कोपऱ्यात **Deploy** बटणावर क्लिक करा -> **New deployment** निवडा.
2. डाव्या बाजूला गिअर (Gear) आयकॉनवर क्लिक करून **Web app** निवडा.
3. खालीलप्रमाणे २ पर्याय निवडा:
   - **Execute as:** `Me` (माझ्या Google खात्यावरून)
   - **Who has access:** `Anyone` (सर्वजण / कोणीही)
4. **Deploy** वर क्लिक करा. Google विचारल्यास "Authorize access" करून परवानगी द्या.
5. तुम्हाला एक **Web app URL** मिळेल (उदा. `https://script.google.com/macros/s/AKfycb.../exec`). ती कॉपी करा.

### स्टेप ४: URL लिंक करा
फक्त `js/app.js` फाईल उघडा आणि सर्वात वर लाईन १४ वर तुमची वेब ॲप लिंक पेस्ट करा:
```javascript
const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/तुमची_लिंक_येथे_पेस्ट_करा/exec";
```
*किंवा ब्राउझरमध्ये वेबसाइट उघडताना एकदा अशी लिंक ओपन करा:*
`http://localhost:5000/?webhook=https://script.google.com/macros/s/तुमची_लिंक/exec`

---

## 💻 लोकल सर्व्हर कसा चालवायचा?

प्रोजेक्ट डिरेक्टरीमध्ये फक्त `run.bat` वर डबल-क्लिक करा:
```cmd
run.bat
```
किंवा कमांड प्रॉम्प्ट / पॉवरशेल मध्ये:
```cmd
python server.py
```
त्यानंतर ब्राउझरमध्ये उघडा:
👉 **http://localhost:5000**
