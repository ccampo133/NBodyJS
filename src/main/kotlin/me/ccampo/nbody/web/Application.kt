package me.ccampo.nbody.web

import me.ccampo.nbody.controller.MainController
import me.ccampo.nbody.model.Body
import me.ccampo.nbody.model.SimulationContext
import me.ccampo.nbody.model.Vector
import me.ccampo.nbody.util.massToRadius
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.events.KeyboardEvent
import org.w3c.dom.events.MouseEvent
import org.w3c.dom.events.WheelEvent
import kotlin.browser.document
import kotlin.browser.window

class Application {

  val initBodies: Set<Body> = setOf(
      Body(100000.0, massToRadius(100000.0), Vector(0.0, 0.0), Vector(0.0, 0.0)),
      Body(0.0, massToRadius(10.0), Vector(20.0, 0.0), Vector(0.0, 70.0)),
      Body(0.0, massToRadius(75.0), Vector(50.0, 0.0), Vector(0.0, 45.0)),
      Body(0.0, massToRadius(80.0), Vector(75.0, 0.0), Vector(0.0, 37.0)),
      Body(0.0, massToRadius(80.0), Vector(120.0, 0.0), Vector(0.0, 29.0)),
      Body(0.0, massToRadius(1000.0), Vector(220.0, 0.0), Vector(0.0, 21.0))
  )

  val numTrailPts: Int = 1000
  val dt: Double = 0.05
  val targetFps: Int = 60
  val canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement
  var context: SimulationContext = SimulationContext(dt, initBodies, canvas.width, canvas.height, numTrailPts)
  val controller: MainController = MainController(canvas, context)

  init {
    // Configure canvas event listeners
    canvas.addEventListener("mousedown", { controller.mouseDownListener(it as MouseEvent) }, false)
    canvas.addEventListener("mouseup", { controller.mouseUpListener(it as MouseEvent) }, false)

    // Configure window event listeners
    window.addEventListener("keydown", { controller.keyDownListener(it as KeyboardEvent) }, false)
    window.addEventListener("wheel", { controller.mouseWheelHandler(it as WheelEvent) }, false)
  }

  fun start() {
    // Start the main animation loop
    window.setInterval(controller::run, 1000 / targetFps)
  }
}
