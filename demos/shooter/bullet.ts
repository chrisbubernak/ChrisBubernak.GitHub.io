/// <reference path="game.ts" />
/// <reference path="gameObject.ts" />

class Bullet extends GameObject {
	private static BULLET_COLOR: string = "blue";
	private static BULLET_WIDTH: number = .1;
    private static BULLET_HEIGHT: number = .1;
    private static BULLET_SPEED: number = 6;
    private static BULLET_TYPE: string = "bullet";

    constructor(shooter) {
    	super();
    	this.type = Bullet.BULLET_TYPE;
    	this.owner = shooter.Type();
        this.x = shooter.x + shooter.Width()/2;
        this.y = shooter.y + shooter.Height()/2;
        this.width = Bullet.BULLET_WIDTH;
        this.height = Bullet.BULLET_HEIGHT;
        var dX = this.x - shooter.x;
        var dY = this.y - shooter.y;
        var mag = Math.sqrt(dX*dX + dY * dY);
        this.vY = (-dY/mag) * Bullet.BULLET_SPEED;
        this.vX = (-dX/mag) * Bullet.BULLET_SPEED;
    }

    public Collides(obj) {
		if (obj.Type() === "platform" && !this.collided) {
    		this.collided = true;
    		this.owner = "";
    		this.vY *= -1;
    	} else if (obj.Type() === this.owner || obj.Owner() === this.owner || obj.Type() === "platform") {
    		//no op if we hit our owner or another of our own bullets
    	} 
    	else {
    		this.dead = true;
    	}
    }

    public Move() {
    	this.collided = false;
        this.x += this.vX;
        this.y += this.vY;
        if (this.x > Game.GameWidth() || this.x < 0 || this.y > Game.GameHeight() || this.y < 0) {
            this.dead = true;                        
        }
    }  
}