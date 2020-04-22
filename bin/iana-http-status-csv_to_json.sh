#! /bin/bash
SRC_URL=https://www.iana.org/assignments/http-status-codes/http-status-codes-1.csv

# Steps:
# 1. Download the CSV from IANA.
# 2. Use sed to
# 	 a. remove double quotes
#       Some references have enclosing double-quotes,
#       and some do not. Normalize the input by
#       removing the double quotes.
# 	 b. replace ', ' to ' - '
#       Some references have a ', " delimiting the
#       RFC from Section.
#       We need to delimit code, reason phrase and
#       reference with existing ','s therefore
#       replace the reference ', ' with a ' - '.
# 	 c. References are now enclosed in braces.
#       Some status codes have more than 1 reference.
#       We need to enclose each reference by double quotes.
#       As in item b above, we need to delimit code,
#       reason phrase and reference with existing ','s.
#       Therefore, delimit multiple references by a
#       '@@' placeholder.
# 	      1) replace '][' to '@@'
# 	      2) replace '[' to '"'
# 	      3) replace ']' to '"'
# 3. Use gawk process the results from sed to generate JSON
#    a. Skipping unassigned codes
#    b. Replacing @@ with '", "'
#    c. Enclosing the references field in braces.

AWK_FILE=iana-http-status-csv_to_json.awk
if [ ! -f "$AWK_FILE" ]
then
  AWK_FILE="./bin/$AWK_FILE"
fi
if [ ! -f "$AWK_FILE" ]
then
  echo "Error: cannot find awk file '$AWK_FILE'."
  exit
fi

curl -s $SRC_URL \
| sed -e 's/"//g' -e 's/, / - /g' \
| sed -e "s/\]\[/'@@'/g" \
| sed -e "s/\[/\"/g" -e "s/\]/\"/g" \
| gawk -f "$AWK_FILE"
