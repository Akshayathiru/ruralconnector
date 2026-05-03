const fs = require('fs');

let content = fs.readFileSync('src/translations.js', 'utf8');

const newTranslations = {
  en: {
    book_appointment: "Book Appointment",
    with_doctor: "with",
    confirm_booking: "Confirm Booking",
    booking_confirmed: "Booking Confirmed!",
    slot_confirmed_for: "Your slot is confirmed for",
    today: "today.",
    join_video_call: "Join Video Call"
  },
  te: {
    book_appointment: "అపాయింట్‌మెంట్ బుక్ చేయండి",
    with_doctor: "తో",
    confirm_booking: "బుకింగ్‌ను నిర్ధారించండి",
    booking_confirmed: "బుకింగ్ నిర్ధారించబడింది!",
    slot_confirmed_for: "మీ స్లాట్ దీనికి నిర్ధారించబడింది",
    today: "ఈరోజు.",
    join_video_call: "వీడియో కాల్‌లో చేరండి"
  },
  ta: {
    book_appointment: "முன்பதிவு செய்ய",
    with_doctor: "உடன்",
    confirm_booking: "முன்பதிவை உறுதிப்படுத்துக",
    booking_confirmed: "முன்பதிவு உறுதிப்படுத்தப்பட்டது!",
    slot_confirmed_for: "உங்கள் ஸ்லாட் இதற்காக உறுதிப்படுத்தப்பட்டுள்ளது",
    today: "இன்று.",
    join_video_call: "வீடியோ அழைப்பில் சேரவும்"
  },
  ml: {
    book_appointment: "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക",
    with_doctor: "കൂടെ",
    confirm_booking: "ബുക്കിംഗ് സ്ഥിരീകരിക്കുക",
    booking_confirmed: "ബുക്കിംഗ് സ്ഥിരീകരിച്ചു!",
    slot_confirmed_for: "നിങ്ങളുടെ സ്ലോട്ട് ഇതിനായി സ്ഥിരീകരിച്ചു",
    today: "ഇന്ന്.",
    join_video_call: "വീഡിയോ കോളിൽ ചേരുക"
  },
  mr: {
    book_appointment: "अपॉइंटमेंट बुक करा",
    with_doctor: "सोबत",
    confirm_booking: "बुकिंगची पुष्टी करा",
    booking_confirmed: "बुकिंग निश्चित झाले!",
    slot_confirmed_for: "तुमचा स्लॉट यासाठी निश्चित झाला आहे",
    today: "आज.",
    join_video_call: "व्हिडिओ कॉलमध्ये सामील व्हा"
  },
  hi: {
    book_appointment: "अपॉइंटमेंट बुक करें",
    with_doctor: "के साथ",
    confirm_booking: "बुकिंग की पुष्टि करें",
    booking_confirmed: "बुकिंग पक्की हो गई!",
    slot_confirmed_for: "आपका स्लॉट इसके लिए पक्का हो गया है",
    today: "आज।",
    join_video_call: "वीडियो कॉल से जुड़ें"
  }
};

let mod = null;
eval(content.replace('export const translations = ', 'mod = '));

for (let lang in newTranslations) {
  if (!mod[lang]) mod[lang] = {};
  for (let key in newTranslations[lang]) {
    mod[lang][key] = newTranslations[lang][key];
  }
}

const finalOutput = 'export const translations = ' + JSON.stringify(mod, null, 2) + ';';
fs.writeFileSync('src/translations.js', finalOutput);
console.log('Modal translations updated.');
