var UPDATES_PER_SECOND = 30;
var UPDATE_TIME = 1000 / UPDATES_PER_SECOND;

var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;

var imgPizza = new Image();
var imgSnake = new Image();
var imgPowerup = new Image();
var sndEat = new Audio();
var sndPowerup = new Audio();

var itemstoload = {
    "sndEat" : {
        loaded : false,
        type : "sound",
        src : "",
        obj : sndEat },
    "sndPowerup" : {
        loaded : false,
        type : "sound",
        src : "",
        obj : sndPowerup },
    "imgPizza" : {
        loaded : false,
        type : "image",
        src : "imagePizza.png",
        obj : imgPizza },
    "imgPowerup" : {
        loaded : false,
        type : "image",
        src : "imgPowerup.png",
        obj : imgPowerup },
    "imgSnake" : {
        loaded : false,
        type : "image",
        src : "imgSnake.png",
        obj : imgSnake }
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
    
    /** load images and sound */
    var loadResources = function () {
	    for (var item in itemstoload)
		    loadResource(item);
	};

	var loadResource = function (name) {
	    var toload = itemstoload[name];
	    if (!toload) {
	        alert('undefined loadable');
	        return;
	    }

	    if (toload.type == "sound") {
	        toload.obj.src = toload.src;
	        toload.obj.preload = "auto";
	        toload.obj.addEventListener('canplaythrough', function () { toload.loaded = true; checkAllLoaded(); }, false);
	    }

	    if (toload.type == "image") {
	        toload.obj.src = toload.src;
	        toload.obj.onload = function () { toload.loaded = true; checkAllLoaded(); };
	    }
	};

	var checkAllLoaded = function () {
	    var flag = true;
	    for (var item in itemstoload)
            if (itemstoload[item].loaded !== true)
                flag = false;
	    
	    if (flag && !this.loaded)
	    {
            this.loaded = true;
            jQuery(that).trigger("ResourcesLoaded");
	    }
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
        loadResources();
		gameLoop = setInterval(Loop, UPDATE_TIME);
	};
    
    this.Start = function () {
        lastFrame = new Date().getTime();
    };

	var Loop = function () {
        var now = new Date().getTime();
        var timediff = now - lastFrame;
        lastFrame = new Date().getTime();
        
        if (that.mySnake)
            that.mySnake.ReceiveInput({
                left: leftKey,
                right: rightKey});
        
		that.Update(timediff);
		that.Draw();
	};
	
	this.Update = function (timediff) {
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
	var spaceKey = false;

	var enter = false;
    
    this.onKeyUp = function (evt) {
        if (evt.keyCode == 39) rightKey = false;
		else if (evt.keyCode == 37) leftKey = false;
        
		if (evt.keyCode == 17) spaceKey = false;
		if (evt.keyCode == 13) enter = false;
	};
    
    this.onKeyDown = function (evt) {
        if (evt.keyCode == 39) rightKey = true;
	    else if (evt.keyCode == 37) leftKey = true;
        
	    if (evt.keyCode == 17){ spaceKey = true;
            alert("ctrl clicked");
	    }

	    //if (evt.keyCode == 13)
	};
};

jQuery(function () {
    var game = new Game();
    game.Init();
});