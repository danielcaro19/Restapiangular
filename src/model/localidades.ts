import {Schema, model } from 'mongoose'

export class Localidad {
    private _localidad: string;
    private _p_m: number;
    private _p_l: number;
    private _p_a: number;
    private _p_t: number

    constructor(localidad: string, p_m: number,p_l: number,p_a: number, p_t:number){
        this._localidad = localidad;
        this._p_m = p_m;
        this._p_l= p_l;
        this._p_a= p_a;
        this._p_t = p_t = 0
    }

    get localidad(){
        return this._localidad
    }

    get p_m(){
        return this._p_m
    }

    get p_l(){
        return this._p_l
    }

    get p_a(){
        return this._p_a
    }

    setp_t(_p_a: number, _p_l: number,luz:boolean,agua:boolean){
        if (luz=true){
            if (agua=true){
                var _p_t = this._p_a + this._p_l
                return _p_t
            } else {
                var _p_t = this._p_l
                return _p_t
            }
        } else if(agua=true){
            var _p_t = this._p_a
                return _p_t
        } else {
            var _p_t = 0
            return _p_t
        }
    }
    
    get p_t(){
        return this._p_t
    }

}

const localidadSchema = new Schema({
    localidad: {
        type: String,
        unique: true  
    },
    p_m: Number,
    p_l: Number,
    p_a: Number,
    p_t: Number
})

export const Localidades = model('localidades', localidadSchema)
export var p_t:number
export var p_m:number