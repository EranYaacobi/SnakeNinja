var Pizza = function(game)
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
        var img = game.Resources["appleimage" + size];
        graphics.drawImage(img, x - img.width/2  , y - img.height/2);
    }
    
    this.Update = function(ts)
    {
        
    }
    
    
    this.Eaten = function (snake)
    {
        snake.Increase(sizes);
    }
    
}