/// <reference path="gameObject.ts" />
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
            if (Game.gameObjects[o].IsDead()) {
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
    Game.GRAVITY = 1;
    Game.NUM_COLS = 20;
    Game.NUM_ROWS = 20;
    Game.FRICTION = .5;
    Game.mouseX = 0;
    Game.mouseY = 0;
    Game.gameObjects = [];
    return Game;
})();
