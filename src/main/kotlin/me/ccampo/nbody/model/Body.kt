package me.ccampo.nbody.model

/**
 * Represents a circular moving body in 2D space.
 *
 * @param m The body's mass.
 * @param r The body's radius.
 * @param x The body's position.
 * @param v The body's velocity.
 * @param positions A list of the body's previous positions
 */
data class Body(val m: Double, val r: Double, val x: Vector, val v: Vector) {
  /**
   * Returns true if this body has collided (occupies the same space) with another body, otherwise returns false.
   *
   * @param other The other body to detect collisions with.
   */
  // TODO: fix this -ccampo 2017-07-31
  fun isCollision(other: Body): Boolean = false //(x - other.x).len < other.r && this.m <= other.m
}
