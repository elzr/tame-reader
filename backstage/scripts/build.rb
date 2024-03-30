dir = '/Users/sara/Dropbox/projects/log/2024/tame/'
dir_textile = dir + 'textile/'
dir_csv = dir + 'backstage/csv/'
dir_html = dir + 'html/'
dir_js = dir + 'backstage/scripts/js/'

_para        = dir_textile + '_para.textile'
_glossary    = dir_textile + '_glossary.textile'
tame        = dir_textile + 'tame.textile'
split_tame  = dir_textile + 'split_tame.textile'
concordance = dir_csv + 'ref-concordance.csv'
html_tame      = dir_html + 'html_tame.html'
index       = dir + 'index.html'
_header     = dir_html + '_header.html'
_footer     = dir_html + '_footer.html'

# File paths or commands to execute
commands = [
  "ruby stitch.rb #{_para} #{_glossary} #{tame}",
  "ruby split_by_sentence.rb #{tame} #{split_tame}",
  "ruby ref-concordance.rb #{split_tame} #{concordance}",
  "node #{dir_js}textile_to_html.js #{split_tame} #{html_tame}",
  "cat #{_header} #{html_tame} #{_footer} > #{index}"
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