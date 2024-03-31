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
            `<a href="#${ul_id}">#${ul_id}</a> `+
            '<small>'+
              `${charCount} chars, ${wordCount} words, ${lineCount} lines`+
            '</small>'+
          `</label>`);
        
        R.para.balancer(charCount, ul);
      });
    },
    balancer: (charCount, ul) => {
      let height = 60;
      if( charCount < 1750 ) {  
        height = 50;
        if( charCount < 1500 ) {
          height = 45;
          if( charCount < 1250 ) {
            height = 40;
            if( charCount < 1000 ) {
              height = 30;
            }
          }
        }
      }

      ul.css('height', `${height}rem`);
      setTimeout( function() {
        R.para.trimmer(ul);
        R.para.checker(ul);
      }, 200);
    },
    checker: (ul) => {
      const ul_id = ul.attr('id');
      if( ul.prop('scrollWidth') > ul.innerWidth() ) {
        const li = ul.data('li');
        const ul_height = ul.height();
        ul.height( (li.sum[0] + li.next)+'px' );
        // console.log(
        //   {ul_id, ul_height, scrollWidth: ul.prop('scrollWidth'), 
        //   innerWidth: ul.innerWidth(),
        //   li });
      }
    },
    trimmer: (ul)=>{
      const ul_h = ul.innerHeight();
      let li={
        h:[],
        sum: [0,0,0],
        sum_max: 0,
        col: 0,
        next: 0, // almost li for the first column
        prev: 0, //last li of the first column
        count: 0
      };
      ul.find('li').each( function() {
        li.h.push( $(this).outerHeight() );
      });

      const ul_id = ul.attr('id');
      for (let i = 0; i < li.h.length; i++) {
        // the +2 is there for fudging
        if ( (li.sum[li.col] + li.h[i] + 2) > ul_h) {
          if(li.col == 0) {
            li.next = li.h[i];
            li.prev = li.h[i-1];
            // console.log({li_next});
          }
          li.col ++;
        }
        li.sum[li.col] += li.h[i];
        li.count++;
      }
      li.sum_max = Math.max(...li.sum);
      if( li.sum_max - li.sum[1] > li.prev) {
        console.log( {ul_id, ul_h, li} );
        if((li.sum[1] + li.prev) < (li.sum[0] - li.prev)) {
          li.sum_max = li.sum[0] - li.prev;
        }
      }
      ul.data('li', li);
      // console.log( {ul_id, ul_h, li} );
      ul.height((li.sum_max + 5) + 'px');
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

