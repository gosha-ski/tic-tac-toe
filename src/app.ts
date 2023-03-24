import * as express from "express"
import * as http from "http"
import * as bodyParser from "body-parser"
import * as ws from "ws"
import {defineWss} from "./ws/defineWss"

class App{
	port
	app
	httpServer
	socketServer
	constructor(controllers, port){
		this.app = express()
		this.httpServer = http.createServer(this.app)
		this.socketServer = new ws.WebSocketServer({server: this.httpServer})
		
		this.initMiddlewares()
		this.initControllers(controllers)
		this.port = port
		this.initSocketServer()
	}

	initSocketServer(){
		this.socketServer.on("connection", defineWss)
	}

	initMiddlewares(){
		this.app.use(bodyParser.json())
	}

	initControllers(controllers){
		controllers.forEach((controller)=>{
			this.app.use("/", controller.router)
		})
	}

	listen(){
		this.httpServer.listen(this.port, ()=>{
			console.log(`server works on port ${this.port}`)
		})
	}
}

export {App}