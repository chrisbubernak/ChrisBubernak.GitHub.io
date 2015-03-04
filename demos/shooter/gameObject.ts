/// <reference path="game.ts" />
class GameObject {
	protected type: string;
    protected collided: boolean = false;
    protected x: number;
    protected y: number;
    protected vX: number;
    protected vY: number;
    protected dead: boolean = false;
    protected owner: string;
    protected width: number;
    protected height: number;

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
    	alert("Draw NOT IMPLEMENTED FOR " + this.type);
    }
}