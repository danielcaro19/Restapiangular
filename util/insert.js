import { db } from "../src/database/database";

db.solares.drop()
db.solares.insertMany([
  
])

db.localidades.drop()
db.localidades.insertMany([
    {
        localidad: 'Agassiz',
        p_m: 24.43,
        p_a: 15.65,
        p_l: 18.43
      },
      {
        localidad: 'Borucin',
        p_m: 41.84,
        p_a: 27.54,
        p_l: 13.33
      },
      {
        localidad: 'San Enrique',
        p_m: 27.3,
        p_a: 11.35,
        p_l: 11.89
      },
      {
        localidad: 'Mimbaan Timur',
        p_m: 0.16,
        p_a: 19.78,
        p_l: 10.03
      },
      {
        localidad: 'Baiyangwan',
        p_m: 11.21,
        p_a: 27.31,
        p_l: 28.93
      },
      {
        localidad: 'Kilju',
        p_m: 19.67,
        p_a: 11.49,
        p_l: 11.44
      },
      {
        localidad: 'Bang Pahan',
        p_m: 53.31,
        p_a: 12.28,
        p_l: 22.88
      },
      {
        localidad: 'Caigangan',
        p_m: 29.61,
        p_a: 10.25,
        p_l: 14.25
      },
      {
        localidad: 'Luodian',
        p_m: 46.82,
        p_a: 22.37,
        p_l: 28.52
      },
      {
        localidad: 'Kalvia',
        p_m: 49.77,
        p_a: 27.33,
        p_l: 28.05
      },
      {
        localidad: 'Los Rastrojos',
        p_m: 4.32,
        p_a: 29.84,
        p_l: 27.07
      },
      {
        localidad: 'Jiangzhou',
        p_m: 78.24,
        p_a: 24.38,
        p_l: 18.08
      },
      {
        localidad: 'Garhi Khairo',
        p_m: 29.22,
        p_a: 20.16,
        p_l: 23.73
      },
      {
        localidad: 'San Juan',
        p_m: 15.64,
        p_a: 19.62,
        p_l: 10.19
      },
      {
        localidad: 'Tiantang',
        p_m: 19.03,
        p_a: 29.24,
        p_l: 11.98
      },
      {
        localidad: 'Yangjiang',
        p_m: 37.68,
        p_a: 10.61,
        p_l: 18.17
      },
      {
        localidad: 'Pathum Thani',
        p_m: 46.36,
        p_a: 22.13,
        p_l: 14.76
      },
      {
        localidad: 'Yuezhao',
        p_m: 76.6,
        p_a: 14.79,
        p_l: 15.58
      },
      {
        localidad: 'Anxi',
        p_m: 29.7,
        p_a: 23.74,
        p_l: 26.31
      },
      {
        localidad: 'Lesnikovo',
        p_m: 27.89,
        p_a: 10.96,
        p_l: 11.31
      }
])