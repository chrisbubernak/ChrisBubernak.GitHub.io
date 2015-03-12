/// <reference path="game.ts" />
var AI = (function () {
    function AI() {
    }
    AI.prototype.GetInput = function (player) {
        var ret = [];
        var r = Math.random();
        if (r < .5)
            ret.push('U');
        if (r > .5 && r < .15)
            ret.push('L');
        if (r > .15 && r < .25)
            ret.push('R');
        if (r > .25 && r < .3)
            ret.push('D');
        if (r > .3 && r < .33)
            ret.push('S');
        return ret;
    };
    AI.prototype.GetMouseX = function (player) {
        var enemy = Game.GetEnemy(player);
        if (enemy) {
            return enemy.X();
        }
        return 0;
    };
    AI.prototype.GetMouseY = function (player) {
        var enemy = Game.GetEnemy(player);
        if (enemy) {
            return enemy.Y();
        }
        return 0;
    };
    return AI;
})();
