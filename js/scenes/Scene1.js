class Scene1 extends Phaser.Scene {

    constructor() {
        super('menu');
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    preload() { }

    create() {
        this.add.text(config.width / 2 - 145, config.height / 2, 'Pressione SPACE para começar');
    }

    update() {
        if (this.cursors.space.isDown) {
            this.add.text(config.width / 2 - 145, config.height / 2, 'Iniciando o jogo...');
            this.scene.start('game');
        }
    }
}