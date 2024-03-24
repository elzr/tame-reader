
# Check if a file name was provided as an argument
if ARGV.length != 1
  puts "Usage: ruby build.rb <filename>"
  exit
end

# Assign the file name to a variable
filename = ARGV[0]

# Check if the file exists
unless File.exist?(filename)
  puts "File does not exist."
  exit
end

# Create a new file name for the output
output_filename = "by_sentence_#{filename}"

# Open the original file for reading and the new file for writing
File.open(filename, 'r') do |file|
  File.open(output_filename, 'w') do |output_file|
    file.each_line do |line|
      paraId = ''
      sentenceCount = 1

      # tweak first class#id attribute to apply to the container itself
      # see https://textile-lang.com/doc/bulleted-unordered-lists
      line = line.sub(/\*\([^#]+#([^#\)]+)\)/) do
        # test at https://regexr.com/7tudn
        paraId = $1
        "#{$&}.\n*(s##{paraId}_1)"
      end
      
      # Replace every ". " with ". \n" and write to the new file
      modified_line = line.gsub(/\. +/) do
        prior_to_match = $`
        if prior_to_match =~ /((\))|(vs)|( al))$/
          next ". "
        end
        ".\n*(s##{paraId}_#{sentenceCount+=1}) "
      end
      output_file.write(modified_line)
    end
  end
end

puts "Done! #{filename}'s paragraphs broken by sentence in #{output_filename}."