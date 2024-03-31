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
        const ul_id = ul.attr('id');
        const charCount = ul.text().length;
        const wordCount = ul.text().split(' ').length;
        const lineCount = ul.find('li').length;

        ul.data({char: charCount, word: wordCount, line: lineCount});
        ul.append(
          `<label id="${ul_id}">`+
            `${ul_id}<br />`+
            '<small>'+
              `${charCount} chars, ${wordCount} words, ${lineCount} lines`+
            '</small>'+
          `</label>`);
        
        R.para.balancer(charCount, ul);
      });
    },
    balancer: function(charCount, ul) {
      let height = 60;
        
      if( charCount < 1510 ) {
        height = 45;
        if( charCount < 1000 ) {
          height = 30;
        }
      }

      ul.css('height', `${height}rem`);
      setTimeout(() => {
        R.para.trimmer(ul);
      }, 500);
    },
    trimmer: (ul)=>{
      const ul_h = ul.innerHeight();
      let li_h = [];
      ul.find('li').each( function() {
        li_h.push( $(this).outerHeight() );
      });

      const ul_id = ul.attr('id');
      let li_sum = [0,0,0];
      let li_col = 0;
      let li_count = 0;
      for (let i = 0; i < li_h.length; i++) {
        // the +2 is there for fudging
        if ( (li_sum[li_col] + li_h[i] + 2) > ul_h) {
          li_col ++;
        }
        li_sum[li_col] += li_h[i];
        li_count++;
      }
      const li_sum_max = Math.max(...li_sum);
      console.log( {ul_id, ul_h, li_h, li_sum_max, li_sum, li_count} );
      ul.height((li_sum_max + 5) + 'px');
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

