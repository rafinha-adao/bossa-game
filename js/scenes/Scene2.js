class Scene2 extends Phaser.Scene {
  playerVelocity = 46;

  constructor() {
    super("game");
  }

  preload() {
    this.load.audio("bossa", "assets/8bit-bossa.mp3");
    this.load.tilemapTiledJSON("map", "assets/map.json");
    this.load.image("tiles", "assets/tiles.png");
    this.load.spritesheet("player", "assets/spritesheet.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    const MAP = this.make.tilemap({ key: "map" });
    MAP.addTilesetImage("orthographic-outdoor-tiles", "tiles");

    var tileset = MAP.getTileset("orthographic-outdoor-tiles");

    const ENTER_BUILDING = MAP.createLayer("ENTER_BUILDING", tileset);
    const GROUND = MAP.createLayer("ground", tileset);
    const FLOWERS = MAP.createLayer("flowers", tileset);
    const ROAD = MAP.createLayer("road", tileset);
    const TREES = MAP.createLayer("trees", tileset);
    const BUILDINGS = MAP.createLayer("buildings", tileset);
    const DOORS = MAP.createLayer("doors", tileset);
    const OBJECTS = MAP.createLayer("objects", tileset);

    this.spawn = MAP.getObjectLayer("player", tileset).objects.find(
      (i) => i.name == "spawn"
    );

    this.cameras.main.setBounds(0, 0, 624, 624);
    this.cameras.main.setZoom(4);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.player = this.physics.add.sprite(
      this.spawn.x,
      this.spawn.y,
      "player",
      3
    );

    const ROOF = MAP.createLayer("roof", tileset);

    this.player.setScale(1.2);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.player);

    TREES.setCollisionByExclusion(-1);
    BUILDINGS.setCollisionByExclusion(-1);
    OBJECTS.setCollisionByExclusion(-1);

    this.physics.add.collider(TREES, this.player);
    this.physics.add.collider(BUILDINGS, this.player);
    this.physics.add.collider(OBJECTS, this.player);

    // this.physics.add.overlap(this.player, ENTER_BUILDING, this.enterBuilding);
    // this.physics.add.overlap(
    //   ENTER_BUILDING,
    //   this.player,
    //   this.enterBuilding
    // );

    console.log();

    this.sound
      .add("bossa", {
        loop: true,
      })
      .play();

    this.anims.create({
      key: "left",
      frames: [
        { key: "player", frame: 6 },
        { key: "player", frame: 4 },
        { key: "player", frame: 7 },
      ],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: [
        { key: "player", frame: 5 },
        { key: "player", frame: 2 },
        { key: "player", frame: 8 },
      ],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "up",
      frames: [
        { key: "player", frame: 10 },
        { key: "player", frame: 9 },
        { key: "player", frame: 11 },
      ],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "down",
      frames: [
        { key: "player", frame: 3 },
        { key: "player", frame: 0 },
        { key: "player", frame: 1 },
      ],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "stand",
      frames: [{ key: "player", frame: 3 }],
      frameRate: 20,
    });
  }

  // enterBuilding() {
  //   console.log("0");
  // }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityY(0);
      this.player.setVelocityX(-this.playerVelocity);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityY(0);
      this.player.setVelocityX(this.playerVelocity);
      this.player.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(-this.playerVelocity);
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(this.playerVelocity);
      this.player.anims.play("down", true);
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
    }

    if (this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0) {
      this.player.anims.play("stand", true);
    }

    /* TESTS */

    if (Math.round(this.player.x) == 480 && Math.round(this.player.y) == 426) {
      this.scene.start('game-indoor');
    }

    if (Math.round(this.player.x) == 312 && Math.round(this.player.y) == 394) {
      alert("Eba! você encontrou uma placa!");
    }

    console.log("x: " + this.player.x);
    console.log("y: " + this.player.y);
  }
}
