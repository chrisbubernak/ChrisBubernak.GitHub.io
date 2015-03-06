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
    protected isDead: boolean = false;
    protected color: string = "black";

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
    	alert("COLLIDES NOT IMPLEMENTED FOR " + this.type);
    }

    public Move() {
    	alert("COLLIDES NOT IMPLEMENTED FOR " + this.type);
    }

    public Draw() {
        Game.ctx.fillStyle = this.color;
        Game.ctx.rect(this.x, this.y, this.Width(), this.Height());    
        Game.ctx.stroke();
    }
    
    public Bounces() {
        return this.bounces;
    }

    public IsDead() {
        return this.isDead;
    }

    public Y() {
        return this.y;
    }

    public X(){
        return this.x;
    }
}