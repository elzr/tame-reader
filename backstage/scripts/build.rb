dir = '/Users/sara/Dropbox/projects/log/2024/tame/'
dir_textile = dir + 'textile/'
dir_csv = dir + 'backstage/csv/'
dir_html = dir + 'html/'
dir_js = dir + 'backstage/scripts/js/'

para        = dir_textile + 'para.textile'
glossary    = dir_textile + 'glossary.textile'
tame        = dir_textile + 'tame.textile'
split_tame  = dir_textile + 'split_tame.textile'
concordance = dir_csv + 'ref-concordance.csv'
_index      = dir_html + '_index.html'
index       = dir + 'index.html'
_header     = dir_html + '_header.html'
_footer     = dir_html + '_footer.html'

# File paths or commands to execute
commands = [
  "ruby stitch.rb #{para} #{glossary} #{tame}",
  "ruby split_by_sentence.rb #{tame} #{split_tame}",
  "ruby ref-concordance.rb #{split_tame} #{concordance}",
  "node #{dir_js}textile_to_html.js #{split_tame} #{_index}",
  "cat #{_header} #{_index} #{_footer} > #{index}"
]

commands.each_with_index do |command, index|
  puts "\nExecuting command #{index + 1}:\n #{command}"
  
  # Execute the command
  result = system(command)
  
  # Check if the command was executed successfully
  unless result
    puts "Failed to execute: #{command}"
    exit(1) # Exit the script with an error status if a command fails
  end
end