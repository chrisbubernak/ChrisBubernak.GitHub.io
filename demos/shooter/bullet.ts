/// <reference path="game.ts" />
/// <reference path="gameObject.ts" />
/// <reference path="platform.ts" />

class Bullet extends GameObject {
	private static BULLET_COLOR: string = "blue";
	private static BULLET_WIDTH: number = .1;
    private static BULLET_HEIGHT: number = .1;
    private static BULLET_SPEED: number = 6;
    public static TYPE: string = "bullet";


    constructor(shooter) {
    	super();
    	this.type = Bullet.TYPE;
    	this.owner = shooter.Id();
        this.x = shooter.GunX();
        this.y = shooter.GunY();
        this.width = Bullet.BULLET_WIDTH;
        this.height = Bullet.BULLET_HEIGHT;
        var dX = shooter.TargetX() - this.x
        var dY = shooter.TargetY() - this.y
        var mag = Math.sqrt(dX*dX + dY * dY);
        this.vY = (dY/mag) * Bullet.BULLET_SPEED;
        this.vX = (dX/mag) * Bullet.BULLET_SPEED;
        this.bounces = true;
    }

    public Collides(obj) {
		if (obj.Type() === "platform" && !this.collided) {
    		this.collided = true;
    		this.owner = "";
    		this.vY *= -1;
    	} else if (obj.Id() === this.owner || obj.Owner() === this.owner || obj.Type() === Platform.TYPE) {
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

    public Draw() {
        Game.ctx.fillStyle = Bullet.BULLET_COLOR;
        Game.ctx.fillRect(this.x, this.y, this.Width(), this.Height());  
    }
}