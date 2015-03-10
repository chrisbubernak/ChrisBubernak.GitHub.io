/// <reference path="game.ts" />

class GameObject {
	protected type: string;
    protected collided: boolean = false;
    protected x: number;
    protected y: number;
    protected vX: number = 0;
    protected vY: number = 0;
    protected aX: number = 0;
    protected aY: number = 0;
    protected dead: boolean = false;
    protected owner: string;
    protected width: number;
    protected height: number;
    protected bounces: boolean = false;
    protected color: string = "black";
    protected id: string;
    protected bleeds: boolean = false;

    constructor() {
        Game.AddGameObject(this);
    }

    public Width() {
    	return this.width * Game.BoxWidth();
    }

    public Height() {
    	return this.height * Game.BoxHeight();
    }

    public Type() {
    	return this.type;
    }

    public Owner() {
    	return this.owner;
    }

    public Collides(obj) {
    }

    public Move() {
    }

    public Draw() {
        Game.ctx.fillStyle = this.color;
        Game.ctx.rect(this.x, this.y, this.Width(), this.Height());    
        Game.ctx.stroke();
        if (this.type === "bullet") {
            console.log(this.x + " " + this.Width()); 
        }
    }
    
    public Bounces() {
        return this.bounces;
    }

    public Bleeds() {
        return this.bleeds;
    }

    public IsDead() {
        return this.dead;
    }

    public Y() {
        return this.y;
    }

    public X(){
        return this.x;
    }

    public Id() {
        return this.id;
    }
}