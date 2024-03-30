# TAME Reader

A reader for Michael Levin's 2022 [TAME paper](https://www.frontiersin.org/articles/10.3389/fnsys.2022.768201/full). *TAME* stands for *Technological Approach to Mind Everywhere*, a "framework for understanding and manipulating cognition in unconvential substrates."

This is a paper as dense as it is fascinating. But I got so frustrated trying to grok it through both PDF & web interfaces that I decided to build this reader. Let's save as much of our complexity budget for engaging with ideas, instead of wrestling with the incidental complexity of, say, going back & forth through the (389!) references.

---

## About the reader
This is the embodiment of a reading processor I've been dreaming about thanks to [Doug Engelbart](https://en.wikipedia.org/wiki/Douglas_Engelbart) since [2006](https://twitter.com/elzr/status/1372391789332725763).

### Source
I've tried hard **not to change** the content of the paper at all, seeking only to present it in a more useful way. This representation involves a lot of marking up. All my edits happen in public in this Github and the reader itself runs from this repo as a [Github Page](https://docs.github.com/en/pages). If you find an accidental edit, please submit an issue.

The content was extracted from [the **HTML** served](https://www.frontiersin.org/articles/10.3389/fnsys.2022.768201/full) at *Frontiers*. That canonical source is stored here in this repo at `/backstage/source/html`. I should have also used more the XML version of the article but I noticed it towards the end of the project.

That text & images got then wrangled & massaged through the Ruby scripts in this repo & through [this Google Sheet](https://docs.google.com/spreadsheets/d/1nlLW3mec058GgCvJcZcfuiEeYzToYzHLLHJku-JY5Eo/edit?usp=sharing).

The **figures** were broken down & given some margins in [this Figma](https://www.figma.com/file/hfDDFL6Gs4wAGEY0TbPe2i/TAME-Michael-Levin?type=design&node-id=0%3A1&mode=design&t=9JhOQ0HKyAFzlbJo-1).

### Assembly
The core document after all the wrangling is `tame.textile`, where all the final text (headlines, paragraphs, captions, and even tables) lives. Paragraps are written down as bulleted lists to break down their sentences. Readers will later be able to toggle between expanded & collapsed views of each paragraph but I wanted to pre-parse the text & have the HTML be well structured prior to any CSS & JS.

`tame.textile` is stitched together from `_para`, `_references` & `_glossary`. My convention is that modifiable source files start with an underscore `_`, all other files are generated from them and shouldn't be modificed directly.

So `tame.textile` then gets converted by `build.rb` into `index.html`, which is what gets served via Github Pages at http://elzr.github.io/tame-reader

### Why Textile?
Why [Textile](https://textile-lang.com/) instead of the far, far more well known Markdown? Because I love how Textile handles [`(class#id)` attributes](https://textile-lang.com/doc/classes-and-ids) of which there are plenty. I wanted a light markup that's still more expressive than Markdown, which [requires HTML kludges for this](https://stackoverflow.com/questions/3292903/in-markdown-what-is-the-best-way-to-link-to-a-fragment-of-a-page-i-e-some-id).

Specifically, I'm using [textile.js](https://github.com/borgar/textile-js) because [RedCloth](https://github.com/jgarber/redcloth/tree/master), the Ruby Textile library, sadly does not parse [`(class#id)` attributes](https://textile-lang.com/doc/classes-and-ids) according to spec.

---

## About the paper
The TAME paper was published 24 March 2022 in *Frontiers*. It is ***dense***: it has 11 (very composite) figures, some 148 paragraphs across 33 double-columned PDF pages, and lists 389 references.

The paper was released under a [CC-BY 4.0 license](https://creativecommons.org/licenses/by/4.0/). So is this reader.

There's also a 2021 [preprint](https://osf.io/preprints/psyarxiv/t6e8p) of the paper available in PsyArXiv.

## About Levin
Find Michael Levin<sup>[WP](https://en.wikipedia.org/wiki/Michael_Levin_(biologist))</sup> online on Twitter/X at [@drmichaellevin](https://twitter.com/drmichaellevin). He also has a dense [personal site](https://www.drmichaellevin.org/) & a recent newsletter: [Forms of life, forms of mind](https://thoughtforms.life/).

## Other entrypoints
Podcasts are a great intro to the paper & to Levin too. My favorite Levin intereview is Oshan Jarrow's [Scaling Selfhood: Collective Intelligence from Cells to Economies](https://www.musingmind.org/podcasts/collective-intelligence-cells-economies-cosmos-michael-levin)

Check out also the excellent essay [*Cognition all the way down*](https://aeon.co/essays/how-to-understand-cells-tissues-and-organisms-as-agents-with-agendas) by Michael Levin & Daniel Dennett<sup>[WP](https://en.wikipedia.org/wiki/Daniel_Dennett)</p> published at Aeon in 13 October 2020.

Finally, check out some [beautiful free verse](https://thoughtforms.life/some-free-verse-on-the-topic-of-diverse-intelligence/) grounded in TAME that Levin wrote recently (March 23, 2024).