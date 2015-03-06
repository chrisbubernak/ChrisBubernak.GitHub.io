/// <reference path="game.ts" />
/// <reference path="gameObject.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(shooter) {
        _super.call(this);
        this.type = Bullet.BULLET_TYPE;
        this.owner = shooter.Id();
        this.x = shooter.x + shooter.Width() / 2;
        this.y = shooter.y + shooter.Height() / 2;
        this.width = Bullet.BULLET_WIDTH;
        this.height = Bullet.BULLET_HEIGHT;
        var dX = this.x - shooter.x;
        var dY = this.y - shooter.y;
        var mag = Math.sqrt(dX * dX + dY * dY);
        this.vY = (-dY / mag) * Bullet.BULLET_SPEED;
        this.vX = (-dX / mag) * Bullet.BULLET_SPEED;
        this.bounces = true;
    }
    Bullet.prototype.Collides = function (obj) {
        if (obj.Type() === "platform" && !this.collided) {
            this.collided = true;
            this.owner = "";
            this.vY *= -1;
        }
        else if (obj.Type() === this.owner || obj.Owner() === this.owner || obj.Type() === "platform") {
        }
        else {
            this.dead = true;
        }
    };
    Bullet.prototype.Move = function () {
        this.collided = false;
        this.x += this.vX;
        this.y += this.vY;
        if (this.x > Game.GameWidth() || this.x < 0 || this.y > Game.GameHeight() || this.y < 0) {
            this.dead = true;
        }
    };
    Bullet.prototype.Draw = function () {
        Game.ctx.fillStyle = Bullet.BULLET_COLOR;
        Game.ctx.fillRect(this.x, this.y, this.Width(), this.Height());
    };
    Bullet.BULLET_COLOR = "blue";
    Bullet.BULLET_WIDTH = .1;
    Bullet.BULLET_HEIGHT = .1;
    Bullet.BULLET_SPEED = 6;
    Bullet.BULLET_TYPE = "bullet";
    return Bullet;
})(GameObject);
