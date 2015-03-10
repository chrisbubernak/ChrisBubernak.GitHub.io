/// <reference path="game.ts" />
/// <reference path="gameObject.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Platform = (function (_super) {
    __extends(Platform, _super);
    function Platform(loc) {
        _super.call(this);
        var row = loc % Game.NumCols();
        var col = Math.floor(loc / Game.NumCols());
        this.x = row * Game.GameWidth() / Game.NumCols();
        this.y = (col + 1) * Game.GameHeight() / Game.NumRows();
        this.width = Platform.WIDTH;
        this.height = Platform.HEIGHT;
        this.type = Platform.TYPE;
        this.color = Platform.COLOR;
    }
    Platform.COLOR = "black";
    Platform.WIDTH = 1;
    Platform.HEIGHT = .25;
    Platform.TYPE = "platform";
    return Platform;
})(GameObject);
