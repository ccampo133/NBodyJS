package me.ccampo.nbody.model

import kotlin.js.Math

/**
 * A two dimensional Euclidean vector. Contains various methods for performing vector arithmetic.
 *
 * See [Wikipedia](https://en.wikipedia.org/wiki/Euclidean_vector)
 *
 * @param x The x coordinate in 2D space
 * @param y The y coordinate in 2D space
 */
data class Vector(val x: Double, val y: Double) {
  val len = Math.sqrt(this dot this)
  operator fun plus(other: Vector) = Vector(x + other.x, y + other.y)
  operator fun minus(other: Vector) = Vector(x - other.x, y - other.y)
  operator fun times(scalar: Double) = Vector(scalar * x, scalar * y)
  operator fun div(scalar: Double) = Vector(x / scalar, y / scalar)
  infix fun dot(other: Vector) = (x * other.x) + (y * other.y)

  companion object {
    val zero = Vector(0.0, 0.0)
  }
}
