var Game = (function () {
    function Game() {
    }
    Game.BoxWidth = function () {
        return Game.boxWidth || window.innerWidth / Game.NUM_COLS;
    };
    Game.BoxHeight = function () {
        return Game.boxHeight || window.innerHeight / Game.NUM_ROWS;
    };
    Game.GameWidth = function () {
        return Game.gameWidth || window.innerWidth;
    };
    Game.GameHeight = function () {
        return Game.gameHeight || window.innerHeight;
        ;
    };
    Game.Gravity = function () {
        return Game.GRAVITY;
    };
    Game.Friction = function () {
        return Game.FRICTION;
    };
    Game.NumCols = function () {
        return Game.NUM_COLS;
    };
    Game.NumRows = function () {
        return Game.NUM_ROWS;
    };
    Game.GRAVITY = 1;
    Game.NUM_COLS = 20;
    Game.NUM_ROWS = 20;
    Game.FRICTION = .5;
    return Game;
})();
