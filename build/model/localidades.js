"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.p_m = exports.p_t = exports.Localidades = exports.Localidad = void 0;
const mongoose_1 = require("mongoose");
class Localidad {
    constructor(localidad, p_m, p_l, p_a, p_t) {
        this._localidad = localidad;
        this._p_m = p_m;
        this._p_l = p_l;
        this._p_a = p_a;
        this._p_t = p_t = 0;
    }
    get localidad() {
        return this._localidad;
    }
    get p_m() {
        return this._p_m;
    }
    get p_l() {
        return this._p_l;
    }
    get p_a() {
        return this._p_a;
    }
    setp_t(_p_a, _p_l, luz, agua) {
        if (luz = true) {
            if (agua = true) {
                var _p_t = this._p_a + this._p_l;
                return _p_t;
            }
            else {
                var _p_t = this._p_l;
                return _p_t;
            }
        }
        else if (agua = true) {
            var _p_t = this._p_a;
            return _p_t;
        }
        else {
            var _p_t = 0;
            return _p_t;
        }
    }
    get p_t() {
        return this._p_t;
    }
}
exports.Localidad = Localidad;
const localidadSchema = new mongoose_1.Schema({
    localidad: {
        type: String,
        unique: true
    },
    p_m: Number,
    p_l: Number,
    p_a: Number,
    p_t: Number
});
exports.Localidades = mongoose_1.model('localidades', localidadSchema);
