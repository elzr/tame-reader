# expects to work with by_sentence_para.textile
if ARGV.length != 1
  puts "Please specify <filename>"
  exit
end
filename = ARGV[0]

# Create a new file name for the output
output_filename = "ref-concordance.csv"

# refId to phrase
refs = Hash.new

# Open the original file for reading and the new file for writing
File.open(filename, 'r') do |file|
  File.open(output_filename, 'w') do |output_file|
    file.each_line do |line|
      # <a href="#B47">Bongard and Levin, 2021</a>
      line.scan(/<a href="#(B\d+)">([^<]+)<\/a>/) do |refId, phrase|
        prior_to_match = $`
        # weird edge case where the phrase is a single letter or a date
          if phrase =~ /^(\D|(\d\d\d\d\D?))$/
            # test at https://regexr.com/7tuiv
            if prior_to_match =~ />([^<]+)<\/a>/
              pastPhrase = $1
              # puts "#{refId} | #{phrase} | #{pastPhrase}"
              if phrase =~ /\d\d\d\d\D?/
                phrase = pastPhrase.sub(/\d\d\d\d/, phrase)
              else
                phrase = pastPhrase.sub(/(\d\d\d\d)\D/, "\1#{phrase}")
              end
            end
          end
        prior_to_match =~ /^*\(s#([^)]+)\)/
        sentence = $1
        if refs[refId].nil?
          refs[refId] = {
            :name => phrase,
            :count => 1,
            :sentences => [sentence]
          }
        else
          refs[refId][:count] += 1
          refs[refId][:sentences].push(sentence)
        end
      end
    end

    # refs = refs.sort_by {|k,v| k[1..-1].to_i}.to_h
    389.times do |i|
      k = "B#{i+1}"
      v = refs[k]
      if v.nil?
        output_file.write("#{k}\n")
      else
        output_file.write("#{k} | #{v[:name]} | #{v[:count]} | #{v[:sentences].join(",")}\n")
      end
    end
  end
end

puts "Done! #{output_filename} generated from #{filename}."