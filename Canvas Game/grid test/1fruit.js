
let controller = (function() {

    let playArea = document.getElementsByClassName('playArea');
    let player = document.querySelector('.run');
    let apple = document.querySelector('.apple');
    let pineapple = document.querySelector('.pineapple');
    let grapes = document.querySelector('.grapes');
    let orange = document.querySelector('.orange');

    let fruitArray = [apple, pineapple, grapes, orange];


    let price = fruitArray[Math.floor(Math.random() * 4)];

    // let location = [];
    // let poop = [];

    // let ID = 0;
    let currentID = 0;
    // let poopID = 0;
    // let score = 0;
    let highScore = 0;
    
    let pricePosition = {x: 0, y: 0};

    let PlayerPosition = function(x, y) {
        this.x = x;
        this.y = y;
    };

    let PoopPosition = function(x, y) {
        this.x = x;
        this.y = y;
    };

    let FruitPosition = function(x, y) {
        this.x = x;
        this.y = y;
    }


    // location[currentID] = new PlayerPosition(2, 2);
    // player.style.setProperty('--playerY', location[0].y);
    // player.style.setProperty('--playerX', location[0].x);
    
    let startGame = function() {
        
        console.log('start');
        document.querySelector('#start_game').classList.add('hide');
        document.querySelector('#instructions').classList.add('hide');
        document.querySelector('#game_over').classList.add('hide');
        document.querySelector('#poopGIF').classList.add('hide');
        document.querySelector('#try_again').classList.add('hide');

        player.classList.remove('hide');
        // price.classList.remove('hide');

        player.style = 'transform: scaleX(1);';
        location = [];
        poop = [];
         = [];

        ID = 0;
        currentID = 0;
        poopID = 0;
        score = 0;

        location[currentID] = new PlayerPosition(2, 19);
        
        // animate();

        player.style.setProperty('--playerY', location[0].y);
        player.style.setProperty('--playerX', location[0].x);

        drawPrice();

        // window.requestAnimationFrame(animate);


        // pricePosition.x = Math.floor(Math.random() * 19) + 1; 
        // pricePosition.y = Math.floor(Math.random() * 19) + 1;

        // price.style.setProperty('--priceY', pricePosition.x);
        // price.style.setProperty('--priceX', pricePosition.y);

        document.getElementById('score').innerHTML = 'Score: ';

    };

    
    


    function animate() {   
        while (location[currentID].y > 15){
            setTimeout(function() {
                console.log('move');
                location[currentID].y -= 1;
                newPosition(location[currentID].x, location[currentID].y);
                drawImgs();
            }, 200);
        };
    };

 

    let setupEventListener = function() {
        
        // If start game button is pressed
        document.querySelector('#start_game').addEventListener('click', startGame);
        
        document.querySelector('#try_again').addEventListener('click', startGame);

        // If button is pressed on keyboard
        document.addEventListener('keydown', btnPress);   
        
        
    };

    let btnPress = function(event) {
        if (event.keyCode === 13 || event.which === 13) { // ENTER key
            if (document.querySelector('#start_game').classList.contains('hide') != true) {
                startGame();
            };
            if (document.querySelector('#try_again').classList.contains('hide') != true) {
                startGame();
            };
        } else if (event.keyCode === 37 || event.which === 37) { // LEFT ARROW key
            if (location[currentID].y > 1){
                location[currentID].y -= 1;
                newPosition(location[currentID].x, location[currentID].y);
                player.style = 'transform: scaleX(1);';
                drawImgs();
                // console.log('LEFT');
                checkLocation();
            };
            // console.log('LEFT' + playerX);
        } else if (event.keyCode === 38 || event.which === 38) { // UP ARROW key
            if (location[currentID].x > 1){
                location[currentID].x -= 1;
                newPosition(location[currentID].x, location[currentID].y)
                drawImgs();
                checkLocation();
            };
            // console.log('UP' +playerY);
        } else if (event.keyCode === 39 || event.which === 39) { // RIGHT ARROW key
            if (location[currentID].y < 20){
                location[currentID].y += 1;
                newPosition(location[currentID].x, location[currentID].y)
                player.style = 'transform: scaleX(-1);';
                drawImgs();
                checkLocation();
            };
            // console.log('RIGHT' +playerX);
        } else if (event.keyCode === 40 || event.which === 40) { // DOWN ARROW key
            if (location[currentID].x < 20){
                location[currentID].x += 1;
                newPosition(location[currentID].x, location[currentID].y)
                drawImgs();
                checkLocation();
            };
            // console.log('DOWN' + playerY);
        };
    };

    let newPosition = function (x, y) {
        location[currentID + 1] = new PlayerPosition(x, y);
        currentID++;
        // console.log(location);
    };

    const drawImgs = function() {
        player.style.setProperty('--playerX', location[currentID].x);
        player.style.setProperty('--playerY', location[currentID].y);
    };

    const drawPrice = function() {
        price = fruitArray[Math.floor(Math.random() * 4)];
        if (price.classList.contains('hide') === true) {
            price.classList.remove('hide');
        }

        while (true) {
            let isSame = 0;

            pricePosition.x = (Math.floor(Math.random() * 19) + 1); 
            pricePosition.y = (Math.floor(Math.random() * 19) + 1);

            poop.forEach(element => {
                if (element.y === pricePosition.x && element.x === pricePosition.y) {
                isSame++;
                console.log('avoided!', element.y, element.x);
                // pricePosition.x = (Math.floor(Math.random() * 19) + 1); 
                // pricePosition.y = (Math.floor(Math.random() * 19) + 1);
                }  
            });
            if (location[currentID].x === pricePosition.y && location[currentID].y === pricePosition.x) {
                console.log('same as runner');
                isSame++;
            };
            if (isSame < 1) { 
                price.style.setProperty('--priceY', pricePosition.x);
                price.style.setProperty('--priceX', pricePosition.y);
                break;
            };
        }
            
        // console.log(pricePosition);
    }

    const checkLocation = function() {

        if (poop.length > -1) {
            for (let i=0; i<poop.length; i++) {
                if (location[currentID].x === poop[i].x && location[currentID].y === poop[i].y) {
                    gameOver();
                };
            };
        };

        if (location[currentID].x === pricePosition.y && location[currentID].y === pricePosition.x) {
            score++;
            price.classList.add('hide');
            document.getElementById('score').innerHTML = 'Score: ' + score;
            let loc = currentID;
            addlocation(location[currentID -2].x, location[currentID -2].y);
            // console.log(location[currentID-2]);
            drawPrice();
        }
    };
    
    let addlocation = function(x, y) { 
        ID ++;
        
        let html = '<img src="../images/poop.jpg" class="poop" id="%id%" style="--poopY: %Y%; --poopX: %X%;" />';

        let newHTML = html.replace('%id%', ID);
        newHTML = newHTML.replace('%Y%', y);
        newHTML = newHTML.replace('%X%', x);

        poop[poopID] = new PoopPosition(x, y);
        poopID++;
        // console.log(poop);

        // let ins = ID - 1;
        document.querySelector('.playArea').insertAdjacentHTML('beforeend', newHTML);

        return poopID;
    };
    

    let gameOver = function() {
        // alert('You stepped in poop!');
        
        document.querySelector('#game_over').classList.remove('hide');
        document.querySelector('#poopGIF').classList.remove('hide');
        document.querySelector('#try_again').classList.remove('hide');

        if (score >= highScore) {
            highScore = score;
            document.getElementById('highScore').innerHTML = 'Highscore: ' + score;
        };

        document.getElementById('score').innerHTML = '';

        player.classList.add('hide');
        apple.classList.add('hide');
        pineapple.classList.add('hide');
        orange.classList.add('hide');
        grapes.classList.add('hide');

        // startGame();
        document.querySelectorAll('.poop').forEach(element => {
            element.remove();
        });
    };

    return {
        init: function() {
            // startGame();
            // drawImgs();
            // drawPrice();

            
            console.log('Application has started');
            setupEventListener();
            
        }
    }

})();

controller.init();