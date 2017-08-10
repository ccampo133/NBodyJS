package me.ccampo.nbody.model

import me.ccampo.nbody.util.gravityAcceleration
import me.ccampo.nbody.util.isWayOutOfBounds
import me.ccampo.nbody.util.verlet

/**
 * Runs an n-body gravity simulation using Verlet integration.
 *
 * @param dt The timestep
 * @param initBodies The set of initial bodies
 * @param width The simulation area width
 * @param height The simulation area height
 * @param nPos The number of historical positions to track, per body
 * @param nOld The number of old bodies to track after they've been removed (collided, escaped, etc)
 */
class SimulationContext(
    val dt: Double,
    val initBodies: Set<Body> = emptySet<Body>(),
    val width: Int = 100,
    val height: Int = 100,
    val nPos: Int = 0,
    val nOld: Int = 0) {

  var bodies = initBodies
    private set

  var removedBodies: List<Body> = listOf()
    private set

  /**
   * Move the simulation forward one timestep.
   */
  fun run() {
    // Remove bodies that collide or are WAY out of bounds (to preserve resources)
    val bodiesToRemove = bodies.filter { b ->
      isWayOutOfBounds(b.x.x, b.x.y, width, height) || (bodies - b).any { b.isCollision(it) }
    }

    bodies -= bodiesToRemove

    // Keep only the last "nOld" removed bodies
    removedBodies = (removedBodies + bodiesToRemove).takeLast(nOld)

    // Update the positions of all bodies using the "Velocity Verlet" algorithm
    // and exclude the current body from the acceleration calculation.
    bodies = bodies.map {
      val (x, v) = verlet(it.x, it.v, dt, { pos -> gravityAcceleration(pos, bodies - it) })
      Body(it.m, it.r, x, v, (it.positions + x).takeLast(nPos))
    }.toSet()
  }

  fun clear() {
    removedBodies = listOf()
    bodies = emptySet()
  }

  fun reset() {
    removedBodies = listOf()
    bodies = initBodies
  }

  fun clearPositionHistory() {
    bodies = bodies.map { it.copy(positions = emptyList()) }.toSet()
  }

  fun addBody(body: Body) {
    bodies += body
  }
}
