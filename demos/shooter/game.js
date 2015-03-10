/// <reference path="gameObject.ts" />
/// <reference path="blood.ts" />
var Game = (function () {
    function Game() {
    }
    Game.AddGameObject = function (obj) {
        Game.gameObjects.push(obj);
    };
    Game.GetGameObjects = function () {
        return Game.gameObjects;
    };
    Game.RemoveDeadObjects = function () {
        var o = Game.gameObjects.length;
        while (o--) {
            var obj = Game.gameObjects[o];
            if (obj.IsDead()) {
                if (obj.Bleeds()) {
                    for (var i = 0; i < Game.NUM_BLOODS; i++) {
                        Game.gameObjects.push(new Blood(obj.X(), obj.Y()));
                    }
                }
                Game.gameObjects.splice(o, 1);
            }
        }
    };
    Game.SetMouseX = function (x) {
        Game.mouseX = x;
    };
    Game.GetMouseX = function () {
        return Game.mouseX;
    };
    Game.SetMouseY = function (y) {
        Game.mouseY = y;
    };
    Game.GetMouseY = function () {
        return Game.mouseY;
    };
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
    Game.GetLoc = function (obj) {
        var col = Math.floor(Game.NUM_COLS * ((obj.X() + obj.Width() / 2) / Game.GameWidth()));
        var row = Math.floor(Game.NUM_ROWS * ((obj.Y() + obj.Height() / 2) / Game.GameHeight()));
        return row * Game.NUM_COLS + col;
    };
    Game.GRAVITY = 1;
    Game.NUM_COLS = 20;
    Game.NUM_ROWS = 20;
    Game.FRICTION = .5;
    Game.NUM_BLOODS = 20;
    Game.mouseX = 0;
    Game.mouseY = 0;
    Game.gameObjects = [];
    return Game;
})();
