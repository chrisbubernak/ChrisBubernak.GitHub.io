/// <reference path="game.ts" />
/// <reference path="gameObject.ts" />
/// <reference path="bullet.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(id, x, y) {
        _super.call(this);
        this.jumping = false;
        this.crouching = false;
        this.type = Player.TYPE;
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = Player.WIDTH;
        this.height = Player.HEIGHT;
        this.aY = Game.Gravity();
        this.color = Player.COLOR;
        this.bleeds = true;
    }
    Player.prototype.Id = function () {
        return this.id;
    };
    Player.prototype.Width = function () {
        return Game.BoxWidth() * this.width;
    };
    Player.prototype.Height = function () {
        if (this.crouching) {
            return Game.BoxHeight() * this.height / 2;
        }
        return Game.BoxHeight() * this.height;
    };
    Player.prototype.Collides = function (obj) {
        if (obj.Type() === Bullet.TYPE && obj.Owner() !== this.id) {
            this.dead = true;
        }
        else if (obj.Type() === Platform.TYPE && !this.collided) {
            this.collided = true;
            var goingUp = this.vY < 0;
            if (!goingUp) {
                // player is above the platform
                this.y = obj.Y() - this.Height();
                this.vY = 0;
                this.jumping = false;
            }
            else if (goingUp) {
                // player is below the platform
                this.vY = 0;
                this.y = obj.Y() + obj.Height();
            }
        }
    };
    Player.prototype.Move = function () {
        this.crouching = false;
        this.collided = false;
        this.vY += this.aY;
        this.y += this.vY;
        if (this.y + this.Height() >= Game.GameHeight()) {
            this.y = Game.GameHeight() - this.Height();
            // want normal force to dwcancel gravity!
            this.vY = 0;
            this.jumping = false;
        }
        if (this.vX !== 0) {
            this.aX = this.vX > 0 ? -Game.Friction() : Game.Friction();
        }
        else {
            this.aX = 0;
        }
        this.vX += this.aX;
        if (Math.abs(this.vX) > Player.MAX_SPEED) {
            this.vX = this.vX > 0 ? Player.MAX_SPEED : -Player.MAX_SPEED;
        }
        this.x += this.vX;
        if (this.x > Game.GameWidth() - this.Width()) {
            this.x = Game.GameWidth() - this.Width();
            this.vX = 0;
            this.aX = 0;
        }
        if (this.x < 0) {
            this.vX = 0;
            this.aX = 0;
            this.x = 0;
        }
        // todo: updateGun(player, player.gun);
    };
    // todo: fix these!
    Player.prototype.TargetX = function () {
        return Game.GetMouseX();
    };
    Player.prototype.TargetY = function () {
        return Game.GetMouseY();
    };
    Player.prototype.Shoot = function () {
        var bullet = new Bullet(this);
    };
    Player.prototype.MoveLeft = function () {
        this.vX -= 1;
    };
    Player.prototype.MoveRight = function () {
        this.vX += 1;
    };
    Player.prototype.Crouch = function () {
        this.crouching = true;
    };
    Player.prototype.Jump = function () {
        if (!this.jumping && this.vY === 0) {
            this.jumping = true;
            this.vY = -Player.JUMP_VELOCITY * Game.BoxHeight();
        }
    };
    Player.prototype.DropPlatform = function (loc) {
        Game.AddGameObject(new Platform(loc));
    };
    Player.COLOR = "green";
    Player.WIDTH = .6;
    Player.HEIGHT = 1.5;
    Player.SPEED = 2;
    Player.TYPE = "player";
    Player.MAX_SPEED = 10;
    Player.JUMP_VELOCITY = .6;
    return Player;
})(GameObject);
