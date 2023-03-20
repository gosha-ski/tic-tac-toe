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
		let str=""
		for(let i=0; i<9; i++){
			if((i+1)%3==0){
			    str = str +" "+ this.area_Array[i].value
			    str = str +"\n"
			}else{
				str = str +" "+ this.area_Array[i].value
			}
		}
		console.log(str)
		console.log("----------------------------")
	}
}

class Game{
	winner
	isFinished 
	gameArea
	first_gamer //{id: id, value: "X" or "O"}
	second_gamer 
	current_user
	constructor(first_gamer, second_gamer){
		this.winner = undefined
		this.isFinished = false
		this.first_gamer = first_gamer
		this.second_gamer = second_gamer
		this.current_user = first_gamer
		this.gameArea = new Area()
	}

	fillSquare(gamer, square_id){
		try{
			if(!this.isFinished){
				if(this.current_user.id == gamer.id){
					let square = this.gameArea.area_Array[square_id]
					if(square.fill(gamer.value, gamer.id)){
						this.checkState()
						this.makeTurn(gamer.id)
					}
				}else{
					console.log("now you cannot make turn")
					return 0
				}

			}else{
				console.log(`game is finished. winner is ${this.winner}`)
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
		let area = this.gameArea.area_Array

		for(let i=0; i<3; i++){
			if(area[i].value==area[i+3].value && area[i].value==area[i+6].value && area[i].isEmpty==false){
				this.isFinished = true
				this.winner = this.current_user.id
				return 0
			}
		}

		for(let i=0; i<=6; i=i+3){
			if(area[i].value==area[i+1].value && area[i].value==area[i+2].value && area[i].isEmpty==false){
				this.isFinished = true
				this.winner = this.current_user.id
				return 0
			}
		}
		if(area[0].value==area[4].value && area[0].value==area[8].value && area[0].isEmpty==false){
			this.isFinished = true
			this.winner = this.current_user.id
			return 0
		}
		else if(area[2].value==area[4].value && area[2].value==area[6].value && area[2].isEmpty==false){
			this.isFinished = true
			this.winner = this.current_user.id
			return 0
		}
	}

}


let user1 = {id: 1, value: "O"}
let user2 = {id: 2, value: "X"}

let game = new Game(user1, user2)
//console.log(game)
game.fillSquare(user1,0)
// console.log(game)
game.fillSquare(user2,7)

game.fillSquare(user1,3)

game.fillSquare(user2,5)

game.fillSquare(user1,2)

game.fillSquare(user2, 6)

game.fillSquare(user1, 4)

game.fillSquare(user2, 8)

game.fillSquare(user1, 1)

game.fillSquare(user2, 8)


// game.fillSquare(user2,8)
// console.log(game.isFinished)
// game.fillSquare(user1,7)
// console.log(game.isFinished)	
// game.fillSquare(user2,6)	


//console.log(game)
