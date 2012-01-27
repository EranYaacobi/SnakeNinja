jQuery(function(){
        var canvas = jQuery("#GameCanvas");
    
        canvas.drawImage({
            source: "images/fish.jpg",
            x: 150, y: 150
    });
<<<<<<< HEAD
});
=======

var UPDATES_PER_SECOND = 30;
var UPDATE_TIME = 1000 / UPDATES_PER_SECOND;

var Game = function () {
	var that = this;
	var gameLoop = null;

	this.Init = function () {
		gameLoop = setIntevral(Loop, UPDATE_TIME);
	};

	var Loop = function () {
		that.Update();
		that.Draw();
	};
	
	this.Update = function () {
	};	
	
	this.Draw = function () {
	};
};
>>>>>>> Github/master
