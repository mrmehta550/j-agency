import os, re, glob
html_files = glob.glob(r'c:\Users\hp\Desktop\startup\templates\**\*.html', recursive=True)
css_files = glob.glob(r'c:\Users\hp\Desktop\startup\static\css\*.css')

html_containers = set()
for f in html_files:
    content = open(f, 'r', encoding='utf-8', errors='ignore').read()
    found = re.findall(r'class="([^"]*container[^"]*)"', content)
    for c in found:
        html_containers.update(c.split())

css_containers = set()
for f in css_files:
    content = open(f, 'r', encoding='utf-8', errors='ignore').read()
    found = re.findall(r'\.([a-zA-Z0-9_-]*container[a-zA-Z0-9_-]*)', content)
    css_containers.update(found)

print("Containers in HTML but not in CSS:")
for c in sorted(html_containers):
    if c not in css_containers and "container" in c:
        print(c)

print("\nCSS containers:")
print(sorted(css_containers))
