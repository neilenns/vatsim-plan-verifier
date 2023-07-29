import csv
import json

def csv_to_json(csv_file):
    json_data = []

    with open(csv_file, 'r', newline='') as file:
        reader = csv.DictReader(file)
        for row in reader:
            json_entry = {
                'ident': row['IDENT'],
                'class': row['CLASS_TXT'],
                'name': row['NAME_TXT'],
				'type': int(row['TYPE_CODE'])
            }
            json_data.append(json_entry)

    return json_data

def main():
    csv_file = '../data/NAVAID_System.csv'
    json_data = csv_to_json(csv_file)

    output_file = 'output_file.json'
    with open(output_file, 'w') as outfile:
        json.dump(json_data, outfile, indent=2)

if __name__ == '__main__':
    main()
