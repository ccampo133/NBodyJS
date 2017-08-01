package me.ccampo.nbody.web

import me.ccampo.nbody.model.Body
import me.ccampo.nbody.model.Vector
import me.ccampo.nbody.simulation.NBodySimulation
import me.ccampo.nbody.util.draw
import me.ccampo.nbody.util.drawBody
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.events.KeyboardEvent
import org.w3c.dom.events.MouseEvent
import kotlin.browser.document
import kotlin.browser.window

class Application(
    val initBodies: Set<Body> = setOf(
        Body(10000.0, 10.0, Vector(0.0, 0.0), Vector(0.0, 0.0)),
        Body(0.0, 3.0, Vector(50.0, 0.0), Vector(0.0, -100.0)),
        Body(0.0, 3.0, Vector(175.0, 0.0), Vector(0.0, 100.0))
    ),
    val numTrailPts: Int = 250,
    val dt: Double = 0.05,
    val targetFps: Int = 60,
    var paused: Boolean = false,
    var trails: Boolean = false,
    var mouseDown: Boolean = false,
    var newBody: Body = Body.empty,
    val canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement,
    var app: NBodySimulation = NBodySimulation(dt, initBodies, canvas.width, canvas.height, numTrailPts)) {

  init {
    // Configure canvas event listeners
    canvas.addEventListener("mousedown", { mouseDownListener(it as MouseEvent) }, false)
    canvas.addEventListener("mouseup", { mouseUpListener(it as MouseEvent) }, false)

    // Configure window event listeners
    window.addEventListener("keydown", { keyDownListener(it as KeyboardEvent) }, false)
    //window.addEventListener("DOMMouseScroll", ::mouseWheelHandler, false); // firefox
    //window.addEventListener("mousewheel", ::mouseWheelHandler, false); // ie9, chrome, safari, opera
  }

  fun start() {
    fun render(bodies: Set<Body>, trails: Boolean, deletedBodies: Set<Body>) {
      canvas.draw(bodies, trails, deletedBodies)
      if (newBody != Body.empty) canvas.drawBody(newBody)
    }
    // Start the main animation loop
    window.setInterval({ if (!paused) app.run { b, d -> render(b, trails, d) } }, 1000 / targetFps)
  }

  fun keyDownListener(event: KeyboardEvent) {
    // Do nothing if the event was already processed
    if (event.defaultPrevented) return

    when (event.key) {
      "t" -> {
        trails = !trails
        app.clearPositionHistory()
      }
      "p" -> paused = !paused
      "r" -> app = NBodySimulation(dt, initBodies, canvas.width, canvas.height, numTrailPts)
      "c" -> app = NBodySimulation(dt, emptySet(), canvas.width, canvas.height, numTrailPts)
      "UpArrow" -> {
        //mouseWheelHandler({ detail: 1 });
      }
      "DownArrow" -> {
        //mouseWheelHandler({ detail:-1 });
      }
    }
  }

  fun mouseDownListener(event: MouseEvent) {
    // Do nothing if the event was already processed
    if (event.defaultPrevented) return

    // add a new body to the simulation on click (if it isn't paused).
    if (!paused) {
      mouseDown = true
      val bRect = canvas.getBoundingClientRect()
      val mouseX = (event.clientX - bRect.left) * (canvas.width / bRect.width) - canvas.width / 2
      val mouseY = canvas.height / 2 - (event.clientY - bRect.top) * (canvas.height / bRect.height)
      // TODO: get mass -ccampo 2017-07-31
      newBody = Body(10.0, 10.0, Vector(mouseX, mouseY), Vector.zero)
      canvas.drawBody(newBody)
    }
  }

  fun mouseUpListener(event: MouseEvent) {
    // Do nothing if the event was already processed
    if (event.defaultPrevented) return

    // Add a new body to the simulation on click (if it isn't paused).
    if (!paused) {
      mouseDown = false
      val bRect = canvas.getBoundingClientRect()
      val mouseX = (event.clientX - bRect.left) * (canvas.width / bRect.width) - canvas.width / 2
      val mouseY = canvas.height / 2 - (event.clientY - bRect.top) * (canvas.height / bRect.height)
      val v = Vector(mouseX, mouseY) - newBody.x
      newBody = newBody.copy(v = v)
      app.addBody(newBody)
      newBody = Body.empty
    }
  }
}
