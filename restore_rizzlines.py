import json

with open('public/rizz-data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open('rizzlines.txt', 'w', encoding='utf-8') as f:
    for category, lines in data.items():
        f.write(f"{category}:\n")
        for line in lines:
            f.write(f"{line}\n")
        f.write("\n")

