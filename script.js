document.addEventListener("DOMContentLoaded", function () {

    const mainElement = document.querySelector("main");
    const invertElement = document.querySelector("#invert");
    const clearElement = document.querySelector("#clear");
    const resetElement = document.querySelector("#reset");
    const startGameElement = document.querySelector("#startgame");
    const timeElement = document.querySelector("#time");
    const gameStatus = document.querySelector("#gameStatus");
    const menuElement = document.querySelector("#menu");
    const saveloadElement = document.querySelector("#saveload");
    const saveLoadCopy = document.querySelector("#saveload_copy");
    const menuTriggerElement = document.querySelector("#menutrigger");
    const model = document.getElementById("model");
    const serial = document.getElementById("serial");
    const signatureElement = document.getElementById("signature");
    const startGameStatus = document.querySelector("#startGameStatus");


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

    //console.log('hue',baseColor_1_h,baseColor_2_h,baseColor_3_h,baseColor_4_h);

    let baseColor_1_s = Math.abs((56 + baseColorModifier_s)%100);
    let baseColor_2_s = Math.abs((56 + baseColorModifier_s)%100);
    let baseColor_3_s = Math.abs((70 + baseColorModifier_s)%100);
    let baseColor_4_s = Math.abs((78 + baseColorModifier_s)%100);
    document.documentElement.style.setProperty('--stop-color-1-s', baseColor_1_s+"%");
    document.documentElement.style.setProperty('--stop-color-2-s', baseColor_2_s+"%");
    document.documentElement.style.setProperty('--stop-color-3-s', baseColor_3_s+"%");
    document.documentElement.style.setProperty('--stop-color-4-s', baseColor_4_s+"%");

    //console.log('sat',baseColor_1_s,baseColor_2_s,baseColor_3_s,baseColor_4_s);


    let capped = R.random_int(0,1);


    let totalBubbles = 256;




    let gameOn = false;

    let timeScore = 0;

    let startGameInterval = 2500;
    let startGameTimeout = setTimeout(null,0);

    let scoreInterval = setTimeout(null,0);



    let pocketSize = window.innerWidth < 550 ? false : true; // opposite so things kick in with resize()


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

    const opepenArrayPocket = [
        0,0,0,0,0,
        0,1,1,1,0,
        0,1,1,1,0,
        0,0,0,0,0,
        0,1,1,1,0
      ];

    const invert = R.random_int(0,1);
    resetBoard();




    model.innerText = hl.tx.contractAddress.substr(0,10);
    serial.innerText = hl.tx.hash.substr(0,8)+"-"+hl.tx.tokenId;




    const traits = {};
    traits["Color"] = hslToHex("hsl("+baseColor_2_h+","+baseColor_2_s+"%,22%)");
    traits["Shadow Color"] = hslToHex("hsl("+baseColor_3_h+","+baseColor_3_s+"%,9%)");
    traits["Nubs"] = capped ? "Yes" : "No";
    traits["Base State"] = invert ? "Pressed" : "Depressed";
    traits["Model No"] = hl.tx.contractAddress;
    traits["Serial No"] = hl.tx.hash+"-"+hl.tx.tokenId;

    //console.log(traits);
    hl.token.setTraits(traits);

    // Also set a name and description for this token
    hl.token.setName(`Opopen #${hl.tx.tokenId}`);





    if (hl.context.previewMode) {
      menuTriggerElement.style.display = "none";
      hl.token.capturePreview();
    } else {
      menuTriggerElement.style.display = "";
    }





    // events
    function isTouch() {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }


    let isMousePressed = false;
    ['mousedown', 'touchstart'].forEach(eventType => { 
        mainElement.addEventListener(eventType, () => {
            isMousePressed = true;
            mainElement.classList.add("active");
        });
    });

    ['mouseup', 'touchend'].forEach(eventType => {
        mainElement.addEventListener(eventType, () => {
            isMousePressed = false;
            mainElement.classList.remove("active");
        });
    });

    startGameElement.addEventListener('change', toggleStartGame);
    invertElement.addEventListener('click', invertBoard);
    clearElement.addEventListener('click', clearBoard);
    resetElement.addEventListener('click', resetBoard);

    // load/save
    ['keyup', 'paste'].forEach(eventType => {
        saveloadElement.addEventListener(eventType, (e) => {
            loadConfiguration(e.target.value)
        });
    });

    signatureElement.addEventListener('dblclick',function(event) {
        window.open('https://truedrew.art', '_blank');
    })
    saveLoadCopy.addEventListener('click', copyTextarea);

    menuTriggerElement.addEventListener('click', toggleQueuedMenu);





    /*let getConfig = getConfiguration();
    let checkConfig = checkConfiguration(getConfig);
    if (checkConfig) {
      document.documentElement.style.setProperty('--color-modifier-h', baseColorModifier_s);
    } else {
      document.documentElement.style.setProperty('--color-modifier-h', baseColorModifier_h);
    }*/


    function resizeGame() {

        var width = window.innerWidth;
        var height = window.innerHeight;
        document.documentElement.style.setProperty('--size-w', height*.9+"px");
        document.documentElement.style.setProperty('--size-mw', width*.9+"px");
        document.documentElement.style.setProperty('--size-h', height*.9+"px");
        document.documentElement.style.setProperty('--size-mh', width*.9+"px");

        if (width > height+(width*.3)) {
          document.body.classList.remove("stacked");
          menuElement.classList.remove("stacked");
          document.body.classList.remove("square");
          menuElement.classList.remove("square");
        } else if (height > width+(height*.3)) {
          document.body.classList.add("stacked");
          menuElement.classList.add("stacked");
          document.body.classList.remove("square");
          menuElement.classList.remove("square");
        } else {
          document.body.classList.remove("stacked");
          menuElement.classList.remove("stacked");
          document.body.classList.add("square");
          menuElement.classList.add("square");
          menuElement.classList.add("queued");
          menuTriggerElement.querySelector("img").src = "./settings.svg";
        }


        if (width < 550 && !pocketSize) {
            pocketSize = true;
            resetBoard();
            document.documentElement.style.setProperty('--menu-trigger-icon-transform', "translate(-90%, -30%) rotate(45deg)");
        } else if (width > 550 && pocketSize) {
            pocketSize = false;
            resetBoard();
            document.documentElement.style.setProperty('--menu-trigger-icon-transform', "translate(-90%, 0%) rotate(45deg)");
        }

        if (width < 500) {
            menuElement.style.placeContent = "flex-start";
            menuElement.style["place-content"] = "flex-start";
        } else {
            menuElement.style.placeContent = "center";
        }

        getConfiguration();

    }
    resizeGame();
    window.addEventListener('resize', resizeGame);






    function toggleQueuedMenu(e,forceClose=false) {
        if (menuElement.classList.contains("queued") && !forceClose) {
            menuElement.classList.remove("queued");
            menuTriggerElement.querySelector("img").src = "./close.svg";
        } else {
            menuElement.classList.add("queued");
            menuTriggerElement.querySelector("img").src = "./settings.svg";
        }
    }









    function newDepressedButton() {
        const newDiv = document.createElement('div');
        //newDiv.style.width = "3%";
        newDiv.classList.add("popper");
        newDiv.classList.add("depressed");
        if (capped) { newDiv.classList.add("capped"); }

        //newDiv.addEventListener("mousedown",toggleButton);
        if (isTouch()) {
          ['touchstart'].forEach(eventType => { 
              newDiv.addEventListener(eventType, toggleButton);
          });
        } else {
          ['mousedown', 'mouseenter'].forEach(eventType => { 
              newDiv.addEventListener(eventType, toggleButton);
          });
        }

        newDiv.appendChild(document.createElement('div'));
        mainElement.appendChild(newDiv);
    }

    function replaceWithDepressedButton(elem) {
        elem.classList.remove("pressed");
        elem.classList.add("depressed");
        elem.classList.remove("correct");
    }

    function newPressedButton() {
        const newDiv = document.createElement('div');
        //newDiv.style.width = "3%";
        newDiv.classList.add("popper");
        newDiv.classList.add("pressed");
        if (capped) { newDiv.classList.add("capped"); }

        //newDiv.addEventListener("mousedown",toggleButton);
        if (isTouch()) {
          ['touchstart'].forEach(eventType => { 
              newDiv.addEventListener(eventType, toggleButton);
          });
        } else {
          ['mousedown', 'mouseenter'].forEach(eventType => { 
              newDiv.addEventListener(eventType, toggleButton);
          });
        }

        newDiv.appendChild(document.createElement('div'));
        mainElement.appendChild(newDiv);
    }

    function replaceWithPressedButton(elem) {
        
        elem.classList.remove("depressed");
        elem.classList.add("pressed");
        elem.classList.remove("correct");

    }

    function toggleButton(e) {
        if ((e.type == "mouseenter" && !isMousePressed) || (e.type == "touchmove" && !isMousePressed)) {
            return;
        }

        //const svgTarget = e.target.closest("svg").closest("div");
        const svgTarget = e.target.closest(".popper");
        if (svgTarget.classList.contains("depressed")) {
            replaceWithPressedButton(svgTarget);
        } else {
            replaceWithDepressedButton(svgTarget);
        }

        getAndCheck();

    }







    function startGame() {

        gameOn = true;

        let randomNum = pocketSize ? RR.random_int(0,24) : RR.random_int(0,255);
        let randomPopper = mainElement.querySelectorAll(".popper");
        let pressEvent = new Event(isTouch() ? 'touchstart' : 'mousedown');
        randomPopper[randomNum].dispatchEvent(pressEvent);

        randomPopper[randomNum].classList.add("highlighted");
        setTimeout(function() { randomPopper[randomNum].classList.remove("highlighted"); },1000);

        startGameInterval -= (startGameInterval <= (pocketSize ? 1000 : 1000) ? 0 : (pocketSize ? 100 : 50));
        console.log(startGameInterval);
        startGameTimeout = setTimeout(startGame,startGameInterval);
    }

    function endGame() {
        clearTimeout(startGameTimeout);
        clearTimeout(countdownTimeout);
        countdownEnd();
        gameOn = false;
        mainElement.classList.remove("correct");
        startGameStatus.textContent = "Start Game";
    }

    let countdownTimeout = null;
    function toggleStartGame(e) {
        if (startGameElement.checked > 0) {
            resetBoard();
            RR = new Random();
            startGameInterval = 2500;
            timeScore = 0;
            timeElement.textContent = timeScore.toFixed(1);
            gameOn = true;
            mainElement.classList.add("countdown");
            setCountdownContent("3");
            countdownTimeout = setTimeout(function() {
                setCountdownContent("2");
                countdownTimeout = setTimeout(function() {
                    setCountdownContent("1");
                    countdownTimeout = setTimeout(function() {
                        countdownEnd();
                        startGame();
                    },1000);
                },1000);
            },1000);
            
            //startGameTimeout = setTimeout(startGame,3000);
            //getAndCheck();
            disableFreeMode();
            setTimeout(function() {
              toggleQueuedMenu(e,true);
            },250);

            startGameStatus.textContent = "End Game";

        } else {
            endGame();
            pauseScoreTime();
            enableFreeMode();
        }
    }

    function setCountdownContent(content) {
      document.documentElement.style.setProperty('--countdown-content', "\""+content+"\"");
    }

    function countdownEnd() {
      mainElement.classList.remove("countdown");
    }

    let timeScoreScale = 1;
    function loopScoreTime() {
      //let newTime = timeElement.textContent*1;
      timeScore += .1;
      timeScoreScale += .01;
      timeElement.textContent = timeScore.toFixed(1);
      timeElement.style.transform = "scale("+timeScoreScale+")";
    }

    function pauseScoreTime() {
      clearInterval(scoreInterval);
      timeScoreScale = 1;
      timeElement.style.transform = "scale(1)";
    }

    function disableFreeMode() {
      invertElement.style.opacity = ".4";
      clearElement.style.opacity = ".4";
      resetElement.style.opacity = ".4";
    }

    function enableFreeMode() {
      invertElement.style.opacity = "1";
      clearElement.style.opacity = "1";
      resetElement.style.opacity = "1";
    }





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

      saveloadElement.value = configArray.toString(1);
      saveLoadCopy.textContent = "Copy";

      return configArray;
    }

    function checkConfiguration(configArray) {
      let returnVal = true;
      configArray.forEach((item,index) => {
        if (invert) { item = !item; }
        
        if (pocketSize) {
          if (item != opepenArrayPocket[index]) {
            returnVal = false;
          }
        } else {
          if (item != opepenArray[index]) {
            returnVal = false;
          }
        }

      });
      return returnVal;
    }

    function getAndCheck() {
        
        getConfig = getConfiguration(); // for both copy/paste and this function
        let opepenPoppers = [];

        if (gameOn) {
            checkConfig = checkConfiguration(getConfig);
            if (checkConfig) {
              //mainElement.classList.add("correct");

              opepenPoppers = invert ? mainElement.querySelectorAll(".popper.depressed") : mainElement.querySelectorAll(".popper.pressed");
              opepenPoppers.forEach((item) => {
                item.classList.add("correct");
              });

              gameStatus.textContent = "That's an Opepen!";
              loopScoreTime();
              scoreInterval = setInterval(loopScoreTime,100);
            } else {
              //mainElement.classList.remove("correct");

              opepenPoppers = invert ? mainElement.querySelectorAll(".popper.depressed") : mainElement.querySelectorAll(".popper.pressed");
              opepenPoppers.forEach((item) => {
                item.classList.remove("correct");
              });

              gameStatus.textContent = "Keep the Opepen in tact...";
              pauseScoreTime();
            }
        }
    }

    function loadConfiguration(stringArray) {
        
        if (isValidJSONArray("["+stringArray+"]") && stringArray.replaceAll(" ","") != "") {

            let configArray = JSON.parse("["+stringArray+"]");

            mainElement.innerHTML = "";

            configArray.forEach((item) => {

                if (invert) { item = !item; }

                if (item > 0) {
                  newPressedButton();
                } else {
                  newDepressedButton();
                }

            });
        }
    }

    function isValidJSONArray(str) {
        try {
            const parsed = JSON.parse(str);
            return Array.isArray(parsed);
        } catch (e) {
            return false;
        }
    }









    function copyTextarea() {
        
        // Select the textarea content
        saveloadElement.select();
        saveloadElement.setSelectionRange(0, saveloadElement.value.length); // For mobile devices

        // Copy the selected text to the clipboard
        try {
            const successful = document.execCommand('copy');
            if (successful) { saveLoadCopy.textContent = "Copied!"; }
        } catch (err) {
            console.error('Oops, unable to copy', err);
        }

        // Highlight the entire textarea content
        saveloadElement.focus();
    }











    function invertBoard() {

      if (!gameOn) {
        let currentConfig = getConfiguration();
        let newConfig = [];

        currentConfig.forEach((item,index) => {
            newConfig.push(!item);
        });

        mainElement.innerHTML = "";

        newConfig.forEach((item) => {
      
          if (item > 0) {
            newPressedButton();
          } else {
            newDepressedButton();
          }

        });

        getConfiguration();
      }
    }


    function clearBoard() {

      if (!gameOn) {

        let newConfig = pocketSize ? Array.from({ length: 25 }, () => invert?1:0) : Array.from({ length: 256 }, () => invert?1:0);

        mainElement.innerHTML = "";

        newConfig.forEach((item) => {
      
          if (item > 0) {
            newPressedButton();
          } else {
            newDepressedButton();
          }

        });

        getConfiguration();
      }

    }


    function resetBoard() {
        if (pocketSize) {
            resetBoard_pocket();
        } else {
            resetBoard_full();
        }
    }


    function resetBoard_full() {

        document.documentElement.style.setProperty('--popper-size', "calc(6.25% - 1.88px)");

        if (!gameOn) {
    
          mainElement.innerHTML = "";

          opepenArray.forEach((item) => {
            
            if (invert) { item = !item; }

            if (item > 0) {
              newPressedButton();
            } else {
              newDepressedButton();
            }

          });

          getConfiguration();
        }

    }

    function resetBoard_pocket() {
        
        document.documentElement.style.setProperty('--popper-size', "calc(20% - 1.88px)");

        if (!gameOn) {

          mainElement.innerHTML = "";

          opepenArrayPocket.forEach((item) => {
            
            if (invert) { item = !item; }

            if (item > 0) {
              newPressedButton();
            } else {
              newDepressedButton();
            }

          });

          getConfiguration();
        }

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

