let R = {
  boot: ()=> {
    R.col.boot();
    R.theme.boot();
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
  theme:{ // dark/light theme
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
        R.theme.toggleSwitch.checked = checked;
    },
    boot: ()=> {
      R.theme.detect();
      R.theme.toggleSwitch = document.querySelector('#theme-switch input[type="checkbox"]');
      
      R.theme.toggleSwitch.addEventListener('change', R.theme.change, false);

      //pre-check the dark-theme checkbox if dark-theme is set
      if (document.documentElement.getAttribute("data-theme") == "dark"){
        R.theme.toggleSwitch.checked = true;
      }
    }
  }
}
R.boot();

