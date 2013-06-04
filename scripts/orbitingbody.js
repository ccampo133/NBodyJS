function OrbitingBody(mass, radius, position, velocity)
{
    this.mass = mass;
    this.radius = radius;
    this.position = position;
    this.velocity = velocity;
    this.color = 'white';
    this.trailEnabled = false;
    this.trail = new Array();
    this.outOfBounds = false;
}

OrbitingBody.prototype.drawBody = function (canvas)
{
    var ctx = canvas.getContext("2d");
    var x = canvas.width / 2 + this.position.x;     // position is relative to the origin, which I've put in the middle of the canvas, instead of the top-left corner
    var y = canvas.height / 2 - this.position.y;

    // only draw bodies if they're in the canvas boundaries
    if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height)
    {
        // draw background glow
        var grd = ctx.createRadialGradient(x, y, 0.01, x, y, 10 * Math.log(this.radius));
        grd.addColorStop(0, "wheat");
        grd.addColorStop(1, "transparent");

        // fill with gradient
        ctx.fillStyle = grd;
        ctx.fillRect(x - this.radius * 4, y - this.radius * 4, 150, 150);

        // draw main circle
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    else
        this.outOfBounds = true;
}

OrbitingBody.prototype.drawTrail = function (canvas)
{
    // draw trail (but only records points in the canvas bounds)
    if (this.trailEnabled)
    {
        var context = canvas.getContext("2d");
        var x = canvas.width / 2 + this.position.x;     // position is relative to the origin, which I've put in the middle of the canvas, instead of the top-left corner
        var y = canvas.height / 2 - this.position.y;
        var shouldMoveTo = false;

        if (x < 0 || x > canvas.width || y < 0 || y > canvas.height)
            this.outOfBounds = true;
        else
        {
            if (this.outOfBounds)
            {
                shouldMoveTo = true;
                this.outOfBounds = false;
            }
            var trailPt = { x: x, y: y, shouldMove: shouldMoveTo };
            this.trail.push(trailPt);
        }

        if (this.trail.length > 1)
        {
            context.beginPath();
            context.moveTo(this.trail[0].x, this.trail[0].y);
            for (var i = 1; i < this.trail.length; i++)
            {
                var pt = this.trail[i];
                if (pt.shouldMove)
                    context.moveTo(pt.x, pt.y);
                else
                    context.lineTo(pt.x, pt.y);
            }
            context.strokeStyle = "white";
            context.lineWidth = 1.01;
            context.stroke();
        }
    }
}