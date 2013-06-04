function Vector()
{
}

Vector.prototype.xy = function (x, y)
{
    this.x = x;
    this.y = y;
    return this;
}

Vector.prototype.rTheta = function (r, theta)
{
    this.x = r * Math.cos(theta);
    this.y = r * Math.sin(theta);
    return this;
}

Vector.prototype.length = function ()
{
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}

Vector.prototype.add = function (v)
{
    return new Vector().xy(this.x + v.x, this.y + v.y);
}

Vector.prototype.subtract = function (v)
{
    return new Vector().xy(this.x - v.x, this.y - v.y);
}

Vector.prototype.scalarMultiply = function (s)
{
    return new Vector().xy(s * this.x, s * this.y);
}

Vector.prototype.dot = function (v)
{
    return (this.x * v.x + this.y * v.y);
}

Vector.prototype.getUnitVector = function ()
{
    var len = this.length();
    return new Vector().xy(this.x / len, this.y / len);
}