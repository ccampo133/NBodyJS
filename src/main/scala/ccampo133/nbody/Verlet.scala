package main.scala.ccampo133.nbody

/**
 * @author Chris Campo
 */
object Verlet {
  def verletIntegrate(pos: Vec2D, vel: Vec2D, accel: Vec2D, dt: Double, newAccel: () => Vec2D): (Vec2D, Vec2D) = {
    val pos1 = pos + (vel * dt) + (newAccel() * math.pow(dt, 2) / 2)
    val vel1 = vel + (accel + newAccel()) * (dt / 2)
    (pos1, vel1)
  }
}
