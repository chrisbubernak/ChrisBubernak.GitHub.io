/// <reference path="game.ts" />
var Human = (function () {
    function Human() {
    }
    Human.prototype.GetInput = function (player) {
        var ret = [];
        if (KeyManager.isDown(KeyManager.UP))
            ret.push('U');
        if (KeyManager.isDown(KeyManager.LEFT))
            ret.push('L');
        if (KeyManager.isDown(KeyManager.RIGHT))
            ret.push('R');
        if (KeyManager.isDown(KeyManager.DOWN))
            ret.push('D');
        if (Game.IsMouseDown())
            ret.push('S');
        return ret;
    };
    Human.prototype.GetMouseX = function (player) {
        return Game.GetMouseX();
    };
    Human.prototype.GetMouseY = function (player) {
        return Game.GetMouseY();
    };
    return Human;
})();
