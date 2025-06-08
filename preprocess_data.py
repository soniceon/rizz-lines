import json
import re

def parse_rizz_file(input_file):
    """
    Parses the categorized rizz lines text file and returns a dictionary.
    """
    rizz_data = {}
    current_category = None
    
    with open(input_file, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            
            # Check if the line is a category header (doesn't start with a number)
            if not re.match(r'^\d+\.', line):
                current_category = line
                if current_category not in rizz_data:
                    rizz_data[current_category] = []
            # It's a rizz line
            elif current_category:
                # Remove the leading number, e.g., "1. "
                rizz_line = re.sub(r'^\d+\.\s*', '', line)
                rizz_data[current_category].append(rizz_line)
                
    return rizz_data

def main():
    """
    Main function to read txt, convert to json, and save.
    """
    input_filename = 'rizzlines.txt'
    output_filename = 'public/rizz-data.json'
    
    print(f"Reading from {input_filename}...")
    data = parse_rizz_file(input_filename)
    
    # Ensure the output directory exists
    import os
    os.makedirs(os.path.dirname(output_filename), exist_ok=True)
    
    print(f"Writing structured data to {output_filename}...")
    with open(output_filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        
    print("Preprocessing complete!")
    # Count categories and lines for verification
    category_count = len(data)
    line_count = sum(len(lines) for lines in data.values())
    print(f"Successfully processed {category_count} categories and {line_count} lines.")

if __name__ == '__main__':
    main() 