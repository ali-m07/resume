# دیپلوی و GitHub Pages

بعد از هر **push** به برنچ `main`، workflow خودکار build می‌گیرد و روی برنچ `gh-pages` دیپلوی می‌کند.

## یک‌بار تنظیم (فقط اگر سایت به‌روز نمی‌شود)

۱. برو **GitHub** → ریپو **resume** → **Settings** → **Pages**
۲. زیر **Build and deployment**:
   - **Source:** گزینه **Deploy from a branch** را بگذار
   - **Branch:** از لیست برنچ **gh-pages** را انتخاب کن و مسیر **/ (root)**
۳. **Save** بزن

از این به بعد با هر push به `main`، سایت خودکار از روی برنچ `gh-pages` به‌روز می‌شود و آدرس همان است:

**https://ali-m07.github.io/resume**

## قبل از push (اختیاری)

اگر می‌خواهی مطمئن شوی build خطا نمی‌دهد، یک‌بار محلی اجرا کن:

```bash
npm run build
```

اگر خطا داد، همان را برطرف کن بعد push کن.

## اگر دیپلوی خطا داد

- برو تب **Actions** در همین ریپو و آخرین اجرای workflow را باز کن؛ لاگ خطا را آنجا ببین.
- اگر برنچ `gh-pages` وجود نداشت، یک‌بار workflow را با **Run workflow** دستی اجرا کن تا برنچ ساخته شود.
