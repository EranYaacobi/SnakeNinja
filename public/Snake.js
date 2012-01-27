var Point = function(x, y)
{
    this.x = x;
    this.y = y;
    this.Advance = function(amount, direction)
    {
        this.x += Math.sin(Math.PI + this.Rotation * Math.PI / 180);
        this.y += Math.cos(Math.PI + this.Rotation * Math.PI / 180);
    }
}

var TimedPoint = function(time, point)
{
    this.time = time;
    this.point = point;
    this.Advance = function(timePassed, speed, direction)
    {
        this.time -= timePassed;
        this.point.Advance(speed * timePassed, direction);
    }
    
    this.AddTime = function(timeAdded)
    {
        this.time += timeAdded;
    }
    
    this.IsAlive = function()
    {
        return (time > 0);
    }
}

var PLAYER_SPEED = 100;
var PLAYER_ROTATION_SPEED = 420;
var PLAYER_RELOAD_TIME = 0.25;
var SPACE_FRICTION = 2;

var Snake = function(name, guid, remote, team)
{
    this.Name = name;
    this.Guid = guid;
    this.Remote = remote
    
    this.Team = team;
    this.Speed = PLAYER_SPEED;
    this.RotationSpeed = PLAYER_ROTATION_SPEED;
    this.Alive = false;
    
    this.Spawn = function(head, direction, length)
    {
        this.Length = length;
        this.Points = [];
        this.Points.push(new TimedPoint(length, head))
	    this.Direction = direction;
	    this.Alive = true;
	};
    
    this.Update = function(timePassed)
    {
        timePassed = timePassed / 1000;
        var newPoint = new TimedPoint(this.Length, this.Head.x, this.Head.y);
        newPoint.Advance(timePassed, this.Speed, this.Direction);
        this.Points.push(newPoint);
        
        // Advance head\tail.
        for (var i = 0; i < this.Points.length; i++)
        {
            var point = this.Points[i];
            
            if (point.IsAlive == false)
                this.Points.shift;
            else
                break;
        }    
    }
    
    this.Shoot = function () {
        if (this.Lives > 0 && this.Reload === 0) {


	        var shot = new Laser();
	        shot.Init(this.Pos.X, this.Pos.Y, this.Rotation, this.shiptype, this.shotguid++);
	        this.Shots.push(shot);
	        game.SendShot(shot);
	        this.Reload = PLAYER_RELOAD_TIME;
	    }
	};
}



	this.Update = function (dt) {
	    var SMOOTHING_THRESHOLD = 600;
	    /** Different calculation for enemy client */
	    if (!this.isMyPlayer) {
	        /** Animation smoothing */
	        if (this.state1 && this.state2) {
	            var basestate = this.State1IsBase ? this.state1 : this.state2;
	            var movestate = this.State1IsBase ? this.state2 : this.state1;

	            var timeSinceLastData = new Date().getTime() - game.lastDataReceiveTime;
	            var timestampdiff = movestate.timestamp - basestate.timestamp;

	            var rotdiff = movestate.Rot - basestate.Rot;
	            var posdiffX = movestate.Pos.X - basestate.Pos.X;
	            var posdiffY = movestate.Pos.Y - basestate.Pos.Y;

	            if (posdiffX >= SMOOTHING_THRESHOLD || posdiffX <= -SMOOTHING_THRESHOLD || posdiffY >= SMOOTHING_THRESHOLD || posdiffY <= -SMOOTHING_THRESHOLD) {
	                basestate = movestate;
	                timestampdiff = 0;
	            }

	            if (timestampdiff == 0) timestampdiff = timeSinceLastData;

	            this.Rotation = basestate.Rot + rotdiff * (timeSinceLastData / timestampdiff);
	            this.Pos.X = basestate.Pos.X + posdiffX * (timeSinceLastData / timestampdiff);
	            this.Pos.Y = basestate.Pos.Y + posdiffY * (timeSinceLastData / timestampdiff);
	        }
	        return;
	    }

	    if (this.Rotating !== 0) this.Rotation += this.Rotating * dt * PLAYER_ROTATION_SPEED;

	    if (this.Shooting === true)
	        this.Shoot();

	    if (this.Reload !== 0) {
	        this.Reload -= dt;
	        if (this.Reload <= 0) this.Reload = 0;
	    }

	    if (this.Pos.X >= CANVASWIDTH + CANVAS_BORDER_SPACE) this.Pos.X -= CANVASWIDTH;
	    if (this.Pos.X <= -CANVAS_BORDER_SPACE) this.Pos.X += CANVASWIDTH;
	    if (this.Pos.Y >= CANVASHEIGHT + CANVAS_BORDER_SPACE) this.Pos.Y -= CANVASHEIGHT;
	    if (this.Pos.Y <= -CANVAS_BORDER_SPACE) this.Pos.Y += CANVASHEIGHT;


	    /** calculate forward */
	    this.Forward.X = Math.sin(Math.PI + this.Rotation * Math.PI / 180);
	    this.Forward.Y = Math.cos(Math.PI + this.Rotation * Math.PI / 180);

	    /** acceleration effect on speed */
	    if (this.Accelerating) {
	        this.Speed.X += dt * PLAYER_ACCELERATION_SPEED * this.Forward.X * this.Accelerating;
	        this.Speed.Y += dt * PLAYER_ACCELERATION_SPEED * this.Forward.Y * this.Accelerating;
	    }

	    /** speed cap */
	    if (this.Speed.X >= PLAYER_SPEED_CAP) this.Speed.X = PLAYER_SPEED_CAP;
	    if (this.Speed.X <= -PLAYER_SPEED_CAP) this.Speed.X = -PLAYER_SPEED_CAP;
	    if (this.Speed.Y >= PLAYER_SPEED_CAP) this.Speed.Y = PLAYER_SPEED_CAP;
	    if (this.Speed.Y <= -PLAYER_SPEED_CAP) this.Speed.Y = -PLAYER_SPEED_CAP;

	    /** Deceleration */
	    if (this.Speed.X >= 0) {
	        this.Speed.X += -dt * SPACE_FRICTION;
	        if (this.Speed.X <= 0)
	            this.Speed.X = 0;
	    }

	    var frictiondir;
	    frictiondir = this.Speed.X >= 0 ? -1 : 1;
	    this.Speed.X += frictiondir * dt * SPACE_FRICTION;
	    if ((frictiondir <= 0 && this.Speed.X <= 0) || (frictiondir >= 0 && this.Speed.X >= 0)) this.Speed.X = 0;

	    frictiondir = this.Speed.Y >= 0 ? -1 : 1;
	    this.Speed.Y += frictiondir * dt * SPACE_FRICTION;
	    if ((frictiondir <= 0 && this.Speed.Y <= 0) || (frictiondir >= 0 && this.Speed.Y >= 0)) this.Speed.Y = 0;

	    this.Pos.X += this.Speed.X;
	    this.Pos.Y += this.Speed.Y * -1;
	};

	this.Hit = function () {
		if (this.Alive)
		{
			this.Lives--;
			if (this.Lives <= 0)
			    this.Destroy();
		}
	};

	this.Destroy = function () {
	    //FIX. badly
	    this.Lives = 0;
	    this.Alive = false;
	    if (jQuery("input:checked").length) explosionsound.play();
	    var explosion = jQuery("#explosiondiv" + this.shiptype).css('left', this.Pos.X - 50).css('top', this.Pos.Y - 60).removeClass("invis");
	    setTimeout(function () {
	        explosion.addClass("invis");
	    }, 750);

		if (this.isMyPlayer) game.myPlayerDeath();
	};

	this.Draw = function () {
	    if (this.Lives > 0) {
	        var img = this.shiptype == 1 ? imgship1 : imgship2;
	        game.backBufferContext2D.save();
	        game.backBufferContext2D.translate(this.Pos.X, this.Pos.Y);

		game.backBufferContext2D.font = "bold 10px sans-serif";
		game.backBufferContext2D.fillStyle = "White";
		game.backBufferContext2D.fillText(this.name || "No Name", -img.width / 2, -img.height / 2 - 10);

		game.backBufferContext2D.fillStyle = this.isMyPlayer ? "rgba(0, 255, 0, 0.8)" : "rgba(255, 0, 0, 0.8)";
		game.backBufferContext2D.fillRect(-img.width / 2, -img.height / 2, 5 * this.Lives, 5);
		game.backBufferContext2D.strokeStyle = "rgba(250,250,250, 1)";
		game.backBufferContext2D.strokeRect(-img.width / 2, -img.height / 2, 50, 5);

	        game.backBufferContext2D.rotate(this.Rotation * Math.PI / 180);
	        game.backBufferContext2D.drawImage(img, -img.width / 2, -img.height / 2);
	        game.backBufferContext2D.restore();
	    }
	};

	this.UpdateData = function (/** server player obj */playerdata, T) {
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
	};
};