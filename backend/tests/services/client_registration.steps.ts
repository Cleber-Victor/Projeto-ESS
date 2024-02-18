import { loadFeature, defineFeature, DefineStepFunction } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { prismaMock } from '../../setupTests';
import { Client } from '@prisma/client';

const feature = loadFeature(
  'tests/features/client_registration.feature'
);
const request = supertest(app);

defineFeature(feature, (test) => {
  let response: supertest.Response;
  let clients: Client[] = [];

  
  afterEach(() => {
    clients = [];
  });

  test('Cadastro bem sucedido de cliente', ({ given, and, when, then }) => {
    given(/^não existe nenhum cliente com o CPF "(.*)" nem com o email "(.*)"$/,
      async (cpf, email) => {
        prismaMock.client.findFirst.mockResolvedValue(null);
      }
    );

    when(/^uma requisição POST é enviada para "(.*)" com o nome "(.*)", CPF "(.*)", email "(.*)", senha "(.*)", endereco "(.*)"$/, (arg0, arg1, arg2, arg3, arg4, arg5, arg6) => {

    });

    then(/^é retornada uma mensagem com status "(.*)"$/, (arg0) => {

    });

    and(/^retorna uma mensagem "(.*)"$/, (arg0) => {

    });
  });




  test('E-mail usado no cadastro já está cadastrado', ({ given, when, then, and }) => {
    given(/^um cliente cadastrado no sistema com os dados id "(.*)" "(.*)" "(.*)", email "(.*)" endereço "(.*)" senha "(.*)"$/,
     async (id, name, cpf, email, address, password) => {
      clients.push({
        id: parseInt(id, 10),
        password,
        name,
        email,
        cpf,
        endereco,
      })
    });

    when(/^uma requisição POST é enviada para "(.*)" com os valores "(.*)",  "(.*)", email "(.*)", senha "(.*)", endereco "(.*)"$/,
      async (id, name, cpf, email, address, password) => {

    });

    then(/^é retornada uma mensagem com status "(.*)"$/, (arg0) => {

    });

    and(/^retorna uma mensagem "(.*)"$/, (arg0) => {

    });

    and(/^o cliente "(.*)" não está salvo no banco de dados$/, (arg0) => {

    });
  });



  test('CPF usado no cadastro já está cadastrado', ({ given, when, then, and }) => {
    given(/^um cliente cadastrado no sistema com os dados id "(.*)" "(.*)" "(.*)", email "(.*)" endereço "(.*)" senha "(.*)"$/, (arg0, arg1, arg2, arg3, arg4) => {

    });


    when(/^uma requisição POST é enviada para "(.*)" com os valores "(.*)",  "(.*)", email "(.*)", senha "(.*)", endereco "(.*)"$/, (arg0, arg1, arg2, arg3, arg4, arg5, arg6) => {

    });

    then(/^é retornada uma mensagem com status "(.*)"$/, (arg0) => {

    });

    and(/^retorna uma mensagem "(.*)"$/, (arg0) => {

    });
  });


  test('Remover conta', ({ given, when, then, and }) => {
    given(/^um cliente cadastrado no sistema com os dados id "(.*)" "(.*)" "(.*)", email "(.*)" endereço "(.*)" senha "(.*)"$/, (arg0, arg1, arg2, arg3, arg4) => {

    });


    when(/^uma requisição DELETE é enviada para "(.*)"$/, (arg0, arg1) => {

    });

    then(/^o cliente "(.*)" não está mais salvo no banco de dados$/, (arg0) => {

    });

    and(/^é retornada uma mensagem com o status "(.*)" e mensagem "(.*)"$/, (arg0, arg1) => {

    });
  });


  test('Leitura de cliente do sistema', ({ given, when, then, and }) => {
    given(/^um cliente cadastrado no sistema com os dados id "(.*)" "(.*)" "(.*)", email "(.*)" endereço "(.*)" senha "(.*)"$/, (arg0, arg1, arg2, arg3, arg4) => {

    });

    when(/^uma requisição GET é enviada para "(.*)"$/, (arg0, arg1) => {

    });

    then(/^é retornada uma mensagem com o status "(.*)"$/, (arg0) => {

    });

    and(/^a mensagem contém "(.*)", "(.*)", "(.*)", senha "(.*)", endereco "(.*)"$/, (arg0, arg1, arg2, arg3, arg4) => {

    });
  });


  test('Alteração de e-mail mal sucedida', ({ given, when, then, and }) => {
    given(/^um cliente cadastrado no sistema com os dados id "(.*)" "(.*)" "(.*)", email "(.*)" endereço "(.*)" senha "(.*)"$/, (arg0, arg1, arg2, arg3, arg4) => {

    });


    when(/^uma requisição PUT é enviada para "(.*)" com os valores "(.*)",  "(.*)", email "(.*)", senha "(.*)", endereco "(.*)"$/, (arg0, arg1, arg2, arg3, arg4, arg5, arg6) => {

    });

    then(/^é retornada uma mensagem com status "(.*)"$/, (arg0) => {

    });

    and(/^retorna uma mensagem "(.*)"$/, (arg0) => {

    });
  });


});