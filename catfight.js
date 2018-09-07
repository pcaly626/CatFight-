//This is the Script that implements PIXI for cat fight!

//---------------------------------Game Objects------------------------------------------------------
let cat, dojo;


//---------------------------------Render Setup------------------------------------------------------

let renderer = PIXI.autoDetectRenderer(500,300, {antialias: false, transparent: false, resolution: 1});
renderer.view.style.border = "1px dashed black";
document.body.appendChild(renderer.view);

//---------------------------------Stage Container Created-------------------------------------------
let stage = new PIXI.Container();

//---------------------------------Game Objects added to Stage and Implements setup-------------------

PIXI.loader.add("cat_ani/cat1.png").add("dojo.png").load(setup);



/*
	Setup takes the game objects then turns them into textures, sprites then adds them to the stage
	-Rectangle finds the sprite in a spritesheet at a particular location
	-Gameloop creates an envirnment to be interacted with, constantly updating the frame (60 FPS)
*/
function setup(){
let dojoTexture = PIXI.utils.TextureCache["dojo.png"];
 dojo = new PIXI.Sprite(dojoTexture);
stage.addChild(dojo);
	//Create the `tileset` sprite from the texture
let texture = PIXI.utils.TextureCache["cat_ani/cat1.png"];
//Create a rectangle object that defines the position and
//size of the sub-image you want to extract from the texture
let rectangle = new PIXI.Rectangle(16, 12, 17, 30);
//Tell the texture to use that rectangular section
texture.frame = rectangle;
//Create the sprite from the texture
 cat = new PIXI.Sprite(texture);
//Position the sprite on the canvas
cat.x = 10;
cat.y = 200;
//Scale the sprite up so it's 3 times bigger than the original image
cat.scale.set(3, 3);
//Add the sprite to the stage
stage.addChild(cat);

gameLoop();
};

/*
	Play moves the cat sprite across the screen
*/

function play(){
	cat.x += 1;
};

/*
	GameLoop constantly updates the screen (60 frames per second)
*/

function gameLoop(){
	requestAnimationFrame(gameLoop);
	play();
	renderer.render(stage);
	
};

