enablePlugins(ScalaJSPlugin)

name := "NBodyJS"

scalaVersion := "2.11.5"

persistLauncher in Compile := true

persistLauncher in Test := false

libraryDependencies += "com.lihaoyi" %%% "utest" % "0.3.0" % "test"

libraryDependencies += "org.scala-js" %%% "scalajs-dom" % "0.8.0"

testFrameworks += new TestFramework("utest.runner.Framework")
