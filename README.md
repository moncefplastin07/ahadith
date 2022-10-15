# Usage

موقع للتاكد من صحة الاحاديث النبوية المنقول عن النبي محمد صلى الله عليه وسلم
A website to verify the authenticity of hadiths transmitted from the Prophet Muhammad, may God bless him and grant him peace

مصدر الاحاديث (ahadith source): https://dorar.net
```JS
const searchQuery = "انما الاعمال بالنيات"
const response = await fetch(`https://hadith.deno.dev/?q=${searchQuery}`)
```

Running
```cmd
deno run --allow-net app.ts
```