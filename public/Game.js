SnakeNinja = {};

var UPDATES_PER_SECOND = 30;
var UPDATE_TIME = 1000 / UPDATES_PER_SECOND;
var SEND_DATA_PER_SECOND = 1;
var SEND_DATA_TIME = 1000 / SEND_DATA_PER_SECOND;

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

SnakeNinja.Game = function () {
	var that = this;
	var gameLoop = null;
    var sendDataLoop = null;

    this.Element = jQuery(".AltCanvas");
    
    var lastFrame = null;
    
    this.Snakes = [];
    this.mySnake = null;
    this.Pizzas = [];
    this.Shots = [];
    this.Powerups = [];
    
    this.Resources = {};
    
    var connected = false;
    var socket;
    
    /** load images and sound */
    var loadResources = function (callback) {
        for (var item in resourcestoload)
            loadResource(item, callback);
	};

	var loadResource = function (name, callback) {
        var toload = resourcestoload[name];
        if (!toload) {
            
            return;
	    }

	    if (toload.type == "sound") {
            that.Resources[name] = new Audio();
	        that.Resources[name].src = toload.src;
	        that.Resources[name].preload = "auto";
	        that.Resources[name].addEventListener('canplaythrough', function () { toload.loaded = true; checkAllLoaded(callback); }, false);
	    }

	    if (toload.type == "image") {
            that.Resources[name] = new Image();
	        that.Resources[name].src = toload.src;
	        that.Resources[name].onload = function () { toload.loaded = true; checkAllLoaded(callback); };
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
    
	this.Init = function () {
        jQuery(document).keydown(that.onKeyDown);
        jQuery(document).keyup(that.onKeyUp);
        loadResources(function () {
            gameLoop = setInterval(Loop, UPDATE_TIME);
        });
	};
    
    var Connect = function () {
        socket = io.connect();
        socket.emit('join', {});
        socket.on('serverdata', ReceiveData);
        socket.on('joinconfirmed', function (id) {
            
            sendDataLoop = setInterval(SendData, SEND_DATA_TIME);
            
            lastFrame = new Date().getTime();
            that.mySnake = new SnakeNinja.Snake(that);
            that.mySnake.Init("player1", id, false, id);
            that.mySnake.Spawn(new SnakeNinja.Structures.Point(100, 200), 0, 5);
            var pizza = new SnakeNinja.Pizza(that);
            pizza.Spawn(new SnakeNinja.Structures.Point(25, 25), 2, 30000);
            that.Pizzas.push(pizza);
        });
    };
    var serverTimeStamp = null;
    var GetSnakeIndex = function (ID) {
        for (var i in that.Snakes)
            if (that.Snakes[i].ID == ID)
                return i;
        return -1;
    };
    
    var ReceiveData = function (timestamp, snakesdata) {
        serverTimeStamp = timestamp;
        
        for (var i in that.Snakes) {
            var snake = that.Snakes[i];
            snake.updated = false;
        }
        
        for (var i in snakesdata) {
            var snakedata = snakesdata[i];
            
            var index = GetSnakeIndex(snakedata.ID);
            if (index == -1) {
                /** add a new snake */
                var newsnake = new NinjaSnake.Snake();
                //newsnake.Init();
                //newsnake.Spawn();
                newsnake.UpdateData(snakedata);
                newsnake.updated = true;
                that.Snakes.push(newsnake);
            }
            else {
                that.Snakes[index].UpdateData(snakedata);
                that.Snakes[index].updated = true;
            }
        }
        
        for (var i in that.Snakes) {
            if (!that.Snakes[i].updated)
                /** remove snake */
                that.Snakes.splice(i, 1);
            
        }
        
        /** put snakes in Snakes */
        /*for (var i in that.Snakes) {
            var snake = that.Snakes[i];
            //that.mySnake.UpdateData();
        }*/
    };

    var SendData = function () {
        socket.emit('playerdata', that.mySnake.GetData());
    };

	var Loop = function () {
        var now = new Date().getTime();
        var timediff = now - lastFrame;
        lastFrame = new Date().getTime();
        
		that.Update(timediff);
		that.Draw();
	};
	
	this.Update = function (timediff) {
        /** Handle input */
        if (enter && !connected) {
            connected = true;
            Connect();
        }
        
        
        if (that.mySnake)
            that.mySnake.ReceiveInput({
                left: leftKey,
                right: rightKey,
                action: actionKey });
        
        /** update pizzas */
        for (var i in that.Pizzas)
            that.Pizzas[i].Update(timediff);
        
        /** update shots */
        for (var i in that.Shots)
            that.Shots[i].update(timediff);
        
        /** update powerups */
        
        /** update snakes */
        if (that.mySnake)
            that.mySnake.Update(timediff);
	};
	
	this.Draw = function () {
        /** draw pizzas */
        for (var i in that.Pizzas)
            that.Pizzas[i].Draw();
            
        /** draw shots */
        for (var i in that.Shots)
            that.Shots[i].Draw();
        
        /** draw powerups */
        
        /** draw snakes */
        if (that.mySnake)
            that.mySnake.Draw();
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

	    if (evt.keyCode == 13) enter = true;
	};
};

jQuery(function () {
    Game = new SnakeNinja.Game();
    Game.Init();
});