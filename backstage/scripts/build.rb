dir = '/Users/sara/Dropbox/projects/log/2024/tame/'

para        = dir + 'para.textile'
glossary    = dir + 'glossary.textile'
tame        = dir + 'tame.textile'
split_tame  = dir + 'split_tame.textile'
concordance = dir + 'ref-concordance.csv'
index       = dir + 'index.html'

# File paths or commands to execute
commands = [
  "ruby stitch.rb #{para} #{glossary} #{tame}",
  "ruby split_by_sentence.rb #{tame} #{split_tame}",
  "ruby ref-concordance.rb #{split_tame} #{concordance}",
  "node textile_to_html.js #{split_tame} #{index}"
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