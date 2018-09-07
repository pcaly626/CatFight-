// JavaScript Document
let renderer = PIXI.autoDetectRenderer(500,300, {antialias: false, transparent: false, resolution: 1});

window.addEventListener("resize", event =>{window.scaleToWindow(renderer.resize);}, false);

renderer.view.style.border = "1px dashed black";
document.body.appendChild(renderer.view);

let stage = new PIXI.Container();

PIXI.loader.add("cat_ani/cat1.png").add("dojo.png").load(setup);

function setup(){
let dojoTexture = PIXI.utils.TextureCache["dojo.png"];
let dojo = new PIXI.Sprite(dojoTexture);
stage.addChild(dojo);
	//Create the `tileset` sprite from the texture
let texture = PIXI.utils.TextureCache["cat_ani/cat1.png"];
//Create a rectangle object that defines the position and
//size of the sub-image you want to extract from the texture
let rectangle = new PIXI.Rectangle(16, 12, 17, 30);
//Tell the texture to use that rectangular section
texture.frame = rectangle;
//Create the sprite from the texture
let cat = new PIXI.Sprite(texture);
//Position the sprite on the canvas
cat.x = 10;
cat.y = 200;
//Scale the sprite up so it's 3 times bigger than the original image
cat.scale.set(3, 3);
//Add the sprite to the stage
stage.addChild(cat);
//Render the stage
renderer.render(stage);

};
