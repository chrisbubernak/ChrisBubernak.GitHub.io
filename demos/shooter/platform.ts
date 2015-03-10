/// <reference path="game.ts" />
/// <reference path="gameObject.ts" />

class Platform extends GameObject {
     private static COLOR: string = "black";
     private static WIDTH: number = 1;
     private static HEIGHT: number = .25;
     public static TYPE: string = "platform";
     constructor(loc) {
          super();
          var row = loc % Game.NumCols();
          var col = Math.floor(loc/Game.NumCols());
          this.x = row * Game.GameWidth() / Game.NumCols();
          this.y = (col + 1) * Game.GameHeight() / Game.NumRows();     
          this.width = Platform.WIDTH;
          this.height = Platform.HEIGHT;
          this.type = Platform.TYPE;
          this.color = Platform.COLOR;
     }    
}
    