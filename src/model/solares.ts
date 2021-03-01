import {Schema, model } from 'mongoose'
import { p_t,p_m } from './localidades';

export class Solar {
    private _id: number;
    private _direccion: Object;
    private _localidad: string;
    private _superficie: number;
    private _luz: boolean;
    private _agua: boolean;
    private _f_subida: Date;
    private "_precio": number;

    constructor(_id:number,_direccion:Object,_localidad:string,_superficie:number,_luz:boolean,_agua:boolean,_f_subida:Date,_precio:number){
        this._id = _id,
        this._direccion = _direccion,
        this._localidad = _localidad,
        this._superficie = _superficie,
        this._luz = _luz,
        this._agua = _agua,
        this._f_subida = _f_subida
        this._precio = _precio
    }

    get id(){
        return this._id
    }

    get direccion(){
        return this._direccion
    }

    get localidad(){
        return this._localidad
    }

    get superficie(){
        return this._superficie
    }

    get luz(){
        return this._luz
    }

    get agua(){
        return this._agua
    }

    get f_subida(){
        return this._f_subida
    }

    setprecio(p_t: number,p_m: number){
        let _precio:number = (this._superficie * p_m ) + p_t
        console.log(_precio)
        return _precio
    }

    get precio(){
        return this._precio = this.setprecio(p_t,p_m)
    }
}

const solarSchema = new Schema({
    id: {
        type: Number,
        unique: true  
    },
    direccion: {
        type: Object,
        calle: String,
        calle2: String,
        numero: Number,
    },
    localidad: String,
    superficie: Number,
    luz: Boolean,
    agua: Boolean,
    f_subida: Date,
    precio: Number
})


export const Solares = model('solares', solarSchema)