<<<<<<< HEAD
=======
jQuery(function(){
        var canvas = jQuery("#GameCanvas");
    
        canvas.drawImage({
            source: "images/fish.jpg",
            x: 150, y: 150
    });
<<<<<<< HEAD
});
=======

>>>>>>> origin/master
var UPDATES_PER_SECOND = 30;
var UPDATE_TIME = 1000 / UPDATES_PER_SECOND;

var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;

var Game = function () {
	var that = this;
	var gameLoop = null;

    this.canvas = null;
    this.context2D = null;
    this.backBuffer = null;
    this.backBufferContext2D = null;

    var initCanvas = function () {
        jQuery(".SnakeNinja").each(function () {
            that.canvas = this;
            that.canvas.width = CANVAS_WIDTH;
            that.canvas.height = CANVAS_HEIGHT;
            that.context2D = that.canvas.getContext('2d');
        });
    };

	this.Init = function () {
        initCanvas();
		gameLoop = setInterval(Loop, UPDATE_TIME);
	};

	var Loop = function () {
		that.Update();
		that.Draw();
	};
	
	this.Update = function () {
	};	
	
	this.Draw = function () {
        
	};
    
    var rightKey = false;
    var leftKey = false;
	var upKey = false;
	var downKey = false;
	var spaceKey = false;

	var enter = false;
    
    this.onKeyUp = function (evt) {
        if (evt.keyCode == 39) rightKey = false;
		else if (evt.keyCode == 37) leftKey = false;
		if (evt.keyCode == 38) upKey = false;
		else if (evt.keyCode == 40) downKey = false;
		if (evt.keyCode == 32) spaceKey = false;

		if (evt.keyCode == 13) enter = false;
	};
    
    this.onKeyDown = function (evt) {
        if (evt.keyCode == 39) rightKey = true;
	    else if (evt.keyCode == 37) leftKey = true;
	    if (evt.keyCode == 38) upKey = true;
	    else if (evt.keyCode == 40) downKey = true;
	    if (evt.keyCode == 32) spaceKey = true;

	    //if (evt.keyCode == 13)
	};
};
<<<<<<< HEAD

jQuery(function () {
    var game = new Game();
    game.Init();
});
=======
>>>>>>> Github/master
>>>>>>> origin/master
