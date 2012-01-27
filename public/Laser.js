var LASER_SPEED = 100;
var LASER_ROTATION_SPEED = 420;

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
    };
    
    this.Update = function(timePassed)
    {
        timePassed = timePassed / 1000;

        if (this.Alive)
        {
            if (!this.remote)
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
        if (this.Alive)
        {
            for (var i = 0; i < this.Points.length; i++)
            {
                var image = this.Game.Resources.imgLaser;
                
                graphics.save();
                graphics.translate(this.Position.X, this.Position.Y);
                
                graphics.rotate(this.Direction * Math.PI / 180);
                graphics.drawImage(image, -image.width / 2, -image.height / 2);
                graphics.backBufferContext2D.restore();
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