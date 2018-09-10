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
	//Initialize the sprites's velocity, acceleration, friction, speed and drag variables
	cat.vx = 0;
	cat.vy = 0;
	cat.accelerationX = 0;
	cat.accelerationY = 0;
	cat.frictionX = 1;
	cat.frictionY = 1;
	cat.speed = 0.2;
	cat.drag = 0.98;
	//Scale the sprite up so it's 3 times bigger than the original image
	cat.scale.set(3, 3);
	//Add the sprite to the stage
	stage.addChild(cat);

	//Controls
	var left = keyboard(37),
		up = keyboard(38),
		right = keyboard(39),
		down = keyboard(40);


	left.release = () => {
		//If the left arrow has been released, and the right arrow isn't down,
		//and the cat isn't moving vertically, stop the sprite from moving
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

	
	left.press = () => {
		cat.accelerationX = -cat.speed;
		cat.frictionX = 1;
	};
	
	left.release = () => {
	if (!right.isDown) {
	cat.accelerationX = 0;
	cat.frictionX = cat.drag;
	}
	};
	//Up
	up.press = () => {
	cat.accelerationY = -cat.speed;
	cat.frictionY = 1;
	};
	up.release = () => {
	if (!down.isDown) {
	cat.accelerationY = 0;
	cat.frictionY = cat.drag;
	}
	};
	//Right
	right.press = () => {
	cat.accelerationX = cat.speed;
	cat.frictionX = 1;
	};
	right.release = () => {
	if (!left.isDown) {
	cat.accelerationX = 0;
	cat.frictionX = cat.drag;
	}
	};
	//Down
	down.press = () => {
	cat.accelerationY = cat.speed;
	cat.frictionY = 1;
	};
	down.release = () => {
	if (!up.isDown) {
	cat.accelerationY = 0;
	cat.frictionY = cat.drag;
	}
	};
	
	gameLoop();
};

/*
	Play moves the cat sprite across the screen
*/

function play(){
	
	//Acceleration and friction
	cat.vx += cat.accelerationX;
	cat.vy += cat.accelerationY;
	cat.vx *= cat.frictionX;
	cat.vy *= cat.frictionY;
	//Gravity
	cat.vy += 0.1;
		
	//Move the sprite
	cat.x += cat.vx;
	cat.y += cat.vy;
	
	let collision = contain(
		cat, //The sprite you want to contain
		{ //An object that defines the area
			x: 0, //`x` position
			y: 0, //`y` position
			width: renderer.view.width, //`width`
			height: renderer.view.height //`height`
		}
	);
		if (collision) {
	//Reverse the sprite's `vx` value if it hits the left or right
		if (collision.has("left") || collision.has("right")){
			cat.vx = -cat.vx;
		}
		//Reverse the sprite's `vy` value if it hits the top or bottom
		if (collision.has("top") || collision.has("bottom")){
			cat.vy = -cat.vy;
		}
	}
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

function contain(sprite, container) {
	//Create a `Set` called `collision` to keep track of the
	//boundaries with which the sprite is colliding
	var collision = new Set();
	//Left
	//If the sprite's x position is less than the container's x position,
	//move it back inside the container and add "left" to the collision Set
	if (sprite.x < container.x) {
		sprite.x = container.x;
		collision.add("left");
	}
	//Top
	if (sprite.y < container.y) {
		sprite.y = container.y;
		collision.add("top");
	}
	//Right
	if (sprite.x + sprite.width > container.width) {
		sprite.x = container.width - sprite.width;
		collision.add("right");
	}
	//Bottom
	if (sprite.y + sprite.height > container.height) {
		sprite.y = container.height - sprite.height;
		collision.add("bottom");
	}
	//If there were no collisions, set `collision` to `undefined`
	if (collision.size === 0) collision = undefined;
	//Return the `collision` value
	return collision;
}