/// <reference path="game.ts" />
var GameObject = (function () {
    function GameObject() {
        this.collided = false;
        this.dead = false;
    }
    GameObject.prototype.Width = function () {
        return this.width * Game.BoxWidth();
    };
    GameObject.prototype.Height = function () {
        return this.height * Game.BoxHeight();
    };
    GameObject.prototype.Type = function () {
        return this.type;
    };
    GameObject.prototype.Owner = function () {
        return this.owner;
    };
    GameObject.prototype.Collides = function (obj) {
        alert("COLLIDES NOT IMPLEMENTED FOR " + this.type);
    };
    GameObject.prototype.Move = function () {
        alert("COLLIDES NOT IMPLEMENTED FOR " + this.type);
    };
    GameObject.prototype.Draw = function () {
        alert("Draw NOT IMPLEMENTED FOR " + this.type);
    };
    return GameObject;
})();
