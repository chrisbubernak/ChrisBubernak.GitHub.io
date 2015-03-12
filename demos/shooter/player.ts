/// <reference path="game.ts" />
/// <reference path="gameObject.ts" />
/// <reference path="bullet.ts" />
/// <reference path="gun.ts" />

class Player extends GameObject{
	private static COLOR: string = "green";
	private static WIDTH: number = .6;
    private static HEIGHT: number = 1.5;
    private static SPEED: number = 2;
    public static TYPE: string = "player";
    private static MAX_SPEED: number = 10;
    private static JUMP_VELOCITY: number = .6;

    private gun: Gun;
    private jumping: boolean = false;
    private crouching: boolean = false;
    private logic;
    private targetX: number;
    private targetY: number;

    constructor(id, x, y, logic) {
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
        this.gun = new Gun();
        this.logic = logic;
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

    	var inputs = this.logic.GetInput(this);
    	for (var i = 0; i < inputs.length; i++) {
    		var input = inputs[i];
	        if (input === "U") this.Jump();
			if (input === "L") this.MoveLeft();
			if (input === "R") this.MoveRight();
			if (input === "D") this.Crouch();
			if (input === "S") this.Shoot();
    	}

    	this.targetX = this.logic.GetMouseX(this);
    	this.targetY = this.logic.GetMouseY(this);

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
        this.UpdateGun();
    }

    public TargetX() {
    	return this.targetX;
    }

    public TargetY() {
    	return this.targetY;
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

    public GunX() {
    	return this.gun.x3;
    }

    public GunY() {
    	return this.gun.y3;
    }

    public Draw() {
        // O
        // -+-
        // /\
        Game.ctx.beginPath();
        Game.ctx.strokeStyle = this.color;
        // head
        Game.ctx.arc(this.x + this.Width()/2, this.y + this.Height()/4 , this.Height()/4, 0, 2 * Math.PI, false);
        // torso
        Game.ctx.moveTo(this.x + this.Width()/2, this.y + this.Height()/2);
        Game.ctx.lineTo(this.x + this.Width()/2, this.y + this.Height()*(3/4));

        // legs
        Game.ctx.lineTo(this.x, this.y + this.Height());
        Game.ctx.moveTo(this.x + this.Width()/2, this.y + this.Height()*(3/4));
        Game.ctx.lineTo(this.x + this.Width(), this.y + this.Height());
        
        // arm(s)
        var armStartX = this.x + this.Width() * (1/2);
        var armStartY = this.y + this.Height() * (2/3);
        Game.ctx.moveTo(armStartX, armStartY);
        
        var dX = armStartX -  this.TargetX();
        var dY = armStartY - this.TargetY();
        
        var mag = Math.sqrt(dX * dX + dY * dY);
        var handYOffset = (-dY/mag) * this.Width()/2;
        var handXOffset = (-dX/mag) * this.Width()/2;
        var handY = armStartY + handYOffset;
        var handX = armStartX + handXOffset;
        Game.ctx.lineTo(handX, handY);

        Game.ctx.closePath();
        Game.ctx.stroke();

		Game.ctx.beginPath();
        Game.ctx.moveTo(this.gun.x1, this.gun.y1)
        Game.ctx.lineTo(this.gun.x2, this.gun.y2);
        Game.ctx.lineTo(this.gun.x3, this.gun.y3);
        Game.ctx.stroke();
        Game.ctx.closePath();
    }

    private UpdateGun() {
		var armStartX = this.x + this.Width()/2;
        var armStartY = this.y + this.Height() * (2/3);
        var dX;
        var dY;
    
        dX = armStartX -  this.TargetX();
        dY = armStartY - this.TargetY();
    
        var mag = Math.sqrt(dX * dX + dY * dY);
        var handYOffset = (-dY/mag) * this.Width()/2;
        var handXOffset = (-dX/mag) * this.Width()/2;
        var handY = armStartY + handYOffset;
        var handX = armStartX + handXOffset;
        this.gun.x1 = handX;
        this.gun.y1 = handY;

        var gunHeight = this.Height()/4;

        var tan = gunHeight/this.Width();

        var NEG = handXOffset > 0? 1 : -1;

        this.gun.x2 = handX - (tan * (NEG * (armStartY - handY)));
        this.gun.y2 = handY - (tan * (-NEG * (armStartX - handX)));

        var gunLength = this.Width()/2;

        var tan2 = gunLength/gunHeight;

        this.gun.x3 = this.gun.x2 - (tan2 * (-NEG * (handY - this.gun.y2)));
        this.gun.y3 = this.gun.y2 - (tan2 * (NEG * (handX - this.gun.x2)));
    }
}   