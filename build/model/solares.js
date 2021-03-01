"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solares = exports.Solar = void 0;
const mongoose_1 = require("mongoose");
const localidades_1 = require("./localidades");
class Solar {
    constructor(_id, _direccion, _localidad, _superficie, _luz, _agua, _f_subida, _precio) {
        this._id = _id,
            this._direccion = _direccion,
            this._localidad = _localidad,
            this._superficie = _superficie,
            this._luz = _luz,
            this._agua = _agua,
            this._f_subida = _f_subida;
        this._precio = _precio;
    }
    get id() {
        return this._id;
    }
    get direccion() {
        return this._direccion;
    }
    get localidad() {
        return this._localidad;
    }
    get superficie() {
        return this._superficie;
    }
    get luz() {
        return this._luz;
    }
    get agua() {
        return this._agua;
    }
    get f_subida() {
        return this._f_subida;
    }
    setprecio(p_t, p_m) {
        let _precio = (this._superficie * p_m) + p_t;
        console.log(_precio);
        return _precio;
    }
    get precio() {
        return this._precio = this.setprecio(localidades_1.p_t, localidades_1.p_m);
    }
}
exports.Solar = Solar;
const solarSchema = new mongoose_1.Schema({
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
});
exports.Solares = mongoose_1.model('solares', solarSchema);
