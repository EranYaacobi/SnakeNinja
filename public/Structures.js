Structures = {};

Structures.Point = function(x, y)
{
    this.x = x;
    this.y = y;
    this.Advance = function(amount, direction)
    {
        this.x += Math.sin(Math.PI + this.Rotation * Math.PI / 180);
        this.y += Math.cos(Math.PI + this.Rotation * Math.PI / 180);
    }
}

Structures.TimedPoint = function(time, point)
{
    this.time = time;
    this.point = point;
    this.Update = function(timePassed, speed, direction)
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