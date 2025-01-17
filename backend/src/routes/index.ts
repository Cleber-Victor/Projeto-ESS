import { Express, Router } from 'express';
import RestaurantLoginController from '../controllers/RestaurantLoginController';
import RestaurantController from '../controllers/RestaurantController';
//import ShoppingCartController from '../controllers/ShoppingCartController';
import OrderCancellationController from '../controllers/OrderCancellationController';
import OrdersController from '../controllers/OrdersController';
import RestaurantModel from '../models/RestaurantModel';
import ShoppingCartController from '../controllers/ShoppingCartController';
import ClientLoginController from '../controllers/ClientLoginController';
import ClientController from '../controllers/ClientController';
import ItemsController from '../controllers/ItemsController';

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello World!' });
});

router.post(
  '/restaurants',
  RestaurantController.validate('insert'),
  RestaurantController.insert
);

router.post('/orders', OrdersController.insert);

router.put('/orders/:orderId', OrdersController.update);

router.get('/restaurants', RestaurantController.index);

router.delete('/restaurants/:id', RestaurantController.delete);

router.put(
  '/restaurants/:id',
  RestaurantController.validate('update'),
  RestaurantController.update
);

router.post('/restaurant/login', RestaurantLoginController.login);

router.post('/restaurant/home', RestaurantLoginController.verifyToken, (req, res) => {
  res.status(200).json({ message: 'Acesso concedido.'}); //, userId: req.userId 
});

ShoppingCartController.setupRoutes(router);
ItemsController.setupRoutes(router);

router.post('/clients/:clientId/orders', OrderCancellationController.index);

router.put(
  '/clients/:clientId/orders/:orderId/cancellation',
  OrderCancellationController.update
);

router.post('/clients/login', ClientLoginController.login);


router.post('/clients/home', ClientLoginController.verifyToken, (req, res) => {
  res.status(200).json({ message: 'Acesso concedido.'}); //, userId: req.userId 
});

router.post(
  '/clients',
  ClientController.validate('insert'),
  ClientController.insert
);

router.get('/clients', ClientController.index);

router.delete('/clients/:id', ClientController.delete);

router.put(
  '/clients/:id',
  ClientController.validate('update'),
  ClientController.update
);

export default router;
