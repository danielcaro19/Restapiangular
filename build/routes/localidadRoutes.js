"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localidadRoutes = void 0;
const express_1 = require("express");
const localidades_1 = require("../model/localidades");
const database_1 = require("../database/database");
class LocalidadesRoutes {
    constructor() {
        this.post = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { localidad, p_m, p_l, p_a, p_t } = req.body;
            yield database_1.db.conectarBD();
            const query = (yield localidades_1.Localidades.findOne({}, { localidad: 1, _id: 0 }).sort({ localidad: -1 }).limit(1));
            const dSchema = {
                localidad: localidad,
                p_m: p_m,
                p_l: p_l,
                p_a: p_a,
                p_t: p_t
            };
            const oSchema = new localidades_1.Localidades(dSchema);
            yield oSchema.save()
                .then((doc) => {
                console.log('Salvado Correctamente: ' + doc);
                res.json(doc);
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.send('Error: ' + err);
            });
            yield database_1.db.desconectarBD();
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { localidad } = req.params;
            yield database_1.db.conectarBD();
            yield localidades_1.Localidades.findOneAndDelete({ localidad: localidad })
                .then((doc) => {
                console.log(doc);
            });
            database_1.db.desconectarBD();
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const query = yield localidades_1.Localidades.find({}, { _id: 0 }); /*aggregate([{
                    $lookup: {
                        from: 'Solares',
                        localfiled: 'localidad',
                        foreignField: 'localidad',
                        as: 'solares_loc'
    
                    }
                }])*/
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.getId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { localidad } = req.params;
            yield database_1.db.conectarBD();
            yield localidades_1.Localidades.findOne({ localidad: localidad })
                .then((docu) => {
                if (docu == null) {
                    console.log('El documento que desea modificar no existe');
                    res.json({ "Error": "No existe: " + localidad });
                }
                else {
                    console.log('Existe: ' + docu);
                    res.json(docu);
                }
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.json({ error: 'Error: ' + err });
            });
            database_1.db.desconectarBD();
        });
        this.put = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { localidad } = req.params;
            const { p_m, p_l, p_a } = req.body;
            yield database_1.db.conectarBD();
            yield localidades_1.Localidades.findOneAndUpdate({ localidad: localidad }, {
                p_m: p_m,
                p_l: p_l,
                p_a: p_a,
            }, {
                new: true,
                runValidators: true
            })
                .then((docu) => {
                if (docu == null) {
                    console.log('La localidad que desea modificar no existe');
                    res.json({ "Error": "No existe: " + localidad });
                }
                else {
                    console.log('Modificado Correctamente: ' + docu);
                    res.json(docu);
                }
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.json({ error: 'Error: ' + err });
            });
            database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/', this.get);
        this._router.get('/:localidad', this.getId);
        this._router.delete('/:localidad', this.delete);
        this._router.post('/', this.post);
        this._router.put('/:localidad', this.put);
    }
}
const obj = new LocalidadesRoutes();
obj.misRutas();
exports.localidadRoutes = obj.router;
