filename = ARGV[0]

stitch1 = ARGV[0]
stitch2 = ARGV[1]
output = ARGV[2]

File.open(stitch1, 'r') do |stitch1_file|
  File.open(stitch2, 'r') do |stitch2_file|
    File.open(output, 'w') do |output_file|
      out = stitch1_file.read + stitch2_file.read
      out = out.
        gsub(/&#x2019;/, '\'').
        gsub(/&#x2014;/, '--').
        gsub(/&#x201C;/, '"').
        gsub(/&#x201D;/, '"').
        gsub(/\(C\)/i, '== \& ==');
          # no formatting https://textile-lang.com/doc/no-textile-processing
          # this prevents textile auto-converting (C) to © https://textile-lang.com/doc/unicode-symbols
        
      output_file.write( out )
    end
  end
end