package me.ccampo.nbody.web

import me.ccampo.nbody.model.Body
import me.ccampo.nbody.model.Vector
import me.ccampo.nbody.util.*
import org.w3c.dom.HTMLCanvasElement
import kotlin.browser.document
import kotlin.browser.window

fun start() {
  // Initial conditions
  val initBodies: Set<Body> = setOf(
      Body(10000.0, 10.0, Vector(0.0, 0.0), Vector(0.0, 0.0)),
      Body(0.0, 3.0, Vector(50.0, 0.0), Vector(0.0, -100.0)),
      Body(0.0, 3.0, Vector(175.0, 0.0), Vector(0.0, 100.0))
  )
  val trails = true
  val numTrailPts = 250
  val dt = 0.05
  val targetFps = 60

  val canvas = document.getElementById("canvas") as HTMLCanvasElement
  val app = NBodyApp(canvas, trails, numTrailPts, dt, initBodies)

  // Start the main animation loop
  window.setInterval({ app.run() }, 1000 / targetFps)
}

class NBodyApp(
    val canvas: HTMLCanvasElement,
    val trails: Boolean,
    val numTrailPts: Int,
    val dt: Double,
    var bodies: Set<Body>) {
  var deletedBodies: Set<Body> = setOf()

  fun run() {
    // Get bodies that collide or are WAY out of bounds (to preserve resources)
    //val bodiesToDelete = bodies.filter {
    //  isOutOfBounds(it.x.x, it.x.y, canvas.width, canvas.height) || bodies.any { b -> it.isCollision(b) }
    //}
    // TODO: fix this -ccampo 2017-07-31
    val bodiesToDelete = emptySet<Body>()

    bodies = bodies.subtract(bodiesToDelete)
    deletedBodies = deletedBodies.plus(bodiesToDelete) // TODO: remove out-of-bounds points here -ccampo 2017-07-30

    canvas.draw(bodies, trails, deletedBodies)

    // Update the positions of all bodies using the "Velocity Verlet" algorithm
    // and exclude the current body from the acceleration calculation
    bodies = bodies.map {
      val (x, v) = verlet(it.x, it.v, dt, { pos -> gravityAcceleration(pos, bodies - it) })
      Body(it.m, it.r, x, v, it.positions.plus(x).takeLast(numTrailPts))
    }.toSet()
  }
}
