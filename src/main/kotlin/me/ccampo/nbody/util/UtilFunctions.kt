package me.ccampo.nbody.util

import kotlin.js.Math

/**
 * Silly function that determines a visually pleasing radius as a function of mass.
 * The formula is pretty arbitrary. I got it by picking some radii I liked and
 * plotting them, and then fitting a log function to the data. Strictly for
 * visualization purposes.
 */
fun massToRadius(mass: Double): Double {
  return if (mass > 1) Math.max(1.5, (10 * Math.log(mass) / Math.log(10.0) - 14) / 3) else 1.02
}

/**
 * Another silly function that determines the color of an object based on mass.
 * Again, strictly for visualization purposes.
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
