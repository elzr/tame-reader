# expects to work with tame.textile
to_split = ARGV[0]
output_filename = ARGV[1]

# Open the original file for reading and the new file for writing
File.open(to_split, 'r') do |file|
  File.open(output_filename, 'w') do |output_file|
    file.each_line do |line|
      paraId = ''
      sentenceCount = 1

      # ignore table lines since they're already parsed
      if line =~ /#table-/
        next
      end

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
        if prior_to_match =~ /((\))|(vs)|( al)|([A-Z]))$/
          next ". "
        end
        ".\n*(s##{paraId}_#{sentenceCount+=1}) "
      end
      output_file.write(modified_line)
    end
  end
end

puts "Done! #{to_split}'s paragraphs broken by sentence in #{output_filename}."