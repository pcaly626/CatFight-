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

//---------------------------------Setting up the Game State------------------------------------------

let gameState = play;

/*
	Setup takes the game objects then turns them into textures, sprites then adds them to the stage
	-Rectangle finds the sprite in a spritesheet at a particular location
	-Gameloop creates an envirnment to be interacted with, constantly updating the frame (60 FPS)
*/
function setup(){
	let keyObject = keyboard;
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
	//Center the sprite
	cat.x = renderer.view.width / 2 - cat.width / 2;
	cat.y = renderer.view.height / 2 - cat.height / 2;
	//Initialize the sprites's velocity variables
	cat.vx = 0;
	cat.vy = 0;
	//Scale the sprite up so it's 3 times bigger than the original image
	cat.scale.set(3, 3);
	//Add the sprite to the stage
	stage.addChild(cat);

	//Controls
	var left = keyboard(37),
		up = keyboard(38),
		right = keyboard(39),
		down = keyboard(40);

	keyObject.press = () => {
		cat.vx = -5;
		cat.vy = 0;
	};
	left.release = () => {
		//If the left arrow has been released, and the right arrow isn't down,
		//and the pixie isn't moving vertically, stop the sprite from moving
		//by setting its velocity to zero
		if (!right.isDown && cat.vy === 0) {
			cat.vx = 0;
		}
	};
	//Up
	up.press = () => {
		cat.vy = -5;
		cat.vx = 0;
	};
	up.release = () => {
		if (!down.isDown && cat.vx === 0) {
			cat.vy = 0;
		}
	};
	//Right
	right.press = () => {
		cat.vx = 5;
		cat.vy = 0;
	};
	right.release = () => {
		if (!left.isDown && cat.vy === 0) {
			cat.vx = 0;
		}
	};
	//Left
	left.press = () => {
		cat.vx = -5;
		cat.vy = 0;
	};
	left.release = () => {
		if (!right.isDown && cat.vy === 0) {
			cat.vx = 0;
		}
	};
	//Down
	down.press = () => {
		cat.vy = 5;
		cat.vx = 0;
	};
	down.release = () => {
		if (!up.isDown && cat.vx === 0) {
			 cat.vy = 0;
		}
	};

	gameLoop();
};

/*
	Play moves the cat sprite across the screen
*/

function play(){
	cat.x += cat.vx;
	cat.y += cat.vy;
};

/*
	GameLoop constantly updates the screen (60 frames per second)
*/

function gameLoop(){
	requestAnimationFrame(gameLoop);
	gameState();
	renderer.render(stage);
};

/*
	KeyBoard makes an arrray for the keys
	and downHandler creates a anonymous class for two events
		1. If Down Key is 
*/

function keyboard(keyCode) {
	let key = {};
	key.code = keyCode;
	key.isDown = false;
	key.isUp = true;
	key.press = undefined;
	key.release = undefined;
	//The `downHandler`
	key.downHandler = event => {
		if (event.keyCode === key.code) {
			if (key.isUp && key.press) key.press();
				key.isDown = true;
				key.isUp = false;
		}
		event.preventDefault();
	};

	//The `upHandler`
	key.upHandler = event => {
		if (event.keyCode === key.code) {
			if (key.isDown && key.release) key.release();
				key.isDown = false;
				key.isUp = true;
			}
		event.preventDefault();
	};
	
	//Attach event listeners
	window.addEventListener("keydown", key.downHandler.bind(key), false);
	window.addEventListener("keyup", key.upHandler.bind(key), false);
	
	//Return the `key` object
	return key;
}