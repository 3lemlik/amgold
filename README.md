# AM GOLD — شلون ترفعه وتربطه

## 1) ارفعه على GitHub
1. سوي ريبو جديد باسم `amgold`.
2. ارفع كل الملفات اللي بهذا المجلد (index.html و manifest.json و sw.js والأيقونات و .nojekyll).
3. من Settings ← Pages اختار فرع `main` واحفظ. الرابط راح يصير: `https://3lemlik.github.io/amgold/`

هسه يشتغل بالوضع التجريبي، يعني الشارت والرسم والتنبيهات تشتغل، بس البيانات تبقى بجهازك.

## 2) اربط Firebase (حتى تشارك التحليلات ويا الطلاب)
1. ادخل console.firebase.google.com وسوي مشروع جديد باسم `amgold`.
2. **Authentication** ← Sign-in method ← فعّل **Email/Password**.
3. **Authentication** ← Users ← Add user:
   - الإيميل: `aligold@amnet.com`
   - الباسورد: الرمز اللي تريد تدخل بيه إنت (6 أو أكثر)
4. **Firestore Database** ← Create database (Production).
5. **Firestore** ← Rules: امسح اللي بيها والصق محتوى ملف `firestore.rules`، وبعدين Publish.
6. Project settings ← Your apps ← دوس `</>` (Web) ← سجّل التطبيق ← انسخ `firebaseConfig`.
7. افتح `index.html` ودوّر على `const FB = window.AMG_FB ||` والصق القيم بداله (apiKey و authDomain و projectId…). احفظ وارفعه.

بعد الربط تدخل بالرمز مالتك، ومن صفحة **الطلاب** تضيف كل طالب برمز ومدة.

## 3) ربط أخبار Forex Factory
1. افتح script.google.com بنفس حساب Google ← New project.
2. امسح الكود اللي بيه والصق محتوى ملف `news-apps-script.gs`، واحفظ.
3. Deploy ← New deployment ← اختار النوع Web app.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. دوس Deploy ← وافق على الصلاحيات ← انسخ رابط الـ Web app (ينتهي بـ `/exec`).
5. بالموقع: الإعدادات ← مصدر الأخبار ← الصق الرابط ← احفظ وجرّب.

## 4) الـ rules الجديدة
بعد هذا التحديث لازم تلصق ملف `firestore.rules` الجديد بالـ Firestore ← Rules وتدوس Publish (بيه الدردشة والإعدادات العامة).
