//Pequeno projeto feito para estudar a implementação de matrizes de rotação

//array para conter os pontos da função que será plotada. 
var nodes = [];

//cores utilizadas para diferenciar pontos em que f(x, y)>=0 ou f(x, y)<0
var nodes_colors = ["#336600", "#33cc33"];

//pontos extremos das linhas de cada coordenada, com os nomes dos eixos.
var coord_names = ["X axis", "Y axis", "Z axis"];
var coord_nodes = [
	[-300,   0,   0],
	[ 300,   0,   0],
	[   0,-300,   0],
	[   0, 300,   0],
	[   0,   0,-300],
	[   0,   0, 300],
];

var canvas;
var context;

//algumas funções precisma ser redimensionadas para uma boa vizualização. Estas
//vriáveis servem para dizer, em píxels, o valor que cata unidade representa.
var unity_size = 8;
var unity_size_z = 2;



function canvas_setup() {
	//função executada ao carregar a página.
	//	-inicializa as variáveis necessárias para controle do canvas;
	//	-reposiciona o canvas com o ponto (0, 0) no centro;
	//	-cria e coloca todos os pontos da função no array nodes[];
	//	-rotaciona um pouco o gráfico para melhorar a visualização;
	//	-inicia uma animação de rotação do gráfico.

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	context.translate(context.canvas.width/2, context.canvas.height/2);

	create_function_points();
	rotate_3d_x(3.14/2);
	rotate_3d_z(0.5);
	rotate_animation();
}



function rotate_3d_x(theta){
	//funçao que rotaciona todos os pontos em torno do eixo X;

	var cos = Math.cos(theta);
	var sin = Math.sin(theta);

	for (var i=0; i<coord_nodes.length;i++){
		nodeY = coord_nodes[i][1];
		nodeZ = coord_nodes[i][2];

		coord_nodes[i][1] = (cos*nodeY) - (sin*nodeZ);
		coord_nodes[i][2] = (cos*nodeZ) + (sin*nodeY);
	}

	for (var i=0; i<nodes.length;i++){
		nodeY = nodes[i][1];
		nodeZ = nodes[i][2];

		nodes[i][1] = (cos*nodeY) - (sin*nodeZ);
		nodes[i][2] = (cos*nodeZ) + (sin*nodeY);
	}
}

function rotate_3d_y(theta){
	//funçao que rotaciona todos os pontos em torno do eixo Y;

	var cos = Math.cos(theta);
	var sin = Math.sin(theta);

	for (var i=0; i<coord_nodes.length;i++){
		nodeX = coord_nodes[i][0];
		nodeZ = coord_nodes[i][2];
		
		coord_nodes[i][0] = (cos*nodeX) - (sin*nodeZ);
		coord_nodes[i][2] = (cos*nodeZ) + (sin*nodeX);
	}

	for (var i=0; i<nodes.length;i++){
		nodeX = nodes[i][0];
		nodeZ = nodes[i][2];

		nodes[i][0] = (cos*nodeX) - (sin*nodeZ);
		nodes[i][2] = (cos*nodeZ) + (sin*nodeX);
	}
}

function rotate_3d_z(theta){
	//funçao que rotaciona todos os pontos em torno do eixo Z;

	var cos = Math.cos(theta);
	var sin = Math.sin(theta);

	for (var i=0; i<coord_nodes.length;i++){
		nodeX = coord_nodes[i][0];
		nodeY = coord_nodes[i][1];

		coord_nodes[i][0] = (cos*nodeX) - (sin*nodeY);
		coord_nodes[i][1] = (cos*nodeY) + (sin*nodeX);
	}

	for (var i=0; i<nodes.length;i++){
		nodeX = nodes[i][0];
		nodeY = nodes[i][1];

		nodes[i][0] = (cos*nodeX) - (sin*nodeY);
		nodes[i][1] = (cos*nodeY) + (sin*nodeX);
	}
}

function function_plot(){
	//função que desenha no canvas todos os pontos da função.
	//inicialmente, eu usava circulos para desenhar os pontos, mas a renderiza-
	//ção de círculos é bem mais custosa que a de retangulos, por isso fiz a
	//substituição.

	for(var i=0; i<nodes.length; i++){
		context.beginPath();
		context.fillStyle = nodes[i][3];		
		context.fillRect(nodes[i][0], nodes[i][1], 3, 3);
		//context.fillStyle = "#000";
		//context.arc(nodes[i][0], nodes[i][1], 2, 0, 2*Math.PI);
		context.stroke();
	}		
}

function axis_plot() {
	//função que desenha no canvas as linhas dos eixos e seus nomes para
	//ajudar perceber a posição da superfície da função.

	for(var i=0; i<coord_nodes.length; i=i+2){
		context.beginPath();
		context.moveTo(coord_nodes[i][0], coord_nodes[i][1]);
		context.lineTo(coord_nodes[i+1][0], coord_nodes[i+1][1]);
		context.fillStyle = "#800080";
		context.fillText(coord_names[i/2], coord_nodes[i+1][0], coord_nodes[i+1][1]);
		context.stroke();
	}
}

function name_plot() {
	//função que escreve no topo esquerdo do canvas a função que está sendo
	//plotada.

	context.fillStyle = "#800080";
	context.fillText("f(x, y) = 4*sin(sqrt(x^2 + y^2))", -280, -280);
}

function plot(){
	//função que chama todas as funções que realizam desenhos no canvas;

	context.clearRect(-300, -300, context.canvas.width, context.canvas.height);

	name_plot();
	axis_plot();			
	function_plot();
}

function rotate_animation(){
	//função que gera a animação de rotação.

	var theta = 0.005;

	rotate_3d_y(theta);
	//rotate_3d_x(theta);	
	//rotate_3d_z(theta);

	plot();

	requestAnimationFrame(rotate_animation);
}

function create_function_points(){

	//função que cria e coloca no array nodes[] os pontos da função, num
	//intervalo de -25 a 25. no totão são feitos 26^2 pontos.

	for (var x=-25; x<=25; x++) {
		for (var y=-25; y<=25; y++) {
			z = 4*Math.sin(Math.sqrt(x*x + y*y));

			var aux = [];

			aux.push(x*unity_size);
			aux.push(y*unity_size);
			aux.push(z*unity_size_z);

			if (z>=0)
				aux.push(nodes_colors[1]);
			else
				aux.push(nodes_colors[0]);
			nodes.push(aux);					
		}
	}
}