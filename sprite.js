class Sprite {
	constructor(animation, x, y, speed) {
		this.x = x;
		this.y = y;
		this.animation = animation;
		this.w = this.animation[0].width;
		this.speed = speed;
		this.index = 0;
		this.len = this.animation.length;
	}


	show() {
		let index = floor(this.index) % this.len;
		image(this.animation[index], this.x, this.y);
	}

	animate() {
		this.index += this.speed;
		this.x += this.speed*20;

		if (this.x > width) {
			this.x = -this.w;
		}
	}
}