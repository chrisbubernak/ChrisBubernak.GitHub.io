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
        this.color = "black";
        this.bleeds = false;
        Game.AddGameObject(this);
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
    };
    GameObject.prototype.Move = function () {
    };
    GameObject.prototype.Draw = function () {
        Game.ctx.fillStyle = this.color;
        Game.ctx.rect(this.x, this.y, this.Width(), this.Height());
        Game.ctx.stroke();
        if (this.type === "bullet") {
            console.log(this.x + " " + this.Width());
        }
    };
    GameObject.prototype.Bounces = function () {
        return this.bounces;
    };
    GameObject.prototype.Bleeds = function () {
        return this.bleeds;
    };
    GameObject.prototype.IsDead = function () {
        return this.dead;
    };
    GameObject.prototype.Y = function () {
        return this.y;
    };
    GameObject.prototype.X = function () {
        return this.x;
    };
    GameObject.prototype.Id = function () {
        return this.id;
    };
    return GameObject;
})();
