package ccampo133.nbody

/**
 * @author Chris Campo
 */
class Vec2D(val x: Double, val y: Double) {
  def +(other: Vec2D): Vec2D = new Vec2D(x + other.x, y + other.y)
  def -(other: Vec2D): Vec2D = new Vec2D(x - other.x, y - other.y)
  def *(scalar: Double): Vec2D = new Vec2D(scalar * x, scalar * y)
  def /(scalar: Double): Vec2D = new Vec2D(x / scalar, y / scalar)
  def dot(other: Vec2D): Double = (x * other.x) + (y * other.y)
  def length: Double = math.sqrt(this dot this)
  def toUnitVector: Vec2D = this / this.length
  override def toString: String = s"Vec2D($x, $y)"
}
