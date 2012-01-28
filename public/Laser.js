var LASER_SPEED = 120;

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
        
        this.Alive = true;
    };
    
    this.Update = function(timePassed)
    {
        timePassed = timePassed / 1000;

        if (this.Alive)
        {
            if (!this.remote)
            {
                this.Position.Update(this.Speed * timePassed, this.Direction);
            }
            else
            {
                // Implement ugly code.
            }
        }
    };
    
    this.Draw = function()
    {
        if (this.Alive)
        {
            for (var i = 0; i < this.Points.length; i++)
            {
                jQuery("<div class='Laser' />").css({left:this.Position.X,
                                                     top: this.Position.Y}).transform({rotate: this.Direction + 'deg'}).appendTo(this.Game.Element);
            }
        }
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