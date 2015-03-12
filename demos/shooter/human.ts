/// <reference path="game.ts" />

declare var KeyManager;

class Human {
	public GetInput(player) {
		var ret = [];
        if (KeyManager.isDown(KeyManager.UP)) ret.push('U');
		if (KeyManager.isDown(KeyManager.LEFT)) ret.push('L');
		if (KeyManager.isDown(KeyManager.RIGHT)) ret.push('R');
		if (KeyManager.isDown(KeyManager.DOWN)) ret.push('D');
		if (Game.IsMouseDown()) ret.push('S');
		return ret;
	}

	public GetMouseX(player) {
		return Game.GetMouseX();
	}

	public GetMouseY(player) {
		return Game.GetMouseY();
	}
}