package ccampo133.nbody

/**
 * @author Chris Campo
 */
object Physics {
  val G = 1

  def verlet(pos: Vec2D, vel: Vec2D, dt: Double, accel: Vec2D => Vec2D): (Vec2D, Vec2D) = {
    val pos1 = pos + (vel * dt) + (accel(pos) * math.pow(dt, 2) / 2)
    val vel1 = vel + (accel(pos) + accel(pos1)) * (dt / 2)
    pos1 -> vel1
  }

  def gravityAcceleration(pos: Vec2D, bodies: Set[Body]): Vec2D = {
    bodies map (b => gravity(pos, b)) reduceLeft ((a1, a2) => a1 + a2)
  }

  private def gravity(pos1: Vec2D, body2: Body): Vec2D = {
    val r12 = body2.position - pos1
    r12 * body2.mass * G / math.pow(r12.length(), 2)
  }
}