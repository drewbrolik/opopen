const mainElement = document.querySelector("main");

document.addEventListener("DOMContentLoaded", function () {

    let R = new Random();
    let RR = new Random();

    // base color
    let baseColorModifier_h = R.random_int(0,359);
    document.documentElement.style.setProperty('--color-modifier-h', baseColorModifier_h);
    let baseColorModifier_s = R.random_int(-30,30);
    document.documentElement.style.setProperty('--color-modifier-s', baseColorModifier_s);


    let baseColor_1_h = Math.abs((220 - baseColorModifier_h)%360);
    let baseColor_2_h = Math.abs((220 - baseColorModifier_h)%360);
    let baseColor_3_h = Math.abs((255 - baseColorModifier_h)%360);
    let baseColor_4_h = Math.abs((257 - baseColorModifier_h)%360);
    document.documentElement.style.setProperty('--stop-color-1-h', baseColor_1_h);
    document.documentElement.style.setProperty('--stop-color-2-h', baseColor_2_h);
    document.documentElement.style.setProperty('--stop-color-3-h', baseColor_3_h);
    document.documentElement.style.setProperty('--stop-color-4-h', baseColor_4_h);

    console.log('hue',baseColor_1_h,baseColor_2_h,baseColor_3_h,baseColor_4_h);

    let baseColor_1_s = Math.abs((56 - baseColorModifier_s)%100);
    let baseColor_2_s = Math.abs((56 - baseColorModifier_s)%100);
    let baseColor_3_s = Math.abs((70 - baseColorModifier_s)%100);
    let baseColor_4_s = Math.abs((78 - baseColorModifier_s)%100);
    document.documentElement.style.setProperty('--stop-color-1-s', baseColor_1_s+"%");
    document.documentElement.style.setProperty('--stop-color-2-s', baseColor_2_s+"%");
    document.documentElement.style.setProperty('--stop-color-3-s', baseColor_3_s+"%");
    document.documentElement.style.setProperty('--stop-color-4-s', baseColor_4_s+"%");

    console.log('sat',baseColor_1_s,baseColor_2_s,baseColor_3_s,baseColor_4_s);


    let capped = R.random_int(0,1);


    let totalBubbles = 1024;
    totalBubbles = 256;




    const traits = [];
    traits["baseColorModifier"] = baseColorModifier_h;
    traits["baseColorModifier2"] = baseColorModifier_s;

    console.log(traits);







    const opepenArray = [
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,1,1,1,0,0,1,1,0,0,0,0,0,
      0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,
      0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,
      0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,
      0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,
      0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,
      0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,
      0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,
      0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,
    ];

    const invert = R.random_int(0,1);

    /*for (let i=0;i<totalBubbles;i++) {
      newDepressedButton();
    }*/
    
    opepenArray.forEach((item) => {
      
      if (invert) { item = !item; }

      if (item > 0) {
        newPressedButton();
      } else {
        newDepressedButton();
      }

    });

    let isMousePressed = false;
    mainElement.addEventListener('mousedown', () => {
        isMousePressed = true;
    });

    mainElement.addEventListener('mouseup', () => {
        isMousePressed = false;
    });

    let randomlyToggleInterval = 4000;
    //setTimeout(randomlyToggle,randomlyToggleInterval);


    let getConfig = getConfiguration();
    let checkConfig = checkConfiguration(getConfig);
    //console.log('opepen',checkConfig);
    if (checkConfig) {
      document.documentElement.style.setProperty('--color-modifier-h', baseColorModifier_s);
    } else {
      document.documentElement.style.setProperty('--color-modifier-h', baseColorModifier_h);
    }



    function resizeGame() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        document.documentElement.style.setProperty('--size-w', height*.9+"px");
        document.documentElement.style.setProperty('--size-mw', width*.9+"px");
        document.documentElement.style.setProperty('--size-h', height*.9+"px");
        document.documentElement.style.setProperty('--size-mh', width*.9+"px");

        /*
        // font size
        if (width < 767 || height < 767) {
            document.documentElement.style.setProperty('--font-size', "12px");
        } else {
            document.documentElement.style.setProperty('--font-size', "16px");
        }

        // frame width
        document.documentElement.style.setProperty('--frame-width', (width>height ? height*.02 : width*.02) + "px");

        // smallest line size
        var smallestLine = (width>height ? height*.00075 : width*.00075);
        //if (smallestLine < .75) { smallestLine = .75; }
        document.documentElement.style.setProperty('--smallest-line', smallestLine + "px");
        */

    }
    resizeGame();
    window.addEventListener('resize', resizeGame);




    function getConfiguration() {
      let poppers = mainElement.querySelectorAll(".popper");
      let configArray = [];
      poppers.forEach((elem) => {
        if (elem.classList.contains("pressed")) {
          configArray.push(1); //invert>0?0:1
        } else {
          configArray.push(0); //invert>0?1:0
        }
      });
      return configArray;
    }

    function checkConfiguration(configArray) {
      let returnVal = true;
      configArray.forEach((item,index) => {
        if (invert) { item = !item; }
        if (item != opepenArray[index]) {
          returnVal = false;
        }
      });
      return returnVal;
    }



    function newDepressedButton() {
        const newDiv = document.createElement('div');
        //newDiv.style.width = "3%";
        newDiv.classList.add("popper");
        newDiv.classList.add("depressed");
        if (capped) { newDiv.classList.add("capped"); }

        //newDiv.addEventListener("mousedown",toggleButton);
        ['mousedown', 'touchstart', 'mouseenter'].forEach(eventType => {
            newDiv.addEventListener(eventType, toggleButton);
        });

        /*const svgCode = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 251 251">
          <circle cx="125.5" cy="125.5" r="125.5" fill="url(#a)"/>
          <mask id="c" width="237" height="237" x="7" y="7" maskUnits="userSpaceOnUse" style="mask-type:alpha">
            <circle cx="125.5" cy="125.5" r="118" fill="url(#b)"/>
          </mask>
          <g mask="url(#c)">
            <circle cx="125.5" cy="125.5" r="118" fill="url(#d)"/>
          </g>
          <defs>
            <linearGradient id="a" x1="5.871" x2="259.059" y1="0" y2="236.06" gradientUnits="userSpaceOnUse" class="gradient-a">
              <stop offset=".179"/>
              <stop offset=".437"/>
              <stop offset=".755"/>
              <stop offset=".919"/>
            </linearGradient>
            <linearGradient id="d" x1="13.02" x2="251.077" y1="7.5" y2="229.453" gradientUnits="userSpaceOnUse" class="gradient-d">
              <stop offset=".179"/>
              <stop offset=".437"/>
              <stop offset=".755"/>
              <stop offset=".919"/>
            </linearGradient>
            <radialGradient id="b" cx="0" cy="0" r="1" gradientTransform="matrix(79.02228 80.6245 -85.43012 83.73241 125.5 125.5)" gradientUnits="userSpaceOnUse" class="gradient-b">
              <stop offset=".235"/>
              <stop offset=".855"/>
              <stop offset="1"/>
            </radialGradient>
          </defs>
        </svg>`;

        newDiv.innerHTML = svgCode;*/

        newDiv.appendChild(document.createElement('div'));
        mainElement.appendChild(newDiv);
    }

    function replaceWithDepressedButton(elem) {
        elem.classList.remove("pressed");
        elem.classList.add("depressed");

        /*const svgCode = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 251 251">
          <circle cx="125.5" cy="125.5" r="125.5" fill="url(#a)"/>
          <mask id="c" width="237" height="237" x="7" y="7" maskUnits="userSpaceOnUse" style="mask-type:alpha">
            <circle cx="125.5" cy="125.5" r="118" fill="url(#b)"/>
          </mask>
          <g mask="url(#c)">
            <circle cx="125.5" cy="125.5" r="118" fill="url(#d)"/>
          </g>
          <defs>
            <linearGradient id="a" x1="5.871" x2="259.059" y1="0" y2="236.06" gradientUnits="userSpaceOnUse" class="gradient-a">
              <stop offset=".179"/>
              <stop offset=".437"/>
              <stop offset=".755"/>
              <stop offset=".919"/>
            </linearGradient>
            <linearGradient id="d" x1="13.02" x2="251.077" y1="7.5" y2="229.453" gradientUnits="userSpaceOnUse" class="gradient-d">
              <stop offset=".179"/>
              <stop offset=".437"/>
              <stop offset=".755"/>
              <stop offset=".919"/>
            </linearGradient>
            <radialGradient id="b" cx="0" cy="0" r="1" gradientTransform="matrix(79.02228 80.6245 -85.43012 83.73241 125.5 125.5)" gradientUnits="userSpaceOnUse" class="gradient-b">
              <stop offset=".235"/>
              <stop offset=".855"/>
              <stop offset="1"/>
            </radialGradient>
          </defs>
        </svg>`;

        elem.innerHTML = svgCode;*/
    }

    function newPressedButton() {
        const newDiv = document.createElement('div');
        //newDiv.style.width = "3%";
        newDiv.classList.add("popper");
        newDiv.classList.add("pressed");
        if (capped) { newDiv.classList.add("capped"); }

        //newDiv.addEventListener("mousedown",toggleButton);
        ['mousedown', 'touchstart', 'mouseenter'].forEach(eventType => {
            newDiv.addEventListener(eventType, toggleButton);
        });

        /*const svgCode = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 251 251">
          <circle cx="125.5" cy="125.5" r="125.5" fill="url(#aa)"/>
          <mask id="c" width="237" height="237" x="7" y="7" maskUnits="userSpaceOnUse" style="mask-type:alpha">
            <circle cx="125.5" cy="125.5" r="118" fill="url(#bb)"/>
          </mask>
          <g mask="url(#c)">
            <circle cx="125.5" cy="125.5" r="118" fill="url(#dd)"/>
          </g>
          <defs>
            <linearGradient id="aa" x1="5.871" x2="259.059" y1="0" y2="236.06" gradientUnits="userSpaceOnUse" class="gradient-a">
              <stop offset=".081"/>
              <stop offset=".245"/>
              <stop offset=".563"/>
              <stop offset=".821"/>
            </linearGradient>
            <linearGradient id="dd" x1="13.02" x2="251.077" y1="7.5" y2="229.453" gradientUnits="userSpaceOnUse" class="gradient-d">
              <stop offset=".081"/>
              <stop offset=".245"/>
              <stop offset=".563"/>
              <stop offset=".821"/>
            </linearGradient>
            <radialGradient id="bb" cx="0" cy="0" r="1" gradientTransform="matrix(79.02228 80.6245 -85.43012 83.73241 125.5 125.5)" gradientUnits="userSpaceOnUse" class="gradient-b">
              <stop offset=".855"/>
              <stop offset="1"/>
            </radialGradient>
          </defs>
        </svg>`;

        newDiv.innerHTML = svgCode;*/
        newDiv.appendChild(document.createElement('div'));
        mainElement.appendChild(newDiv);
    }

    function replaceWithPressedButton(elem) {
        
        elem.classList.remove("depressed");
        elem.classList.add("pressed");

        /*const svgCode = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 251 251">
          <circle cx="125.5" cy="125.5" r="125.5" fill="url(#aa)"/>
          <mask id="c" width="237" height="237" x="7" y="7" maskUnits="userSpaceOnUse" style="mask-type:alpha">
            <circle cx="125.5" cy="125.5" r="118" fill="url(#bb)"/>
          </mask>
          <g mask="url(#c)">
            <circle cx="125.5" cy="125.5" r="118" fill="url(#dd)"/>
          </g>
          <defs>
            <linearGradient id="aa" x1="5.871" x2="259.059" y1="0" y2="236.06" gradientUnits="userSpaceOnUse" class="gradient-a">
              <stop offset=".081"/>
              <stop offset=".245"/>
              <stop offset=".563"/>
              <stop offset=".821"/>
            </linearGradient>
            <linearGradient id="dd" x1="13.02" x2="251.077" y1="7.5" y2="229.453" gradientUnits="userSpaceOnUse" class="gradient-d">
              <stop offset=".081"/>
              <stop offset=".245"/>
              <stop offset=".563"/>
              <stop offset=".821"/>
            </linearGradient>
            <radialGradient id="bb" cx="0" cy="0" r="1" gradientTransform="matrix(79.02228 80.6245 -85.43012 83.73241 125.5 125.5)" gradientUnits="userSpaceOnUse" class="gradient-b">
              <stop offset=".855"/>
              <stop offset="1"/>
            </radialGradient>
          </defs>
        </svg>`;

        elem.innerHTML = svgCode;*/
    }

    function toggleButton(e) {
        if (e.type == "mouseenter" && !isMousePressed) {
            return;
        }

        //const svgTarget = e.target.closest("svg").closest("div");
        const svgTarget = e.target.closest(".popper");
        if (svgTarget.classList.contains("depressed")) {
            replaceWithPressedButton(svgTarget);
        } else {
            replaceWithDepressedButton(svgTarget);
        }

        getConfig = getConfiguration();
        checkConfig = checkConfiguration(getConfig);
        //console.log('opepen',checkConfig);
        if (checkConfig) {
          //document.documentElement.style.setProperty('--color-modifier-h', baseColorModifier_s);
        } else {
          //document.documentElement.style.setProperty('--color-modifier-h', baseColorModifier_h);
        }

    }


    function randomlyToggle() {
      let randomNum = R.random_int(0,255);
      let randomPopper = mainElement.querySelectorAll(".popper");
      let pressEvent = new Event('mousedown');
      randomPopper[randomNum].dispatchEvent(pressEvent);
      //console.log('ran');

      randomlyToggleInterval -= randomlyToggleInterval <= 1000 ? 0 : 100;
      setTimeout(randomlyToggle,randomlyToggleInterval);
    }


});









function simpleHash(input) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash.toString()+hash.toString()+hash.toString()+hash.toString()+hash.toString()+hash.toString()+hash.toString()+hash.toString();
}
var hashTokenId = simpleHash(hl.tx.tokenId+hl.tx.hash+"");

function generateRandomHash() {
    const characters = '0123456789abcdef';
    let hash = '0x';

    for (let i = 0; i < 64; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      hash += characters.charAt(randomIndex);
    }

    //console.log(hash);
    return hash;
}
//var hashTokenId = generateRandomHash();
//console.log(hashTokenId);

// random class created by Prohibition, modified
// uses hash for 'predicatably random' values
class Random {
  constructor() {
    this.useA = false;
    let sfc32 = function (uint128Hex) {
      let a = parseInt(uint128Hex.substring(0, 8), 16);
      let b = parseInt(uint128Hex.substring(8, 16), 16);
      let c = parseInt(uint128Hex.substring(16, 24), 16);
      let d = parseInt(uint128Hex.substring(24, 32), 16);
      return function () {
        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;
        let t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
    };
    // seed prngA with first half of hash
    this.prngA = new sfc32(hashTokenId.substring(2, 34));
    // seed prngB with second half of hash
    this.prngB = new sfc32(hashTokenId.substring(34, 66));
    for (let i = 0; i < 1e6; i += 2) {
      this.prngA();
      this.prngB();
    }
  }
  // random number between 0 (inclusive) and 1 (exclusive)
  random_dec() {
    this.useA = !this.useA;
    return this.useA ? this.prngA() : this.prngB();
  }
  // random number between a (inclusive) and b (exclusive)
  random_num(a, b) {
    return a + (b - a) * this.random_dec();
  }
  // random integer between a (inclusive) and b (inclusive)
  // requires a < b for proper probability distribution
  random_int(a, b) {
    return Math.floor(this.random_num(a, b + 1));
  }
  // random boolean with p as percent liklihood of true
  random_bool(p) {
    return this.random_dec() < p;
  }
  // random value in an array of items
  random_choice(list) {
    return list[this.random_int(0, list.length - 1)];
  }
}

function hslToHex(hsl) {

    const hslArray = hsl.replace("hsl(","").replace(")","").replaceAll(" ","").replaceAll("%","").split(",");

    let h = hslArray[0];
    let s = hslArray[1];
    let l = hslArray[2];

    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    // Having obtained RGB, convert channels to hex and return
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Ensure each of them are 2 digits
    r = r.length === 1 ? "0" + r : r;
    g = g.length === 1 ? "0" + g : g;
    b = b.length === 1 ? "0" + b : b;

    return `#${r}${g}${b}`;
}

