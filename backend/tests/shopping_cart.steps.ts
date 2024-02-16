import { loadFeature, defineFeature } from 'jest-cucumber';
import { prismaMock } from '../setupTests';
import OrderItemEntity from '../src/entities/OrderItemEntity';
import ShoppingCartModel from '../src/models/ShoppingCartModel';
import ShoppingCartService from '../src/services/ShoppingCartService';

import request from 'supertest';
import app from '../src/app';

const feature = loadFeature('tests/features/shopping_cart.backend.feature');

defineFeature(feature, (test) => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Consulta ao Banco de Dados carrega o carrinho do usuário após login', ({
    given,
    when,
    then,
    and,
  }) => {
    var screen = '';
    var user = '';
    const db_orderItems = [
      { clientId: 1, itemId: 1, quantity: 1 },
      { clientId: 1, itemId: 2, quantity: 2 },
      { clientId: 1, itemId: 3, quantity: 3 },
    ];

    given(/^eu estou na tela "(.*)"$/, async (arg0) => {
      screen = arg0;
      expect(screen).toBe('Login');
    });
    when(/^eu faço login como "(.*)"$/, (arg0) => {
      user = arg0;
    });

    var response: any;
    then(
      /^uma requisição "(.*)" para "(.*)" é enviada$/,
      async (arg0, arg1) => {
        jest.spyOn(ShoppingCartService, 'getClientId').mockResolvedValue(1);
        jest
          .spyOn(ShoppingCartService, 'getUserOrderItems')
          .mockResolvedValue(db_orderItems);
        const clientId = (await ShoppingCartService.getClientId(
          user
        )) as number;
        response = await request(app).get(
          '/' + clientId.toString() + '/shopping_cart'
        );
      }
    );

    and(/^o status da resposta deve ser "(.*)"$/, (arg0) => {
      expect(response.status).toBe(parseInt(arg0));
    });

    and(
      /^o JSON da resposta contém a lista de itens no carrinho do usuário "(.*)"$/,
      (arg0) => {
        expect(response.body).toEqual(db_orderItems);
      }
    );
  });

  test('Salvando produtos adicionados ao carrinho no Banco de Dados', ({
    given,
    and,
    when,
    then,
  }) => {
    var user = '';
    var screen = '';
    given(
      /^eu estou logado como "(.*)" na tela "(.*)"$/,
      async (arg0, arg1) => {
        user = arg0;
        screen = arg1;
      }
    );

    var shopping_cart: OrderItemEntity[] = [];
    and('o carrinho está vazio', () => {
      expect(shopping_cart).toEqual([]);
    });

    var order: OrderItemEntity;
    jest.spyOn(ShoppingCartService, 'getClientId').mockResolvedValue(1);
    when(
      /^eu vejo "(.*)" do "(.*)" por "(.*)" como opção$/,
      async (arg0, arg1, arg2) => {
        const itemId = 1; //TODO: get item id of the restaurant from the database
        const clientId = (await ShoppingCartService.getClientId(
          user
        )) as number;
        order = new OrderItemEntity(clientId, itemId);
        shopping_cart.push(order);
      }
    );

    var response: any;
    then(
      /^uma requisição "(.*)" com "(.*)" unidade\(s\) de "(.*)" do "(.*)" por "(.*)" é enviada para "(.*)"$/,
      async (arg0, arg1, arg2, arg3, arg4, arg5) => {
        jest
          .spyOn(ShoppingCartService, 'insertOrderItem')
          .mockResolvedValue([201, 'Item added to cart']);
        response = await request(app)
          .post('/' + order.clientId + '/shopping_cart')
          .send({ itemId: order.itemId });
        expect(response.body).toStrictEqual({ message: 'Item added to cart' });
      }
    );

    and(/^o status da resposta deve ser "(.*)"$/, (arg0) => {
      expect(response.status).toBe(parseInt(arg0));
    });

    and(
      /^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" do "(.*)"$/,
      async (arg0, arg1, arg2, arg3) => {
        jest
          .spyOn(ShoppingCartService, 'getUserOrderItems')
          .mockResolvedValue([order]);
        response = await request(app).get(
          '/' + order.clientId + '/shopping_cart'
        );
        expect(shopping_cart).toEqual(response.body);
      }
    );
  });
});