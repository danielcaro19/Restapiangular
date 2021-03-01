import {Request, Response, Router } from 'express'
import { Solares, Solar } from '../model/solares'
import { db } from '../database/database'

class SolaresRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private post = async (req: Request, res: Response) => {
        console.log(req.body)
        const { id,direccion : {calle, calle2, numero}, localidad, superficie, luz, agua, f_subida, precio } = req.body

        await db.conectarBD()
        const query: any = ( await Solares.findOne({},{id:1,_id:0}).sort({id: -1}).limit(1) )
        let newId: number
        if (query == null){
            newId = 0
        }else{
            newId = query.id
        }
        const dSchema = {
            id: newId,
            direccion: {
            calle: calle,
            calle2: calle2,
            numero: numero
            },
            localidad: localidad,
            superficie: superficie,
            luz: luz,
            agua: agua,
            f_subida: f_subida,
            precio: precio
        }
        const oSchema = new Solares(dSchema)
        await oSchema.save()
        .then( (doc) => {
            console.log('Salvado Correctamente: '+ doc)
            res.json(doc)
        })
        .catch( (err: any) => {
            console.log('Error: '+ err)
            res.send('Error: '+ err)
        }) 
        await db.desconectarBD()
    } 


    private delete = async (req: Request, res: Response) => {
        const { id } = req.params
        await db.conectarBD()
        await Solares.findOneAndDelete( { id: id })
        .then(
            (doc: any) => {
                console.log(doc)
            }) 
        db.desconectarBD()
    }

    private get = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            const query = await Solares.find({},{_id:0})
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })

        db.desconectarBD()
    }

    private getId = async (req: Request, res: Response) => {
        const { id } = req.params
        await db.conectarBD()
        await Solares.findOne(
                { id: id }
            )
            .then( (docu: any) => {
                    if (docu == null){
                        console.log('El documento que desea modificar no existe')
                        res.json({"Error":"No existe: " + id})
                    } else {
                        console.log('Existe: '+ docu) 
                        res.json(docu)
                    }
                    
                }
            )
            .catch( (err: null) => {
                console.log('Error: '+err)
                res.json({error: 'Error: '+err })
            }
            )
        db.desconectarBD()
    }

    private put = async (req: Request, res: Response) => {
        const { id } = req.params
        const { direccion, calle, calle2, numero, localidad, superficie, luz, agua, f_subida, precio } = req.body
        await db.conectarBD()
        await Solares.findOneAndUpdate(
                { id: id}, 
                {
                    direccion: {
                        calle: calle,
                        calle2: calle2,
                        numero: numero
                    },
                    localidad: localidad,
                    superficie: superficie,
                    luz: luz,
                    agua: agua,
                    f_subida: f_subida,
                    precio: precio
                },
                {
                    new: true,
                    runValidators: true
                }  
            )
            .then( (docu: any) => {
                    if (docu==null){
                        console.log('El triangulo que desea modificar no existe')
                        res.json({"Error":"No existe: " + id})
                    } else {
                        console.log('Modificado Correctamente: '+ docu) 
                        res.json(docu)
                    }
                    
                }
            )
            .catch( (err: any) => {
                console.log('Error: '+err)
                res.json({error: 'Error: '+err })
            }
            )
        db.desconectarBD()
    }
  
    misRutas(){
        this._router.get('/', this.get)
        this._router.get('/:id', this.getId)
        this._router.delete('/:id', this.delete)
        this._router.post('/', this.post)
        this._router.put('/:id', this.put)
    }
}

const obj = new SolaresRoutes()
obj.misRutas()
export const solarRoutes = obj.router