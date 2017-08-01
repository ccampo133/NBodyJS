package me.ccampo.nbody.simulation

import me.ccampo.nbody.model.Body
import me.ccampo.nbody.util.gravityAcceleration
import me.ccampo.nbody.util.verlet
import kotlin.js.Math

/**
 * Runs an n-body gravity simulation using Verlet integration.
 *
 * @param dt The timestep
 * @param bodies The set of initial bodies
 * @param area The simulation area grid
 * @param nPos The number of historical positions to track, per body
 * @param nOld The number of old bodies to track after they've been removed (collided, escaped, etc)
 */
class NBodySimulation(
    val dt: Double,
    var bodies: Set<Body> = emptySet<Body>(),
    width: Int = 100,
    height: Int = 100,
    val nPos: Int = 0,
    val nOld: Int = 0) {

  val area = Area(width, height)
  var removedBodies: List<Body> = listOf()

  fun run(callback: (Set<Body>, Set<Body>) -> Unit) {
    callback(bodies, removedBodies.toSet())

    // Remove bodies that collide or are WAY out of bounds (to preserve resources)
    val bodiesToRemove = bodies.filter { b ->
      area.isWayOutOfBounds(b.x.x, b.x.y) || (bodies - b).any { b.isCollision(it) }
    }

    bodies -= bodiesToRemove

    // Keep only the last `n` removed bodies
    removedBodies = (removedBodies + bodiesToRemove).takeLast(nOld)

    // Update the positions of all bodies using the "Velocity Verlet" algorithm
    // and exclude the current body from the acceleration calculation.
    bodies = bodies.map {
      val (x, v) = verlet(it.x, it.v, dt, { pos -> gravityAcceleration(pos, bodies - it) })
      Body(it.m, it.r, x, v, (it.positions + x).takeLast(nPos))
    }.toSet()
  }

  fun clearPositionHistory() {
    bodies = bodies.map { body -> body.copy(positions = emptyList()) }.toSet()
  }

  fun addBody(body: Body) {
    bodies += body
  }

  data class Area(val width: Int, val height: Int) {
    fun isWayOutOfBounds(x: Double, y: Double) = (Math.abs(x) > 2 * width) || (Math.abs(y) > 2 * height)
  }
}
