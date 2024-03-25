
dir = '/Users/sara/Dropbox/projects/log/2024/tame/'
para = dir + 'para.textile'
glossary = dir + 'glossary.textile'
output_filename = dir + 'tame.textile'


File.open(para, 'r') do |para|
  File.open(glossary, 'r') do |glossary|
    File.open(output_filename, 'w') do |output_file|
      out = para.read + glossary.read
      out = out.
        gsub(/&#x2019;/, '\'').
        gsub(/&#x2014;/, '--').
        gsub(/&#x201C;/, '"').
        gsub(/&#x201D;/, '"');

      output_file.write( out )
    end
  end
end