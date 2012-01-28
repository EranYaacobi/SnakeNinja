SnakeNinja.Pizza = function(game)
{
    this.Game = game;
    
    this.Spawn = function (position, size)
    {
        this.Size = size || 1;
        this.Position = position;
        var el = jQuery("<div class='Pizza Pizza"+ size + "' />");
        el.css({top: position.X - el.width()/2, left: position.Y- el.height()/2}).appendTo
        (game.Element);
    };
    
    this.Draw = function(graphics)
    {
        
    };
    
    this.Update = function(timePassed)
    {
        
    };
    
    this.Eaten = function (snake)
    {
        snake.Increase(this.Size);
    };
    
};