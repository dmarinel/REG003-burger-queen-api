const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const pkg = require('./package.json');

const { port, dbUrl, secret } = config;
const app = express();

// Conexión a la Base de Datos (MongoDB o MySQL)
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.info('Mongodb successfully connected.'))
  .catch((err) => console.info(`Error al conectar a la base de datos: ${err}`));

mongoose.set('useCreateIndex', true);

app.set('config', config);
app.set('pkg', pkg);

// parse application/x-www-form-urlencoded
// el servidor será capaz de entender los datos que le piden
// a través de un form y convertirlo en un obj de JS
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(authMiddleware(secret));

// Registrar rutas
routes(app, (err) => {
  if (err) {
    throw err;
  }
  app.use(errorHandler);
  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
});
