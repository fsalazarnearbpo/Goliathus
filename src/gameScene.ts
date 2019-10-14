import "phaser";

export class GameScene extends Phaser.Scene {
  delta: number;
  lastboneTime: number;
  bonesCaught: number;
  bonesFallen: number;
  sand: Phaser.Physics.Arcade.StaticGroup;
  info: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(/*params: any*/): void {
    this.delta = 1000;
    this.lastboneTime = 0;
    this.bonesCaught = 0;
    this.bonesFallen = 0;
  }

  preload(): void {
    this.load.setBaseURL("https://raw.githubusercontent.com/fsalazarnearbpo/" +
      "goliathus/master/");
    this.load.image("bone", "assets/bone.png");
    this.load.image("sand", "assets/sand.jpg");
    this.load.image("puppy", "assets/puppy.png");
    this.load.image("corgitoon", "assets/corgitoon.png");
  }

  create(): void {
    this.sand = this.physics.add.staticGroup({
      key: 'sand',
      frameQuantity: 20
    });
    Phaser.Actions.PlaceOnLine(this.sand.getChildren(),
      new Phaser.Geom.Line(20, 580, 820, 580));
    this.sand.refresh();

    this.info = this.add.text(10, 10, '',
      { font: '24px Arial Bold', fill: '#FBFBAC' });
  }

  update(time: number): void {
    var diff: number = time - this.lastboneTime;
    if (diff > this.delta) {
      this.lastboneTime = time;
      if (this.delta > 500) {
        this.delta -= 20;
      }
      this.emitbone();
    }
    this.info.text =
      this.bonesCaught + " caught - " +
      this.bonesFallen + " fallen (max 3)";
  }

  private onClick(bone: Phaser.Physics.Arcade.Image): () => void {
    return function () {
      var puppy: Phaser.Physics.Arcade.Image;
      bone.setTint(0x00ff00);
      bone.setVelocity(0, 0);
      this.bonesCaught += 1;
      puppy = this.physics.add.image(this.input.mousePointer.x+30, this.input.mousePointer.y+20, "puppy");
      puppy.setDisplaySize(250, 150);
            
      this.time.delayedCall(100, function (bone) {
        bone.destroy();
      }, [bone], this);

      this.time.delayedCall(500, function (puppy) {
        puppy.destroy();
      }, [puppy], this);
    }
  }

  private onFall(bone: Phaser.Physics.Arcade.Image): () => void {
    return function () {
      bone.setTint(0xff0000);
      this.bonesFallen += 1;
      this.time.delayedCall(100, function (bone) {
        bone.destroy();
        if (this.bonesFallen > 2) {
          this.scene.start("ScoreScene", { bonesCaught: this.bonesCaught });
        }
      }, [bone], this);
    }
  }

  private emitbone(): void {
    var bone: Phaser.Physics.Arcade.Image;
    var x = Phaser.Math.Between(25, 775);
    var y = 26;
    bone = this.physics.add.image(x, y, "bone");

    bone.setDisplaySize(50, 50);
    bone.setVelocity(0, 200);
    bone.setInteractive();

    bone.on('pointerdown', this.onClick(bone), this);
    this.physics.add.collider(bone, this.sand, this.onFall(bone), null, this);
  }
};