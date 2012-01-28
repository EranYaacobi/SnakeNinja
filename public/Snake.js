var PLAYER_SPEED = 100;
var PLAYER_ROTATION_SPEED = 420;
var PLAYER_RELOAD_TIME = 0.25;

SnakeNinja.Snake = function(game) {
    this.Game = game;
    this.Elements = [];
    
    this.Init = function(name, guid, remote, team)
    {
        this.Name = name;
        this.Guid = guid;
        this.Remote = remote;
        
        this.Team = team;
        this.Speed = PLAYER_SPEED;
        this.RotationSpeed = PLAYER_ROTATION_SPEED;
        this.Alive = false;
    };
    
    this.Spawn = function(head, direction, length)
    {
        this.Length = length;
        this.Points = [];
        this.Points.push(new SnakeNinja.Structures.TimedPoint(length, head));
	    this.Direction = direction;
	    this.Alive = true;
        this.Action = SnakeNinja.Structures.Action.Nothing;
	};
    
    this.Update = function(timePassed)
    {
        timePassed = timePassed / 1000;

        if (this.Alive)
        {
            if (!this.remote)
            {
                // Add new point.
                var newPoint = new SnakeNinja.Structures.TimedPoint(this.Length, this.Points[this.Points.length - 1]);
                newPoint.Update(0, this.Speed, this.Direction);
                this.Points.push(newPoint);
                
                // Advance head\tail.
                for (var i = 0; i < this.Points.length; i++)
                {
                    var point = this.Points[i];
                    
                    point.Update(timePassed);
                    if (!point.IsAlive)
                        this.Points.shift();
                }
                
                this.ActionReloadTime -= timePassed;
                
                // Perform actions.
                if (this.Keys.left)
                    this.Direction += this.RotationSpeed * timePassed;
                if (this.Keys.right)
                    this.Direction -= this.RotationSpeed * timePassed;
                if (this.Keys.action)
                    this.PerformAction();
            }
            else
            {
                // Implement ugly code.
            }
        }
    };
    
    this.Draw = function(graphics)
    {
        jQuery(this.Elements).each(function()
        {
            jQuery(this).remove();
        });
        this.Elements=[];
        if (this.Alive)
        {
            for (var i = 0; i < this.Points.length; i++)
            {
                this.Elements.push(jQuery("<div class='SnakePoint' />").css({left:this.Points[i].Point.X, top: 
                this.Points[i].Point.Y}).appendTo(game.Element));
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
                case SnakeNinja.Structures.Action.Shoot: this.Shoot();
            }
        }
    };
    
    this.Shoot = function()
    {
        var shot = new SnakeNinja.Laser(this.Game);
        var shotGuid = Math.random();

        shot.Init(shotGuid, this.remote, this.team, this, this.Points[this.Points.length - 1].point, this.Direction);
        this.Shots.push(shot);
        this.Game.AddShot(shot);
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
            this.Game.myPlayerDeath();
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