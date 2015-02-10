package ccampo133.nbody.webapp

import ccampo133.nbody.Physics._
import ccampo133.nbody.{Body, Vec2D}
import org.scalajs.dom
import org.scalajs.dom.html

import scala.scalajs.js.JSApp

/**
 * @author Chris Campo
 */
object NBodyApp extends JSApp {
  val canvas =
    dom.document
      .getElementById("canvas")
      .asInstanceOf[html.Canvas]

  val ctx =
    canvas.getContext("2d")
      .asInstanceOf[dom.CanvasRenderingContext2D]

  var bodies = Set.empty[Body]

  def main(): Unit = {
    // Initial conditions
    bodies += new Body(1000, 10, new Vec2D(0, 0), new Vec2D(0, 0))
    bodies += new Body(0, 3, new Vec2D(50, 0), new Vec2D(0, -30))
    bodies += new Body(0, 3, new Vec2D(75, 0), new Vec2D(0, 30))

    // Start the main loop
    dom.setInterval(() => run(), 1000 / 60)
  }

  def run(): Unit = {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    bodies foreach drawBody

    bodies = bodies map (b => {
      val (x, v) = verlet(b.position, b.velocity, 0.05, pos => gravityAcceleration(pos, bodies - b))
      new Body(b.mass, b.radius, x, v, b.positions)
    })
  }

  def inbounds(x: Double, y: Double) =
    x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height

  def xy(x0: Double, y0: Double) =
    ((canvas.width / 2) + x0, (canvas.height / 2) - y0)

  def drawBody(body: Body): Unit = {
    // Draw the body relative to the CENTER of the canvas
    val (x, y) = xy(body.position.x, body.position.y)

    // Only draw bodies that are in bounds
    if (!inbounds(x, y)) return

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

  def drawTrail(body: Body): Unit = {
    ctx.beginPath()
    val (x, y) = xy(body.positions(0).x, body.positions(0).y)
    ctx.moveTo(x, y)
    body.positions drop 1 foreach { p =>
      val (x, y) = xy(p.x, p.y)
      if (inbounds(x, y)) ctx.lineTo(x, y) else ctx.moveTo(x, y)
    }
    ctx.strokeStyle = "white"
    ctx.lineWidth = 1.01
    ctx.stroke()
  }
}
