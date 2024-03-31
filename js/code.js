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
      console.log( 'changing colN: '+colN);
      R.para.rebalanceAll();
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
      $('ul').each( function() {
        const ul = $(this);
        const ul_id = ul.attr('id');
        let count = {
          chars: ul.text().length,
          words: ul.text().split(' ').length,
          lines: ul.find('li').length
        };

        ul.data('count', count);
        ul.append(
          `<label id="${ul_id}">`+
            `<a href="#${ul_id}">#${ul_id}</a> `+
            '<small>'+
              `${count.chars} chars, ${count.words} words, ${count.lines} lines`+
            '</small>'+
          `</label>`);
        
        R.para.balancer(ul);
      });
    },
    rebalanceAll: () => {
      if( $('ul:first').data('count') ) {
        $('ul').each( function() {
          R.para.balancer( $(this) );
        });
      }
    },
    balancer: (ul) => {
      R.para.heightGuesser(ul);

      setTimeout( function() {
        R.para.liCols(ul);
        R.para.trimmer(ul);
        R.para.tightener(ul);
        R.para.loosener(ul);
      }, 200);
    },
    heightGuesser: (ul) => {
      let height = 'auto';
      const col = parseInt( $('body').attr('class').slice(-1) );
      const count = ul.data('count');
      // console.log( {ul_id:ul.attr('id'), count} )

      if( col == 1 ) {
        return ul.css('height', height);
      } else if(col == 2) {
        height = 66;
        if( count.chars < 1750 ) {  
          height = 50;
          if( count.chars < 1500 ) {
            height = 45;
            if( count.chars < 1250 ) {
              height = 40;
              if( count.chars < 1000 ) {
                height = 30;
              }
            }
          }
        }
      } else if(col == 3) {
        height = 45;
      }
      ul.height(`${height}rem`);
    },
    loosener: (ul) => {
      if( ul.prop('scrollWidth') > ul.innerWidth() ) {
        const li = ul.data('li');
        ul.height( (li.sum[0] + li.next)+'px' );
        console.log({
          'loosening':li.ul_id,
          scrollWidth: ul.prop('scrollWidth'), 
          innerWidth: ul.innerWidth(),
          li 
        });
      }
    },
    // virtual sentence columns
    liCols: (ul) => {
      let li={
        h:[],
        sum: [0,0,0],
        sum_max: 0,
        col: 0,
        next: 0, // almost li for the first column
        prev: 0, // last li of the first column
        count: 0,
        ul_id: ul.attr('id'),
        ul_h: ul.innerHeight()
      };
      ul.find('li').each( function() {
        li.h.push( $(this).outerHeight() );
      });

      for (let i = 0; i < li.h.length; i++) {
        // the +2 is there for fudging
        if ( (li.sum[li.col] + li.h[i] + 2) > li.ul_h) {
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
      ul.data('li', li);
    },
    trimmer: (ul)=>{
      const li = ul.data('li');
      
      console.log( {'trimming':li.ul_id, li} );
      ul.height((li.sum_max + 5) + 'px');
    },
    tightener: (ul)=>{
      const li = ul.data('li');

      if( li.sum_max - li.sum[1] > li.prev) {
        console.log( {'tightening':li.ul_id, li} );
        if((li.sum[1] + li.prev) < (li.sum[0] - li.prev)) {
          li.sum_max = li.sum[0] - li.prev;
        }
      }
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

