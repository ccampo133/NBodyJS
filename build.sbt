name := "NBodyJS"

scalaVersion := "2.11.5" // or any other Scala version >= 2.10.2

libraryDependencies += "com.lihaoyi" %%% "utest" % "0.3.0"

testFrameworks += new TestFramework("utest.runner.Framework")

