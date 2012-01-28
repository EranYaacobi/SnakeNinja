var PLAYER_SPEED = 100;
var PLAYER_ROTATION_SPEED = 215;
var PLAYER_RELOAD_TIME = 0.25;

SnakeNinja.SnakeData = function(timeStamp, position, direction, length, alive, action, keys)
{
    this.TimeStamp = timeStamp;
    this.Position = position;
    this.Direction = direction;
    this.Length = length;
    this.Alive = alive;
    this.Action = action;
    this.Keys = keys;
}

SnakeNinja.Snake = function(game)
{
    this.Game = game;
    
    this.Init = function(name, guid, remote, team)
    {
        this.Name = name;
        this.Guid = guid;
        this.Remote = remote;
        
        this.Team = team;
        this.Speed = PLAYER_SPEED;
        this.RotationSpeed = PLAYER_ROTATION_SPEED;
        this.Alive = false;
        
        this.States = [];
        this.LastStateIndex = 0;
        this.GuessedPointsCount = 0;
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
    
    this.InternalUpdate = function(timePassed)
    {   
        // Advance head\tail.
        for (var i = 0; i < this.Points.length; i++)
        {
            var point = this.Points[i];
            
            point.Update(timePassed);
            if (!point.IsAlive())
            {
                this.Points.shift();
                i -= 1;
            }
        }
        
        this.ActionReloadTime -= timePassed;

        // Perform actions.
        if (this.Keys.left)
            this.Direction += this.RotationSpeed * timePassed;
        if (this.Keys.right)
            this.Direction -= this.RotationSpeed * timePassed;
        if (this.Keys.action)
            this.PerformAction();   
            
        if (this.Alive)
            this.Destroy();
            
        this.CheckCollision();
    };
    
    this.CheckCollision = function()
    {
    };
    
    this.Update = function(timePassed)
    {
        var newPoint;
        timePassed = timePassed / 1000;

        if (this.Alive)
        {
            if (!this.remote)
            {
                // Add new point.
                newPoint = new SnakeNinja.Structures.TimedPoint(this.Length + timePassed, this.Points[this.Points.length - 1].Point);
                newPoint.Update(timePassed, this.Speed, this.Direction);
                this.Points.push(newPoint);
                
                this.InternalUpdate(timePassed);
                
                this.Game.SendData(new SnakeNinja.Structures.SnakeData(this.Points[this.Points.length - 1],
                                                                       this.Direction,
                                                                       0,
                                                                       this.Alive,
                                                                       this.Action,
                                                                       this.Keys));
            }
            else
            {
                if (this.States.length >= 1)
                {
                    var currentTime = this.Game.GetCurrentTime();
                    var previousStateIndex;
                    var nextStateIndex;
                    
                    for (var i = 0; i < this.States.length; i++)
                    {
                        nextStateIndex = i;
                        if (this.States[nextStateIndex].TimeStamp > currentTime)
                            break;
                        else
                            previousStateIndex = nextStateIndex;
                    }

                    if (previousStateIndex !== null)
                    {
                        var previousState = this.Points[nextStateIndex];
                        var nextState = this.Points[previousStateIndex];

                        if (nextStateIndex == previousStateIndex)
                        {
                            // Assuming movement to be as it was before.
                            this.Direction = nextState.Direction;
                            this.Alive = nextState.Alive;
                            this.Keys = nextState.Keys;
                            this.Action = nextState.Action;
                            this.GuessedPointsCount += 1;
                        }
                        else
                        {
                            // Checking if we missed some steps.
                            if (this.LastStateIndex != previousStateIndex)
                            {
                                // Removing all guessed points.
                                for (var i = 0; i < this.GuessedPointsCount; i++)
                                {
                                    this.Points.pop();
                                }
                                
                                for (var i = this.LastStateIndex; i <= previousStateIndex; i++)
                                {
                                    newPoint = this.States[i].Position;
                                    this.Points.push(newPoint);
                                    newPoint.Update(currentTime - this.States[i].TimeStamp);
                                }
                            }
                            
                            this.LastStateIndex = nextStateIndex;
                            this.Keys = previousState.Keys;
                            this.InternalUpdate();
                            this.Direction = this.AverageByTime(nextState.Direction, previousState.Direction,
                                                                nextState.TimeStamp, previousState.TimeStamp, currentTime);
                            var pointTime = this.AverageByTime(nextState.Position.Time, previousState.Position.Time,
                                                               nextState.TimeStamp, previousState.TimeStamp, currentTime);
                            var pointX = this.AverageByTime(nextState.Position.Point.X, previousState.Position.Point.X,
                                                            nextState.TimeStamp, previousState.TimeStamp, currentTime);
                            var pointY = this.AverageByTime(nextState.Position.Point.Y, previousState.Position.Point.Y,
                                                            nextState.TimeStamp, previousState.TimeStamp, currentTime);
                            newPoint = new SnakeNinja.Structures.TimedPoint(pointTime, new SnakeNinja.Structures.Point(pointX, pointY));
                            this.Points.push(newPoint);
                        }
                    }
                }
            }
        }
    };
    
    this.AverageByTime = function(NextValue, PreviousValue, NextTime, PreviousTime, CurrentTime)
    {
        var TotalTime = NextTime - PreviousTime;
        var NextWeight = (NextTime - CurrentTime) / TotalTime;
        var PreviousWeight = (CurrentTime - PreviousTime) / TotalTime;
        
        return NextValue * NextWeight + PreviousValue * PreviousWeight;
    };
    
    this.Draw = function(graphics)
    {
        if (this.Alive)
        {
            for (var i = 0; i < this.Points.length; i++)
            {
                graphics.fillStyle = this.Remote ? "rgba(0, 128, 128, 0.8)" : "rgba(0, 255, 0, 0.8)";
                graphics.beginPath();
                graphics.arc(this.Points[i].Point.X, this.Points[i].Point.Y, 4, 0, 2 * Math.PI, true);
                graphics.fill();
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

        shot.Init(shotGuid, this.remote, this.team, this, this.Points[this.Points.length - 1].Point, this.Direction);
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
    
    // server object data.
    this.UpdateData = function (PlayerData) {
        this.States.push(PlayerData);
	};
};