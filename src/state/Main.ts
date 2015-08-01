module App.State {
  export class Main extends Phaser.State {

    create() {

      var thing:String = 'build something amazing !';
      var textStyle = { font: '35px Arial', fill: '#FFFFFF'};
      var text = this.add.text(this.game.width/2, 50, `Let's ${thing}`, textStyle);
      text.anchor.set(0.5);
    }
  }
}
