module App.State {
  export class Boot extends Phaser.State {
    preload() {
      this.load.image('preload-bar', 'assets/images/preloader.gif');
    }

    create() {
      this.game.stage.backgroundColor = 0x000000;

      this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
      this.scale.minWidth = 240;
      this.scale.minHeight = 170;
      this.scale.maxWidth = 2880;
      this.scale.maxHeight = 1920;

      //have the game centered horizontally
      this.scale.pageAlignHorizontally = true;

      this.input.maxPointers = 1;
      this.stage.disableVisibilityChange = true;

      this.game.state.start('preload');
    }
  }
}
