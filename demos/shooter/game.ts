/// <reference path="gameObject.ts" />

class Game {
	private static GRAVITY: number = 1;
	private static NUM_COLS: number = 20;
	private static NUM_ROWS: number = 20;
	private static FRICTION: number = .5;

	private static gameWidth: number;
	private static gameHeight: number;
	private static boxWidth: number;
	private static boxHeight: number;
	private static mouseX: number = 0;
	private static mouseY: number = 0;
	private static gameObjects: GameObject [] = [];

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
        	if(Game.gameObjects[o].IsDead()) {
        		Game.gameObjects.splice(o, 1);
        	}
        }
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

}