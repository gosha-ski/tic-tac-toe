import {App} from "./app"
import {UsersController} from "./users/users_controller"

let app = new App([
	new UsersController()
	], 6000)

app.listen()

// let map = new Map()
// map.set("1", {"name":"gosha"})
// map.get("1").name="sasha"
// console.log(map.get("1"))