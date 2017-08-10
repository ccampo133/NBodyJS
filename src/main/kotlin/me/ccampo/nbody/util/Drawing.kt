package me.ccampo.nbody.util

import me.ccampo.nbody.model.Body
import me.ccampo.nbody.model.Vector
import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.CanvasTextAlign
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.LEFT
import kotlin.js.Math

/**
 * Contains a series of "canvas" extension functions for drawing the app.
 */

/**
 * Returns "true" if a point is within the boundaries of the canvas.
 *
 * @param x the x coordinate of the point to check
 * @param y ths y coordinate of the point to check
 */
fun HTMLCanvasElement.isInbounds(x: Double, y: Double) = x >= 0 && x <= width && y >= 0 && y <= height

/**
 * Returns a point relative to the center of the canvas via a linear transformation of an (x, y) point.
 *
 * @param x0 The original point's x coordinate
 * @param y0 The original point's y coordinate
 */
fun HTMLCanvasElement.xy(x0: Double, y0: Double) = Pair((width / 2.0) + x0, (height / 2.0) - y0)

/**
 * Draws a set of circular bodies (and trails if specified) on the canvas.
 *
 * @param bodies The set of bodies to draw
 * @param trails True to draw trails, false otherwise (default: false)
 * @param deletedBodies The set of deleted bodies; used only for drawing trails
 */
fun HTMLCanvasElement.draw(bodies: Set<Body>, trails: Boolean = false, deletedBodies: Set<Body>? = null) {
  val ctx = getContext("2d") as CanvasRenderingContext2D

  // Clear the entire canvas
  ctx.clearRect(0.0, 0.0, width.toDouble(), height.toDouble())

  // Only draw bodies that are in bounds
  bodies.forEach {
    val (x, y) = xy(it.x.x, it.x.y)
    if (isInbounds(x, y)) drawBody(it)
    if (trails && it.positions.isNotEmpty()) drawTrail(it.positions)
  }

  // Draw the trails of bodies that have been deleted (collided, too far away, etc)
  if (trails) deletedBodies?.forEach { drawTrail(it.positions) }
}

/**
 * Draws a circular body on the canvas.
 *
 * @param body The body to draw
 */
fun HTMLCanvasElement.drawBody(body: Body) {
  val ctx = getContext("2d") as CanvasRenderingContext2D
  val (x, y) = xy(body.x.x, body.x.y)
  val grd = ctx.createRadialGradient(x, y, 0.1, x, y, 10 * Math.log(body.r))
  grd.addColorStop(0.0, "wheat")
  grd.addColorStop(1.0, "transparent")

  // Fill with gradient and draw the main circle
  ctx.fillStyle = grd
  ctx.fillRect(x - body.r * 4, y - body.r * 4, 150.0, 150.0)
  ctx.beginPath()
  ctx.arc(x, y, body.r, 0.0, 2 * Math.PI, anticlockwise = false)
  ctx.fillStyle = massToColor(body.m)
  ctx.fill()
}

/**
 * Draws the trail of a body using its previous positions.
 *
 * @param positions The positions (points) to draw the trail along
 */
fun HTMLCanvasElement.drawTrail(positions: List<Vector>) {
  val ctx = getContext("2d") as CanvasRenderingContext2D
  ctx.beginPath()
  val (x, y) = xy(positions.first().x, positions.first().y)
  ctx.moveTo(x, y)

  positions.drop(1).forEach {
    val (px, py) = xy(it.x, it.y)
    if (isInbounds(px, py)) ctx.lineTo(px, py) else ctx.moveTo(px, py)
  }

  ctx.strokeStyle = "white"
  ctx.lineWidth = 1.01
  ctx.stroke()
}

/**
 * Draws (multi-line) white text at a specific (x, y) position.
 */
fun HTMLCanvasElement.drawText(
    text: String,
    x: Double,
    y: Double,
    font: String = "10px Arial",
    fillStyle: String = "white",
    textAlign: CanvasTextAlign = CanvasTextAlign.LEFT) {
  val ctx = getContext("2d") as CanvasRenderingContext2D
  ctx.font = font
  ctx.fillStyle = fillStyle
  ctx.textAlign = textAlign

  val lineHeight = ctx.measureText("M").width * 1.2
  var dy = y
  text.split("\n").forEach {
    ctx.fillText(it, x, dy)
    dy += lineHeight
  }
}
