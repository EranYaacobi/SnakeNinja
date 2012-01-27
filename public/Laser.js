var LASER_SPEED = 100;
var LASER_ROTATION_SPEED = 420;
var LASER_RELOAD_TIME = 0.25;

SnakeNinja.Laser = function(game)
{
    this.game = game;
    
    this.Init = function(guid, remote, team, owner, position, direction)
    {   
        this.Guid = guid;
        this.Remote = remote;
        this.Team = team;
        this.Owner = owner;
        this.Position = position;
        this.Direction = direction;
        
        this.Speed = LASER_SPEED;
        this.RotationSpeed = LASER_ROTATION_SPEED;
        
        this.Alive = true;
        this.Image = 
    };
    
    this.Update = function(timePassed)
    {
        timePassed = timePassed / 1000;

        if (this.Alive)
        {
            if (this.remote)
            {
                // Add new point.
                this.Position.Update(this.Speed * timePassed, this.Direction);
            }
            else
            {
                // Implement ugly code.
            }
        }
    };
    
    this.Draw = function(graphics)
    {
        if (this.Alive > 0)
        {
            for (var i = 0; i < this.Points.length; i++)
            {
                graphics.save();
                graphics.translate(this.X, this.Pos.Y);
                
                graphics.rotate(this.Direction * Math.PI / 180);
                graphics.drawImage(this.Image, -this.Image.width / 2, -this.Image.height / 2);
                graphics.backBufferContext2D.restore();
            }
	    }
    };
    
    this.ReceiveInput = function(keys)
    {
        this.Keys = keys;
    };
    
    this.PerformAction = function()
    {
        if (this.ActionReloadTime > 0)
        {
            switch (this.Action)
            {
                case SnakeNinja.Structures.Action.Shoot: this.Shoot(timePassed);
            }
        }
    };
    
    this.Shoot = function()
    {
        var shot = new SnakeNinja/Laser();

        shot.Spawn(this, this.team, this.Points[this.Points.length - 1].point, this.Direction);
        this.Shots.push(shot);
        game.AddShot(shot);
        this.ActionReloadTime = PLAYER_RELOAD_TIME;
	};
    
    this.Increase = function(length)
    {
        for (var i = 0; i < this.Points.length; i++)
            this.Points[i].AddTime(length);
    };
    
    this.Decrease = function(length)
    {
        for (var i = 0; i < this.Points.length; i++)
            this.Points[i].Update(length);
    };
    
    this.Destroy = function()
    {
	    this.Alive = false;
	    // if (jQuery("input:checked").length) explosionsound.play();
	    //var explosion = jQuery("#explosiondiv" + this.shiptype).css('left', this.Pos.X - 50).css('top', this.Pos.Y - 60).removeClass("invis");

		if (this.isMyPlayer)
            game.myPlayerDeath();
	};
};

// server object data.
/*	this.UpdateData = function (playerdata, T) {
	    if (this.State1IsBase) {
	        this.state1 = {
	            Pos: playerdata.P,
	            Rot: playerdata.R,
	            timestamp: T
	        };
	        this.State1IsBase = false;
	    }
	    else {
	        this.state2 = {
	            Pos: playerdata.P,
	            Rot: playerdata.R,
	            timestamp: T
	        };
	        this.State1IsBase = true;
	    }

		if (playerdata.L < this.Lives)
			this.Lives = playerdata.L
	    if (this.Lives == 0 && this.Alive)
	        this.Destroy();
	};*/