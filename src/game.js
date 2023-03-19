class Square{
	value = "*"
	user_id
	isEmpty

	constructor(){
		this.isEmpty = true
	}

	fill(value, user_id){
		if(this.isEmpty){
			if(value == "O" || value == "X"){
				this.value = value
				this.user_id = user_id
				this.isEmpty=false
				return true
			}else{
				return false
			}
		}else{
			console.log("square already filled")
			return false
		}
	}
}

class Area{
	area_Array=[]
	constructor(){
		for(let i =0; i<9; i++){
			this.area_Array.push(new Square())
		}
	}

	show(){
		let str=" "
		for(let i=0; i<9; i++){
			if((i+1)%3==0){
				str = " "+str +" "+ this.area_Array[i].value+ " "
				console.log(str)
				console.log("\n")
				str=" "
			}else{
				str = str +" "+ this.area_Array[i].value
			}
		}
		console.log("----------------------------")
	}
}

class Game{
	state = "in process"
	gameArea
	first_gamer //{id: id, value: "X" or "O"}
	second_gamer 
	current_user
	constructor(first_gamer, second_gamer){
		this.first_gamer = first_gamer
		this.second_gamer = second_gamer
		this.current_user = first_gamer
		this.gameArea = new Area()
	}

	fillSquare(gamer, square_id){
		try{
			if(this.current_user.id == gamer.id){
				let square = this.gameArea.area_Array[square_id]
				if(square.fill(gamer.value, gamer.id)){
					//this.checkState()
				    this.makeTurn(gamer.id)
				}
				// if(square.isEmpty){
				// 	square.user_id = gamer.id
				// 	square.value = gamer.value
				// 	square.isEmpty = false
				// 	this.checkState()
				// 	this.makeTurn(gamer.id)
				// }else{
				// 	console.log("square already filled")
				// 	return 0
				// }

			}else{
				console.log("now you cannot make turn")
				return 0
			}

		}catch(error){
			console.log(error)
		}
	}

	makeTurn(userMadeTurnId){
		console.log("current_turn user ",userMadeTurnId)
		if(userMadeTurnId == this.first_gamer.id){
			this.current_user = this.second_gamer
			this.gameArea.show()
		}else{
			this.current_user = this.first_gamer
			this.gameArea.show()
		}
	}

	checkState(){
		for(let i=0; i<3; i++){
			if(this.gameArea[i]==this.gameArea[i+3] && this.gameArea[i]==this.gameArea[i+6]){
				this.state="finished"
				console.log("game finished")
				return 0
			}
		}
		for(let i=0; i<=6; i=i+3){
			if(this.gameArea[i]==this.gameArea[i+1] && this.gameArea[i]==this.gameArea[i+2]){
				this.state="finished"
				console.log("game finished")
				return 0
			}
		}
		if(this.gameArea[0]==this.gameArea[4] && this.gameArea[0]==this.gameArea[8]){
			this.state="finished"
			console.log("game finished")
			return 0
		}
		else if(this.gameArea[2]==this.gameArea[4] && this.gameArea[2]==this.gameArea[6]){
			this.state="finished"
			console.log("game finished")
			return 0
		}else{
			this.state = "in process"
		}
	}

}


let user1 = {id: 1, value: "O"}
let user2 = {id: 2, value: "X"}

let game = new Game(user1, user2)
console.log(game)
game.fillSquare(user1,0)
// console.log(game)
game.fillSquare(user2,2)

game.fillSquare(user1,2) //already filled error

game.fillSquare(user1,4)
game.fillSquare(user2,5)
game.fillSquare(user1,3)
game.fillSquare(user2,8)

//console.log(game)
