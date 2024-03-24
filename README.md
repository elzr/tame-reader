# TAME Reader

A reader for Michael Levin's 2022 [TAME paper](https://www.frontiersin.org/articles/10.3389/fnsys.2022.768201/full). *TAME* stands for *Technological Approach to Mind Everywhere*.

This is a paper as dense as it is fascinating. But I got so frustrated trying to grok it through both PDF & web interfaces that I decided to build this reader. Let's save as much of our complexity budget for engaging with Levin's ideas, instead of wrestling with the incidental complexity of, say, going back & forth through the (389!) references.

---

## About the reader
This is the embodiment of a reading processor I've been dreaming about thanks to [Doug Engelbart](https://en.wikipedia.org/wiki/Douglas_Engelbart) since [2006](https://twitter.com/elzr/status/1372391789332725763).


### Source
I've tried hard **not to change** the content of the paper at all, seeking only to present it in a more useful way. All my edits happen in public in this Github and the reader itself runs from this repo as a Github Page. If you find an accidental edit, please submit an issue.

The content is extracted from [the HTML served](https://www.frontiersin.org/articles/10.3389/fnsys.2022.768201/full) at *Frontiers*. That canonical source is stored here in this repo at `/backstage/base-html-paper`.

Those texts & images then got wrangled & massaged through the Ruby scripts in this repo & through [this Google Sheet](https://docs.google.com/spreadsheets/d/1nlLW3mec058GgCvJcZcfuiEeYzToYzHLLHJku-JY5Eo/edit?usp=sharing).

The figures were broken down & given some margins in [this Figma](https://www.figma.com/file/hfDDFL6Gs4wAGEY0TbPe2i/TAME-Michael-Levin?type=design&node-id=0%3A1&mode=design&t=9JhOQ0HKyAFzlbJo-1).

### Assembly
The core source after all the wrangling is `tame.textile` where all the text (headlines, paragraphs, captions, and even tables) is brought together under lightweight markup. Paragraps are written down as bulleted lists to breakdown sentences. Readers will later be able to toggle between expanded & collapsed views of each paragraph but I wanted to pre-parse the text & have the HTML be well structured prior to any CSS & JS.

(Why [Textile](https://textile-lang.com/) instead of the far more well known Markdown? Because I love how Textiles handles [id attributes](https://textile-lang.com/doc/classes-and-ids) of which there are many.)

`tame.textile` then gets converted into `tame.html` by `build.rb`.

---

## About the paper
The paper was published 24 March 2022. It is *dense*: it has 11 (composite) figures, some 148 paragraphs across 33 double-columned PDF pages, and lists 389 references.

The paper was released under a [CC-BY 4.0 license](https://creativecommons.org/licenses/by/4.0/).

There's also a 2021 [preprint](https://osf.io/preprints/psyarxiv/t6e8p) of the paper available in PsyArXiv.

## About Levin
Find Michael Levin online on Twitter/X at [@drmichaellevin](https://twitter.com/drmichaellevin). He also has a dense [personal site](https://www.drmichaellevin.org/) & a recent newsletter: [Forms of life, forms of mind](https://thoughtforms.life/).


## Other entrypoints
Podcasts are a great intro to the paper & to Levin too. My favorite is Oshan Jarrow's interview with him: [Scaling Selfhood: Collective Intelligence from Cells to Economies](https://www.musingmind.org/podcasts/collective-intelligence-cells-economies-cosmos-michael-levin)

Check out also the excellent [*Cognition all the way down*](https://aeon.co/essays/how-to-understand-cells-tissues-and-organisms-as-agents-with-agendas) essay by Michael Levin & [Daniel Dennett](https://en.wikipedia.org/wiki/Daniel_Dennett) published at Aeon in 13 October 2020.