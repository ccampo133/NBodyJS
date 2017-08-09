package me.ccampo.nbody.util

import me.ccampo.nbody.model.Body
import me.ccampo.nbody.model.Vector
import kotlin.js.Math

val G = 1 // Gravitational constant

/**
 * Numerically integrate Newton's equations of motion using the "Velocity Verlet" algorithm.
 *
 * See [Wikipedia](https://en.wikipedia.org/wiki/Verlet_integration#Velocity_Verlet)
 *
 * @param x The position vector
 * @param v The velocity vector
 * @param dt The timestep
 * @param a The acceleration function
 */
fun verlet(x: Vector, v: Vector, dt: Double, a: (Vector) -> Vector): Pair<Vector, Vector> {
  val x1 = (x + (v * dt)) + (a(x) * (Math.pow(dt, 2.0) / 2.0))
  val v1 = v + ((a(x) + a(x1)) * (dt / 2))
  return Pair(x1, v1)
}

/**
 * Using Newton's law of universal gravitation, calculate the total acceleration vector on a two-dimension position
 * vector caused by a set of massive bodies.
 *
 * See [Wikipedia](https://en.wikipedia.org/wiki/Newton%27s_law_of_universal_gravitation)
 *
 * @param x The position vector to find the acceleration at.
 * @param bodies The set of bodies to used to contribute to the overall gravitational acceleration.
 */
fun gravityAcceleration(x: Vector, bodies: Set<Body>): Vector {
  /*
   * Newton's Law of Gravity. Here we're only returning the acceleration vector, not the force vector, according to
   * Newton's second law (F = ma)
   */
  fun gravity(pos: Vector, body2: Body): Vector {
    val r12 = body2.x - pos
    return r12 * (body2.m * G) / Math.pow(r12.len, 2.0)
  }
  return bodies.map { body -> gravity(x, body) }.fold(Vector.zero) { a1, a2 -> a1 + a2 }
}
