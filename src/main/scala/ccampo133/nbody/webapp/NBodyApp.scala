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

  var delBodies = Set.empty[Body]
  var bodies = Set.empty[Body]
  var trails = true
  val numTrailPts = 150
  val dt = 0.05

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

    // Get bodies that collide or are WAY out of bounds (to preserve resources)
    val curDeletedBodies = for {
      l <- for(b1 <- bodies; b2 <- bodies if b1 != b2) yield (b1, b2)
      if (l._1 isCollision l._2) || outOfMap(l._1.position.x, l._1.position.y)
    } yield l._1

    bodies --= curDeletedBodies
    delBodies ++= curDeletedBodies

    // Only draw bodies that are in bounds
    bodies foreach { b =>
      val (x, y) = xy(b.position.x, b.position.y)
      if (inbounds(x, y)) drawBody(b)
      if (trails && b.positions.length > 0) drawTrail(b)
    }

    if (trails) delBodies foreach drawTrail

    // Update the positions of all bodies using the velocity Verlet algorithm
    // and exclude the current body from the acceleration calculation
    bodies = bodies map { b =>
      val (x, v) = verlet(b.position, b.velocity, dt, pos => gravityAcceleration(pos, bodies - b))
      new Body(b.mass, b.radius, x, v, (b.positions :+ x) takeRight numTrailPts)
    }
  }

  def inbounds(x: Double, y: Double): Boolean =
    x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height

  def outOfMap(x: Double, y: Double): Boolean =
    math.abs(x) > 2 * canvas.width || math.abs(y) > 2 * canvas.height

  // Returns a point relative to the CENTER of the canvas
  def xy(x0: Double, y0: Double): (Double, Double) =
    ((canvas.width / 2) + x0, (canvas.height / 2) - y0)

  def drawBody(body: Body): Unit = {
    val (x, y) = xy(body.position.x, body.position.y)
    val grd = ctx.createRadialGradient(x, y, 0.1, x, y, 10 * math.log(body.radius))
    grd.addColorStop(0, "wheat")
    grd.addColorStop(1, "transparent")

    // Fill with gradient and draw the main circle
    ctx.fillStyle = grd
    ctx.fillRect(x - body.radius * 4, y - body.radius * 4, 150, 150)
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
