/* 

Maya Finkman
Creative Coding Final Project
	psuedo code:
	
	Need: 
		-images for map, each country
		- button to go to each location, a back button, button to take picture
		-camera vision library to insert a photo of yourself
		- time of day API to change the picture of each location accordingly



*/
var mapImg;

function preload() {
	mapImg = loadImage('worldMap.jpg');
  }
function setup() {
	createCanvas(1000, 1000);
	background(0);
	image(mapImg, 0, 0);
	loadJSON("https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp=1331161200&key=AIzaSyCt9gC0oHgQtu0hcOQTxycu5iVqsoLndLI", gotData);

}

function draw() {
	

}