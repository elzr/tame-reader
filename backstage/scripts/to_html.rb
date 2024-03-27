require 'redcloth'
dir = '/Users/sara/Dropbox/projects/log/2024/tame/'
tame = dir + 'by_sentence_tame.textile'
output_filename = dir + 'index.html'

# Reading the content of the input file
tame_textile = RedCloth.new( File.read(tame) )

File.write(output_filename, tame_textile.to_html )