package ccampo133.nbody

/**
 * @author Chris Campo
 */
class Body(
  val mass: Double,
  val radius: Double,
  val position: Vec2D,
  val velocity: Vec2D,
  var positions: Seq[Vec2D] = Vector.empty[Vec2D]) {

  if (positions.isEmpty) positions :+= position

  def isCollision(other: Body): Boolean = {
    val r = other.position - position
    r.length() < other.radius && mass <= other.mass
  }
}
