import "phaser";
const config: GameConfig = {
  title: "Goliathus",
  width: 800,
  height: 600,
  parent: "game",
  backgroundColor: "#18216D"
};
export class GoliathusGame extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}
window.onload = () => {
  var game = new GoliathusGame(config);
};