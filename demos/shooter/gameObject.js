/// <reference path="game.ts" />
var GameObject = (function () {
    function GameObject() {
        this.collided = false;
        this.vX = 0;
        this.vY = 0;
        this.aX = 0;
        this.aY = 0;
        this.dead = false;
        this.bounces = false;
        this.isDead = false;
        this.color = "black";
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
        Game.ctx.fillStyle = this.color;
        Game.ctx.rect(this.x, this.y, this.Width(), this.Height());
        Game.ctx.stroke();
    };
    GameObject.prototype.Bounces = function () {
        return this.bounces;
    };
    GameObject.prototype.IsDead = function () {
        return this.isDead;
    };
    GameObject.prototype.Y = function () {
        return this.y;
    };
    GameObject.prototype.X = function () {
        return this.x;
    };
    return GameObject;
})();
