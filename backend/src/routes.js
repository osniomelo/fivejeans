const { Router } = require('express');

const SessionController = require('./app/controllers/SessionController');
const UserController = require('./app/controllers/UserController');
const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();

routes.get('/', (req, res) => res.send('Servidor online'));
routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.use(authMiddleware);

module.exports = routes;
