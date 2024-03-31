# expects to work with tame.textile
to_format = ARGV[0]
output_filename = ARGV[1]

File.open(to_format, 'r') do |file|
  File.open(output_filename, 'w') do |output_file|
    # FORMATTER
    file.each_line do |line|
      # don't match for *, hN
      parens = line.gsub(/(?<!\*|h\d|bq|table)\(([^\)]+)\)/) do
        match = $&
        inside_parens = $1
        prior_to_match = $`
        after_match = $'

        # escape %'s so that the textile span doesn't get confused
        inside_parens = inside_parens.gsub(/\%/, '&#37;')

        if prior_to_match =~ /<a[^>\/]+>[^<]*$/ # inside a link
          next match
        elsif inside_parens =~ /^[A-Z\d,'′’–]+$/ # (A) or (A,C)
          next match
        else
          extra = after_match =~ /\-|\—|\]/ ? ' ' : ''
          "%(paren)(#{inside_parens})%"+extra
        end
      end
      brackets = parens.gsub(/\[([^\]]+)\]/) do
        " <span class=\"paren\">#{$&}</span> "
      end
      dash_dash = brackets.gsub(/—([^—]+)—/) do
        " <span class=\"paren\">#{$&}</span> "
      end
      dash_end = dash_dash.gsub(/—([^—<]+)(\.|\?|\.\")/) do
        " <span class=\"paren\">#{$&}</span> "
      end
      
      output_file.write(dash_end)
    end
  end
end