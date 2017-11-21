const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require('../models/User');
const Cine = require('../models/Cine');
const Theater = require('../models/Theater');
const Review = require ('../models/Review');
const SERV = require('../models/services');

mongoose.connect("mongodb://localhost/cinema-reviews",{useMongoClient: true});

// cine seed
const cine = [
  {
    name : 'DEHESA CUADERNILLOS',
    address:{
          province : 'MADRID',
          town : 'ALCALA DE HRES',
          street : 'CTRO. COMERC. CUADERNILLOS. CTRA.A-II. KM. 34.'
        },
    url: 'www.dehesacuad.es',
    services : SERV[0],
    openingHours: '17-24',
    price: 7,
    phone : 918700383,
    rooms:{
          number :5,
          seating : 283
          }
  },
  {
    name : 'YELMO TRESAGUAS',
    address:{
          province : 'MADRID',
          town : 'ALCORCÓN',
          street : 'C.C. TRES AGUAS. AVDA, DE AMÉRICA, 19'
        },
    url:'www.yelmotresaguas.es',
    services : SERV[0],
    openingHours: '18-24',
    price: 8,
    phone : 918143555,
    rooms:{
          number :9,
          seating : 110
          }
  },
  {
    name : 'YELMO PLANETOCIO',
    address:{
          province : 'MADRID',
          town : 'ALCALA DE HRES',
          street : 'AVDA. JUAN CARLOS I, 46'
        },
    url: 'www.yelmoplanetocio.com',
    services : SERV[2],
    openingHours: '16-24',
    price: 7,
    phone : 918175212,
    rooms:{
          number :11,
          seating : 229
          }
  },
  {
    name : 'CINES LA RAMBLA',
    address:{
          province : 'MADRID',
          town : 'COLLADO VILLALBA',
          street : 'AVDA. DE LOS PRÍNCIPES DE ESPAÑA, 23'
        },
    url: 'www.cineslarambla.com',
    services : SERV[0],
    openingHours: '20-24',
    price: 12,
    phone : 918369007,
    rooms:{
          number :9,
          seating : 150
          }
  },
  {
    name : 'ARTESIETE ALCALA FULL HD',
    address:{
          province : 'MADRID',
          town : 'MADRID',
          street : 'C.C. ALCALÁ NORTE . CL. ALCALA, 414'
        },
    url: 'www.cinesartesiete.com',
    services : SERV[2],
    openingHours: '17-24',
    price: 14,
    phone : 918678401,
    rooms:{
          number :7,
          seating : 144
          }
  },
  {
    name : 'CINES PRINCESA',
    address:{
          province : 'MADRID',
          town : 'MADRID',
          street : 'CL DE LA PRINCESA, 3.'
        },
    url: 'www.cinesprincesa.es',
    services : SERV[1],
    openingHours: '19-24',
    price: 8,
    phone : 918579374,
    rooms:{
          number :7,
          seating : 65
          }
  },
  {
    name : 'CONDE DUQUE ALBERTO AGUIL.',
    address:{
          province : 'MADRID',
          town : 'MADRID',
          street : 'CL. ALBERTO AGUILERA, 4'
        },
    url: 'www.cinescondeduque.es',
    services : SERV[2],
    openingHours: '20-24',
    price: 7,
    phone : 918739303,
    rooms:{
          number :6,
          seating : 272
          }
  },
  {
    name : 'CONDE DUQUE GOYA',
    address:{
          province : 'MADRID',
          town : 'MADRID',
          street : 'CL. GOYA, 67'
        },
    url: 'www.cinescdgoya.es',
    services : SERV[2],
    openingHours: '19-24',
    price: 10,
    phone : 918399189,
    rooms:{
          number :11,
          seating : 128
          }
  },
  {
    name : 'CONDE DUQUE STA. ENGRACIA',
    address:{
          province : 'MADRID',
          town : 'MADRID',
          street : 'CL. STA. ENGRACIA, 132'
        },
    url: 'www.cdsantaengracia.es',
    services : SERV[2],
    openingHours: '18-24',
    price: 11,
    phone : 918454878,
    rooms:{
          number :4,
          seating : 98
          }
  },
  {
    name : 'DREAMS PALACIO DE HIELO',
    address:{
          province : 'MADRID',
          town : 'MADRID',
          street : 'CL. SILVANO, 77'
        },
    url: 'www.dreamsphielo.es',
    services : SERV[1],
    openingHours: '17-24',
    price: 10,
    phone : 918152401,
    rooms:{
          number :9,
          seating : 164
          }
  },
  {
    name : 'GOLEM MADRID (ANTIGUO ALPHAVILLE)',
    address:{
          province : 'MADRID',
          town : 'MADRID',
          street : 'MARTÍN DE LOS HEROS, 14'
        },
    url: 'www.golemadrid.es',
    services : SERV[0],
    openingHours: '16-24',
    price: 12,
    phone : 918953643,
    rooms:{
          number :15,
          seating :151
          }
  },
  {
    name : 'ODEON SAMBIL'	,
    address:{
          province : 'MADRID',
          town : 'LEGANÉS',
          street : 'C.CMERCIAL SAMBIL OUTLET'
        },
    url: 'www.cinesodeon.es',
    services : SERV[2],
    openingHours: '20-24',
    price: 9,
    phone : 918491298,
    rooms:{
          number :9,
          seating : 284
          }
  },
  {
    name : 'RENOIR PLAZA ESPAÑA',
    address:{
          province : 'MADRID',
          town : 'MADRID',
          street : 'CL. MARTÍN DE LOS HEROS, 12'
        },
    url: 'www.cinesrenoir.es',
    services : SERV[2],
    openingHours: '19-24',
    price: 11,
    phone : 918928246,
    rooms:{
          number :3,
          seating : 259
          }
  },
  {
    name : 'RENOIR RETIRO',
    address:{
          province : 'MADRID',
          town : 'MADRID',
          street : 'CL. NARVÁEZ, 42'
        },
    url: 'www.cinesrenoir.es',
    services : SERV[2],
    openingHours: '17-24',
    price: 10,
    phone : 918336926,
    rooms:{
          number :19,
          seating : 47
          }
  },
  {
    name : 'YELMO IDEAL',
    address:{
          province : 'MADRID',
          town : 'MADRID',
          street : 'CL. DR. CORTEZO, 6. PZA. DE JACIENTO BENAVENTE'
        },
    url: 'www.yelmocines.es',
    services : SERV[1],
    openingHours: '18-24',
    price: 10,
    phone : 918303444,
    rooms:{
          number :12,
          seating :138
          }
  },
  {
    name : 'YELMO ISLAZUL',
    address:{
          province : 'MADRID',
          town : 'MADRID',
          street : 'C.C ISLAZUL. CL. CALDERILLA, 1'
        },
    url: 'www.yelmocines.es',
    services : SERV[2],
    openingHours: '18-24',
    price: 12,
    phone : 918871000,
    rooms:{
          number :7,
          seating :146
          }
  },
  {
    name : 'YELMO PLENILUNIO',
    address:{
          province : 'MADRID',
          town : 'MADRID',
          street : 'C.C. PLENILUNIO. CL. ARACNE, 3. GLORIETA EISENHOWER'
        },
    url: 'www.yelmocines.es',
    services : SERV[2],
    openingHours: '18-24',
    price: 8,
    phone : 918236365,
    rooms:{
          number :6,
          seating : 286
          }
  },
  {
    name : 'YELMO RIVAS H2O',
    address:{
          province : 'MADRID',
          town : 'MADRID',
          street : 'CL. JUAN DE LA CIERVA, S/N'
        },
    url: 'www.yelmocines.es',
    services : SERV[2],
    openingHours: '19-24',
    price: 7,
    phone : 918879814,
    rooms:{
          number :8,
          seating :91
          }
  },
  {
    name : 'YELMO PLAZA NORTE II',
    address:{
          province : 'MADRID',
          town : 'S.S. DE LOS REYES',
          street : 'C.C. PLAZA NORTE II, CTRA DE BURGOS SALIDA, 19'
        },
    url: 'www.yelmocines.es',
    services : SERV[2],
    openingHours: '20-24',
    price: 7,
    phone : 918950956,
    rooms:{
          number :8,
          seating :54
          }
  },
  {
    name : 'ODEÓN MULTICINES TRES CANTOS',
    address:{
          province : 'MADRID',
          town : 'TRES CANTOS',
          street : 'C.C. CIUDAD DE TRES CANTOS - AVDA. LABRADORES, 1'
        },
    url: 'www.cinesodeon.es',
    services : SERV[0],
    openingHours: '18-24',
    price: 9,
    phone : 918449382,
    rooms:{
          number :4,
          seating : 295
          }
  },
  {
    name : 'RESTÓN CINEMAS',
    address:{
          province : 'MADRID',
          town : 'VALDEMORO',
          street : 'C.C. EL RESTÓN. AVDA. MAR MEDITERRÁNEO, 3'
        },
    url: 'www.cinesreston.es',
    services : SERV[2],
    openingHours: '18-24',
    price: 8,
    phone : 918700548,
    rooms:{
          number :6,
          seating : 283
          }
  },
  {
    name : 'CONDE DUQUE AUDITORIO MORASOL',
    address:{
          province : 'MADRID',
          town : 'MADRID',
          street : 'PRADILLO, 4-6'
        },
    url: 'www.cinescondeduque.es',
    services : SERV[0],
    openingHours: '19-24',
    price: 10,
    phone : 918152457,
    rooms:{
          number :10,
          seating : 110
        }
  }
];

// theaters seed
const theaters = [
  {
    name: 'ARTE&DESMAYO',
    address: {
        province: 'MADRID',
        town: 'MADRID',
        street: 'BALEARES 14'
    },
    url: 'www.arteydesmayo.com',
    services: 'wifi',
    openingHours: '10:00 - 20:00',
    price: 30,
    phone: 912251069,
    seating: 50
  },
  {
    name: 'TEATRO AMAYA',
    address: {
        province: 'MADRID',
        town: 'MADRID',
        street: 'General Martínez Campos 9'
    },
    url: 'www.teatroamaya.com/',
    services: 'wifi',
    openingHours: '10:00 - 18:00',
    price: 26,
    phone: 915934005,
    seating: 200
  },
  {
    name: 'TEATRO ARLEQUÍN GRAN VÍA',
    address: {
        province: 'MADRID',
        town: 'MADRID',
        street: 'San bernardo 5'
    },
    url: 'www.teatroarlequingranvia.com',
    services: 'bar',
    openingHours: '12:30 - 16:00',
    price: 12,
    phone: 917580847,
    seating: 125
  },
  {
    name: 'SALA BULULU 2120',
    address: {
        province: 'MADRID',
        town: 'MADRID',
        street: 'canarias 16'
    },
    url: 'www.teatro.bululu2120.com',
    services: 'bar',
    openingHours: '10:00 - 18:00',
    price: 10,
    phone: 913600193,
    seating: 35
  },
];

// // drop all collections
// User.collection.drop();
// Cine.collection.drop();
Theater.collection.drop();
Review.collection.drop();
//
// add cine to BBDD
// Cine.create(cine, (err, item)=>{
//   if (err) { throw err; }
//     item.forEach( (e) => {
//       console.log(e.name);
//     });
//     mongoose.connection.close();
// });
//
// add theater to BBDD
Theater.create(theaters, (err, item)=>{
  if (err) { throw err; }
    item.forEach( (e) => {
      console.log(e.name);
    });
    mongoose.connection.close();
});
