// voxel game
var createGame = require('voxel-engine');

function initialize_game(context) {
	var game = window.game = createGame({
		generate: function(x, y, z) {
			return y === 1 ? 1 : 0;
		},
		texturePath: 'textures/'
	});
	game.appendTo(document.body);

	var createPlayer = require('voxel-player')(game);
	var me = createPlayer();
	me.possess();
	me.yaw.position.set(0, 10, 0);
	context.game = game;
	context.me = me;
}

function create_new_player(context, player) {
	var username = player.username;
	var skin_path = player.skin_path;
	var game = context.game;
	var player_skin = require('minecraft-skin')(game.THREE, skin_path);
	var player_obj = player_skin.createPlayerObject();
	player_obj.position.set(0, 10, 0);
	game.scene.add(player_obj);
	game.on('tick', () => {
		var walk = require('voxel-walk');
		walk.render(player_skin);
	});
	return player_obj;
}

// function update_online_player(context) {
	// var socket = context.socket;
	// game.on('tick', () => {
	// 	socket.emit('refresh', {});
	// });
// }

// socket
var io = require('socket.io-client');

function initialize_socket(context, host, port) {
	var username = context.username;
	var game = context.game;
	host = host ? host : 'localhost';
	port = port ? port : 3000;
	var address = host + ':' + port.toString();
	console.log('address:', address);
	var socket = io.connect(address);

	socket.emit('login', { username: username });
	socket.on('chat', (data) => {
		var username = data.username;
		var message = data.message;
		if (username != context.username) {
			console.log(`${username} said ${message}`);
		}
	});
	socket.on('initial', (data) => {
		context.other_online_players = data.online_players;
		for (var index in context.other_online_players) {
			var player = context.other_online_players[index];
			context.other_online_players[index].skin_obj = create_new_player(context, player);
		}
	});
	socket.on('playerLeft', (data) => {
		var player = data.player;
		for (var index in context.other_online_players) {
			var p = context.other_online_players[index];
			if (p.username === player.username) {
				game.scene.remove(p.skin_obj);
				break;
			}
		}
	});
	socket.on('playerJoined', (data) => {
		var player = data.player;
		if (player.username != context.username)
			create_new_player(context, player);
	});
	context.socket = socket;
}


// main

function main() {
	var context = {};
	context.username = 'jiji';
	context.other_online_players = [];
	initialize_game(context);
	initialize_socket(context, 'localhost', 3000);
	// create_new_player(context, {username: 'shishi', skin_path: 'shishi.png'});
}

main();
