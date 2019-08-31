#cat testing_text | cut -d'"' -f1 | sed -r -e's/^# *//;s/ [^0-9a-zA-Z]*$//;s/\[\[[^\[\]]*?\|([^\[\]]*?)\]\]/\1/g'
#;s/]//g;s/\[//g;s/]//g'
#cat testing_text | cut -d'"' -f1 | sed -r -e's/^# *//;s/ [^0-9a-zA-Z]*$//;s/\[\[[0-9a-zA-Z |()]*?\|([0-9a-zA-Z |()]*?)\]\]/\1/g;s/]//g;s/\[//g;s/]//g'
cat testing_text | cut -d'"' -f1 | sed -r -e's/^# *//;s/ [^0-9a-zA-Z]*$//;s/\[\[[^[]]*?\|([^[]]*?)\]\]/\1/g;s/]//g;s/\[//g;s/]//g'

