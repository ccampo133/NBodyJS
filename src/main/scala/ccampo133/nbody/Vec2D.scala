package main.scala.ccampo133.nbody

/**
 * @author Chris Campo
 */
class Vec2D(var x: Double, var y: Double) {
  def +(other: Vec2D) = new Vec2D(x + other.x, y + other.y)
  def -(other: Vec2D) = new Vec2D(x - other.x, y - other.y)
  def *(scalar: Double) = new Vec2D(scalar * x, scalar * y)
  def /(scalar: Double) = new Vec2D(x / scalar, y / scalar)
  def dot(other: Vec2D) = (x * other.x) + (y * other.y)
  def length() = math.sqrt(this dot this)
}

object Vec2D {
  def getUnitVector(vec: Vec2D) = vec / vec.length()
}
