import {Request, Response, Router } from 'express'
import { Localidades, Localidad } from '../model/localidades'
import { db } from '../database/database'

class LocalidadesRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private post = async (req: Request, res: Response) => {
        console.log(req.body)
        const { localidad,p_m, p_l, p_a,p_t } = req.body

        await db.conectarBD()
        const query: any = ( await Localidades.findOne({},{localidad:1,_id:0}).sort({localidad: -1}).limit(1) )
        const dSchema = {
            localidad: localidad,
            p_m: p_m,
            p_l: p_l,
            p_a: p_a,
            p_t: p_t
        }
        const oSchema = new Localidades(dSchema)
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
        const { localidad } = req.params
        await db.conectarBD()
        await Localidades.findOneAndDelete( { localidad: localidad })
        .then(
            (doc: any) => {
                console.log(doc)
            }) 
        db.desconectarBD()
    }

    private get = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            const query = await Localidades.find({},{_id:0})/*aggregate([{
                $lookup: {
                    from: 'Solares',
                    localfiled: 'localidad',
                    foreignField: 'localidad',
                    as: 'solares_loc'

                }
            }])*/
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })

        db.desconectarBD()
    }

    private getId = async (req: Request, res: Response) => {
        const { localidad } = req.params
        await db.conectarBD()
        await Localidades.findOne(
                { localidad: localidad }
            )
            .then( (docu: any) => {
                    if (docu == null){
                        console.log('El documento que desea modificar no existe')
                        res.json({"Error":"No existe: " + localidad})
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
        const { localidad } = req.params
        const { p_m,p_l,p_a } = req.body
        await db.conectarBD()
        await Localidades.findOneAndUpdate(
                { localidad: localidad}, 
                {
                    p_m: p_m,
                    p_l: p_l,
                    p_a: p_a,
                },
                {
                    new: true,
                    runValidators: true 
                }  
            )
            .then( (docu: any) => {
                    if (docu==null){
                        console.log('La localidad que desea modificar no existe')
                        res.json({"Error":"No existe: " + localidad})
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
        this._router.get('/:localidad', this.getId)
        this._router.delete('/:localidad', this.delete)
        this._router.post('/', this.post)
        this._router.put('/:localidad', this.put)
    }
}

const obj = new LocalidadesRoutes()
obj.misRutas()
export const localidadRoutes = obj.router