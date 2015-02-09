package ccampo133.nbody

import utest._

/**
 * @author Chris Campo
 */
object VerletTests extends TestSuite {
  val epsilon = 1e-12

  def tests = TestSuite {
    'testVerletSimple {
      // Particle is moving with constant acceleration at a 45 degree angle
      val x = new Vec2D(0, 0)
      val v = new Vec2D(0, 0)
      val a = new Vec2D(1, 1)
      val (x2, v2, a2) = Physics.verlet(x, v, a, 1, () => a)
      assert(math.abs(x2.x - 0.5) < epsilon && math.abs(x2.y - 0.5) < epsilon)
      assert(math.abs(v2.x - 1) < epsilon && math.abs(v2.y - 1) < epsilon)
      assert(math.abs(a2.x - 1) < epsilon && math.abs(a2.y - 1) < epsilon)
    }
  }
}
