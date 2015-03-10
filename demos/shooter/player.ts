/// <reference path="game.ts" />
/// <reference path="gameObject.ts" />
/// <reference path="bullet.ts" />

class Player extends GameObject{
	private static COLOR: string = "green";
	private static WIDTH: number = .6;
    private static HEIGHT: number = 1.5;
    private static SPEED: number = 2;
    private static TYPE: string = "player";
    private static MAX_SPEED: number = 10;
    private static JUMP_VELOCITY: number = .6;

    private jumping: boolean = false;
    private crouching: boolean = false;

    constructor(id, x, y) {
    	super();
    	this.type = Player.TYPE;
    	this.id = id;
        this.x = x;
        this.y = y;
        this.width = Player.WIDTH;
        this.height = Player.HEIGHT;
        this.aY = Game.Gravity();
        this.color = Player.COLOR;
        this.bleeds = true;
    }	

    public Id() {
    	return this.id;
    }

    public Width() {  
    	return Game.BoxWidth() * this.width;
	}

	public Height() {
		if (this.crouching) {
			return Game.BoxHeight() * this.height/2;
		}
		return Game.BoxHeight() * this.height;
	}
    public Collides(obj) {
    	if (obj.Type() === Bullet.TYPE && obj.Owner() !== this.id) {
    		this.dead = true;
    	} else if (obj.Type() === Platform.TYPE && !this.collided) {
    		this.collided = true;
			var goingUp = this.vY < 0;
            if (!goingUp) {
                // player is above the platform
                this.y = obj.Y() - this.Height();
                this.vY = 0;
                this.jumping = false;
            } else if (goingUp){
                // player is below the platform
                this.vY = 0;
                this.y = obj.Y() + obj.Height();
            }
		}         
    }

    public Move() {
    	this.crouching = false;
    	this.collided = false;
        this.vY += this.aY;
        this.y += this.vY;
        if (this.y + this.Height() >= Game.GameHeight()) {
            this.y = Game.GameHeight() - this.Height();
            // want normal force to dwcancel gravity!
            this.vY = 0; 
            this.jumping = false;
        }

        if (this.vX !== 0) {
            this.aX = this.vX > 0 ? -Game.Friction(): Game.Friction();
        } else {
            this.aX = 0;
        }

        this.vX += this.aX;
        if (Math.abs(this.vX) > Player.MAX_SPEED) {
            this.vX = this.vX > 0 ? Player.MAX_SPEED : -Player.MAX_SPEED;
        }
        this.x += this.vX;

        if (this.x > Game.GameWidth() - this.Width()) {
            this.x = Game.GameWidth() - this.Width();
            this.vX = 0;
            this.aX = 0;
        }
        if (this.x < 0) {
            this.vX = 0;
            this.aX = 0;
            this.x = 0;
        }
        // todo: updateGun(player, player.gun);
    }

    // todo: fix these!
    public TargetX() {
    	return Game.GetMouseX();
    }

    public TargetY() {
    	return Game.GetMouseY();
    }

    public Shoot() {
	    var bullet = new Bullet(this);
    }

    public MoveLeft() {
        this.vX -= 1;
    }

    public MoveRight() {
    	this.vX += 1;
    }

    public Crouch() {
    	this.crouching = true;
    }

    public Jump() {
    	if (!this.jumping && this.vY === 0) {
    		this.jumping = true;
    		this.vY = -Player.JUMP_VELOCITY * Game.BoxHeight();
    	}
    }

    public DropPlatform(loc) {
    	Game.AddGameObject(new Platform(loc));
    }
}   