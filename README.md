# function-plotting

Página simples em HTML para plotar funções de duas variáveis (superfícies).

## O projeto

Este mini projeto teve como objetivo estudar um método para desenhar objetos 3d num plano 2d (tela do computador).

### Como funciona

O canvas do HTML possui um contexto de renderização 2d, mas não torna impossível o desenho de um objeto 3d. Para isso, os pontos utilizados no programa possuem 3 coordenadas (x, y, z), porém, na hora de desenhar os pontos na tela, só são passados como parâmetro os pontos x e y.

Ao utilizar uma matriz de rotação em torno de um eixo, as coordenadas do próprio eixo permanecem as mesmas, mas as coordenadas dos outros dois eixos são modificadas de acordo com a rotação desejada. Então, se temos dois pontos:

    p1 = (0, 0, 300) e
    p2 = (0, 0, -300),
    
no momento em que aplicarmos uma rotação em torno do eixo Z, a multiplicação pela matriz de rotação modifica os valores de x e y, reposicionando o ponto no plano bidimensional (x, y), sendo que sua nova posição é relativa à coordenada Z do ponto.

Assim, podemos criar uma percepção de profundidade no desenho conforme ele gira na tela, mas não estamos de fato trabalhando num espaço tridimensional.

## Testes de execução

A imagem a seguir é um printscreen do plot da superfície da função:

    f(x,y) = 4*sin(sqrt(x² + y²));

Onde os pontos mais claros são os valores maiores ou iguais a zero, e os mais escuros menores que zero.

![ScreenShot](https://raw.githubusercontent.com/gAldeia/Function-plotting/master/src/preview.png)
