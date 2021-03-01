import express from 'express'
import cors from 'cors'
import { solarRoutes } from './routes/solarRoutes'
import { localidadRoutes } from './routes/localidadRoutes'
class Server {
    private app: express.Application

    constructor(){
        this.app = express()
        this.config()
        this.routes()
    }
    config(){
        this.app.set('port', process.env.PORT || 3000)
        this.app.use(express.json())
        this.app.use(cors())


        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
    }

    private routes(){
        this.app.use('/solares', solarRoutes)
        this.app.use('/localidades', localidadRoutes)
    }

    start(){
        this.app.listen(this.app.get('port'), 
        () => {
            console.log(`Server on port: ${this.app.get('port')}`)
        })
    }
}
const server = new Server()
server.start()
