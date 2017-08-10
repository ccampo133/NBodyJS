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
data class Body(val m: Double, val r: Double, val x: Vector, val v: Vector, val positions: List<Vector> = emptyList()) {
  /**
   * Returns true if this body has collided (occupies the same space) with another body, otherwise returns false.
   *
   * @param other The other body to detect collisions with.
   */
  fun isCollision(other: Body) = (this.x - other.x).len < other.r && this.m <= other.m

  companion object {
    val empty = Body(0.0, 0.0, Vector.zero, Vector.zero)
  }
}
