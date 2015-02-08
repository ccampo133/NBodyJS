package ccampo133.nbody

import main.scala.ccampo133.nbody.Vec2D
import utest._

object Vec2DTests extends TestSuite {
  val epsilon = 1e-8

  def tests = TestSuite {
    'testAdd {
      val v1 = new Vec2D(1.5, 2.2)
      val v2 = new Vec2D(1.5, 2.2)
      val v3 = v1 + v2
      assert(math.abs(v3.x - 3) < epsilon)
      assert(math.abs(v3.y - 4.4) < epsilon)
    }
    'testSubtract {
      val v1 = new Vec2D(1.5, 2.0)
      val v2 = new Vec2D(1.0, 1.2)
      val v3 = v1 - v2
      assert(math.abs(v3.x - 0.5) < epsilon)
      assert(math.abs(v3.y - 0.8) < epsilon)
    }
  }
}
