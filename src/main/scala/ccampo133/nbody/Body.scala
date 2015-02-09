package ccampo133.nbody

/**
 * @author Chris Campo
 */
class Body(
    val mass: Double,
    val radius: Double,
    val position: Vec2D,
    val velocity: Vec2D,
    var positions: Seq[Vec2D] = Seq.empty[Vec2D]) {
  override def toString = s"Body($mass, $radius, $position, $velocity, $positions)"
}
