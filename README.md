# Anotações sobre curso

1. Aplicação que será desenvolvida: eventos

2. configuração do setup do projeto:
- npx create-react-app my-app
-  é um ambiente confortável para aprender React, e é a melhor maneira de começar um single-page application em React.
- https://pt-br.reactjs.org/docs/create-a-new-react-app.html

3. Entendendo estrutura de uma aplicação react
- estrutura de arquivo
- utilização de componentes
- criação de componentes.

4. criando view de login da aplicação.
- criando pasta view onde ficara os componentes de layout da aplicação.

5. Desenvolvendo tela de login 
- criação de layout login com bootstrap.

6. Integração do firebase na aplicação
- instalação do npm i firebase
- criação de pasta config/firebase.js para configuração da conexão com firebase

7. Autenticação de usuario firebase.
- criação de função logar.
- importação de useState("hooks do react") - Hooks são uma nova adição ao React 16.8. Eles permitem que você use o state e outros recursos do React sem escrever uma classe.
https://pt-br.reactjs.org/docs/hooks-intro.html
- evento onClicke = sempre que clica, dispara uma função
- evento onChange = sempre que muda dispara  uma função
- utilizando função auth.signInWithEmailAndPassword com promisse

8. Deixando as mensagems da tela de login dinamica
- criar state que armazena sucesso ou erro, e dependendo do que foi armazenado, mostra mensagem de logado com sucesso ou tente novamente.

9. cadastro de usuarios
- criação de página de usuario com form
- criação de validação com operadores terniarios 
- utilização de switch para validação de cenários diferentes que são retornados pelo erro.message da api do firebase.
- utilizando variavel de estado, e definindo como 1= true , 0=false

10. definindo rotas e navegação em nossa aplicação
- instalando react-router-dom
- utilizando BrowserRouter, e router para configuração de rotas.
- utilizando Link para inserção de links.

11. desenvolvimento da página home e componente navbar
- criação de componente navbar e reutilização do mesmo.
- obs, o jsx só pode retornar um unico elemento, sendo necessário usar <>conteudo</>
- importação de font awesome

12. usando Redux na aplicação.
- Com o Redux podemos guardar os estados da aplicação dentro de um store.
- Sequencia do Redux no caso login: 
* Action: após uma ação, é chamado a função reducer, no caso de login, quando clicar no botão entrar , chamara o reducer.
* Reducer: O reducer irá atender 2 tipos de pedidos, ou pra fazer login, ou pra fazer logaout, e irá guardar o estado da aplicação dentro do store.
* STORE: Por fim o store retorna o estado da aplicação que molda a interface de acordo com o mesmo.
- useSelector: Permite extrair dados do estado da store, usando uma função de seletor.
- dispatch: Despacha uma ação. Essa é a única maneira de acionar uma mudança de estado.

13. Deixando o menu dinámico.
* Utilizando o estado do store para identificar se o usuario está logado ou deslogado e mostrar o menu de acordo com o cenário no componente navbar.

14. Desenvolvendo a recuperação de senha com envio de e-mail.
- criado página de recuperação de senha para enviar requisição ao firebase para receber email no email inserido para resetar senha.
- Utilizado useState
- Utilizado firebase ResetPassword
- Utilizado componente Navbar

15. Personalizando o email de recuperação de contas.
- personalização do template de recuperar senha no firebase.

17. Desenvolvimento da tela de cadastro de evento.
- criação de página de cadastar evento.
- criação de form para cadastrar o evento.
- criação de mensagem de sucesso e erro com useState

18. Criação e configuração do Banco Firestore no Firebase
- criação de banco de dados firestore
- banco de dados não relacional
- banco -> coleção -> documentos
- regras do banco permitindo leitura e escrita

19. Cadastro de Evento com Firestore do firebase
- criação de variaveis e useState para armazenalas referente aos campos de cadastro de eventos
- criação de variavel firebase.firestore() e  firebase.storage()
- envio de dados de formulário para firestore.
- envio de imagem para storage

20. Desenvolvendo o componente evento e barra de pesquisa
- criação de componente cartão de evento
- criação de html de card
- criação de estilo de card

21. Deixando os cartões de eventos dinâmicos buscando dados no Banco de Dados
- useEffect: você diz ao React que o componente precisa fazer algo apenas depois da renderização.
- trazer os dados de cada evento e armazer em um array de objetos na home
- pegar o componente EventoCard e passar key e props pra ele rendeniza os componentes dinamicamente com os dados trazidos do firestore.
-  no componente EventoCard, tratar o dado img, e fazer um get no firebase pra pegar a url da imagem e passar no tempalte html do EventoCard.

22. Implementar a pesquisa de eventos
- criado input onde será digitado oque sera pesquisado, e utilizando o onChange, pra sempre que estiver acontecendo uma mudança, enviar os dados pro use state pesquisa atraves do setPesquisa.
- fazer uma valização de if pra rendeniza somente doc.data().titulo.indexOf(pesquisa) for >= a 0

23. Implementando a opção de listar meus eventos
- listar eventos somente do usuario cadastrado
- criando rotas alternativas passando parametro para mostar somente o evento que o proprio usuario criou.
- utilzar match para pegar parametro da url e validar se usuario esta logado ou não,caso esteja, da get where usuario seu nome pra pegar somente eventos dele

24. correção de bug de rotas por não ter colocado / na rota to=""

25. Desenvolvimento da página de detalhes do evento
- criação de página de detalhes do evento

26. carregando os detalhes dos eventos do banco de dados na página
- pegando informações do evento no firebase e rendenizando de forma dinamica
- passando parametro id na url, e rendenizando informações do evento de acordo com o id do evento passado na url
- mostrar botão de editar somente quando for dono do carde

27. refinando o carregamento da página de detalhes
- enquanto a imagem não vir do firebase, mostrar loading na pagina ate carregamento da imagem

28. Implementando quantidade de visualizações de um evento
- sempre que acessar detalhes do pedido, damos um update no parametro visualizações no firebase.

29. implementando a opção de editar um evento
- redirecionar usuario no botão evento pra página de cadastrar evento porem com informações diferentes
- trazer dados dinamicos do firebase e passar nos values dos inputs para serem rendenizados
- atualizar foto identificando quando é foto nova e foto atual

30. Remover um evento publicado
- adição de botão para remover evento chamando delete do firebase,  e logo após isso usar redirect pra home.

31. Armazenando no navegador o estado de login do usuario
- redux persiste: pega o store onde esta guardado os estados e armazena no navegador
- adiciona o persist no store para armazenar o estado da aplicação, e adiciona o PersistGate no App cobrindo toda a aplicação.