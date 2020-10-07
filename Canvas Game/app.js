let gameController = (function() {

})();

let UIController = (function() {
   
    return {
        
    };
})();

let controller = (function(gameCtrl, UICtrl) {

    
    let c = document.getElementById('myCanvas');

    //create a drawing object
    let ctx = c.getContext('2d');

    

    let score = 0;
    // var imgTag = new Image();
   
    // imgTag.src = "images/run.jpg";   // load image

    function animate() {
    ctx.clearRect(0, 0, c.width, c.height);  // clear canvas
    ctx.drawImage(img, imgX, imgY);                       // draw image at current position
    imgX -= 4;
    if (imgX > 200) requestAnimationFrame(animate)        // loop
    }


    const price = document.createElement('img');

    price.src = 'images/apple.jpg';

    let priceX = Math.floor(Math.random() * c.width) + 1; 
    let priceY = Math.floor(Math.random() * c.height) + 1; ;
    
    const img = new Image();
    
    img.src = 'images/run.jpg'

    let imgX = c.width;
    let imgY = 0;
    // let imgX = 0;
    // let imgY = 0;
    // ctx.drawImage(img, imgX, imgY);


    let setupEventListener = function() {
        document.addEventListener('keydown', btnPress);        
    };

    let btnPress = function(event) {
        if (event.keyCode === 37 || event.which === 37) { // LEFT ARROW key
            if (imgX >= 10){
                imgX -= 10;
                drawImgs();
                checkLocation();
            };
        } else if (event.keyCode === 38 || event.which === 38) { // UP ARROW key
            if (imgY >= 10){
                imgY -= 10;
                drawImgs();
                checkLocation();
            };
        } else if (event.keyCode === 39 || event.which === 39) { // RIGHT ARROW key
            if (imgX < (c.width - (img.width+5))){
                img.style = 'transform: rotateY(180deg);';
                imgX += 10;
                drawImgs();
                checkLocation();
            };
        } else if (event.keyCode === 40 || event.which === 40) { // DOWN ARROW key
            if (imgY <= (c.height - img.height - 6)){
                imgY += 10;
                drawImgs();
                checkLocation();
            };
        };
    };

    const drawImgs = function() {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(price, priceX, priceY);
        ctx.drawImage(img, imgX, imgY);
    };

    const drawPrice = function() {
        priceX = Math.floor(Math.random() * (c.width-50)) + 1; 
        priceY = Math.floor(Math.random() * (c.height-50)) + 1; ;
        ctx.drawImage(price, priceX, priceY);
    }

    const checkLocation = function() {
        if (Math.floor(imgX/30) === Math.floor(priceX/30) && 
            Math.floor(imgY/30) === Math.floor(priceY/30)) {

            score++;
            console.log(score);
            drawPrice();
        }
    };

    return {
        init: function() {
            drawImgs();


            // img.onload = animate;
            console.log('Application has started');
            setupEventListener();
        }
    }

})(gameController, UIController);

controller.init();