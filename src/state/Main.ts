module App.State {
  export class Main extends Phaser.State {

    create() {
      //set world dimensions
      this.game.world.setBounds(0, 0, 1920, 1920);

      var thing:String = 'build something amazing !';
      this.add.text(this.game.world.centerX, this.game.world.centerY, `Let's ${thing}`, { font: '65px Arial', fill: '#FFFFFF' });
    }
  }
}
