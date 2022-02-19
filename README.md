# Aplicação em JavaScript com a biblioteca Three.js

JavaScript é uma linguagem de programação interpretada estruturada, de script em alto nível. Juntamente com HTML e CSS, o JavaScript é uma das três principais tecnologias da World Wide Web. JavaScript permite páginas da Web interativas e, portanto, é uma parte essencial dos aplicativos da web. A grande maioria dos sites usa, e todos os principais navegadores têm um mecanismo JavaScript dedicado para executá-lo.

Com esse intuito foi desenvolvido uma representação de um Festival de Verão. Foi então implementado:

- Construção de objetos 3D.
- Configuração de Câmara.
- Configuração de luzes.
- Interação com a cena.
- Animação.

# Controlos das várias interações com a aplicação

- Rato - permite direcionar o angulo de visão da câmara.
- Teclas “W, A, S, D, Shift, Control” - estas teclas permitem a movimentação da câmara em relação à cena.
- Tecla “L” - permite desligar luz presencial imitida do palco (bola de luz) e ativar os holofotes.
- Tecla “K” - permite ligar a luz presencial imitida do palco (bola de luz) e desligar os holofotes.
- Tecla “1” - alterar a altitude do drone em sentido positivo do eixo do y.
- Tecla “1” - alterar a altitude do drone em sentido positivo do eixo do y.
- Tecla “2” - alterar a altitude do drone em sentido negativo do eixo do y até ao mínimo de 0 (posição do plano).

# Explicação dos vários componentes do cenário

Para a construção dos vários objetos 3D foram utilizadas primitivas disponíveis da biblioteca do “THREE.JS”.

- Planos foram criados dois planos, um para simular a areia e outro para a água, em ambos foram aplicadas as medidas e texturas necessárias.
- Lua é apenas uma primitiva simples (SphereGeometry) onde está aplicada a textura da lua.
- Palco é composto por várias primitivas. Na base, colunas e mesa de som, foram implementadas Box’s (BoxGeometry) com as devidas medidas e texturas, sendo que nas colunas usamos um vetor onde foram guardados dois tipos de texturas para uma maior aproximação da realidade. A mesa de som a nível de implementação foi igual às colunas, mas houve uma exceção no plano frontal, onde temos uma renderização constante de cores aleatórias. Implementou-se uma bola de luz com o recurso à função SphereGeometry, onde o material foi configurado para não renderizar como uma estrutura de arestas, mas sim como uma estrutura sólida e compacta. Por fim, adicionamos os holofotes com dois tipos de primitivas, círculo (CylinderGeometry) para o suporte e corpo e cilindro (CircleGeometry) para a luz.
- Drone O corpo é mais uma box (BoxGeometry), os suportes são de igual implementação dos suportes do holofote (CylinderGeometry) e a hélice é um plano circular com abertura no centro (RingGeometry).

# Câmara

Foi adotada uma câmara perspetiva para a entrada no aplicativo gráfico. Mas o projeto têm como um ponto de outros tantos, a interação do utilizador com o cenário, então foi programada a uma câmara iterativa onde o utilizador pode controlar o seu posicionamento e o sentido da visão. Para isso, foram programadas 6 teclas, assim o utilizador pode mover a câmara para frente, trás, direita, esquerda, cima e baixo. As movimentações do rato foram também programadas como o sentido de ser idêntico ao olhar humano, ou seja, conseguir olhar em redor sem haver necessidade de alterar o posicionamento, ficando apenas ativo após dar um “click” na cena.

# Luzes

Foram implementados vários tipos de luzes, como AmbientLight, SpotLight, DirectionalLight. Para o ambiente foi usado o AmbientLight, configurado para proporcionar um ambiente mais escuro e iluminar toda a cena. A luz da bola é um DirectionalLight para que seja idêntico a uma luz de presença. As luzes dos holofotes são SpotLight pois é possível configurar de forma igual às dos holofotes reais, foram direcionadas para um ponto criado na cena, com uma intensidade alta e aplicadas com um angulo de abertura.

# Animações

Com a utilização do Drone como um só objeto 3D apesar das várias primitivas que o constroem, foi possível criar uma animação no seu total. A mesma, consiste em subir ou descer o drone, quando atinge o valor de 500 no eixo dos yy este começa a rodar em torno de si próprio. Quando atingido o valor de 6000 no eixo dos yy, este começa a orbitar em torno de uma rotação, para isto foi implementada a incrementação da posição do drone através de uma trajetória angular. A Lua têm uma animação simples de rotação em torno de si própria.
