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

  // TODO: fix stack overflow here -ccampo 2017-07-31
  //val unit = this.divide(this.len)

  infix fun plus(other: Vector) = Vector(x + other.x, y + other.y)
  infix fun minus(other: Vector) = Vector(x - other.x, y - other.y)
  infix fun times(scalar: Double) = Vector(scalar * x, scalar * y)
  infix fun divide(scalar: Double) = Vector(x / scalar, y / scalar)
  infix fun dot(other: Vector) = (x * other.x) + (y * other.y)
}
