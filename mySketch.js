/* 

Maya Finkman
Creative Coding Final Project
	psuedo code:
	
	Need: 
		! button to go to each location, a back button
		! time of day API to change the picture of each location accordingly
		- add photos for night and day with image cut out
		- screenshot?
		- add camera vision library

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
let locationURLs = ['http://worldtimeapi.org/api/timezone/America/New_York', 'http://worldtimeapi.org/api/timezone/America/Los_Angeles', 'http://worldtimeapi.org/api/timezone/Europe/Paris', 'http://worldtimeapi.org/api/timezone/Asia/Jerusalem', 'http://worldtimeapi.org/api/timezone/Africa/Johannesburg', 'http://worldtimeapi.org/api/timezone/Asia/Tokyo'];
let locationTimeArray = []; //array that each hour variable from the location urls are pushed into
let place;
var planeAnimation; //animation for homepage
var globeAnimation; //animation for homepage
let myCanvas; //setup canvas

function preload() {
	myFont = loadFont('TravelGoals.otf');
	mapImg = loadImage('worldMap.png'); //background image of homepage
	//every image i need
	LADayimg = loadImage('LA_day.png');
	LANightimg = loadImage('LA_night.png');
	NYDayimg = loadImage('NY_day.png');
	NYNightimg = loadImage('NY_night.png');
	ISDayimg= loadImage('IS_day.png');
	ISNightimg= loadImage('IS_night.png');
	PSDayimg= loadImage('PS_day.png');
	PSNightimg= loadImage('PS_day.png');
	CTDayimg= loadImage('CT_day.png');
	CTNightimg= loadImage('CT_night.png');
	TYDayimg = loadImage('TY_day.png');
	TYNightimg = loadImage('TY_night.png');
	//get each api call with each location URL
	for (let x=0; x<6;x++){
		loadJSON(locationURLs[x], gotData);
	}
	planeAnimation = loadAnimation("plane_1.png", "plane_2.png");
	globeAnimation = loadAnimation("globe_1.png", "globe_2.png", "globe_3.png", "globe_4.png");
	
}

function setup() {
	frameRate(4);
	myCanvas = createCanvas(1000, 750);
	background(255);
	cam = createCapture(VIDEO);
	
}

function draw() {
	cam.hide();
	//print(isNight);
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
		Paris();
	}
	else if (currentScreen===6){
		Israel();
	}
	else if (currentScreen ===7){
		CapeTown();
		
	}
	else if (currentScreen === 8){
		Tokyo();
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
	image(mapImg, 0, 0);
}

function LosAngeles(){
	background(255);
	image(cam, -50, 475, width/2, height/2);
	checkTime(locationTimeArray[1]);
	if(isNight){
		image(LANightimg,0,0);
	}
	else{
		image(LADayimg,0,0);
	}
	BackButton();
	ScreenshotButton();
}
function NewYork(){
	background(255);
	image(cam, -50, 475, width/2, height/2);
	checkTime(locationTimeArray[0]);
	if(isNight){
		image(NYNightimg,0,0);
	}
	else{
		image(NYDayimg,0,0);
	}
	BackButton();
	ScreenshotButton();
}
function Paris(){
	background(255);
	image(cam, -50, 475, width/2, height/2);
	checkTime(locationTimeArray[2]);
	if(isNight){
		image(PSNightimg,0,0);
	}
	else{
		image(PSDayimg,0,0);
	}
	BackButton();
	ScreenshotButton();
}
function Israel(){
	background(255);
	image(cam, -50, 475, width/2, height/2);
	checkTime(locationTimeArray[3]);
	if(isNight){
		image(ISNightimg,0,0);
	}
	else{
		image(ISDayimg,0,0);
	}
	BackButton();
	ScreenshotButton();
}
function CapeTown(){
	background(255);
	image(cam, -50, 475, width/2, height/2);
	checkTime(locationTimeArray[4]);
	if(isNight){
		image(CTNightimg,0,0);
	}
	else{
		image(CTDayimg,0,0);
	}
}
function Tokyo(){
	background(255);
	image(cam, -50, 475, width/2, height/2);
	checkTime(locationTimeArray[5]);
	if(isNight){
		image(TYNightimg,0,0);
	}
	else{
		image(TYDayimg,0,0);
	}
	BackButton();
	ScreenshotButton();
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
		if( (mouseX >= 440 && mouseX<=480)&& (mouseY>=220 && mouseY<=265) ){ //if the mouse presses in the range of the paris pin stamp
				currentScreen = 5;}
		if( (mouseX >= 545 && mouseX<=580)&& (mouseY>=270 && mouseY<=310) ){ //if the mouse presses in the range of the tel aviv pin stamp
				currentScreen = 6;}
		if( (mouseX >= 500 && mouseX<=525)&& (mouseY>=530 && mouseY<=567) ){ //if the mouse presses in the range of the cape town pin stamp
				currentScreen = 7;}
		if( (mouseX >= 880 && mouseX<=915)&& (mouseY>=250 && mouseY<=300) ){ //if the mouse presses in the range of the tokyo pin stamp
				currentScreen = 8;}
	}
	if (currentScreen>=3){
		if(mouseX <=84 && mouseY<=100){ //if the mouse presses in the range of back button, go to map
				currentScreen = 2;}
		if(mouseX>=916 && mouseY<=100){
			saveCanvas(myCanvas, "meTraveling.jpg");
		}
	}
}

function BackButton(){
	textFont('Helvetica');
	strokeWeight(2);
	if (isNight){
		stroke(255);
		fill(255);
	}
	else{
		stroke(0);
		fill(0);
	}
	line(84,0,84,100);
	line(0,100,84,100);
	textSize(15);
	strokeWeight(1);
	textAlign(CENTER, CENTER);
	text("Back", 24, 55);
	text("to", 40, 70);
	text("Map", 57,85);
}
function ScreenshotButton(){
	textFont('Helvetica');
	strokeWeight(2);
	if (isNight){
		stroke(255);
		fill(255);
	}
	else{
		stroke(0);
		fill(0);
	}
	line(916,0,916,100);
	line(1000,100,916,100);
	textSize(15);
	strokeWeight(1);
	textAlign(CENTER, CENTER);
	text("Take", 976, 55);
	text("A", 960, 70);
	text("Photo!", 943,85);
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








