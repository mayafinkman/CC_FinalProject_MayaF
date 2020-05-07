/* 

Maya Finkman
Creative Coding Final Project
	psuedo code:
	
	Need: 
		- images for map, each country
		! button to go to each location, a back button, button to take picture
		- camera vision library to insert a photo of yourself
		- time of day API to change the picture of each location accordingly

	Plan:
	Scene counter
		- main map
		- each location image
	Buttons
		-back button
		-click on each location
		- take photo button?
	Each image location
		- use copyright free images or my images
		- change depending on the time of day 

*/
let currentScreen = 1; //counter for keeping track of which screen is on the page
let capture;
let timeData;//gets all the data
let datetime;//gets the current date and time from the depth of the returned array from the api
let timeArray;//separates the time data from the date 
let hourArray; //separaes all the time data so that we can get just the hour
let currentHourString;//the current hour
let currentHourInt;
let isNight; //boolean for knowing whether its night or not 
let locationURLs = ['http://worldtimeapi.org/api/timezone/America/New_York', 'http://worldtimeapi.org/api/timezone/America/Los_Angeles', 'http://worldtimeapi.org/api/timezone/Europe/London', 'http://worldtimeapi.org/api/timezone/Europe/Rome', 'http://worldtimeapi.org/api/timezone/Africa/Johannesburg', 'http://worldtimeapi.org/api/timezone/Asia/Tokyo'];
let locationTimeArray = [];
let place;
var planeAnimation;
var globeAnimation;

function preload() {
	myFont = loadFont('TravelGoals.otf');
	mapImg = loadImage('worldMap.png');
	LAimg = loadImage('LosAngeles.jpg');
	NYimg = loadImage('NewYork.jpg');
	Londonimg = loadImage('London.jpg');
	Veniceimg = loadImage('Venice.jpg');
	CapeTownimg= loadImage('CapeTown.jpg');
	Tokyoimg = loadImage('Tokyo.jpg');
	for (let x=0; x<6;x++){
		loadJSON(locationURLs[x], gotData);
	}
	planeAnimation = loadAnimation("plane_1.png", "plane_2.png");
	globeAnimation = loadAnimation("globe_1.png", "globe_2.png", "globe_3.png", "globe_4.png");
	
}

function setup() {
	frameRate(4);
	createCanvas(1000, 750);
	background(255);
	
}

function draw() {
	//print(isNight);
	if (currentScreen === 1) {
		homescreen();
	} else if (currentScreen === 2) {
		worldMap();
	}
	else if (currentScreen===3){
		LosAngeles();
		checkTime(locationTimeArray[1]);
	}
	else if (currentScreen===4){
		NewYork();
		checkTime(locationTimeArray[0]);
	}
	else if (currentScreen===5){
		London();
		checkTime(locationTimeArray[2]);
	}
	else if (currentScreen===6){
		Venice()
		checkTime(locationTimeArray[3]);
	}
	else if (currentScreen ===7){
		CapeTown();
		checkTime(locationTimeArray[4]);
	}
	else if (currentScreen === 8){
		Tokyo();
		checkTime(locationTimeArray[5]);
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
	animation(planeAnimation, 800, 480);
	animation(globeAnimation, 200,500);
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
function Venice(){
	background(255);
	image(Veniceimg,0,0);
	BackButton();
}
function CapeTown(){
	background(255);
	image(CapeTownimg,0,0);
	BackButton();
}
function Tokyo(){
	background(255);
	image(Tokyoimg,0,0);
	BackButton();
}

function mousePressed() {
	if (currentScreen === 1) {
		currentScreen = 2;
	}
	if (currentScreen === 2){
		//print(mouseX,mouseY);
		if( (mouseX >= 50 && mouseX<=80)&& (mouseY>=260 && mouseY<=300) ){ //if the mouse presses in the range of the los angeles pin stamp
				currentScreen = 3;}
		if( (mouseX >= 200 && mouseX<=230)&& (mouseY>=245 && mouseY<=284) ){ //if the mouse presses in the range of the new york pin stamp
				currentScreen = 4;}
		if( (mouseX >= 430 && mouseX<=465)&& (mouseY>=198 && mouseY<=235) ){ //if the mouse presses in the range of the london pin stamp
				currentScreen = 5;}
		if( (mouseX >= 475 && mouseX<=505)&& (mouseY>=225 && mouseY<=265) ){ //if the mouse presses in the range of the venice pin stamp
				currentScreen = 6;}
		if( (mouseX >= 500 && mouseX<=525)&& (mouseY>=530 && mouseY<=567) ){ //if the mouse presses in the range of the cape town pin stamp
				currentScreen = 7;}
		if( (mouseX >= 880 && mouseX<=915)&& (mouseY>=250 && mouseY<=300) ){ //if the mouse presses in the range of the tokyo pin stamp
				currentScreen = 8;}
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

function gotData(data) {
  timeData = data;
	//print(timeData);
	datetimeString = timeData.datetime;
	timeArray= split(datetimeString, 'T');
	hourArray= split(timeArray[1], ':');
	currentHourString = hourArray[0];
	currentHourInt = parseInt(currentHourString, 10);
	locationTimeArray.push(currentHourInt);
	//print(currentHourInt);
}

function checkTime(time){
	//print(time);
	if((time <=6) || (time>=20)){
		isNight=true;
	}
	else{
		isNight=false;
	}
	
}








