package me.ccampo.nbody.controller

import me.ccampo.nbody.model.Body
import me.ccampo.nbody.model.SimulationContext
import me.ccampo.nbody.model.Vector
import me.ccampo.nbody.util.draw
import me.ccampo.nbody.util.drawBody
import me.ccampo.nbody.util.drawText
import me.ccampo.nbody.util.massToRadius
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.events.KeyboardEvent
import org.w3c.dom.events.MouseEvent
import org.w3c.dom.events.WheelEvent
import org.w3c.dom.events.WheelEventInit
import kotlin.js.Math

class MainController(val canvas: HTMLCanvasElement, val context: SimulationContext) {

  private var tempBody: Body = Body.empty
  private var mouseDown: Boolean = false
  private var paused: Boolean = false
  private var debug: Boolean = false

  private var trails: Boolean = false
    set(value) {
      field = value
      context.clearPositionHistory()
    }

  fun run() {
    if (!paused) {
      canvas.draw(context.bodies, trails, context.removedBodies.toSet())
      if (mouseDown && tempBody != Body.empty) canvas.drawBody(tempBody)
      if (debug) drawDebugInfo()
      context.run()
    }
  }

  fun keyDownListener(event: KeyboardEvent) {
    // Do nothing if the event was already processed
    if (event.defaultPrevented) return

    when (event.key) {
      "t" -> trails = !trails
      "p" -> paused = !paused
      "r" -> context.reset()
      "c" -> context.clear()
      "d" -> debug = !debug
      "ArrowUp" -> {
        mouseWheelHandler(WheelEvent("wheel", WheelEventInit(deltaY = -1.0)))
      }
      "ArrowDown" -> {
        mouseWheelHandler(WheelEvent("wheel", WheelEventInit(deltaY = 1.0)))
      }
    }
  }

  fun mouseWheelHandler(event: WheelEvent) {
    // Do nothing if the event was already processed or the mouse wasn't pressed
    if (event.defaultPrevented || !mouseDown) return

    val mass: Double = if (event.deltaY < 0) {
      // Increase mass by multiples of 10 in the range [0, 100000].
      // The max possible mass, 100001, is just for fun (black hole).
      if (tempBody.m <= 0) 10.0 else Math.min(tempBody.m * 10, 100001.0)
    } else when {
      // Inverse of the above logic (decrease mass in multiples of 10)
      tempBody.m >= 100001.0 -> 100000.0
      tempBody.m > 10 -> tempBody.m / 10
      else -> 0.0
    }

    tempBody = tempBody.copy(m = mass, r = massToRadius(mass))
  }

  fun mouseDownListener(event: MouseEvent) {
    // Do nothing if paused, or the event was already processed
    if (paused || event.defaultPrevented) return

    // Create a temporary body that will be finalized and added to the simulation when the mouse is released.
    mouseDown = true
    val bRect = canvas.getBoundingClientRect()
    val mouseX = (event.clientX - bRect.left) * (canvas.width / bRect.width) - canvas.width / 2
    val mouseY = canvas.height / 2 - (event.clientY - bRect.top) * (canvas.height / bRect.height)
    val mass = tempBody.m
    val radius = massToRadius(mass)
    tempBody = Body(mass, radius, Vector(mouseX, mouseY), Vector.zero)
    canvas.drawBody(tempBody)
  }

  fun mouseUpListener(event: MouseEvent) {
    // Do nothing if paused, or the event was already processed
    if (paused || event.defaultPrevented) return

    // Add a new body to the simulation on mouse release.
    mouseDown = false
    val bRect = canvas.getBoundingClientRect()
    val mouseX = (event.clientX - bRect.left) * (canvas.width / bRect.width) - canvas.width / 2
    val mouseY = canvas.height / 2 - (event.clientY - bRect.top) * (canvas.height / bRect.height)

    // Velocity is just the length of the click & drag vector
    val velocity = Vector(mouseX, mouseY) - tempBody.x
    tempBody = tempBody.copy(v = velocity)
    context.addBody(tempBody)
  }

  fun drawDebugInfo() {
    val debugInfo = """
            |mouseDown = $mouseDown
            |trails = $trails (${context.nPos} points)
            |num bodies = ${context.bodies.size}
            |tempBody = $tempBody
            """.trimMargin()
    canvas.drawText(debugInfo, 5.0, 10.0)
  }
}
