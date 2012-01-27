SnakeNinja.Pizza = function(game)
{
    this.Game = game;
    
    this.Spawn = function (position, size, time)
    {
        this.Size = size || 1;
        this.Position = position;
        this.TimeSpan = time || 20000;
    };
    
    this.Draw = function(graphics)
    {
        var img = this.Game.Resources["imgPizza"];
        graphics.drawImage(img, this.Position.X - img.width/2  , this.Position.Y - img.height/2);
    };
    
    this.Update = function(ts)
    {
        
    };
    
    this.Eaten = function (snake)
    {
        snake.Increase(this.Size);
    };
    
};