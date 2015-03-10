/// <reference path="game.ts" />
/// <reference path="gameObject.ts" />

class Blood extends GameObject {
	private static COLOR: string = "red";
	private static WIDTH: number = .1;
	private static HEIGHT: number = .1;
	private static Y_SPEED: number = .6;
	public static TYPE: string = "blood";

	constructor(x, y) {
	    super();
    	this.type = Blood.TYPE;
    	this.x = x;
    	this.y = y;
    	this.color = Blood.COLOR;
    	this.width = Blood.WIDTH;
    	this.height = Blood.HEIGHT;
        this.vX = Math.random() * Game.BoxWidth()/8 - Game.BoxWidth()/16;
        this.vY = -Math.random() * Blood.Y_SPEED * Game.BoxHeight();
        this.aY = Game.Gravity();
    }   
    public Draw() {
 		Game.ctx.fillStyle = this.color;
        Game.ctx.fillRect(this.x + this.Width()/2, this.y + this.Height()/2, this.Width(), this.Height());
    }

    public Move() {
    	this.vY += this.aY;
        this.x += this.vX;
        this.y += this.vY;
        if (this.x > Game.GameWidth() || this.x < 0 || this.y > Game.GameHeight() || this.y < 0) {
            this.dead = true;
        }
    }
}
