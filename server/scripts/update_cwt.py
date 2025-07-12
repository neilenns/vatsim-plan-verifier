import json
from pymongo import MongoClient

# Load JSON data
with open('cwt.json', 'r') as f:
    json_data = json.load(f)

# Connect to MongoDB
client = MongoClient("ADD CONNECTION STRING")
db = client["plan-verifier"]
collection = db["aircraft"]

# Track skipped records
skipped = []

for record in json_data:
    equipmentCode = record.get("TypeDesignator")
    cwt_value = record.get("CWT")

    if not equipmentCode or not cwt_value:
        skipped.append(record)
        continue

    result = collection.update_many(
        { "equipmentCode": equipmentCode },
        {
            "$unset": { "CWT": "" },
            "$set": { "cwt": cwt_value }
        }
    )

    if result.matched_count == 0:
        skipped.append(record)
    else:
        print(f"Updated {result.modified_count} document(s) for '{equipmentCode}'")

# Log skipped records
if skipped:
    with open("skipped_records.json", "w") as skip_log:
        json.dump(skipped, skip_log, indent=2)
    print(f"\n⚠️ {len(skipped)} record(s) skipped. See 'skipped_records.json' for details.")
else:
    print("\n✅ All records matched and updated.")
