var UPDATES_PER_SECOND = 30;
var UPDATE_TIME = 1000 / UPDATES_PER_SECOND;

var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;

var resourcestoload = {
    /*"sndEat" : {
        loaded : false,
        type : "sound",
        src : ""},
    "sndPowerup" : {
        loaded : false,
        type : "sound",
        src : ""},
    "imgSnake" : {
        loaded : false,
        type : "image",
        src : ""},*/
    "imgPizza" : {
        loaded : false,
        type : "image",
        src : "Images/pizza.gif"}/*,
    "imgPowerup" : {
        loaded : false,
        type : "image",
        src : ""}*/
};

var Game = function () {
	var that = this;
	var gameLoop = null;

    this.canvas = null;
    this.context2D = null;
    this.backBuffer = null;
    this.backBufferContext2D = null;
    
    var lastFrame = null;
    
    this.Snakes = [];
    this.mySnake = null;
    this.Pizzas = [];
    this.Powerups = [];
    
    this.resources = {};
    
    /** load images and sound */
    var loadResources = function (callback) {
        for (var item in resourcestoload)
            loadResource(item, callback);
	};

	var loadResource = function (name, callback) {
        var toload = resourcestoload[name];
        if (!toload) {
            alert('undefined loadable');
            return;
	    }

	    if (toload.type == "sound") {
            that.resources[name] = new Audio();
	        that.resources[name].src = toload.src;
	        that.resources[name].preload = "auto";
	        that.resources[name].addEventListener('canplaythrough', function () { toload.loaded = true; checkAllLoaded(callback); }, false);
	    }

	    if (toload.type == "image") {
            that.resources[name] = new Image();
	        that.resources[name].src = toload.src;
	        that.resources[name].onload = function () { toload.loaded = true; checkAllLoaded(callback); };
	    }
	};

	var checkAllLoaded = function (callback) {
        var flag = true;
        for (var item in resourcestoload)
            if (resourcestoload[item].loaded !== true)
                flag = false;
	    
	    if (flag && !this.loaded)
            callback();
	};
    
    var initCanvas = function () {
        jQuery(".SnakeNinja").each(function () {
            that.canvas = this;
            that.canvas.width = CANVAS_WIDTH;
            that.canvas.height = CANVAS_HEIGHT;
            that.context2D = that.canvas.getContext('2d');
            that.backBuffer = document.createElement('canvas');//jQuery('<canvas />');
            that.backBuffer.width = CANVAS_WIDTH;
            that.backBuffer.height = CANVAS_HEIGHT;
            that.backBufferContext2D = that.backBuffer.getContext('2d');
        });
    };
    

	this.Init = function () {
        initCanvas();
        loadResources(function () {
            gameLoop = setInterval(Loop, UPDATE_TIME);
        });
	};
    
    this.Start = function () {
        lastFrame = new Date().getTime();
    };

	var Loop = function () {
        var now = new Date().getTime();
        var timediff = now - lastFrame;
        lastFrame = new Date().getTime();
        
		that.Update(timediff);
		that.Draw();
	};
	
	this.Update = function (timediff) {
        if (that.mySnake)
            that.mySnake.ReceiveInput({
                left: leftKey,
                right: rightKey,
                action: actionKey });
        
        /** update pizzas */
        
        /** update powerups */
        
        /** update snakes */
	};
	
	this.Draw = function () {
        /** clear backbuffer */
	    that.backBufferContext2D.clearRect(0, 0, that.backBuffer.width, that.backBuffer.height);
        
        /** draw pizzas */
        
        /** draw powerups */
        
        /** draw snakes */
        
        drawBackBuffer();
	};
    
    var drawBackBuffer = function () {
		that.context2D.clearRect(0, 0, that.canvas.width, that.canvas.height);
		that.context2D.drawImage(that.backBuffer, 0, 0);
	};
    
    var rightKey = false;
    var leftKey = false;
	var actionKey = false;

	var enter = false;
    
    this.onKeyUp = function (evt) {
        if (evt.keyCode == 39) rightKey = false;
		else if (evt.keyCode == 37) leftKey = false;
		if (evt.keyCode == 32) actionKey = false; // space

		if (evt.keyCode == 13) enter = false;
	};
    
    this.onKeyDown = function (evt) {
        if (evt.keyCode == 39) rightKey = true;
	    else if (evt.keyCode == 37) leftKey = true;
	    if (evt.keyCode == 32) actionKey = true;

	    //if (evt.keyCode == 13)
	};
};

jQuery(function () {
    var game = new Game();
    game.Init();
});