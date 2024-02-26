import json


def latitude_string_to_decimal(dms_str):
    # Extract components from the string
    direction = dms_str[0]  # Direction indicator, e.g., N or S
    degrees = int(dms_str[1:3])  # Degrees part
    minutes = int(dms_str[3:5])  # Minutes part
    seconds = int(dms_str[5:7])  # Seconds part
    fraction = int(dms_str[7:])  # Fractional part

    # Convert degrees, minutes, and seconds to decimal degrees
    decimal_degrees = degrees + minutes / 60 + seconds / 3600 + fraction / 360000

    # Adjust the sign based on the direction
    if direction == "S":
        decimal_degrees = -decimal_degrees

    return round(decimal_degrees, 4)


def longitude_string_to_decimal(dms_str):
    # Extract components from the string
    direction = dms_str[0]  # Direction indicator, e.g., W or E
    degrees = int(dms_str[1:4])  # Degrees part
    minutes = int(dms_str[4:6])  # Minutes part
    seconds = int(dms_str[6:8])  # Seconds part
    fraction = int(dms_str[8:])  # Fractional part

    # Convert degrees, minutes, and seconds to decimal degrees
    decimal_degrees = degrees + minutes / 60 + seconds / 3600 + fraction / 360000

    # Adjust the sign based on the direction
    if direction == "W":
        decimal_degrees = -decimal_degrees

    return round(decimal_degrees, 4)


def read_ARINC424_file(file_path):
    results = []
    try:
        # Open the ARINC424-formatted file
        with open(file_path, "r") as file:
            # Read each line in the file
            for line in file:
                if line[0:10] == "SUSAEAENRT":
                    data = {
                        "ident": line[13:18],
                        "class": "EA",
                        "name": line[13:18],
                        "type": 6,
                        "latitude": latitude_string_to_decimal(line[32:41]),
                        "longitude": longitude_string_to_decimal(line[41:51]),
                    }
                    results.append(data)
    except Exception as e:
        print(f"Error reading ARINC424 file: {e}")
    return results


# Example usage
if __name__ == "__main__":
    file_path = "../data/FAACIFP18"
    output_file = "add_waypoints.js"
    results = read_ARINC424_file(file_path)

    insert_statement = (
        'use("plan-verifier");\n\n'
        f"db.navaids.insertMany({json.dumps(results, indent=2)})"
    )

    with open(output_file, "w") as outfile:
        outfile.write(insert_statement)
