module App.State {
  export class Preload extends Phaser.State {
    private preloadBar:Phaser.Sprite;

    preload() {
      this.preloadBar = this.add.sprite(this.game.width/2, this.game.height/2, 'preload-bar');
      this.preloadBar.anchor.set(0.5);
      this.load.setPreloadSprite(this.preloadBar);
    }

    create() {
      this.game.state.start('main');
    }
  }
}
