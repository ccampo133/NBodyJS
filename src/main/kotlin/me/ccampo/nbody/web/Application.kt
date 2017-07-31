package me.ccampo.nbody.web

import me.ccampo.nbody.model.Body
import me.ccampo.nbody.model.Vector
import me.ccampo.nbody.simulation.NBodySimulation
import me.ccampo.nbody.util.draw
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
  val app = NBodySimulation(dt, initBodies, NBodySimulation.Grid(canvas.width, canvas.height), trails, numTrailPts)

  // Start the main animation loop
  window.setInterval({ app.run { b -> canvas.draw(b) } }, 1000 / targetFps)
}
