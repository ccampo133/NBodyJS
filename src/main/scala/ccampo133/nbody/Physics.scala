package ccampo133.nbody

/**
 * @author Chris Campo
 */
object Physics {
  val G = 1 // Gravitational constant

  def verlet(pos: Vec2D, vel: Vec2D, dt: Double, accel: Vec2D => Vec2D): (Vec2D, Vec2D) = {
    val pos1 = pos + (vel * dt) + (accel(pos) * math.pow(dt, 2) / 2)
    val vel1 = vel + (accel(pos) + accel(pos1)) * (dt / 2)
    (pos1, vel1)
  }

  def gravityAcceleration(pos: Vec2D, bodies: Set[Body]): Vec2D = {
    def gravity(pos: Vec2D)(body2: Body): Vec2D = {
      val r12 = body2.position - pos
      r12 * body2.mass * G / math.pow(r12.length, 2)
    }
    (bodies map gravity(pos)).sum
  }
}
