let R = {
  boot: ()=> {
    R.col.boot();
    R.theme.boot();
    R.para.boot();
  },
  col:{ // columns
    change: function(){
      colN = this.getAttribute("id");
      localStorage.setItem("col", colN);
      document.body.className = colN;
    },
    boot: ()=> {
      $(".cols button").click( R.col.change );
      let storedCol = localStorage.getItem("col");

      if(storedCol){
          $("#"+storedCol).click();
      }
    }
  },
  para:{
    boot: ()=> {
      $('ul').each( function(i) {
        const ul = $(this);
        const charCount = ul.text().length;
        const wordCount = ul.text().split(' ').length;
        const lineCount = ul.find('li').length;

        ul.data({char: charCount, word: wordCount, line: lineCount});
        ul.append(
          `<label>${charCount} chars, ${wordCount} words, ${lineCount} lines</label>`);

        let height = 60;
        
        if( charCount < 1500 ) {
          height = 45;
          if( charCount < 1000 ) {
            height = 30;
          }
          console.log(charCount);
        }

        ul.css('height', `${height}rem`);
      });
    },
    heighter: function() {
      
    }
  },
  theme:{ // dark/light theme
    toggle:null, //toggle switch
    detect: ()=> {
      let theme="dark", //default
        storedTheme = localStorage.getItem("theme");

      if( storedTheme ) {
        theme = localStorage.getItem("theme");
      } else if(!window.matchMedia) {
          //matchMedia method not supported
          return false;
      } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
          theme = "dark";
      } else if(window.matchMedia("(prefers-color-scheme: light)").matches) {
          theme = "light";
      }

      document.documentElement.setAttribute("data-theme", theme);
    },
    change: function(e) { let theme, checked;
        if (e.target.checked) {
          theme = 'dark';
          checked = true;
        } else {
          theme = 'light';
          checked = false;
        }    
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        R.theme.toggle.checked = checked;
    },
    boot: ()=> {
      R.theme.detect();
      R.theme.toggle = document.querySelector('#theme-switch input[type="checkbox"]');
      
      R.theme.toggle.addEventListener('change', R.theme.change, false);

      //pre-check the dark-theme checkbox if dark-theme is set
      if (document.documentElement.getAttribute("data-theme") == "dark"){
        R.theme.toggle.checked = true;
      }
    }
  }
}
R.boot();

