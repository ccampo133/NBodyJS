package ccampo133.nbody

/**
 * @author Chris Campo
 */
object Verlet {
  def verlet(pos: Vec2D, vel: Vec2D, accel: Vec2D, dt: Double, newAccel: () => Vec2D): (Vec2D, Vec2D, Vec2D) = {
    val pos1 = pos + (vel * dt) + (accel * math.pow(dt, 2) / 2)
    val accel1 = newAccel()
    val vel1 = vel + (accel + accel1) * (dt / 2)
    (pos1, vel1, accel1)
  }
}
