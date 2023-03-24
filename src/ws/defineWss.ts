import {Game} from "../game"
import * as uniqid from "uniqid"

let rooms = new Map()
let connections = []
rooms.set("00002", {connections: [], game: undefined, user1: undefined, user2: undefined})
/*
roomId: {
	connections: [],
	
	game: new Game(user1, user2)
	user1: {},
	user2: {},
}
*/

/*

*/

function defineWss(socket, request){
	try{
		console.log("---------------")
		
	let socketId = uniqid()
	let roomId = request.headers.room_id

	let userId = request.headers.user_id
	let socketWithUser = {socketId: socketId, socket: socket, userId: userId, roomId: roomId}
	connections.push(socketWithUser)
	rooms.get(roomId).connections.push(socketWithUser)
	console.log(rooms.get(roomId).connections)
	let user1, user2
	let currentUser
	if(rooms.get(roomId).connections.length==2){
		user1 = {id: rooms.get(roomId).connections[0].userId, value:"O"}
	    user2 = {id: rooms.get(roomId).connections[1].userId, value:"X"}
	    rooms.get(roomId).user1 = user1
	    rooms.get(roomId).user2 = user2

	    console.log(user1, user2)
	    let game = new Game(user1, user2)
		rooms.get(roomId).game = game
		console.log(game)
	}

	socket.on("message", (data)=>{
		for(let i=0; i<connections.length; i++){
			if(connections[i].roomId == roomId && connections[i].socketId != socketId){
				connections[i].socket.send(data.toString())
				console.log(request.headers.user_id)
				console.log(JSON.parse(data))
				let str = JSON.parse(data)
				let user
				if(rooms.get(roomId).user1.id == request.headers.user_id){
					user = rooms.get(roomId).user1
				}else{
					user = rooms.get(roomId).user2
				}
				console.log(user)
				let game = rooms.get(roomId).game 
				let area = game.fillSquare(user, Number(str.koord))
				socket.send(area)
				console.log(area)
			}
		}
	})
    }catch(error){
    	console.log(error)
    }

}

export {defineWss}