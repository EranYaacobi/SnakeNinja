var Apple = function(game)
{
    this.Spawn = function (position, size, time)
    {
        this.Size = size || 1;
        this.Position = position;
        this.TimeSpan = time || 20000;
        this.Image = "images/apple" + Size + ".png";
    }
    
    this.Draw = function(graphics)
    {
        graphics.drawImage(game.Resoucres[appleimage], x, y);
    }
    
    this.Update = function(ts)
    {
        
    }
    
    
    this.Eaten = function (snake)
    {
        snake.Increase(sizes);
    }
    
}