let spritesheet;
let spritedata;

let animation = [];

let horses = [];

function preload(){
	spritedata = loadJSON('book.json');
	spritesheet = loadImage('images/books.png');
}

function setup() {
  let myCanvas = createCanvas(1138, 400);

  myCanvas.parent('anim');

  let frames = spritedata.frames;
  for (let i = 0; i < frames.length; i++){
  	let pos = frames[i].position;
  	let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
  	animation.push(img);
  }
  for (let i = 0; i <= 0; i++){
  horses[i] = new Sprite(animation, 0, i*100, 0.15);
  }
}

function draw() {
  //background(255);
  background(255);
  for (let horse of horses){
    horse.show();
    horse.animate();
  }
  //image(animation[frameCount % animation.length], 0, 0);
}



