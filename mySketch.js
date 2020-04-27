let currentScreen = 1; //counter for keeping track of which screen is on the page
/* when currentScreen = 1, it is the homepage
	 when currentScreen = 2, it is the map

*/
function preload() {
	myFont = loadFont('TravelGoals.otf');
	mapImg = loadImage('worldMap.png');
	LAimg = loadImage('LosAngeles.jpg');
	NYimg = loadImage('NewYork.jpg');
	Londonimg = loadImage('London.jpg');
}

function setup() {
	createCanvas(1000, 750);
	background(255);
}

function draw() {
	if (currentScreen === 1) {
		homescreen();
	} else if (currentScreen === 2) {
		worldMap();
	}
	else if (currentScreen===3){
		LosAngeles();
	}
	else if (currentScreen===4){
		NewYork();
	}
	else if (currentScreen===5){
		London();
	}

}

//function to display the homescreen
function homescreen() { //currentScreen = 1
	background("#61DCE8");
	textFont(myFont);
	textSize(70);
	textAlign(CENTER);
	text("Welcome to", 500, 150);
	textSize(150);
	text("your travel escape", 500, 275);
	fill("#61E8A9");
	rectMode(CENTER);
	stroke(0);
	rect(490, 500, 250, 150, 20);
	fill(0);
	textAlign(CENTER, CENTER);
	textSize(100);
	text("Enter", 480, 480);
}
//function to display the main map to chose from
function worldMap() {
	background(255);
	image(mapImg, 0, 0);
}

function LosAngeles(){
	background(255);
	image(LAimg,0,0);
	BackButton();
}
function NewYork(){
	background(255);
	image(NYimg,0,0);
	BackButton();
}
function London(){
	background(255);
	image(Londonimg,0,0);
	BackButton();
}

function mousePressed() {
	if (currentScreen === 1) {
		currentScreen = 2;
	}
	if (currentScreen === 2){
		print(mouseX,mouseY);
		if( (mouseX >= 50 && mouseX<=80)&& (mouseY>=260 && mouseY<=300) ){ //if the mouse presses in the range of the los angeles pin stamp
				currentScreen = 3;}
		if( (mouseX >= 200 && mouseX<=230)&& (mouseY>=245 && mouseY<=284) ){ //if the mouse presses in the range of the new york pin stamp
				currentScreen = 4;}
		if( (mouseX >= 430 && mouseX<=465)&& (mouseY>=198 && mouseY<=235) ){ //if the mouse presses in the range of the new york pin stamp
				currentScreen = 5;}
	}
	if (currentScreen>=3){
		if(mouseX <=84 && mouseY<=100){ //if the mouse presses in the range of back button, go to map
				currentScreen = 2;}
	}
}

function BackButton(){
	textFont('Helvetica');
	stroke(0);
	strokeWeight(2);
	line(84,0,84,100);
	line(0,100,84,100);
	textSize(15);
	strokeWeight(1);
	textAlign(CENTER, CENTER);
	text("Back", 24, 55);
	text("to", 40, 70);
	text("Map", 57,85);
}










