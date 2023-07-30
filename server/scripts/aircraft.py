# Converts an aircraft_info.dat file into mongodb insert statements.
import csv
import json

# Define the MongoDB collection name
collection_name = "aircraft"

# Open the input file
filename = "../data/aircraft_info.dat"

with open(filename, "r") as file:
    # Read the tab-delimited file using a CSV reader
    reader = csv.reader(file, delimiter="\t")

    # Get the header row
    header = next(reader)

    # Prepare the documents list
    documents = []
    for row in reader:
        # Create a dictionary for each row using the header fields as keys
        doc = dict(zip(header, row))

        if len(doc.keys()) < 9:
            print(f"Skipping {' '.join(row)} because it is malformed")
            continue

        if doc["engineType"] == "J":
            doc["aircraftClass"] = "J"
        elif doc["KPDXIfrAltitude"] == "3000":
            doc["aircraftClass"] = "S"
        elif doc["KPDXIfrAltitude"] == "6000":
            doc["aircraftClass"] = "L"
        else:
            doc["aircraftClass"] = "U"

        # The common equipment suffixes column needs to get split into a json array.
        if "commonEquipmentSuffixes" in doc:
            doc["commonEquipmentSuffixes"] = doc["commonEquipmentSuffixes"].split()

        # Remove unnecessary columns
        doc.pop("KPDXIfrAltitude");
        doc.pop("KPDXVfrAltitude");
        
        # Add the document to the list
        documents.append(doc)

# Generate the insert statement using insertMany
insert_statement = ("use(\"plan-verifier\");\n\n"
                    f"db.{collection_name}.deleteMany({{}});\n\n"
                    f"db.{collection_name}.insertMany({json.dumps(documents, indent=2)})")

# Print or write the output script
# print(output_script)
with open("add_aircraft.js", "w") as output_file:
     output_file.write(insert_statement)
