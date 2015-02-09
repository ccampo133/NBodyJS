package ccampo133.nbody

/**
 * @author Chris Campo
 */
class Body(var mass: Double, var radius: Double, var position: Vec2D, var velocity: Vec2D) {
  // TODO: draw methods (body and trail)
  override def toString = s"Body($mass, $radius, $position, $velocity)"
}
