module App.State {
  export class Boot extends Phaser.State {
    preload() {
      this.load.image('preload-bar', 'assets/images/preloader.gif');
    }

    create() {
      this.game.stage.backgroundColor = 0x000000;

      this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;

      this.input.maxPointers = 1;
      this.stage.disableVisibilityChange = true;

      this.game.state.start('preload');
    }
  }
}
