class Game {
	private static GRAVITY: number = 1;
	private static NUM_COLS: number = 20;
	private static NUM_ROWS: number = 20;
	private static FRICTION: number = .5;

	private static gameWidth: number;
	private static gameHeight: number;
	private static boxWidth: number;
	private static boxHeight: number;

	// todo: refactor this out
	public static ctx;

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