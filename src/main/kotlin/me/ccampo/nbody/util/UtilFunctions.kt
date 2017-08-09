package me.ccampo.nbody.util

import kotlin.js.Math

/**
 * Silly function that determines a visually pleasing radius as a function of mass.
 * Strictly for visualization purposes only.
 */
fun massToRadius(mass: Double): Double {
  return if (mass > 1) Math.max(1.02, (10 * Math.log(mass) / Math.log(10.0) - 14) / 3) else 1.1
}

/**
 * Another silly function that determines the color of an object based on mass.
 * Again, strictly for visualization purposes only.
 */
fun massToColor(mass: Double): String {
  when {
    mass >= 100001.0 -> return "black" // black hole!!!
    mass >= 100000.0 -> return "#FFD699"
    mass >= 10000.0 -> return "lemonchiffon"
    else -> return "white"
  }
}

/**
 * True if a point lies outside more than twice the length/width of some rectangular area.
 */
fun isWayOutOfBounds(x: Double, y: Double, width: Int, height: Int): Boolean {
  return Math.abs(x) > 2 * width || Math.abs(y) > 2 * height
}
