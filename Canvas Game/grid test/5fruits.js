
let controller = (function() {

    let playArea = document.getElementsByClassName('playArea');
    let player = document.querySelector('.run');

    let apple =  '<img class="apple" id="%id%" src="../images/apple.jpg" style="--priceY: %Y%; --priceX:%X%;" />';
    let pineapple =  '<img class="pineapple"  id="%id%" src="../images/pineapple.jpg" style="--priceY: %Y%; --priceX:%X%;" />';
    let grapes = '<img class="grapes"  id="%id%" src="../images/grapes.jpg" style="--priceY: %Y%; --priceX:%X%;" />';
    let orange = '<img class="orange"  id="%id%" src="../images/orange.jpg" style="--priceY: %Y%; --priceX:%X%;" />';
    let pear =  '<img class="pear" id="%id%" src="../images/pear.jpg" style="--priceY: %Y%; --priceX:%X%;" />';

    let fruitArray = [apple, pineapple, grapes, orange, pear];


    let price = fruitArray[Math.floor(Math.random() * 5)];

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

    let FruitPosition = function(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
    };

    // snake[currentID] = new PlayerPosition(2, 2);
    // player.style.setProperty('--playerY', snake[0].y);
    // player.style.setProperty('--playerX', snake[0].x);
    
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
        snake = [];
        poop = [];
        fruits = [];

        ID = 0;
        currentID = 0;
        poopID = 0;
        fruitID = 0;
        score = 0;

        snake[currentID] = new PlayerPosition(2, 19);
        
        // animate();

        player.style.setProperty('--playerY', snake[0].y);
        player.style.setProperty('--playerX', snake[0].x);

        drawPrice();
        drawPrice();
        drawPrice();
        drawPrice();
        drawPrice();

        // window.requestAnimationFrame(animate);


        // pricePosition.x = Math.floor(Math.random() * 19) + 1; 
        // pricePosition.y = Math.floor(Math.random() * 19) + 1;

        // price.style.setProperty('--priceY', pricePosition.x);
        // price.style.setProperty('--priceX', pricePosition.y);

        document.getElementById('score').innerHTML = 'Score: ';

    };

    
    


    function animate() {   
        while (snake[currentID].y > 15){
            setTimeout(function() {
                console.log('move');
                snake[currentID].y -= 1;
                newPosition(snake[currentID].x, snake[currentID].y);
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
            if (snake[currentID].y > 1){
                snake[currentID].y -= 1;
                newPosition(snake[currentID].x, snake[currentID].y);
                player.style = 'transform: scaleX(1);';
                drawImgs();
                // console.log('LEFT');
                checkLocation();
            };
            // console.log('LEFT' + playerX);
        } else if (event.keyCode === 38 || event.which === 38) { // UP ARROW key
            if (snake[currentID].x > 1){
                snake[currentID].x -= 1;
                newPosition(snake[currentID].x, snake[currentID].y)
                drawImgs();
                checkLocation();
            };
            // console.log('UP' +playerY);
        } else if (event.keyCode === 39 || event.which === 39) { // RIGHT ARROW key
            if (snake[currentID].y < 20){
                snake[currentID].y += 1;
                newPosition(snake[currentID].x, snake[currentID].y)
                player.style = 'transform: scaleX(-1);';
                drawImgs();
                checkLocation();
            };
            // console.log('RIGHT' +playerX);
        } else if (event.keyCode === 40 || event.which === 40) { // DOWN ARROW key
            if (snake[currentID].x < 20){
                snake[currentID].x += 1;
                newPosition(snake[currentID].x, snake[currentID].y)
                drawImgs();
                checkLocation();
            };
            // console.log('DOWN' + playerY);
        };
    };

    let newPosition = function (x, y) {
        snake[currentID + 1] = new PlayerPosition(x, y);
        currentID++;
        // console.log(snake);
    };

    const drawImgs = function() {
        player.style.setProperty('--playerX', snake[currentID].x);
        player.style.setProperty('--playerY', snake[currentID].y);
    };

    const drawPrice = function() {

        while (true) {
            let isSame = 0;

            pricePosition.x = (Math.floor(Math.random() * 19) + 1); 
            pricePosition.y = (Math.floor(Math.random() * 19) + 1);

            poop.forEach(element => {
                if (element.x === pricePosition.x && element.y === pricePosition.y) {
                isSame++;
                console.log('avoided!', element.y, element.x);
                }  
            });
            if (snake[currentID].x === pricePosition.y && snake[currentID].y === pricePosition.x) {
                console.log('same as runner');
                isSame++;
            };
            if (isSame < 1) { 
                html = fruitArray[Math.floor(Math.random() * 5)];
                
                let newHTML = html.replace('%id%', ID);
                newHTML = newHTML.replace('%Y%', pricePosition.y);
                newHTML = newHTML.replace('%X%', pricePosition.x);

                fruits[fruitID] = new FruitPosition(pricePosition.x, pricePosition.y, ID);
                
                document.querySelector('.playArea').insertAdjacentHTML('beforeend', newHTML);
                
                fruitID++;
                ID++;
                // console.log(fruits);
                break;
            };  
        };
    };

    const checkLocation = function() {

        if (poop.length > -1) {
            for (let i=0; i<poop.length; i++) {
                if (snake[currentID].x === poop[i].x && snake[currentID].y === poop[i].y) {
                    gameOver();
                };
            };
        };

        if (fruits.length > -1) {
            for (let j=0; j<fruits.length; j++){
                if(fruits[j] === undefined) {
    
                } else if (snake[currentID].x === fruits[j].x && snake[currentID].y === fruits[j].y) {
                    
                    score++;
                    // console.log(score);
                    document.getElementById(fruits[j].id).remove();
                    fruits.splice(j, 1)
                    
                    document.getElementById('score').innerHTML = 'Score: ' + score;
                    let loc = currentID;
                    addSnake(snake[currentID -2].x, snake[currentID -2].y);
                    // console.log(snake[currentID-2]);
                    drawPrice();
                    ;
                }
            }
        }
    };
    
    let addSnake = function(x, y) { 
        ID ++;
        
        let html = '<img src="../images/poop.jpg" class="poop" style="--poopY: %Y%; --poopX: %X%;" />';
        

        let newHTML = html.replace('%Y%', y);
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
        // apple.classList.add('hide');
        // pineapple.classList.add('hide');
        // orange.classList.add('hide');
        // grapes.classList.add('hide');

        // startGame();
        document.querySelectorAll('.poop').forEach(element => {
            element.remove();
        });

        document.querySelectorAll('.apple').forEach(element => {
            element.remove();
        });

        document.querySelectorAll('.pineapple').forEach(element => {
            element.remove();
        });

        document.querySelectorAll('.grapes').forEach(element => {
            element.remove();
        });

        document.querySelectorAll('.orange').forEach(element => {
            element.remove();
        });

        document.querySelectorAll('.pear').forEach(element => {
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