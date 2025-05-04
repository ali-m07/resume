import json
import os

def check_for_suspect_objects(data, path=[]):
    if isinstance(data, dict):
        # اگر تمام کلیدها عدد هستند، احتمال اینکه باید array می‌بود بالا می‌ره
        if all(k.isdigit() for k in data.keys()):
            print(f"🚨 Suspect object (should be array) at {'.'.join(path)}")
        for key, value in data.items():
            check_for_suspect_objects(value, path + [key])
    elif isinstance(data, list):
        for idx, item in enumerate(data):
            check_for_suspect_objects(item, path + [str(idx)])

# فایل‌هایی که باید بررسی بشن
files = [
    "public/locales/en.json",
    "public/locales/tr.json",
    "public/locales/de.json"
]

for file in files:
    if os.path.exists(file):
        print(f"\n🔍 Checking {file}")
        with open(file, encoding='utf-8') as f:
            data = json.load(f)
            check_for_suspect_objects(data)
    else:
        print(f"❌ File not found: {file}")
