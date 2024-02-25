import csv
import json


def csv_to_json(csv_file, output_file):
    json_objects = []

    with open(csv_file, "r") as file:
        reader = csv.DictReader(file)
        for row in reader:
            route_parts = row["fullRoute"].split(maxsplit=8)

            # Do the jet plan
            route_parts[1] = "B737/L"
            json_object = {
                "rawFlightPlan": " ".join(route_parts),
                "flow": row["flow"].upper(),
            }
            json_object["expectedSID"] = row["expectedSIDJet"]
            json_objects.append(json_object)

            # Do the non-jet plan
            route_parts[1] = "C172/G"
            json_object = {
                "rawFlightPlan": " ".join(route_parts),
                "flow": row["flow"].upper(),
            }
            json_object["expectedSID"] = row["expectedSIDNonJet"]
            json_objects.append(json_object)

    with open(output_file, "w") as out_file:
        json.dump(json_objects, out_file, indent=4)


if __name__ == "__main__":
    csv_file = "kseaPlans - South.csv"
    output_file = "kseaPlans - South.json"
    csv_to_json(csv_file, output_file)
