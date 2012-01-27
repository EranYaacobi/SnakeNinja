var Apple = function(game)
{
    this.Spawn = function (position, size, time)
    {
        this.Size = size || 1;
        this.Position = position;
        this.TimeSpan = time || 20000;
        this.Image = "images/apple.png";
    }
    
    
    
    this.Draw = function(graphics)
    {
        graphics.drawImage(
    }
    
    this.Update = function()
    {
    }
    
    
    this.Eaten = function (snake)
    {
        snake.length
    }
    
}