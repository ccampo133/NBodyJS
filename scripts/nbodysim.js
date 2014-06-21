/// <reference path="vector.js" />
/// <reference path="orbitingbody.js" />
// numerical constants and settings
var t = 0;
var t0 = 0;
var tf = 0;
var dt = 0.05;
var newMass = 100;
var softeningLength = 2;

// global variables
var canvas;
var context;
var newBody;
var newColor = "white";
var paused = false;
var mouseDown = false;
var drawTrails = false;
var bodies = new Array();
var deletedBodyTrails = new Array();

function init()
{
    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");

    window.requestAnimationFrame = (function ()
    {
        // allows this function to work on any browser as 
        // each browser has a different namespace for animation
        return window.requestAnimationFrame ||      // chromium 
        window.webkitRequestAnimationFrame ||       // webkit
        window.mozRequestAnimationFrame ||          // mozilla geko
        window.oRequestAnimationFrame ||            // opera presto
        window.msRequestAnimationFrame ||           // IE trident?

        // fallback function if nothing else works
        function (callback, element)
        {
            window.setTimeout(callback, 1000 / 60);
        }
    })();

    // add bodies
    loadInitialBodies();
    
    // add event handlers
    canvas.addEventListener("mousedown", mouseDownListener, false);
    window.addEventListener("keydown", keyPressListener, false);
    window.addEventListener("DOMMouseScroll", mouseWheelHandler, false); // firefox
    window.addEventListener("mousewheel", mouseWheelHandler, false); // ie9, chrome, safari, opera

    // do the first frame, and then animate
    drawBodies();
}

function loadInitialBodies()
{
    // hard-coded initial conditions
    var initMass = 100000;
    var initX = 50;
    var initY = 0;
    var initVR = 29;
    var initVTheta = 90 * Math.PI / 180;  // 90 degrees, in radians

    var body1 = new OrbitingBody(
                        initMass, 
                        getRadiusFromMass(initMass), 
                        new Vector().xy(initX, initY), 
                        new Vector().rTheta(initVR, initVTheta)
                        );
    body1.color = getColorFromMass(initMass);
    body1.trailEnabled = drawTrails;
    
    // tweak the initial parameters for the second body.
    // set the angle of velocity to 270 degrees (-90), in radians.
    var initVTheta2 = 270 * Math.PI / 180; 
    
    var body2 = new OrbitingBody(
                        initMass, 
                        getRadiusFromMass(initMass), 
                        new Vector().xy(-initX, initY), 
                        new Vector().rTheta(initVR, initVTheta2)
                        );
    body2.color = "black";
    body2.trailEnabled = drawTrails;
    
    // add bodies to the simulation
    bodies.push(body1);
    bodies.push(body2);
}

function drawBodies()
{
    context.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas

    updatePositionsVerlet(); // step forward - integrate newton's law
    t += dt;

    // draw trails
    for (var i = 0; i < bodies.length; i++)
        bodies[i].drawTrail(canvas);

    // draw deleted trails
    for (var i = 0; i < deletedBodyTrails.length; i++)
        deletedBodyTrails[i].drawTrail(canvas);

    // draw all bodies to the screen
    for (var i = 0; i < bodies.length; i++)
        bodies[i].drawBody(canvas);

    // user has clicked, but not released and therefore not specified a velocity. draw this, but static
    if (newBody)
        newBody.drawBody(canvas);

    if (!paused)
        requestAnimationFrame(drawBodies); // create the animation loop
}

function isCollision(body1, body2)
{
    var r12 = body2.position.subtract(body1.position); // position vector pointing from body1 to body2
    if (r12.length() < body2.radius && body1.mass <= body2.mass)
        return true;

    // bodies that are far away are deleted, for computational purposes
    if ((Math.abs(body1.position.x) > 2 * canvas.width) || (Math.abs(body1.position.y) > 2 * canvas.height))
        return true;

    return false;
}

// get the acceleration between two bodies caused by Newton's law of gravity
function gravityAcceleration(body1, body2)
{
    var r12 = body2.position.subtract(body1.position); // position vector pointing from body1 to body2
    var deNom = Math.pow(Math.pow(r12.length(), 2) + Math.pow(softeningLength, 2), 3/2.0);
    return r12.scalarMultiply(body2.mass / deNom);
}

// solve the equations of motion using the Velocity Verlet algorithm
function updatePositionsVerlet()
{
    // calculate the total gravitational force (acceleration) 
    // using Newton's law of gravity (and F = ma) and compute
    // the positions according to the Verlet algorithm.
    var a = new Array();
    var removed = false;
    for (var i = 0; i < bodies.length; i++)
    {
        var body1 = bodies[i];
        a.push(new Vector().xy(0, 0));
        for (var j = 0; j < bodies.length; j++)
        {
            if (i != j)
            {
                var body2 = bodies[j];
                if (isCollision(body1, body2))
                {
                    deletedBodyTrails.push(body1);
                    bodies.splice(i, 1);
                    i--;
                    removed = true;
                    break;
                }
                else
                {
                    a[i] = a[i].add(gravityAcceleration(body1, body2));
                }
            }
        }

        if (!removed)
            body1.position = body1.position.add(body1.velocity.scalarMultiply(dt)).add(a[i].scalarMultiply(dt * dt / 2));
    }

    // recompute the force at the updated positions to get the velocity
    for (var i = 0; i < bodies.length; i++)
    {
        var body1 = bodies[i];
        var a2 = new Vector().xy(0, 0);
        for (var j = 0; j < bodies.length; j++)
        {
            if (i != j)
            {
                var body2 = bodies[j];
                a2 = a2.add(gravityAcceleration(body1, body2));
            }
        }
        body1.velocity = body1.velocity.add(a2.add(a[i]).scalarMultiply(dt / 2));
    }
}

function getRadiusFromMass(mass)
{
    return (mass == 0) ? 1.1 : (10 * (Math.log(mass) / Math.LN10) - 14) / 3;
}

// colors are important... it has to be pretty!
function getColorFromMass(mass)
{
    if (mass == 100000)
        return "#FFD699";
    else if (mass == 10000)
        return "lemonchiffon";
    else 
        return "white";
}

function mouseWheelHandler(e)
{
    var sign = Math.min(1, Math.max(-1, e.detail || e.wheelDelta));
    
    if (mouseDown)
    {
        switch (sign)
        {
            // scrolled up
            case -1:
                if (newMass == 100000 && newColor == "black")
                {
                    newColor = getColorFromMass(newMass);
                }
                else if (newBody.mass > 100)
                {
                    newMass /= 10;
                    newColor = getColorFromMass(newMass);
                }
                else if (newBody.mass == 100)
                {
                    newMass = 0;
                    newColor = getColorFromMass(newMass);
                }
                break;
            
            // scrolled down
            case 1:
                if (newMass == 100000 && newBody.color == getColorFromMass(newMass))
                {
                    newColor = "black";
                }
                else if (newBody.mass == 0)
                {
                    newMass = 100;
                    newColor = getColorFromMass(newMass);
                }
                else if (newBody.mass < 100000)
                {
                    newMass *= 10;
                    newColor = getColorFromMass(newMass);
                }
                break;
        }
        
        newBody.mass = newMass;
        newBody.color = newColor;
        newBody.radius = getRadiusFromMass(newMass);
    }
}

function mouseDownListener(e)
{
    // add a new body to the simulation on click (if it isn't paused).
    if (!paused)
    {
        mouseDown = true;
        t0 = t;
        var bRect = canvas.getBoundingClientRect();
        var mouseX = (e.clientX - bRect.left) * (canvas.width / bRect.width) - canvas.width / 2;
        var mouseY = canvas.height / 2 - (e.clientY - bRect.top) * (canvas.height / bRect.height);
        
        newBody = new OrbitingBody(
            newMass, 
            getRadiusFromMass(newMass), 
            new Vector().xy(mouseX, mouseY), 
            new Vector().xy(0, 0)
            );
        newBody.color = newColor;
        newBody.trailEnabled = drawTrails;

        canvas.removeEventListener("mousedown", mouseDownListener, false);
        window.addEventListener("mouseup", mouseUpListener, false);
    }
    
    //  prevents the mouse down event from having an effect on the main browser window
    if (e.preventDefault)
        e.preventDefault();
    else if (e.returnValue)
        evt.returnValue = false;
    return false;
}

function mouseUpListener(e)
{
    mouseDown = false;
    tf = t;
    var bRect = canvas.getBoundingClientRect();
    var mouseX = (e.clientX - bRect.left) * (canvas.width / bRect.width) - canvas.width / 2;
    var mouseY = canvas.height / 2 - (e.clientY - bRect.top) * (canvas.height / bRect.height);

    // get position delta (displacement) to calculate velocity
    var displacement = new Vector().xy(mouseX, mouseY);
    displacement = displacement.subtract(newBody.position);
    newBody.velocity = displacement.scalarMultiply(1 / (3 * (tf - t0)));
    bodies.push(newBody);
    newBody = null

    canvas.addEventListener("mousedown", mouseDownListener, false);
    window.removeEventListener("mouseup", mouseUpListener, false);
}

function keyPressListener(e)
{
    switch (e.keyCode)
    {
        case 84: // t - trails
            drawTrails = !drawTrails;
            deletedBodyTrails = new Array();
            for (var i = 0; i < bodies.length; i++)
            {
                bodies[i].trailEnabled = drawTrails;
                bodies[i].trail = new Array();
            }
            break;
        case 80: // p - pause
            paused = !paused;
            if (!paused)
                drawBodies();
            break;
        case 82: // r - reset
            bodies = new Array();
            deletedBodyTrails = new Array();
            t = 0;
            loadInitialBodies();
            break;
        case 67: // c - clear
            bodies = new Array();
            deletedBodyTrails = new Array();
            break;
        case 38: // up arrow
            mouseWheelHandler({detail: 1});
            break;
        case 40: // down arrow
            mouseWheelHandler({detail: -1});
            break;
    }
}