/// <reference path="definitions/phaser.comments.d.ts"/>

module App {
  export class Game extends Phaser.Game {
    constructor() {
      super({
        width: window.innerWidth,
        height: window.innerHeight,
        transparent: false,
        enableDebug: true
      });

      this.state.add('boot', State.Boot);
      this.state.add('preload', State.Preload);
      this.state.add('main', State.Main);

      this.state.start('boot');
    }
  }
}
