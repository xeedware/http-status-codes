BEGIN {
	FS=",";
	print "{";
}
{
    # Skip if code is unassigned.
	if (NR!=1 && $2 != "Unassigned") {
	    if(NR>2) {
	        print ",";
        }
		# strip end-of-line character
		gsub(/\r/, "", $3);
		if (index($3, "@@")) {
		    # Replace the '@@' that sed added to delimit
		    gsub(/@@/, "],[", $3); # replace "@@" with ","
		}
        gsub(/\[/, "", $3); # remove "["
        gsub(/\]/, "", $3); # remove "]"
		printf "%s", "  \"" $1 "\": [{" "\"reasonPhrase\": \"" $2 "\", \"reference\": [" $3"]}]";
	}
}
END {
	print "\n}";
}
