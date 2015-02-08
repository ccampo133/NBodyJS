package ccampo133.nbody.webapp

import ccampo133.nbody.{Vec2D, OrbitingBody}
import org.scalajs.dom
import org.scalajs.dom.html


import scala.scalajs.js.annotation.JSExport

/**
 * @author Chris Campo
 */
@JSExport
object NBodyApp {
  @JSExport
  def main(canvas: html.Canvas): Unit = {
    drawBody(canvas, new OrbitingBody(10, 10, new Vec2D(0, 0), new Vec2D(0, 0)))
  }

  def drawBody(c: html.Canvas, body: OrbitingBody) = {
    type Ctx2D = dom.CanvasRenderingContext2D
    val ctx = c.getContext("2d").asInstanceOf[Ctx2D]
    val w = c.width
    val h = c.height
    val x = w / 2 + body.position.x
    val y = w / 2 - body.position.y

    if (x >= 0 && x <= w && y >= 0 && y <= c.height) {
      val grd = ctx.createRadialGradient(x, y, 0.1, x, y, 10 * math.log(body.radius))
      grd.addColorStop(0, "wheat")
      grd.addColorStop(1, "transparent")

      // Fill with gradient
      ctx.fillStyle = grd
      ctx.fillRect(x - body.radius * 4, y - body.radius * 4, 150, 150)

      // Draw main circle
      ctx.beginPath()
      ctx.arc(x, y, body.radius, 0, 2 * Math.PI, anticlockwise = false)
      ctx.fillStyle = "white"
      ctx.fill()
    }
  }
}
