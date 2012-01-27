SnakeNinja.Structures = {};

SnakeNinja.Structures.Point = function(x, y)
{
    this.X = x;
    this.Y = y;
    this.Advance = function(amount, direction)
    {
        this.X += amount * Math.sin(Math.PI + direction * Math.PI / 180);
        this.Y += amount * Math.cos(Math.PI + direction * Math.PI / 180);
    };
};

SnakeNinja.Structures.TimedPoint = function(time, point)
{
    this.Time = time;
    this.Point = point;
    this.Update = function(timePassed, speed, direction)
    {
        this.Time -= timePassed;
        if (speed)
            this.Point.Advance(speed * timePassed, direction);
    };
    
    this.AddTime = function(timeAdded)
    {
        this.Time += timeAdded;
    };
    
    this.IsAlive = function()
    {
        return (this.Time > 0);
    };
};

SnakeNinja.Structures.Action =
{
    nothing:    0,
    shoot:      1
};