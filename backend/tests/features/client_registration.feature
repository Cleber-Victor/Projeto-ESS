Feature: Cadastro de usuário
	  As a usuário do aplicativo
	  I want to criar minha conta
	  So that eu posso realizar os pedidos
	
Scenario: Cadastro bem sucedido de cliente
    Given não existe nenhum cliente com o CPF "123321222" nem com o email "userradmrestaurante.com" 
    When uma requisição POST é enviada para "/clients" com o nome "User1", CPF "123321222", email "comercomer@gmail.com", senha "clientqualquer", endereco "rua1"
    Then é retornada uma mensagem com status "201"
    And retorna uma mensagem "Cliente User1 salvo no banco de dados"

Scenario: E-mail usado no cadastro já está cadastrado
    Given um cliente cadastrado no sistema com os dados id "2" "user1" "123321222", email "cvsj@cin.ufpe.br" endereço "rua1" senha "123456"	
    When uma requisição POST é enviada para "/clients" com os valores "user2",  "123321221", email "cvsj@cin.ufpe.br", senha "123456", endereco "rua1"
    Then é retornada uma mensagem com status "409"
    And retorna uma mensagem "e-mail já cadastrado"
    And o cliente "user2" não está salvo no banco de dados

Scenario: CPF usado no cadastro já está cadastrado
    Given um cliente cadastrado no sistema com os dados id "2" "user1" "123321222", email "cvsj@cin.ufpe.br" endereço "rua1" senha "123456"		
    When uma requisição POST é enviada para "/clients" com os valores "user2",  "123321222", email "user_email", senha "123456", endereco "rua1"
    Then é retornada uma mensagem com status "409"
    And retorna uma mensagem "CPF já cadastrado"


Scenario: Remover conta 
    Given um cliente cadastrado no sistema com os dados id "2" "user1" "123321222", email "cvsj@cin.ufpe.br" endereço "rua1" senha "123456"	
    When uma requisição DELETE é enviada para "/clients/{id}"
    Then o cliente "user3" não está mais salvo no banco de dados
    And é retornada uma mensagem com o status "200" e mensagem "cliente excluído com sucesso"

Scenario: Leitura de cliente do sistema
    Given existe um cliente cadastrado no sistema com os dados id "2" "User1",  "71254959411", email "comercomer@gmail.com", senha "clientqualquer", endereco "rua1"
    When uma requisição GET é enviada para "/clients"
    Then é retornada uma mensagem com o status "200"
    And a mensagem contém "User1", "71254959411", "comercomer@gmail.com", senha "clientqualquer", endereco "rua1"

Scenario: Alteração de e-mail mal sucedida
    Given um cliente cadastrado no sistema com os dados id "2" "user1" "123321222", email "cvsj@cin.ufpe.br" endereço "rua1" senha "123456"	
    When uma requisição PUT é enviada para "/clients" com os valores "user2",  "123321221", email "cvsj@cin.ufpe.br", senha "129786", endereco "rua1"
    Then é retornada uma mensagem com status "409"
    And retorna uma mensagem "Falha na atualização do e-mail"

