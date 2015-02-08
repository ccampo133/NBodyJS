package ccampo133.nbody

import utest._

/**
 * @author Chris Campo
 */
object Vec2DTests extends TestSuite {
  val epsilon = 1e-12

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

    'testScalarMultiply {
      val v1 = new Vec2D(1.1, 2.2)
      val v2 = v1 * 10
      assert(math.abs(v2.x - 11) < epsilon)
      assert(math.abs(v2.y - 22) < epsilon)
    }

    'testDivide {
      val v1 = new Vec2D(11, 22)
      val v2 = v1 / 10
      assert(math.abs(v2.x - 1.1) < epsilon)
      assert(math.abs(v2.y - 2.2) < epsilon)
    }

    'testDot {
      val v1 = new Vec2D(10, 15)
      val v2 = new Vec2D(1, 2)
      val dotProduct = v1 dot v2
      assert(math.abs(dotProduct - 40) < epsilon)
    }

    'testLength {
      val v1 = new Vec2D(1, 2)
      assert(math.abs(v1.length() - math.sqrt(5)) < epsilon)
    }

    'testGetUnitVector {
      val v1 = new Vec2D(3, 5)
      val v2 = Vec2D.getUnitVector(v1)
      assert(math.abs(v2.length() - 1) < epsilon) // Check for unit length
      assert(math.atan(v2.y / v2.x) - math.atan(v1.y / v1.x) < epsilon) // Check same direction
    }
  }
}
