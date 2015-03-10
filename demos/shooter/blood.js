/// <reference path="game.ts" />
/// <reference path="gameObject.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Blood = (function (_super) {
    __extends(Blood, _super);
    function Blood(x, y) {
        _super.call(this);
        this.type = Blood.TYPE;
        this.x = x;
        this.y = y;
        this.color = Blood.COLOR;
        this.width = Blood.WIDTH;
        this.height = Blood.HEIGHT;
        this.vX = Math.random() * Game.BoxWidth() / 8 - Game.BoxWidth() / 16;
        this.vY = -Math.random() * Blood.Y_SPEED * Game.BoxHeight();
        this.aY = Game.Gravity();
    }
    Blood.prototype.Draw = function () {
        Game.ctx.fillStyle = this.color;
        Game.ctx.fillRect(this.x + this.Width() / 2, this.y + this.Height() / 2, this.Width(), this.Height());
    };
    Blood.prototype.Move = function () {
        this.vY += this.aY;
        this.x += this.vX;
        this.y += this.vY;
        if (this.x > Game.GameWidth() || this.x < 0 || this.y > Game.GameHeight() || this.y < 0) {
            this.dead = true;
        }
    };
    Blood.COLOR = "red";
    Blood.WIDTH = .1;
    Blood.HEIGHT = .1;
    Blood.Y_SPEED = .6;
    Blood.TYPE = "blood";
    return Blood;
})(GameObject);
//for (var i = 0; i < NUM_BLOODS; i++) {
