import os
import re

for filename in os.listdir('.'):
    if filename.endswith('.md'):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 修复 date 格式（移除时间部分）
        content = re.sub(r'date: (\d{4})-(\d{2})-(\d{2}) \d{2}:\d{2}:\d{2}', r'date: "\1-\2-\3"', content)
        
        # 修复 categories 为 category
        content = re.sub(r'categories:', 'category:', content)
        
        # 确保 title 有引号
        content = re.sub(r'title: ([^"\n][^\n]*)', r'title: "\1"', content)
        
        # 确保 category 有引号
        content = re.sub(r'category: ([^"\n][^\n]*)', r'category: "\1"', content)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Fixed: {filename}")

print("\n🎉 所有文章格式已修复！")
