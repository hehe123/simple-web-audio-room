var WebSocket = require('faye-websocket'), 
	http = require('http'),
	util = require('util'),
	port = 8088,
	nstatic = require('node-static'),
	file = new (nstatic.Server)('./', {
		cache: 7200
	}),
	server = http.createServer(function(request, response){
		request.addListener('data', function() {});
		request.addListener('end', function(){
			file.serve(request, response, function(err, res){
				if (err) {
					util.error("> Error serving " + request.url + " - " + err.message);
					response.writeHead(err.status, err.headers);
					response.end();
				} else {}
			});
		});
	}),
	userList = {},
	roomList = {},
	tostring = JSON.stringify,
	tojson = JSON.parse;
	
	
function rooms(ws, name) {
	var room = roomList[name];
	if (!room) {
		room = roomList[name] = {};
	}
	room[ws.sid] = ws;
	return {
		getlength: function() {
			var i, ni = 0;
			for (i in room) {
				ni++;
			}
			return ni;
		},
		send: function(msg) {
			var i;
			for (i in room) {
				room[i].send(msg);
			}
		},
		sendto: function(sid, msg) {
			room[sid] && room[sid].send(msg);
		},
		sendexceptme: function(msg) {
			var i, sid = +ws.sid;
			for (i in room) {
				if (+i === sid) {
					continue;
				}
				room[i].send(msg);
			}
		},
		remove: function(sid) {
			delete room[sid];
		}
	};
}
server.on('upgrade', function(request, socket, body) {
	if (WebSocket.isWebSocket(request)) {
		var ws = new WebSocket(request, socket, body),
			room, thisroom, sid = + new Date() + Math.floor((Math.random() * 10) * 1000);
		ws.sid = sid;
		ws.status_hasVideo = false;
		room = rooms(ws, 'audioTest');
		thisroom = roomList['audioTest'];
		userList[sid] = ws;
		console.log('new one in');
		ws.on('message', function(e) {
			var data = e.data;
			room.sendexceptme(data);
		});
		ws.on('close', function(e) {
			room.sendexceptme(tostring({actname: 'leave', actval: sid}));
			room.remove(sid);
			delete userList[sid];
			console.log('close', e.code, e.reason);
			ws = null;
		});
	}
});
server.listen(port); 
