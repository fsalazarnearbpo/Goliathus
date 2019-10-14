import "phaser";

export class WelcomeScene extends Phaser.Scene {
  title: Phaser.GameObjects.Text;
  hint: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "WelcomeScene"
    });
  }

  preload(): void {
    this.load.setBaseURL("https://raw.githubusercontent.com/fsalazarnearbpo/" +
      "goliathus/master/");
    this.load.image("corgitoon", "assets/corgitoon.png");
  }

  create(): void {
    var titleText: string = "Pochito";
    var puppy: Phaser.Physics.Arcade.Image;
    puppy = this.physics.add.image(650, 250, "corgitoon");
    puppy.setDisplaySize(300,500);
    this.title = this.add.text(150, 200, titleText,
      { font: '128px Arial Bold', fill: '#FBFBAC' });

    var hintText: string = "Click to start";
    this.hint = this.add.text(300, 350, hintText,
      { font: '24px Arial Bold', fill: '#FBFBAC' });

    this.input.on('pointerdown', function (/*pointer*/) {
      this.scene.start("GameScene");
    }, this);
  }
};