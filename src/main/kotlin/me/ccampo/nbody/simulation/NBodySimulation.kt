package me.ccampo.nbody.simulation

import me.ccampo.nbody.model.Body
import me.ccampo.nbody.model.Vector
import me.ccampo.nbody.util.gravityAcceleration
import me.ccampo.nbody.util.verlet
import kotlin.js.Math

/**
 * @author Chris Campo
 */
class NBodySimulation(
    val dt: Double,
    var bodies: Set<Body> = emptySet<Body>(),
    val grid: Grid = Grid(100, 100),
    val shouldTrackHistory: Boolean = false,
    val numHistoryPoints: Int? = null) {

  var deletedBodies: Set<Body> = setOf()
  var history: Map<Body, List<Vector>> = emptyMap()

  fun run(callback: (Set<Body>) -> Unit) {
    callback(bodies)

    // Get bodies that collide or are WAY out of bounds (to preserve resources)
    val bodiesToDelete = bodies.filter { b ->
      grid.isWayOutOfBounds(b.x.x, b.x.y) || bodies.any { b.isCollision(it) }
    }

    bodies = bodies.subtract(bodiesToDelete)
    deletedBodies = deletedBodies.plus(bodiesToDelete) // TODO: remove out-of-bounds points here -ccampo 2017-07-30

    // Update the positions of all bodies using the "Velocity Verlet" algorithm
    // and exclude the current body from the acceleration calculation
    bodies = bodies.map {
      val (x, v) = verlet(it.x, it.v, dt, { pos -> gravityAcceleration(pos, bodies - it) })
      Body(it.m, it.r, x, v) // TODO: track history here
    }.toSet()
  }

  data class Grid(val width: Int, val height: Int) {
    fun isWayOutOfBounds(x: Double, y: Double): Boolean {
      return (Math.abs(x) > 2 * width) || (Math.abs(y) > 2 * height)
    }
  }
}

