/// <reference path="gameObject.ts" />
/// <reference path="player.ts" />
/// <reference path="blood.ts" />

class Game {
	private static GRAVITY: number = 1;
	private static NUM_COLS: number = 20;
	private static NUM_ROWS: number = 20;
	private static FRICTION: number = .5;
	private static NUM_BLOODS: number = 20;

	private static gameWidth: number;
	private static gameHeight: number;
	private static boxWidth: number;
	private static boxHeight: number;
	private static mouseX: number = 0;
	private static mouseY: number = 0;
	private static gameObjects: GameObject [] = [];
	private static mouseDown: boolean = false;

	// todo: refactor this out
	public static ctx;

	public static AddGameObject(obj: GameObject) {
		Game.gameObjects.push(obj);
	}

	public static GetGameObjects() {
		return Game.gameObjects;
	}

	public static RemoveDeadObjects() {
		var o = Game.gameObjects.length;
        while(o--) {
        	var obj = Game.gameObjects[o];
        	if(obj.IsDead()) {
        		if (obj.Bleeds()) {
        			for (var i = 0; i < Game.NUM_BLOODS; i++) {
        				Game.gameObjects.push(new Blood(obj.X(), obj.Y()));
        			}
        		}
        		Game.gameObjects.splice(o, 1);
        	}
        }
	}

	public static MouseUp() {
		Game.mouseDown = false;
	}

	public static MouseDown() {
		Game.mouseDown = true;
	}

	public static IsMouseDown() {
		return Game.mouseDown;
	}

	public static SetMouseX(x) {
		Game.mouseX = x;
	}

	public static GetMouseX() {
		return Game.mouseX;
	}

	public static SetMouseY(y) {
		Game.mouseY = y;
	}

	public static GetMouseY() {
		return Game.mouseY;
	}

	public static BoxWidth() {
		return Game.boxWidth || window.innerWidth / Game.NUM_COLS;
	}

	public static BoxHeight() {
		return Game.boxHeight || window.innerHeight / Game.NUM_ROWS;
	}

	public static GameWidth() {
		return Game.gameWidth || window.innerWidth;
	}

	public static GameHeight() {
		return Game.gameHeight || window.innerHeight;;
	}

	public static Gravity() {
		return Game.GRAVITY;
	}

	public static Friction() {
		return Game.FRICTION;
	}

	public static NumCols() {
		return Game.NUM_COLS;
	}

	public static NumRows() {
		return Game.NUM_ROWS;
	}

    public static GetLoc(obj) {
    	var col = Math.floor(Game.NUM_COLS * ((obj.X() + obj.Width()/2)/Game.GameWidth()));
    	var row = Math.floor(Game.NUM_ROWS * ((obj.Y() + obj.Height()/2)/Game.GameHeight()));
		return row * Game.NUM_COLS + col;
    }

    public static GetEnemy(player) {
    	for (var i = 0; i < Game.gameObjects.length; i++) {
    		var object = Game.gameObjects[i];
    		if (object.Type() === Player.TYPE && object.Id() !== player.Id()) {
    			return object;
    		}
    	}
    }

}