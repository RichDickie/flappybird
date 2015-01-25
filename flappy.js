var stateActions = {preload: preload, create: create, update: update};
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var score = 0
var label_score;
function changeScore() {
    score = score + 1;
    label_score.setText(score.toString());
}
var player;
var count = 0;
var pipes;
var base;
function preload() {
    game.load.image("superman", "assets/flappy_superman.png");
    game.load.image("pipe", "assets/pipe.png");
}
function create() {
    game.stage.setBackgroundColor("00B3FF");
    //game.add.text(0, 0, "Check me moving yeahhh buddy",
    //  {
    //    font: "15px Times New Roman",
    //  fill: "#FFFFFF"
    //});
    player = game.add.sprite(10, 100, "superman");
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.body.velocity.x = 0;
    player.body.velocity.y = 150;
    player.body.gravity.y = 400
    //player.body.collideWorldBounds = true;

    //game.input.onDown.add(clicker);
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(jump);
    //game.input
    //    .keyboard.addKey(Phaser.Keyboard.UP)
    //    .onDown.add(up);
    //game.input
    //    .keyboard.addKey(Phaser.Keyboard.LEFT)
    //    .onDown.add(left);
    //game.input
    //    .keyboard.addKey(Phaser.Keyboard.RIGHT)
    //    .onDown.add(right);
    //game.input
    //    .keyboard.addKey(Phaser.Keyboard.DOWN)
    //    .onDown.add(down);
    label_score = game.add.text(20, 20, "0");
    pipes = game.add.group();
    base = game.add.group();
    pipe_interval = 1.75
    game.time.events.loop(pipe_interval * Phaser.Timer.SECOND, generate);
    generate();
    generatebase();
}

function add_pipe_block(x, y) {
    var pipe = pipes.create(x, y, "pipe");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -150
}

function generate(){
        var gap = game.rnd.integerInRange(2, 5);
        for (var count = 0; count < 100; count++) {
            if (count != gap && count != gap + 1) {
                add_pipe_block(800, count*50);
            }
        }
    changeScore();
}
function generatebase(){
    for (var count1 = 0; count1 < 100; count1++){
        add_pipe_block (50 * count1, 400);
    }
}
function jump(){
    player.body.velocity.y = -150;
}
function update() {
    game.physics.arcade.overlap(player, pipes, game_over);
    if (player.y  < game.world.bounds.top) {
        game_over();
    }
}
function game_over() {
    player.destroy();
    game.add.text(300, 150, "LOSER",
      {
        font: "60px Arial",
          fill: "#FFFFFF"
    });
}
//function right() {
//    player.x += 10
//}
//function left(event) {
//    player.x -= 10
//}
//function up() {
//    player.y -= 10
//}
//function down() {
//    player.y += 10
//}
//function clicker(event) {
//    //game.sound.play("score");
//    changeScore();
//}

