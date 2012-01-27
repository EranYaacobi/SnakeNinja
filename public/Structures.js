SnakeNinja.Structures = {};

SnakeNinja.Structures.Point = function(x, y)
{
    this.x = x;
    this.y = y;
    this.Advance = function(amount, direction)
    {
        this.x += amount * Math.sin(Math.PI + direction * Math.PI / 180);
        this.y += amount * Math.cos(Math.PI + direction * Math.PI / 180);
    };
};

SnakeNinja.Structures.TimedPoint = function(time, point)
{
    this.time = time;
    this.point = point;
    this.Update = function(timePassed, speed, direction)
    {
        this.time -= timePassed;
        if (speed)
            this.point.Advance(speed * timePassed, direction);
    };
    
    this.AddTime = function(timeAdded)
    {
        this.time += timeAdded;
    };
    
    this.IsAlive = function()
    {
        return (time > 0);
    };
};

SnakeNinja.Structures.Action =
{
    nothing:    0,
    shoot:      1
};