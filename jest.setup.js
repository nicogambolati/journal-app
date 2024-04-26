// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch

// Configuracion de 'dotenv' para cargar las variables de entorno en Testing
require('dotenv').config({
    path: `.env.test`,
});

jest.mock('./src/helpers/getEnvironments', () => ({
  getEnvironments: () => ({...process.env})
}));
