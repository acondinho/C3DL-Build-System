/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @namespace Prevent name conflicts by placing c3dl variables 
 and functions in a javascript 'namespace'. Class adapted from
 Jeremy Giberson's refactorization code.
 */
var c3dl =
{
  // Each renderer requires a unique ID, we start the counter here.	
  rendererID: 0,

  /**
   @private
   Get a unique ID to be assigned to a renderer. Values start at 1 inclusive.
   
   @returns {int} a unique ID for a renderer.
   */
  getNextRendererID: function ()
  {
    return ++c3dl.rendererID;
  },

  /**
   @private
   Bind func's this property to obj
   */
  bind: function (func, bindObj)
  {
    return function ()
    {
      func.call(bindObj, arguments);
    };
  },

  /**
   @private
   Extend one object with properties/methods from another.
   note: extend is meant for adding functionality to instanced objects
   */
  extend: function (baseObj, extObj)
  {
    for (var i in extObj)
    if (extObj[i] != null && extObj[i] != undefined) baseObj[i] = extObj[i];
    return baseObj;
  },

  /**
   @private
   */
  guid: function ()
  {
    return new Date().getTime();
  },

  /**
   @private
   Inherit one object class with properties/methods from another 
   note: inherit is meant for classic inheritance patterns
   */
  inherit: function (parentObject, child)
  {
    child.prototype.__proto__ = parentObject.prototype;
    child.prototype.__parent = parentObject;
    return child;
  },

  /**
   Call a superclass's instance of a function.
   Note: |this| must have been inherited using c3dl.inherit.
   
   @param o |this| from the calling object.
   @param args The |arguments| variable from the called function
   @param funcname The name of the function to be called if the function has no name.
   */
  _super: function (o, args, funcname)
  {
    if (funcname.length == 0) funcname = args.callee.name;
    var tmpparent = o.__parent;
    if (o.__parent.prototype.__parent) o.__parent = o.__parent.prototype.__parent;
    var ret = tmpparent.prototype[funcname].apply(o, args);
    delete o.__parent;
    return ret;
  },

  /** 
   Call the superclass's constructor. 
   Note: |this| must have been inherited using c3dl.inherit.
   
   @param o |this| from the calling object 
   */
  _superc: function (o)
  {
    var tmpparent = o.__parent;
    // Temporarily change our parent to be our parent's parent to
    // avoid infinite recursion.
    if (o.__parent.prototype.__parent) o.__parent = o.__parent.prototype.__parent;
    tmpparent.prototype.constructor.apply(o);
    delete o.__parent;
  },
};/*
Copyright (c) 2008 Seneca College
Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @namespace values within this namespace are guarantted not be be changed
 by the library. The const part of the values such as c3dl.FAR_CLIPPING_PLANE
 indicate the library never changes the value and neither should the user.
 */

/**
 c3dl.TOLERANCE = 0.00001<br />
 This is used as a buffer when doing some calculations with
 floating point numbers.  Due to floating point innacuracy, we cannot
 use == on floating point numbers for comparison.  Two floats which
 we believe to be equal may in fact not be equal, they may vary a
 small amount. Therefore a constant is defined here which will later
 be used to compare against the difference on vector component
 allowing some tolerance.
 @constant
 */
c3dl.TOLERANCE = 0.00001;

/**
 @private
 We need to define this ourselves since it is not present in canvas 3d 0.4.3
 */
c3dl.VERTEX_PROGRAM_POINT_SIZE = 0x8642;

/**
 @private
 */
c3dl.POINT_SMOOTH = 0x0B10;

/**  
 To render c3dl.Point objects using the built-in WebGL
 points rendering ( using circles ), pass this value to
 the Scene's setPointRenderingMode() method.
 
 Note that using this method of rendering c3dl.Point objects may crash
 the browser or OS.
 @constant
 */
c3dl.POINT_MODE_POINT = 1;

/**
 To render c3dl.Point objects using spheres, pass this
 value to the Scene's setPointRenderingMode() method.
 
 This is the default method to render c3dl.Point objects.
 @constant
 */
c3dl.POINT_MODE_SPHERE = 2;

/**
 @private
 c3dl.NEAR_CLIPPING_PLANE = 0.1<br />
 The distance from the viewpoint to the camera's near
 clipping plane.  This should always be positive.
 @constant
 */
c3dl.DEFAULT_NEAR_CLIPPING_PLANE = 0.1;

/**
 @private
 c3dl.DEFAULT_FAR_CLIPPING_PLANE = 8000.0<br />
 The distance from the viewpoint to the camera's far
 clipping plane.  This should always be positive.
 @constant
 */
c3dl.DEFAULT_FAR_CLIPPING_PLANE = 8000.0;

/**
 @private
 c3dl.FIELD_OF_VIEW = 45.0<br />
 Angle in degree of the camera's field of view. Must
 range from 0 to 180.
 @constant
 */
c3dl.DEFAULT_FIELD_OF_VIEW = 45.0;

/**
 @private
 c3dl.GLES_CONTEXT_20 = 2.0<br />
 @constant
 */
c3dl.GLES_CONTEXT_20 = 2.0;


/**
 @private
 c3dl.MAX_LIGHTS = 7<br />
 @constant
 */
c3dl.MAX_LIGHTS = 7;

/**
 @private
 If c3dl.Light is ever instantiated, which it shouldn't, it will have the the light
 type of abstract. In that case we tell the user they have an error in their script.
 @constant
 @see c3dl.Light
 */
c3dl.ABSTRACT_LIGHT = 0;

/**
 @private
 A directional light is a light which does not have a position, but only
 a direction. The light is understood to be infinitely far away.
 @constant
 @see c3dl.DirectionalLight
 */
c3dl.DIRECTIONAL_LIGHT = 1;

/**
 @private
 A positional light is a light with a position property.
 @constant
 @see c3dl.PositionalLight
 */
c3dl.POSITIONAL_LIGHT = 2;

/**
 @private
 A spotlight is a positional light with a cutoff component, so light is
 restricted to a cone shape.
 @constant
 @see c3dl.SpotLight
 */
c3dl.SPOT_LIGHT = 3;


/**
 @private
 Symbol which must be passed into matrixMode() method to change the
 matrix mode to projection.
 @constant
 */
c3dl.PROJECTION = 1;

/**
 @private
 Symbol which must be passed into matrixMode() method to change the
 matrix mode to model view.
 @constant
 */
c3dl.MODELVIEW = 2;

/**
 */
c3dl.COLLADA = 0;

/**
 */
c3dl.LINE = 1;

/**
 */
c3dl.POINT = 2;

/**
 */
c3dl.PARTICLE_SYSTEM = 3;

////////////////////// SCENE /////////////////////////
/**
 @constant
 */
c3dl.DEFAULT_BG_RED = 0.4;


/**
 @constant
 */
c3dl.DEFAULT_BG_GREEN = 0.4;


/**
 @constant
 */
c3dl.DEFAULT_BG_BLUE = 0.6;


/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.ZERO = 0;

/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.ONE = 1;

/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.SRC_COLOR = 0x0300;

/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.ONE_MINUS_SRC_COLOR = 0x0301;

/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.SRC_ALPHA = 0x0302;

/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.ONE_MINUS_SRC_ALPHA = 0x0303;

/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.DST_ALPHA = 0x0304;

/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.ONE_MINUS_DST_ALPHA = 0x0305;

/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.DST_COLOR = 0x0306;

/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.ONE_MINUS_DST_COLOR = 0x0307;

/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.SRC_ALPHA_SATURATE = 0x0308;


/**
 Used to set the blending equation in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setBlendEquation
 */
c3dl.FUNC_ADD = 0x8006;

/**
 Used to set the blending equation in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setBlendEquation
 */
c3dl.FUNC_SUBTRACT = 0x800A;

/**
 Used to set the blending equation in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setBlendEquation
 */
c3dl.FUNC_REVERSE_SUBTRACT = 0x800B;




////////////////////////// SHADERS  /////////////////////////
/**
 @private
 When we try to get a location of a variable from a shader program,
 it may not exist.  If that is the case, WebGL will return -1 to
 indicate that.
 @constant
 */
c3dl.SHADER_VAR_NOT_FOUND = -1;


/**
 This is used internally by c3DL.
 @constant
 @private
 */
c3dl.VERTEX_SHADER = "x-vertex";

/**
 This is used internally by c3DL.
 @constant
 @private
 */
c3dl.FRAGMENT_SHADER = "x-fragment";





// 0x0001 is the value assigned to glCanvas3D.LINES. Similarly,
// 0x0004 is the value assigned to glCanvas3D.TRIANGLES.  We have to
// use the numerical values here since we do not yet have a context.
// Within the renderer is a variable which hold one of these values.
// When drawArrays() is called, it will be given this value, thus filled
// trianges or lines will be rendered.
// This was done to avoid having:
// if(fillMode == c3dl.WIRE_FRAME)
//    drawArrays(glCanvas3D.LINES, ...);
//  else
//    drawArrays(glCanvas3D.TRIANGLES,...);
//
// instead of the above code, we only need one line of code.
/**
 Pass this to renderer's setFillMode() if you want models to be
 drawn with lines. Note that using this may result in rendering of
 extra lines.  This should mostly used for debugging scripts such as
 when drawing bounding volumes.
 @constant
 @see c3dl.Renderer#setFillMode
 */
c3dl.WIRE_FRAME = 0x0001;

/**
 Pass this to a renderer's setFillMode() if you want models to be
 drawn 'filled in'. Renderers will use fill mode by default.
 
 @constant
 @see c3dl.Renderer#setFillMode
 */
c3dl.FILL = 0x0004;



//////////////////////// DEBUG  ////////////////////////////////
/**
 This is used internally in c3DL by the debug class.
 @private
 @constant
 */
c3dl.DEBUG_INFO = "Info";

/**
 This is used internally in c3DL by the debug class.
 @private
 @constant
 */
c3dl.DEBUG_ERROR = "Error";

/**
 This is used internally in c3DL by the debug class.
 @private
 @constant
 */
c3dl.DEBUG_WARNING = "Warning";

/**
 This is used internally in c3DL by the debug class.
 @private
 @constant
 */
c3dl.DEBUG_EXCEPTION = "Exception";

////////////////////////////// PICKING ///////////////////////////
/**
 This constant can be passed into the setPickingPrecision() of scene
 if accuracy is not important for your script and/or you require the
 picking algorithm to work as fast as possible.  If using this value, when
 a user clicks on the canvas, all objects which can be picked will only
 be tested against their bounding volume.
 
 @constant
 */
c3dl.PICK_PRECISION_BOUNDING_VOLUME = 1;

/**
 This is currently the most accurate test available.  If this is passed
 into the setPickingPrecision() function of scene, everytime the user clicks,
 the ray generated will be tested against the triangles of each model which
 pass the bounding volume test.  Use this constant if accuracy is important
 for your script using C3DL.<br />
 <br />
 This is the default precision of each scene created.
 
 @constant
 */
c3dl.PICK_PRECISION_TRIANGLE = 2;

try {
  WebGLFloatArray;
} catch (x) {
  WebGLFloatArray = Float32Array;
}
const C3DL_FLOAT_ARRAY = WebGLFloatArray;/**
 @namespace
 
 If a parameter's type is followed by square braces, it means the
 parameter has a default value, therefore setting that parameter is
 optional.
 */
c3dl.effects =
{
};

/**
 @private
 @constant
 */
c3dl.effects.STD_EFFECT = 0;


c3dl.effects.SOLID_COLOR = 0;
/**
 Gooch shading is a type of Non-photorealistic rendering (NPR) which is often used
 in technical illustrations since it properly conveys the shape of objects.
 
 Warm and cool colors are used to indicate the surface normals and therefore
 the curvature of the object.<br /><br />
 
 <b>Parameters</b><br />
 warmColor {Array} [0.5, 0.5, 0.0] Fragments closer to active light are colored using the warm color.<br />
 coolColor {Array} [0.0, 0.0, 1.0] Fragments farther from the active light are colored using the cool color.<br />
 surfaceColor {Array} [0.1, 0.1, 0.1] Base surface color.<br />
 
 @constant
 */
c3dl.effects.GOOCH = 0;

/**
 The cartoon effect renders objects as if they were cartoons.
 This effect only uses some light information.For positional lights,
 the position is taken into account. For directional lights, the
 direction is taken into account and for spotlights, the position,
 direction and cutoff are taken into account.<br />
 <br />
 
 <b>Parameters</b><br />
 qMap {String} Path of a quantization map.<br />
 
 @constant
 */
c3dl.effects.CARTOON = 0;

/**
 Renders objects using sepia color tones. Once the final colors are calculated
 for each fragment, they will be converted to greyscale, and finally multiplied
 by the sepia tone.<br />
 <br />
 
 <b>Parameters</b><br />
 color {Array} [1.2, 1.0, 0.8] Sepia tone.
 @constant
 */
c3dl.effects.SEPIA = 0;

/**
 The greyscale effect renders objects using shades of grey. The method which is used to
 convert the colors to greyscale closely matches the NTSC standard to convert colors to
 greyscale. NTC uses (Red * 0.33 + Green * 0.5 + Blue * 0.17).<br />
 <br />
 
 <b>Parameters</b><br />
 color {Array} [0.3, 0.6, 0.1] Values closely match the NTSC standard values to convert color 
 to greyscale values. <br />
 
 @constant
 */
c3dl.effects.GREYSCALE = 0;

/**
 This constant is an effect and therefore does not need to be
 instantiated. If a geometric object is not explicitly assigned an effect, 
 it will be rendered using this instance effect which is closely matches 
 the fixed function pipepline shaders. Use this if an object was assigned
 an effect, but should then be set back to standard rendering.<br />
 <br />
 This can be passed directly to an object's setEffect.<br />
 <br />
 
 <b>Parameters</b><br />
 none
 
 @constant
 */
c3dl.effects.STANDARD = 1;/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class used to output error, warning and information to either the page or firebug.
 If firebug is enabled, the message will appear in both firebug and the page.
 */
c3dl.debug =
{
  //
  BENCHMARK: false,
  DUMMY: false,
  DUMP: false,
  SHARK: false,

  // will the messages be visible to the user which the script is running?
  isVisible: true,

  // keep track of the total number of lines logged and prevent logging
  // too many, which may slow down the browser.
  numLinesLogged: 0,

  // once this many lines have been logged, logging will stop to prevent the
  // browser from slowing down.
  maxLinesToLog: 100,

  isSetUp: false,

  // this will contain a div element which will be populated with <p> tags which 
  // are warning, errors, etc.
  logDiv: null,

  // make sure the user has firebug before writing to the firebug console.
  isFirebugEnabled: false,

  /**
   Is the debugger visible?
   
   @returns {boolean} true if logs will be displayed for the user, false otherwise.
   */
  getVisible: function ()
  {
    return c3dl.debug.isVisible;
  },

  /**
   @private
   Setup creates a div element and adds it to the DOM. This div will be populated with any warnings, 
   errors, etc. which happen to occur during the execution of the script.
   */
  setup: function ()
  {
    windowWidth = document.body.clientWidth - 50;
    windowHeight = document.body.clientHeight;
    logWindowWidth = windowWidth;
    logWindowHeight = 200;
    c3dl.debug.logDiv = document.createElement("div");
    c3dl.debug.logDiv.style.width = logWindowWidth + "px";
    c3dl.debug.logDiv.style.position = 'absolute';
    c3dl.debug.logDiv.style.top = windowHeight - logWindowHeight;
    c3dl.debug.logDiv.style.left = 5;
    c3dl.debug.logDiv.style.padding = 5;
    c3dl.debug.logDiv.style.opacity = .8;
    c3dl.debug.logDiv.style.border = '1px solid #000';
    c3dl.debug.logDiv.id = 'logdiv';
    c3dl.debug.logDiv.name = 'logdiv';
    document.body.appendChild(c3dl.debug.logDiv);

    // find out if the user is using firebug. If they are, we can add the messages to the
    // firebug console as well as the DOM.
    try
    {
      if (console)
      {
        c3dl.debug.isFirebugEnabled = true;
      }
    }
    catch (err)
    {
      c3dl.debug.isFirebugEnabled = false;
    }
    c3dl.debug.isSetUp = true;
  },

  /**
   
   @private
   @author Jeremy Giberson
   This gem will wrap any function call with an inspector that will log parameters and return values.
   
   param {String} functionName function calls you want to inspect
   param {Object} object
   */
  inspect: function (functionName, object)
  {
    var f;
    f = (object) ? object.functionName : window.funcName;
    object.functionName = function ()
    {
      // log args
      // c3dl.debug.log (arguments);
      var r = f.call(args);
      // log r
      // c3dl.debug.log (r);
      return r;
    }
  },

  /**
   Set the visibility of the logs.
   
   @param {boolean} isVisible true if the logs should be displayed, false if the logs should not
   be displayed.
   */
  setVisible: function (isVisible)
  {
    c3dl.debug.isVisible = isVisible;
  },

  /**
   @private
   If the user has firebug, the warning will
   be placed in the console.  The warning will also appear on the HTML page itself.
   
   @param {String} str The string which will be displayed on the HTML page.
   @param {String} type The type of log, either 'Info', 'Warning' or 'Error'.
   @param {String} colour A string which contains an HTML colour encoded 
   value, such as '#FF6666', 'yellow', etc.
   */
  doLog: function (str, type, color)
  {
    if (c3dl.debug.getVisible())
    {
      // if we reached the max number of lines to log, we will overwrite the parameters passed in
      // and print out our our warning specifying no more lines will be logged.
      if (c3dl.debug.numLinesLogged == c3dl.debug.maxLinesToLog)
      {
        // Too many lines logged may overload/slow down the browser.
        str = "Too many lines to log (" + c3dl.debug.numLinesLogged + "). Logging stopped.";
        type = c3dl.DEBUG_WARNING;
        colour = "yellow";
      }

      // don't log anything if we have too many lines, just return from this function.
      if (c3dl.debug.numLinesLogged > c3dl.debug.maxLinesToLog)
      {
        return;
      }

      if (!c3dl.debug.isSetUp)
      {
        c3dl.debug.setup();
      }

      // Output a log line to the HTML page
      var currentTime = new Date();

      // this should probably be lowercase
      var node = document.createElement('p');
      node.innerHTML = currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + 
        currentTime.getSeconds() + ' ' + type + ': ' + str;
      node.style.background = color;
      c3dl.debug.logDiv.insertBefore(node, c3dl.debug.logDiv.firstChild);

      // output an appropriate log to the firebug console if it is enabled. If 
      // the user has firebug installed, but the console is enabled and we don't
      // check for this, our script could break.
      if (c3dl.debug.isFirebugEnabled)
      {
        switch (type)
        {
        case c3dl.DEBUG_WARNING:
          console.warn(str);
          break;
        case c3dl.DEBUG_ERROR:
          console.error(str);
          break;
        case c3dl.DEBUG_INFO:
          console.info(str);
          break;
        default:
          break;
        }
      }
      c3dl.debug.numLinesLogged++;
    }
  },

  /**
   @private
   Provide some sort of information the user should know about.
   
   @param {String} infoMsg the message containing some information which may be useful
   to the user.
   */
  logInfo: function (infoMsg)
  {
    c3dl.debug.doLog(infoMsg, c3dl.DEBUG_INFO, '#CCFFFF');
  },

  /**
   @private
   Inform the user of a warning. A warning indicates the script can still run, 
   but whatever caused the warning should be fixed. One example of a warning is trying to
   add an object to a scene which is not a valid object.
   
   @param {String} warningMsg the message containing information about the warning.
   */
  logWarning: function (warningMsg)
  {
    c3dl.debug.doLog(warningMsg, c3dl.DEBUG_WARNING, '#FFFF00');
  },

  /**
   @private
   Inform the user an exception has been caught. An exception can be something like trying to 
   access an array with an out of bounds index or trying to enable an unsupported capability.
   The script may still be able to run even after an exception has occured.
   
   @param {String} exceptionMsg the message containing information about the exception.
   */
  logException: function (exceptionMsg)
  {
    c3dl.debug.doLog(exceptionMsg, c3dl.DEBUG_EXCEPTION, '#FF6600');
  },

  /**
   @private
   Inform the user an error has occured.  An error prevents the script from running properly.
   An example of an error is the renderer failing to initialize because of an invalid value 
   passed to the renderer's initialize method.
   
   @param {String} errorMsg A string which indicates why the script failed to run.
   */
  logError: function (errorMsg)
  {
    c3dl.debug.doLog(errorMsg, c3dl.DEBUG_ERROR, '#FF2222');
  }
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class base class for WebGL.
 */
c3dl.Renderer = function ()
{
  // use an invalid value which must be overwritten.
  this.version = 0.0;

  // a detailed description of the renderer
  this.versionString = "Renderer interface.";

  // by default we fill in the models, wireframe is mostly for debugging.
  this.fillMode = c3dl.FILL;

  this.lightingOn = true;

  // these will be set by the derived renderer on initialization.
  this.contextWidth = 0;
  this.contextHeight = 0;

  /**
   */
  this.getLighting = function ()
  {
    return this.lightingOn;
  }

  /**
   Get the maximum line width supported which is implementation dependent.
   
   @returns {int} maximum line width supported.
   */
  this.getMaxLineWidth = function ()
  {
    // derived classes must implement this function.
  }

  /**
   Get the version of the renderer as a number.
   
   @returns { 0.0 | 2.0 } A value of 0.0 is returned if the class was instantiated incorrectly.
   */
  this.getVersion = function ()
  {
    return this.version;
  }

  /**
   Get the WebGL version string.
   
   @returns {"Renderer interface" | "WebGL"} "Renderer interface" is returned if the Renderer was not instantiated correctly.
   */
  this.getVersionString = function ()
  {
    return this.versionString;
  }


  /**
   Are objects filled in or are they rendered using wireframe?
   
   @returns {int} either c3dl.FILL or c3dl.WIRE_FRAME.
   */
  this.getFillMode = function ()
  {
    return this.fillMode;
  }

  /**
   @private
   Set the color the canvas will be cleared to each frame.
   
   @param {Array} clearColor Array of 4 values in the order [r,g,b,a] which must
   be in the range [0.0 - 1.0].
   */
  this.setClearColor = function (clearColor)
  {
    // derived classes must implement this function.
  }

  /**
   Set how objects will be rendered, either filled in or using wireframe.
   
   @param {c3dl.FILL | c3dl.WIRE_FRAME} mode
   */
  this.setFillMode = function (mode)
  {
    if (mode == c3dl.FILL || mode == c3dl.WIRE_FRAME)
    {
      this.fillMode = mode;
    }
    else
    {
      c3dl.debug.logWarning('Invalid value "' + mode + '" passed to setFillMode()');
    }
  }

  /**
   */
  this.setLighting = function (isOn)
  {
    this.lightingOn = isOn;
  }

  /**
   */
  this.getContextWidth = function ()
  {
    return this.contextWidth;
  }

  /**
   */
  this.getContextHeight = function ()
  {
    return this.contextHeight;
  }
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class WebGL context.
 @augments c3dl.Renderer
 */
c3dl.WebGL = function ()
{
  var glCanvas3D = null; // GL Context; 
  this.texManager = null;

  // overwrite the version set in the Renderer base class.
  this.version = 2.0;

  // overwrite the version set in the Renderer base class.
  this.versionString = "WebGL";

  // program objects to render various visual objects.
  this.geometryShader;
  this.particleSystemShader;
  this.pointShader;
  this.pointSphereShader;
  this.lineShader;
  this.boundingSphereShader;
  this.programsWithLights = [];

  /// Maybe need to move these out somewhere else
  this.pointVertBuffer = null;
  this.pointColBuffer = null;

  this.lineVertBuffer = null;
  this.lineColBuffer = null;

  // unique id of this renderer
  this.ID = c3dl.getNextRendererID();
  this.STANDARD_PROGRAM_ID = null;

  this.textureQueue = [];

  // have the vbos to render point spheres been created
  this.pointSphereRenderReady = false;

  // Verts, Normals, etc will be added to this.
  this.pointsphereVBOVert;

  /**
   Add a texture to the renderer. If the texture was added before
   the renderer was initialized, the texture will be placed in a 
   queue and the texture will be created once the renderer has been
   initialized.
   
   The renderer will create an internal ID for the texture which can
   be queried by calling getTextureID. This ID can be passed to commands 
   of the context in the rendering callback function in effects to make 
   that texture active.
   
   @parma {String} path Texture path
   */
  this.addTexture = function (path)
  {
    //
    if (this.texManager == null)
    {
      this.textureQueue.push(path);
    }
    else
    {
      this.texManager.addTexture(path);
    }
  }

  /**
   Get the unique ID of this renderer.
   
   @returns {int} unique ID of this renderer.
   */
  this.getID = function ()
  {
    return this.ID;
  }

  /**
   Get the ID of the texture at 'texturePath'. If the texture could not
   be found or the renderer has not yet been initialized, -1 will be 
   returned.
   
   @param {String} texturePath
   
   @returns {int} The ID of the texture, or -1 if the renderer has not 
   yet been initialized or if the texture was not found.
   */
  this.getTextureID = function (texturePath)
  {
    if (this.texManager)
    {
      return this.texManager.getID(texturePath);
    }
    else
    {
      return -1;
    }
  }

  /**
   @private
   Is the renderer ready?
   
   @returns {boolean} True if the context is not null, otherwise false.
   */
  this.isReady = function ()
  {
    return glCanvas3D == null ? false : true;
  }

  /**
   Get the WebGL context.
   
   @returns {Context} The GL Context.
   */
  this.getGLContext = function ()
  {
    return glCanvas3D;
  }

  /**
   @private
   Create a program which is composed of shaders.
   
   Create a program object which is composed of compiled shader objects.
   This program object can be installed as the current rendering state 
   by using gl.useProgram().
   
   @param {Array|String} vertexShaderSource The source code for the vertex shader.
   @param {Array|String} fragmentShaderSource The source code for the fragment shader.
   
   @return {c3dl.ProgramObject} ProgramObject or null .
   */
  this.createProgram = function (vertexShader, fragmentShader)
  {
    // We don't check the parameters because the WebGL functions will already
    // be checking to make sure the source is valid when it compiles them. If 
    // they are invalid, error messages will be displayed on the page.
    // make alias for shorter code.
    var gl = glCanvas3D;

    // createProgram creates a program object to which our shaders can be
    // attached. We can later tell WebGL which program to use by 
    // calling useProgram().
    var program = gl.createProgram();

    // it is possible createProgram failed.
    if (program == null)
    {
      c3dl.debug.logError("failed to create shader program");
      return null;
    }

    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertexShader);


    gl.compileShader(vertShader);

    // The compilation status of each shader can be queried.
    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS))
    {
      c3dl.debug.logError("vert shader: " + gl.getShaderInfoLog(vertShader));
      gl.deleteShader(vertShader);
      return null;
    }

    gl.attachShader(program, vertShader);


    var vertShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertShader, fragmentShader);
    gl.compileShader(vertShader);

    // The compilation status of each shader can be queried.
    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS))
    {
      c3dl.debug.logError("frag shader " + gl.getShaderInfoLog(vertShader));
      gl.deleteShader(vertShader);
      return null;
    }
    gl.attachShader(program, vertShader);

    // Linking is the final step which must be done to obtain a valid
    // program object. Linking assigns variable locations for uniform variables,
    // initialized user-defined uniform variables, resolves references
    // between independently compiled shader objects, etc.
    //
    // The status of the link operation is stored as part of the program object's
    // state which we will query.
    // 
    gl.linkProgram(program);

    // Check if the shaders were linked successfully.
    if (gl.getProgramParameter(program, gl.LINK_STATUS) != 1)
    {
      c3dl.debug.logError(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }

    // create a program object, similar to an WebGL program object.
    var programObject = new c3dl.ProgramObject();
    programObject.rendererID = this.ID;
    programObject.programID = program;

    return programObject;
  }

  /**
   @private
   Clear the color and depth buffers.
   
   Scene is responsible for calling this.
   */
  this.clearBuffers = function ()
  {
    glCanvas3D.clear(glCanvas3D.COLOR_BUFFER_BIT | glCanvas3D.DEPTH_BUFFER_BIT);
  }

  /**
   @private
   Swap the front and back buffers. Scene is responsible for calling this.
   */
  this.swapBuffers = function ()
  {
    glCanvas3D.clear(glCanvas3D.COLOR_BUFFER_BIT | glCanvas3D.DEPTH_BUFFER_BIT);
  }

  /**
   @private
   this is documented in the renderer class
   */
  this.setClearColor = function (bgColor)
  {
    if (bgColor.length >= 3)
    {
      glCanvas3D.clearColor(bgColor[0], bgColor[1], bgColor[2], 1.0);
    }
  }

  /**
   @private
   
   implementes the 'virtual' function getMaxLineWidth from renderer.
   
   Get the maximum line width supported which is implementation
   dependent.
   
   @returns {int} maximum line width supported.
   */
  this.getMaxLineWidth = function ()
  {
    // returns the range, first value represents minimum value supported.
    // WebGL guarantees support for width of 1.
    // should this be checked once on init and then we don't have to keep querying?
    var maxLineWidth = glCanvas3D.getParameter(glCanvas3D.ALIASED_LINE_WIDTH_RANGE);

    return maxLineWidth[1];
  }

  /**
   @private
   Set the shader values to zero so the light no longer affects the scene.
   
   @param {int} lightID The light to clear must range from 0 to one less than c3dl.MAX_LIGHTS.
   */
  this.clearLight = function (lightID)
  {
    if (lightID >= 0 && lightID < c3dl.MAX_LIGHTS)
    {
      for (var i = 0, len = this.programsWithLights.length; i < len; i++)
      {
        var PID = this.programsWithLights[i];

        // base string to shorten code below.
        var base = "lights[" + lightID + "].";
        glCanvas3D.useProgram(PID);
        this.setUniformf(PID, base + "position", [0, 0, 0]);
        this.setUniformf(PID, base + "ambient", [0, 0, 0]);
        this.setUniformf(PID, base + "diffuse", [0, 0, 0]);
        this.setUniformf(PID, base + "specular", [0, 0, 0]);
        this.setUniformf(PID, base + "spotDirection", [0, 0, -1]);
        this.setUniformf(PID, base + "spotCutoff", 180);
        this.setUniformf(PID, base + "spotExponent", 0);
        this.setUniformf(PID, base + "attenuation1", 1);
        this.setUniformf(PID, base + "attenuation2", 0);
        this.setUniformf(PID, base + "attenuation3", 0);
        this.setUniformi(PID, base + "type", 0);
        this.setUniformi(PID, base + "isOn", 0);
      }
    }
  }

  /**
   @private
   
   @param {Array} ambientLight Array of lights
   */
  this.updateAmbientLight = function (ambientLight)
  {
    // the toon shader uses lights, but does not use
    // the ambient light. We need to turn off debugger to
    // suppress any errors.
    var prevVal = c3dl.debug.getVisible();
    c3dl.debug.setVisible(false);

    for (var i = 0, len = this.programsWithLights.length; i < len; i++)
    {
      glCanvas3D.useProgram(this.programsWithLights[i]);
      this.setUniformf(this.programsWithLights[i], "ambientLightColor", ambientLight);
      this.setUniformi(this.programsWithLights[i], "lightingOn", this.getLighting());
    }

    // turn it back on if it was on before.
    if (prevVal == true)
    {
      c3dl.debug.setVisible(true);
    }
  }

  /**
   @private
   Update the light states in the shader with lightList.
   
   @param {Array} lightList Array of lights
   */
  this.updateLights = function (lightList)
  {
    // The list of all the program objects which have lights need to be updated
    for (var progObjIter = 0, len = this.programsWithLights.length; progObjIter < len; progObjIter++)
    {
      var shader = this.programsWithLights[progObjIter];

      glCanvas3D.useProgram(shader);

      // iterate over all the lights
      for (var i = 0, len2 = lightList.length; i < len2; i++)
      {
        // create a base string to shorten code below.
        var base = "lights[" + i + "].";

        // we may have nulls in the array which represent places lights can be inserted
        // so we have to check for these.
        if (lightList[i] != null)
        {
          // if the light is off, that's the only uniform var that needs to be set.
          if (lightList[i].isOn() == false)
          {
            this.setUniformi(shader, base + "isOn", lightList[i].isOn());
          }
          else
          {
            if (lightList[i] instanceof c3dl.DirectionalLight)
            {
              // place the light in viewspace here instead of the shader, preventing placing the lights
              // in viewspace for every vertex.
              var dir = c3dl.multiplyMatrixByDirection(c3dl.peekMatrix(), lightList[i].getDirection());
              dir =c3dl.addVectorComponent(dir,0);

              this.setUniformf(shader, base + "position", dir);

              // this is used to distinguish a directional light from a spotlight.
              this.setUniformf(shader, base + "spotCutoff", 180);
            }

            // check if its a spotlight first before positional light!
            else if (lightList[i] instanceof c3dl.SpotLight)
            {
              var pos = lightList[i].getPosition();
              pos = c3dl.multiplyMatrixByVector(c3dl.peekMatrix(), pos);
              pos = c3dl.addVectorComponent(pos,1);

              var dir = lightList[i].getDirection();
              dir = c3dl.multiplyMatrixByDirection(c3dl.peekMatrix(), dir);

              this.setUniformf(shader, base + "position", pos);
              this.setUniformf(shader, base + "spotDirection", dir);
              this.setUniformf(shader, base + "spotCutoff", lightList[i].getCutoff());
              this.setUniformf(shader, base + "spotExponent", lightList[i].getExponent());
            }

            else if (lightList[i] instanceof c3dl.PositionalLight)
            {
              var pos = lightList[i].getPosition();
              //pos = c3dl.multiplyMatrixByVector(c3dl.getUniform("viewMatrix"), pos);
              pos = c3dl.multiplyMatrixByVector(c3dl.peekMatrix(), pos);
              pos = c3dl.addVectorComponent(pos,1);

              this.setUniformf(shader, base + "position", pos);
              this.setUniformf(shader, base + "spotCutoff", 180.0);
            }

            this.setUniformi(shader, base + "type", lightList[i].getType());
            this.setUniformi(shader, base + "isOn", lightList[i].isOn());
            this.setUniformf(shader, base + "ambient", lightList[i].getAmbient());
            this.setUniformf(shader, base + "diffuse", lightList[i].getDiffuse());
            this.setUniformf(shader, base + "specular", lightList[i].getSpecular());

            // lights are attenuated as long as they are not directional lights
            if (!(lightList[i] instanceof c3dl.DirectionalLight))
            {
              var attn = lightList[i].getAttenuation();
              this.setUniformf(shader, base + "attenuation1", attn[0]);
              this.setUniformf(shader, base + "attenuation2", attn[1]);
              this.setUniformf(shader, base + "attenuation3", attn[2]);
            }
          }
        }
      }
    }
  }

/*

  */
  this.pointSphereRenderSetup = function ()
  {
    // create the empty WebGL VBO's
    this.pointSphereVBOVert = glCanvas3D.createBuffer();

    // bind to the VBO
    glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.pointSphereVBOVert);

    // set the data using the bounding sphere verts since that sphere has a size of 1 unit
    glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, new WebGLFloatArray(c3dl.BOUNDING_SPHERE_VERTICES), glCanvas3D.STATIC_DRAW);

    // next frame we'll be ready to render
    this.pointSphereRenderReady = true;
  }

  /**
   @private
   
   Create a Renderer.
   
   @param cvs
   
   @returns {boolean} True if the context could be created, 
   otherwise false.
   */
  this.createRenderer = function (cvs)
  {
    if (c3dl.debug.DUMMY)
    {
      glCanvas3D =
      {
      };
      glCanvas3D.__noSuchMethod__ = function ()
      {
        return true;
      }
    }
    else
    {
      try
      {
        glCanvas3D = cvs.getContext('experimental-webgl');
        glCanvas3D.viewport(0, 0, cvs.width, cvs.height);
      }
      catch (err)
      {
      }
    }

    return glCanvas3D ? true : false;
  }

  /**
   @private
   Enables depth testing, create necessary shaders, create the projection
   matrix and set the lighting uniform.
   
   Compiles and link the shaders.
   
   @param {int} width of the canvas in pixels.
   @param {int} height of the canvas in pixels.
   */
  this.init = function (width, height)
  {
    if (glCanvas3D == null)
    {
      return false;
    }

    // set the context width and height. These are the base class
    // members.
    this.contextWidth = width;
    this.contextHeight = height;

    // enable the depth buffer, only needs to be done once, so do it here		
    glCanvas3D.enable(glCanvas3D.DEPTH_TEST);

    // we need to define this ourselves since it is not present in canvas 3d 0.4.3
    this.enable(c3dl.VERTEX_PROGRAM_POINT_SIZE);

    // create the shader programs
    //this.geometryShader = this.createProgram(c3dl.material_vs+c3dl.light_vs+c3dl.model_vs, c3dl.model_fs).getProgramID();
    this.particleSystemShader = this.createProgram(c3dl.psys_vs, c3dl.psys_fs).getProgramID();
    this.pointShader = this.createProgram(c3dl.point_vs, c3dl.point_fs).getProgramID();
    this.lineShader = this.createProgram(c3dl.line_vs, c3dl.line_fs).getProgramID();
    this.pointSphereShader = this.createProgram(c3dl.point_sphere_vs, c3dl.point_sphere_fs).getProgramID();
    this.boundingSphereShader = this.createProgram(c3dl.bounding_sphere_vs, c3dl.bounding_sphere_fs).getProgramID();

    // Template effects
    // STANDARD
    c3dl.effects.STD_EFFECT = new c3dl.EffectTemplate();
    c3dl.effects.STD_EFFECT.addVertexShader(c3dl.material_vs + c3dl.light_vs + c3dl.model_vs);
    c3dl.effects.STD_EFFECT.addFragmentShader(c3dl.model_fs);
    c3dl.effects.STD_EFFECT.setRenderingCallback(c3dl.std_callback);
    c3dl.effects.STD_EFFECT.init();

    c3dl.effects.STANDARD = new c3dl.Effect();
    c3dl.effects.STANDARD.init(c3dl.effects.STD_EFFECT);
    var prog = this.createProgram(c3dl.material_vs + c3dl.light_vs + c3dl.model_vs, c3dl.model_fs);

    c3dl.effects.STANDARD.getEffectTemplate().addProgramObject(prog);
    this.programsWithLights.push(c3dl.effects.STANDARD.getEffectTemplate().getProgramID(this.ID));
    this.STANDARD_PROGRAM_ID = prog.getProgramID();

    // need to create the solid color effect explicitly
    // since effects are really only created if an object uses them.
    // and since we need it for gooch and cartoon....
    ///
    c3dl.effects.SOLID_COLOR_EFFECT_TEMP = new c3dl.EffectTemplate();
    c3dl.effects.SOLID_COLOR_EFFECT_TEMP.addVertexShader(c3dl.solid_color_vs);
    c3dl.effects.SOLID_COLOR_EFFECT_TEMP.addFragmentShader(c3dl.solid_color_fs);
    c3dl.effects.SOLID_COLOR_EFFECT_TEMP.setRenderingCallback(c3dl.solid_color_callback);
    c3dl.effects.SOLID_COLOR_EFFECT_TEMP.init();

    c3dl.effects.SOLID_COLOR_EFFECT = new c3dl.Effect();
    c3dl.effects.SOLID_COLOR_EFFECT.init(c3dl.effects.SOLID_COLOR_EFFECT_TEMP);
    var prog = this.createProgram(c3dl.solid_color_vs, c3dl.solid_color_fs);

    c3dl.effects.SOLID_COLOR_EFFECT.getEffectTemplate().addProgramObject(prog);
    this.SOLID_COLOR_EFFECT_ID = prog.getProgramID();

    // GREYSCALE
    c3dl.effects.GREYSCALE = new c3dl.EffectTemplate();
    c3dl.effects.GREYSCALE.addVertexShader(c3dl.material_vs);
    c3dl.effects.GREYSCALE.addVertexShader(c3dl.light_vs);
    c3dl.effects.GREYSCALE.addVertexShader(c3dl.greyscale_vs);
    c3dl.effects.GREYSCALE.addFragmentShader(c3dl.greyscale_fs);
    c3dl.effects.GREYSCALE.setRenderingCallback(c3dl.greyscale_callback);
    c3dl.effects.GREYSCALE.addParameter("color", Array, [0.3, 0.6, 0.1]);
    c3dl.effects.GREYSCALE.init();

    // SOLID COLOR    
    c3dl.effects.SOLID_COLOR = new c3dl.EffectTemplate();
    c3dl.effects.SOLID_COLOR.addVertexShader(c3dl.solid_color_vs);
    c3dl.effects.SOLID_COLOR.addFragmentShader(c3dl.solid_color_fs);
    c3dl.effects.SOLID_COLOR.setRenderingCallback(c3dl.solid_color_callback);
    c3dl.effects.SOLID_COLOR.addParameter("color", Array, [0.0, 0.0, 0.0]);
    c3dl.effects.SOLID_COLOR.init();

    // SEPIA
    c3dl.effects.SEPIA = new c3dl.EffectTemplate();
    c3dl.effects.SEPIA.addVertexShader(c3dl.material_vs);
    c3dl.effects.SEPIA.addVertexShader(c3dl.light_vs);
    c3dl.effects.SEPIA.addVertexShader(c3dl.sepia_vs);
    c3dl.effects.SEPIA.addFragmentShader(c3dl.sepia_fs);
    c3dl.effects.SEPIA.setRenderingCallback(c3dl.sepia_callback);
    c3dl.effects.SEPIA.addParameter("color", Array, [1.2, 1.0, 0.8]);
    c3dl.effects.SEPIA.init();

    // CARTOON
    c3dl.effects.CARTOON = new c3dl.EffectTemplate();
    c3dl.effects.CARTOON.addVertexShader(c3dl.cartoon_vs);
    c3dl.effects.CARTOON.addFragmentShader(c3dl.light_vs);
    c3dl.effects.CARTOON.addFragmentShader(c3dl.cartoon_fs);
    c3dl.effects.CARTOON.setRenderingCallback(c3dl.cartoon_callback);
    c3dl.effects.CARTOON.addParameter("qMap", String);
    c3dl.effects.CARTOON.addParameter("outline", Boolean, true);
    c3dl.effects.CARTOON.init();

    // GOOCH
    c3dl.effects.GOOCH = new c3dl.EffectTemplate();
    c3dl.effects.GOOCH.addVertexShader(c3dl.gooch_vs);
    c3dl.effects.GOOCH.addFragmentShader(c3dl.light_vs);
    c3dl.effects.GOOCH.addFragmentShader(c3dl.gooch_fs);
    c3dl.effects.GOOCH.setRenderingCallback(c3dl.gooch_callback);
    c3dl.effects.GOOCH.addParameter("coolColor", Array, [0, 0, 1]);
    c3dl.effects.GOOCH.addParameter("warmColor", Array, [0.5, 0.5, 0.0]);
    c3dl.effects.GOOCH.addParameter("surfaceColor", Array, [0.1, 0.1, 0.1]);
    c3dl.effects.GOOCH.addParameter("outline", Boolean, true);
    c3dl.effects.GOOCH.init();

    this.texManager = new c3dl.TextureManager(glCanvas3D);

    // iterate over all the textures the user added before the renderer
    // was initialized and add them now.
    for (var i in this.textureQueue)
    {
      if (this.textureQueue[i])
      {
        this.texManager.addTexture(this.textureQueue[i]);
      }
    }

    return true;
  }

  /**
   @private
   Render the bounding sphere
   
   @param {c3dl.BoundingSphere} boundingSphere
   */
  this.renderBoundingSphere = function (boundingSphere,viewMatrix)
  {
    // create an short alias
    var shader = this.boundingSphereShader;
    glCanvas3D.useProgram(shader);

    if (this.pointSphereRenderReady == false)
    {
      // create VBO and set the data
      this.pointSphereRenderSetup();
    }
    else
    {
	  var sphereMatrix = c3dl.makeIdentityMatrix();
	  c3dl.matrixMode(c3dl.PROJECTION);
      var projMatrix = c3dl.peekMatrix();
      c3dl.matrixMode(c3dl.MODELVIEW); 
      // set the bounding sphere's position
	  var pos =boundingSphere.getPosition();
	  sphereMatrix[12] = pos[0];
      sphereMatrix[13] = pos[1];
      sphereMatrix[14] = pos[2];
	  sphereMatrix[0] = sphereMatrix[5] = sphereMatrix[10] = boundingSphere.getRadius();

      // create a modelviewprojection matrix.  By doing this, we can multiply
      // 3 matrices together once per model instead of once per vertex.
      var sphereViewMatrix = c3dl.multiplyMatrixByMatrix(viewMatrix,sphereMatrix);
	  
      var MVPMatrix = c3dl.multiplyMatrixByMatrix(projMatrix, sphereViewMatrix);
      this.setUniformMatrix(shader, "modelViewProjMatrix", MVPMatrix);
      this.setVertexAttribArray(shader, "Vertex", 3, this.pointSphereVBOVert);
      glCanvas3D.drawArrays(glCanvas3D.POINTS, 0, c3dl.BOUNDING_SPHERE_VERTICES.length / 3);
    }
  }

  /**
   @private
   Render a geometry
   
   @param {c3dl.Geometry} obj
   */
  this.renderGeometry = function (obj)
  {
    // get the object's effect
    if (obj.getEffect())
    {
      //
      var effect = obj.getEffect().getEffectTemplate();

      var progObjID = effect.getProgramID(this.ID);

      // If the effect's shaders have not yet been compiled for this renderer,
      // compile them.
      if (progObjID == -1)
      {
        var vertexShaders = effect.getVertexShaders();
        var fragmentShaders = effect.getFragmentShaders();

        // join all the shaders, but don't insert a delimiter, that
        // would create a syntax error for the shaders.
        var joinedVertexShaders = vertexShaders.join('');
        var joinedFragmentShaders = fragmentShaders.join('');

        var programObject = this.createProgram(joinedVertexShaders, joinedFragmentShaders);

        // if the effect was successfully compiled, render it using the effect
        if (programObject)
        {
          effect.addProgramObject(programObject);

          // check if the user added the light vertex shader source.
          // if they did, we'll need to update the light states every
          // update for that shader.
          for (var i = 0, len = vertexShaders.length; i < len; i++)
          {
            if (vertexShaders[i] == c3dl.light_vs)
            {
              this.programsWithLights.push(programObject.getProgramID());
              glCanvas3D.useProgram(programObject.getProgramID());
              this.setUniformi(programObject.getProgramID(), "lightingOn", true);
            }
          }

          for (var i = 0, len = fragmentShaders.length; i < len; i++)
          {
            if (fragmentShaders[i] == c3dl.light_vs)
            {
              this.programsWithLights.push(programObject.getProgramID());
              glCanvas3D.useProgram(programObject.getProgramID());
              this.setUniformi(programObject.getProgramID(), "lightingOn", true);
            }
          }
        }
        else
        {
          c3dl.debug.logWarning("could not compile effect shader(s).");
          c3dl.debug.logInfo(joinedVertexShaders);
          c3dl.debug.logInfo(joinedFragmentShaders);
        }
      }
      // if the effect has already been compiled, go ahead and render the geometry.
      else
      {
        var renderingObj =
        {
        };

        // user will need to query states of the context.
        renderingObj["context"] = glCanvas3D;
        renderingObj["getContext"] = function ()
        {
          return this.context;
        };

        // user will need to query states of the renderer.
        // enventually the renderer will completely abtract the context and
        // the context will not need to be passed in. But that requires all
        // functions to be wrapped.
        renderingObj["renderer"] = this;
        renderingObj["getRenderer"] = function ()
        {
          return this.renderer;
        };

        // user will need to set the current program.
        renderingObj['programObjectID'] = progObjID;
        renderingObj['getProgramObjectID'] = function ()
        {
          return this.programObjectID;
        };

        // user will need the actual geometry to render.
        renderingObj['geometry'] = obj;
        renderingObj['getGeometry'] = function ()
        {
          return this.geometry;
        };

        var cb = effect.getRenderingCallback();
        cb(renderingObj);
      }

    }

    // if the geometry didn't have an effect, we'll render it using
    // the standard shader.
    else
    {
      var renderingObj =
      {
      };

      //
      renderingObj["context"] = glCanvas3D;
      renderingObj["getContext"] = function ()
      {
        return this.context;
      };

      //
      renderingObj["renderer"] = this;
      renderingObj["getRenderer"] = function ()
      {
        return this.renderer;
      };

      //
      renderingObj['programObjectID'] = this.STANDARD_PROGRAM_ID;
      renderingObj['getProgramObjectID'] = function ()
      {
        return this.programObjectID;
      };

      //
      renderingObj['geometry'] = obj;
      renderingObj['getGeometry'] = function ()
      {
        return this.geometry;
      };

      c3dl.std_callback(renderingObj);
    }
  }

  /**
   @private	
   Render a particle system.
   
   @param {c3dl.ParticleSystem} psys
   */
  this.renderParticleSystem = function (psys)
  {
    // create shorter alias
    var shader = this.particleSystemShader;
    glCanvas3D.useProgram(shader);

    var usingTexture = false;
    var texturePath = psys.getTexture();
    var texID = this.texManager.getID(texturePath);
    var texAttribLoc = glCanvas3D.getAttribLocation(shader, "Texture");

    // if the texture isn't loaded, but this collation element has one, 
    // queue one up
    if (texID == -1 && texturePath)
    {
      this.texManager.addTexture(texturePath);
    }

    if (texID != -1 && texturePath && psys.getTexCoords())
    {
      glCanvas3D.activeTexture(glCanvas3D.TEXTURE0);
      glCanvas3D.bindTexture(glCanvas3D.TEXTURE_2D, texID);
      this.setVertexAttribArray(shader, "Texture", 2, psys.getVBOTexCoords());
      usingTexture = true;

      glCanvas3D.texParameteri(glCanvas3D.TEXTURE_2D, glCanvas3D.TEXTURE_WRAP_S, glCanvas3D.CLAMP_TO_EDGE);
      glCanvas3D.texParameteri(glCanvas3D.TEXTURE_2D, glCanvas3D.TEXTURE_WRAP_T, glCanvas3D.CLAMP_TO_EDGE);
    }
    else
    {
      glCanvas3D.activeTexture(glCanvas3D.TEXTURE0);
      glCanvas3D.disableVertexAttribArray(texAttribLoc);
      //glCanvas3D.bindTexture(glCanvas3D.TEXTURE_2D,-1);
    }
    this.setUniformi(shader, "usingTexture", usingTexture);
    this.setUniformMatrix(shader, "rot", [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    this.setVertexAttribArray(shader, "Vertex", 3, psys.getVBOVertices());

    for (var i = 0, numParticles = psys.getNumParticles(); i < numParticles; i++)
    {
      if (psys.getParticle(i).isAlive())
      {
        var pSize = psys.getParticle(i).getSize();

        this.setUniformf(shader, "Color", psys.getParticle(i).getColor());

        c3dl.matrixMode(c3dl.PROJECTION);
        var projectionMatrix = c3dl.peekMatrix();
        c3dl.matrixMode(c3dl.MODELVIEW);
        var viewMatrix = c3dl.peekMatrix();

        //
        var modelMatrix = psys.getParticle(i).getTransform();
        modelMatrix = c3dl.multiplyMatrixByMatrix(modelMatrix, [pSize, 0, 0, 0, 0, pSize, 0, 0, 0, 0, 
          pSize, 0, 0, 0, 0, 1]);

        // create a ModelViewProjection matrix.  By doing this, we can multiply
        // 3 matrices together once per particle instead of once per vertex
        var modelViewProjMatrix = c3dl.multiplyMatrixByMatrix(viewMatrix, modelMatrix);
        modelViewProjMatrix = c3dl.multiplyMatrixByMatrix(projectionMatrix, modelViewProjMatrix);
        this.setUniformMatrix(shader, "modelViewProjMatrix", modelViewProjMatrix);

        glCanvas3D.drawArrays(glCanvas3D.TRIANGLE_FAN, i, 4);
      }
    }
  }

  /**
   @private
   Render a set of lines.
   
   @param {Array} lines
   */
  this.renderLines = function (lines)
  {
    if (lines.length > 0)
    {
      // create a short alias for this.lineShader
      var shader = this.lineShader;
      glCanvas3D.useProgram(shader);

      // camera placed the view matrix at the bottom of the stack
      var modelViewMatrix = c3dl.peekMatrix();
      c3dl.matrixMode(c3dl.PROJECTION);
      var projectionMatrix = c3dl.peekMatrix();
      c3dl.matrixMode(c3dl.MODELVIEW);

      // create a ModelViewProjection matrix.  By doing this, we can multiply
      // 3 matrices together once per model instead of once per vertex
      var modelViewProjMatrix = c3dl.multiplyMatrixByMatrix(projectionMatrix, modelViewMatrix);
      this.setUniformMatrix(shader, "modelViewProjMatrix", modelViewProjMatrix);

      // we need to render each line individually since each can have 
      // a different width.
      for (var l = 0, len = lines.length; l < len; l++)
      {
        glCanvas3D.lineWidth(lines[l].getWidth());

        var coords = [];
        var cols = [];
        for (var i = 0; i < 6; i++)
        {
          coords.push(lines[l].getCoordinates()[i]);
          cols.push(lines[l].getColors()[i]);
        }

        if (this.lineVertBuffer == null)
        {
          this.lineVertBuffer =
          {
          };
          this.lineVertBuffer.position = glCanvas3D.createBuffer();
        }

        glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.lineVertBuffer.position);
        glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, new WebGLFloatArray(coords), glCanvas3D.STREAM_DRAW);
        this.setVertexAttribArray(shader, "Vertex", 3, this.lineVertBuffer.position);

        if (this.lineColBuffer == null)
        {
          this.lineColBuffer =
          {
          };
          this.lineColBuffer.position = glCanvas3D.createBuffer();
        }

        glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.lineColBuffer.position);
        glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, new WebGLFloatArray(cols), glCanvas3D.STREAM_DRAW);
        this.setVertexAttribArray(shader, "Color", 3, this.lineColBuffer.position);

        glCanvas3D.drawArrays(glCanvas3D.LINES, 0, coords.length / 3);
      }
    }
  }

  /**
   @private
   @param {Array} pointPositions
   @param {Array} pointColors
   @param {Array} attenuation
   @param {bool} pointSmooth
   @param {int} mode
   @param {float} size
   */
  this.renderPoints = function (pointPositions, pointColors, attenuation, pointSmooth, mode, size)
  {
    // trying to render an empty list will result in an WebGL error
    if (pointPositions.length > 0 && pointColors.length > 0)
    {
      if (mode == c3dl.POINT_MODE_POINT)
      {
        // create a shorter reference name.
        var shader = this.pointShader;
        glCanvas3D.useProgram(shader);

        // camera placed the view matrix at the bottom of the stack
        var viewMatrix = c3dl.peekMatrix();
        c3dl.matrixMode(c3dl.PROJECTION);
        var projectionMatrix = c3dl.peekMatrix();
        c3dl.matrixMode(c3dl.MODELVIEW);

        // if point smoothing is on, points will be rendered as circles, 
        // otherwise they will be rendered as squares.
        pointSmooth ? this.enable(c3dl.POINT_SMOOTH) : this.disable(c3dl.POINT_SMOOTH);

        // create a ModelViewProjection matrix.  By doing this, we can multiply
        // 3 matrices together once instead of once per point
        var modelViewProjMatrix = c3dl.multiplyMatrixByMatrix(projectionMatrix, viewMatrix);
        this.setUniformMatrix(shader, "viewMatrix", viewMatrix);
        this.setUniformMatrix(shader, "modelViewProjMatrix", modelViewProjMatrix);
        this.setUniformf(shader, "attenuation", attenuation);

        if (this.pointVertBuffer == null)
        {
          this.pointVertBuffer =
          {
          };
          this.pointVertBuffer.position = glCanvas3D.createBuffer();
        }

        glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.pointVertBuffer.position);
        glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, new WebGLFloatArray(pointPositions), glCanvas3D.STREAM_DRAW);
        this.setVertexAttribArray(shader, "Vertex", 3, this.pointVertBuffer.position);

        if (this.pointColBuffer == null)
        {
          this.pointColBuffer =
          {
          };
          this.pointColBuffer.position = glCanvas3D.createBuffer();
        }

        glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.pointColBuffer.position);
        glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, new WebGLFloatArray(pointColors), glCanvas3D.STREAM_DRAW);
        this.setVertexAttribArray(shader, "Color", 3, this.pointColBuffer.position);
        glCanvas3D.drawArrays(glCanvas3D.POINTS, 0, pointPositions.length / 3);
      }
      else if (mode == c3dl.POINT_MODE_SPHERE)
      {
        // create an short alias
        var shader = this.pointSphereShader;
        glCanvas3D.useProgram(shader);

        if (this.pointSphereRenderReady == false)
        {
          // create vbo and set the data
          this.pointSphereRenderSetup();
        }
        else
        {
          c3dl.pushMatrix();

          for (var i = 0, len = pointPositions.length; i < len; i += 3)
          {
            // 
            var mat = c3dl.makeIdentityMatrix();
            mat[12] = pointPositions[i];
            mat[13] = pointPositions[i + 1];
            mat[14] = pointPositions[i + 2];
            mat[0] = mat[5] = mat[10] = size;

            mat = c3dl.multiplyMatrixByMatrix(c3dl.peekMatrix(), mat);

            c3dl.matrixMode(c3dl.PROJECTION);
            var proj = c3dl.peekMatrix();
            c3dl.matrixMode(c3dl.MODELVIEW);

            // create a modelviewprojection matrix.  By doing this, we can multiply
            // 3 matrices together once per model instead of once per vertex.
            var MVPMatrix = c3dl.multiplyMatrixByMatrix(proj, mat);
            this.setUniformMatrix(shader, "modelViewProjMatrix", MVPMatrix);
            this.setUniformf(shader, "Color", [pointColors[i], pointColors[i + 1], pointColors[i + 2]]);

            this.setVertexAttribArray(shader, "Vertex", 3, this.pointSphereVBOVert);
            glCanvas3D.drawArrays(glCanvas3D.TRIANGLES, 0, c3dl.BOUNDING_SPHERE_VERTICES.length / 3);
            c3dl.popMatrix();
          }
        }
      }
    }
  }

  /**
   @private
   
   @param {int} shader
   @param {String} varName
   @param {int} size
   @param {Array} array
   */
/*this.setVertexAttribArray = function(shader, varName, size, array, vbo)
	{
		var attribLoc = glCanvas3D.getAttribLocation(shader, varName);

		if(attribLoc != c3dl.SHADER_VAR_NOT_FOUND)
		{
			glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, vbo);
			glCanvas3D.vertexAttribPointer(attribLoc, size, glCanvas3D.FLOAT, false, 0, 0);
			glCanvas3D.enableVertexAttribArray(attribLoc);
		}
		else
		{
			c3dl.debug.logError("Attribute variable '" +  varName + "' not found in shader with ID = " + shader);
		}
	}*/



  this.setVertexAttribArray = function (shader, varName, size, vbo)
  {
    var attribLoc = glCanvas3D.getAttribLocation(shader, varName);

    if (attribLoc != c3dl.SHADER_VAR_NOT_FOUND)
    {
      glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, vbo);
      glCanvas3D.vertexAttribPointer(attribLoc, size, glCanvas3D.FLOAT, false, 0, 0);
      glCanvas3D.enableVertexAttribArray(attribLoc);
    }
    else
    {
      c3dl.debug.logError("Attribute variable '" + varName + "' not found in shader with ID = " + shader);
    }
  }

  /**
   Sets the uniform matrix variable 'varName' to the value specified by 'value'.
   Before calling this function, you must ensure the program object with
   the variable name 'varName' has been installed as part of the current
   rendering state by calling useProgram().<br />
   <br />
   The size of the matrix must be 16 elements.<br />
   <br />
   On some systems, if the variable exists in the shader but isn't used,
   the compiler will remove it. An error message will be displayed if the
   non-existant variable is set.<br />
   <br />
   If the variable could not be found for any other reason, an error is 
   displayed.
   
   @param {int} programObjectID The shader where the variable resides.
   @param {String} varName The name of the matrix variable.
   @param {Array} matrix 16 element matrix.
   */
  this.setUniformMatrix = function (programObjectID, varName, matrix)
  {
    var varLocation = glCanvas3D.getUniformLocation(programObjectID, varName);

    // the variable won't be found if it was optimized out.
    if (varLocation != c3dl.SHADER_VAR_NOT_FOUND)
    {
      glCanvas3D.uniformMatrix4fv(varLocation, false, matrix);
    }
    else
    {
      c3dl.debug.logError("Uniform matrix variable '" + varName + "' not found in program object.");
    }
  }

  /**
   Sets the uniform variable 'varName' to the value specified by 'value'.
   Before calling this function, you must ensure the program object with
   the variable name 'varName' has been installed as part of the current
   rendering state by calling useProgram().<br />
   <br />
   The size of the value will be queried and depending on its size, the 
   appropriate WebGL command will be called either uniform1f or 
   uniform{1|2|3|4}fv.<br />
   <br />
   On some systems, if the variable exists in the shader but isn't used,
   the compiler will remove it. An error message will be displayed if the
   non-existant variable is set.<br />
   <br />
   If the variable could not be found for any other reason, an error is 
   displayed.
   
   @param {int} programObjectID The shader where the variable resides.
   @param {String} varName The name of the variable.
   @param {float|Array} value The value to assign the variable.
   */
  this.setUniformf = function (shader, varName, value)
  {
    var varLocation = glCanvas3D.getUniformLocation(shader, varName);
    // the variable won't be found if it was optimized out.
    if (varLocation != c3dl.SHADER_VAR_NOT_FOUND)
    {
      if (value.length == 4)
      {
        glCanvas3D.uniform4fv(varLocation, value);
      }
      else if (value.length == 3)
      {
        glCanvas3D.uniform3fv(varLocation, value);
      }
      else if (value.length == 2)
      {
        glCanvas3D.uniform2fv(varLocation, value);
      }
      else
      {
        glCanvas3D.uniform1f(varLocation, value);
      }
    }
    else
    {
      c3dl.debug.logError('Uniform variable "' + varName + '" not found in program object.');
    }
  }

  /**
   Sets the uniform variable 'varName' to the value specified by 'value'.
   Before calling this function, you must ensure the program object with
   the variable name 'varName' has been installed as part of the current
   rendering state by calling useProgram().<br />
   <br />
   The size of the value will be queried and depending on its size, the 
   appropriate WebGL command will be called either uniform1i or 
   uniform{1|2|3|4}iv.<br />
   <br />
   On some systems, if the variable exists in the shader but isn't used,
   the compiler will remove it. An error message will be displayed if the
   non-existant variable is set.<br />
   <br />
   If the variable could not be found for any other reason, an error is 
   displayed.
   
   @param {int} programObjectID The shader where the variable resides.
   @param {String} varName The name of the variable.
   @param {int|Array} value The value to assign the variable.
   */
  this.setUniformi = function (programObjectID, varName, value)
  {
    var varLocation = glCanvas3D.getUniformLocation(programObjectID, varName);

    // the variable won't be found if it was optimized out.
    if (varLocation != c3dl.SHADER_VAR_NOT_FOUND)
    {
      if (value.length == 4)
      {
        glCanvas3D.uniform4iv(varLocation, value);
      }
      else if (value.length == 3)
      {
        glCanvas3D.uniform3iv(varLocation, value);
      }
      else if (value.length == 2)
      {
        glCanvas3D.uniform2iv(varLocation, value);
      }
      else
      {
        glCanvas3D.uniform1i(varLocation, value);
      }
    }
    else
    {
      c3dl.debug.logError('Uniform variable "' + varName + '" not found in program object.');
    }
  }

  /**
   @private
   Enable an WebGL server-side capability.
   
   @param {int} capability
   */
  this.enable = function (capability)
  {
    try
    {
      // check if its defined
      if (capability)
      {
        glCanvas3D.enable(capability);
      }
      else
      {
        c3dl.debug.logWarning("Enable command passed undefined value.");
      }
    }
    catch (e)
    {
      c3dl.debug.logException("Exception name:" + e.name +
        "<br />" + "Exception msg: " + e.message + "<br />" +
        "Capability: " + capability);
    }
  }

  /**
   @private
   
   Disable a server-side WebGL capability. This wraps the WebGL 
   'disable' command and adds a conditional to make sure the capability is
   supported before trying to change the state.  If the capability is not
   supported and the state is change, the script could be prevented 
   from running.
   
   @param {int} capability WebGL capability
   */
  this.disable = function (capability)
  {
    if (capability)
    {
      glCanvas3D.disable(capability);
    }
    else
    {
      c3dl.debug.logWarning("disable command passed undefined value.");
    }
  }
}

c3dl.WebGL.prototype = new c3dl.Renderer;/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @private
 
 @class ProgramObject is used to store a program object ID, which 
 WebGL generates along with the ID of the renderer which compiled
 the shaders resulting in the program ID. 
 */
c3dl.ProgramObject = function ()
{
  this.programID = -1;
  this.rendererID = -1;

  /**
   */
  this.getProgramID = function ()
  {
    return this.programID;
  }

  /**
   
   */
  this.getRendererID = function ()
  {
    return this.rendererID;
  }

  /**
   @private	
   Get a string representation of this object. 
   
   @param {null|String} delimiter A string which will separate values. Typically will be 
   ","  ,  "\n" or "&lt;br /&gt;". If none is specified, "," will be used.
   
   @returns {String} A string representation of this object.
   */
  this.toString = function (delimiter)
  {
    // make sure user passed up a string if they actually decided
    // to specify a delimiter.
    if (!delimiter || typeof(delimiter) != "string")
    {
      delimiter = ",";
    }
    return "Program ID = " + this.getProgramID() + delimiter + "Renderer ID = " + this.getRendererID();
  }
}/* -*- Mode: js2; js2-basic-offset: 4; indent-tabs-mode: nil; tab-width: 40; -*- */
/*
 * Copyright (c) 2010 Mozilla Corporation
 * Copyright (c) 2010 Vladimir Vukicevic
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
const MJS_VERSION = 0x000000;
const MJS_DO_ASSERT = true;
try {
  WebGLFloatArray;
} catch (x) {
  WebGLFloatArray = Float32Array;
}
const MJS_FLOAT_ARRAY_TYPE = WebGLFloatArray;
if (MJS_DO_ASSERT) {
  function MathUtils_assert(cond, msg) {
    if (!cond) throw "Assertion failed: " + msg;
  }
} else {
  function MathUtils_assert() {}
}
var V3 = {};
V3._temp1 = new MJS_FLOAT_ARRAY_TYPE(3);
V3._temp2 = new MJS_FLOAT_ARRAY_TYPE(3);
V3._temp3 = new MJS_FLOAT_ARRAY_TYPE(3);
if (MJS_FLOAT_ARRAY_TYPE == Array) {
  V3.x = [1.0, 0.0, 0.0];
  V3.y = [0.0, 1.0, 0.0];
  V3.z = [0.0, 0.0, 1.0];
  V3.$ = function V3_$(x, y, z) {
    return [x, y, z];
  };
  V3.clone = function V3_clone(a) {
    return [a[0], a[1], a[2]];
  };
} else {
  V3.x = new MJS_FLOAT_ARRAY_TYPE([1.0, 0.0, 0.0]);
  V3.y = new MJS_FLOAT_ARRAY_TYPE([0.0, 1.0, 0.0]);
  V3.z = new MJS_FLOAT_ARRAY_TYPE([0.0, 0.0, 1.0]);
  V3.$ = function V3_$(x, y, z) {
    return new MJS_FLOAT_ARRAY_TYPE([x, y, z]);
  };
  V3.clone = function V3_clone(a) {
    return new MJS_FLOAT_ARRAY_TYPE(a);
  };
}
V3.u = V3.x;
V3.v = V3.y;
V3.add = function V3_add(a, b, r) {
  if (r == undefined) r = new MJS_FLOAT_ARRAY_TYPE(3);
  r[0] = a[0] + b[0];
  r[1] = a[1] + b[1];
  r[2] = a[2] + b[2];
  return r;
};
V3.sub = function V3_sub(a, b, r) {
  if (r == undefined) r = new MJS_FLOAT_ARRAY_TYPE(3);
  r[0] = a[0] - b[0];
  r[1] = a[1] - b[1];
  r[2] = a[2] - b[2];
  return r;
};
V3.neg = function V3_neg(a, r) {
  if (r == undefined) r = new MJS_FLOAT_ARRAY_TYPE(3);
  r[0] = -a[0];
  r[1] = -a[1];
  r[2] = -a[2];
  return r;
};
V3.direction = function V3_direction(a, b, r) {
  if (r == undefined) r = new MJS_FLOAT_ARRAY_TYPE(3);
  return V3.normalize(V3.sub(a, b, r), r);
};
V3.length = function V3_length(a) { 
  var temp =Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
  return temp;
};
V3.lengthSquared = function V3_lengthSquared(a) {
  return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
};
V3.normalize = function V3_normalize(a, r) {
  if (r == undefined) r = new MJS_FLOAT_ARRAY_TYPE(3);
  var im = 1.0 / V3.length(a);
  r[0] = a[0] * im;
  r[1] = a[1] * im;
  r[2] = a[2] * im;
  return r;
};
V3.scale = function V3_scale(a, k, r) {
  if (r == undefined) r = new MJS_FLOAT_ARRAY_TYPE(3);
  r[0] = a[0] * k;
  r[1] = a[1] * k;
  r[2] = a[2] * k;
  return r;
}
V3.dot = function V3_dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};
V3.cross = function V3_cross(a, b, r) {
  if (r == undefined) r = new MJS_FLOAT_ARRAY_TYPE(3);
  r[0] = a[1] * b[2] - a[2] * b[1];
  r[1] = a[2] * b[0] - a[0] * b[2];
  r[2] = a[0] * b[1] - a[1] * b[0];
  return r;
};
var M4x4 = {};
M4x4._temp1 = new MJS_FLOAT_ARRAY_TYPE(16);
M4x4._temp2 = new MJS_FLOAT_ARRAY_TYPE(16);
if (MJS_FLOAT_ARRAY_TYPE == Array) {
  M4x4.I = [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0];
  M4x4.$ = function M4x4_$(m00, m01, m02, m03, m04, m05, m06, m07, m08, m09, m10, m11, m12, m13, m14, m15) {
    return [m00, m01, m02, m03, m04, m05, m06, m07, m08, m09, m10, m11, m12, m13, m14, m15];
  };
  M4x4.clone = function M4x4_clone(m) {
    return new[m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11]];
  };
} else {
  M4x4.I = new MJS_FLOAT_ARRAY_TYPE([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
  M4x4.$ = function M4x4_$(m00, m01, m02, m03, m04, m05, m06, m07, m08, m09, m10, m11, m12, m13, m14, m15) {
    return new MJS_FLOAT_ARRAY_TYPE([m00, m01, m02, m03, m04, m05, m06, m07, m08, m09, m10, m11, m12, m13, m14, m15]);
  };
  M4x4.clone = function M4x4_clone(m) {
    return new MJS_FLOAT_ARRAY_TYPE(m);
  };
}
M4x4.identity = M4x4.I;
M4x4.topLeft3x3 = function M4x4_topLeft3x3(m, r) {
  if (r == undefined) r = new MJS_FLOAT_ARRAY_TYPE(9);
  r[0] = m[0];
  r[1] = m[1];
  r[2] = m[2];
  r[3] = m[4];
  r[4] = m[5];
  r[5] = m[6];
  r[6] = m[8];
  r[7] = m[9];
  r[8] = m[10];
  return r;
};
M4x4.inverseOrthonormal = function M4x4_inverseOrthonormal(m, r) {
  if (r == undefined) r = new MJS_FLOAT_ARRAY_TYPE(16);
  M4x4.transpose(m, r);
  var t = [m[12], m[13], m[14]];
  r[3] = r[7] = r[11] = 0;
  r[12] = -V3.dot([r[0], r[4], r[8]], t);
  r[13] = -V3.dot([r[1], r[5], r[9]], t);
  r[14] = -V3.dot([r[2], r[6], r[10]], t);
  return r;
}
M4x4.inverseTo3x3 = function M4x4_inverseTo3x3(m, r) {
  if (r == undefined) r = new MJS_FLOAT_ARRAY_TYPE(9);
  var a11 = m[10] * m[5] - m[6] * m[9],
    a21 = -m[10] * m[1] + m[2] * m[9],
    a31 = m[6] * m[1] - m[2] * m[5],
    a12 = -m[10] * m[4] + m[6] * m[8],
    a22 = m[10] * m[0] - m[2] * m[8],
    a32 = -m[6] * m[0] + m[2] * m[4],
    a13 = m[9] * m[4] - m[5] * m[8],
    a23 = -m[9] * m[0] + m[1] * m[8],
    a33 = m[5] * m[0] - m[1] * m[4];
  var det = m[0] * (a11) + m[1] * (a12) + m[2] * (a13);
  if (det == 0) throw "matrix not invertible";
  var idet = 1.0 / det;
  r[0] = idet * a11;
  r[1] = idet * a21;
  r[2] = idet * a31;
  r[3] = idet * a12;
  r[4] = idet * a22;
  r[5] = idet * a32;
  r[6] = idet * a13;
  r[7] = idet * a23;
  r[8] = idet * a33;
  return r;
};
M4x4.makeFrustum = function M4x4_makeFrustum(left, right, bottom, top, znear, zfar, r) {
  if (r == undefined) r = new MJS_FLOAT_ARRAY_TYPE(16);
  var X = 2 * znear / (right - left);
  var Y = 2 * znear / (top - bottom);
  var A = (right + left) / (right - left);
  var B = (top + bottom) / (top - bottom);
  var C = -(zfar + znear) / (zfar - znear);
  var D = -2 * zfar * znear / (zfar - znear);
  r[0] = 2 * znear / (right - left);
  r[1] = 0;
  r[2] = 0;
  r[3] = 0;
  r[4] = 0;
  r[5] = 2 * znear / (top - bottom);
  r[6] = 0;
  r[7] = 0;
  r[8] = (right + left) / (right - left);
  r[9] = (top + bottom) / (top - bottom);
  r[10] = -(zfar + znear) / (zfar - znear);
  r[11] = -1;
  r[12] = 0;
  r[13] = 0;
  r[14] = -2 * zfar * znear / (zfar - znear);
  r[15] = 0;
  return r;
};
M4x4.makePerspective = function M4x4_makePerspective(fovy, aspect, znear, zfar, r) {
  var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
  var ymin = -ymax;
  var xmin = ymin * aspect;
  var xmax = ymax * aspect;
  return M4x4.makeFrustum(xmin, xmax, ymin, ymax, znear, zfar, r);
};
M4x4.makeOrtho = function M4x4_makeOrtho(left, right, bottom, top, znear, zfar, r) {
  if (r == undefined) r = new MJS_FLOAT_ARRAY_TYPE(16);
  var tX = -(right + left) / (right - left);
  var tY = -(top + bottom) / (top - bottom);
  var tZ = -(zfar + znear) / (zfar - znear);
  var X = 2 / (right - left);
  var Y = 2 / (top - bottom);
  var Z = -2 / (zfar - znear);
  r[0] = 2 / (right - left);
  r[1] = 0;
  r[2] = 0;
  r[3] = 0;
  r[4] = 0;
  r[5] = 2 / (top - bottom);
  r[6] = 0;
  r[7] = 0;
  r[8] = 0;
  r[9] = 0;
  r[10] = -2 / (zfar - znear);
  r[11] = 0;
  r[12] = -(right + left) / (right - left);
  r[13] = -(top + bottom) / (top - bottom);
  r[14] = -(zfar + znear) / (zfar - znear);
  r[15] = 0;
  return r;
};
M4x4.makeOrtho2D = function M4x4_makeOrtho2D(left, right, bottom, top, r) {
  return M4x4.makeOrtho(left, right, bottom, top, -1, 1, r);
};
M4x4.mul = function M4x4_mul(a, b, r) {
  if (r == undefined) r = new MJS_FLOAT_ARRAY_TYPE(16);
  r[0] = b[0] * a[0] + b[0 + 1] * a[4] + b[0 + 2] * a[8] + b[0 + 3] * a[12];
  r[0 + 1] = b[0] * a[1] + b[0 + 1] * a[5] + b[0 + 2] * a[9] + b[0 + 3] * a[13];
  r[0 + 2] = b[0] * a[2] + b[0 + 1] * a[6] + b[0 + 2] * a[10] + b[0 + 3] * a[14];
  r[0 + 3] = b[0] * a[3] + b[0 + 1] * a[7] + b[0 + 2] * a[11] + b[0 + 3] * a[15];
  r[4] = b[4] * a[0] + b[4 + 1] * a[4] + b[4 + 2] * a[8] + b[4 + 3] * a[12];
  r[4 + 1] = b[4] * a[1] + b[4 + 1] * a[5] + b[4 + 2] * a[9] + b[4 + 3] * a[13];
  r[4 + 2] = b[4] * a[2] + b[4 + 1] * a[6] + b[4 + 2] * a[10] + b[4 + 3] * a[14];
  r[4 + 3] = b[4] * a[3] + b[4 + 1] * a[7] + b[4 + 2] * a[11] + b[4 + 3] * a[15];
  r[8] = b[8] * a[0] + b[8 + 1] * a[4] + b[8 + 2] * a[8] + b[8 + 3] * a[12];
  r[8 + 1] = b[8] * a[1] + b[8 + 1] * a[5] + b[8 + 2] * a[9] + b[8 + 3] * a[13];
  r[8 + 2] = b[8] * a[2] + b[8 + 1] * a[6] + b[8 + 2] * a[10] + b[8 + 3] * a[14];
  r[8 + 3] = b[8] * a[3] + b[8 + 1] * a[7] + b[8 + 2] * a[11] + b[8 + 3] * a[15];
  r[12] = b[12] * a[0] + b[12 + 1] * a[4] + b[12 + 2] * a[8] + b[12 + 3] * a[12];
  r[12 + 1] = b[12] * a[1] + b[12 + 1] * a[5] + b[12 + 2] * a[9] + b[12 + 3] * a[13];
  r[12 + 2] = b[12] * a[2] + b[12 + 1] * a[6] + b[12 + 2] * a[10] + b[12 + 3] * a[14];
  r[12 + 3] = b[12] * a[3] + b[12 + 1] * a[7] + b[12 + 2] * a[11] + b[12 + 3] * a[15];
  return r;
};
M4x4.makeRotate = function M4x4_makeRotate(angle, axis, r) {
  if (r == undefined) r = new MJS_FLOAT_ARRAY_TYPE(16);
  axis = V3.normalize(axis, V3._temp1);
  var x = axis[0],
    y = axis[1],
    z = axis[2];
  var c = Math.cos(angle);
  var c1 = 1 - c;
  var s = Math.sin(angle);
  r[0] = x * x * c1 + c;
  r[1] = y * x * c1 + z * s;
  r[2] = z * x * c1 - y * s;
  r[3] = 0;
  r[4] = x * y * c1 - z * s;
  r[5] = y * y * c1 + c;
  r[6] = y * z * c1 + x * s;
  r[7] = 0;
  r[8] = x * z * c1 + y * s;
  r[9] = y * z * c1 - x * s;
  r[10] = z * z * c1 + c;
  r[11] = 0;
  r[12] = 0;
  r[13] = 0;
  r[14] = 0;
  r[15] = 1;
  return r;
};
M4x4.rotate = function M4x4_rotate(angle, axis, m, r) {
  M4x4.makeRotate(angle, axis, M4x4._temp1);
  return M4x4.mul(m, M4x4._temp1, r);
};
M4x4.makeScale3 = function M4x4_makeScale3(x, y, z, r) {
  if (r == undefined) r = new MJS_FLOAT_ARRAY_TYPE(16);
  r[0] = x;
  r[1] = 0;
  r[2] = 0;
  r[3] = 0;
  r[4] = 0;
  r[5] = y;
  r[6] = 0;
  r[7] = 0;
  r[8] = 0;
  r[9] = 0;
  r[10] = z;
  r[11] = 0;
  r[12] = 0;
  r[13] = 0;
  r[14] = 0;
  r[15] = 1;
  return r;
};
M4x4.makeScale1 = function M4x4_makeScale1(k, r) {
  return M4x4.makeScale3(k, k, k, r);
};
M4x4.makeScale = function M4x4_makeScale(v, r) {
  return M4x4.makeScale3(v[0], v[1], v[2], r);
};
M4x4.scale3 = function M4x4_scale3(x, y, z, m, r) {
  M4x4.makeScale3(x, y, z, M4x4._temp1);
  return M4x4.mul(m, M4x4._temp1, r);
};
M4x4.scale1 = function M4x4_scale1(k, m, r) {
  M4x4.makeScale3(k, k, k, M4x4._temp1);
  return M4x4.mul(m, M4x4._temp1, r);
};
M4x4.scale = function M4x4_scale(v, m, r) {
  M4x4.makeScale3(v[0], v[1], v[2], M4x4._temp1);
  return M4x4.mul(m, M4x4._temp1, r);
};
M4x4.makeTranslate3 = function M4x4_makeTranslate3(x, y, z, r) {
  if (r == undefined) r = new MJS_FLOAT_ARRAY_TYPE(16);
  r[0] = 1;
  r[1] = 0;
  r[2] = 0;
  r[3] = 0;
  r[4] = 0;
  r[5] = 1;
  r[6] = 0;
  r[7] = 0;
  r[8] = 0;
  r[9] = 0;
  r[10] = 1;
  r[11] = 0;
  r[12] = x;
  r[13] = y;
  r[14] = z;
  r[15] = 1;
  return r;
};
M4x4.makeTranslate1 = function M4x4_makeTranslate1(k, r) {
  return M4x4.makeTranslate3(k, k, k, r);
};
M4x4.makeTranslate = function M4x4_makeTranslate(v, r) {
  return M4x4.makeTranslate3(v[0], v[1], v[2], r);
};
M4x4.translate3 = function M4x4_translate3(x, y, z, m, r) {
  M4x4.makeTranslate3(x, y, z, M4x4._temp1);
  return M4x4.mul(m, M4x4._temp1, r);
};
M4x4.translate1 = function M4x4_translate1(k, m, r) {
  M4x4.makeTranslate3(k, k, k, M4x4._temp1);
  return M4x4.mul(m, M4x4._temp1, r);
};
M4x4.translate = function M4x4_translate(v, m, r) {
  M4x4.makeTranslate3(v[0], v[1], v[2], M4x4._temp1);
  return M4x4.mul(m, M4x4._temp1, r);
};
M4x4.makeLookAt = function M4x4_makeLookAt(eye, center, up, r) {
  var z = V3.direction(eye, center, V3._temp1);
  var x = V3.normalize(V3.cross(up, z, V3._temp2), V3._temp2);
  var y = V3.normalize(V3.cross(z, x, V3._temp3), V3._temp3);
  var tm1 = M4x4._temp1;
  var tm2 = M4x4._temp2;
  tm1[0] = x[0];
  tm1[1] = y[0];
  tm1[2] = z[0];
  tm1[3] = 0;
  tm1[4] = x[1];
  tm1[5] = y[1];
  tm1[6] = z[1];
  tm1[7] = 0;
  tm1[8] = x[2];
  tm1[9] = y[2];
  tm1[10] = z[2];
  tm1[11] = 0;
  tm1[12] = 0;
  tm1[13] = 0;
  tm1[14] = 0;
  tm1[15] = 1;
  tm2[0] = 1;
  tm2[1] = 0;
  tm2[2] = 0;
  tm2[3] = 0;
  tm2[4] = 0;
  tm2[5] = 1;
  tm2[6] = 0;
  tm2[7] = 0;
  tm2[8] = 0;
  tm2[9] = 0;
  tm2[10] = 1;
  tm2[3] = 0;
  tm2[0] = -eye[0];
  tm2[1] = -eye[1];
  tm2[2] = -eye[2];
  tm2[3] = 0;
  if (r == undefined) r = new MJS_FLOAT_ARRAY_TYPE(16);
  return M4x4.mul(tm1, tm2, r);
};
M4x4.transpose = function M4x4_transpose(m, r) {
  if (m == r) {
    var tmp = 0.0;
    tmp = m[1];
    m[1] = m[4];
    m[4] = tmp;
    tmp = m[2];
    m[2] = m[8];
    m[8] = tmp;
    tmp = m[3];
    m[3] = m[12];
    m[12] = tmp;
    tmp = m[6];
    m[6] = m[9];
    m[9] = tmp;
    tmp = m[7];
    m[7] = m[13];
    m[13] = tmp;
    tmp = m[11];
    m[11] = m[14];
    m[14] = tmp;
    return m;
  }
  if (r == undefined) r = new MJS_FLOAT_ARRAY_TYPE(16);
  r[0] = m[0];
  r[1] = m[4];
  r[2] = m[8];
  r[3] = m[12];
  r[4] = m[1];
  r[5] = m[5];
  r[6] = m[9];
  r[7] = m[13];
  r[8] = m[2];
  r[9] = m[6];
  r[10] = m[10];
  r[11] = m[14];
  r[12] = m[3];
  r[13] = m[7];
  r[14] = m[11];
  r[15] = m[15];
  return r;
};/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @private
 Find the smallest number that's a power of 2 that's bigger
 than the given number.
 
 @param {int} number The base number which the next power of two 
 number must be found.  For example:
 <pre>
 var i = roundUpToNextPowerOfTwo(3);
 // i is now 4
 
 i = roundUpToNextPowerOfTwo(4);
 // i is now 4
 
 i = roundUpToNextPowerOfTwo(9);
 // i is now 16
 </pre>
 
 @returns {int} A number which is greater or equal to 'number'
 which is the closest power of two which exists.
 */
c3dl.roundUpToNextPowerOfTwo = function (number)
{
  var i = 1;

  while (i < number)
  {
    i *= 2;
  }

  return i;
}

/**
 Inverse of a square root.
 
 @param {float} num
 
 @return {float} the inverse square root of num or 0 ir num was not a 
 number.
 */
c3dl.invSqrt = function (num)
{
  if (!isNaN(num))
  {
    // We have to do this ourselves since javascript does not have it.
    return 1 / Math.sqrt(num);
  }

  c3dl.debug.logWarning('invSqrt() caled with a parameter that\'s not a number');

  return 0;
}

/**
 gluLookAt Implementation
 
 @param {Array} eye The location of the camera.
 @param {Array} center Where the camera is looking at.
 @param {Array} up A Vector which represents the camera's up
 vector.
 
 @returns {Array} the lookat matrix or null if one of the arguments were
 not valid Vectors.
 */
c3dl.lookAt = function (eye, center, up)
{
  // Figure out the Orientation
  var z = c3dl.subtractVectors(eye, center, null);
  var x = c3dl.vectorCrossProduct(up, z, null);
  var y = c3dl.vectorCrossProduct(z, x, null);
  c3dl.normalizeVector(z);
  c3dl.normalizeVector(y);
  c3dl.normalizeVector(x);

  // makeMatrix expects values to be in column-major
  return c3dl.makeMatrix(x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, 0, 0, 0, 1);
}

/**
 @private
 this function needs testing
 
 Create an orthographic matrix from the specified arguments.
 
 @param {float} left The coordinate of the left vertical clipping plane.
 @param {float} right The coordinate of the right vertical clipping plane.
 @param {float} bottom The coordinate of the bottom horizontal clipping 
 plane.
 @param {float} top The coordinate of the top horizontal clipping plane.
 @param {float} znear The distance to the near clipping plane.
 @param {float} zfar The distance to the far clipping plane.
 
 @returns {Array} an orthographic matrix defined by the arguments.
 */
c3dl.makeOrtho = function (left, right, bottom, top, znear, zfar)
{
  return M4x4.makeOrtho(left, right, bottom, top, znear, zfar);
}

/**
 Create a perspective projection matrix.
 
 @param {float} fovy The field of view angle in degrees in the Y 
 direction.
 @param {float} aspect The aspect ratio
 @param {float} znear The distance from the viewer to the near clipping
 plane.
 @param {float} zfar The distance from the viewer to the far clipping 
 plane.
 
 @returns {Array} A perspective projection matrix. 
 */
c3dl.makePerspective = function (fovy, aspect, znear, zfar)
{
  return M4x4.makePerspective(fovy, aspect, znear, zfar);
}

/**
 glFrustum Implementation
 
 @param {float} left The coordinate of the left vertical clipping plane.
 @param {float} right The coordinate of the right vertical clipping plane.
 @param {float} bottom The coordinate of the bottom horizontal clipping 
 plane.
 @param {float} top The coordinate of the top horizontal clipping plane.
 @param {float} znear The distance to the near clipping plane.
 @param {float} zfar The distance to the far clipping plane.
 
 @returns {Array} A perspective projection matrix.
 */
c3dl.makeFrustum = function (left, right, bottom, top, znear, zfar)
{
  return M4x4.makeFrustum(left, right, bottom, top, znear, zfar);
}

/**
 Convert 'rad' radians into degrees.
 
 @param {float} rad The value in radians to convert into degrees.
 
 @returns {float} The value of 'rad' radians converted to degrees.
 */
c3dl.radiansToDegrees = function (rad)
{
  return rad / (Math.PI * 2) * 360.0;
}

/**
 Convert 'deg' degrees into radians.
 
 @param {float} degrees The value in degrees to convert into radians.
 
 @returns {float} The value of 'deg' degrees converted to radians.
 */
c3dl.degreesToRadians = function (deg)
{
  return deg / 360.0 * (Math.PI * 2);
}

/**	
 Get a random value from min to max inclusive
 
 @param {num} min
 @param {num} max
 
 @returns {num} a random number from min to max.
 */
c3dl.getRandom = function (min, max)
{
  var norm = Math.random();
  return ((max - min) * norm) + min;
}
c3dl.findMax = function (arrayIn)
{
  var max = arrayIn[0];
  for (i=0; i<arrayIn.length; i++) {
    if (arrayIn[i]>max) {
      max = arrayIn[i];
    }
  }
  return max;
};

c3dl.findMin = function (arrayIn)
{
  var min = arrayIn[0];
  for (i=0; i<arrayIn.length; i++) {
    if (arrayIn[i]<min) {
      min = arrayIn[i];
    }
  }
  return min;
};/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

// Written By:		Mark Paruzel
// Date:			March 23, 2008
// Project:			Canvas 3D Library
// -----------------------------------------------------------------------------
// NOTE: This group of functions act upon an array of three values which
//       represent a vector in 3D space. The values of the array each hold the
//       values of the X, Y, and Z coordinates on each axis. 
// -----------------------------------------------------------------------------
/**
 Check to see if vector 'vecArr' is valid.  That is, if it 
 has the correct amount of components, is the right type and has 
 the correct types.
 
 @param {Array} vecArr The vector to check.
 
 @return {boolean} True if the 'vecArr' is valid, false otherwise.
 */
c3dl.isValidVector = function (vecArr)
{
  // Check if the value being passed is an array
  if (vecArr instanceof Array || vecArr instanceof C3DL_FLOAT_ARRAY)
  {
    // Need to allow 4D vectors since last element of 
    // vector may not always be 1, and we can't assume
    // user wants w = 1.
    if (vecArr.length == 3 || vecArr.length == 4)
    {
      for (var i = 0, len = vecArr.length; i < len; i++)
      {
        // Check for bad values
        if (isNaN(vecArr[i])) return false;
      }

      return true;
    }
  }

  return false;
}

/**
 Copy the Vector 'srcVec' and return it.
 
 @param {Array} srcVec The vector to copy.
 
 @returns {Array} A copy of the 'srcVec' vector.
 */
c3dl.copyVector = function (srcVec)
{
  return V3.clone(srcVec);
}

/**
 Copy the components of srcVec Vector to destVec Vector.
 
 @param {Array} srcVec The source Vector to copy from.
 @param {Array} destVec The destination Vector to copy to.
 */
c3dl.copyVectorContents = function (srcVec, destVec)
{
 destVec= V3.clone(srcVec);
}
c3dl.addVectorComponent = function (srcVec, newComponent)
{
  var newVec = new C3DL_FLOAT_ARRAY(4);
  newVec[0]=srcVec[0]
  newVec[1]=srcVec[1]
  newVec[2]=srcVec[2]
  newVec[3]=newComponent
  return newVec;
}
/**
 Create a 3D Vector from the given 'newX', 'newY' 
 and 'newZ' arguments.
 
 @param {float} newX The x value.
 @param {float} newY The y value.
 @param {float} newZ The z value.
 
 @returns {Array} A 3D Vector with the components specified by the
 three arguments.
 */
c3dl.makeVector = function (newX, newY, newZ)
{
  return  new C3DL_FLOAT_ARRAY([!isNaN(newX) ? parseFloat(newX) : 0.0, !isNaN(newY) ? parseFloat(newY) : 0.0, !isNaN(newZ) ? parseFloat(newZ) : 0.0]);
}

/**
 Normalize the given Vector. A normalized Vector points in the same direction
 as the original, yet has a length of 1.
 
 @param {Array} vec The Vector to normalize.
 
 @returns {Array} The normalized Vector if the argument is a Vector 
 object, otherwise returns nulls.
 */
c3dl.normalizeVector = function (vec)
{ 
  if (vec.length === 4) {
	  var compr = vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2];
	  // Sometimes this can become invalid
	  var ln = Math.sqrt(compr);
	  // If the length is greater then zero, return the normalized Vector
	  // Normalization
	  vec[0] = vec[0] != 0.0 ? vec[0] / ln : 0.0;
	  vec[1] = vec[1] != 0.0 ? vec[1] / ln : 0.0;
	  vec[2] = vec[2] != 0.0 ? vec[2] / ln : 0.0;
	  vec[3] = vec[3] != 0.0 ? vec[2] / ln : 0.0;
	  return new C3DL_FLOAT_ARRAY(vec);
  }
  else {
	  var compr = vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2];
	  // Sometimes this can become invalid
	  var ln = Math.sqrt(compr);
	  // If the length is greater then zero, return the normalized Vector
	  // Normalization
	  vec[0] = vec[0] != 0.0 ? vec[0] / ln : 0.0;
	  vec[1] = vec[1] != 0.0 ? vec[1] / ln : 0.0;
	  vec[2] = vec[2] != 0.0 ? vec[2] / ln : 0.0;
	  return new C3DL_FLOAT_ARRAY(vec);
  }
}

/**
 Get the dot product of two vectors.
 
 @param {Array} vecOne The first vector.
 @param {Array} vecTwo The second vector.
 
 @returns {float} The dot product of the two specified Vectors. If 
 one of the Vectors was invalid, returns null.
 */
c3dl.vectorDotProduct = function (vecOne, vecTwo)
{
  return V3.dot(vecOne,vecTwo);
}

/**
 Get the result of projecting vector 'vecOne' onto 'vecTwo'.
 
 @param {Array} vecOne
 @param {Array} vecTwo
 
 @returns {Array} result of projecting vector 'vecOne' onto 'vecTwo'.
 */
c3dl.vectorProject = function (vecOne, vecTwo)
{
  //           vecOne . vecTwo
  // result =  ---------------- x vecTwo
  //           vecTwo . vecTwo
  // get the top and bottom dot product
  var topDot = V3.dot(vecOne, vecTwo);
  var bottomDot = V3.dot(vecTwo, vecTwo);

  return c3dl.multiplyVector(vecTwo, topDot / bottomDot);
}

/**
 Get the cross product of two Vectors.  The cross product is a Vector which
 is perpendicular to both the first and second vector.
 
 @param {Array} vecOne The first vector.
 @param {Array} vecTwo The second vector.
 
 @returns {Array} The cross product of 'vecOne' and 'vecTwo'.
 */
c3dl.vectorCrossProduct = function (vecOne, vecTwo, dest)
{
return V3.cross(vecOne, vecTwo, dest);
}

/**
 Get the length of the vector 'vec'.
 
 @param {Array} vec The vector for which the length is needed.
 
 @return {float} The length of the vector 'vec'.
 */
c3dl.vectorLength = function (vec)
{
  return V3.length(vec);
}

/**	
 Get the squared length of the vector 'vec'.
 
 @param {Array} vec The vector for which the squared length is required.
 
 @returns {float} The 'length' of each component of 'vec' added together.
 */
c3dl.vectorLengthSq = function (vec)
{
  return V3.lengthSquared(vec);
}

/**
 Add two Vectors together and place the result in dest and 
 return it.
 
 @param {Array} vecOne The first Vector.
 @param {Array} vecTwo The second Vector.
 @param {Array} [dest] A vector which will hold the result.
 
 @returns {Array} The resultant Vector if both were valid 
 Vectors, otherwise returns null.
 */
c3dl.addVectors = function (vecOne, vecTwo, dest)
{
  return V3.add(vecOne, vecTwo, dest);
}

/**
 Subtract vector 'vecTwo' from vector 'vecOne'.
 
 @param {Array} vecOne The Vector to subtract from.
 @param {Array} vecTwo The Vector which is used to subtract.
 @param {Array} [dest] The Vector which will contains the resultant.
 
 @returns {Array} The resultant Vector, which is the first vector 
 minus the second. If one of the vector were not valid, returns null.
 */
c3dl.subtractVectors = function (vecOne, vecTwo, dest)
{
  return V3.sub(vecOne, vecTwo, dest);
}

/**
 Multiply the specified vector by the scalar.  Place the result
 in 'dest' and return it.  This operation will multiply the scalar 
 by each component of the vector, effectively scaling it, making it 
 geometrically longer or shorter.  If the scalar value is negative, 
 the result will point in the opposite direction of 'vec'.
 
 @param {Array} vec The vector to scale.
 @param {float} scalar The amount to scale the vector.
 @param {Array} [dest] A vector which will hold
 the result if provided.
 
 @returns {Array} A vector 'vec' which has been scaled by 'scalar' or
 returns null if 'vec' was invalid or 'scalar' was not a number.
 */
c3dl.multiplyVector = function (vec, scalar, dest)
{
  return V3.scale(vec, scalar, dest);
}

/**
 Divide each component of 'vec' and store into dest and return it.
 
 @param {Array} vec The vector to divide.
 @param {float} scalar The amount to scale 'vec'.
 @param {Array} [dest] A vector which will hold
 the result if provided.
 
 @returns {Array} A vector 'vec' which has been divided by 'scalar' or
 returns null if 'vec' was invalid or 'scalar' was NaN.
 */
c3dl.divideVector = function (vec, scalar, dest)
{
  if (typeof(dest) == "undefined" || dest == null) dest = c3dl.makeVector();
  dest[0] = vec[0] / scalar;
  dest[1] = vec[1] / scalar;
  dest[2] = vec[2] / scalar;

  return dest;
}


/**
 Multiply two Vectors together, this is not a dot product or a cross 
 product operation.  Instead, each corresponding component of each of 
 the vectors are multiplied together
 
 @param {Array} vecOne Vector one.
 @param {Array} vecTwo Vector two.
 @param {Array} [dest] The destination will contain the result of 
 the operation.
 
 @returns {Array} A Vector which is the result of multiplying each 
 component together or null if one of the vectors where not valid 
 Vectors.
 */
c3dl.multiplyVectorByVector = function (vecOne, vecTwo, dest)
{
  if (typeof(dest) == "undefined" || dest == null) dest = c3dl.makeVector();
  dest[0] = vecOne[0] * vecTwo[0];
  dest[1] = vecOne[1] * vecTwo[1];
  dest[2] = vecOne[2] * vecTwo[2];
  return dest;
}


/**
 Compare two vectors for equality. Two Vectors are said to be equal 
 if all their components are equal.
 
 @param {Array} vecOne Vector one.
 @param {Array} vectwo Vector two.
 
 @return {boolean} True if both vectors are equal, null otherwise.
 */
c3dl.isVectorEqual = function (vecOne, vecTwo)
{
  // add tolerance to calculations
  return (vecOne[0] === vecTwo[0] && vecOne[1] === vecTwo[1] && vecOne[2] === vecTwo[2]);
}

/**
 Check to see if a Vector is a zero vector, that is a vector with a 
 length of zero, or it has components close enough to zero to be 
 considered zero.  'Close enough' is considered true if the components
 lie between the -TOLERANCE and +TOLERANCE constant.
 
 @param {Array} vec The Vector to check.
 
 @return {boolean} True if the vector is considered a zero vector, false otherwise.
 */
c3dl.isVectorZero = function (vec)
{
  // Check for a tolerance
  return ((-c3dl.TOLERANCE < vec[0] && vec[0] < c3dl.TOLERANCE) && (-c3dl.TOLERANCE < vec[1] && vec[1] < c3dl.TOLERANCE) && (-c3dl.TOLERANCE < vec[2] && vec[2] < c3dl.TOLERANCE));
}


/**
 Get the angle (in degrees) between two vectors.
 
 @param {Array} vecOne The first vector.
 @param {Array} vecTwo The second vector.
 
 @return {float} The angle in degrees between the two vectors.
 */
c3dl.getAngleBetweenVectors = function (vecOne, vecTwo)
{
  var dot = c3dl.vectorDotProduct(vecOne, vecTwo);
  return c3dl.radiansToDegrees(Math.acos(dot));
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/
// Written By:	Mark Paruzel
// Date:		April 11, 2008
// Project:		Canvas 3D Library
// -----------------------------------------------------------------------------
// NOTE: This group of functions act upon an array of sixteen values which
//       represent a matrix orientation. How a Matrix Works:
//
//       - An Orientation uses the 3 Axis in a 3D world: Up, Forward and Left 
//         (Right handed system).
//       - A 4x4 Matrix adds in a Translation into the matrix along with an 
//         Orientation.
//
//			Matrix uses column-major order which means elements are listed column
//			first
// 
//       +-                             -+
//       |  Right.x, Up.x, Fwd.x, Pos.x  |
//       |  Right.y, Up.y, Fwd.y, Pos.y  |
//       |  Right.z, Up.z, Fwd.z, Pos.z  |
//       |  0.0,     0.0,  0.0,   1.0    |
//       +-                             -+
//
//       Array Indices:
//       +-               -+
//       |  0,  4,  8, 11  |
//       |  1,  5,  6, 12  |
//       |  2,  6,  9, 13  |
//       |  3,  7, 10, 15  |
//       +-               -+
// -----------------------------------------------------------------------------
/**
 Is the Matrix 'mat' is valid?  That is, does it contain 16
 values and are all the values numbers?
 
 @param {Array} mat The matrix to check.
 
 @returns {boolean} True if the object 'mat' is a matrix, 
 false otherwise.
 */
c3dl.isValidMatrix = function (mat)
{
  // Check if the value being passed is an array
  if (mat instanceof Array || mat instanceof MJS_FLOAT_ARRAY_TYPE)
  {
    // Must be array of 16 Values
    if (mat.length == 16)
    {
      for (var i = 0; i < 16; i++)
      {
        // Check for bad values
        if (isNaN(mat[i])) return false;
      }

      return true;
    }
  }

  return false;
}

/**
 Create an identity matrix. An identity matrix is a matrix in 
 which all the elements are zero, save on the main diagonal 
 where all elements are ones.<br />
 <br />
 Example:
 <pre>
 +-            -+
 |  1, 0, 0, 0  |
 |  0, 1, 0, 0  |
 |  0, 0, 1, 0  |
 |  0, 0, 0, 1  |
 +-            -+
 </pre>
 
 An identity matrix is equivalent to the number one in some respects, 
 that is multiplying matrix M by an identity matrix will yield M.
 Matrix multiplication with an identity matrix is one case in which
 matrix multiplication is commutative.
 M * I = M
 I * M = M
 <br />
 
 @returns {Array} An identity matrix.
 */
c3dl.makeIdentityMatrix = function ()
{
  return new MJS_FLOAT_ARRAY_TYPE([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
}


/**
 Create a Zero matrix, that is a matrix in which each component 
 of the matrix is zero.
 
 @returns {Array} A zero matrix.
 */
c3dl.makeZeroMatrix = function ()
{
  return new C3DL_FLOAT_ARRAY([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
}

/**
 Set the elements of a matrix.  Supply the values in column-major
 ordering.
 
 e[r][c], e01 = row 0, column 1
 
 @param {Array} mat The matrix to set
 @param {float} e00 Column 0, Row 0
 @param {float} e01 
 @param {float} e02 
 @param {float} e03 
 @param {float} e10 Column 1, Row 0
 @param {float} e11 
 @param {float} e12 
 @param {float} e13
 @param {float} e20 Column 2, Row 0
 @param {float} e21 
 @param {float} e22 
 @param {float} e23 
 @param {float} e30 Column 3, Row 0
 @param {float} e31 
 @param {float} e32 
 @param {float} e33 
 */
c3dl.setMatrix = function (mat, e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, 
  e30, e31, e32, e33)
{ 
  mat[0] = e00;
  mat[1] = e01;
  mat[2] = e02;
  mat[3] = e03;

  mat[4] = e10;
  mat[5] = e11;
  mat[6] = e12;
  mat[7] = e13;

  mat[8] = e20;
  mat[9] = e21;
  mat[10] = e22;
  mat[11] = e23;

  mat[12] = e30;
  mat[13] = e31;
  mat[14] = e32;
  mat[15] = e33;
}

/**
 Make a matrix by providing each component. Supply the values in colum-major order.<br />
 Indices:
 <pre>
 +-               -+
 |  0,  4,  8, 12  |
 |  1,  5,  9, 13  |
 |  2,  6, 10, 14  |
 |  3,  7, 11, 15  |
 +-               -+
 </pre>
 
 @param {float} e00 Element at row 0 column 0.
 @param {float} e01 Element at row 1 column 0.
 @param {float} e02 Element at row 2 column 0.
 @param {float} e03 Element at row 3 column 0.
 @param {float} e10 Element at row 0 column 1.
 @param {float} e11 Element at row 1 column 1.
 @param {float} e12 Element at row 2 column 1.
 @param {float} e13 Element at row 3 column 1.
 @param {float} e20 Element at row 0 column 2.
 @param {float} e21 Element at row 1 column 2.
 @param {float} e22 Element at row 2 column 2.
 @param {float} e23 Element at row 3 column 2.
 @param {float} e30 Element at row 0 column 3.
 @param {float} e31 Element at row 1 column 3.
 @param {float} e32 Element at row 2 column 3.
 @param {float} e33 Element at row 3 column 3.
 
 @return {Array} A matrix defined by the provided arguments.
 */
c3dl.makeMatrix = function (e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33)
{
  return [!isNaN(e00) ? parseFloat(e00) : 0.0, !isNaN(e01) ? parseFloat(e01) : 0.0, !isNaN(e02) ? parseFloat(e02) : 0.0, !isNaN(e03) ? parseFloat(e03) : 0.0, !isNaN(e10) ? parseFloat(e10) : 0.0, !isNaN(e11) ? parseFloat(e11) : 0.0, !isNaN(e12) ? parseFloat(e12) : 0.0, !isNaN(e13) ? parseFloat(e13) : 0.0, !isNaN(e20) ? parseFloat(e20) : 0.0, !isNaN(e21) ? parseFloat(e21) : 0.0, !isNaN(e22) ? parseFloat(e22) : 0.0, !isNaN(e23) ? parseFloat(e23) : 0.0, !isNaN(e30) ? parseFloat(e30) : 0.0, !isNaN(e31) ? parseFloat(e31) : 0.0, !isNaN(e32) ? parseFloat(e32) : 0.0, !isNaN(e33) ? parseFloat(e33) : 0.0];
}

/**
 Check if two matrices are equal. Assumes for performance reasons 
 that the matrices passed in are valid. Two matrices are equal if
 they're corresponding components are equal or their difference is
 less than TOLERANCE. This tolerance is simply a small number used 
 as a buffer due to floating point inaccuracies.
 
 @param {Array} matrix1 The first matrix.
 @param {Array} matrix2 The second matrix.
 
 @return {boolean} True if matrices are equal, false otherwise.
 */
c3dl.matricesEqual = function (matrix1, matrix2)
{
  var areEqual = true;

  // stop as soon as we find an element that is not equal
  for (var i = 0; areEqual && i < 16; i++)
  {
    // if it goes beyond the threshold or tolerance, we can stop
    if (Math.abs(matrix1[i] - matrix2[i]) > c3dl.TOLERANCE)
    {
      areEqual = false;
    }
  }

  return areEqual;
}


/**
 */
c3dl.makePoseMatrix = function (vecLeft, vecUp, vecFrwd, vecPos)
{
    // +-                            -+
    // |  Left.x, Up.y, Dir.x, Pos.x  |
    // |  Left.y, Up.x, Dir.y, Pos.y  |
    // |  Left.z, Up.z, Dir.z, Pos.z  |
    // |  0.0,    0.0,    0.0,  1.0   |
    // +-                            -+
    var mat = new C3DL_FLOAT_ARRAY(16);
    // Left
    mat[0] = vecLeft[0];
    mat[1] = vecLeft[1];
    mat[2] = vecLeft[2];
    mat[3] = 0.0;

    // Up
    mat[4] = vecUp[0];
    mat[5] = vecUp[1];
    mat[6] = vecUp[2];
    mat[7] = 0.0;

    // Forward
    mat[8] = vecFrwd[0];
    mat[9] = vecFrwd[1];
    mat[10] = vecFrwd[2];
    mat[11] = 0.0;

    // Position
    mat[12] = vecPos[0];
    mat[13] = vecPos[1];
    mat[14] = vecPos[2];
    mat[15] = 1.0;

    return  mat;
}


/**
 Get the transpose of matrix 'mat'.  A transposed matrix is created
 by interchanging the rows and columns of a matrix.
 
 Transposing the following matrix,
 <pre>
 +-            -+
 |  A, B, C, D  |
 |  E, F, G, H  |
 |  I, J, K, L  |
 |  M, N, O, P  |
 +-            -+
 </pre>
 
 would yield:
 <pre>
 +-            -+
 |  A, E, I, M  |
 |  B, F, J, N  |
 |  C, G, K, O  |
 |  D, H, L, P  |
 +-            -+
 </pre>
 
 @param {Array} mat Matrix to transpose.
 
 @returns {Array} The transposed matrix if the passed in matrix 
 was valid, otherwise returns null.
 */
c3dl.transposeMatrix = function (mat)
{
    return M4x4.transpose(mat);
}


/**
 Get the inverse of matrix 'mat'.  Matrix-matrix division is not 
 defined mathematically, but there is a multiplicative inverse 
 operation which is useful in solving some matrix equations.  
 Note that only matrices with a determinant not equal to zero 
 will have an inverse.  There is no need to check if first if
 the matrix has a determinant not equal to zero as this function
 does that anyway.
 
 @param {Array} mat The Matrix for which the inverse is
 required.
 
 @returns {Array} The inverse of matrix 'mat' if it has one
 */
c3dl.inverseMatrix = function (mat)
{
if (!mat) {
	return
}
var kInv =  new C3DL_FLOAT_ARRAY(16);
	var fA0 = mat[ 0] * mat[ 5] - mat[ 1] * mat[ 4];
 	var fA1 = mat[ 0] * mat[ 6] - mat[ 2] * mat[ 4];
 	var fA2 = mat[ 0] * mat[ 7] - mat[ 3] * mat[ 4];
 	var fA3 = mat[ 1] * mat[ 6] - mat[ 2] * mat[ 5];
 	var fA4 = mat[ 1] * mat[ 7] - mat[ 3] * mat[ 5];
 	var fA5 = mat[ 2] * mat[ 7] - mat[ 3] * mat[ 6];
 	var fB0 = mat[ 8] * mat[13] - mat[ 9] * mat[12];
 	var fB1 = mat[ 8] * mat[14] - mat[10] * mat[12];
 	var fB2 = mat[ 8] * mat[15] - mat[11] * mat[12];
 	var fB3 = mat[ 9] * mat[14] - mat[10] * mat[13];
 	var fB4 = mat[ 9] * mat[15] - mat[11] * mat[13];
 	var fB5 = mat[10] * mat[15] - mat[11] * mat[14];
  	// Determinant
 	var fDet = fA0 * fB5 - fA1 * fB4 + fA2 * fB3 + fA3 * fB2 - fA4 * fB1 + fA5 * fB0;
 	// Account for a very small value
	if (Math.abs(fDet) <= 1e-9)
 	{
 	  c3dl.debug.logWarning('inverseMatrix() failed due to bad values');
   	  return null;
	} 
	kInv[ 0] = + mat[ 5] * fB5 - mat[ 6] * fB4 + mat[ 7] * fB3;
	kInv[ 4] = - mat[ 4] * fB5 + mat[ 6] * fB2 - mat[ 7] * fB1;
	kInv[ 8] = + mat[ 4] * fB4 - mat[ 5] * fB2 + mat[ 7] * fB0;
	kInv[12] = - mat[ 4] * fB3 + mat[ 5] * fB1 - mat[ 6] * fB0;
	kInv[ 1] = - mat[ 1] * fB5 + mat[ 2] * fB4 - mat[ 3] * fB3;
	kInv[ 5] = + mat[ 0] * fB5 - mat[ 2] * fB2 + mat[ 3] * fB1;
	kInv[ 9] = - mat[ 0] * fB4 + mat[ 1] * fB2 - mat[ 3] * fB0;
	kInv[13] = + mat[ 0] * fB3 - mat[ 1] * fB1 + mat[ 2] * fB0;
	kInv[ 2] = + mat[13] * fA5 - mat[14] * fA4 + mat[15] * fA3;
	kInv[ 6] = - mat[12] * fA5 + mat[14] * fA2 - mat[15] * fA1; 		
	kInv[10] = + mat[12] * fA4 - mat[13] * fA2 + mat[15] * fA0;
 	kInv[14] = - mat[12] * fA3 + mat[13] * fA1 - mat[14] * fA0;
 	kInv[ 3] = - mat[ 9] * fA5 + mat[10] * fA4 - mat[11] * fA3;
 	kInv[ 7] = + mat[ 8] * fA5 - mat[10] * fA2 + mat[11] * fA1;
 	kInv[11] = - mat[ 8] * fA4 + mat[ 9] * fA2 - mat[11] * fA0;
 	kInv[15] = + mat[ 8] * fA3 - mat[ 9] * fA1 + mat[10] * fA0;
  	// Inverse using Determinant
 	var fInvDet = 1.0 / fDet;
 	kInv[ 0] *= fInvDet;
 	kInv[ 1] *= fInvDet;
 	kInv[ 2] *= fInvDet;
 	kInv[ 3] *= fInvDet;
 	kInv[ 4] *= fInvDet;
 	kInv[ 5] *= fInvDet;
 	kInv[ 6] *= fInvDet;
 	kInv[ 7] *= fInvDet;
 	kInv[ 8] *= fInvDet;
 	kInv[ 9] *= fInvDet;
 	kInv[10] *= fInvDet;
 	kInv[11] *= fInvDet;
 	kInv[12] *= fInvDet;
 	kInv[13] *= fInvDet;
 	kInv[14] *= fInvDet;
	kInv[15] *= fInvDet;
  	return kInv;
}


/**
 Get the matrix determinant of 'mat'.
 
 @param {Array} mat The matrix for which the determinant 
 is required.
 
 @returns {float} The matrix determinant of 'mat' or null if 
 'mat' is invalid.
 */
c3dl.matrixDeterminant = function (mat)
{
    var fA0 = mat[0] * mat[5] - mat[1] * mat[4];
    var fA1 = mat[0] * mat[6] - mat[2] * mat[4];
    var fA2 = mat[0] * mat[7] - mat[3] * mat[4];
    var fA3 = mat[1] * mat[6] - mat[2] * mat[5];
    var fA4 = mat[1] * mat[7] - mat[3] * mat[5];
    var fA5 = mat[2] * mat[7] - mat[3] * mat[6];
    var fB0 = mat[8] * mat[13] - mat[9] * mat[12];
    var fB1 = mat[8] * mat[14] - mat[10] * mat[12];
    var fB2 = mat[8] * mat[15] - mat[11] * mat[12];
    var fB3 = mat[9] * mat[14] - mat[10] * mat[13];
    var fB4 = mat[9] * mat[15] - mat[11] * mat[13];
    var fB5 = mat[10] * mat[15] - mat[11] * mat[14];

    // Construct the Determinant
    var fDet = fA0 * fB5 - fA1 * fB4 + fA2 * fB3 + fA3 * fB2 - fA4 * fB1 + fA5 * fB0;

    return fDet;
}



/**
 Get the adjoint matrix of matrix 'mat'.
 
 @param {Array} mat The matrix which the adjoint is required.
 
 @returns {Array} the adjoint matrix of 'mat' if it was valid, otherwise
 returns null.
 */
c3dl.matrixAdjoint = function (mat)
{
  var fA0 = mat[0] * mat[5] - mat[1] * mat[4];
  var fA1 = mat[0] * mat[6] - mat[2] * mat[4];
  var fA2 = mat[0] * mat[7] - mat[3] * mat[4];
  var fA3 = mat[1] * mat[6] - mat[2] * mat[5];
  var fA4 = mat[1] * mat[7] - mat[3] * mat[5];
  var fA5 = mat[2] * mat[7] - mat[3] * mat[6];
  var fB0 = mat[8] * mat[13] - mat[9] * mat[12];
  var fB1 = mat[8] * mat[14] - mat[10] * mat[12];
  var fB2 = mat[8] * mat[15] - mat[11] * mat[12];
  var fB3 = mat[9] * mat[14] - mat[10] * mat[13];
  var fB4 = mat[9] * mat[15] - mat[11] * mat[13];
  var fB5 = mat[10] * mat[15] - mat[11] * mat[14];

  // Adjoint
  var k = new C3DL_FLOAT_ARRAY([mat[5] * fB5 - mat[6] * fB4 + mat[7] * fB3, -mat[1] * fB5 + mat[2] * fB4 - mat[3] * fB3,
    mat[13] * fA5 - mat[14] * fA4 + mat[15] * fA3, -mat[9] * fA5 + mat[10] * fA4 - mat[11] * fA3,
    -mat[4] * fB5 + mat[6] * fB2 - mat[7] * fB1, mat[0] * fB5 - mat[2] * fB2 + mat[3] * fB1, 
    -mat[12] * fA5 + mat[14] * fA2 - mat[15] * fA1, mat[8] * fA5 - mat[10] * fA2 + mat[11] * fA1,
    mat[4] * fB4 - mat[5] * fB2 + mat[7] * fB0, -mat[0] * fB4 + mat[1] * fB2 - mat[3] * fB0, 
    mat[12] * fA4 - mat[13] * fA2 + mat[15] * fA0, -mat[8] * fA4 + mat[9] * fA2 - mat[11] * fA0,
    -mat[4] * fB3 + mat[5] * fB1 - mat[6] * fB0, mat[0] * fB3 - mat[1] * fB1 + mat[2] * fB0,
    -mat[12] * fA3 + mat[13] * fA1 - mat[14] * fA0,
    mat[8] * fA3 - mat[9] * fA1 + mat[10] * fA0]);

    return k;
}


/**
 Multiply a given Matrix 'mat' with a scalar value.  This will result
 in a matrix which has each component in 'mat' multiplied with 'scalar'.
 
 @param {Array} mat The matrix to "scale".
 @param {float} scalar The value which will be multiplied by each 
 component of 'mat'.
 
 @returns {Array} The Matrix 'mat', with each component 
 multiplied by 'scalar'.
 */
c3dl.multiplyMatrixByScalar = function (mat,scalar )
{ 
    return M4x4.mul(mat,scalar);
}

// -----------------------------------------------------------------------------

/**
 Divide a Matrix 'mat' by a scalar value. This will divide each 
 component of the matrix 'mat' by 'scalar' and reutrn the value.
 
 @param {Array} mat The matrix which will be divided.
 @param {float} scalar The value which the matrix components 
 will be divided by.
 
 @returns {Array} The Matrix 'mat' divided by 'scalar'.
 */
c3dl.divideMatrixByScalar = function (mat, scalar)
{
  var matrix = new C3DL_FLOAT_ARRAY(16);
  // Multiply each variable
  for (var i = 0; i < 16; i++)
  {
    matrix[i] = mat[i] / scalar;
  }
  return matrix;
}

/**
 Multiply matrix 'matOne' by 'matTwo'.
 
 @param {Array} matOne
 @param {Array} matTwo
 
 @returns {Array} The result of multiplying 'matOne' by 'matTwo'.
 */
c3dl.multiplyMatrixByMatrix = function (matOne, matTwo, newMat)
{
  return newMat = M4x4.mul(matOne,matTwo);
}


/**
 Multiply a matrix by a direction vector
 
 @param {Array} mat
 @param {Array} vec
 @param {Array} dest
 
 @returns {Array} vector
 */
c3dl.multiplyMatrixByDirection = function (mat, vec, dest)
{
  if (!dest)
  {
    dest = c3dl.makeVector();
    // since we don't need to multiply the translation part, we leave it out.
    dest[0] = mat[0] * vec[0] + mat[4] * vec[1] + mat[8] * vec[2]; // + mat[12] * 0;
    dest[1] = mat[1] * vec[0] + mat[5] * vec[1] + mat[9] * vec[2]; // + mat[13] * 0;
    dest[2] = mat[2] * vec[0] + mat[6] * vec[1] + mat[10] * vec[2]; // + mat[14] * 0;
    return dest;
  }
  else
  {
    var a = mat[0] * vec[0] + mat[4] * vec[1] + mat[8] * vec[2]; // + mat[12] * 0;
    var b = mat[1] * vec[0] + mat[5] * vec[1] + mat[9] * vec[2]; // + mat[13] * 0;
    var c = mat[2] * vec[0] + mat[6] * vec[1] + mat[10] * vec[2]; // + mat[14] * 0;
    dest[0] = a;
	dest[1] = b;
    dest[2] = c;
    return dest;
  }
}


/**
 Multiply a vector 'vec' by Matrix 'mat'. This results in a vector
 which the elements are found by calculatig the dot product of the 
 column vectors of 'mat' by 'vec'.
 
 If 'vec' is an array of 3 values, the last component, w will be assumed to be 1. If 'vec'
 is an array of 4 values, dest must also be an array of 4 values.
 
 @param {Array} mat The matrix, an array of 16 values.
 
 @param {Array} vec Array of 3 or 4 values. If last component, W is not present, W=1 will
 be assumed. Also, if the Array has 3 elements, the return value will be 3 elements. If the
 array has 4 elements, the return value will have 4 elements.
 
 @param {Array} dest Optional return by reference.
 
 @returns {Array} The vector 'vec' multiplied by matrix 'mat' if both
 arguments were valid, otherwise returns null.
 */
c3dl.multiplyMatrixByVector = function (mat, vec, dest)
{
    vec = new C3DL_FLOAT_ARRAY(vec);
    var w = (vec.length == 3 ? 1 : vec[3]);
	
    if (!dest)
    {
      // match the destination size with the vector size.
      dest = new C3DL_FLOAT_ARRAY((vec.length == 3 ? [0, 0, 0] : [0, 0, 0, 0]));

      dest[0] = mat[0] * vec[0] + mat[4] * vec[1] + mat[8] * vec[2] + mat[12] * w;
      dest[1] = mat[1] * vec[0] + mat[5] * vec[1] + mat[9] * vec[2] + mat[13] * w;
      dest[2] = mat[2] * vec[0] + mat[6] * vec[1] + mat[10] * vec[2] + mat[14] * w;

      // only write to the 4th component if it actually exists
      if (dest.length == 4)
      {
        dest[3] = mat[3] * vec[0] + mat[7] * vec[1] + mat[11] * vec[2] + mat[15] * w;
      }

      return dest;
    }
    else
    {
      var a = mat[0] * vec[0] + mat[4] * vec[1] + mat[8] * vec[2] + mat[12] * w;
      var b = mat[1] * vec[0] + mat[5] * vec[1] + mat[9] * vec[2] + mat[13] * w;
      var c = mat[2] * vec[0] + mat[6] * vec[1] + mat[10] * vec[2] + mat[14] * w;
      var d = mat[3] * vec[0] + mat[7] * vec[1] + mat[11] * vec[2] + mat[15] * w;

      dest[0] = a;
      dest[1] = b;
      dest[2] = c;

      // make sure they passed us a 4 component vector before trying to write to that
      // element.
      if (dest.length == 4)
      {
        dest[3] = d
      }
      return dest;
    }

}

/**
 Add two matrices.  This will result in a matrix in which each 
 corresponding component	of each matrix are added together.
 
 @param {Array} matOne The first matrix.
 @param {Array} matTwo The second matrix.
 
 @returns {Array} A Matrix which is the addition of 'matOne' and
 'matTwo'.
 */
c3dl.addMatrices = function (matOne, matTwo)
{
  var m = new C3DL_FLOAT_ARRAY(16);
  for (var i = 0; i < 16; i++)
  {
    // Add each value of the matrix to its counterpart
   m[i] = matOne[i] + matTwo[i];
  }
  return m;
}


/**
 Subtract Matrix 'matTwo' from 'matOne'.  This will result in a 
 matrix in which each component of 'matTwo' is subtracted from
 Matrix 'matOne.
 
 @param {Array} matOne The matrix which is being 
 subtracted from.
 @param {Array} matTwo The matrix which is matOne is being 
 subtracted from.
 
 @returns {Array} A matrix which is 'matTwo' subtracted from 'matOne'.
 */
c3dl.subtractMatrices = function (matOne, matTwo)
{
   var m = new C3DL_FLOAT_ARRAY(16);
   for (var i = 0; i < 16; i++)
   {
     // Add each value of the matrix to its counterpart
     m[i] = matOne[i] - matTwo[i];
   }
    return m;
 }

c3dl.copyMatrix = function (srcMat)
{
  return M4x4.clone(srcMat);
}
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/
// Written By:	Mark Paruzel
// Date:		April 20, 2008
// Project:		Canvas 3D Library
// -----------------------------------------------------------------------------
// NOTE: This group of functions act uppon an array of four values which
//       represent a Quaternion in 3D space. The values of the array each hold 
//       the values of the W, X, Y, and Z values of a quaternion.
// -----------------------------------------------------------------------------
/**
 Is the object 'quat' a valid Quaternion?
 
 @param {Array} quat
 
 @returns {boolean} True if 'quat' is a valid Quaternion, false 
 otherwise.
 */
c3dl.isValidQuat = function (quat)
{
  // All math types are arrays instead of objects for performance reasons.
  if (quat instanceof Array || quat instanceof C3DL_FLOAT_ARRAY)
  {
    // Must be 4 values long
    if (quat.length == 4)
    {
      for (var i = 0; i < 4; i++)
      {
        // Check for bad values
        if (isNaN(quat[i])) return false;
      }

      return true;
    }
  }

  // if not instance of an Array
  return false;
}

/**
 Make a Quaternion from the arguments.
 
 @param {float} newW
 @param {float} newX
 @param {float} newY
 @param {float} newZ
 
 @returns {Array} A Quaternion defined by the passed 
 in arguments.
 */
c3dl.makeQuat = function (newW, newX, newY, newZ)
{
  // Quat = W + X * i + Y * j + Z * k 
  var quat = new C3DL_FLOAT_ARRAY(4);

  quat[0] = !isNaN(newW) ? parseFloat(newW) : 0.0; // W
  quat[1] = !isNaN(newX) ? parseFloat(newX) : 0.0; // X
  quat[2] = !isNaN(newY) ? parseFloat(newY) : 0.0; // Y
  quat[3] = !isNaN(newZ) ? parseFloat(newZ) : 0.0; // Z
  return quat;
}


/**
 Convert a Quaternion to a Matrix.
 
 @param {Array} quat
 @param {Array} dest	
 
 @returns {Array} A matrix
 */
c3dl.quatToMatrix = function (quat, dest)
{
  var quatToMatrixTx = 2.0 * quat[1];
  var quatToMatrixTy = 2.0 * quat[2];
  var quatToMatrixTz = 2.0 * quat[3];
  var quatToMatrixTwx = quatToMatrixTx * quat[0];
  var quatToMatrixTwy = quatToMatrixTy * quat[0];
  var quatToMatrixTwz = quatToMatrixTz * quat[0];
  var quatToMatrixTxx = quatToMatrixTx * quat[1];
  var quatToMatrixTxy = quatToMatrixTy * quat[1];
  var quatToMatrixTxz = quatToMatrixTz * quat[1];
  var quatToMatrixTyy = quatToMatrixTy * quat[2];
  var quatToMatrixTyz = quatToMatrixTz * quat[2];
  var quatToMatrixTzz = quatToMatrixTz * quat[3];

  if (dest)
  {
    dest[0] = 1.0 - (quatToMatrixTyy + quatToMatrixTzz);
    dest[1] = quatToMatrixTxy - quatToMatrixTwz;
    dest[2] = quatToMatrixTxz + quatToMatrixTwy;
    dest[3] = 0.0;
    dest[4] = quatToMatrixTxy + quatToMatrixTwz;
    dest[5] = 1.0 - (quatToMatrixTxx + quatToMatrixTzz);
    dest[6] = quatToMatrixTyz - quatToMatrixTwx;
    dest[7] = 0.0;
    dest[8] = quatToMatrixTxz - quatToMatrixTwy;
    dest[9] = quatToMatrixTyz + quatToMatrixTwx;
    dest[10] = 1.0 - (quatToMatrixTxx + quatToMatrixTyy);
    dest[11] = 0.0;
    dest[12] = 0.0;
    dest[13] = 0.0;
    dest[14] = 0.0;
    dest[15] = 1.0;

    return dest;
  }
  else
  {
    // Setup a new Matrix out of this quaternion
    var newMat = new C3DL_FLOAT_ARRAY(16);

    newMat[0] = 1.0 - (quatToMatrixTyy + quatToMatrixTzz);
    newMat[1] = quatToMatrixTxy + quatToMatrixTwz;
    newMat[2] = quatToMatrixTxz - quatToMatrixTwy;
    newMat[3] = 0.0;

    newMat[4] = quatToMatrixTxy - quatToMatrixTwz;
    newMat[5] = 1.0 - (quatToMatrixTxx + quatToMatrixTzz);
    newMat[6] = quatToMatrixTyz + quatToMatrixTwx;
    newMat[7] = 0.0;

    newMat[8] = quatToMatrixTxz + quatToMatrixTwy;
    newMat[9] = quatToMatrixTyz - quatToMatrixTwx;
    newMat[10] = 1.0 - (quatToMatrixTxx + quatToMatrixTyy);
    newMat[11] = 0.0;

    newMat[12] = 0.0;
    newMat[13] = 0.0;
    newMat[14] = 0.0;
    newMat[15] = 1.0;
    return newMat;
  }
}


/**
 @param {Array} axisVec
 @param {float} angleScalar
 */
c3dl.quatToAxisAngle = function (axisVec, angleScalar)
{
  axisVec = makeVector();

  // Get the Length squared
  var sqLength = c3dl.quatLengthSq();

  // If length is very small, its basically touching a world Axis
  if (sqLength > c3dl.TOLERANCE)
  {
    var invLength = c3dl.invSqrt(sqLength);

    // Set the Angle
    angleScalar = 2.0 * Math.acos(quat[0]);

    // Set the Vector
    axisVec[0] = quat[1] * invLength; 
	axisVec[1] = quat[2] * invLength; 
	axisVec[3] = quat[3] * invLength;
  }
  else
  {
    // Set world Axis
    angleScalar = 0.0;
    axisVec = c3dl.makeVector(1.0, 0.0, 0.0);
  }
}


/**
 Convert an axis-angle vector to a Quaternion.
 
 @param {Array} axisVec
 @param {float} angleScalar
 @param {Array} dest
 
 @returns {Array}
 
 */
c3dl.axisAngleToQuathalfAngle;
c3dl.axisAngleToQuats;
c3dl.axisAngleToQuat = function (axisVec, angleScalar, dest)
{
  // q = cos(A/2) + sin(A/2) * (x*i + y*j + z*k)
  c3dl.axisAngleToQuathalfAngle = 0.5 * angleScalar;
  c3dl.axisAngleToQuats = Math.sin(c3dl.axisAngleToQuathalfAngle);

  if (dest)
  {
    dest[0] = Math.cos(c3dl.axisAngleToQuathalfAngle);
    dest[1] = c3dl.axisAngleToQuats * axisVec[0];
    dest[2] = c3dl.axisAngleToQuats * axisVec[1];
    dest[3] = c3dl.axisAngleToQuats * axisVec[2];
    return dest;
  }
  else
  {
    var quat = c3dl.makeQuat(Math.cos(c3dl.axisAngleToQuathalfAngle), 
      c3dl.axisAngleToQuats * axisVec[0], c3dl.axisAngleToQuats * axisVec[1], 
      c3dl.axisAngleToQuats * axisVec[2]);
    return quat;
  }
}


/**
 Convert a Matrix to a Quaternion.
 
 @param {Array} newMat
 
 @returns {Array}
 */
c3dl.matrixToQuat = function (newMat)
{
  var quat = c3dl.makeQuat();
  var trace = newMat[0] + newMat[5] + newMat[10] + 1;
  var sqTrace;
  var s;
  if (trace > 0.0)
  {
    sqTrace = Math.sqrt(trace);
    s = 0.5 / sqTrace;
    quat[0] = 0.25 / s;
    quat[1] = (newMat[6] - newMat[9]) * s;
    quat[2] = (newMat[8] - newMat[2]) * s;
    quat[3] = (newMat[1] - newMat[4]) * s;
  }
  else
  {
    if (newMat[0] > newMat[5] && newMat[0] > newMat[10])
    {
      s = 2.0 * Math.sqrt(1.0 + newMat[0] - newMat[5] - newMat[10]);
      quat[1] = 0.25 * s;
      quat[2] = (newMat[1] - newMat[4]) / s;
      quat[3] = (newMat[2] - newMat[8]) / s;
      quat[0] = (newMat[9] - newMat[6]) / s;
    }
    else if (newMat[5] > newMat[10])
    {
      s = 2.0 * Math.sqrt(1.0 + newMat[5] - newMat[0] - newMat[10]);
      quat[1] = (newMat[1] - newMat[4]) / s;
      quat[2] = 0.25 * s;
      quat[3] = (newMat[9] - newMat[6]) / s;
      quat[0] = (newMat[2] - newMat[8]) / s;
    }
    else
    {
      s = 2.0 * Math.sqrt(1.0 + newMat[10] - newMat[0] - newMat[5]);
      quat[1] = (newMat[2] - newMat[8]) / s;
      quat[2] = (newMat[9] - newMat[6]) / s;
      quat[3] = 0.25 * s;
      quat[0] = (newMat[1] - newMat[4]) / s;
    }
  }

    return quat;
 }

/**
 @param {Array} quat
 
 @returns {float}
 */
c3dl.quatLengthSq = function (quat)
{
  return quat[1] * quat[1] + quat[2] * quat[2] + quat[3] * quat[3];
}

/**
 Get the length of Quaternion 'quat'.
 
 @param {Array} quat
 
 @returns {float} The length 'quat' or null if 'quat' was not a 
 valid Quaternion.
 */
c3dl.quatLength = function (quat)
{
   return Math.sqrt(c3dl.quatLengthSq(quat));
}


/**
 Add two quaternions.
 
 @param {Array} quatOne
 @param {Array} quatTwo
 
 @returns {Array} The result of adding quatOne and quatTwo.
 */
c3dl.addQuats = function (quatOne, quatTwo)
{
  var quat = c3dl.makeQuat();
  for (var i = 0; i < 4; i++) {
    quat[i] = quatOne[i] + quatTwo[i];
  }
return quat;
}


/**
 Subtract Quaternion 'quatTwo' from 'quatOne'.
 
 @param {Array} quatOne
 @param {Array} quatTwo
 
 @returns {Array}
 */
c3dl.subtractQuats = function (quatOne, quatTwo)
{
  var quat = c3dl.makeQuat();
  for (var i = 0; i < 4; i++) {
    quat[i] = quatOne[i] - quatTwo[i];
  }
  return quat;
}


/**
 Multiply the Quaternion 'quatOne' with a scalar.
 
 @param {Array} quatOne
 @param {float} scalar
 
 @return {Array}
 */
c3dl.multiplyQuatByScalar = function (quatOne, scalar)
{
  var quat = c3dl.makeQuat();
  for (var i = 0; i < 4; i++) {
    quat[i] = quatOne[i] * scalar; //!! Mark: is this supposed to be a multiply?
  }
  return quat;
}

/**
 Get the conjugate of Quaternion 'quat'.
 
 @param {Array} quat
 
 return {Array}
 */
c3dl.getQuatConjugate = function (quat)
{
  var nQt = c3dl.makeQuat();
  nQt[0] = quat[0]; 
  nQt[1] = -quat[1]; 
  nQt[2] = -quat[2]; 
  nQt[3] = -quat[3];
  return nQt;
}

/**
 Dot Product
 
 @param {Array} quatOne
 @param {Array} quatTwo
 
 @returns {float}
 */
c3dl.quatDotProduct = function (quatOne, quatTwo)
{
  return quatOne[0] * quatTwo[0] + quatOne[1] * quatTwo[1] + quatOne[2] * quatTwo[2] + quatOne[3] * quatTwo[3];
}

/**
 Get the normalized Quaternion of quat.
 
 @param {Array} quat
 
 @return {Array}
 */
c3dl.normalizeQuat = function (quat)
{
  var newQuat = c3dl.makeQuat();
  var len = c3dl.quatLength(quat);
  var invLen = 1.0 / len;
  if (len > 0.001)
  {
    newQuat[0] = quat[0] * invLen;
    newQuat[1] = quat[1] * invLen;
    newQuat[2] = quat[2] * invLen;
    newQuat[3] = quat[3] * invLen;
  }
  else
  {
    // If Normalization Cannot be done
    newQuat[0] = 0.0;
    newQuat[1] = 0.0;
    newQuat[2] = 0.0;
    newQuat[3] = 0.0;
  }
  return newQuat;
}

/**
 Get the inverse of the Quaternion quat.
 
 @param {Array} quat
 
 @return {Array}
 */
c3dl.inverseQuat = function (quat)
{
  var invQuat = c3dl.makeQuat();
  var norm = 0.0;
  for (var i = 0; i < 4; i++) {
    norm += quat[i] * quat[i];
  }
  if (norm > 0.0)
  {
    var invNorm = 1.0 / norm;
    invQuat[0] = quat[0] * invNorm;
    invQuat[1] = -quat[1] * invNorm;
    invQuat[2] = -quat[2] * invNorm;
    invQuat[3] = -quat[3] * invNorm;
  }
  return invQuat;
}
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

// the stacks
c3dl.ModelView = [];
c3dl.Projection = [];

// to reduce code in the functions for cheking which stack we are 
// changing, just keep a reference variable to the current one.
// start with the modelview.
c3dl.CurrentStackPointer = c3dl.ModelView;

// like OpenGL, our stack starts off with an identity matrix. Here, we 
// have to access the stacks directly since at this point we don't 
// have access to the functions since they aren't defined yet.
c3dl.ModelView.push(c3dl.makeIdentityMatrix());
c3dl.Projection.push(c3dl.makeIdentityMatrix());


/**
 Change the matrix mode to either model view or projection.
 
 @param {c3dl.PROJECTION | c3dl.MODELVIEW} mode
 */
c3dl.matrixMode = function (mode)
{
  if (mode == c3dl.PROJECTION)
  {
    c3dl.CurrentStackPointer = c3dl.Projection;
  }
  else if (mode == c3dl.MODELVIEW)
  {
    c3dl.CurrentStackPointer = c3dl.ModelView;
  }
}


/**
 Create a copy of the top element and push on that copy. This results
 in the first two element being identical. This is simply emulating what
 OpenGL does.
 */
c3dl.pushMatrix = function ()
{
  c3dl.CurrentStackPointer.push(c3dl.peekMatrix());
}


/**
 Replace the top matrix with a specified matrix. If paramter is
 not provided, an identity matrix will replace the top matrix.
 
 @param {Array} [matrix] The matrix which will replace the 
 element at the top of the stack. If omitted, it will replace the
 top element with an identity matrix.
 */
c3dl.loadMatrix = function (matrix)
{
  if (matrix)
  {
    c3dl.CurrentStackPointer[c3dl.getMatrixStackHeight() - 1] = matrix;
  }

  // in Opengl if nothing is passed in it loads an identity matrix, 
  // so emulate that.
  else
  {
    // recursive, makes the first conditional our base case.
    c3dl.loadMatrix(c3dl.makeIdentityMatrix());
  }
}

/**
 Replace the top matrix with an identity matrix. This can also
 be accomplished by calling C3DL.loadMatrix() passing in zero
 arguments.
 */
c3dl.loadIdentity = function ()
{
  c3dl.loadMatrix(c3dl.makeIdentityMatrix())
}

/**
 Pop the top matrix off the stack.  If there is only one matrix
 left in the stack, this function does nothing.
 */
c3dl.popMatrix = function ()
{
  if (c3dl.getMatrixStackHeight() > 1)
  {
    c3dl.CurrentStackPointer.pop();
  }
}


/**
 Post multiply the matrix at the top of the stack with the 
 parameter 'matrix' and replace the top element with the product.
 
 @param {Array} matrix The matrix which will be post multiplied 
 with the top matrix.
 */
c3dl.multMatrix = function (matrix)
{
  c3dl.loadMatrix(c3dl.multiplyMatrixByMatrix(c3dl.peekMatrix(), matrix));
}


/**
 Get the matrix at the top of the stack.
 
 @returns {Array} The matrix at the top of the matrix stack.
 */
c3dl.peekMatrix = function ()
{
  return c3dl.CurrentStackPointer[c3dl.getMatrixStackHeight() - 1];
}


/**
 Get the number of elements in the matrix stack.
 
 @returns {int} The number of elements in the current matrix stack.
 */
c3dl.getMatrixStackHeight = function ()
{
  return c3dl.CurrentStackPointer.length;
}


/**
 Create a translate matrix and call C3DL.multMatrix() passing in the
 translate matrix.
 
 @param {float} translateX The translation for the x component.
 @param {float} translateY The translation for the y component.
 @param {float} translateZ The translation for the z component.
 */
c3dl.translate = function (translateX, translateY, translateZ)
{
  var translateMatrix = c3dl.makePoseMatrix([1, 0, 0], [0, 1, 0], [0, 0, 1],
    [translateX, translateY, translateZ]);

  c3dl.multMatrix(translateMatrix);
}

/**
 @private until implemented
 Create a rotation matrix and call multMatrix() with this matrix.
 
 @param {float} angle 
 @param {float} rotationX 
 @param {float} rotationY 
 @param {float} rotationZ 
 */
c3dl.rotate = function (angle, rotationX, rotationY, rotationZ)
{
  //implement me!
}

/**
 Create a scale matrix from the parameters provided and call multMatrix()
 with this matrix.
 
 @param {float} scaleX Scaling factor for the x component.
 @param {float} scaleY Scaling factor for the y component.
 @param {float} scaleZ Scaling factor for the z component. 
 */
c3dl.scale = function (scaleX, scaleY, scaleZ)
{
  var scaleMatrix = c3dl.makeIdentityMatrix();
  scaleMatrix[0] = scaleX;
  scaleMatrix[5] = scaleY;
  scaleMatrix[10] = scaleZ;

  c3dl.multMatrix(scaleMatrix);
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/


/**
 @class c3dl.Camera is a base class for c3dl.OrbitCamera and c3dl.FreeCamera. 
 */
c3dl.Camera = function ()
{
  // Raw Position Values
  this.left = c3dl.makeVector(1.0, 0.0, 0.0); // Camera Left vector
  this.up = c3dl.makeVector(0.0, 1.0, 0.0); // Camera Up vector
  this.dir = c3dl.makeVector(0.0, 0.0, 1.0); // The direction its looking at
  this.pos = c3dl.makeVector(0.0, 0.0, 0.0); // Camera eye position
  this.projectionTransform = null;
  this.projMatrix;
  this.viewMatrix;

  this.fieldOfView = c3dl.DEFAULT_FIELD_OF_VIEW;
  this.nearClippingPlane = c3dl.DEFAULT_NEAR_CLIPPING_PLANE;
  this.farClippingPlane = c3dl.DEFAULT_FAR_CLIPPING_PLANE;
}


/**
 @private
 
 Create the projection matrix.
 
 Places the view matrix at the bottom of the matrix stack.
 */
c3dl.Camera.prototype.applyToWorld = function (aspectRatio)
{
  // set the bottom matrix of the matrix stack to the viewmatrix
  c3dl.loadMatrix(c3dl.lookAt(this.pos, c3dl.addVectors(this.pos, this.dir), this.up));
  c3dl.translate(-this.pos[0], -this.pos[1], -this.pos[2]);
  this.viewMatrix = c3dl.peekMatrix();

  // Create a projection matrix and store it inside a globally accessible place.
  this.projMatrix = c3dl.makePerspective(this.fieldOfView, aspectRatio, this.nearClippingPlane, 
    this.farClippingPlane);
  c3dl.matrixMode(c3dl.PROJECTION);
  c3dl.loadMatrix(this.projMatrix);
  c3dl.matrixMode(c3dl.MODELVIEW);
}


/**
 Get the direction of the camera.
 
 @returns {Array} vector
 */
c3dl.Camera.prototype.getDir = function ()
{
  return c3dl.copyVector(this.dir);
}


/**
 Get the far clipping plane.
 
 @returns {float} far clipping plane value.
 */
c3dl.Camera.prototype.getFarClippingPlane = function ()
{
  return this.farClippingPlane;
}


/**
 Get the vertical field of view for this camera in degrees.
 
 @returns {float} field of view is greater than 0 and less than 180.
 */
c3dl.Camera.prototype.getFieldOfView = function ()
{
  return this.fieldOfView;
}


/**
 Get the left vector of the camera.
 
 @returns {Array} vector
 */
c3dl.Camera.prototype.getLeft = function ()
{
  return c3dl.copyVector(this.left);
}


/**
 Get the near clipping plane.
 
 @returns {float} near clipping plane value.
 */
c3dl.Camera.prototype.getNearClippingPlane = function ()
{
  return this.nearClippingPlane;
}


/**
 Get the position of the camera.
 
 @returns {Array} A three element array which contains the position of the camera.
 */
c3dl.Camera.prototype.getPosition = function ()
{
  return c3dl.copyVector(this.pos);
}


/**
 @private
 */
c3dl.Camera.prototype.getProjectionMatrix = function ()
{
  return c3dl.copyMatrix(this.projMatrix);
}

/**
 @private
 */
c3dl.Camera.prototype.getViewMatrix = function ()
{
  return c3dl.copyMatrix(this.viewMatrix);
}

/**
 Get the up vector of the camera.
 
 @returns {Array}
 */
c3dl.Camera.prototype.getUp = function ()
{
  return c3dl.copyVector(this.up);
}


/**
 The far clipping plane should not be set to an extremely large value. This
 can create depth buffer precision problems such as z-fighting. see
 http://www.opengl.org/resources/faq/technical/depthbuffer.htm for more information.
 
 @param {float} fcp Must be larger than 0.
 */
c3dl.Camera.prototype.setFarClippingPlane = function (fcp)
{
  if (fcp > 0)
  {
    this.farClippingPlane = fcp;
  }
}


/**
 Set the field of view for this camera in degrees.
 
 @param {float} fov Specified in degrees. Must be greater than 0 and less than 180.
 */
c3dl.Camera.prototype.setFieldOfView = function (fov)
{
  if (fov > 0 && fov < 180)
  {
    this.fieldOfView = fov;
  }
}


/**
 The near clipping plane must be set to a positive value.
 
 @param {float} ncp Must be larger than 0.
 */
c3dl.Camera.prototype.setNearClippingPlane = function (ncp)
{
  if (ncp > 0)
  {
    this.nearClippingPlane = ncp;
  }
}

/**
 Get a string representation of this camera.
 
 @param {String} [delimiter=","]  A string used to separate the member
 variables of the object.
 
 @returns {String} a string representation of this class.
 */
c3dl.Camera.prototype.toString = function (delimiter)
{
  // make sure user passed up a string if they actually decided
  // to specify a delimiter.
  if (!delimiter || typeof(delimiter) != "string")
  {
    delimiter = ",";
  }

  return "c3dl.Camera: " + delimiter + "left: " + this.getLeft() + delimiter + "up: " + this.getUp() +
    delimiter + "direction: " + this.getDir() + delimiter + "position: " + this.getPosition() +
    delimiter + "fied of view: " + this.getFieldOfView() + delimiter + "near clipping plane: " +
    this.getNearClippingPlane() + delimiter + "far clipping plane: " + this.getFarClippingPlane() + 
    delimiter;
}

/**
 @private
 
 Called automatically.
 
 Update Animation of the camera.
 
 @param {float} timeStep 
 */
c3dl.Camera.prototype.update = function (timeStep)
{

  if (c3dl.isVectorZero(linVel) && c3dl.isVectorZero(angVel)) return false;

  if (c3dl.vectorLengthSq(linVel) > 0.0)
  {
    // Add a velocity to the position
    velVec = c3dl.makeVector(linVel[0], linVel[1], linVel[2]);
    c3dl.multiplyVector(velVec, timeStep, velVec);

    c3dl.addVectors(pos, velVec, pos);
  }

  if (c3dl.vectorLengthSq(angVel) > 0.0)
  {
    // Apply some rotations to the orientation from the angular velocity
    this.pitch(angVel[0] * timeStep);
    this.yaw(angVel[1] * timeStep);
    this.roll(angVel[2] * timeStep);
  }

  return true;
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/



/**
 @class c3dl.FreeCamera A camera which can be freely moved around in a scene.
 @augments c3dl.Camera
 */
c3dl.FreeCamera = c3dl.inherit(c3dl.Camera, function ()
{
  c3dl._superc(this);
  // Delta Values for Animations
  this.linVel = c3dl.makeVector(0.0, 0.0, 0.0); // Animation of positions
  this.angVel = c3dl.makeVector(0.0, 0.0, 0.0); // Animations of rotation around (side Vector, up Vector, dir Vector)
});

/**
 Get the camera's angular velocity
 
 @return {Array}
 */
c3dl.FreeCamera.prototype.getAngularVel = function ()
{
  return c3dl.copyVector(this.angVel);
}


/**
 Get the camera's linear velocity
 
 @returns {Array}
 */
c3dl.FreeCamera.prototype.getLinearVel = function ()
{
  return c3dl.copyVector(this.linVel);
}


/**
 Rotate around the Side Vector by a hard amount (No Animation).
 
 @param {float} angle in radians.
 */
c3dl.FreeCamera.prototype.pitch = function (angle)
{
  this.rotateOnAxis(this.left, angle);
}


/**
 Rotate around the Dir Vector by a hard amount (No Animation).
 
 @param {float} angle in radians.
 */
c3dl.FreeCamera.prototype.roll = function (angle)
{
  this.rotateOnAxis(this.dir, angle);
}


/**
 Rotate camera on an Axis which is centered on the position of the camera.
 
 @param {Array} axisVec
 @param {float} angle in radians.
 */
c3dl.FreeCamera.prototype.rotateOnAxis = function (axisVec, angle)
{
  // Create a proper Quaternion based on location and angle
  var quat = c3dl.axisAngleToQuat(axisVec, angle);

  // Create a rotation Matrix out of this quaternion
  var mat = c3dl.quatToMatrix(quat);

  // Apply changes to the remaining vectors
  c3dl.multiplyMatrixByVector(mat, this.dir, this.dir);
  c3dl.normalizeVector(this.dir);

  c3dl.multiplyMatrixByVector(mat, this.left, this.left);
  c3dl.normalizeVector(this.left);

  c3dl.multiplyMatrixByVector(mat, this.up, this.up);
  c3dl.normalizeVector(this.up);
}


/**
 Set a new Angular Veclocity that will be added to the rotation on 
 every update.
 
 @param {Array} newVec
 */
c3dl.FreeCamera.prototype.setAngularVel = function (newVec)
{
  this.angVel[0] = newVec[0];
  this.angVel[1] = newVec[1];
  this.angVel[2] = newVec[2];
}


/**
 Set a new linear velocity that will be added to the position 
 on every update.
 
 @param {Array} newVec A vector which contains the direction 
 and speed of the camera.
 */
c3dl.FreeCamera.prototype.setLinearVel = function (newVec)
{
  this.linVel[0] = newVec[0];
  this.linVel[1] = newVec[1];
  this.linVel[2] = newVec[2];
}


/**
 Set the point in space where the camera will look at 
 (No Animation).
 
 @param {Array} newVec The new point the camera will 
 look at.
 */
c3dl.FreeCamera.prototype.setLookAtPoint = function (newVec)
{
    // if the position hasn't yet been changed and they want the
    // camera to look at [0,0,0], that will create a problem.
  if (c3dl.isVectorEqual(this.pos, [0, 0, 0]) && c3dl.isVectorEqual(newVec, [0, 0, 0]))
  {
    c3dl.debug.logWarning("Cannot lookAt [0,0,0] since camera is at [0,0,0]." +
      " Move camera before calling setLookAt()");
  }
  else
  {
    // Figure out the direction of the point we are looking at.
    this.dir = c3dl.subtractVectors(newVec, this.pos);
    c3dl.normalizeVector(this.dir);
    // Adjust the Up and Left vectors accordingly
    c3dl.vectorCrossProduct([0, 1, 0], this.dir, this.left);
    c3dl.normalizeVector(this.left);
    c3dl.vectorCrossProduct(this.dir, this.left, this.up);
    c3dl.normalizeVector(this.up);
  }
}
 


/**
 Set the new location of the camera.
 
 @param {Array} newVec An absolute value of where to 
 place the camera.
 */
c3dl.FreeCamera.prototype.setPosition = function (newVec)
{
  this.pos[0] = newVec[0];
  this.pos[1] = newVec[1];
  this.pos[2] = newVec[2];
}


/**
 Set the orientation of Up (No Animation).
 
 @param {Array} newVec
 */
c3dl.FreeCamera.prototype.setUpVector = function (newVec)
{
  this.up[0] = newVec[0];
  this.up[1] = newVec[1];
  this.up[2] = newVec[2];
}


/**
 Get a string representation of this camera.
 
 @param {null|String} delimiter A string which will separate values. Typically will be 
 ","  ,  "\n" or "&lt;br /&gt;". If none is specified, "," will be used.
 
 @returns {String} a string representation of this camera.
 */
c3dl.FreeCamera.prototype.toString = function (delimiter)
{
  // make sure user passed up a string if they actually decided
  // to specify a delimiter.
  if (!delimiter || typeof(delimiter) != "string")
  {
    delimiter = ",";
  }

  // get the c3dl.Camera's toString()
  var cameraToStr = c3dl._super(this, arguments, "toString");
  var FreeCameraToStr = "c3dl.FreeCamera: " + delimiter + "angular velocity = " +
    this.getAngularVel() + delimiter + "linear velocity = " + this.getLinearVel() + delimiter;
  return cameraToStr + FreeCameraToStr;
}


/**
 @private
 
 Called automatically.
 
 Update Animation of the camera.
 
 @param {float} timeStep 
 */
c3dl.FreeCamera.prototype.update = function (timeStep)
{
  //
  if (c3dl.isVectorZero(this.linVel) && c3dl.isVectorZero(this.angVel))
  {
    return false;
  }

  if (c3dl.vectorLengthSq(this.linVel) > 0.0)
  {
    // Add a velocity to the position
    var velVec = c3dl.makeVector(this.linVel[0], this.linVel[1], this.linVel[2]);
    c3dl.multiplyVector(velVec, timeStep, velVec);

    c3dl.addVectors(this.pos, velVec, this.pos);
  }

  if (c3dl.vectorLengthSq(this.angVel) > 0.0)
  {
    // Apply some rotations to the orientation from the angular velocity
    this.pitch(this.angVel[0] * timeStep);
    this.yaw(this.angVel[1] * timeStep);
    this.roll(this.angVel[2] * timeStep);
  }
}


/**
 Rotate around the Up Vector by a hard amount (No Animation).
 
 @param {float} angle in radians.
 */
c3dl.FreeCamera.prototype.yaw = function (angle)
{
  this.rotateOnAxis(this.up, angle);
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class c3dl.OrbitCamera is a camera which is restricted to orbiting 
 a point in space.  The camera orbits the point by moving along an imaginary 
 sphere which is centered on the point.<br /><br />
 
 OrbitCamera is generally used to orbit meshes, but isn't limited to doing so 
 since any point in space can be orbitted. However, since orbitting a mesh is 
 so common, distance limits can be assigned to the camera, which prevent it from
 entering or going to far from the mesh.<br /><br />
 
 If an object is being orbitted and the object moves, the camera must be set to 
 orbit the new object's position. This can be done by calling setOrbitPoint() and
 passing in the new object's position.<br /><br />
 
 When an OrbitCamera is created, it will be have the position and orbit point 
 at [0,0,0]. It will be looking down the -Z axis and have a closest and farthest 
 distance of 0.<br /><br />
 
 If the OrbitCamera's closest distance is set to a value which is greater than its 
 current distance, the camera will be 'backed up' so it has a distance equal to the 
 closest distance.  Similarly, setting the farthest distance to a smaller value may 
 also move the camera closer to the orbit point.
 
 @augments c3dl.Camera
 */
c3dl.OrbitCamera = c3dl.inherit(c3dl.Camera, function ()
{
  c3dl._superc(this);

  // this value cannot be set to less than 0.
  this.closestDistance = 0;

  // typically larger than the closest distance, but set to 
  // 0 here since the user will likely overwrite it anyway.
  // this value will always be greater or equal to the closest
  // distance.
  this.farthestDistance = 0;

  // the point in space the camera will 'orbit'.
  this.orbitPoint = c3dl.makeVector(0, 0, 0);
});

/**
 Get the closest distance the camera can reside from the orbit point.
 
 @returns {float} The closest distance camera can reside from the orbit point.
 */
c3dl.OrbitCamera.prototype.getClosestDistance = function ()
{
  return this.closestDistance;
}


/**
 Get the distance from the camera to the orbit point.
 
 @returns {float} distance from the camera to the orbit point.
 */
c3dl.OrbitCamera.prototype.getDistance = function ()
{
  return c3dl.vectorLength(c3dl.subtractVectors(this.pos, this.orbitPoint));
}


/**
 Get the farthest ditance the camera can reside from the orbit point.
 
 @returns {float} The farthest distance the camera can reside from the orbit point.
 */
c3dl.OrbitCamera.prototype.getFarthestDistance = function ()
{
  return this.farthestDistance;
}


/**
 Get the point the camera is orbiting.
 
 @returns {Array} The point which the camera is orbiting.
 */
c3dl.OrbitCamera.prototype.getOrbitPoint = function ()
{
  return c3dl.copyVector(this.orbitPoint);
}


/**
 Move the camera 'distance' towards the orbit point relative to where
 the camera is positioned. The camera will not move if attempted to move
 closer than the closest allowed distance.
 
 @param {float} distance Must be greater than 0.
 */
c3dl.OrbitCamera.prototype.goCloser = function (distance)
{
  // A negative value for goCloser() could be allowed and would
  // mean moving farther using a positive value, but this could
  // create some confusion and is therefore not permitted.
  if (distance > 0)
  {
    // scale it
    var shiftAmt = c3dl.multiplyVector(this.dir, distance);
    var renameMe = c3dl.subtractVectors(this.pos, this.orbitPoint);

    var maxMoveCloser = c3dl.vectorLength(renameMe) - this.getClosestDistance();

    if (c3dl.vectorLength(shiftAmt) <= maxMoveCloser)
    {
      this.pos = c3dl.addVectors(this.pos, shiftAmt);
      return true;
    }
  }
  return false;
}


/**
 Move the camera 'distance' away from the orbit point relative to where
 the camera is positioned. The camera will not move if attempted to move
 farther than the farthest distance.
 
 @param {float} distance Must be greater than 0.
 */
c3dl.OrbitCamera.prototype.goFarther = function (distance)
{
  // A negative value for goFarther() could be allowed and would
  // mean moving closer using a positive value, but this could
  // create some confusion and is therefore not permitted.
  if (distance > 0)
  {
    //
    var shiftAmt = c3dl.multiplyVector(c3dl.multiplyVector(this.dir, -1), distance);
    var newpos = c3dl.addVectors(this.pos, shiftAmt);
    var distanceBetweenCamAndOP = c3dl.vectorLength(c3dl.subtractVectors(newpos, this.orbitPoint));
    if (distanceBetweenCamAndOP <= this.getFarthestDistance())
    {
      this.pos = newpos;
      return true;
    }
  }
  return false;
}


/**
 Pitch the camera about the orbit point.
 
 @param {float} angle in radians.
 */
c3dl.OrbitCamera.prototype.pitch = function (angle)
{
  if (c3dl.isVectorEqual(this.pos, this.orbitPoint))
  {
    // Create a proper Quaternion based on location and angle.
    // we will rotate about the global up axis.
    var rotMat = c3dl.quatToMatrix(c3dl.axisAngleToQuat(this.left, angle));

    // 
    this.dir = c3dl.multiplyMatrixByVector(rotMat, this.dir);
    this.dir = c3dl.normalizeVector(this.dir);

    // update up vector
    this.up = c3dl.vectorCrossProduct(this.dir, this.left);
    this.up = c3dl.normalizeVector(this.up);

    // left does not change.
  }
  else
  {
    // get position relative to orbit point
    this.pos = c3dl.subtractVectors(this.pos, this.orbitPoint);

    // Create a Quaternion based on left vector and angle
    var quat = c3dl.axisAngleToQuat(this.left, angle);

    // Create a rotation Matrix out of this quaternion and apply 
    // the rotation matrix to position
    var rotMat = c3dl.quatToMatrix(quat);
    var newpos = c3dl.multiplyMatrixByVector(rotMat, this.pos);
    this.pos = c3dl.addVectors(newpos, this.orbitPoint);

    // 
    this.dir = c3dl.subtractVectors(this.orbitPoint, this.pos);
    this.dir = c3dl.normalizeVector(this.dir);

    // update up vector
    this.up = c3dl.vectorCrossProduct(this.dir, this.left);
    this.up = c3dl.normalizeVector(this.up);

    // update left
    this.left = c3dl.vectorCrossProduct(this.up, this.dir);
    this.left = c3dl.normalizeVector(this.left);
  }
}


/**
 Set the closest distance the camera can be from the orbit point.
 
 If 'distance' is greater than the current distance the camera is from
 the orbit point, the camera will be 'backed up' to the new closest
 distance.
 
 @param {float} distance Must be greater than zero and less than or 
 equal to getFarthestDistance().
 */
c3dl.OrbitCamera.prototype.setClosestDistance = function (distance)
{
  if (distance >= 0 && distance <= this.getFarthestDistance())
  {
    this.closestDistance = distance;

    // the camera may now be too close, so back it up if necessary.
    var distanceBetweenCamAndOP = this.getDistance();

    // check if the camera's position has been invalidated.
    if (distanceBetweenCamAndOP < this.getClosestDistance())
    {
      // back the camera up to the new closest distance.
      // find how much to back up the camera
      var amt = this.getClosestDistance() - distanceBetweenCamAndOP;

      // back it up
      this.goFarther(amt);
    }
  }
}


/**
 Set the camera 'distance' away from the orbit point. The distance
 must be a value between the getClosestDistance() and getFarthestDistance().
 
 @param {float} distance
 */
c3dl.OrbitCamera.prototype.setDistance = function (distance)
{
  if (distance >= this.getClosestDistance() && distance <= this.getFarthestDistance())
  {
    // place the camera at the orbit point, then goFarther
    this.pos = c3dl.copyVector(this.orbitPoint);

    this.goFarther(distance);
  }
}


/**
 Set the farthest distance the camera can move away from the orbit point.
 
 If 'distance' is less than the current distance the camera is from
 the orbit point, the camera will be pulled in to the new closest
 distance.
 
 @param {float} distance Must be less than or equal to getClosestDistance().
 */
c3dl.OrbitCamera.prototype.setFarthestDistance = function (distance)
{
  if (distance >= this.getClosestDistance())
  {
    this.farthestDistance = distance;

    // the camera may be too far from the orbit point, so bring it closer.
    var distanceBetweenCamAndOP = this.getDistance();

    // check if the camera's position has been invalidated.
    if (distanceBetweenCamAndOP > this.getFarthestDistance())
    {
      // back the camera up to the new closest distance.
      // find how much to back up the camera
      var amt = distanceBetweenCamAndOP - this.getFarthestDistance();

      // bring it closer.
      this.goCloser(amt);
    }
  }
}


/**
 Set the point which the camera will orbit and look at.
 
 The direction will remain unchanged.
 
 @param {Array} orbitPoint The new vector the camera will orbit and look at.
 */
c3dl.OrbitCamera.prototype.setOrbitPoint = function (orbitPoint)
{
  // get the distance the camera was from the orbit point.
  var orbitPointToCam = c3dl.multiplyVector(this.dir, -this.getDistance());
  this.orbitPoint[0] = orbitPoint[0];
  this.orbitPoint[1] = orbitPoint[1];
  this.orbitPoint[2] = orbitPoint[2];
  this.pos = c3dl.addVectors(this.orbitPoint, orbitPointToCam);
}
  



/**
 Yaw about the orbit point. The camera will remain looking at the
 orbit point and its position will rotate about the point parallel to
 the global up axis and intersecting with the orbit point.
 
 @param {float} angle in radians.
 */
c3dl.OrbitCamera.prototype.yaw = function (angle)
{
  if (c3dl.isVectorEqual(this.pos, this.orbitPoint))
  {
    // Create a proper Quaternion based on location and angle.
    // we will rotate about the global up axis.
    var rotMat = c3dl.quatToMatrix(c3dl.axisAngleToQuat([0, 1, 0], angle));

    //
    this.left = c3dl.multiplyMatrixByVector(rotMat, this.left);
    this.left = c3dl.normalizeVector(this.left);

    // update up
    this.up = c3dl.multiplyMatrixByVector(rotMat, this.up);
    this.up = c3dl.normalizeVector(this.up);

    // update left, can either do a cross product or matrix-vector mult.
    this.dir = c3dl.vectorCrossProduct(this.left, this.up);
    this.dir = c3dl.normalizeVector(this.dir);
  }

  else
  {
    //
    var camPosOrbit = c3dl.subtractVectors(this.pos, this.orbitPoint);

    // Create a rotation matrix based on location and angle.
    // we will rotate about the global up axis.
    var rotMat = c3dl.quatToMatrix(c3dl.axisAngleToQuat([0, 1, 0], angle));

    //
    var newpos = c3dl.multiplyMatrixByVector(rotMat, camPosOrbit);
    this.pos = c3dl.addVectors(newpos, this.orbitPoint);

    // update direction
    this.dir = c3dl.subtractVectors(this.orbitPoint, this.pos);
    this.dir = c3dl.normalizeVector(this.dir);

    // update up
    //
    this.up = c3dl.multiplyMatrixByVector(rotMat, this.up);
    this.up = c3dl.normalizeVector(this.up);

    // update left
    this.left = c3dl.vectorCrossProduct(this.up, this.dir);
    this.left = c3dl.normalizeVector(this.left);
  }
}


/**
 Set the camera to a new position. The position must be between the closest
 and farthest distances.
 
 @param {Array} position The new position of the camera.
 */
c3dl.OrbitCamera.prototype.setPosition = function (position)
{
  var distFromNewPosToOP = c3dl.vectorLength(c3dl.subtractVectors(this.orbitPoint, position));

  // make sure the new position of the cam is between the min 
  // and max allowed constraints.	
  if (distFromNewPosToOP >= this.getClosestDistance() && distFromNewPosToOP <= this.getFarthestDistance())
  {
    this.pos = c3dl.copyObj(position);
    var camPosToOrbitPoint = c3dl.subtractVectors(this.orbitPoint, this.pos);

	// if the position was set such that the direction vector is parallel to the global
    // up axis, the cross product won't work. In that case, leave the left vector as it was.
    if (c3dl.isVectorEqual([0, 0, 0], c3dl.vectorCrossProduct(camPosToOrbitPoint, [0, 1, 0])))
    {
      // set the direction
      this.dir = c3dl.normalizeVector(camPosToOrbitPoint);
      // the left vector will be perpendicular to the global up
      // axis and direction.
      this.up = c3dl.vectorCrossProduct(this.dir, this.left);
    }
    else
    {
      // set the direction
      this.dir = c3dl.normalizeVector(c3dl.subtractVectors(this.orbitPoint, this.pos));
      // the left vector will be perpendicular to the global up
      // axis and direction.
      this.left = c3dl.vectorCrossProduct([0, 1, 0], this.dir);
      this.up = c3dl.vectorCrossProduct(this.dir, this.left);
    }
 }
}


/**
 Get a string representation of this camera.
 
 @param {String} [delimiter=","]  A string which will separate values.
 
 @returns {String} a string representation of this camera.
 */
c3dl.OrbitCamera.prototype.toString = function (delimiter)
{
  // make sure user passed up a string if they actually decided
  // to specify a delimiter.
  if (!delimiter || typeof(delimiter) != "string")
  {
    delimiter = ",";
  }

  // get the c3dl.Camera's toString()
  var cameraToStr = c3dl._super(this, arguments, "toString");
  var OrbitCameraToStr = "c3dl.OrbitCamera: " + delimiter + "orbit point = " + this.getOrbitPoint() + delimiter + "closest distance = " + this.getClosestDistance() + delimiter + "farthest distance = " + this.getFarthestDistance();
  return cameraToStr + OrbitCameraToStr;
}


/**
 @private
 
 yaw and pitch can be given velocities later, but for now, this is
 not implemented.
 
 Update Animation of the camera.
 
 @param {float} timeStep
 */
c3dl.OrbitCamera.prototype.update = function (timeStep)
{
}/**
 @private
 
 class A Model is an object which has a geometric representation composed of 
 vertices, normals and uv coordinates. Models may also  have textures
 applied to them.
 */
c3dl.BoundingSphere = function ()
{
  // When a model is first loaded, the longestVector will be set.  Once the
  // model is scaled for example by (2,2,2), this scaled vector will be multiplied by
  // the longest vector and the radius will be recomputed.  It is not
  // sufficient to only store the radius (a scalar) value.  If the scaling
  // is uniform, the boundingSphere will always tightly enclose the model.  If
  // non-uniform scaling is applied to the model, the enclosure will not.
  // For the enclosure to do so would incur an O(n) operation everytime the 
  // a model is scaled non-uniformly.
  this.longestVector = c3dl.makeVector(0, 0, 0);
  this.original = c3dl.makeVector(0, 0, 0);
  // position of the boundingSphere in world space.
  this.position = c3dl.makeVector(0, 0, 0);
  this.center = c3dl.makeVector(0, 0, 0);
  this.radius = 0;
  this.maxMins = new C3DL_FLOAT_ARRAY(6)
  // This varialbe exists here to solve the problem of the Model and Bounding Sphere
  // having the same scaling.
  // The first time the BS is initialized it gets the longest vector of the object.
  // However the user may then scale the Model, we cannot scale the BS at that time
  // since the scale method is inside the primitive class, not model.  We also cannot
  // scale the BS to reflect the proper size in getBoundingSphere() since it would
  // keep incrementing the size of the BS everytime it it called.
  //
  // The hierarchy of our classes should be changed to 
  //   Actor (currently Primitive)
  //     ^
  //     |
  // VisualActor
  //     ^
  //     |
  //   Model 
  //
  // Then we could add BoundingSphere on the VisualActor and when it is scaled, the BS can be
  // also scaled.
  /**
   @private
   Initialize the object by providing a 1-dimensional array which contains
   the vertices of the object. This is O(n) since we need to find the longest
   vector as to adjust the sphere's radius.
   
   @param {Array} vertices The vertices of the visible object.  Since the array
   is 1-dimensional, the values could look similar to:<br />
   [-0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, .... ]<br />
   in which case values at 0,1 and 2 are x,y,z coordinates.
   */
  this.init = function (vertices)
  {
    // start the longest to zero, so it will be overritten probably by the first
    // vector found.
    var longestLengthFound = 0;

    // do not allocate a new vector for every iteration to prevent
    // too much allocation. So allocate outside the loop.
    var vector = c3dl.makeVector(0, 0, 0);
    var currVector;
	lengthVerts = new C3DL_FLOAT_ARRAY(vertices.length/3), 
	    heightVerts= new C3DL_FLOAT_ARRAY(vertices.length/3), widthVerts= new C3DL_FLOAT_ARRAY(vertices.length/3);
	var j = 0;
    for (var i = 0, len = vertices.length/3; i < len; i++) {
      lengthVerts[i] = vertices[j];
      heightVerts[i] = vertices[j+1];
      widthVerts[i]  = vertices[j+2];
      j+=3
    }    
    
    this.maxMins[0] = c3dl.findMax(lengthVerts); 
	this.maxMins[1] = c3dl.findMin(lengthVerts);
    this.maxMins[2] = c3dl.findMax(heightVerts);
    this.maxMins[3] = c3dl.findMin(heightVerts); 
    this.maxMins[4] = c3dl.findMax(widthVerts); 
    this.maxMins[5] = c3dl.findMin(widthVerts);     
     
    this.center[0] = (this.maxMins[0] + this.maxMins[1])/2;
    this.center[1] = (this.maxMins[2] + this.maxMins[3])/2;
    this.center[2] = (this.maxMins[4] + this.maxMins[5])/2;
	for (var i = 0; i < vertices.length; i += 3)
    {
      // 
      vector[0] = vertices[i + 0];
      vector[1] = vertices[i + 1];
      vector[2] = vertices[i + 2];	
	  c3dl.subtractVectors(vector, this.center, vector);
      currVector = c3dl.vectorLength(vector);

      // once the longest vector is found, this becomes our radius.
      if (currVector > longestLengthFound)
      {
        longestLengthFound = currVector;
        this.longestVector = [vector[0], vector[1], vector[2]];
      }
    }
    // now that we have found the longest vector, we can assign the radius.
    // use copyVector for this
    this.original[0] = this.longestVector[0];
    this.original[1] = this.longestVector[1];
    this.original[2] = this.longestVector[2];
	this.radius=c3dl.vectorLength(this.longestVector);
  }

  /**
   @private
   Set a new position of the bounding sphere.
   
   @param {Array} position An three element array which contains the x,y,z values
   of the new position of the bounding sphere.
   */
  this.setPosition = function (position)
  {
    this.position[0] = position[0]+this.center[0];
	this.position[1] = position[1]+this.center[1];
	this.position[2] = position[2]+this.center[2];
  }
  
  this.getTransform = function ()
  {
    var mat = c3dl.makePoseMatrix([1,0,0],[0,1,0],[0,0,1], this.position);
    var smat = c3dl.makeMatrix();
    c3dl.setMatrix(smat, this.radius, 0, 0, 0, 0, this.radius, 0, 0, 0, 0, this.radius, 0, 0, 0, 0, 1);
    mat = c3dl.multiplyMatrixByMatrix(mat, smat);
    return mat;
  }
  
  
  /**
   @private
   
   Primitive will call this when it is scaled. Thus keeping the sphere bounds around
   the Model.
   
   @param {Array} scaleVec
   */
  this.scale = function (scaleVec)
  {
    // The object could have been scaled non-uniformly, so we have to get the component
    // which has the greatest scaling factor.  We will use that to recalculate the 
    // bounding sphere's radius.
    var largestScale = scaleVec[0] > scaleVec[1] ? scaleVec[0] : scaleVec[1];
    largestScale = largestScale > scaleVec[2] ? largestScale : scaleVec[2];
    this.longestVector[0] = this.original[0] * largestScale;
    this.longestVector[1] = this.original[1] * largestScale;
    this.longestVector[2] = this.original[2] * largestScale;
	this.center[0] = (this.maxMins[0]* largestScale + this.maxMins[1]* largestScale)/2;
	this.center[1] = (this.maxMins[2]* largestScale + this.maxMins[3]* largestScale)/2;
	this.center[2] = (this.maxMins[4]* largestScale + this.maxMins[5]* largestScale)/2;
	this.radius=c3dl.vectorLength(this.longestVector);
  }

  /**
   @private
   Render the bounding sphere
   
   @param {c3dl.Scene} scene
   */
  this.render = function (scene)
  {
    if (scene.getBoundingVolumeVisibility())
    {
      scene.getRenderer().renderBoundingSphere(this,scene.getCamera().getViewMatrix());
    }
  }

  this.moveCenter = function (rotateMat)
  {
    this.center=c3dl.multiplyMatrixByVector(rotateMat, this.center);
  }
  /**
   @private
   */
  this.getRadius = function ()
  {
    return this.radius;
  }
  /**
   @private
   */
  this.getMaxMins = function ()
  {
    return this.maxMins;
  }
  /**
   @private
   
   Get the position of the bounding sphere.
   
   @returns {Array} A three element array of the bounding spheres position.
   */
  this.getPosition = function ()
  {
    return c3dl.copyVector(this.position);
  }
  this.getCenter = function ()
  {
    return c3dl.copyVector(this.center);
  }
  this.getLongestVector = function ()
  {
    return c3dl.copyVector(this.longestVector);
  }
  this.getCopy = function ()
  {
    var copy = new c3dl.BoundingSphere();
    copy.longestVector = c3dl.copyVector(this.longestVector);
	copy.original = c3dl.copyVector(this.original);
	copy.position = c3dl.copyVector(this.position);
	copy.center = c3dl.copyVector(this.center );
	copy.center = c3dl.copyVector(this.center );
	copy.maxMins = this.maxMins;
	return copy;
  }
}
c3dl.BS_NORMALS = [
0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,
1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,
0,1,0,0,1,0];

c3dl.BOUNDING_SPHERE_VERTICES = [-0.000001, -1, 0.000001, 0.096133, -0.995185, -0.019122, 0.098016, -0.995185, 0, 0.098017, 0.995185, 0, 0.096134, 0.995185, -0.019122, 0, 1, 0, 0.096134, 0.995185, -0.019122, 0.090556, 0.995185, -0.03751, 0, 1, 0, -0.000001, -1, 0.000001, 0.090555, -0.995185, -0.037509, 0.096133, -0.995185, -0.019122, -0.000001, -1, 0.000001, 0.081498, -0.995185, -0.054455, 0.090555, -0.995185, -0.037509, 0.090556, 0.995185, -0.03751, 0.081498, 0.995185, -0.054455, 0, 1, 0, 0.081498, 0.995185, -0.054455, 0.069309, 0.995185, -0.069309, 0, 1, 0, -0.000001, -1, 0.000001, 0.069308, -0.995185, -0.069308, 0.081498, -0.995185, -0.054455, -0.000001, -1, 0.000001, 0.054455, -0.995185, -0.081498, 0.069308, -0.995185, -0.069308, 0.069309, 0.995185, -0.069309, 0.054455, 0.995185, -0.081498, 0, 1, 0, 0.054455, 0.995185, -0.081498, 0.03751, 0.995185, -0.090556, 0, 1, 0, -0.000001, -1, 0.000001, 0.037509, -0.995185, -0.090555, 0.054455, -0.995185, -0.081498, -0.000001, -1, 0.000001, 0.019122, -0.995185, -0.096133, 0.037509, -0.995185, -0.090555, 0.03751, 0.995185, -0.090556, 0.019122, 0.995185, -0.096134, 0, 1, 0, 0.019122, 0.995185, -0.096134, 0, 0.995185, -0.098017, 0, 1, 0, -0.000001, -1, 0.000001, 0, -0.995185, -0.098016, 0.019122, -0.995185, -0.096133, -0.000001, -1, 0.000001, -0.019122, -0.995185, -0.096133, 0, -0.995185, -0.098016, 0, 0.995185, -0.098017, -0.019122, 0.995185, -0.096134, 0, 1, 0, -0.019122, 0.995185, -0.096134, -0.03751, 0.995185, -0.090556, 0, 1, 0, -0.000001, -1, 0.000001, -0.037509, -0.995185, -0.090555, -0.019122, -0.995185, -0.096133, -0.000001, -1, 0.000001, -0.054455, -0.995185, -0.081498, -0.037509, -0.995185, -0.090555, -0.03751, 0.995185, -0.090556, -0.054455, 0.995185, -0.081498, 0, 1, 0, -0.054455, 0.995185, -0.081498, -0.069309, 0.995185, -0.069309, 0, 1, 0, -0.000001, -1, 0.000001, -0.069308, -0.995185, -0.069308, -0.054455, -0.995185, -0.081498, -0.000001, -1, 0.000001, -0.081498, -0.995185, -0.054455, -0.069308, -0.995185, -0.069308, -0.069309, 0.995185, -0.069309, -0.081498, 0.995185, -0.054455, 0, 1, 0, -0.081498, 0.995185, -0.054455, -0.090556, 0.995185, -0.03751, 0, 1, 0, -0.000001, -1, 0.000001, -0.090555, -0.995185, -0.037509, -0.081498, -0.995185, -0.054455, -0.000001, -1, 0.000001, -0.096133, -0.995185, -0.019122, -0.090555, -0.995185, -0.037509, -0.090556, 0.995185, -0.03751, -0.096134, 0.995185, -0.019122, 0, 1, 0, -0.096134, 0.995185, -0.019122, -0.098017, 0.995185, 0, 0, 1, 0, -0.000001, -1, 0.000001, -0.098016, -0.995185, 0, -0.096133, -0.995185, -0.019122, -0.000001, -1, 0.000001, -0.096133, -0.995185, 0.019122, -0.098016, -0.995185, 0, -0.098017, 0.995185, 0, -0.096134, 0.995185, 0.019122, 0, 1, 0, -0.096134, 0.995185, 0.019122, -0.090556, 0.995185, 0.037509, 0, 1, 0, -0.000001, -1, 0.000001, -0.090555, -0.995185, 0.037509, -0.096133, -0.995185, 0.019122, -0.000001, -1, 0.000001, -0.081498, -0.995185, 0.054455, -0.090555, -0.995185, 0.037509, -0.090556, 0.995185, 0.037509, -0.081498, 0.995185, 0.054455, 0, 1, 0, -0.081498, 0.995185, 0.054455, -0.069309, 0.995185, 0.069309, 0, 1, 0, -0.000001, -1, 0.000001, -0.069308, -0.995185, 0.069308, -0.081498, -0.995185, 0.054455, -0.000001, -1, 0.000001, -0.054455, -0.995185, 0.081498, -0.069308, -0.995185, 0.069308, -0.069309, 0.995185, 0.069309, -0.054455, 0.995185, 0.081498, 0, 1, 0, -0.054455, 0.995185, 0.081498, -0.03751, 0.995185, 0.090556, 0, 1, 0, -0.000001, -1, 0.000001, -0.037509, -0.995185, 0.090555, -0.054455, -0.995185, 0.081498, -0.000001, -1, 0.000001, -0.019122, -0.995185, 0.096133, -0.037509, -0.995185, 0.090555, -0.03751, 0.995185, 0.090556, -0.019122, 0.995185, 0.096134, 0, 1, 0, -0.019122, 0.995185, 0.096134, 0, 0.995185, 0.098017, 0, 1, 0, -0.000001, -1, 0.000001, 0, -0.995185, 0.098016, -0.019122, -0.995185, 0.096133, -0.000001, -1, 0.000001, 0.019122, -0.995185, 0.096133, 0, -0.995185, 0.098016, 0, 0.995185, 0.098017, 0.019122, 0.995185, 0.096134, 0, 1, 0, 0.019122, 0.995185, 0.096134, 0.03751, 0.995185, 0.090556, 0, 1, 0, -0.000001, -1, 0.000001, 0.037509, -0.995185, 0.090555, 0.019122, -0.995185, 0.096133, -0.000001, -1, 0.000001, 0.054455, -0.995185, 0.081498, 0.037509, -0.995185, 0.090555, 0.03751, 0.995185, 0.090556, 0.054455, 0.995185, 0.081498, 0, 1, 0, 0.054455, 0.995185, 0.081498, 0.069309, 0.995185, 0.069308, 0, 1, 0, -0.000001, -1, 0.000001, 0.069308, -0.995185, 0.069308, 0.054455, -0.995185, 0.081498, -0.000001, -1, 0.000001, 0.081498, -0.995185, 0.054455, 0.069308, -0.995185, 0.069308, 0.069309, 0.995185, 0.069308, 0.081498, 0.995185, 0.054455, 0, 1, 0, 0.081498, 0.995185, 0.054455, 0.090556, 0.995185, 0.037509, 0, 1, 0, -0.000001, -1, 0.000001, 0.090555, -0.995185, 0.037509, 0.081498, -0.995185, 0.054455, -0.000001, -1, 0.000001, 0.096133, -0.995185, 0.019122, 0.090555, -0.995185, 0.037509, 0.090556, 0.995185, 0.037509, 0.096134, 0.995185, 0.019122, 0, 1, 0, 0.096134, 0.995185, 0.019122, 0.098017, 0.995185, 0, 0, 1, 0, -0.000001, -1, 0.000001, 0.098016, -0.995185, 0, 0.096133, -0.995185, 0.019122, 0.096133, -0.995185, 0.019122, 0.098016, -0.995185, 0, 0.195089, -0.980785, 0, 0.096133, -0.995185, 0.019122, 0.195089, -0.980785, 0, 0.191341, -0.980785, 0.03806, 0.191341, -0.980785, 0.03806, 0.195089, -0.980785, 0, 0.290284, -0.956941, 0, 0.191341, -0.980785, 0.03806, 0.290284, -0.956941, 0, 0.284706, -0.956941, 0.056632, 0.284706, -0.956941, 0.056632, 0.290284, -0.956941, 0, 0.382682, -0.92388, 0, 0.284706, -0.956941, 0.056632, 0.382682, -0.92388, 0, 0.375329, -0.92388, 0.074658, 0.375329, -0.92388, 0.074658, 0.382682, -0.92388, 0, 0.471396, -0.881922, 0, 0.375329, -0.92388, 0.074658, 0.471396, -0.881922, 0, 0.462338, -0.881922, 0.091965, 0.462338, -0.881922, 0.091965, 0.471396, -0.881922, 0, 0.555569, -0.83147, 0, 0.462338, -0.881922, 0.091965, 0.555569, -0.83147, 0, 0.544894, -0.83147, 0.108386, 0.544894, -0.83147, 0.108386, 0.555569, -0.83147, 0, 0.634392, -0.773011, 0, 0.544894, -0.83147, 0.108386, 0.634392, -0.773011, 0, 0.622203, -0.773011, 0.123764, 0.622203, -0.773011, 0.123764, 0.634392, -0.773011, 0, 0.707106, -0.707107, 0, 0.622203, -0.773011, 0.123764, 0.707106, -0.707107, 0, 0.693519, -0.707107, 0.137949, 0.693519, -0.707107, 0.137949, 0.707106, -0.707107, 0, 0.758157, -0.634394, 0.150806, 0.707106, -0.707107, 0, 0.77301, -0.634394, 0, 0.758157, -0.634394, 0.150806, 0.758157, -0.634394, 0.150806, 0.77301, -0.634394, 0, 0.831469, -0.555571, 0, 0.758157, -0.634394, 0.150806, 0.831469, -0.555571, 0, 0.815492, -0.555571, 0.162211, 0.815492, -0.555571, 0.162211, 0.831469, -0.555571, 0, 0.88192, -0.471397, 0, 0.815492, -0.555571, 0.162211, 0.88192, -0.471397, 0, 0.864975, -0.471397, 0.172054, 0.864975, -0.471397, 0.172054, 0.88192, -0.471397, 0, 0.906127, -0.382684, 0.18024, 0.88192, -0.471397, 0, 0.923879, -0.382684, 0, 0.906127, -0.382684, 0.18024, 0.906127, -0.382684, 0.18024, 0.923879, -0.382684, 0, 0.95694, -0.290285, 0, 0.906127, -0.382684, 0.18024, 0.95694, -0.290285, 0, 0.938552, -0.290285, 0.18669, 0.938552, -0.290285, 0.18669, 0.95694, -0.290285, 0, 0.961939, -0.195091, 0.191341, 0.95694, -0.290285, 0, 0.980785, -0.195091, 0, 0.961939, -0.195091, 0.191341, 0.961939, -0.195091, 0.191341, 0.980785, -0.195091, 0, 0.995184, -0.098017, 0, 0.961939, -0.195091, 0.191341, 0.995184, -0.098017, 0, 0.976061, -0.098017, 0.194151, 0.976061, -0.098017, 0.194151, 0.995184, -0.098017, 0, 0.980784, 0, 0.19509, 0.995184, -0.098017, 0, 0.999999, 0, 0, 0.980784, 0, 0.19509, 0.980784, 0, 0.19509, 0.999999, 0, 0, 0.995184, 0.098017, 0, 0.980784, 0, 0.19509, 0.995184, 0.098017, 0, 0.976061, 0.098017, 0.194151, 0.976061, 0.098017, 0.194151, 0.995184, 0.098017, 0, 0.961939, 0.19509, 0.191341, 0.995184, 0.098017, 0, 0.980785, 0.19509, 0, 0.961939, 0.19509, 0.191341, 0.961939, 0.19509, 0.191341, 0.980785, 0.19509, 0, 0.95694, 0.290285, 0, 0.961939, 0.19509, 0.191341, 0.95694, 0.290285, 0, 0.938552, 0.290285, 0.186689, 0.938552, 0.290285, 0.186689, 0.95694, 0.290285, 0, 0.923879, 0.382683, 0, 0.938552, 0.290285, 0.186689, 0.923879, 0.382683, 0, 0.906127, 0.382683, 0.18024, 0.906127, 0.382683, 0.18024, 0.923879, 0.382683, 0, 0.864975, 0.471397, 0.172054, 0.923879, 0.382683, 0, 0.88192, 0.471397, 0, 0.864975, 0.471397, 0.172054, 0.864975, 0.471397, 0.172054, 0.88192, 0.471397, 0, 0.815493, 0.55557, 0.162211, 0.88192, 0.471397, 0, 0.831469, 0.55557, 0, 0.815493, 0.55557, 0.162211, 0.815493, 0.55557, 0.162211, 0.831469, 0.55557, 0, 0.77301, 0.634393, 0, 0.815493, 0.55557, 0.162211, 0.77301, 0.634393, 0, 0.758157, 0.634393, 0.150807, 0.758157, 0.634393, 0.150807, 0.77301, 0.634393, 0, 0.707107, 0.707107, 0, 0.758157, 0.634393, 0.150807, 0.707107, 0.707107, 0, 0.69352, 0.707107, 0.13795, 0.69352, 0.707107, 0.13795, 0.707107, 0.707107, 0, 0.634393, 0.77301, 0, 0.69352, 0.707107, 0.13795, 0.634393, 0.77301, 0, 0.622203, 0.77301, 0.123764, 0.622203, 0.77301, 0.123764, 0.634393, 0.77301, 0, 0.544895, 0.83147, 0.108386, 0.634393, 0.77301, 0, 0.55557, 0.83147, 0, 0.544895, 0.83147, 0.108386, 0.544895, 0.83147, 0.108386, 0.55557, 0.83147, 0, 0.471396, 0.881921, 0, 0.544895, 0.83147, 0.108386, 0.471396, 0.881921, 0, 0.462339, 0.881921, 0.091965, 0.462339, 0.881921, 0.091965, 0.471396, 0.881921, 0, 0.382683, 0.92388, 0, 0.462339, 0.881921, 0.091965, 0.382683, 0.92388, 0, 0.37533, 0.92388, 0.074658, 0.37533, 0.92388, 0.074658, 0.382683, 0.92388, 0, 0.290284, 0.95694, 0, 0.37533, 0.92388, 0.074658, 0.290284, 0.95694, 0, 0.284707, 0.95694, 0.056632, 0.284707, 0.95694, 0.056632, 0.290284, 0.95694, 0, 0.19509, 0.980785, 0, 0.284707, 0.95694, 0.056632, 0.19509, 0.980785, 0, 0.191342, 0.980785, 0.03806, 0.098017, 0.995185, 0, 0.096134, 0.995185, 0.019122, 0.191342, 0.980785, 0.03806, 0.098017, 0.995185, 0, 0.191342, 0.980785, 0.03806, 0.19509, 0.980785, 0, 0.18024, 0.980785, 0.074658, 0.191342, 0.980785, 0.03806, 0.096134, 0.995185, 0.019122, 0.18024, 0.980785, 0.074658, 0.096134, 0.995185, 0.019122, 0.090556, 0.995185, 0.037509, 0.268188, 0.95694, 0.111087, 0.284707, 0.95694, 0.056632, 0.191342, 0.980785, 0.03806, 0.268188, 0.95694, 0.111087, 0.191342, 0.980785, 0.03806, 0.18024, 0.980785, 0.074658, 0.353553, 0.92388, 0.146446, 0.37533, 0.92388, 0.074658, 0.284707, 0.95694, 0.056632, 0.353553, 0.92388, 0.146446, 0.284707, 0.95694, 0.056632, 0.268188, 0.95694, 0.111087, 0.435513, 0.881921, 0.180395, 0.462339, 0.881921, 0.091965, 0.37533, 0.92388, 0.074658, 0.435513, 0.881921, 0.180395, 0.37533, 0.92388, 0.074658, 0.353553, 0.92388, 0.146446, 0.513279, 0.83147, 0.212607, 0.544895, 0.83147, 0.108386, 0.462339, 0.881921, 0.091965, 0.513279, 0.83147, 0.212607, 0.462339, 0.881921, 0.091965, 0.435513, 0.881921, 0.180395, 0.586102, 0.77301, 0.242771, 0.622203, 0.77301, 0.123764, 0.513279, 0.83147, 0.212607, 0.622203, 0.77301, 0.123764, 0.544895, 0.83147, 0.108386, 0.513279, 0.83147, 0.212607, 0.653281, 0.707107, 0.270598, 0.69352, 0.707107, 0.13795, 0.622203, 0.77301, 0.123764, 0.653281, 0.707107, 0.270598, 0.622203, 0.77301, 0.123764, 0.586102, 0.77301, 0.242771, 0.714168, 0.634393, 0.295818, 0.758157, 0.634393, 0.150807, 0.69352, 0.707107, 0.13795, 0.714168, 0.634393, 0.295818, 0.69352, 0.707107, 0.13795, 0.653281, 0.707107, 0.270598, 0.768177, 0.55557, 0.318189, 0.815493, 0.55557, 0.162211, 0.758157, 0.634393, 0.150807, 0.768177, 0.55557, 0.318189, 0.758157, 0.634393, 0.150807, 0.714168, 0.634393, 0.295818, 0.814788, 0.471397, 0.337496, 0.864975, 0.471397, 0.172054, 0.768177, 0.55557, 0.318189, 0.864975, 0.471397, 0.172054, 0.815493, 0.55557, 0.162211, 0.768177, 0.55557, 0.318189, 0.853553, 0.382683, 0.353553, 0.906127, 0.382683, 0.18024, 0.814788, 0.471397, 0.337496, 0.906127, 0.382683, 0.18024, 0.864975, 0.471397, 0.172054, 0.814788, 0.471397, 0.337496, 0.884097, 0.290285, 0.366205, 0.938552, 0.290285, 0.186689, 0.906127, 0.382683, 0.18024, 0.884097, 0.290285, 0.366205, 0.906127, 0.382683, 0.18024, 0.853553, 0.382683, 0.353553, 0.906127, 0.19509, 0.37533, 0.961939, 0.19509, 0.191341, 0.938552, 0.290285, 0.186689, 0.906127, 0.19509, 0.37533, 0.938552, 0.290285, 0.186689, 0.884097, 0.290285, 0.366205, 0.91943, 0.098017, 0.38084, 0.976061, 0.098017, 0.194151, 0.906127, 0.19509, 0.37533, 0.976061, 0.098017, 0.194151, 0.961939, 0.19509, 0.191341, 0.906127, 0.19509, 0.37533, 0.923879, 0, 0.382683, 0.980784, 0, 0.19509, 0.976061, 0.098017, 0.194151, 0.923879, 0, 0.382683, 0.976061, 0.098017, 0.194151, 0.91943, 0.098017, 0.38084, 0.91943, -0.098017, 0.38084, 0.976061, -0.098017, 0.194151, 0.923879, 0, 0.382683, 0.976061, -0.098017, 0.194151, 0.980784, 0, 0.19509, 0.923879, 0, 0.382683, 0.906127, -0.195091, 0.37533, 0.961939, -0.195091, 0.191341, 0.976061, -0.098017, 0.194151, 0.906127, -0.195091, 0.37533, 0.976061, -0.098017, 0.194151, 0.91943, -0.098017, 0.38084, 0.884097, -0.290285, 0.366205, 0.938552, -0.290285, 0.18669, 0.906127, -0.195091, 0.37533, 0.938552, -0.290285, 0.18669, 0.961939, -0.195091, 0.191341, 0.906127, -0.195091, 0.37533, 0.853553, -0.382684, 0.353553, 0.906127, -0.382684, 0.18024, 0.938552, -0.290285, 0.18669, 0.853553, -0.382684, 0.353553, 0.938552, -0.290285, 0.18669, 0.884097, -0.290285, 0.366205, 0.814788, -0.471397, 0.337496, 0.864975, -0.471397, 0.172054, 0.853553, -0.382684, 0.353553, 0.864975, -0.471397, 0.172054, 0.906127, -0.382684, 0.18024, 0.853553, -0.382684, 0.353553, 0.768177, -0.555571, 0.318189, 0.815492, -0.555571, 0.162211, 0.864975, -0.471397, 0.172054, 0.768177, -0.555571, 0.318189, 0.864975, -0.471397, 0.172054, 0.814788, -0.471397, 0.337496, 0.714168, -0.634394, 0.295818, 0.758157, -0.634394, 0.150806, 0.815492, -0.555571, 0.162211, 0.714168, -0.634394, 0.295818, 0.815492, -0.555571, 0.162211, 0.768177, -0.555571, 0.318189, 0.653281, -0.707107, 0.270598, 0.693519, -0.707107, 0.137949, 0.714168, -0.634394, 0.295818, 0.693519, -0.707107, 0.137949, 0.758157, -0.634394, 0.150806, 0.714168, -0.634394, 0.295818, 0.586102, -0.773011, 0.242771, 0.622203, -0.773011, 0.123764, 0.693519, -0.707107, 0.137949, 0.586102, -0.773011, 0.242771, 0.693519, -0.707107, 0.137949, 0.653281, -0.707107, 0.270598, 0.513279, -0.83147, 0.212607, 0.544894, -0.83147, 0.108386, 0.622203, -0.773011, 0.123764, 0.513279, -0.83147, 0.212607, 0.622203, -0.773011, 0.123764, 0.586102, -0.773011, 0.242771, 0.435513, -0.881922, 0.180395, 0.462338, -0.881922, 0.091965, 0.544894, -0.83147, 0.108386, 0.435513, -0.881922, 0.180395, 0.544894, -0.83147, 0.108386, 0.513279, -0.83147, 0.212607, 0.353552, -0.92388, 0.146446, 0.375329, -0.92388, 0.074658, 0.462338, -0.881922, 0.091965, 0.353552, -0.92388, 0.146446, 0.462338, -0.881922, 0.091965, 0.435513, -0.881922, 0.180395, 0.268187, -0.956941, 0.111087, 0.284706, -0.956941, 0.056632, 0.375329, -0.92388, 0.074658, 0.268187, -0.956941, 0.111087, 0.375329, -0.92388, 0.074658, 0.353552, -0.92388, 0.146446, 0.180239, -0.980785, 0.074657, 0.191341, -0.980785, 0.03806, 0.284706, -0.956941, 0.056632, 0.180239, -0.980785, 0.074657, 0.284706, -0.956941, 0.056632, 0.268187, -0.956941, 0.111087, 0.090555, -0.995185, 0.037509, 0.096133, -0.995185, 0.019122, 0.191341, -0.980785, 0.03806, 0.090555, -0.995185, 0.037509, 0.191341, -0.980785, 0.03806, 0.180239, -0.980785, 0.074657, 0.081498, -0.995185, 0.054455, 0.090555, -0.995185, 0.037509, 0.180239, -0.980785, 0.074657, 0.081498, -0.995185, 0.054455, 0.180239, -0.980785, 0.074657, 0.162211, -0.980785, 0.108386, 0.162211, -0.980785, 0.108386, 0.180239, -0.980785, 0.074657, 0.268187, -0.956941, 0.111087, 0.162211, -0.980785, 0.108386, 0.268187, -0.956941, 0.111087, 0.241362, -0.956941, 0.161273, 0.241362, -0.956941, 0.161273, 0.268187, -0.956941, 0.111087, 0.353552, -0.92388, 0.146446, 0.241362, -0.956941, 0.161273, 0.353552, -0.92388, 0.146446, 0.318189, -0.92388, 0.212607, 0.318189, -0.92388, 0.212607, 0.353552, -0.92388, 0.146446, 0.435513, -0.881922, 0.180395, 0.318189, -0.92388, 0.212607, 0.435513, -0.881922, 0.180395, 0.391951, -0.881922, 0.261893, 0.391951, -0.881922, 0.261893, 0.435513, -0.881922, 0.180395, 0.513279, -0.83147, 0.212607, 0.391951, -0.881922, 0.261893, 0.513279, -0.83147, 0.212607, 0.461939, -0.83147, 0.308658, 0.461939, -0.83147, 0.308658, 0.513279, -0.83147, 0.212607, 0.586102, -0.773011, 0.242771, 0.461939, -0.83147, 0.308658, 0.586102, -0.773011, 0.242771, 0.527478, -0.773011, 0.352449, 0.527478, -0.773011, 0.352449, 0.586102, -0.773011, 0.242771, 0.653281, -0.707107, 0.270598, 0.527478, -0.773011, 0.352449, 0.653281, -0.707107, 0.270598, 0.587937, -0.707107, 0.392847, 0.587937, -0.707107, 0.392847, 0.653281, -0.707107, 0.270598, 0.642734, -0.634394, 0.429461, 0.653281, -0.707107, 0.270598, 0.714168, -0.634394, 0.295818, 0.642734, -0.634394, 0.429461, 0.642734, -0.634394, 0.429461, 0.714168, -0.634394, 0.295818, 0.768177, -0.555571, 0.318189, 0.642734, -0.634394, 0.429461, 0.768177, -0.555571, 0.318189, 0.691341, -0.555571, 0.461939, 0.691341, -0.555571, 0.461939, 0.768177, -0.555571, 0.318189, 0.814788, -0.471397, 0.337496, 0.691341, -0.555571, 0.461939, 0.814788, -0.471397, 0.337496, 0.73329, -0.471397, 0.489969, 0.73329, -0.471397, 0.489969, 0.814788, -0.471397, 0.337496, 0.768177, -0.382684, 0.513279, 0.814788, -0.471397, 0.337496, 0.853553, -0.382684, 0.353553, 0.768177, -0.382684, 0.513279, 0.768177, -0.382684, 0.513279, 0.853553, -0.382684, 0.353553, 0.884097, -0.290285, 0.366205, 0.768177, -0.382684, 0.513279, 0.884097, -0.290285, 0.366205, 0.795666, -0.290285, 0.531647, 0.795666, -0.290285, 0.531647, 0.884097, -0.290285, 0.366205, 0.815493, -0.195091, 0.544895, 0.884097, -0.290285, 0.366205, 0.906127, -0.195091, 0.37533, 0.815493, -0.195091, 0.544895, 0.815493, -0.195091, 0.544895, 0.906127, -0.195091, 0.37533, 0.91943, -0.098017, 0.38084, 0.815493, -0.195091, 0.544895, 0.91943, -0.098017, 0.38084, 0.827465, -0.098017, 0.552894, 0.827465, -0.098017, 0.552894, 0.91943, -0.098017, 0.38084, 0.831469, 0, 0.555569, 0.91943, -0.098017, 0.38084, 0.923879, 0, 0.382683, 0.831469, 0, 0.555569, 0.831469, 0, 0.555569, 0.923879, 0, 0.382683, 0.91943, 0.098017, 0.38084, 0.831469, 0, 0.555569, 0.91943, 0.098017, 0.38084, 0.827465, 0.098017, 0.552894, 0.827465, 0.098017, 0.552894, 0.91943, 0.098017, 0.38084, 0.815493, 0.19509, 0.544895, 0.91943, 0.098017, 0.38084, 0.906127, 0.19509, 0.37533, 0.815493, 0.19509, 0.544895, 0.815493, 0.19509, 0.544895, 0.906127, 0.19509, 0.37533, 0.884097, 0.290285, 0.366205, 0.815493, 0.19509, 0.544895, 0.884097, 0.290285, 0.366205, 0.795666, 0.290285, 0.531647, 0.795666, 0.290285, 0.531647, 0.884097, 0.290285, 0.366205, 0.853553, 0.382683, 0.353553, 0.795666, 0.290285, 0.531647, 0.853553, 0.382683, 0.353553, 0.768177, 0.382683, 0.51328, 0.768177, 0.382683, 0.51328, 0.853553, 0.382683, 0.353553, 0.73329, 0.471397, 0.489969, 0.853553, 0.382683, 0.353553, 0.814788, 0.471397, 0.337496, 0.73329, 0.471397, 0.489969, 0.73329, 0.471397, 0.489969, 0.814788, 0.471397, 0.337496, 0.691341, 0.55557, 0.461939, 0.814788, 0.471397, 0.337496, 0.768177, 0.55557, 0.318189, 0.691341, 0.55557, 0.461939, 0.691341, 0.55557, 0.461939, 0.768177, 0.55557, 0.318189, 0.714168, 0.634393, 0.295818, 0.691341, 0.55557, 0.461939, 0.714168, 0.634393, 0.295818, 0.642734, 0.634393, 0.429461, 0.642734, 0.634393, 0.429461, 0.714168, 0.634393, 0.295818, 0.653281, 0.707107, 0.270598, 0.642734, 0.634393, 0.429461, 0.653281, 0.707107, 0.270598, 0.587938, 0.707107, 0.392847, 0.587938, 0.707107, 0.392847, 0.653281, 0.707107, 0.270598, 0.586102, 0.77301, 0.242771, 0.587938, 0.707107, 0.392847, 0.586102, 0.77301, 0.242771, 0.527478, 0.77301, 0.35245, 0.527478, 0.77301, 0.35245, 0.586102, 0.77301, 0.242771, 0.461939, 0.83147, 0.308658, 0.586102, 0.77301, 0.242771, 0.513279, 0.83147, 0.212607, 0.461939, 0.83147, 0.308658, 0.461939, 0.83147, 0.308658, 0.513279, 0.83147, 0.212607, 0.435513, 0.881921, 0.180395, 0.461939, 0.83147, 0.308658, 0.435513, 0.881921, 0.180395, 0.391952, 0.881921, 0.261894, 0.391952, 0.881921, 0.261894, 0.435513, 0.881921, 0.180395, 0.353553, 0.92388, 0.146446, 0.391952, 0.881921, 0.261894, 0.353553, 0.92388, 0.146446, 0.31819, 0.92388, 0.212607, 0.31819, 0.92388, 0.212607, 0.353553, 0.92388, 0.146446, 0.268188, 0.95694, 0.111087, 0.31819, 0.92388, 0.212607, 0.268188, 0.95694, 0.111087, 0.241363, 0.95694, 0.161273, 0.241363, 0.95694, 0.161273, 0.268188, 0.95694, 0.111087, 0.18024, 0.980785, 0.074658, 0.241363, 0.95694, 0.161273, 0.18024, 0.980785, 0.074658, 0.162212, 0.980785, 0.108386, 0.162212, 0.980785, 0.108386, 0.18024, 0.980785, 0.074658, 0.090556, 0.995185, 0.037509, 0.162212, 0.980785, 0.108386, 0.090556, 0.995185, 0.037509, 0.081498, 0.995185, 0.054455, 0.13795, 0.980785, 0.137949, 0.162212, 0.980785, 0.108386, 0.081498, 0.995185, 0.054455, 0.13795, 0.980785, 0.137949, 0.081498, 0.995185, 0.054455, 0.069309, 0.995185, 0.069308, 0.205262, 0.95694, 0.205262, 0.241363, 0.95694, 0.161273, 0.162212, 0.980785, 0.108386, 0.205262, 0.95694, 0.205262, 0.162212, 0.980785, 0.108386, 0.13795, 0.980785, 0.137949, 0.270598, 0.92388, 0.270598, 0.31819, 0.92388, 0.212607, 0.241363, 0.95694, 0.161273, 0.270598, 0.92388, 0.270598, 0.241363, 0.95694, 0.161273, 0.205262, 0.95694, 0.205262, 0.333328, 0.881921, 0.333327, 0.391952, 0.881921, 0.261894, 0.31819, 0.92388, 0.212607, 0.333328, 0.881921, 0.333327, 0.31819, 0.92388, 0.212607, 0.270598, 0.92388, 0.270598, 0.392847, 0.83147, 0.392847, 0.461939, 0.83147, 0.308658, 0.391952, 0.881921, 0.261894, 0.392847, 0.83147, 0.392847, 0.391952, 0.881921, 0.261894, 0.333328, 0.881921, 0.333327, 0.448583, 0.77301, 0.448583, 0.527478, 0.77301, 0.35245, 0.392847, 0.83147, 0.392847, 0.527478, 0.77301, 0.35245, 0.461939, 0.83147, 0.308658, 0.392847, 0.83147, 0.392847, 0.5, 0.707107, 0.5, 0.587938, 0.707107, 0.392847, 0.527478, 0.77301, 0.35245, 0.5, 0.707107, 0.5, 0.527478, 0.77301, 0.35245, 0.448583, 0.77301, 0.448583, 0.546601, 0.634393, 0.546601, 0.642734, 0.634393, 0.429461, 0.587938, 0.707107, 0.392847, 0.546601, 0.634393, 0.546601, 0.587938, 0.707107, 0.392847, 0.5, 0.707107, 0.5, 0.587938, 0.55557, 0.587937, 0.691341, 0.55557, 0.461939, 0.642734, 0.634393, 0.429461, 0.587938, 0.55557, 0.587937, 0.642734, 0.634393, 0.429461, 0.546601, 0.634393, 0.546601, 0.623612, 0.471397, 0.623612, 0.73329, 0.471397, 0.489969, 0.587938, 0.55557, 0.587937, 0.73329, 0.471397, 0.489969, 0.691341, 0.55557, 0.461939, 0.587938, 0.55557, 0.587937, 0.653281, 0.382683, 0.653281, 0.768177, 0.382683, 0.51328, 0.623612, 0.471397, 0.623612, 0.768177, 0.382683, 0.51328, 0.73329, 0.471397, 0.489969, 0.623612, 0.471397, 0.623612, 0.676659, 0.290285, 0.676658, 0.795666, 0.290285, 0.531647, 0.768177, 0.382683, 0.51328, 0.676659, 0.290285, 0.676658, 0.768177, 0.382683, 0.51328, 0.653281, 0.382683, 0.653281, 0.69352, 0.19509, 0.693519, 0.815493, 0.19509, 0.544895, 0.795666, 0.290285, 0.531647, 0.69352, 0.19509, 0.693519, 0.795666, 0.290285, 0.531647, 0.676659, 0.290285, 0.676658, 0.703701, 0.098017, 0.703701, 0.827465, 0.098017, 0.552894, 0.69352, 0.19509, 0.693519, 0.827465, 0.098017, 0.552894, 0.815493, 0.19509, 0.544895, 0.69352, 0.19509, 0.693519, 0.707106, 0, 0.707106, 0.831469, 0, 0.555569, 0.827465, 0.098017, 0.552894, 0.707106, 0, 0.707106, 0.827465, 0.098017, 0.552894, 0.703701, 0.098017, 0.703701, 0.703701, -0.098017, 0.703701, 0.827465, -0.098017, 0.552894, 0.707106, 0, 0.707106, 0.827465, -0.098017, 0.552894, 0.831469, 0, 0.555569, 0.707106, 0, 0.707106, 0.69352, -0.195091, 0.693519, 0.815493, -0.195091, 0.544895, 0.827465, -0.098017, 0.552894, 0.69352, -0.195091, 0.693519, 0.827465, -0.098017, 0.552894, 0.703701, -0.098017, 0.703701, 0.676659, -0.290285, 0.676659, 0.795666, -0.290285, 0.531647, 0.69352, -0.195091, 0.693519, 0.795666, -0.290285, 0.531647, 0.815493, -0.195091, 0.544895, 0.69352, -0.195091, 0.693519, 0.653281, -0.382684, 0.653281, 0.768177, -0.382684, 0.513279, 0.795666, -0.290285, 0.531647, 0.653281, -0.382684, 0.653281, 0.795666, -0.290285, 0.531647, 0.676659, -0.290285, 0.676659, 0.623612, -0.471397, 0.623612, 0.73329, -0.471397, 0.489969, 0.768177, -0.382684, 0.513279, 0.623612, -0.471397, 0.623612, 0.768177, -0.382684, 0.513279, 0.653281, -0.382684, 0.653281, 0.587937, -0.555571, 0.587937, 0.691341, -0.555571, 0.461939, 0.73329, -0.471397, 0.489969, 0.587937, -0.555571, 0.587937, 0.73329, -0.471397, 0.489969, 0.623612, -0.471397, 0.623612, 0.546601, -0.634394, 0.5466, 0.642734, -0.634394, 0.429461, 0.691341, -0.555571, 0.461939, 0.546601, -0.634394, 0.5466, 0.691341, -0.555571, 0.461939, 0.587937, -0.555571, 0.587937, 0.5, -0.707107, 0.499999, 0.587937, -0.707107, 0.392847, 0.642734, -0.634394, 0.429461, 0.5, -0.707107, 0.499999, 0.642734, -0.634394, 0.429461, 0.546601, -0.634394, 0.5466, 0.448583, -0.773011, 0.448583, 0.527478, -0.773011, 0.352449, 0.587937, -0.707107, 0.392847, 0.448583, -0.773011, 0.448583, 0.587937, -0.707107, 0.392847, 0.5, -0.707107, 0.499999, 0.392847, -0.83147, 0.392847, 0.461939, -0.83147, 0.308658, 0.527478, -0.773011, 0.352449, 0.392847, -0.83147, 0.392847, 0.527478, -0.773011, 0.352449, 0.448583, -0.773011, 0.448583, 0.333327, -0.881922, 0.333327, 0.391951, -0.881922, 0.261893, 0.461939, -0.83147, 0.308658, 0.333327, -0.881922, 0.333327, 0.461939, -0.83147, 0.308658, 0.392847, -0.83147, 0.392847, 0.270597, -0.92388, 0.270597, 0.318189, -0.92388, 0.212607, 0.391951, -0.881922, 0.261893, 0.270597, -0.92388, 0.270597, 0.391951, -0.881922, 0.261893, 0.333327, -0.881922, 0.333327, 0.205262, -0.956941, 0.205262, 0.241362, -0.956941, 0.161273, 0.318189, -0.92388, 0.212607, 0.205262, -0.956941, 0.205262, 0.318189, -0.92388, 0.212607, 0.270597, -0.92388, 0.270597, 0.137949, -0.980785, 0.137949, 0.162211, -0.980785, 0.108386, 0.241362, -0.956941, 0.161273, 0.137949, -0.980785, 0.137949, 0.241362, -0.956941, 0.161273, 0.205262, -0.956941, 0.205262, 0.069308, -0.995185, 0.069308, 0.081498, -0.995185, 0.054455, 0.162211, -0.980785, 0.108386, 0.069308, -0.995185, 0.069308, 0.162211, -0.980785, 0.108386, 0.137949, -0.980785, 0.137949, 0.054455, -0.995185, 0.081498, 0.069308, -0.995185, 0.069308, 0.137949, -0.980785, 0.137949, 0.054455, -0.995185, 0.081498, 0.137949, -0.980785, 0.137949, 0.108386, -0.980785, 0.162211, 0.108386, -0.980785, 0.162211, 0.137949, -0.980785, 0.137949, 0.205262, -0.956941, 0.205262, 0.108386, -0.980785, 0.162211, 0.205262, -0.956941, 0.205262, 0.161273, -0.956941, 0.241362, 0.161273, -0.956941, 0.241362, 0.205262, -0.956941, 0.205262, 0.270597, -0.92388, 0.270597, 0.161273, -0.956941, 0.241362, 0.270597, -0.92388, 0.270597, 0.212607, -0.92388, 0.318189, 0.212607, -0.92388, 0.318189, 0.270597, -0.92388, 0.270597, 0.333327, -0.881922, 0.333327, 0.212607, -0.92388, 0.318189, 0.333327, -0.881922, 0.333327, 0.261894, -0.881922, 0.391951, 0.261894, -0.881922, 0.391951, 0.333327, -0.881922, 0.333327, 0.392847, -0.83147, 0.392847, 0.261894, -0.881922, 0.391951, 0.392847, -0.83147, 0.392847, 0.308658, -0.83147, 0.461939, 0.308658, -0.83147, 0.461939, 0.392847, -0.83147, 0.392847, 0.35245, -0.773011, 0.527478, 0.392847, -0.83147, 0.392847, 0.448583, -0.773011, 0.448583, 0.35245, -0.773011, 0.527478, 0.35245, -0.773011, 0.527478, 0.448583, -0.773011, 0.448583, 0.5, -0.707107, 0.499999, 0.35245, -0.773011, 0.527478, 0.5, -0.707107, 0.499999, 0.392847, -0.707107, 0.587937, 0.392847, -0.707107, 0.587937, 0.5, -0.707107, 0.499999, 0.429461, -0.634394, 0.642734, 0.5, -0.707107, 0.499999, 0.546601, -0.634394, 0.5466, 0.429461, -0.634394, 0.642734, 0.429461, -0.634394, 0.642734, 0.546601, -0.634394, 0.5466, 0.587937, -0.555571, 0.587937, 0.429461, -0.634394, 0.642734, 0.587937, -0.555571, 0.587937, 0.46194, -0.555571, 0.691341, 0.46194, -0.555571, 0.691341, 0.587937, -0.555571, 0.587937, 0.623612, -0.471397, 0.623612, 0.46194, -0.555571, 0.691341, 0.623612, -0.471397, 0.623612, 0.489969, -0.471397, 0.73329, 0.489969, -0.471397, 0.73329, 0.623612, -0.471397, 0.623612, 0.653281, -0.382684, 0.653281, 0.489969, -0.471397, 0.73329, 0.653281, -0.382684, 0.653281, 0.51328, -0.382684, 0.768177, 0.51328, -0.382684, 0.768177, 0.653281, -0.382684, 0.653281, 0.676659, -0.290285, 0.676659, 0.51328, -0.382684, 0.768177, 0.676659, -0.290285, 0.676659, 0.531647, -0.290285, 0.795666, 0.531647, -0.290285, 0.795666, 0.676659, -0.290285, 0.676659, 0.544895, -0.195091, 0.815493, 0.676659, -0.290285, 0.676659, 0.69352, -0.195091, 0.693519, 0.544895, -0.195091, 0.815493, 0.544895, -0.195091, 0.815493, 0.69352, -0.195091, 0.693519, 0.703701, -0.098017, 0.703701, 0.544895, -0.195091, 0.815493, 0.703701, -0.098017, 0.703701, 0.552895, -0.098017, 0.827465, 0.552895, -0.098017, 0.827465, 0.703701, -0.098017, 0.703701, 0.55557, 0, 0.831468, 0.703701, -0.098017, 0.703701, 0.707106, 0, 0.707106, 0.55557, 0, 0.831468, 0.55557, 0, 0.831468, 0.707106, 0, 0.707106, 0.703701, 0.098017, 0.703701, 0.55557, 0, 0.831468, 0.703701, 0.098017, 0.703701, 0.552895, 0.098017, 0.827465, 0.552895, 0.098017, 0.827465, 0.703701, 0.098017, 0.703701, 0.544895, 0.19509, 0.815493, 0.703701, 0.098017, 0.703701, 0.69352, 0.19509, 0.693519, 0.544895, 0.19509, 0.815493, 0.544895, 0.19509, 0.815493, 0.69352, 0.19509, 0.693519, 0.676659, 0.290285, 0.676658, 0.544895, 0.19509, 0.815493, 0.676659, 0.290285, 0.676658, 0.531647, 0.290285, 0.795666, 0.531647, 0.290285, 0.795666, 0.676659, 0.290285, 0.676658, 0.653281, 0.382683, 0.653281, 0.531647, 0.290285, 0.795666, 0.653281, 0.382683, 0.653281, 0.51328, 0.382683, 0.768177, 0.51328, 0.382683, 0.768177, 0.653281, 0.382683, 0.653281, 0.489969, 0.471397, 0.73329, 0.653281, 0.382683, 0.653281, 0.623612, 0.471397, 0.623612, 0.489969, 0.471397, 0.73329, 0.489969, 0.471397, 0.73329, 0.623612, 0.471397, 0.623612, 0.46194, 0.55557, 0.691341, 0.623612, 0.471397, 0.623612, 0.587938, 0.55557, 0.587937, 0.46194, 0.55557, 0.691341, 0.46194, 0.55557, 0.691341, 0.587938, 0.55557, 0.587937, 0.546601, 0.634393, 0.546601, 0.46194, 0.55557, 0.691341, 0.546601, 0.634393, 0.546601, 0.429462, 0.634393, 0.642734, 0.429462, 0.634393, 0.642734, 0.546601, 0.634393, 0.546601, 0.5, 0.707107, 0.5, 0.429462, 0.634393, 0.642734, 0.5, 0.707107, 0.5, 0.392847, 0.707107, 0.587938, 0.392847, 0.707107, 0.587938, 0.5, 0.707107, 0.5, 0.448583, 0.77301, 0.448583, 0.392847, 0.707107, 0.587938, 0.448583, 0.77301, 0.448583, 0.35245, 0.77301, 0.527478, 0.35245, 0.77301, 0.527478, 0.448583, 0.77301, 0.448583, 0.308658, 0.83147, 0.461939, 0.448583, 0.77301, 0.448583, 0.392847, 0.83147, 0.392847, 0.308658, 0.83147, 0.461939, 0.308658, 0.83147, 0.461939, 0.392847, 0.83147, 0.392847, 0.333328, 0.881921, 0.333327, 0.308658, 0.83147, 0.461939, 0.333328, 0.881921, 0.333327, 0.261894, 0.881921, 0.391952, 0.261894, 0.881921, 0.391952, 0.333328, 0.881921, 0.333327, 0.270598, 0.92388, 0.270598, 0.261894, 0.881921, 0.391952, 0.270598, 0.92388, 0.270598, 0.212607, 0.92388, 0.318189, 0.212607, 0.92388, 0.318189, 0.270598, 0.92388, 0.270598, 0.205262, 0.95694, 0.205262, 0.212607, 0.92388, 0.318189, 0.205262, 0.95694, 0.205262, 0.161273, 0.95694, 0.241363, 0.161273, 0.95694, 0.241363, 0.205262, 0.95694, 0.205262, 0.13795, 0.980785, 0.137949, 0.161273, 0.95694, 0.241363, 0.13795, 0.980785, 0.137949, 0.108386, 0.980785, 0.162211, 0.108386, 0.980785, 0.162211, 0.13795, 0.980785, 0.137949, 0.069309, 0.995185, 0.069308, 0.108386, 0.980785, 0.162211, 0.069309, 0.995185, 0.069308, 0.054455, 0.995185, 0.081498, 0.074658, 0.980785, 0.18024, 0.108386, 0.980785, 0.162211, 0.054455, 0.995185, 0.081498, 0.074658, 0.980785, 0.18024, 0.054455, 0.995185, 0.081498, 0.03751, 0.995185, 0.090556, 0.111087, 0.95694, 0.268188, 0.161273, 0.95694, 0.241363, 0.108386, 0.980785, 0.162211, 0.111087, 0.95694, 0.268188, 0.108386, 0.980785, 0.162211, 0.074658, 0.980785, 0.18024, 0.146447, 0.92388, 0.353553, 0.212607, 0.92388, 0.318189, 0.161273, 0.95694, 0.241363, 0.146447, 0.92388, 0.353553, 0.161273, 0.95694, 0.241363, 0.111087, 0.95694, 0.268188, 0.180396, 0.881921, 0.435513, 0.261894, 0.881921, 0.391952, 0.212607, 0.92388, 0.318189, 0.180396, 0.881921, 0.435513, 0.212607, 0.92388, 0.318189, 0.146447, 0.92388, 0.353553, 0.212607, 0.83147, 0.513279, 0.308658, 0.83147, 0.461939, 0.261894, 0.881921, 0.391952, 0.212607, 0.83147, 0.513279, 0.261894, 0.881921, 0.391952, 0.180396, 0.881921, 0.435513, 0.242772, 0.77301, 0.586102, 0.35245, 0.77301, 0.527478, 0.212607, 0.83147, 0.513279, 0.35245, 0.77301, 0.527478, 0.308658, 0.83147, 0.461939, 0.212607, 0.83147, 0.513279, 0.270598, 0.707107, 0.653281, 0.392847, 0.707107, 0.587938, 0.35245, 0.77301, 0.527478, 0.270598, 0.707107, 0.653281, 0.35245, 0.77301, 0.527478, 0.242772, 0.77301, 0.586102, 0.295818, 0.634393, 0.714168, 0.429462, 0.634393, 0.642734, 0.392847, 0.707107, 0.587938, 0.295818, 0.634393, 0.714168, 0.392847, 0.707107, 0.587938, 0.270598, 0.707107, 0.653281, 0.31819, 0.55557, 0.768177, 0.46194, 0.55557, 0.691341, 0.429462, 0.634393, 0.642734, 0.31819, 0.55557, 0.768177, 0.429462, 0.634393, 0.642734, 0.295818, 0.634393, 0.714168, 0.337496, 0.471397, 0.814788, 0.489969, 0.471397, 0.73329, 0.31819, 0.55557, 0.768177, 0.489969, 0.471397, 0.73329, 0.46194, 0.55557, 0.691341, 0.31819, 0.55557, 0.768177, 0.353553, 0.382683, 0.853553, 0.51328, 0.382683, 0.768177, 0.337496, 0.471397, 0.814788, 0.51328, 0.382683, 0.768177, 0.489969, 0.471397, 0.73329, 0.337496, 0.471397, 0.814788, 0.366205, 0.290285, 0.884097, 0.531647, 0.290285, 0.795666, 0.51328, 0.382683, 0.768177, 0.366205, 0.290285, 0.884097, 0.51328, 0.382683, 0.768177, 0.353553, 0.382683, 0.853553, 0.37533, 0.19509, 0.906127, 0.544895, 0.19509, 0.815493, 0.531647, 0.290285, 0.795666, 0.37533, 0.19509, 0.906127, 0.531647, 0.290285, 0.795666, 0.366205, 0.290285, 0.884097, 0.38084, 0.098017, 0.91943, 0.552895, 0.098017, 0.827465, 0.37533, 0.19509, 0.906127, 0.552895, 0.098017, 0.827465, 0.544895, 0.19509, 0.815493, 0.37533, 0.19509, 0.906127, 0.382683, 0, 0.923878, 0.55557, 0, 0.831468, 0.552895, 0.098017, 0.827465, 0.382683, 0, 0.923878, 0.552895, 0.098017, 0.827465, 0.38084, 0.098017, 0.91943, 0.38084, -0.098017, 0.91943, 0.552895, -0.098017, 0.827465, 0.382683, 0, 0.923878, 0.552895, -0.098017, 0.827465, 0.55557, 0, 0.831468, 0.382683, 0, 0.923878, 0.37533, -0.19509, 0.906127, 0.544895, -0.195091, 0.815493, 0.552895, -0.098017, 0.827465, 0.37533, -0.19509, 0.906127, 0.552895, -0.098017, 0.827465, 0.38084, -0.098017, 0.91943, 0.366205, -0.290285, 0.884097, 0.531647, -0.290285, 0.795666, 0.37533, -0.19509, 0.906127, 0.531647, -0.290285, 0.795666, 0.544895, -0.195091, 0.815493, 0.37533, -0.19509, 0.906127, 0.353553, -0.382684, 0.853553, 0.51328, -0.382684, 0.768177, 0.531647, -0.290285, 0.795666, 0.353553, -0.382684, 0.853553, 0.531647, -0.290285, 0.795666, 0.366205, -0.290285, 0.884097, 0.337496, -0.471397, 0.814788, 0.489969, -0.471397, 0.73329, 0.353553, -0.382684, 0.853553, 0.489969, -0.471397, 0.73329, 0.51328, -0.382684, 0.768177, 0.353553, -0.382684, 0.853553, 0.31819, -0.555571, 0.768177, 0.46194, -0.555571, 0.691341, 0.489969, -0.471397, 0.73329, 0.31819, -0.555571, 0.768177, 0.489969, -0.471397, 0.73329, 0.337496, -0.471397, 0.814788, 0.295818, -0.634394, 0.714168, 0.429461, -0.634394, 0.642734, 0.46194, -0.555571, 0.691341, 0.295818, -0.634394, 0.714168, 0.46194, -0.555571, 0.691341, 0.31819, -0.555571, 0.768177, 0.270598, -0.707107, 0.653281, 0.392847, -0.707107, 0.587937, 0.295818, -0.634394, 0.714168, 0.392847, -0.707107, 0.587937, 0.429461, -0.634394, 0.642734, 0.295818, -0.634394, 0.714168, 0.242772, -0.773011, 0.586102, 0.35245, -0.773011, 0.527478, 0.392847, -0.707107, 0.587937, 0.242772, -0.773011, 0.586102, 0.392847, -0.707107, 0.587937, 0.270598, -0.707107, 0.653281, 0.212607, -0.83147, 0.513279, 0.308658, -0.83147, 0.461939, 0.35245, -0.773011, 0.527478, 0.212607, -0.83147, 0.513279, 0.35245, -0.773011, 0.527478, 0.242772, -0.773011, 0.586102, 0.180395, -0.881922, 0.435513, 0.261894, -0.881922, 0.391951, 0.308658, -0.83147, 0.461939, 0.180395, -0.881922, 0.435513, 0.308658, -0.83147, 0.461939, 0.212607, -0.83147, 0.513279, 0.146446, -0.92388, 0.353553, 0.212607, -0.92388, 0.318189, 0.261894, -0.881922, 0.391951, 0.146446, -0.92388, 0.353553, 0.261894, -0.881922, 0.391951, 0.180395, -0.881922, 0.435513, 0.111087, -0.956941, 0.268187, 0.161273, -0.956941, 0.241362, 0.212607, -0.92388, 0.318189, 0.111087, -0.956941, 0.268187, 0.212607, -0.92388, 0.318189, 0.146446, -0.92388, 0.353553, 0.074658, -0.980785, 0.180239, 0.108386, -0.980785, 0.162211, 0.161273, -0.956941, 0.241362, 0.074658, -0.980785, 0.180239, 0.161273, -0.956941, 0.241362, 0.111087, -0.956941, 0.268187, 0.037509, -0.995185, 0.090555, 0.054455, -0.995185, 0.081498, 0.108386, -0.980785, 0.162211, 0.037509, -0.995185, 0.090555, 0.108386, -0.980785, 0.162211, 0.074658, -0.980785, 0.180239, 0.019122, -0.995185, 0.096133, 0.037509, -0.995185, 0.090555, 0.074658, -0.980785, 0.180239, 0.019122, -0.995185, 0.096133, 0.074658, -0.980785, 0.180239, 0.03806, -0.980785, 0.191341, 0.03806, -0.980785, 0.191341, 0.074658, -0.980785, 0.180239, 0.111087, -0.956941, 0.268187, 0.03806, -0.980785, 0.191341, 0.111087, -0.956941, 0.268187, 0.056632, -0.956941, 0.284706, 0.056632, -0.956941, 0.284706, 0.111087, -0.956941, 0.268187, 0.146446, -0.92388, 0.353553, 0.056632, -0.956941, 0.284706, 0.146446, -0.92388, 0.353553, 0.074658, -0.92388, 0.375329, 0.074658, -0.92388, 0.375329, 0.146446, -0.92388, 0.353553, 0.180395, -0.881922, 0.435513, 0.074658, -0.92388, 0.375329, 0.180395, -0.881922, 0.435513, 0.091965, -0.881922, 0.462338, 0.091965, -0.881922, 0.462338, 0.180395, -0.881922, 0.435513, 0.212607, -0.83147, 0.513279, 0.091965, -0.881922, 0.462338, 0.212607, -0.83147, 0.513279, 0.108386, -0.83147, 0.544894, 0.108386, -0.83147, 0.544894, 0.212607, -0.83147, 0.513279, 0.123764, -0.773011, 0.622203, 0.212607, -0.83147, 0.513279, 0.242772, -0.773011, 0.586102, 0.123764, -0.773011, 0.622203, 0.123764, -0.773011, 0.622203, 0.242772, -0.773011, 0.586102, 0.270598, -0.707107, 0.653281, 0.123764, -0.773011, 0.622203, 0.270598, -0.707107, 0.653281, 0.13795, -0.707107, 0.693519, 0.13795, -0.707107, 0.693519, 0.270598, -0.707107, 0.653281, 0.150807, -0.634394, 0.758157, 0.270598, -0.707107, 0.653281, 0.295818, -0.634394, 0.714168, 0.150807, -0.634394, 0.758157, 0.150807, -0.634394, 0.758157, 0.295818, -0.634394, 0.714168, 0.31819, -0.555571, 0.768177, 0.150807, -0.634394, 0.758157, 0.31819, -0.555571, 0.768177, 0.162212, -0.555571, 0.815493, 0.162212, -0.555571, 0.815493, 0.31819, -0.555571, 0.768177, 0.337496, -0.471397, 0.814788, 0.162212, -0.555571, 0.815493, 0.337496, -0.471397, 0.814788, 0.172054, -0.471397, 0.864975, 0.172054, -0.471397, 0.864975, 0.337496, -0.471397, 0.814788, 0.353553, -0.382684, 0.853553, 0.172054, -0.471397, 0.864975, 0.353553, -0.382684, 0.853553, 0.18024, -0.382684, 0.906127, 0.18024, -0.382684, 0.906127, 0.353553, -0.382684, 0.853553, 0.366205, -0.290285, 0.884097, 0.18024, -0.382684, 0.906127, 0.366205, -0.290285, 0.884097, 0.18669, -0.290285, 0.938552, 0.18669, -0.290285, 0.938552, 0.366205, -0.290285, 0.884097, 0.191342, -0.19509, 0.961939, 0.366205, -0.290285, 0.884097, 0.37533, -0.19509, 0.906127, 0.191342, -0.19509, 0.961939, 0.191342, -0.19509, 0.961939, 0.37533, -0.19509, 0.906127, 0.38084, -0.098017, 0.91943, 0.191342, -0.19509, 0.961939, 0.38084, -0.098017, 0.91943, 0.194151, -0.098017, 0.976062, 0.194151, -0.098017, 0.976062, 0.38084, -0.098017, 0.91943, 0.195091, 0, 0.980784, 0.38084, -0.098017, 0.91943, 0.382683, 0, 0.923878, 0.195091, 0, 0.980784, 0.195091, 0, 0.980784, 0.382683, 0, 0.923878, 0.38084, 0.098017, 0.91943, 0.195091, 0, 0.980784, 0.38084, 0.098017, 0.91943, 0.194151, 0.098017, 0.976062, 0.194151, 0.098017, 0.976062, 0.38084, 0.098017, 0.91943, 0.191342, 0.19509, 0.961939, 0.38084, 0.098017, 0.91943, 0.37533, 0.19509, 0.906127, 0.191342, 0.19509, 0.961939, 0.191342, 0.19509, 0.961939, 0.37533, 0.19509, 0.906127, 0.366205, 0.290285, 0.884097, 0.191342, 0.19509, 0.961939, 0.366205, 0.290285, 0.884097, 0.18669, 0.290285, 0.938552, 0.18669, 0.290285, 0.938552, 0.366205, 0.290285, 0.884097, 0.353553, 0.382683, 0.853553, 0.18669, 0.290285, 0.938552, 0.353553, 0.382683, 0.853553, 0.18024, 0.382683, 0.906127, 0.18024, 0.382683, 0.906127, 0.353553, 0.382683, 0.853553, 0.172054, 0.471397, 0.864975, 0.353553, 0.382683, 0.853553, 0.337496, 0.471397, 0.814788, 0.172054, 0.471397, 0.864975, 0.172054, 0.471397, 0.864975, 0.337496, 0.471397, 0.814788, 0.162212, 0.55557, 0.815493, 0.337496, 0.471397, 0.814788, 0.31819, 0.55557, 0.768177, 0.162212, 0.55557, 0.815493, 0.162212, 0.55557, 0.815493, 0.31819, 0.55557, 0.768177, 0.295818, 0.634393, 0.714168, 0.162212, 0.55557, 0.815493, 0.295818, 0.634393, 0.714168, 0.150807, 0.634393, 0.758157, 0.150807, 0.634393, 0.758157, 0.295818, 0.634393, 0.714168, 0.270598, 0.707107, 0.653281, 0.150807, 0.634393, 0.758157, 0.270598, 0.707107, 0.653281, 0.13795, 0.707107, 0.69352, 0.13795, 0.707107, 0.69352, 0.270598, 0.707107, 0.653281, 0.242772, 0.77301, 0.586102, 0.13795, 0.707107, 0.69352, 0.242772, 0.77301, 0.586102, 0.123764, 0.77301, 0.622203, 0.123764, 0.77301, 0.622203, 0.242772, 0.77301, 0.586102, 0.108386, 0.83147, 0.544895, 0.242772, 0.77301, 0.586102, 0.212607, 0.83147, 0.513279, 0.108386, 0.83147, 0.544895, 0.108386, 0.83147, 0.544895, 0.212607, 0.83147, 0.513279, 0.180396, 0.881921, 0.435513, 0.108386, 0.83147, 0.544895, 0.180396, 0.881921, 0.435513, 0.091965, 0.881921, 0.462339, 0.091965, 0.881921, 0.462339, 0.180396, 0.881921, 0.435513, 0.146447, 0.92388, 0.353553, 0.091965, 0.881921, 0.462339, 0.146447, 0.92388, 0.353553, 0.074658, 0.92388, 0.37533, 0.074658, 0.92388, 0.37533, 0.146447, 0.92388, 0.353553, 0.111087, 0.95694, 0.268188, 0.074658, 0.92388, 0.37533, 0.111087, 0.95694, 0.268188, 0.056632, 0.95694, 0.284707, 0.056632, 0.95694, 0.284707, 0.111087, 0.95694, 0.268188, 0.074658, 0.980785, 0.18024, 0.056632, 0.95694, 0.284707, 0.074658, 0.980785, 0.18024, 0.03806, 0.980785, 0.191341, 0.03806, 0.980785, 0.191341, 0.074658, 0.980785, 0.18024, 0.03751, 0.995185, 0.090556, 0.03806, 0.980785, 0.191341, 0.03751, 0.995185, 0.090556, 0.019122, 0.995185, 0.096134, 0, 0.980785, 0.19509, 0.03806, 0.980785, 0.191341, 0.019122, 0.995185, 0.096134, 0, 0.980785, 0.19509, 0.019122, 0.995185, 0.096134, 0, 0.995185, 0.098017, 0, 0.95694, 0.290284, 0.056632, 0.95694, 0.284707, 0.03806, 0.980785, 0.191341, 0, 0.95694, 0.290284, 0.03806, 0.980785, 0.191341, 0, 0.980785, 0.19509, 0, 0.92388, 0.382683, 0.074658, 0.92388, 0.37533, 0.056632, 0.95694, 0.284707, 0, 0.92388, 0.382683, 0.056632, 0.95694, 0.284707, 0, 0.95694, 0.290284, 0, 0.881921, 0.471396, 0.091965, 0.881921, 0.462339, 0.074658, 0.92388, 0.37533, 0, 0.881921, 0.471396, 0.074658, 0.92388, 0.37533, 0, 0.92388, 0.382683, 0, 0.83147, 0.55557, 0.108386, 0.83147, 0.544895, 0.091965, 0.881921, 0.462339, 0, 0.83147, 0.55557, 0.091965, 0.881921, 0.462339, 0, 0.881921, 0.471396, 0, 0.77301, 0.634393, 0.123764, 0.77301, 0.622203, 0, 0.83147, 0.55557, 0.123764, 0.77301, 0.622203, 0.108386, 0.83147, 0.544895, 0, 0.83147, 0.55557, 0, 0.707107, 0.707107, 0.13795, 0.707107, 0.69352, 0.123764, 0.77301, 0.622203, 0, 0.707107, 0.707107, 0.123764, 0.77301, 0.622203, 0, 0.77301, 0.634393, 0, 0.634393, 0.77301, 0.150807, 0.634393, 0.758157, 0.13795, 0.707107, 0.69352, 0, 0.634393, 0.77301, 0.13795, 0.707107, 0.69352, 0, 0.707107, 0.707107, 0, 0.55557, 0.831469, 0.162212, 0.55557, 0.815493, 0.150807, 0.634393, 0.758157, 0, 0.55557, 0.831469, 0.150807, 0.634393, 0.758157, 0, 0.634393, 0.77301, 0, 0.471397, 0.881921, 0.172054, 0.471397, 0.864975, 0, 0.55557, 0.831469, 0.172054, 0.471397, 0.864975, 0.162212, 0.55557, 0.815493, 0, 0.55557, 0.831469, 0, 0.382683, 0.923879, 0.18024, 0.382683, 0.906127, 0, 0.471397, 0.881921, 0.18024, 0.382683, 0.906127, 0.172054, 0.471397, 0.864975, 0, 0.471397, 0.881921, 0, 0.290285, 0.95694, 0.18669, 0.290285, 0.938552, 0.18024, 0.382683, 0.906127, 0, 0.290285, 0.95694, 0.18024, 0.382683, 0.906127, 0, 0.382683, 0.923879, 0, 0.19509, 0.980785, 0.191342, 0.19509, 0.961939, 0.18669, 0.290285, 0.938552, 0, 0.19509, 0.980785, 0.18669, 0.290285, 0.938552, 0, 0.290285, 0.95694, 0, 0.098017, 0.995184, 0.194151, 0.098017, 0.976062, 0, 0.19509, 0.980785, 0.194151, 0.098017, 0.976062, 0.191342, 0.19509, 0.961939, 0, 0.19509, 0.980785, 0, 0, 0.999999, 0.195091, 0, 0.980784, 0.194151, 0.098017, 0.976062, 0, 0, 0.999999, 0.194151, 0.098017, 0.976062, 0, 0.098017, 0.995184, 0, -0.098017, 0.995184, 0.194151, -0.098017, 0.976062, 0, 0, 0.999999, 0.194151, -0.098017, 0.976062, 0.195091, 0, 0.980784, 0, 0, 0.999999, 0, -0.19509, 0.980785, 0.191342, -0.19509, 0.961939, 0.194151, -0.098017, 0.976062, 0, -0.19509, 0.980785, 0.194151, -0.098017, 0.976062, 0, -0.098017, 0.995184, 0, -0.290285, 0.95694, 0.18669, -0.290285, 0.938552, 0, -0.19509, 0.980785, 0.18669, -0.290285, 0.938552, 0.191342, -0.19509, 0.961939, 0, -0.19509, 0.980785, 0, -0.382684, 0.923879, 0.18024, -0.382684, 0.906127, 0.18669, -0.290285, 0.938552, 0, -0.382684, 0.923879, 0.18669, -0.290285, 0.938552, 0, -0.290285, 0.95694, 0, -0.471397, 0.881921, 0.172054, -0.471397, 0.864975, 0.18024, -0.382684, 0.906127, 0, -0.471397, 0.881921, 0.18024, -0.382684, 0.906127, 0, -0.382684, 0.923879, 0, -0.555571, 0.831469, 0.162212, -0.555571, 0.815493, 0.172054, -0.471397, 0.864975, 0, -0.555571, 0.831469, 0.172054, -0.471397, 0.864975, 0, -0.471397, 0.881921, 0, -0.634394, 0.77301, 0.150807, -0.634394, 0.758157, 0.162212, -0.555571, 0.815493, 0, -0.634394, 0.77301, 0.162212, -0.555571, 0.815493, 0, -0.555571, 0.831469, 0, -0.707107, 0.707106, 0.13795, -0.707107, 0.693519, 0, -0.634394, 0.77301, 0.13795, -0.707107, 0.693519, 0.150807, -0.634394, 0.758157, 0, -0.634394, 0.77301, 0, -0.773011, 0.634392, 0.123764, -0.773011, 0.622203, 0.13795, -0.707107, 0.693519, 0, -0.773011, 0.634392, 0.13795, -0.707107, 0.693519, 0, -0.707107, 0.707106, 0, -0.83147, 0.555569, 0.108386, -0.83147, 0.544894, 0.123764, -0.773011, 0.622203, 0, -0.83147, 0.555569, 0.123764, -0.773011, 0.622203, 0, -0.773011, 0.634392, 0, -0.881922, 0.471396, 0.091965, -0.881922, 0.462338, 0.108386, -0.83147, 0.544894, 0, -0.881922, 0.471396, 0.108386, -0.83147, 0.544894, 0, -0.83147, 0.555569, 0, -0.92388, 0.382683, 0.074658, -0.92388, 0.375329, 0.091965, -0.881922, 0.462338, 0, -0.92388, 0.382683, 0.091965, -0.881922, 0.462338, 0, -0.881922, 0.471396, 0, -0.956941, 0.290284, 0.056632, -0.956941, 0.284706, 0.074658, -0.92388, 0.375329, 0, -0.956941, 0.290284, 0.074658, -0.92388, 0.375329, 0, -0.92388, 0.382683, 0, -0.980785, 0.19509, 0.03806, -0.980785, 0.191341, 0.056632, -0.956941, 0.284706, 0, -0.980785, 0.19509, 0.056632, -0.956941, 0.284706, 0, -0.956941, 0.290284, 0, -0.995185, 0.098016, 0.019122, -0.995185, 0.096133, 0.03806, -0.980785, 0.191341, 0, -0.995185, 0.098016, 0.03806, -0.980785, 0.191341, 0, -0.980785, 0.19509, -0.019122, -0.995185, 0.096133, 0, -0.995185, 0.098016, 0, -0.980785, 0.19509, -0.019122, -0.995185, 0.096133, 0, -0.980785, 0.19509, -0.03806, -0.980785, 0.191341, -0.03806, -0.980785, 0.191341, 0, -0.980785, 0.19509, 0, -0.956941, 0.290284, -0.03806, -0.980785, 0.191341, 0, -0.956941, 0.290284, -0.056632, -0.956941, 0.284706, -0.056632, -0.956941, 0.284706, 0, -0.956941, 0.290284, 0, -0.92388, 0.382683, -0.056632, -0.956941, 0.284706, 0, -0.92388, 0.382683, -0.074658, -0.92388, 0.375329, -0.074658, -0.92388, 0.375329, 0, -0.92388, 0.382683, 0, -0.881922, 0.471396, -0.074658, -0.92388, 0.375329, 0, -0.881922, 0.471396, -0.091965, -0.881922, 0.462338, -0.091965, -0.881922, 0.462338, 0, -0.881922, 0.471396, 0, -0.83147, 0.555569, -0.091965, -0.881922, 0.462338, 0, -0.83147, 0.555569, -0.108386, -0.83147, 0.544894, -0.108386, -0.83147, 0.544894, 0, -0.83147, 0.555569, 0, -0.773011, 0.634392, -0.108386, -0.83147, 0.544894, 0, -0.773011, 0.634392, -0.123764, -0.773011, 0.622203, -0.123764, -0.773011, 0.622203, 0, -0.773011, 0.634392, 0, -0.707107, 0.707106, -0.123764, -0.773011, 0.622203, 0, -0.707107, 0.707106, -0.137949, -0.707107, 0.693519, -0.137949, -0.707107, 0.693519, 0, -0.707107, 0.707106, -0.150807, -0.634394, 0.758157, 0, -0.707107, 0.707106, 0, -0.634394, 0.77301, -0.150807, -0.634394, 0.758157, -0.150807, -0.634394, 0.758157, 0, -0.634394, 0.77301, 0, -0.555571, 0.831469, -0.150807, -0.634394, 0.758157, 0, -0.555571, 0.831469, -0.162211, -0.555571, 0.815493, -0.162211, -0.555571, 0.815493, 0, -0.555571, 0.831469, 0, -0.471397, 0.881921, -0.162211, -0.555571, 0.815493, 0, -0.471397, 0.881921, -0.172054, -0.471397, 0.864975, -0.172054, -0.471397, 0.864975, 0, -0.471397, 0.881921, 0, -0.382684, 0.923879, -0.172054, -0.471397, 0.864975, 0, -0.382684, 0.923879, -0.18024, -0.382684, 0.906127, -0.18024, -0.382684, 0.906127, 0, -0.382684, 0.923879, 0, -0.290285, 0.95694, -0.18024, -0.382684, 0.906127, 0, -0.290285, 0.95694, -0.18669, -0.290285, 0.938552, -0.18669, -0.290285, 0.938552, 0, -0.290285, 0.95694, -0.191341, -0.19509, 0.961939, 0, -0.290285, 0.95694, 0, -0.19509, 0.980785, -0.191341, -0.19509, 0.961939, -0.191341, -0.19509, 0.961939, 0, -0.19509, 0.980785, 0, -0.098017, 0.995184, -0.191341, -0.19509, 0.961939, 0, -0.098017, 0.995184, -0.194151, -0.098017, 0.976062, -0.194151, -0.098017, 0.976062, 0, -0.098017, 0.995184, -0.19509, 0, 0.980784, 0, -0.098017, 0.995184, 0, 0, 0.999999, -0.19509, 0, 0.980784, -0.19509, 0, 0.980784, 0, 0, 0.999999, 0, 0.098017, 0.995184, -0.19509, 0, 0.980784, 0, 0.098017, 0.995184, -0.194151, 0.098017, 0.976062, -0.194151, 0.098017, 0.976062, 0, 0.098017, 0.995184, -0.191341, 0.19509, 0.961939, 0, 0.098017, 0.995184, 0, 0.19509, 0.980785, -0.191341, 0.19509, 0.961939, -0.191341, 0.19509, 0.961939, 0, 0.19509, 0.980785, 0, 0.290285, 0.95694, -0.191341, 0.19509, 0.961939, 0, 0.290285, 0.95694, -0.18669, 0.290285, 0.938553, -0.18669, 0.290285, 0.938553, 0, 0.290285, 0.95694, 0, 0.382683, 0.923879, -0.18669, 0.290285, 0.938553, 0, 0.382683, 0.923879, -0.18024, 0.382683, 0.906127, -0.18024, 0.382683, 0.906127, 0, 0.382683, 0.923879, -0.172054, 0.471397, 0.864975, 0, 0.382683, 0.923879, 0, 0.471397, 0.881921, -0.172054, 0.471397, 0.864975, -0.172054, 0.471397, 0.864975, 0, 0.471397, 0.881921, -0.162211, 0.55557, 0.815493, 0, 0.471397, 0.881921, 0, 0.55557, 0.831469, -0.162211, 0.55557, 0.815493, -0.162211, 0.55557, 0.815493, 0, 0.55557, 0.831469, 0, 0.634393, 0.77301, -0.162211, 0.55557, 0.815493, 0, 0.634393, 0.77301, -0.150807, 0.634393, 0.758157, -0.150807, 0.634393, 0.758157, 0, 0.634393, 0.77301, 0, 0.707107, 0.707107, -0.150807, 0.634393, 0.758157, 0, 0.707107, 0.707107, -0.13795, 0.707107, 0.69352, -0.13795, 0.707107, 0.69352, 0, 0.707107, 0.707107, 0, 0.77301, 0.634393, -0.13795, 0.707107, 0.69352, 0, 0.77301, 0.634393, -0.123764, 0.77301, 0.622203, -0.123764, 0.77301, 0.622203, 0, 0.77301, 0.634393, -0.108386, 0.83147, 0.544895, 0, 0.77301, 0.634393, 0, 0.83147, 0.55557, -0.108386, 0.83147, 0.544895, -0.108386, 0.83147, 0.544895, 0, 0.83147, 0.55557, 0, 0.881921, 0.471396, -0.108386, 0.83147, 0.544895, 0, 0.881921, 0.471396, -0.091965, 0.881921, 0.462339, -0.091965, 0.881921, 0.462339, 0, 0.881921, 0.471396, 0, 0.92388, 0.382683, -0.091965, 0.881921, 0.462339, 0, 0.92388, 0.382683, -0.074658, 0.92388, 0.37533, -0.074658, 0.92388, 0.37533, 0, 0.92388, 0.382683, 0, 0.95694, 0.290284, -0.074658, 0.92388, 0.37533, 0, 0.95694, 0.290284, -0.056632, 0.95694, 0.284707, -0.056632, 0.95694, 0.284707, 0, 0.95694, 0.290284, 0, 0.980785, 0.19509, -0.056632, 0.95694, 0.284707, 0, 0.980785, 0.19509, -0.03806, 0.980785, 0.191342, -0.03806, 0.980785, 0.191342, 0, 0.980785, 0.19509, 0, 0.995185, 0.098017, -0.03806, 0.980785, 0.191342, 0, 0.995185, 0.098017, -0.019122, 0.995185, 0.096134, -0.074658, 0.980785, 0.18024, -0.03806, 0.980785, 0.191342, -0.019122, 0.995185, 0.096134, -0.074658, 0.980785, 0.18024, -0.019122, 0.995185, 0.096134, -0.03751, 0.995185, 0.090556, -0.111087, 0.95694, 0.268188, -0.056632, 0.95694, 0.284707, -0.03806, 0.980785, 0.191342, -0.111087, 0.95694, 0.268188, -0.03806, 0.980785, 0.191342, -0.074658, 0.980785, 0.18024, -0.146447, 0.92388, 0.353553, -0.074658, 0.92388, 0.37533, -0.056632, 0.95694, 0.284707, -0.146447, 0.92388, 0.353553, -0.056632, 0.95694, 0.284707, -0.111087, 0.95694, 0.268188, -0.180396, 0.881921, 0.435514, -0.091965, 0.881921, 0.462339, -0.074658, 0.92388, 0.37533, -0.180396, 0.881921, 0.435514, -0.074658, 0.92388, 0.37533, -0.146447, 0.92388, 0.353553, -0.212607, 0.83147, 0.51328, -0.108386, 0.83147, 0.544895, -0.091965, 0.881921, 0.462339, -0.212607, 0.83147, 0.51328, -0.091965, 0.881921, 0.462339, -0.180396, 0.881921, 0.435514, -0.242772, 0.77301, 0.586103, -0.123764, 0.77301, 0.622203, -0.212607, 0.83147, 0.51328, -0.123764, 0.77301, 0.622203, -0.108386, 0.83147, 0.544895, -0.212607, 0.83147, 0.51328, -0.270598, 0.707107, 0.653281, -0.13795, 0.707107, 0.69352, -0.123764, 0.77301, 0.622203, -0.270598, 0.707107, 0.653281, -0.123764, 0.77301, 0.622203, -0.242772, 0.77301, 0.586103, -0.295818, 0.634393, 0.714168, -0.150807, 0.634393, 0.758157, -0.13795, 0.707107, 0.69352, -0.295818, 0.634393, 0.714168, -0.13795, 0.707107, 0.69352, -0.270598, 0.707107, 0.653281, -0.318189, 0.55557, 0.768177, -0.162211, 0.55557, 0.815493, -0.150807, 0.634393, 0.758157, -0.318189, 0.55557, 0.768177, -0.150807, 0.634393, 0.758157, -0.295818, 0.634393, 0.714168, -0.337496, 0.471397, 0.814788, -0.172054, 0.471397, 0.864975, -0.318189, 0.55557, 0.768177, -0.172054, 0.471397, 0.864975, -0.162211, 0.55557, 0.815493, -0.318189, 0.55557, 0.768177, -0.353553, 0.382683, 0.853553, -0.18024, 0.382683, 0.906127, -0.337496, 0.471397, 0.814788, -0.18024, 0.382683, 0.906127, -0.172054, 0.471397, 0.864975, -0.337496, 0.471397, 0.814788, -0.366205, 0.290285, 0.884097, -0.18669, 0.290285, 0.938553, -0.18024, 0.382683, 0.906127, -0.366205, 0.290285, 0.884097, -0.18024, 0.382683, 0.906127, -0.353553, 0.382683, 0.853553, -0.37533, 0.19509, 0.906127, -0.191341, 0.19509, 0.961939, -0.18669, 0.290285, 0.938553, -0.37533, 0.19509, 0.906127, -0.18669, 0.290285, 0.938553, -0.366205, 0.290285, 0.884097, -0.38084, 0.098017, 0.91943, -0.194151, 0.098017, 0.976062, -0.37533, 0.19509, 0.906127, -0.194151, 0.098017, 0.976062, -0.191341, 0.19509, 0.961939, -0.37533, 0.19509, 0.906127, -0.382683, 0, 0.923879, -0.19509, 0, 0.980784, -0.194151, 0.098017, 0.976062, -0.382683, 0, 0.923879, -0.194151, 0.098017, 0.976062, -0.38084, 0.098017, 0.91943, -0.38084, -0.098017, 0.91943, -0.194151, -0.098017, 0.976062, -0.382683, 0, 0.923879, -0.194151, -0.098017, 0.976062, -0.19509, 0, 0.980784, -0.382683, 0, 0.923879, -0.37533, -0.19509, 0.906127, -0.191341, -0.19509, 0.961939, -0.194151, -0.098017, 0.976062, -0.37533, -0.19509, 0.906127, -0.194151, -0.098017, 0.976062, -0.38084, -0.098017, 0.91943, -0.366205, -0.290285, 0.884097, -0.18669, -0.290285, 0.938552, -0.37533, -0.19509, 0.906127, -0.18669, -0.290285, 0.938552, -0.191341, -0.19509, 0.961939, -0.37533, -0.19509, 0.906127, -0.353553, -0.382684, 0.853553, -0.18024, -0.382684, 0.906127, -0.18669, -0.290285, 0.938552, -0.353553, -0.382684, 0.853553, -0.18669, -0.290285, 0.938552, -0.366205, -0.290285, 0.884097, -0.337496, -0.471397, 0.814788, -0.172054, -0.471397, 0.864975, -0.18024, -0.382684, 0.906127, -0.337496, -0.471397, 0.814788, -0.18024, -0.382684, 0.906127, -0.353553, -0.382684, 0.853553, -0.318189, -0.555571, 0.768177, -0.162211, -0.555571, 0.815493, -0.172054, -0.471397, 0.864975, -0.318189, -0.555571, 0.768177, -0.172054, -0.471397, 0.864975, -0.337496, -0.471397, 0.814788, -0.295818, -0.634394, 0.714168, -0.150807, -0.634394, 0.758157, -0.162211, -0.555571, 0.815493, -0.295818, -0.634394, 0.714168, -0.162211, -0.555571, 0.815493, -0.318189, -0.555571, 0.768177, -0.270598, -0.707107, 0.653281, -0.137949, -0.707107, 0.693519, -0.295818, -0.634394, 0.714168, -0.137949, -0.707107, 0.693519, -0.150807, -0.634394, 0.758157, -0.295818, -0.634394, 0.714168, -0.242771, -0.773011, 0.586102, -0.123764, -0.773011, 0.622203, -0.137949, -0.707107, 0.693519, -0.242771, -0.773011, 0.586102, -0.137949, -0.707107, 0.693519, -0.270598, -0.707107, 0.653281, -0.212607, -0.83147, 0.513279, -0.108386, -0.83147, 0.544894, -0.123764, -0.773011, 0.622203, -0.212607, -0.83147, 0.513279, -0.123764, -0.773011, 0.622203, -0.242771, -0.773011, 0.586102, -0.180395, -0.881922, 0.435513, -0.091965, -0.881922, 0.462338, -0.108386, -0.83147, 0.544894, -0.180395, -0.881922, 0.435513, -0.108386, -0.83147, 0.544894, -0.212607, -0.83147, 0.513279, -0.146446, -0.92388, 0.353553, -0.074658, -0.92388, 0.375329, -0.091965, -0.881922, 0.462338, -0.146446, -0.92388, 0.353553, -0.091965, -0.881922, 0.462338, -0.180395, -0.881922, 0.435513, -0.111087, -0.956941, 0.268187, -0.056632, -0.956941, 0.284706, -0.074658, -0.92388, 0.375329, -0.111087, -0.956941, 0.268187, -0.074658, -0.92388, 0.375329, -0.146446, -0.92388, 0.353553, -0.074657, -0.980785, 0.180239, -0.03806, -0.980785, 0.191341, -0.056632, -0.956941, 0.284706, -0.074657, -0.980785, 0.180239, -0.056632, -0.956941, 0.284706, -0.111087, -0.956941, 0.268187, -0.037509, -0.995185, 0.090555, -0.019122, -0.995185, 0.096133, -0.03806, -0.980785, 0.191341, -0.037509, -0.995185, 0.090555, -0.03806, -0.980785, 0.191341, -0.074657, -0.980785, 0.180239, -0.054455, -0.995185, 0.081498, -0.037509, -0.995185, 0.090555, -0.074657, -0.980785, 0.180239, -0.054455, -0.995185, 0.081498, -0.074657, -0.980785, 0.180239, -0.108386, -0.980785, 0.162211, -0.108386, -0.980785, 0.162211, -0.074657, -0.980785, 0.180239, -0.111087, -0.956941, 0.268187, -0.108386, -0.980785, 0.162211, -0.111087, -0.956941, 0.268187, -0.161273, -0.956941, 0.241362, -0.161273, -0.956941, 0.241362, -0.111087, -0.956941, 0.268187, -0.146446, -0.92388, 0.353553, -0.161273, -0.956941, 0.241362, -0.146446, -0.92388, 0.353553, -0.212607, -0.92388, 0.318189, -0.212607, -0.92388, 0.318189, -0.146446, -0.92388, 0.353553, -0.180395, -0.881922, 0.435513, -0.212607, -0.92388, 0.318189, -0.180395, -0.881922, 0.435513, -0.261894, -0.881922, 0.391951, -0.261894, -0.881922, 0.391951, -0.180395, -0.881922, 0.435513, -0.212607, -0.83147, 0.513279, -0.261894, -0.881922, 0.391951, -0.212607, -0.83147, 0.513279, -0.308658, -0.83147, 0.461939, -0.308658, -0.83147, 0.461939, -0.212607, -0.83147, 0.513279, -0.242771, -0.773011, 0.586102, -0.308658, -0.83147, 0.461939, -0.242771, -0.773011, 0.586102, -0.352449, -0.773011, 0.527478, -0.352449, -0.773011, 0.527478, -0.242771, -0.773011, 0.586102, -0.270598, -0.707107, 0.653281, -0.352449, -0.773011, 0.527478, -0.270598, -0.707107, 0.653281, -0.392847, -0.707107, 0.587937, -0.392847, -0.707107, 0.587937, -0.270598, -0.707107, 0.653281, -0.429461, -0.634394, 0.642734, -0.270598, -0.707107, 0.653281, -0.295818, -0.634394, 0.714168, -0.429461, -0.634394, 0.642734, -0.429461, -0.634394, 0.642734, -0.295818, -0.634394, 0.714168, -0.318189, -0.555571, 0.768177, -0.429461, -0.634394, 0.642734, -0.318189, -0.555571, 0.768177, -0.461939, -0.555571, 0.691341, -0.461939, -0.555571, 0.691341, -0.318189, -0.555571, 0.768177, -0.337496, -0.471397, 0.814788, -0.461939, -0.555571, 0.691341, -0.337496, -0.471397, 0.814788, -0.489969, -0.471397, 0.73329, -0.489969, -0.471397, 0.73329, -0.337496, -0.471397, 0.814788, -0.353553, -0.382684, 0.853553, -0.489969, -0.471397, 0.73329, -0.353553, -0.382684, 0.853553, -0.51328, -0.382684, 0.768177, -0.51328, -0.382684, 0.768177, -0.353553, -0.382684, 0.853553, -0.366205, -0.290285, 0.884097, -0.51328, -0.382684, 0.768177, -0.366205, -0.290285, 0.884097, -0.531647, -0.290285, 0.795666, -0.531647, -0.290285, 0.795666, -0.366205, -0.290285, 0.884097, -0.544895, -0.195091, 0.815493, -0.366205, -0.290285, 0.884097, -0.37533, -0.19509, 0.906127, -0.544895, -0.195091, 0.815493, -0.544895, -0.195091, 0.815493, -0.37533, -0.19509, 0.906127, -0.38084, -0.098017, 0.91943, -0.544895, -0.195091, 0.815493, -0.38084, -0.098017, 0.91943, -0.552894, -0.098017, 0.827465, -0.552894, -0.098017, 0.827465, -0.38084, -0.098017, 0.91943, -0.555569, 0, 0.831469, -0.38084, -0.098017, 0.91943, -0.382683, 0, 0.923879, -0.555569, 0, 0.831469, -0.555569, 0, 0.831469, -0.382683, 0, 0.923879, -0.38084, 0.098017, 0.91943, -0.555569, 0, 0.831469, -0.38084, 0.098017, 0.91943, -0.552894, 0.098017, 0.827465, -0.552894, 0.098017, 0.827465, -0.38084, 0.098017, 0.91943, -0.544895, 0.19509, 0.815493, -0.38084, 0.098017, 0.91943, -0.37533, 0.19509, 0.906127, -0.544895, 0.19509, 0.815493, -0.544895, 0.19509, 0.815493, -0.37533, 0.19509, 0.906127, -0.366205, 0.290285, 0.884097, -0.544895, 0.19509, 0.815493, -0.366205, 0.290285, 0.884097, -0.531647, 0.290285, 0.795667, -0.531647, 0.290285, 0.795667, -0.366205, 0.290285, 0.884097, -0.353553, 0.382683, 0.853553, -0.531647, 0.290285, 0.795667, -0.353553, 0.382683, 0.853553, -0.51328, 0.382683, 0.768177, -0.51328, 0.382683, 0.768177, -0.353553, 0.382683, 0.853553, -0.489969, 0.471397, 0.73329, -0.353553, 0.382683, 0.853553, -0.337496, 0.471397, 0.814788, -0.489969, 0.471397, 0.73329, -0.489969, 0.471397, 0.73329, -0.337496, 0.471397, 0.814788, -0.461939, 0.55557, 0.691341, -0.337496, 0.471397, 0.814788, -0.318189, 0.55557, 0.768177, -0.461939, 0.55557, 0.691341, -0.461939, 0.55557, 0.691341, -0.318189, 0.55557, 0.768177, -0.295818, 0.634393, 0.714168, -0.461939, 0.55557, 0.691341, -0.295818, 0.634393, 0.714168, -0.429461, 0.634393, 0.642735, -0.429461, 0.634393, 0.642735, -0.295818, 0.634393, 0.714168, -0.270598, 0.707107, 0.653281, -0.429461, 0.634393, 0.642735, -0.270598, 0.707107, 0.653281, -0.392847, 0.707107, 0.587938, -0.392847, 0.707107, 0.587938, -0.270598, 0.707107, 0.653281, -0.242772, 0.77301, 0.586103, -0.392847, 0.707107, 0.587938, -0.242772, 0.77301, 0.586103, -0.35245, 0.77301, 0.527478, -0.35245, 0.77301, 0.527478, -0.242772, 0.77301, 0.586103, -0.308658, 0.83147, 0.461939, -0.242772, 0.77301, 0.586103, -0.212607, 0.83147, 0.51328, -0.308658, 0.83147, 0.461939, -0.308658, 0.83147, 0.461939, -0.212607, 0.83147, 0.51328, -0.180396, 0.881921, 0.435514, -0.308658, 0.83147, 0.461939, -0.180396, 0.881921, 0.435514, -0.261894, 0.881921, 0.391952, -0.261894, 0.881921, 0.391952, -0.180396, 0.881921, 0.435514, -0.146447, 0.92388, 0.353553, -0.261894, 0.881921, 0.391952, -0.146447, 0.92388, 0.353553, -0.212607, 0.92388, 0.31819, -0.212607, 0.92388, 0.31819, -0.146447, 0.92388, 0.353553, -0.111087, 0.95694, 0.268188, -0.212607, 0.92388, 0.31819, -0.111087, 0.95694, 0.268188, -0.161273, 0.95694, 0.241363, -0.161273, 0.95694, 0.241363, -0.111087, 0.95694, 0.268188, -0.074658, 0.980785, 0.18024, -0.161273, 0.95694, 0.241363, -0.074658, 0.980785, 0.18024, -0.108386, 0.980785, 0.162212, -0.108386, 0.980785, 0.162212, -0.074658, 0.980785, 0.18024, -0.03751, 0.995185, 0.090556, -0.108386, 0.980785, 0.162212, -0.03751, 0.995185, 0.090556, -0.054455, 0.995185, 0.081498, -0.13795, 0.980785, 0.13795, -0.108386, 0.980785, 0.162212, -0.054455, 0.995185, 0.081498, -0.13795, 0.980785, 0.13795, -0.054455, 0.995185, 0.081498, -0.069309, 0.995185, 0.069309, -0.205262, 0.95694, 0.205262, -0.161273, 0.95694, 0.241363, -0.108386, 0.980785, 0.162212, -0.205262, 0.95694, 0.205262, -0.108386, 0.980785, 0.162212, -0.13795, 0.980785, 0.13795, -0.270598, 0.92388, 0.270598, -0.212607, 0.92388, 0.31819, -0.161273, 0.95694, 0.241363, -0.270598, 0.92388, 0.270598, -0.161273, 0.95694, 0.241363, -0.205262, 0.95694, 0.205262, -0.333328, 0.881921, 0.333328, -0.261894, 0.881921, 0.391952, -0.212607, 0.92388, 0.31819, -0.333328, 0.881921, 0.333328, -0.212607, 0.92388, 0.31819, -0.270598, 0.92388, 0.270598, -0.392847, 0.83147, 0.392847, -0.308658, 0.83147, 0.461939, -0.261894, 0.881921, 0.391952, -0.392847, 0.83147, 0.392847, -0.261894, 0.881921, 0.391952, -0.333328, 0.881921, 0.333328, -0.448583, 0.77301, 0.448583, -0.35245, 0.77301, 0.527478, -0.392847, 0.83147, 0.392847, -0.35245, 0.77301, 0.527478, -0.308658, 0.83147, 0.461939, -0.392847, 0.83147, 0.392847, -0.5, 0.707107, 0.5, -0.392847, 0.707107, 0.587938, -0.35245, 0.77301, 0.527478, -0.5, 0.707107, 0.5, -0.35245, 0.77301, 0.527478, -0.448583, 0.77301, 0.448583, -0.546601, 0.634393, 0.546601, -0.429461, 0.634393, 0.642735, -0.392847, 0.707107, 0.587938, -0.546601, 0.634393, 0.546601, -0.392847, 0.707107, 0.587938, -0.5, 0.707107, 0.5, -0.587937, 0.55557, 0.587938, -0.461939, 0.55557, 0.691341, -0.429461, 0.634393, 0.642735, -0.587937, 0.55557, 0.587938, -0.429461, 0.634393, 0.642735, -0.546601, 0.634393, 0.546601, -0.623612, 0.471397, 0.623612, -0.489969, 0.471397, 0.73329, -0.587937, 0.55557, 0.587938, -0.489969, 0.471397, 0.73329, -0.461939, 0.55557, 0.691341, -0.587937, 0.55557, 0.587938, -0.653281, 0.382683, 0.653281, -0.51328, 0.382683, 0.768177, -0.623612, 0.471397, 0.623612, -0.51328, 0.382683, 0.768177, -0.489969, 0.471397, 0.73329, -0.623612, 0.471397, 0.623612, -0.676659, 0.290285, 0.676659, -0.531647, 0.290285, 0.795667, -0.51328, 0.382683, 0.768177, -0.676659, 0.290285, 0.676659, -0.51328, 0.382683, 0.768177, -0.653281, 0.382683, 0.653281, -0.69352, 0.19509, 0.69352, -0.544895, 0.19509, 0.815493, -0.531647, 0.290285, 0.795667, -0.69352, 0.19509, 0.69352, -0.531647, 0.290285, 0.795667, -0.676659, 0.290285, 0.676659, -0.703701, 0.098017, 0.703701, -0.552894, 0.098017, 0.827465, -0.69352, 0.19509, 0.69352, -0.552894, 0.098017, 0.827465, -0.544895, 0.19509, 0.815493, -0.69352, 0.19509, 0.69352, -0.707106, 0, 0.707106, -0.555569, 0, 0.831469, -0.552894, 0.098017, 0.827465, -0.707106, 0, 0.707106, -0.552894, 0.098017, 0.827465, -0.703701, 0.098017, 0.703701, -0.703701, -0.098017, 0.703701, -0.552894, -0.098017, 0.827465, -0.707106, 0, 0.707106, -0.552894, -0.098017, 0.827465, -0.555569, 0, 0.831469, -0.707106, 0, 0.707106, -0.69352, -0.195091, 0.69352, -0.544895, -0.195091, 0.815493, -0.552894, -0.098017, 0.827465, -0.69352, -0.195091, 0.69352, -0.552894, -0.098017, 0.827465, -0.703701, -0.098017, 0.703701, -0.676659, -0.290285, 0.676659, -0.531647, -0.290285, 0.795666, -0.69352, -0.195091, 0.69352, -0.531647, -0.290285, 0.795666, -0.544895, -0.195091, 0.815493, -0.69352, -0.195091, 0.69352, -0.653281, -0.382684, 0.653281, -0.51328, -0.382684, 0.768177, -0.531647, -0.290285, 0.795666, -0.653281, -0.382684, 0.653281, -0.531647, -0.290285, 0.795666, -0.676659, -0.290285, 0.676659, -0.623612, -0.471397, 0.623612, -0.489969, -0.471397, 0.73329, -0.51328, -0.382684, 0.768177, -0.623612, -0.471397, 0.623612, -0.51328, -0.382684, 0.768177, -0.653281, -0.382684, 0.653281, -0.587937, -0.555571, 0.587937, -0.461939, -0.555571, 0.691341, -0.489969, -0.471397, 0.73329, -0.587937, -0.555571, 0.587937, -0.489969, -0.471397, 0.73329, -0.623612, -0.471397, 0.623612, -0.5466, -0.634394, 0.546601, -0.429461, -0.634394, 0.642734, -0.461939, -0.555571, 0.691341, -0.5466, -0.634394, 0.546601, -0.461939, -0.555571, 0.691341, -0.587937, -0.555571, 0.587937, -0.499999, -0.707107, 0.5, -0.392847, -0.707107, 0.587937, -0.429461, -0.634394, 0.642734, -0.499999, -0.707107, 0.5, -0.429461, -0.634394, 0.642734, -0.5466, -0.634394, 0.546601, -0.448583, -0.773011, 0.448583, -0.352449, -0.773011, 0.527478, -0.392847, -0.707107, 0.587937, -0.448583, -0.773011, 0.448583, -0.392847, -0.707107, 0.587937, -0.499999, -0.707107, 0.5, -0.392847, -0.83147, 0.392847, -0.308658, -0.83147, 0.461939, -0.352449, -0.773011, 0.527478, -0.392847, -0.83147, 0.392847, -0.352449, -0.773011, 0.527478, -0.448583, -0.773011, 0.448583, -0.333327, -0.881922, 0.333327, -0.261894, -0.881922, 0.391951, -0.308658, -0.83147, 0.461939, -0.333327, -0.881922, 0.333327, -0.308658, -0.83147, 0.461939, -0.392847, -0.83147, 0.392847, -0.270597, -0.92388, 0.270597, -0.212607, -0.92388, 0.318189, -0.261894, -0.881922, 0.391951, -0.270597, -0.92388, 0.270597, -0.261894, -0.881922, 0.391951, -0.333327, -0.881922, 0.333327, -0.205262, -0.956941, 0.205262, -0.161273, -0.956941, 0.241362, -0.212607, -0.92388, 0.318189, -0.205262, -0.956941, 0.205262, -0.212607, -0.92388, 0.318189, -0.270597, -0.92388, 0.270597, -0.137949, -0.980785, 0.137949, -0.108386, -0.980785, 0.162211, -0.161273, -0.956941, 0.241362, -0.137949, -0.980785, 0.137949, -0.161273, -0.956941, 0.241362, -0.205262, -0.956941, 0.205262, -0.069308, -0.995185, 0.069308, -0.054455, -0.995185, 0.081498, -0.108386, -0.980785, 0.162211, -0.069308, -0.995185, 0.069308, -0.108386, -0.980785, 0.162211, -0.137949, -0.980785, 0.137949, -0.081498, -0.995185, 0.054455, -0.069308, -0.995185, 0.069308, -0.137949, -0.980785, 0.137949, -0.081498, -0.995185, 0.054455, -0.137949, -0.980785, 0.137949, -0.162211, -0.980785, 0.108386, -0.162211, -0.980785, 0.108386, -0.137949, -0.980785, 0.137949, -0.205262, -0.956941, 0.205262, -0.162211, -0.980785, 0.108386, -0.205262, -0.956941, 0.205262, -0.241362, -0.956941, 0.161273, -0.241362, -0.956941, 0.161273, -0.205262, -0.956941, 0.205262, -0.270597, -0.92388, 0.270597, -0.241362, -0.956941, 0.161273, -0.270597, -0.92388, 0.270597, -0.318189, -0.92388, 0.212607, -0.318189, -0.92388, 0.212607, -0.270597, -0.92388, 0.270597, -0.333327, -0.881922, 0.333327, -0.318189, -0.92388, 0.212607, -0.333327, -0.881922, 0.333327, -0.391951, -0.881922, 0.261894, -0.391951, -0.881922, 0.261894, -0.333327, -0.881922, 0.333327, -0.392847, -0.83147, 0.392847, -0.391951, -0.881922, 0.261894, -0.392847, -0.83147, 0.392847, -0.461939, -0.83147, 0.308658, -0.461939, -0.83147, 0.308658, -0.392847, -0.83147, 0.392847, -0.448583, -0.773011, 0.448583, -0.461939, -0.83147, 0.308658, -0.448583, -0.773011, 0.448583, -0.527478, -0.773011, 0.35245, -0.527478, -0.773011, 0.35245, -0.448583, -0.773011, 0.448583, -0.499999, -0.707107, 0.5, -0.527478, -0.773011, 0.35245, -0.499999, -0.707107, 0.5, -0.587937, -0.707107, 0.392847, -0.587937, -0.707107, 0.392847, -0.499999, -0.707107, 0.5, -0.642734, -0.634394, 0.429461, -0.499999, -0.707107, 0.5, -0.5466, -0.634394, 0.546601, -0.642734, -0.634394, 0.429461, -0.642734, -0.634394, 0.429461, -0.5466, -0.634394, 0.546601, -0.587937, -0.555571, 0.587937, -0.642734, -0.634394, 0.429461, -0.587937, -0.555571, 0.587937, -0.691341, -0.555571, 0.46194, -0.691341, -0.555571, 0.46194, -0.587937, -0.555571, 0.587937, -0.623612, -0.471397, 0.623612, -0.691341, -0.555571, 0.46194, -0.623612, -0.471397, 0.623612, -0.73329, -0.471397, 0.489969, -0.73329, -0.471397, 0.489969, -0.623612, -0.471397, 0.623612, -0.653281, -0.382684, 0.653281, -0.73329, -0.471397, 0.489969, -0.653281, -0.382684, 0.653281, -0.768177, -0.382684, 0.51328, -0.768177, -0.382684, 0.51328, -0.653281, -0.382684, 0.653281, -0.676659, -0.290285, 0.676659, -0.768177, -0.382684, 0.51328, -0.676659, -0.290285, 0.676659, -0.795666, -0.290285, 0.531647, -0.795666, -0.290285, 0.531647, -0.676659, -0.290285, 0.676659, -0.815493, -0.195091, 0.544895, -0.676659, -0.290285, 0.676659, -0.69352, -0.195091, 0.69352, -0.815493, -0.195091, 0.544895, -0.815493, -0.195091, 0.544895, -0.69352, -0.195091, 0.69352, -0.703701, -0.098017, 0.703701, -0.815493, -0.195091, 0.544895, -0.703701, -0.098017, 0.703701, -0.827465, -0.098017, 0.552895, -0.827465, -0.098017, 0.552895, -0.703701, -0.098017, 0.703701, -0.831469, 0, 0.55557, -0.703701, -0.098017, 0.703701, -0.707106, 0, 0.707106, -0.831469, 0, 0.55557, -0.831469, 0, 0.55557, -0.707106, 0, 0.707106, -0.703701, 0.098017, 0.703701, -0.831469, 0, 0.55557, -0.703701, 0.098017, 0.703701, -0.827465, 0.098017, 0.552895, -0.827465, 0.098017, 0.552895, -0.703701, 0.098017, 0.703701, -0.815493, 0.19509, 0.544895, -0.703701, 0.098017, 0.703701, -0.69352, 0.19509, 0.69352, -0.815493, 0.19509, 0.544895, -0.815493, 0.19509, 0.544895, -0.69352, 0.19509, 0.69352, -0.676659, 0.290285, 0.676659, -0.815493, 0.19509, 0.544895, -0.676659, 0.290285, 0.676659, -0.795666, 0.290285, 0.531648, -0.795666, 0.290285, 0.531648, -0.676659, 0.290285, 0.676659, -0.653281, 0.382683, 0.653281, -0.795666, 0.290285, 0.531648, -0.653281, 0.382683, 0.653281, -0.768178, 0.382683, 0.51328, -0.768178, 0.382683, 0.51328, -0.653281, 0.382683, 0.653281, -0.73329, 0.471397, 0.489969, -0.653281, 0.382683, 0.653281, -0.623612, 0.471397, 0.623612, -0.73329, 0.471397, 0.489969, -0.73329, 0.471397, 0.489969, -0.623612, 0.471397, 0.623612, -0.691341, 0.55557, 0.46194, -0.623612, 0.471397, 0.623612, -0.587937, 0.55557, 0.587938, -0.691341, 0.55557, 0.46194, -0.691341, 0.55557, 0.46194, -0.587937, 0.55557, 0.587938, -0.546601, 0.634393, 0.546601, -0.691341, 0.55557, 0.46194, -0.546601, 0.634393, 0.546601, -0.642734, 0.634393, 0.429462, -0.642734, 0.634393, 0.429462, -0.546601, 0.634393, 0.546601, -0.5, 0.707107, 0.5, -0.642734, 0.634393, 0.429462, -0.5, 0.707107, 0.5, -0.587938, 0.707107, 0.392847, -0.587938, 0.707107, 0.392847, -0.5, 0.707107, 0.5, -0.448583, 0.77301, 0.448583, -0.587938, 0.707107, 0.392847, -0.448583, 0.77301, 0.448583, -0.527478, 0.77301, 0.35245, -0.527478, 0.77301, 0.35245, -0.448583, 0.77301, 0.448583, -0.461939, 0.83147, 0.308658, -0.448583, 0.77301, 0.448583, -0.392847, 0.83147, 0.392847, -0.461939, 0.83147, 0.308658, -0.461939, 0.83147, 0.308658, -0.392847, 0.83147, 0.392847, -0.333328, 0.881921, 0.333328, -0.461939, 0.83147, 0.308658, -0.333328, 0.881921, 0.333328, -0.391952, 0.881921, 0.261894, -0.391952, 0.881921, 0.261894, -0.333328, 0.881921, 0.333328, -0.270598, 0.92388, 0.270598, -0.391952, 0.881921, 0.261894, -0.270598, 0.92388, 0.270598, -0.31819, 0.92388, 0.212607, -0.31819, 0.92388, 0.212607, -0.270598, 0.92388, 0.270598, -0.205262, 0.95694, 0.205262, -0.31819, 0.92388, 0.212607, -0.205262, 0.95694, 0.205262, -0.241363, 0.95694, 0.161273, -0.241363, 0.95694, 0.161273, -0.205262, 0.95694, 0.205262, -0.13795, 0.980785, 0.13795, -0.241363, 0.95694, 0.161273, -0.13795, 0.980785, 0.13795, -0.162212, 0.980785, 0.108386, -0.162212, 0.980785, 0.108386, -0.13795, 0.980785, 0.13795, -0.069309, 0.995185, 0.069309, -0.162212, 0.980785, 0.108386, -0.069309, 0.995185, 0.069309, -0.081498, 0.995185, 0.054455, -0.18024, 0.980785, 0.074658, -0.162212, 0.980785, 0.108386, -0.081498, 0.995185, 0.054455, -0.18024, 0.980785, 0.074658, -0.081498, 0.995185, 0.054455, -0.090556, 0.995185, 0.037509, -0.268188, 0.95694, 0.111087, -0.241363, 0.95694, 0.161273, -0.162212, 0.980785, 0.108386, -0.268188, 0.95694, 0.111087, -0.162212, 0.980785, 0.108386, -0.18024, 0.980785, 0.074658, -0.353553, 0.92388, 0.146447, -0.31819, 0.92388, 0.212607, -0.241363, 0.95694, 0.161273, -0.353553, 0.92388, 0.146447, -0.241363, 0.95694, 0.161273, -0.268188, 0.95694, 0.111087, -0.435514, 0.881921, 0.180396, -0.391952, 0.881921, 0.261894, -0.31819, 0.92388, 0.212607, -0.435514, 0.881921, 0.180396, -0.31819, 0.92388, 0.212607, -0.353553, 0.92388, 0.146447, -0.51328, 0.83147, 0.212607, -0.461939, 0.83147, 0.308658, -0.391952, 0.881921, 0.261894, -0.51328, 0.83147, 0.212607, -0.391952, 0.881921, 0.261894, -0.435514, 0.881921, 0.180396, -0.586103, 0.77301, 0.242772, -0.527478, 0.77301, 0.35245, -0.51328, 0.83147, 0.212607, -0.527478, 0.77301, 0.35245, -0.461939, 0.83147, 0.308658, -0.51328, 0.83147, 0.212607, -0.653281, 0.707107, 0.270598, -0.587938, 0.707107, 0.392847, -0.527478, 0.77301, 0.35245, -0.653281, 0.707107, 0.270598, -0.527478, 0.77301, 0.35245, -0.586103, 0.77301, 0.242772, -0.714168, 0.634393, 0.295818, -0.642734, 0.634393, 0.429462, -0.587938, 0.707107, 0.392847, -0.714168, 0.634393, 0.295818, -0.587938, 0.707107, 0.392847, -0.653281, 0.707107, 0.270598, -0.768177, 0.55557, 0.31819, -0.691341, 0.55557, 0.46194, -0.642734, 0.634393, 0.429462, -0.768177, 0.55557, 0.31819, -0.642734, 0.634393, 0.429462, -0.714168, 0.634393, 0.295818, -0.814789, 0.471397, 0.337496, -0.73329, 0.471397, 0.489969, -0.768177, 0.55557, 0.31819, -0.73329, 0.471397, 0.489969, -0.691341, 0.55557, 0.46194, -0.768177, 0.55557, 0.31819, -0.853553, 0.382683, 0.353553, -0.768178, 0.382683, 0.51328, -0.814789, 0.471397, 0.337496, -0.768178, 0.382683, 0.51328, -0.73329, 0.471397, 0.489969, -0.814789, 0.471397, 0.337496, -0.884097, 0.290285, 0.366205, -0.795666, 0.290285, 0.531648, -0.768178, 0.382683, 0.51328, -0.884097, 0.290285, 0.366205, -0.768178, 0.382683, 0.51328, -0.853553, 0.382683, 0.353553, -0.906127, 0.19509, 0.37533, -0.815493, 0.19509, 0.544895, -0.795666, 0.290285, 0.531648, -0.906127, 0.19509, 0.37533, -0.795666, 0.290285, 0.531648, -0.884097, 0.290285, 0.366205, -0.91943, 0.098017, 0.380841, -0.827465, 0.098017, 0.552895, -0.815493, 0.19509, 0.544895, -0.91943, 0.098017, 0.380841, -0.815493, 0.19509, 0.544895, -0.906127, 0.19509, 0.37533, -0.923879, 0, 0.382683, -0.831469, 0, 0.55557, -0.827465, 0.098017, 0.552895, -0.923879, 0, 0.382683, -0.827465, 0.098017, 0.552895, -0.91943, 0.098017, 0.380841, -0.91943, -0.098017, 0.380841, -0.827465, -0.098017, 0.552895, -0.923879, 0, 0.382683, -0.827465, -0.098017, 0.552895, -0.831469, 0, 0.55557, -0.923879, 0, 0.382683, -0.906127, -0.195091, 0.37533, -0.815493, -0.195091, 0.544895, -0.827465, -0.098017, 0.552895, -0.906127, -0.195091, 0.37533, -0.827465, -0.098017, 0.552895, -0.91943, -0.098017, 0.380841, -0.884097, -0.290285, 0.366205, -0.795666, -0.290285, 0.531647, -0.906127, -0.195091, 0.37533, -0.795666, -0.290285, 0.531647, -0.815493, -0.195091, 0.544895, -0.906127, -0.195091, 0.37533, -0.853553, -0.382684, 0.353553, -0.768177, -0.382684, 0.51328, -0.795666, -0.290285, 0.531647, -0.853553, -0.382684, 0.353553, -0.795666, -0.290285, 0.531647, -0.884097, -0.290285, 0.366205, -0.814788, -0.471397, 0.337497, -0.73329, -0.471397, 0.489969, -0.768177, -0.382684, 0.51328, -0.814788, -0.471397, 0.337497, -0.768177, -0.382684, 0.51328, -0.853553, -0.382684, 0.353553, -0.768177, -0.555571, 0.31819, -0.691341, -0.555571, 0.46194, -0.73329, -0.471397, 0.489969, -0.768177, -0.555571, 0.31819, -0.73329, -0.471397, 0.489969, -0.814788, -0.471397, 0.337497, -0.714168, -0.634394, 0.295818, -0.642734, -0.634394, 0.429461, -0.691341, -0.555571, 0.46194, -0.714168, -0.634394, 0.295818, -0.691341, -0.555571, 0.46194, -0.768177, -0.555571, 0.31819, -0.653281, -0.707107, 0.270598, -0.587937, -0.707107, 0.392847, -0.714168, -0.634394, 0.295818, -0.587937, -0.707107, 0.392847, -0.642734, -0.634394, 0.429461, -0.714168, -0.634394, 0.295818, -0.586102, -0.773011, 0.242772, -0.527478, -0.773011, 0.35245, -0.587937, -0.707107, 0.392847, -0.586102, -0.773011, 0.242772, -0.587937, -0.707107, 0.392847, -0.653281, -0.707107, 0.270598, -0.513279, -0.83147, 0.212607, -0.461939, -0.83147, 0.308658, -0.527478, -0.773011, 0.35245, -0.513279, -0.83147, 0.212607, -0.527478, -0.773011, 0.35245, -0.586102, -0.773011, 0.242772, -0.435513, -0.881922, 0.180396, -0.391951, -0.881922, 0.261894, -0.461939, -0.83147, 0.308658, -0.435513, -0.881922, 0.180396, -0.461939, -0.83147, 0.308658, -0.513279, -0.83147, 0.212607, -0.353553, -0.92388, 0.146446, -0.318189, -0.92388, 0.212607, -0.391951, -0.881922, 0.261894, -0.353553, -0.92388, 0.146446, -0.391951, -0.881922, 0.261894, -0.435513, -0.881922, 0.180396, -0.268187, -0.956941, 0.111087, -0.241362, -0.956941, 0.161273, -0.318189, -0.92388, 0.212607, -0.268187, -0.956941, 0.111087, -0.318189, -0.92388, 0.212607, -0.353553, -0.92388, 0.146446, -0.180239, -0.980785, 0.074658, -0.162211, -0.980785, 0.108386, -0.241362, -0.956941, 0.161273, -0.180239, -0.980785, 0.074658, -0.241362, -0.956941, 0.161273, -0.268187, -0.956941, 0.111087, -0.090555, -0.995185, 0.037509, -0.081498, -0.995185, 0.054455, -0.162211, -0.980785, 0.108386, -0.090555, -0.995185, 0.037509, -0.162211, -0.980785, 0.108386, -0.180239, -0.980785, 0.074658, -0.096133, -0.995185, 0.019122, -0.090555, -0.995185, 0.037509, -0.180239, -0.980785, 0.074658, -0.096133, -0.995185, 0.019122, -0.180239, -0.980785, 0.074658, -0.191341, -0.980785, 0.03806, -0.191341, -0.980785, 0.03806, -0.180239, -0.980785, 0.074658, -0.268187, -0.956941, 0.111087, -0.191341, -0.980785, 0.03806, -0.268187, -0.956941, 0.111087, -0.284706, -0.956941, 0.056632, -0.284706, -0.956941, 0.056632, -0.268187, -0.956941, 0.111087, -0.353553, -0.92388, 0.146446, -0.284706, -0.956941, 0.056632, -0.353553, -0.92388, 0.146446, -0.375329, -0.92388, 0.074658, -0.375329, -0.92388, 0.074658, -0.353553, -0.92388, 0.146446, -0.435513, -0.881922, 0.180396, -0.375329, -0.92388, 0.074658, -0.435513, -0.881922, 0.180396, -0.462338, -0.881922, 0.091965, -0.462338, -0.881922, 0.091965, -0.435513, -0.881922, 0.180396, -0.513279, -0.83147, 0.212607, -0.462338, -0.881922, 0.091965, -0.513279, -0.83147, 0.212607, -0.544894, -0.83147, 0.108386, -0.544894, -0.83147, 0.108386, -0.513279, -0.83147, 0.212607, -0.586102, -0.773011, 0.242772, -0.544894, -0.83147, 0.108386, -0.586102, -0.773011, 0.242772, -0.622203, -0.773011, 0.123764, -0.622203, -0.773011, 0.123764, -0.586102, -0.773011, 0.242772, -0.653281, -0.707107, 0.270598, -0.622203, -0.773011, 0.123764, -0.653281, -0.707107, 0.270598, -0.693519, -0.707107, 0.13795, -0.693519, -0.707107, 0.13795, -0.653281, -0.707107, 0.270598, -0.758157, -0.634394, 0.150807, -0.653281, -0.707107, 0.270598, -0.714168, -0.634394, 0.295818, -0.758157, -0.634394, 0.150807, -0.758157, -0.634394, 0.150807, -0.714168, -0.634394, 0.295818, -0.768177, -0.555571, 0.31819, -0.758157, -0.634394, 0.150807, -0.768177, -0.555571, 0.31819, -0.815493, -0.555571, 0.162212, -0.815493, -0.555571, 0.162212, -0.768177, -0.555571, 0.31819, -0.814788, -0.471397, 0.337497, -0.815493, -0.555571, 0.162212, -0.814788, -0.471397, 0.337497, -0.864975, -0.471397, 0.172054, -0.864975, -0.471397, 0.172054, -0.814788, -0.471397, 0.337497, -0.853553, -0.382684, 0.353553, -0.864975, -0.471397, 0.172054, -0.853553, -0.382684, 0.353553, -0.906127, -0.382684, 0.18024, -0.906127, -0.382684, 0.18024, -0.853553, -0.382684, 0.353553, -0.884097, -0.290285, 0.366205, -0.906127, -0.382684, 0.18024, -0.884097, -0.290285, 0.366205, -0.938553, -0.290285, 0.18669, -0.938553, -0.290285, 0.18669, -0.884097, -0.290285, 0.366205, -0.961939, -0.195091, 0.191342, -0.884097, -0.290285, 0.366205, -0.906127, -0.195091, 0.37533, -0.961939, -0.195091, 0.191342, -0.961939, -0.195091, 0.191342, -0.906127, -0.195091, 0.37533, -0.91943, -0.098017, 0.380841, -0.961939, -0.195091, 0.191342, -0.91943, -0.098017, 0.380841, -0.976062, -0.098017, 0.194151, -0.976062, -0.098017, 0.194151, -0.91943, -0.098017, 0.380841, -0.980785, 0, 0.195091, -0.91943, -0.098017, 0.380841, -0.923879, 0, 0.382683, -0.980785, 0, 0.195091, -0.980785, 0, 0.195091, -0.923879, 0, 0.382683, -0.91943, 0.098017, 0.380841, -0.980785, 0, 0.195091, -0.91943, 0.098017, 0.380841, -0.976062, 0.098017, 0.194151, -0.976062, 0.098017, 0.194151, -0.91943, 0.098017, 0.380841, -0.906127, 0.19509, 0.37533, -0.976062, 0.098017, 0.194151, -0.906127, 0.19509, 0.37533, -0.961939, 0.19509, 0.191342, -0.961939, 0.19509, 0.191342, -0.906127, 0.19509, 0.37533, -0.884097, 0.290285, 0.366205, -0.961939, 0.19509, 0.191342, -0.884097, 0.290285, 0.366205, -0.938553, 0.290285, 0.18669, -0.938553, 0.290285, 0.18669, -0.884097, 0.290285, 0.366205, -0.853553, 0.382683, 0.353553, -0.938553, 0.290285, 0.18669, -0.853553, 0.382683, 0.353553, -0.906127, 0.382683, 0.18024, -0.906127, 0.382683, 0.18024, -0.853553, 0.382683, 0.353553, -0.864975, 0.471397, 0.172054, -0.853553, 0.382683, 0.353553, -0.814789, 0.471397, 0.337496, -0.864975, 0.471397, 0.172054, -0.864975, 0.471397, 0.172054, -0.814789, 0.471397, 0.337496, -0.815493, 0.55557, 0.162212, -0.814789, 0.471397, 0.337496, -0.768177, 0.55557, 0.31819, -0.815493, 0.55557, 0.162212, -0.815493, 0.55557, 0.162212, -0.768177, 0.55557, 0.31819, -0.714168, 0.634393, 0.295818, -0.815493, 0.55557, 0.162212, -0.714168, 0.634393, 0.295818, -0.758157, 0.634393, 0.150807, -0.758157, 0.634393, 0.150807, -0.714168, 0.634393, 0.295818, -0.653281, 0.707107, 0.270598, -0.758157, 0.634393, 0.150807, -0.653281, 0.707107, 0.270598, -0.69352, 0.707107, 0.13795, -0.69352, 0.707107, 0.13795, -0.653281, 0.707107, 0.270598, -0.586103, 0.77301, 0.242772, -0.69352, 0.707107, 0.13795, -0.586103, 0.77301, 0.242772, -0.622203, 0.77301, 0.123764, -0.622203, 0.77301, 0.123764, -0.586103, 0.77301, 0.242772, -0.544895, 0.83147, 0.108386, -0.586103, 0.77301, 0.242772, -0.51328, 0.83147, 0.212607, -0.544895, 0.83147, 0.108386, -0.544895, 0.83147, 0.108386, -0.51328, 0.83147, 0.212607, -0.435514, 0.881921, 0.180396, -0.544895, 0.83147, 0.108386, -0.435514, 0.881921, 0.180396, -0.462339, 0.881921, 0.091965, -0.462339, 0.881921, 0.091965, -0.435514, 0.881921, 0.180396, -0.353553, 0.92388, 0.146447, -0.462339, 0.881921, 0.091965, -0.353553, 0.92388, 0.146447, -0.37533, 0.92388, 0.074658, -0.37533, 0.92388, 0.074658, -0.353553, 0.92388, 0.146447, -0.268188, 0.95694, 0.111087, -0.37533, 0.92388, 0.074658, -0.268188, 0.95694, 0.111087, -0.284707, 0.95694, 0.056632, -0.284707, 0.95694, 0.056632, -0.268188, 0.95694, 0.111087, -0.18024, 0.980785, 0.074658, -0.284707, 0.95694, 0.056632, -0.18024, 0.980785, 0.074658, -0.191342, 0.980785, 0.03806, -0.191342, 0.980785, 0.03806, -0.18024, 0.980785, 0.074658, -0.090556, 0.995185, 0.037509, -0.191342, 0.980785, 0.03806, -0.090556, 0.995185, 0.037509, -0.096134, 0.995185, 0.019122, -0.19509, 0.980785, 0, -0.191342, 0.980785, 0.03806, -0.096134, 0.995185, 0.019122, -0.19509, 0.980785, 0, -0.096134, 0.995185, 0.019122, -0.098017, 0.995185, 0, -0.290285, 0.95694, 0, -0.284707, 0.95694, 0.056632, -0.191342, 0.980785, 0.03806, -0.290285, 0.95694, 0, -0.191342, 0.980785, 0.03806, -0.19509, 0.980785, 0, -0.382683, 0.92388, 0, -0.37533, 0.92388, 0.074658, -0.284707, 0.95694, 0.056632, -0.382683, 0.92388, 0, -0.284707, 0.95694, 0.056632, -0.290285, 0.95694, 0, -0.471397, 0.881921, 0, -0.462339, 0.881921, 0.091965, -0.37533, 0.92388, 0.074658, -0.471397, 0.881921, 0, -0.37533, 0.92388, 0.074658, -0.382683, 0.92388, 0, -0.55557, 0.83147, 0, -0.544895, 0.83147, 0.108386, -0.462339, 0.881921, 0.091965, -0.55557, 0.83147, 0, -0.462339, 0.881921, 0.091965, -0.471397, 0.881921, 0, -0.634393, 0.77301, 0, -0.622203, 0.77301, 0.123764, -0.55557, 0.83147, 0, -0.622203, 0.77301, 0.123764, -0.544895, 0.83147, 0.108386, -0.55557, 0.83147, 0, -0.707107, 0.707107, 0, -0.69352, 0.707107, 0.13795, -0.622203, 0.77301, 0.123764, -0.707107, 0.707107, 0, -0.622203, 0.77301, 0.123764, -0.634393, 0.77301, 0, -0.77301, 0.634393, 0, -0.758157, 0.634393, 0.150807, -0.69352, 0.707107, 0.13795, -0.77301, 0.634393, 0, -0.69352, 0.707107, 0.13795, -0.707107, 0.707107, 0, -0.831469, 0.55557, 0, -0.815493, 0.55557, 0.162212, -0.758157, 0.634393, 0.150807, -0.831469, 0.55557, 0, -0.758157, 0.634393, 0.150807, -0.77301, 0.634393, 0, -0.881921, 0.471397, 0, -0.864975, 0.471397, 0.172054, -0.831469, 0.55557, 0, -0.864975, 0.471397, 0.172054, -0.815493, 0.55557, 0.162212, -0.831469, 0.55557, 0, -0.923879, 0.382683, 0, -0.906127, 0.382683, 0.18024, -0.881921, 0.471397, 0, -0.906127, 0.382683, 0.18024, -0.864975, 0.471397, 0.172054, -0.881921, 0.471397, 0, -0.95694, 0.290285, 0, -0.938553, 0.290285, 0.18669, -0.906127, 0.382683, 0.18024, -0.95694, 0.290285, 0, -0.906127, 0.382683, 0.18024, -0.923879, 0.382683, 0, -0.980785, 0.19509, 0, -0.961939, 0.19509, 0.191342, -0.938553, 0.290285, 0.18669, -0.980785, 0.19509, 0, -0.938553, 0.290285, 0.18669, -0.95694, 0.290285, 0, -0.995184, 0.098017, 0, -0.976062, 0.098017, 0.194151, -0.961939, 0.19509, 0.191342, -0.995184, 0.098017, 0, -0.961939, 0.19509, 0.191342, -0.980785, 0.19509, 0, -0.999999, 0, 0, -0.980785, 0, 0.195091, -0.976062, 0.098017, 0.194151, -0.999999, 0, 0, -0.976062, 0.098017, 0.194151, -0.995184, 0.098017, 0, -0.995184, -0.098017, 0, -0.976062, -0.098017, 0.194151, -0.999999, 0, 0, -0.976062, -0.098017, 0.194151, -0.980785, 0, 0.195091, -0.999999, 0, 0, -0.980785, -0.195091, 0, -0.961939, -0.195091, 0.191342, -0.976062, -0.098017, 0.194151, -0.980785, -0.195091, 0, -0.976062, -0.098017, 0.194151, -0.995184, -0.098017, 0, -0.95694, -0.290285, 0, -0.938553, -0.290285, 0.18669, -0.980785, -0.195091, 0, -0.938553, -0.290285, 0.18669, -0.961939, -0.195091, 0.191342, -0.980785, -0.195091, 0, -0.923879, -0.382684, 0, -0.906127, -0.382684, 0.18024, -0.938553, -0.290285, 0.18669, -0.923879, -0.382684, 0, -0.938553, -0.290285, 0.18669, -0.95694, -0.290285, 0, -0.881921, -0.471397, 0, -0.864975, -0.471397, 0.172054, -0.906127, -0.382684, 0.18024, -0.881921, -0.471397, 0, -0.906127, -0.382684, 0.18024, -0.923879, -0.382684, 0, -0.831469, -0.555571, 0, -0.815493, -0.555571, 0.162212, -0.864975, -0.471397, 0.172054, -0.831469, -0.555571, 0, -0.864975, -0.471397, 0.172054, -0.881921, -0.471397, 0, -0.77301, -0.634394, 0, -0.758157, -0.634394, 0.150807, -0.815493, -0.555571, 0.162212, -0.77301, -0.634394, 0, -0.815493, -0.555571, 0.162212, -0.831469, -0.555571, 0, -0.707106, -0.707107, 0, -0.693519, -0.707107, 0.13795, -0.77301, -0.634394, 0, -0.693519, -0.707107, 0.13795, -0.758157, -0.634394, 0.150807, -0.77301, -0.634394, 0, -0.634393, -0.773011, 0, -0.622203, -0.773011, 0.123764, -0.693519, -0.707107, 0.13795, -0.634393, -0.773011, 0, -0.693519, -0.707107, 0.13795, -0.707106, -0.707107, 0, -0.555569, -0.83147, 0, -0.544894, -0.83147, 0.108386, -0.622203, -0.773011, 0.123764, -0.555569, -0.83147, 0, -0.622203, -0.773011, 0.123764, -0.634393, -0.773011, 0, -0.471396, -0.881922, 0, -0.462338, -0.881922, 0.091965, -0.544894, -0.83147, 0.108386, -0.471396, -0.881922, 0, -0.544894, -0.83147, 0.108386, -0.555569, -0.83147, 0, -0.382683, -0.92388, 0, -0.375329, -0.92388, 0.074658, -0.462338, -0.881922, 0.091965, -0.382683, -0.92388, 0, -0.462338, -0.881922, 0.091965, -0.471396, -0.881922, 0, -0.290284, -0.956941, 0, -0.284706, -0.956941, 0.056632, -0.375329, -0.92388, 0.074658, -0.290284, -0.956941, 0, -0.375329, -0.92388, 0.074658, -0.382683, -0.92388, 0, -0.19509, -0.980785, 0, -0.191341, -0.980785, 0.03806, -0.284706, -0.956941, 0.056632, -0.19509, -0.980785, 0, -0.284706, -0.956941, 0.056632, -0.290284, -0.956941, 0, -0.098016, -0.995185, 0, -0.096133, -0.995185, 0.019122, -0.191341, -0.980785, 0.03806, -0.098016, -0.995185, 0, -0.191341, -0.980785, 0.03806, -0.19509, -0.980785, 0, -0.096133, -0.995185, -0.019122, -0.098016, -0.995185, 0, -0.19509, -0.980785, 0, -0.096133, -0.995185, -0.019122, -0.19509, -0.980785, 0, -0.191341, -0.980785, -0.03806, -0.191341, -0.980785, -0.03806, -0.19509, -0.980785, 0, -0.290284, -0.956941, 0, -0.191341, -0.980785, -0.03806, -0.290284, -0.956941, 0, -0.284706, -0.956941, -0.056632, -0.284706, -0.956941, -0.056632, -0.290284, -0.956941, 0, -0.382683, -0.92388, 0, -0.284706, -0.956941, -0.056632, -0.382683, -0.92388, 0, -0.37533, -0.92388, -0.074658, -0.37533, -0.92388, -0.074658, -0.382683, -0.92388, 0, -0.471396, -0.881922, 0, -0.37533, -0.92388, -0.074658, -0.471396, -0.881922, 0, -0.462338, -0.881922, -0.091965, -0.462338, -0.881922, -0.091965, -0.471396, -0.881922, 0, -0.555569, -0.83147, 0, -0.462338, -0.881922, -0.091965, -0.555569, -0.83147, 0, -0.544894, -0.83147, -0.108386, -0.544894, -0.83147, -0.108386, -0.555569, -0.83147, 0, -0.634393, -0.773011, 0, -0.544894, -0.83147, -0.108386, -0.634393, -0.773011, 0, -0.622203, -0.773011, -0.123764, -0.622203, -0.773011, -0.123764, -0.634393, -0.773011, 0, -0.707106, -0.707107, 0, -0.622203, -0.773011, -0.123764, -0.707106, -0.707107, 0, -0.693519, -0.707107, -0.13795, -0.693519, -0.707107, -0.13795, -0.707106, -0.707107, 0, -0.758157, -0.634394, -0.150807, -0.707106, -0.707107, 0, -0.77301, -0.634394, 0, -0.758157, -0.634394, -0.150807, -0.758157, -0.634394, -0.150807, -0.77301, -0.634394, 0, -0.831469, -0.555571, 0, -0.758157, -0.634394, -0.150807, -0.831469, -0.555571, 0, -0.815493, -0.555571, -0.162212, -0.815493, -0.555571, -0.162212, -0.831469, -0.555571, 0, -0.881921, -0.471397, 0, -0.815493, -0.555571, -0.162212, -0.881921, -0.471397, 0, -0.864975, -0.471397, -0.172054, -0.864975, -0.471397, -0.172054, -0.881921, -0.471397, 0, -0.923879, -0.382684, 0, -0.864975, -0.471397, -0.172054, -0.923879, -0.382684, 0, -0.906127, -0.382684, -0.18024, -0.906127, -0.382684, -0.18024, -0.923879, -0.382684, 0, -0.95694, -0.290285, 0, -0.906127, -0.382684, -0.18024, -0.95694, -0.290285, 0, -0.938553, -0.290285, -0.18669, -0.938553, -0.290285, -0.18669, -0.95694, -0.290285, 0, -0.961939, -0.195091, -0.191342, -0.95694, -0.290285, 0, -0.980785, -0.195091, 0, -0.961939, -0.195091, -0.191342, -0.961939, -0.195091, -0.191342, -0.980785, -0.195091, 0, -0.995184, -0.098017, 0, -0.961939, -0.195091, -0.191342, -0.995184, -0.098017, 0, -0.976062, -0.098017, -0.194151, -0.976062, -0.098017, -0.194151, -0.995184, -0.098017, 0, -0.980785, 0, -0.19509, -0.995184, -0.098017, 0, -0.999999, 0, 0, -0.980785, 0, -0.19509, -0.980785, 0, -0.19509, -0.999999, 0, 0, -0.995184, 0.098017, 0, -0.980785, 0, -0.19509, -0.995184, 0.098017, 0, -0.976062, 0.098017, -0.194151, -0.976062, 0.098017, -0.194151, -0.995184, 0.098017, 0, -0.980785, 0.19509, 0, -0.976062, 0.098017, -0.194151, -0.980785, 0.19509, 0, -0.961939, 0.19509, -0.191342, -0.961939, 0.19509, -0.191342, -0.980785, 0.19509, 0, -0.95694, 0.290285, 0, -0.961939, 0.19509, -0.191342, -0.95694, 0.290285, 0, -0.938553, 0.290285, -0.18669, -0.938553, 0.290285, -0.18669, -0.95694, 0.290285, 0, -0.923879, 0.382683, 0, -0.938553, 0.290285, -0.18669, -0.923879, 0.382683, 0, -0.906127, 0.382683, -0.18024, -0.906127, 0.382683, -0.18024, -0.923879, 0.382683, 0, -0.881921, 0.471397, 0, -0.906127, 0.382683, -0.18024, -0.881921, 0.471397, 0, -0.864975, 0.471397, -0.172054, -0.864975, 0.471397, -0.172054, -0.881921, 0.471397, 0, -0.815493, 0.55557, -0.162212, -0.881921, 0.471397, 0, -0.831469, 0.55557, 0, -0.815493, 0.55557, -0.162212, -0.815493, 0.55557, -0.162212, -0.831469, 0.55557, 0, -0.77301, 0.634393, 0, -0.815493, 0.55557, -0.162212, -0.77301, 0.634393, 0, -0.758157, 0.634393, -0.150807, -0.758157, 0.634393, -0.150807, -0.77301, 0.634393, 0, -0.707107, 0.707107, 0, -0.758157, 0.634393, -0.150807, -0.707107, 0.707107, 0, -0.69352, 0.707107, -0.13795, -0.69352, 0.707107, -0.13795, -0.707107, 0.707107, 0, -0.634393, 0.77301, 0, -0.69352, 0.707107, -0.13795, -0.634393, 0.77301, 0, -0.622203, 0.77301, -0.123764, -0.622203, 0.77301, -0.123764, -0.634393, 0.77301, 0, -0.544895, 0.83147, -0.108386, -0.634393, 0.77301, 0, -0.55557, 0.83147, 0, -0.544895, 0.83147, -0.108386, -0.544895, 0.83147, -0.108386, -0.55557, 0.83147, 0, -0.471397, 0.881921, 0, -0.544895, 0.83147, -0.108386, -0.471397, 0.881921, 0, -0.462339, 0.881921, -0.091965, -0.462339, 0.881921, -0.091965, -0.471397, 0.881921, 0, -0.382683, 0.92388, 0, -0.462339, 0.881921, -0.091965, -0.382683, 0.92388, 0, -0.37533, 0.92388, -0.074658, -0.37533, 0.92388, -0.074658, -0.382683, 0.92388, 0, -0.290285, 0.95694, 0, -0.37533, 0.92388, -0.074658, -0.290285, 0.95694, 0, -0.284707, 0.95694, -0.056632, -0.284707, 0.95694, -0.056632, -0.290285, 0.95694, 0, -0.19509, 0.980785, 0, -0.284707, 0.95694, -0.056632, -0.19509, 0.980785, 0, -0.191342, 0.980785, -0.03806, -0.191342, 0.980785, -0.03806, -0.19509, 0.980785, 0, -0.098017, 0.995185, 0, -0.191342, 0.980785, -0.03806, -0.098017, 0.995185, 0, -0.096134, 0.995185, -0.019122, -0.18024, 0.980785, -0.074658, -0.191342, 0.980785, -0.03806, -0.096134, 0.995185, -0.019122, -0.18024, 0.980785, -0.074658, -0.096134, 0.995185, -0.019122, -0.090556, 0.995185, -0.03751, -0.268188, 0.95694, -0.111087, -0.284707, 0.95694, -0.056632, -0.191342, 0.980785, -0.03806, -0.268188, 0.95694, -0.111087, -0.191342, 0.980785, -0.03806, -0.18024, 0.980785, -0.074658, -0.353553, 0.92388, -0.146447, -0.37533, 0.92388, -0.074658, -0.284707, 0.95694, -0.056632, -0.353553, 0.92388, -0.146447, -0.284707, 0.95694, -0.056632, -0.268188, 0.95694, -0.111087, -0.435514, 0.881921, -0.180396, -0.462339, 0.881921, -0.091965, -0.37533, 0.92388, -0.074658, -0.435514, 0.881921, -0.180396, -0.37533, 0.92388, -0.074658, -0.353553, 0.92388, -0.146447, -0.51328, 0.83147, -0.212607, -0.544895, 0.83147, -0.108386, -0.462339, 0.881921, -0.091965, -0.51328, 0.83147, -0.212607, -0.462339, 0.881921, -0.091965, -0.435514, 0.881921, -0.180396, -0.586103, 0.77301, -0.242772, -0.622203, 0.77301, -0.123764, -0.51328, 0.83147, -0.212607, -0.622203, 0.77301, -0.123764, -0.544895, 0.83147, -0.108386, -0.51328, 0.83147, -0.212607, -0.653281, 0.707107, -0.270598, -0.69352, 0.707107, -0.13795, -0.622203, 0.77301, -0.123764, -0.653281, 0.707107, -0.270598, -0.622203, 0.77301, -0.123764, -0.586103, 0.77301, -0.242772, -0.714168, 0.634393, -0.295818, -0.758157, 0.634393, -0.150807, -0.69352, 0.707107, -0.13795, -0.714168, 0.634393, -0.295818, -0.69352, 0.707107, -0.13795, -0.653281, 0.707107, -0.270598, -0.768178, 0.55557, -0.318189, -0.815493, 0.55557, -0.162212, -0.758157, 0.634393, -0.150807, -0.768178, 0.55557, -0.318189, -0.758157, 0.634393, -0.150807, -0.714168, 0.634393, -0.295818, -0.814789, 0.471397, -0.337497, -0.864975, 0.471397, -0.172054, -0.768178, 0.55557, -0.318189, -0.864975, 0.471397, -0.172054, -0.815493, 0.55557, -0.162212, -0.768178, 0.55557, -0.318189, -0.853553, 0.382683, -0.353553, -0.906127, 0.382683, -0.18024, -0.864975, 0.471397, -0.172054, -0.853553, 0.382683, -0.353553, -0.864975, 0.471397, -0.172054, -0.814789, 0.471397, -0.337497, -0.884097, 0.290285, -0.366205, -0.938553, 0.290285, -0.18669, -0.906127, 0.382683, -0.18024, -0.884097, 0.290285, -0.366205, -0.906127, 0.382683, -0.18024, -0.853553, 0.382683, -0.353553, -0.906127, 0.19509, -0.37533, -0.961939, 0.19509, -0.191342, -0.938553, 0.290285, -0.18669, -0.906127, 0.19509, -0.37533, -0.938553, 0.290285, -0.18669, -0.884097, 0.290285, -0.366205, -0.91943, 0.098017, -0.38084, -0.976062, 0.098017, -0.194151, -0.961939, 0.19509, -0.191342, -0.91943, 0.098017, -0.38084, -0.961939, 0.19509, -0.191342, -0.906127, 0.19509, -0.37533, -0.923879, 0, -0.382683, -0.980785, 0, -0.19509, -0.976062, 0.098017, -0.194151, -0.923879, 0, -0.382683, -0.976062, 0.098017, -0.194151, -0.91943, 0.098017, -0.38084, -0.91943, -0.098017, -0.38084, -0.976062, -0.098017, -0.194151, -0.923879, 0, -0.382683, -0.976062, -0.098017, -0.194151, -0.980785, 0, -0.19509, -0.923879, 0, -0.382683, -0.906127, -0.195091, -0.37533, -0.961939, -0.195091, -0.191342, -0.976062, -0.098017, -0.194151, -0.906127, -0.195091, -0.37533, -0.976062, -0.098017, -0.194151, -0.91943, -0.098017, -0.38084, -0.884097, -0.290285, -0.366205, -0.938553, -0.290285, -0.18669, -0.906127, -0.195091, -0.37533, -0.938553, -0.290285, -0.18669, -0.961939, -0.195091, -0.191342, -0.906127, -0.195091, -0.37533, -0.853553, -0.382684, -0.353553, -0.906127, -0.382684, -0.18024, -0.938553, -0.290285, -0.18669, -0.853553, -0.382684, -0.353553, -0.938553, -0.290285, -0.18669, -0.884097, -0.290285, -0.366205, -0.814789, -0.471397, -0.337496, -0.864975, -0.471397, -0.172054, -0.906127, -0.382684, -0.18024, -0.814789, -0.471397, -0.337496, -0.906127, -0.382684, -0.18024, -0.853553, -0.382684, -0.353553, -0.768177, -0.555571, -0.318189, -0.815493, -0.555571, -0.162212, -0.864975, -0.471397, -0.172054, -0.768177, -0.555571, -0.318189, -0.864975, -0.471397, -0.172054, -0.814789, -0.471397, -0.337496, -0.714168, -0.634394, -0.295818, -0.758157, -0.634394, -0.150807, -0.815493, -0.555571, -0.162212, -0.714168, -0.634394, -0.295818, -0.815493, -0.555571, -0.162212, -0.768177, -0.555571, -0.318189, -0.653281, -0.707107, -0.270598, -0.693519, -0.707107, -0.13795, -0.714168, -0.634394, -0.295818, -0.693519, -0.707107, -0.13795, -0.758157, -0.634394, -0.150807, -0.714168, -0.634394, -0.295818, -0.586102, -0.773011, -0.242771, -0.622203, -0.773011, -0.123764, -0.693519, -0.707107, -0.13795, -0.586102, -0.773011, -0.242771, -0.693519, -0.707107, -0.13795, -0.653281, -0.707107, -0.270598, -0.513279, -0.83147, -0.212607, -0.544894, -0.83147, -0.108386, -0.622203, -0.773011, -0.123764, -0.513279, -0.83147, -0.212607, -0.622203, -0.773011, -0.123764, -0.586102, -0.773011, -0.242771, -0.435513, -0.881922, -0.180395, -0.462338, -0.881922, -0.091965, -0.544894, -0.83147, -0.108386, -0.435513, -0.881922, -0.180395, -0.544894, -0.83147, -0.108386, -0.513279, -0.83147, -0.212607, -0.353553, -0.92388, -0.146446, -0.37533, -0.92388, -0.074658, -0.462338, -0.881922, -0.091965, -0.353553, -0.92388, -0.146446, -0.462338, -0.881922, -0.091965, -0.435513, -0.881922, -0.180395, -0.268187, -0.956941, -0.111087, -0.284706, -0.956941, -0.056632, -0.37533, -0.92388, -0.074658, -0.268187, -0.956941, -0.111087, -0.37533, -0.92388, -0.074658, -0.353553, -0.92388, -0.146446, -0.180239, -0.980785, -0.074657, -0.191341, -0.980785, -0.03806, -0.284706, -0.956941, -0.056632, -0.180239, -0.980785, -0.074657, -0.284706, -0.956941, -0.056632, -0.268187, -0.956941, -0.111087, -0.090555, -0.995185, -0.037509, -0.096133, -0.995185, -0.019122, -0.191341, -0.980785, -0.03806, -0.090555, -0.995185, -0.037509, -0.191341, -0.980785, -0.03806, -0.180239, -0.980785, -0.074657, -0.081498, -0.995185, -0.054455, -0.090555, -0.995185, -0.037509, -0.180239, -0.980785, -0.074657, -0.081498, -0.995185, -0.054455, -0.180239, -0.980785, -0.074657, -0.162211, -0.980785, -0.108386, -0.162211, -0.980785, -0.108386, -0.180239, -0.980785, -0.074657, -0.268187, -0.956941, -0.111087, -0.162211, -0.980785, -0.108386, -0.268187, -0.956941, -0.111087, -0.241362, -0.956941, -0.161273, -0.241362, -0.956941, -0.161273, -0.268187, -0.956941, -0.111087, -0.353553, -0.92388, -0.146446, -0.241362, -0.956941, -0.161273, -0.353553, -0.92388, -0.146446, -0.318189, -0.92388, -0.212607, -0.318189, -0.92388, -0.212607, -0.353553, -0.92388, -0.146446, -0.435513, -0.881922, -0.180395, -0.318189, -0.92388, -0.212607, -0.435513, -0.881922, -0.180395, -0.391952, -0.881922, -0.261894, -0.391952, -0.881922, -0.261894, -0.435513, -0.881922, -0.180395, -0.513279, -0.83147, -0.212607, -0.391952, -0.881922, -0.261894, -0.513279, -0.83147, -0.212607, -0.461939, -0.83147, -0.308658, -0.461939, -0.83147, -0.308658, -0.513279, -0.83147, -0.212607, -0.586102, -0.773011, -0.242771, -0.461939, -0.83147, -0.308658, -0.586102, -0.773011, -0.242771, -0.527478, -0.773011, -0.35245, -0.527478, -0.773011, -0.35245, -0.586102, -0.773011, -0.242771, -0.653281, -0.707107, -0.270598, -0.527478, -0.773011, -0.35245, -0.653281, -0.707107, -0.270598, -0.587937, -0.707107, -0.392847, -0.587937, -0.707107, -0.392847, -0.653281, -0.707107, -0.270598, -0.642734, -0.634394, -0.429461, -0.653281, -0.707107, -0.270598, -0.714168, -0.634394, -0.295818, -0.642734, -0.634394, -0.429461, -0.642734, -0.634394, -0.429461, -0.714168, -0.634394, -0.295818, -0.768177, -0.555571, -0.318189, -0.642734, -0.634394, -0.429461, -0.768177, -0.555571, -0.318189, -0.691341, -0.555571, -0.461939, -0.691341, -0.555571, -0.461939, -0.768177, -0.555571, -0.318189, -0.814789, -0.471397, -0.337496, -0.691341, -0.555571, -0.461939, -0.814789, -0.471397, -0.337496, -0.73329, -0.471397, -0.489969, -0.73329, -0.471397, -0.489969, -0.814789, -0.471397, -0.337496, -0.853553, -0.382684, -0.353553, -0.73329, -0.471397, -0.489969, -0.853553, -0.382684, -0.353553, -0.768177, -0.382684, -0.51328, -0.768177, -0.382684, -0.51328, -0.853553, -0.382684, -0.353553, -0.884097, -0.290285, -0.366205, -0.768177, -0.382684, -0.51328, -0.884097, -0.290285, -0.366205, -0.795667, -0.290285, -0.531647, -0.795667, -0.290285, -0.531647, -0.884097, -0.290285, -0.366205, -0.815493, -0.195091, -0.544895, -0.884097, -0.290285, -0.366205, -0.906127, -0.195091, -0.37533, -0.815493, -0.195091, -0.544895, -0.815493, -0.195091, -0.544895, -0.906127, -0.195091, -0.37533, -0.91943, -0.098017, -0.38084, -0.815493, -0.195091, -0.544895, -0.91943, -0.098017, -0.38084, -0.827466, -0.098017, -0.552895, -0.827466, -0.098017, -0.552895, -0.91943, -0.098017, -0.38084, -0.831469, 0, -0.55557, -0.91943, -0.098017, -0.38084, -0.923879, 0, -0.382683, -0.831469, 0, -0.55557, -0.831469, 0, -0.55557, -0.923879, 0, -0.382683, -0.91943, 0.098017, -0.38084, -0.831469, 0, -0.55557, -0.91943, 0.098017, -0.38084, -0.827466, 0.098017, -0.552895, -0.827466, 0.098017, -0.552895, -0.91943, 0.098017, -0.38084, -0.906127, 0.19509, -0.37533, -0.827466, 0.098017, -0.552895, -0.906127, 0.19509, -0.37533, -0.815493, 0.19509, -0.544895, -0.815493, 0.19509, -0.544895, -0.906127, 0.19509, -0.37533, -0.884097, 0.290285, -0.366205, -0.815493, 0.19509, -0.544895, -0.884097, 0.290285, -0.366205, -0.795667, 0.290285, -0.531647, -0.795667, 0.290285, -0.531647, -0.884097, 0.290285, -0.366205, -0.853553, 0.382683, -0.353553, -0.795667, 0.290285, -0.531647, -0.853553, 0.382683, -0.353553, -0.768178, 0.382683, -0.51328, -0.768178, 0.382683, -0.51328, -0.853553, 0.382683, -0.353553, -0.814789, 0.471397, -0.337497, -0.768178, 0.382683, -0.51328, -0.814789, 0.471397, -0.337497, -0.73329, 0.471397, -0.489969, -0.73329, 0.471397, -0.489969, -0.814789, 0.471397, -0.337497, -0.691342, 0.55557, -0.46194, -0.814789, 0.471397, -0.337497, -0.768178, 0.55557, -0.318189, -0.691342, 0.55557, -0.46194, -0.691342, 0.55557, -0.46194, -0.768178, 0.55557, -0.318189, -0.714168, 0.634393, -0.295818, -0.691342, 0.55557, -0.46194, -0.714168, 0.634393, -0.295818, -0.642735, 0.634393, -0.429461, -0.642735, 0.634393, -0.429461, -0.714168, 0.634393, -0.295818, -0.653281, 0.707107, -0.270598, -0.642735, 0.634393, -0.429461, -0.653281, 0.707107, -0.270598, -0.587938, 0.707107, -0.392847, -0.587938, 0.707107, -0.392847, -0.653281, 0.707107, -0.270598, -0.586103, 0.77301, -0.242772, -0.587938, 0.707107, -0.392847, -0.586103, 0.77301, -0.242772, -0.527479, 0.77301, -0.35245, -0.527479, 0.77301, -0.35245, -0.586103, 0.77301, -0.242772, -0.46194, 0.83147, -0.308658, -0.586103, 0.77301, -0.242772, -0.51328, 0.83147, -0.212607, -0.46194, 0.83147, -0.308658, -0.46194, 0.83147, -0.308658, -0.51328, 0.83147, -0.212607, -0.435514, 0.881921, -0.180396, -0.46194, 0.83147, -0.308658, -0.435514, 0.881921, -0.180396, -0.391952, 0.881921, -0.261894, -0.391952, 0.881921, -0.261894, -0.435514, 0.881921, -0.180396, -0.353553, 0.92388, -0.146447, -0.391952, 0.881921, -0.261894, -0.353553, 0.92388, -0.146447, -0.31819, 0.92388, -0.212607, -0.31819, 0.92388, -0.212607, -0.353553, 0.92388, -0.146447, -0.268188, 0.95694, -0.111087, -0.31819, 0.92388, -0.212607, -0.268188, 0.95694, -0.111087, -0.241363, 0.95694, -0.161273, -0.241363, 0.95694, -0.161273, -0.268188, 0.95694, -0.111087, -0.18024, 0.980785, -0.074658, -0.241363, 0.95694, -0.161273, -0.18024, 0.980785, -0.074658, -0.162212, 0.980785, -0.108386, -0.162212, 0.980785, -0.108386, -0.18024, 0.980785, -0.074658, -0.090556, 0.995185, -0.03751, -0.162212, 0.980785, -0.108386, -0.090556, 0.995185, -0.03751, -0.081498, 0.995185, -0.054455, -0.13795, 0.980785, -0.13795, -0.162212, 0.980785, -0.108386, -0.081498, 0.995185, -0.054455, -0.13795, 0.980785, -0.13795, -0.081498, 0.995185, -0.054455, -0.069309, 0.995185, -0.069309, -0.205262, 0.95694, -0.205262, -0.241363, 0.95694, -0.161273, -0.162212, 0.980785, -0.108386, -0.205262, 0.95694, -0.205262, -0.162212, 0.980785, -0.108386, -0.13795, 0.980785, -0.13795, -0.270598, 0.92388, -0.270598, -0.31819, 0.92388, -0.212607, -0.241363, 0.95694, -0.161273, -0.270598, 0.92388, -0.270598, -0.241363, 0.95694, -0.161273, -0.205262, 0.95694, -0.205262, -0.333328, 0.881921, -0.333328, -0.391952, 0.881921, -0.261894, -0.31819, 0.92388, -0.212607, -0.333328, 0.881921, -0.333328, -0.31819, 0.92388, -0.212607, -0.270598, 0.92388, -0.270598, -0.392847, 0.83147, -0.392847, -0.46194, 0.83147, -0.308658, -0.391952, 0.881921, -0.261894, -0.392847, 0.83147, -0.392847, -0.391952, 0.881921, -0.261894, -0.333328, 0.881921, -0.333328, -0.448584, 0.77301, -0.448584, -0.527479, 0.77301, -0.35245, -0.392847, 0.83147, -0.392847, -0.527479, 0.77301, -0.35245, -0.46194, 0.83147, -0.308658, -0.392847, 0.83147, -0.392847, -0.5, 0.707107, -0.5, -0.587938, 0.707107, -0.392847, -0.527479, 0.77301, -0.35245, -0.5, 0.707107, -0.5, -0.527479, 0.77301, -0.35245, -0.448584, 0.77301, -0.448584, -0.546601, 0.634393, -0.546601, -0.642735, 0.634393, -0.429461, -0.587938, 0.707107, -0.392847, -0.546601, 0.634393, -0.546601, -0.587938, 0.707107, -0.392847, -0.5, 0.707107, -0.5, -0.587938, 0.55557, -0.587938, -0.691342, 0.55557, -0.46194, -0.642735, 0.634393, -0.429461, -0.587938, 0.55557, -0.587938, -0.642735, 0.634393, -0.429461, -0.546601, 0.634393, -0.546601, -0.623612, 0.471397, -0.623612, -0.73329, 0.471397, -0.489969, -0.587938, 0.55557, -0.587938, -0.73329, 0.471397, -0.489969, -0.691342, 0.55557, -0.46194, -0.587938, 0.55557, -0.587938, -0.653281, 0.382683, -0.653281, -0.768178, 0.382683, -0.51328, -0.73329, 0.471397, -0.489969, -0.653281, 0.382683, -0.653281, -0.73329, 0.471397, -0.489969, -0.623612, 0.471397, -0.623612, -0.676659, 0.290285, -0.676659, -0.795667, 0.290285, -0.531647, -0.768178, 0.382683, -0.51328, -0.676659, 0.290285, -0.676659, -0.768178, 0.382683, -0.51328, -0.653281, 0.382683, -0.653281, -0.69352, 0.19509, -0.69352, -0.815493, 0.19509, -0.544895, -0.795667, 0.290285, -0.531647, -0.69352, 0.19509, -0.69352, -0.795667, 0.290285, -0.531647, -0.676659, 0.290285, -0.676659, -0.703702, 0.098017, -0.703702, -0.827466, 0.098017, -0.552895, -0.815493, 0.19509, -0.544895, -0.703702, 0.098017, -0.703702, -0.815493, 0.19509, -0.544895, -0.69352, 0.19509, -0.69352, -0.707107, 0, -0.707106, -0.831469, 0, -0.55557, -0.827466, 0.098017, -0.552895, -0.707107, 0, -0.707106, -0.827466, 0.098017, -0.552895, -0.703702, 0.098017, -0.703702, -0.703702, -0.098017, -0.703702, -0.827466, -0.098017, -0.552895, -0.707107, 0, -0.707106, -0.827466, -0.098017, -0.552895, -0.831469, 0, -0.55557, -0.707107, 0, -0.707106, -0.69352, -0.195091, -0.69352, -0.815493, -0.195091, -0.544895, -0.827466, -0.098017, -0.552895, -0.69352, -0.195091, -0.69352, -0.827466, -0.098017, -0.552895, -0.703702, -0.098017, -0.703702, -0.676659, -0.290285, -0.676659, -0.795667, -0.290285, -0.531647, -0.69352, -0.195091, -0.69352, -0.795667, -0.290285, -0.531647, -0.815493, -0.195091, -0.544895, -0.69352, -0.195091, -0.69352, -0.653281, -0.382684, -0.653281, -0.768177, -0.382684, -0.51328, -0.795667, -0.290285, -0.531647, -0.653281, -0.382684, -0.653281, -0.795667, -0.290285, -0.531647, -0.676659, -0.290285, -0.676659, -0.623612, -0.471397, -0.623612, -0.73329, -0.471397, -0.489969, -0.768177, -0.382684, -0.51328, -0.623612, -0.471397, -0.623612, -0.768177, -0.382684, -0.51328, -0.653281, -0.382684, -0.653281, -0.587938, -0.555571, -0.587937, -0.691341, -0.555571, -0.461939, -0.73329, -0.471397, -0.489969, -0.587938, -0.555571, -0.587937, -0.73329, -0.471397, -0.489969, -0.623612, -0.471397, -0.623612, -0.546601, -0.634394, -0.546601, -0.642734, -0.634394, -0.429461, -0.691341, -0.555571, -0.461939, -0.546601, -0.634394, -0.546601, -0.691341, -0.555571, -0.461939, -0.587938, -0.555571, -0.587937, -0.5, -0.707107, -0.5, -0.587937, -0.707107, -0.392847, -0.642734, -0.634394, -0.429461, -0.5, -0.707107, -0.5, -0.642734, -0.634394, -0.429461, -0.546601, -0.634394, -0.546601, -0.448583, -0.773011, -0.448583, -0.527478, -0.773011, -0.35245, -0.587937, -0.707107, -0.392847, -0.448583, -0.773011, -0.448583, -0.587937, -0.707107, -0.392847, -0.5, -0.707107, -0.5, -0.392847, -0.83147, -0.392847, -0.461939, -0.83147, -0.308658, -0.527478, -0.773011, -0.35245, -0.392847, -0.83147, -0.392847, -0.527478, -0.773011, -0.35245, -0.448583, -0.773011, -0.448583, -0.333327, -0.881922, -0.333327, -0.391952, -0.881922, -0.261894, -0.461939, -0.83147, -0.308658, -0.333327, -0.881922, -0.333327, -0.461939, -0.83147, -0.308658, -0.392847, -0.83147, -0.392847, -0.270598, -0.92388, -0.270597, -0.318189, -0.92388, -0.212607, -0.391952, -0.881922, -0.261894, -0.270598, -0.92388, -0.270597, -0.391952, -0.881922, -0.261894, -0.333327, -0.881922, -0.333327, -0.205262, -0.956941, -0.205262, -0.241362, -0.956941, -0.161273, -0.318189, -0.92388, -0.212607, -0.205262, -0.956941, -0.205262, -0.318189, -0.92388, -0.212607, -0.270598, -0.92388, -0.270597, -0.137949, -0.980785, -0.137949, -0.162211, -0.980785, -0.108386, -0.241362, -0.956941, -0.161273, -0.137949, -0.980785, -0.137949, -0.241362, -0.956941, -0.161273, -0.205262, -0.956941, -0.205262, -0.069308, -0.995185, -0.069308, -0.081498, -0.995185, -0.054455, -0.162211, -0.980785, -0.108386, -0.069308, -0.995185, -0.069308, -0.162211, -0.980785, -0.108386, -0.137949, -0.980785, -0.137949, -0.054455, -0.995185, -0.081498, -0.069308, -0.995185, -0.069308, -0.137949, -0.980785, -0.137949, -0.054455, -0.995185, -0.081498, -0.137949, -0.980785, -0.137949, -0.108386, -0.980785, -0.162211, -0.108386, -0.980785, -0.162211, -0.137949, -0.980785, -0.137949, -0.205262, -0.956941, -0.205262, -0.108386, -0.980785, -0.162211, -0.205262, -0.956941, -0.205262, -0.161273, -0.956941, -0.241362, -0.161273, -0.956941, -0.241362, -0.205262, -0.956941, -0.205262, -0.270598, -0.92388, -0.270597, -0.161273, -0.956941, -0.241362, -0.270598, -0.92388, -0.270597, -0.212607, -0.92388, -0.318189, -0.212607, -0.92388, -0.318189, -0.270598, -0.92388, -0.270597, -0.333327, -0.881922, -0.333327, -0.212607, -0.92388, -0.318189, -0.333327, -0.881922, -0.333327, -0.261894, -0.881922, -0.391951, -0.261894, -0.881922, -0.391951, -0.333327, -0.881922, -0.333327, -0.392847, -0.83147, -0.392847, -0.261894, -0.881922, -0.391951, -0.392847, -0.83147, -0.392847, -0.308658, -0.83147, -0.461939, -0.308658, -0.83147, -0.461939, -0.392847, -0.83147, -0.392847, -0.448583, -0.773011, -0.448583, -0.308658, -0.83147, -0.461939, -0.448583, -0.773011, -0.448583, -0.35245, -0.773011, -0.527478, -0.35245, -0.773011, -0.527478, -0.448583, -0.773011, -0.448583, -0.5, -0.707107, -0.5, -0.35245, -0.773011, -0.527478, -0.5, -0.707107, -0.5, -0.392847, -0.707107, -0.587937, -0.392847, -0.707107, -0.587937, -0.5, -0.707107, -0.5, -0.546601, -0.634394, -0.546601, -0.392847, -0.707107, -0.587937, -0.546601, -0.634394, -0.546601, -0.429461, -0.634394, -0.642734, -0.429461, -0.634394, -0.642734, -0.546601, -0.634394, -0.546601, -0.587938, -0.555571, -0.587937, -0.429461, -0.634394, -0.642734, -0.587938, -0.555571, -0.587937, -0.46194, -0.555571, -0.691341, -0.46194, -0.555571, -0.691341, -0.587938, -0.555571, -0.587937, -0.623612, -0.471397, -0.623612, -0.46194, -0.555571, -0.691341, -0.623612, -0.471397, -0.623612, -0.489969, -0.471397, -0.73329, -0.489969, -0.471397, -0.73329, -0.623612, -0.471397, -0.623612, -0.653281, -0.382684, -0.653281, -0.489969, -0.471397, -0.73329, -0.653281, -0.382684, -0.653281, -0.51328, -0.382684, -0.768177, -0.51328, -0.382684, -0.768177, -0.653281, -0.382684, -0.653281, -0.676659, -0.290285, -0.676659, -0.51328, -0.382684, -0.768177, -0.676659, -0.290285, -0.676659, -0.531647, -0.290285, -0.795667, -0.531647, -0.290285, -0.795667, -0.676659, -0.290285, -0.676659, -0.544895, -0.195091, -0.815493, -0.676659, -0.290285, -0.676659, -0.69352, -0.195091, -0.69352, -0.544895, -0.195091, -0.815493, -0.544895, -0.195091, -0.815493, -0.69352, -0.195091, -0.69352, -0.703702, -0.098017, -0.703702, -0.544895, -0.195091, -0.815493, -0.703702, -0.098017, -0.703702, -0.552895, -0.098017, -0.827466, -0.552895, -0.098017, -0.827466, -0.703702, -0.098017, -0.703702, -0.55557, 0, -0.831469, -0.703702, -0.098017, -0.703702, -0.707107, 0, -0.707106, -0.55557, 0, -0.831469, -0.55557, 0, -0.831469, -0.707107, 0, -0.707106, -0.703702, 0.098017, -0.703702, -0.55557, 0, -0.831469, -0.703702, 0.098017, -0.703702, -0.552895, 0.098017, -0.827466, -0.552895, 0.098017, -0.827466, -0.703702, 0.098017, -0.703702, -0.69352, 0.19509, -0.69352, -0.552895, 0.098017, -0.827466, -0.69352, 0.19509, -0.69352, -0.544895, 0.19509, -0.815493, -0.544895, 0.19509, -0.815493, -0.69352, 0.19509, -0.69352, -0.676659, 0.290285, -0.676659, -0.544895, 0.19509, -0.815493, -0.676659, 0.290285, -0.676659, -0.531648, 0.290285, -0.795667, -0.531648, 0.290285, -0.795667, -0.676659, 0.290285, -0.676659, -0.653281, 0.382683, -0.653281, -0.531648, 0.290285, -0.795667, -0.653281, 0.382683, -0.653281, -0.51328, 0.382683, -0.768178, -0.51328, 0.382683, -0.768178, -0.653281, 0.382683, -0.653281, -0.623612, 0.471397, -0.623612, -0.51328, 0.382683, -0.768178, -0.623612, 0.471397, -0.623612, -0.489969, 0.471397, -0.73329, -0.489969, 0.471397, -0.73329, -0.623612, 0.471397, -0.623612, -0.46194, 0.55557, -0.691341, -0.623612, 0.471397, -0.623612, -0.587938, 0.55557, -0.587938, -0.46194, 0.55557, -0.691341, -0.46194, 0.55557, -0.691341, -0.587938, 0.55557, -0.587938, -0.546601, 0.634393, -0.546601, -0.46194, 0.55557, -0.691341, -0.546601, 0.634393, -0.546601, -0.429462, 0.634393, -0.642735, -0.429462, 0.634393, -0.642735, -0.546601, 0.634393, -0.546601, -0.5, 0.707107, -0.5, -0.429462, 0.634393, -0.642735, -0.5, 0.707107, -0.5, -0.392847, 0.707107, -0.587938, -0.392847, 0.707107, -0.587938, -0.5, 0.707107, -0.5, -0.448584, 0.77301, -0.448584, -0.392847, 0.707107, -0.587938, -0.448584, 0.77301, -0.448584, -0.35245, 0.77301, -0.527479, -0.35245, 0.77301, -0.527479, -0.448584, 0.77301, -0.448584, -0.308658, 0.83147, -0.46194, -0.448584, 0.77301, -0.448584, -0.392847, 0.83147, -0.392847, -0.308658, 0.83147, -0.46194, -0.308658, 0.83147, -0.46194, -0.392847, 0.83147, -0.392847, -0.333328, 0.881921, -0.333328, -0.308658, 0.83147, -0.46194, -0.333328, 0.881921, -0.333328, -0.261894, 0.881921, -0.391952, -0.261894, 0.881921, -0.391952, -0.333328, 0.881921, -0.333328, -0.270598, 0.92388, -0.270598, -0.261894, 0.881921, -0.391952, -0.270598, 0.92388, -0.270598, -0.212608, 0.92388, -0.31819, -0.212608, 0.92388, -0.31819, -0.270598, 0.92388, -0.270598, -0.205262, 0.95694, -0.205262, -0.212608, 0.92388, -0.31819, -0.205262, 0.95694, -0.205262, -0.161273, 0.95694, -0.241363, -0.161273, 0.95694, -0.241363, -0.205262, 0.95694, -0.205262, -0.13795, 0.980785, -0.13795, -0.161273, 0.95694, -0.241363, -0.13795, 0.980785, -0.13795, -0.108386, 0.980785, -0.162212, -0.108386, 0.980785, -0.162212, -0.13795, 0.980785, -0.13795, -0.069309, 0.995185, -0.069309, -0.108386, 0.980785, -0.162212, -0.069309, 0.995185, -0.069309, -0.054455, 0.995185, -0.081498, -0.074658, 0.980785, -0.18024, -0.108386, 0.980785, -0.162212, -0.054455, 0.995185, -0.081498, -0.074658, 0.980785, -0.18024, -0.054455, 0.995185, -0.081498, -0.03751, 0.995185, -0.090556, -0.111087, 0.95694, -0.268188, -0.161273, 0.95694, -0.241363, -0.108386, 0.980785, -0.162212, -0.111087, 0.95694, -0.268188, -0.108386, 0.980785, -0.162212, -0.074658, 0.980785, -0.18024, -0.146447, 0.92388, -0.353553, -0.212608, 0.92388, -0.31819, -0.161273, 0.95694, -0.241363, -0.146447, 0.92388, -0.353553, -0.161273, 0.95694, -0.241363, -0.111087, 0.95694, -0.268188, -0.180396, 0.881921, -0.435514, -0.261894, 0.881921, -0.391952, -0.212608, 0.92388, -0.31819, -0.180396, 0.881921, -0.435514, -0.212608, 0.92388, -0.31819, -0.146447, 0.92388, -0.353553, -0.212608, 0.83147, -0.51328, -0.308658, 0.83147, -0.46194, -0.261894, 0.881921, -0.391952, -0.212608, 0.83147, -0.51328, -0.261894, 0.881921, -0.391952, -0.180396, 0.881921, -0.435514, -0.242772, 0.77301, -0.586103, -0.35245, 0.77301, -0.527479, -0.308658, 0.83147, -0.46194, -0.242772, 0.77301, -0.586103, -0.308658, 0.83147, -0.46194, -0.212608, 0.83147, -0.51328, -0.270598, 0.707107, -0.653281, -0.392847, 0.707107, -0.587938, -0.35245, 0.77301, -0.527479, -0.270598, 0.707107, -0.653281, -0.35245, 0.77301, -0.527479, -0.242772, 0.77301, -0.586103, -0.295818, 0.634393, -0.714168, -0.429462, 0.634393, -0.642735, -0.392847, 0.707107, -0.587938, -0.295818, 0.634393, -0.714168, -0.392847, 0.707107, -0.587938, -0.270598, 0.707107, -0.653281, -0.31819, 0.55557, -0.768178, -0.46194, 0.55557, -0.691341, -0.429462, 0.634393, -0.642735, -0.31819, 0.55557, -0.768178, -0.429462, 0.634393, -0.642735, -0.295818, 0.634393, -0.714168, -0.337497, 0.471397, -0.814789, -0.489969, 0.471397, -0.73329, -0.31819, 0.55557, -0.768178, -0.489969, 0.471397, -0.73329, -0.46194, 0.55557, -0.691341, -0.31819, 0.55557, -0.768178, -0.353553, 0.382683, -0.853553, -0.51328, 0.382683, -0.768178, -0.489969, 0.471397, -0.73329, -0.353553, 0.382683, -0.853553, -0.489969, 0.471397, -0.73329, -0.337497, 0.471397, -0.814789, -0.366205, 0.290285, -0.884097, -0.531648, 0.290285, -0.795667, -0.51328, 0.382683, -0.768178, -0.366205, 0.290285, -0.884097, -0.51328, 0.382683, -0.768178, -0.353553, 0.382683, -0.853553, -0.37533, 0.19509, -0.906127, -0.544895, 0.19509, -0.815493, -0.531648, 0.290285, -0.795667, -0.37533, 0.19509, -0.906127, -0.531648, 0.290285, -0.795667, -0.366205, 0.290285, -0.884097, -0.380841, 0.098017, -0.91943, -0.552895, 0.098017, -0.827466, -0.37533, 0.19509, -0.906127, -0.552895, 0.098017, -0.827466, -0.544895, 0.19509, -0.815493, -0.37533, 0.19509, -0.906127, -0.382683, 0, -0.923879, -0.55557, 0, -0.831469, -0.552895, 0.098017, -0.827466, -0.382683, 0, -0.923879, -0.552895, 0.098017, -0.827466, -0.380841, 0.098017, -0.91943, -0.380841, -0.098017, -0.91943, -0.552895, -0.098017, -0.827466, -0.382683, 0, -0.923879, -0.552895, -0.098017, -0.827466, -0.55557, 0, -0.831469, -0.382683, 0, -0.923879, -0.37533, -0.195091, -0.906127, -0.544895, -0.195091, -0.815493, -0.552895, -0.098017, -0.827466, -0.37533, -0.195091, -0.906127, -0.552895, -0.098017, -0.827466, -0.380841, -0.098017, -0.91943, -0.366205, -0.290285, -0.884097, -0.531647, -0.290285, -0.795667, -0.37533, -0.195091, -0.906127, -0.531647, -0.290285, -0.795667, -0.544895, -0.195091, -0.815493, -0.37533, -0.195091, -0.906127, -0.353553, -0.382684, -0.853553, -0.51328, -0.382684, -0.768177, -0.531647, -0.290285, -0.795667, -0.353553, -0.382684, -0.853553, -0.531647, -0.290285, -0.795667, -0.366205, -0.290285, -0.884097, -0.337497, -0.471397, -0.814789, -0.489969, -0.471397, -0.73329, -0.51328, -0.382684, -0.768177, -0.337497, -0.471397, -0.814789, -0.51328, -0.382684, -0.768177, -0.353553, -0.382684, -0.853553, -0.31819, -0.555571, -0.768177, -0.46194, -0.555571, -0.691341, -0.489969, -0.471397, -0.73329, -0.31819, -0.555571, -0.768177, -0.489969, -0.471397, -0.73329, -0.337497, -0.471397, -0.814789, -0.295818, -0.634394, -0.714168, -0.429461, -0.634394, -0.642734, -0.46194, -0.555571, -0.691341, -0.295818, -0.634394, -0.714168, -0.46194, -0.555571, -0.691341, -0.31819, -0.555571, -0.768177, -0.270598, -0.707107, -0.653281, -0.392847, -0.707107, -0.587937, -0.429461, -0.634394, -0.642734, -0.270598, -0.707107, -0.653281, -0.429461, -0.634394, -0.642734, -0.295818, -0.634394, -0.714168, -0.242772, -0.773011, -0.586102, -0.35245, -0.773011, -0.527478, -0.392847, -0.707107, -0.587937, -0.242772, -0.773011, -0.586102, -0.392847, -0.707107, -0.587937, -0.270598, -0.707107, -0.653281, -0.212607, -0.83147, -0.513279, -0.308658, -0.83147, -0.461939, -0.35245, -0.773011, -0.527478, -0.212607, -0.83147, -0.513279, -0.35245, -0.773011, -0.527478, -0.242772, -0.773011, -0.586102, -0.180396, -0.881922, -0.435513, -0.261894, -0.881922, -0.391951, -0.308658, -0.83147, -0.461939, -0.180396, -0.881922, -0.435513, -0.308658, -0.83147, -0.461939, -0.212607, -0.83147, -0.513279, -0.146446, -0.92388, -0.353553, -0.212607, -0.92388, -0.318189, -0.261894, -0.881922, -0.391951, -0.146446, -0.92388, -0.353553, -0.261894, -0.881922, -0.391951, -0.180396, -0.881922, -0.435513, -0.111087, -0.956941, -0.268187, -0.161273, -0.956941, -0.241362, -0.212607, -0.92388, -0.318189, -0.111087, -0.956941, -0.268187, -0.212607, -0.92388, -0.318189, -0.146446, -0.92388, -0.353553, -0.074658, -0.980785, -0.180239, -0.108386, -0.980785, -0.162211, -0.161273, -0.956941, -0.241362, -0.074658, -0.980785, -0.180239, -0.161273, -0.956941, -0.241362, -0.111087, -0.956941, -0.268187, -0.037509, -0.995185, -0.090555, -0.054455, -0.995185, -0.081498, -0.108386, -0.980785, -0.162211, -0.037509, -0.995185, -0.090555, -0.108386, -0.980785, -0.162211, -0.074658, -0.980785, -0.180239, -0.019122, -0.995185, -0.096133, -0.037509, -0.995185, -0.090555, -0.074658, -0.980785, -0.180239, -0.019122, -0.995185, -0.096133, -0.074658, -0.980785, -0.180239, -0.03806, -0.980785, -0.191341, -0.03806, -0.980785, -0.191341, -0.074658, -0.980785, -0.180239, -0.111087, -0.956941, -0.268187, -0.03806, -0.980785, -0.191341, -0.111087, -0.956941, -0.268187, -0.056632, -0.956941, -0.284706, -0.056632, -0.956941, -0.284706, -0.111087, -0.956941, -0.268187, -0.146446, -0.92388, -0.353553, -0.056632, -0.956941, -0.284706, -0.146446, -0.92388, -0.353553, -0.074658, -0.92388, -0.37533, -0.074658, -0.92388, -0.37533, -0.146446, -0.92388, -0.353553, -0.180396, -0.881922, -0.435513, -0.074658, -0.92388, -0.37533, -0.180396, -0.881922, -0.435513, -0.091965, -0.881922, -0.462338, -0.091965, -0.881922, -0.462338, -0.180396, -0.881922, -0.435513, -0.212607, -0.83147, -0.513279, -0.091965, -0.881922, -0.462338, -0.212607, -0.83147, -0.513279, -0.108386, -0.83147, -0.544894, -0.108386, -0.83147, -0.544894, -0.212607, -0.83147, -0.513279, -0.242772, -0.773011, -0.586102, -0.108386, -0.83147, -0.544894, -0.242772, -0.773011, -0.586102, -0.123764, -0.773011, -0.622203, -0.123764, -0.773011, -0.622203, -0.242772, -0.773011, -0.586102, -0.270598, -0.707107, -0.653281, -0.123764, -0.773011, -0.622203, -0.270598, -0.707107, -0.653281, -0.13795, -0.707107, -0.693519, -0.13795, -0.707107, -0.693519, -0.270598, -0.707107, -0.653281, -0.295818, -0.634394, -0.714168, -0.13795, -0.707107, -0.693519, -0.295818, -0.634394, -0.714168, -0.150807, -0.634394, -0.758157, -0.150807, -0.634394, -0.758157, -0.295818, -0.634394, -0.714168, -0.31819, -0.555571, -0.768177, -0.150807, -0.634394, -0.758157, -0.31819, -0.555571, -0.768177, -0.162212, -0.555571, -0.815493, -0.162212, -0.555571, -0.815493, -0.31819, -0.555571, -0.768177, -0.337497, -0.471397, -0.814789, -0.162212, -0.555571, -0.815493, -0.337497, -0.471397, -0.814789, -0.172054, -0.471397, -0.864975, -0.172054, -0.471397, -0.864975, -0.337497, -0.471397, -0.814789, -0.353553, -0.382684, -0.853553, -0.172054, -0.471397, -0.864975, -0.353553, -0.382684, -0.853553, -0.18024, -0.382684, -0.906127, -0.18024, -0.382684, -0.906127, -0.353553, -0.382684, -0.853553, -0.366205, -0.290285, -0.884097, -0.18024, -0.382684, -0.906127, -0.366205, -0.290285, -0.884097, -0.18669, -0.290285, -0.938553, -0.18669, -0.290285, -0.938553, -0.366205, -0.290285, -0.884097, -0.191342, -0.195091, -0.96194, -0.366205, -0.290285, -0.884097, -0.37533, -0.195091, -0.906127, -0.191342, -0.195091, -0.96194, -0.191342, -0.195091, -0.96194, -0.37533, -0.195091, -0.906127, -0.380841, -0.098017, -0.91943, -0.191342, -0.195091, -0.96194, -0.380841, -0.098017, -0.91943, -0.194151, -0.098017, -0.976062, -0.194151, -0.098017, -0.976062, -0.380841, -0.098017, -0.91943, -0.19509, 0, -0.980785, -0.380841, -0.098017, -0.91943, -0.382683, 0, -0.923879, -0.19509, 0, -0.980785, -0.19509, 0, -0.980785, -0.382683, 0, -0.923879, -0.380841, 0.098017, -0.91943, -0.19509, 0, -0.980785, -0.380841, 0.098017, -0.91943, -0.194151, 0.098017, -0.976062, -0.194151, 0.098017, -0.976062, -0.380841, 0.098017, -0.91943, -0.191342, 0.19509, -0.96194, -0.380841, 0.098017, -0.91943, -0.37533, 0.19509, -0.906127, -0.191342, 0.19509, -0.96194, -0.191342, 0.19509, -0.96194, -0.37533, 0.19509, -0.906127, -0.366205, 0.290285, -0.884097, -0.191342, 0.19509, -0.96194, -0.366205, 0.290285, -0.884097, -0.18669, 0.290285, -0.938553, -0.18669, 0.290285, -0.938553, -0.366205, 0.290285, -0.884097, -0.353553, 0.382683, -0.853553, -0.18669, 0.290285, -0.938553, -0.353553, 0.382683, -0.853553, -0.18024, 0.382683, -0.906127, -0.18024, 0.382683, -0.906127, -0.353553, 0.382683, -0.853553, -0.172054, 0.471397, -0.864975, -0.353553, 0.382683, -0.853553, -0.337497, 0.471397, -0.814789, -0.172054, 0.471397, -0.864975, -0.172054, 0.471397, -0.864975, -0.337497, 0.471397, -0.814789, -0.162212, 0.55557, -0.815493, -0.337497, 0.471397, -0.814789, -0.31819, 0.55557, -0.768178, -0.162212, 0.55557, -0.815493, -0.162212, 0.55557, -0.815493, -0.31819, 0.55557, -0.768178, -0.295818, 0.634393, -0.714168, -0.162212, 0.55557, -0.815493, -0.295818, 0.634393, -0.714168, -0.150807, 0.634393, -0.758157, -0.150807, 0.634393, -0.758157, -0.295818, 0.634393, -0.714168, -0.270598, 0.707107, -0.653281, -0.150807, 0.634393, -0.758157, -0.270598, 0.707107, -0.653281, -0.13795, 0.707107, -0.69352, -0.13795, 0.707107, -0.69352, -0.270598, 0.707107, -0.653281, -0.242772, 0.77301, -0.586103, -0.13795, 0.707107, -0.69352, -0.242772, 0.77301, -0.586103, -0.123764, 0.77301, -0.622203, -0.123764, 0.77301, -0.622203, -0.242772, 0.77301, -0.586103, -0.212608, 0.83147, -0.51328, -0.123764, 0.77301, -0.622203, -0.212608, 0.83147, -0.51328, -0.108386, 0.83147, -0.544895, -0.108386, 0.83147, -0.544895, -0.212608, 0.83147, -0.51328, -0.180396, 0.881921, -0.435514, -0.108386, 0.83147, -0.544895, -0.180396, 0.881921, -0.435514, -0.091965, 0.881921, -0.462339, -0.091965, 0.881921, -0.462339, -0.180396, 0.881921, -0.435514, -0.146447, 0.92388, -0.353553, -0.091965, 0.881921, -0.462339, -0.146447, 0.92388, -0.353553, -0.074658, 0.92388, -0.37533, -0.074658, 0.92388, -0.37533, -0.146447, 0.92388, -0.353553, -0.111087, 0.95694, -0.268188, -0.074658, 0.92388, -0.37533, -0.111087, 0.95694, -0.268188, -0.056632, 0.95694, -0.284707, -0.056632, 0.95694, -0.284707, -0.111087, 0.95694, -0.268188, -0.074658, 0.980785, -0.18024, -0.056632, 0.95694, -0.284707, -0.074658, 0.980785, -0.18024, -0.03806, 0.980785, -0.191342, -0.03806, 0.980785, -0.191342, -0.074658, 0.980785, -0.18024, -0.03751, 0.995185, -0.090556, -0.03806, 0.980785, -0.191342, -0.03751, 0.995185, -0.090556, -0.019122, 0.995185, -0.096134, 0, 0.980785, -0.19509, -0.03806, 0.980785, -0.191342, -0.019122, 0.995185, -0.096134, 0, 0.980785, -0.19509, -0.019122, 0.995185, -0.096134, 0, 0.995185, -0.098017, 0, 0.95694, -0.290285, -0.056632, 0.95694, -0.284707, -0.03806, 0.980785, -0.191342, 0, 0.95694, -0.290285, -0.03806, 0.980785, -0.191342, 0, 0.980785, -0.19509, 0, 0.92388, -0.382683, -0.074658, 0.92388, -0.37533, -0.056632, 0.95694, -0.284707, 0, 0.92388, -0.382683, -0.056632, 0.95694, -0.284707, 0, 0.95694, -0.290285, 0, 0.881921, -0.471397, -0.091965, 0.881921, -0.462339, -0.074658, 0.92388, -0.37533, 0, 0.881921, -0.471397, -0.074658, 0.92388, -0.37533, 0, 0.92388, -0.382683, 0, 0.83147, -0.55557, -0.108386, 0.83147, -0.544895, -0.091965, 0.881921, -0.462339, 0, 0.83147, -0.55557, -0.091965, 0.881921, -0.462339, 0, 0.881921, -0.471397, 0, 0.77301, -0.634393, -0.123764, 0.77301, -0.622203, -0.108386, 0.83147, -0.544895, 0, 0.77301, -0.634393, -0.108386, 0.83147, -0.544895, 0, 0.83147, -0.55557, 0, 0.707107, -0.707107, -0.13795, 0.707107, -0.69352, -0.123764, 0.77301, -0.622203, 0, 0.707107, -0.707107, -0.123764, 0.77301, -0.622203, 0, 0.77301, -0.634393, 0, 0.634393, -0.77301, -0.150807, 0.634393, -0.758157, -0.13795, 0.707107, -0.69352, 0, 0.634393, -0.77301, -0.13795, 0.707107, -0.69352, 0, 0.707107, -0.707107, 0, 0.55557, -0.831469, -0.162212, 0.55557, -0.815493, -0.150807, 0.634393, -0.758157, 0, 0.55557, -0.831469, -0.150807, 0.634393, -0.758157, 0, 0.634393, -0.77301, 0, 0.471397, -0.881921, -0.172054, 0.471397, -0.864975, 0, 0.55557, -0.831469, -0.172054, 0.471397, -0.864975, -0.162212, 0.55557, -0.815493, 0, 0.55557, -0.831469, 0, 0.382683, -0.923879, -0.18024, 0.382683, -0.906127, 0, 0.471397, -0.881921, -0.18024, 0.382683, -0.906127, -0.172054, 0.471397, -0.864975, 0, 0.471397, -0.881921, 0, 0.290285, -0.95694, -0.18669, 0.290285, -0.938553, -0.18024, 0.382683, -0.906127, 0, 0.290285, -0.95694, -0.18024, 0.382683, -0.906127, 0, 0.382683, -0.923879, 0, 0.19509, -0.980785, -0.191342, 0.19509, -0.96194, -0.18669, 0.290285, -0.938553, 0, 0.19509, -0.980785, -0.18669, 0.290285, -0.938553, 0, 0.290285, -0.95694, 0, 0.098017, -0.995184, -0.194151, 0.098017, -0.976062, 0, 0.19509, -0.980785, -0.194151, 0.098017, -0.976062, -0.191342, 0.19509, -0.96194, 0, 0.19509, -0.980785, 0, 0, -1, -0.19509, 0, -0.980785, -0.194151, 0.098017, -0.976062, 0, 0, -1, -0.194151, 0.098017, -0.976062, 0, 0.098017, -0.995184, 0, -0.098017, -0.995184, -0.194151, -0.098017, -0.976062, 0, 0, -1, -0.194151, -0.098017, -0.976062, -0.19509, 0, -0.980785, 0, 0, -1, 0, -0.195091, -0.980785, -0.191342, -0.195091, -0.96194, -0.194151, -0.098017, -0.976062, 0, -0.195091, -0.980785, -0.194151, -0.098017, -0.976062, 0, -0.098017, -0.995184, 0, -0.290285, -0.95694, -0.18669, -0.290285, -0.938553, 0, -0.195091, -0.980785, -0.18669, -0.290285, -0.938553, -0.191342, -0.195091, -0.96194, 0, -0.195091, -0.980785, 0, -0.382684, -0.923879, -0.18024, -0.382684, -0.906127, -0.18669, -0.290285, -0.938553, 0, -0.382684, -0.923879, -0.18669, -0.290285, -0.938553, 0, -0.290285, -0.95694, 0, -0.471397, -0.881921, -0.172054, -0.471397, -0.864975, -0.18024, -0.382684, -0.906127, 0, -0.471397, -0.881921, -0.18024, -0.382684, -0.906127, 0, -0.382684, -0.923879, 0, -0.555571, -0.831469, -0.162212, -0.555571, -0.815493, -0.172054, -0.471397, -0.864975, 0, -0.555571, -0.831469, -0.172054, -0.471397, -0.864975, 0, -0.471397, -0.881921, 0, -0.634394, -0.77301, -0.150807, -0.634394, -0.758157, -0.162212, -0.555571, -0.815493, 0, -0.634394, -0.77301, -0.162212, -0.555571, -0.815493, 0, -0.555571, -0.831469, 0, -0.707107, -0.707106, -0.13795, -0.707107, -0.693519, -0.150807, -0.634394, -0.758157, 0, -0.707107, -0.707106, -0.150807, -0.634394, -0.758157, 0, -0.634394, -0.77301, 0, -0.773011, -0.634393, -0.123764, -0.773011, -0.622203, -0.13795, -0.707107, -0.693519, 0, -0.773011, -0.634393, -0.13795, -0.707107, -0.693519, 0, -0.707107, -0.707106, 0, -0.83147, -0.55557, -0.108386, -0.83147, -0.544894, -0.123764, -0.773011, -0.622203, 0, -0.83147, -0.55557, -0.123764, -0.773011, -0.622203, 0, -0.773011, -0.634393, 0, -0.881922, -0.471396, -0.091965, -0.881922, -0.462338, -0.108386, -0.83147, -0.544894, 0, -0.881922, -0.471396, -0.108386, -0.83147, -0.544894, 0, -0.83147, -0.55557, 0, -0.92388, -0.382683, -0.074658, -0.92388, -0.37533, -0.091965, -0.881922, -0.462338, 0, -0.92388, -0.382683, -0.091965, -0.881922, -0.462338, 0, -0.881922, -0.471396, 0, -0.956941, -0.290284, -0.056632, -0.956941, -0.284706, -0.074658, -0.92388, -0.37533, 0, -0.956941, -0.290284, -0.074658, -0.92388, -0.37533, 0, -0.92388, -0.382683, 0, -0.980785, -0.19509, -0.03806, -0.980785, -0.191341, -0.056632, -0.956941, -0.284706, 0, -0.980785, -0.19509, -0.056632, -0.956941, -0.284706, 0, -0.956941, -0.290284, 0, -0.995185, -0.098016, -0.019122, -0.995185, -0.096133, -0.03806, -0.980785, -0.191341, 0, -0.995185, -0.098016, -0.03806, -0.980785, -0.191341, 0, -0.980785, -0.19509, 0.019122, -0.995185, -0.096133, 0, -0.995185, -0.098016, 0, -0.980785, -0.19509, 0.019122, -0.995185, -0.096133, 0, -0.980785, -0.19509, 0.03806, -0.980785, -0.191341, 0.03806, -0.980785, -0.191341, 0, -0.980785, -0.19509, 0, -0.956941, -0.290284, 0.03806, -0.980785, -0.191341, 0, -0.956941, -0.290284, 0.056632, -0.956941, -0.284706, 0.056632, -0.956941, -0.284706, 0, -0.956941, -0.290284, 0, -0.92388, -0.382683, 0.056632, -0.956941, -0.284706, 0, -0.92388, -0.382683, 0.074658, -0.92388, -0.37533, 0.074658, -0.92388, -0.37533, 0, -0.92388, -0.382683, 0, -0.881922, -0.471396, 0.074658, -0.92388, -0.37533, 0, -0.881922, -0.471396, 0.091965, -0.881922, -0.462338, 0.091965, -0.881922, -0.462338, 0, -0.881922, -0.471396, 0, -0.83147, -0.55557, 0.091965, -0.881922, -0.462338, 0, -0.83147, -0.55557, 0.108386, -0.83147, -0.544894, 0.108386, -0.83147, -0.544894, 0, -0.83147, -0.55557, 0, -0.773011, -0.634393, 0.108386, -0.83147, -0.544894, 0, -0.773011, -0.634393, 0.123764, -0.773011, -0.622203, 0.123764, -0.773011, -0.622203, 0, -0.773011, -0.634393, 0, -0.707107, -0.707106, 0.123764, -0.773011, -0.622203, 0, -0.707107, -0.707106, 0.13795, -0.707107, -0.693519, 0.13795, -0.707107, -0.693519, 0, -0.707107, -0.707106, 0, -0.634394, -0.77301, 0.13795, -0.707107, -0.693519, 0, -0.634394, -0.77301, 0.150807, -0.634394, -0.758157, 0.150807, -0.634394, -0.758157, 0, -0.634394, -0.77301, 0, -0.555571, -0.831469, 0.150807, -0.634394, -0.758157, 0, -0.555571, -0.831469, 0.162212, -0.555571, -0.815493, 0.162212, -0.555571, -0.815493, 0, -0.555571, -0.831469, 0, -0.471397, -0.881921, 0.162212, -0.555571, -0.815493, 0, -0.471397, -0.881921, 0.172054, -0.471397, -0.864975, 0.172054, -0.471397, -0.864975, 0, -0.471397, -0.881921, 0, -0.382684, -0.923879, 0.172054, -0.471397, -0.864975, 0, -0.382684, -0.923879, 0.18024, -0.382684, -0.906127, 0.18024, -0.382684, -0.906127, 0, -0.382684, -0.923879, 0, -0.290285, -0.95694, 0.18024, -0.382684, -0.906127, 0, -0.290285, -0.95694, 0.18669, -0.290285, -0.938553, 0.18669, -0.290285, -0.938553, 0, -0.290285, -0.95694, 0.191342, -0.195091, -0.96194, 0, -0.290285, -0.95694, 0, -0.195091, -0.980785, 0.191342, -0.195091, -0.96194, 0.191342, -0.195091, -0.96194, 0, -0.195091, -0.980785, 0, -0.098017, -0.995184, 0.191342, -0.195091, -0.96194, 0, -0.098017, -0.995184, 0.194151, -0.098017, -0.976062, 0.194151, -0.098017, -0.976062, 0, -0.098017, -0.995184, 0.19509, 0, -0.980785, 0, -0.098017, -0.995184, 0, 0, -1, 0.19509, 0, -0.980785, 0.19509, 0, -0.980785, 0, 0, -1, 0, 0.098017, -0.995184, 0.19509, 0, -0.980785, 0, 0.098017, -0.995184, 0.194151, 0.098017, -0.976062, 0.194151, 0.098017, -0.976062, 0, 0.098017, -0.995184, 0.191342, 0.19509, -0.96194, 0, 0.098017, -0.995184, 0, 0.19509, -0.980785, 0.191342, 0.19509, -0.96194, 0.191342, 0.19509, -0.96194, 0, 0.19509, -0.980785, 0, 0.290285, -0.95694, 0.191342, 0.19509, -0.96194, 0, 0.290285, -0.95694, 0.18669, 0.290285, -0.938553, 0.18669, 0.290285, -0.938553, 0, 0.290285, -0.95694, 0, 0.382683, -0.923879, 0.18669, 0.290285, -0.938553, 0, 0.382683, -0.923879, 0.18024, 0.382683, -0.906127, 0.18024, 0.382683, -0.906127, 0, 0.382683, -0.923879, 0.172054, 0.471397, -0.864975, 0, 0.382683, -0.923879, 0, 0.471397, -0.881921, 0.172054, 0.471397, -0.864975, 0.172054, 0.471397, -0.864975, 0, 0.471397, -0.881921, 0, 0.55557, -0.831469, 0.172054, 0.471397, -0.864975, 0, 0.55557, -0.831469, 0.162212, 0.55557, -0.815493, 0.162212, 0.55557, -0.815493, 0, 0.55557, -0.831469, 0, 0.634393, -0.77301, 0.162212, 0.55557, -0.815493, 0, 0.634393, -0.77301, 0.150807, 0.634393, -0.758157, 0.150807, 0.634393, -0.758157, 0, 0.634393, -0.77301, 0, 0.707107, -0.707107, 0.150807, 0.634393, -0.758157, 0, 0.707107, -0.707107, 0.13795, 0.707107, -0.69352, 0.13795, 0.707107, -0.69352, 0, 0.707107, -0.707107, 0, 0.77301, -0.634393, 0.13795, 0.707107, -0.69352, 0, 0.77301, -0.634393, 0.123764, 0.77301, -0.622204, 0.123764, 0.77301, -0.622204, 0, 0.77301, -0.634393, 0, 0.83147, -0.55557, 0.123764, 0.77301, -0.622204, 0, 0.83147, -0.55557, 0.108386, 0.83147, -0.544895, 0.108386, 0.83147, -0.544895, 0, 0.83147, -0.55557, 0, 0.881921, -0.471397, 0.108386, 0.83147, -0.544895, 0, 0.881921, -0.471397, 0.091965, 0.881921, -0.462339, 0.091965, 0.881921, -0.462339, 0, 0.881921, -0.471397, 0, 0.92388, -0.382683, 0.091965, 0.881921, -0.462339, 0, 0.92388, -0.382683, 0.074658, 0.92388, -0.37533, 0.074658, 0.92388, -0.37533, 0, 0.92388, -0.382683, 0, 0.95694, -0.290285, 0.074658, 0.92388, -0.37533, 0, 0.95694, -0.290285, 0.056632, 0.95694, -0.284707, 0.056632, 0.95694, -0.284707, 0, 0.95694, -0.290285, 0, 0.980785, -0.19509, 0.056632, 0.95694, -0.284707, 0, 0.980785, -0.19509, 0.03806, 0.980785, -0.191342, 0.03806, 0.980785, -0.191342, 0, 0.980785, -0.19509, 0, 0.995185, -0.098017, 0.03806, 0.980785, -0.191342, 0, 0.995185, -0.098017, 0.019122, 0.995185, -0.096134, 0.074658, 0.980785, -0.18024, 0.03806, 0.980785, -0.191342, 0.019122, 0.995185, -0.096134, 0.074658, 0.980785, -0.18024, 0.019122, 0.995185, -0.096134, 0.03751, 0.995185, -0.090556, 0.111087, 0.95694, -0.268188, 0.056632, 0.95694, -0.284707, 0.03806, 0.980785, -0.191342, 0.111087, 0.95694, -0.268188, 0.03806, 0.980785, -0.191342, 0.074658, 0.980785, -0.18024, 0.146447, 0.92388, -0.353553, 0.074658, 0.92388, -0.37533, 0.056632, 0.95694, -0.284707, 0.146447, 0.92388, -0.353553, 0.056632, 0.95694, -0.284707, 0.111087, 0.95694, -0.268188, 0.180396, 0.881921, -0.435514, 0.091965, 0.881921, -0.462339, 0.074658, 0.92388, -0.37533, 0.180396, 0.881921, -0.435514, 0.074658, 0.92388, -0.37533, 0.146447, 0.92388, -0.353553, 0.212607, 0.83147, -0.51328, 0.108386, 0.83147, -0.544895, 0.091965, 0.881921, -0.462339, 0.212607, 0.83147, -0.51328, 0.091965, 0.881921, -0.462339, 0.180396, 0.881921, -0.435514, 0.242772, 0.77301, -0.586103, 0.123764, 0.77301, -0.622204, 0.108386, 0.83147, -0.544895, 0.242772, 0.77301, -0.586103, 0.108386, 0.83147, -0.544895, 0.212607, 0.83147, -0.51328, 0.270598, 0.707107, -0.653282, 0.13795, 0.707107, -0.69352, 0.123764, 0.77301, -0.622204, 0.270598, 0.707107, -0.653282, 0.123764, 0.77301, -0.622204, 0.242772, 0.77301, -0.586103, 0.295818, 0.634393, -0.714168, 0.150807, 0.634393, -0.758157, 0.13795, 0.707107, -0.69352, 0.295818, 0.634393, -0.714168, 0.13795, 0.707107, -0.69352, 0.270598, 0.707107, -0.653282, 0.31819, 0.55557, -0.768178, 0.162212, 0.55557, -0.815493, 0.150807, 0.634393, -0.758157, 0.31819, 0.55557, -0.768178, 0.150807, 0.634393, -0.758157, 0.295818, 0.634393, -0.714168, 0.337497, 0.471397, -0.814789, 0.172054, 0.471397, -0.864975, 0.31819, 0.55557, -0.768178, 0.172054, 0.471397, -0.864975, 0.162212, 0.55557, -0.815493, 0.31819, 0.55557, -0.768178, 0.353553, 0.382683, -0.853553, 0.18024, 0.382683, -0.906127, 0.172054, 0.471397, -0.864975, 0.353553, 0.382683, -0.853553, 0.172054, 0.471397, -0.864975, 0.337497, 0.471397, -0.814789, 0.366205, 0.290285, -0.884098, 0.18669, 0.290285, -0.938553, 0.18024, 0.382683, -0.906127, 0.366205, 0.290285, -0.884098, 0.18024, 0.382683, -0.906127, 0.353553, 0.382683, -0.853553, 0.37533, 0.19509, -0.906127, 0.191342, 0.19509, -0.96194, 0.18669, 0.290285, -0.938553, 0.37533, 0.19509, -0.906127, 0.18669, 0.290285, -0.938553, 0.366205, 0.290285, -0.884098, 0.380841, 0.098017, -0.919431, 0.194151, 0.098017, -0.976062, 0.37533, 0.19509, -0.906127, 0.194151, 0.098017, -0.976062, 0.191342, 0.19509, -0.96194, 0.37533, 0.19509, -0.906127, 0.382683, 0, -0.923879, 0.19509, 0, -0.980785, 0.194151, 0.098017, -0.976062, 0.382683, 0, -0.923879, 0.194151, 0.098017, -0.976062, 0.380841, 0.098017, -0.919431, 0.380841, -0.098017, -0.919431, 0.194151, -0.098017, -0.976062, 0.382683, 0, -0.923879, 0.194151, -0.098017, -0.976062, 0.19509, 0, -0.980785, 0.382683, 0, -0.923879, 0.37533, -0.195091, -0.906127, 0.191342, -0.195091, -0.96194, 0.194151, -0.098017, -0.976062, 0.37533, -0.195091, -0.906127, 0.194151, -0.098017, -0.976062, 0.380841, -0.098017, -0.919431, 0.366205, -0.290285, -0.884097, 0.18669, -0.290285, -0.938553, 0.37533, -0.195091, -0.906127, 0.18669, -0.290285, -0.938553, 0.191342, -0.195091, -0.96194, 0.37533, -0.195091, -0.906127, 0.353553, -0.382684, -0.853553, 0.18024, -0.382684, -0.906127, 0.18669, -0.290285, -0.938553, 0.353553, -0.382684, -0.853553, 0.18669, -0.290285, -0.938553, 0.366205, -0.290285, -0.884097, 0.337497, -0.471397, -0.814789, 0.172054, -0.471397, -0.864975, 0.18024, -0.382684, -0.906127, 0.337497, -0.471397, -0.814789, 0.18024, -0.382684, -0.906127, 0.353553, -0.382684, -0.853553, 0.31819, -0.555571, -0.768177, 0.162212, -0.555571, -0.815493, 0.172054, -0.471397, -0.864975, 0.31819, -0.555571, -0.768177, 0.172054, -0.471397, -0.864975, 0.337497, -0.471397, -0.814789, 0.295818, -0.634394, -0.714168, 0.150807, -0.634394, -0.758157, 0.162212, -0.555571, -0.815493, 0.295818, -0.634394, -0.714168, 0.162212, -0.555571, -0.815493, 0.31819, -0.555571, -0.768177, 0.270598, -0.707107, -0.653281, 0.13795, -0.707107, -0.693519, 0.150807, -0.634394, -0.758157, 0.270598, -0.707107, -0.653281, 0.150807, -0.634394, -0.758157, 0.295818, -0.634394, -0.714168, 0.242772, -0.773011, -0.586102, 0.123764, -0.773011, -0.622203, 0.13795, -0.707107, -0.693519, 0.242772, -0.773011, -0.586102, 0.13795, -0.707107, -0.693519, 0.270598, -0.707107, -0.653281, 0.212607, -0.83147, -0.513279, 0.108386, -0.83147, -0.544894, 0.123764, -0.773011, -0.622203, 0.212607, -0.83147, -0.513279, 0.123764, -0.773011, -0.622203, 0.242772, -0.773011, -0.586102, 0.180395, -0.881922, -0.435513, 0.091965, -0.881922, -0.462338, 0.108386, -0.83147, -0.544894, 0.180395, -0.881922, -0.435513, 0.108386, -0.83147, -0.544894, 0.212607, -0.83147, -0.513279, 0.146446, -0.92388, -0.353553, 0.074658, -0.92388, -0.37533, 0.091965, -0.881922, -0.462338, 0.146446, -0.92388, -0.353553, 0.091965, -0.881922, -0.462338, 0.180395, -0.881922, -0.435513, 0.111087, -0.956941, -0.268187, 0.056632, -0.956941, -0.284706, 0.074658, -0.92388, -0.37533, 0.111087, -0.956941, -0.268187, 0.074658, -0.92388, -0.37533, 0.146446, -0.92388, -0.353553, 0.074658, -0.980785, -0.180239, 0.03806, -0.980785, -0.191341, 0.056632, -0.956941, -0.284706, 0.074658, -0.980785, -0.180239, 0.056632, -0.956941, -0.284706, 0.111087, -0.956941, -0.268187, 0.037509, -0.995185, -0.090555, 0.019122, -0.995185, -0.096133, 0.03806, -0.980785, -0.191341, 0.037509, -0.995185, -0.090555, 0.03806, -0.980785, -0.191341, 0.074658, -0.980785, -0.180239, 0.054455, -0.995185, -0.081498, 0.037509, -0.995185, -0.090555, 0.074658, -0.980785, -0.180239, 0.054455, -0.995185, -0.081498, 0.074658, -0.980785, -0.180239, 0.108386, -0.980785, -0.162211, 0.108386, -0.980785, -0.162211, 0.074658, -0.980785, -0.180239, 0.111087, -0.956941, -0.268187, 0.108386, -0.980785, -0.162211, 0.111087, -0.956941, -0.268187, 0.161273, -0.956941, -0.241362, 0.161273, -0.956941, -0.241362, 0.111087, -0.956941, -0.268187, 0.146446, -0.92388, -0.353553, 0.161273, -0.956941, -0.241362, 0.146446, -0.92388, -0.353553, 0.212607, -0.92388, -0.318189, 0.212607, -0.92388, -0.318189, 0.146446, -0.92388, -0.353553, 0.180395, -0.881922, -0.435513, 0.212607, -0.92388, -0.318189, 0.180395, -0.881922, -0.435513, 0.261894, -0.881922, -0.391952, 0.261894, -0.881922, -0.391952, 0.180395, -0.881922, -0.435513, 0.212607, -0.83147, -0.513279, 0.261894, -0.881922, -0.391952, 0.212607, -0.83147, -0.513279, 0.308658, -0.83147, -0.461939, 0.308658, -0.83147, -0.461939, 0.212607, -0.83147, -0.513279, 0.242772, -0.773011, -0.586102, 0.308658, -0.83147, -0.461939, 0.242772, -0.773011, -0.586102, 0.35245, -0.773011, -0.527478, 0.35245, -0.773011, -0.527478, 0.242772, -0.773011, -0.586102, 0.270598, -0.707107, -0.653281, 0.35245, -0.773011, -0.527478, 0.270598, -0.707107, -0.653281, 0.392847, -0.707107, -0.587937, 0.392847, -0.707107, -0.587937, 0.270598, -0.707107, -0.653281, 0.295818, -0.634394, -0.714168, 0.392847, -0.707107, -0.587937, 0.295818, -0.634394, -0.714168, 0.429461, -0.634394, -0.642734, 0.429461, -0.634394, -0.642734, 0.295818, -0.634394, -0.714168, 0.31819, -0.555571, -0.768177, 0.429461, -0.634394, -0.642734, 0.31819, -0.555571, -0.768177, 0.46194, -0.555571, -0.691341, 0.46194, -0.555571, -0.691341, 0.31819, -0.555571, -0.768177, 0.337497, -0.471397, -0.814789, 0.46194, -0.555571, -0.691341, 0.337497, -0.471397, -0.814789, 0.489969, -0.471397, -0.73329, 0.489969, -0.471397, -0.73329, 0.337497, -0.471397, -0.814789, 0.353553, -0.382684, -0.853553, 0.489969, -0.471397, -0.73329, 0.353553, -0.382684, -0.853553, 0.51328, -0.382684, -0.768178, 0.51328, -0.382684, -0.768178, 0.353553, -0.382684, -0.853553, 0.366205, -0.290285, -0.884097, 0.51328, -0.382684, -0.768178, 0.366205, -0.290285, -0.884097, 0.531647, -0.290285, -0.795667, 0.531647, -0.290285, -0.795667, 0.366205, -0.290285, -0.884097, 0.544895, -0.195091, -0.815493, 0.366205, -0.290285, -0.884097, 0.37533, -0.195091, -0.906127, 0.544895, -0.195091, -0.815493, 0.544895, -0.195091, -0.815493, 0.37533, -0.195091, -0.906127, 0.380841, -0.098017, -0.919431, 0.544895, -0.195091, -0.815493, 0.380841, -0.098017, -0.919431, 0.552895, -0.098017, -0.827466, 0.552895, -0.098017, -0.827466, 0.380841, -0.098017, -0.919431, 0.55557, 0, -0.83147, 0.380841, -0.098017, -0.919431, 0.382683, 0, -0.923879, 0.55557, 0, -0.83147, 0.55557, 0, -0.83147, 0.382683, 0, -0.923879, 0.380841, 0.098017, -0.919431, 0.55557, 0, -0.83147, 0.380841, 0.098017, -0.919431, 0.552895, 0.098017, -0.827466, 0.552895, 0.098017, -0.827466, 0.380841, 0.098017, -0.919431, 0.544895, 0.19509, -0.815493, 0.380841, 0.098017, -0.919431, 0.37533, 0.19509, -0.906127, 0.544895, 0.19509, -0.815493, 0.544895, 0.19509, -0.815493, 0.37533, 0.19509, -0.906127, 0.366205, 0.290285, -0.884098, 0.544895, 0.19509, -0.815493, 0.366205, 0.290285, -0.884098, 0.531647, 0.290285, -0.795667, 0.531647, 0.290285, -0.795667, 0.366205, 0.290285, -0.884098, 0.353553, 0.382683, -0.853553, 0.531647, 0.290285, -0.795667, 0.353553, 0.382683, -0.853553, 0.51328, 0.382683, -0.768178, 0.51328, 0.382683, -0.768178, 0.353553, 0.382683, -0.853553, 0.489969, 0.471397, -0.733291, 0.353553, 0.382683, -0.853553, 0.337497, 0.471397, -0.814789, 0.489969, 0.471397, -0.733291, 0.489969, 0.471397, -0.733291, 0.337497, 0.471397, -0.814789, 0.46194, 0.55557, -0.691342, 0.337497, 0.471397, -0.814789, 0.31819, 0.55557, -0.768178, 0.46194, 0.55557, -0.691342, 0.46194, 0.55557, -0.691342, 0.31819, 0.55557, -0.768178, 0.295818, 0.634393, -0.714168, 0.46194, 0.55557, -0.691342, 0.295818, 0.634393, -0.714168, 0.429462, 0.634393, -0.642735, 0.429462, 0.634393, -0.642735, 0.295818, 0.634393, -0.714168, 0.270598, 0.707107, -0.653282, 0.429462, 0.634393, -0.642735, 0.270598, 0.707107, -0.653282, 0.392847, 0.707107, -0.587938, 0.392847, 0.707107, -0.587938, 0.270598, 0.707107, -0.653282, 0.242772, 0.77301, -0.586103, 0.392847, 0.707107, -0.587938, 0.242772, 0.77301, -0.586103, 0.35245, 0.77301, -0.527479, 0.35245, 0.77301, -0.527479, 0.242772, 0.77301, -0.586103, 0.212607, 0.83147, -0.51328, 0.35245, 0.77301, -0.527479, 0.212607, 0.83147, -0.51328, 0.308658, 0.83147, -0.46194, 0.308658, 0.83147, -0.46194, 0.212607, 0.83147, -0.51328, 0.180396, 0.881921, -0.435514, 0.308658, 0.83147, -0.46194, 0.180396, 0.881921, -0.435514, 0.261894, 0.881921, -0.391952, 0.261894, 0.881921, -0.391952, 0.180396, 0.881921, -0.435514, 0.146447, 0.92388, -0.353553, 0.261894, 0.881921, -0.391952, 0.146447, 0.92388, -0.353553, 0.212608, 0.92388, -0.31819, 0.212608, 0.92388, -0.31819, 0.146447, 0.92388, -0.353553, 0.111087, 0.95694, -0.268188, 0.212608, 0.92388, -0.31819, 0.111087, 0.95694, -0.268188, 0.161273, 0.95694, -0.241363, 0.161273, 0.95694, -0.241363, 0.111087, 0.95694, -0.268188, 0.074658, 0.980785, -0.18024, 0.161273, 0.95694, -0.241363, 0.074658, 0.980785, -0.18024, 0.108386, 0.980785, -0.162212, 0.108386, 0.980785, -0.162212, 0.074658, 0.980785, -0.18024, 0.03751, 0.995185, -0.090556, 0.108386, 0.980785, -0.162212, 0.03751, 0.995185, -0.090556, 0.054455, 0.995185, -0.081498, 0.13795, 0.980785, -0.13795, 0.108386, 0.980785, -0.162212, 0.054455, 0.995185, -0.081498, 0.13795, 0.980785, -0.13795, 0.054455, 0.995185, -0.081498, 0.069309, 0.995185, -0.069309, 0.205262, 0.95694, -0.205262, 0.161273, 0.95694, -0.241363, 0.108386, 0.980785, -0.162212, 0.205262, 0.95694, -0.205262, 0.108386, 0.980785, -0.162212, 0.13795, 0.980785, -0.13795, 0.270598, 0.92388, -0.270598, 0.212608, 0.92388, -0.31819, 0.161273, 0.95694, -0.241363, 0.270598, 0.92388, -0.270598, 0.161273, 0.95694, -0.241363, 0.205262, 0.95694, -0.205262, 0.333328, 0.881921, -0.333328, 0.261894, 0.881921, -0.391952, 0.212608, 0.92388, -0.31819, 0.333328, 0.881921, -0.333328, 0.212608, 0.92388, -0.31819, 0.270598, 0.92388, -0.270598, 0.392847, 0.83147, -0.392847, 0.308658, 0.83147, -0.46194, 0.261894, 0.881921, -0.391952, 0.392847, 0.83147, -0.392847, 0.261894, 0.881921, -0.391952, 0.333328, 0.881921, -0.333328, 0.448584, 0.77301, -0.448584, 0.35245, 0.77301, -0.527479, 0.308658, 0.83147, -0.46194, 0.448584, 0.77301, -0.448584, 0.308658, 0.83147, -0.46194, 0.392847, 0.83147, -0.392847, 0.5, 0.707107, -0.5, 0.392847, 0.707107, -0.587938, 0.35245, 0.77301, -0.527479, 0.5, 0.707107, -0.5, 0.35245, 0.77301, -0.527479, 0.448584, 0.77301, -0.448584, 0.546601, 0.634393, -0.546601, 0.429462, 0.634393, -0.642735, 0.392847, 0.707107, -0.587938, 0.546601, 0.634393, -0.546601, 0.392847, 0.707107, -0.587938, 0.5, 0.707107, -0.5, 0.587938, 0.55557, -0.587938, 0.46194, 0.55557, -0.691342, 0.429462, 0.634393, -0.642735, 0.587938, 0.55557, -0.587938, 0.429462, 0.634393, -0.642735, 0.546601, 0.634393, -0.546601, 0.623612, 0.471397, -0.623612, 0.489969, 0.471397, -0.733291, 0.46194, 0.55557, -0.691342, 0.623612, 0.471397, -0.623612, 0.46194, 0.55557, -0.691342, 0.587938, 0.55557, -0.587938, 0.653281, 0.382683, -0.653281, 0.51328, 0.382683, -0.768178, 0.623612, 0.471397, -0.623612, 0.51328, 0.382683, -0.768178, 0.489969, 0.471397, -0.733291, 0.623612, 0.471397, -0.623612, 0.676659, 0.290285, -0.676659, 0.531647, 0.290285, -0.795667, 0.51328, 0.382683, -0.768178, 0.676659, 0.290285, -0.676659, 0.51328, 0.382683, -0.768178, 0.653281, 0.382683, -0.653281, 0.69352, 0.19509, -0.69352, 0.544895, 0.19509, -0.815493, 0.531647, 0.290285, -0.795667, 0.69352, 0.19509, -0.69352, 0.531647, 0.290285, -0.795667, 0.676659, 0.290285, -0.676659, 0.703702, 0.098017, -0.703702, 0.552895, 0.098017, -0.827466, 0.69352, 0.19509, -0.69352, 0.552895, 0.098017, -0.827466, 0.544895, 0.19509, -0.815493, 0.69352, 0.19509, -0.69352, 0.707107, 0, -0.707107, 0.55557, 0, -0.83147, 0.552895, 0.098017, -0.827466, 0.707107, 0, -0.707107, 0.552895, 0.098017, -0.827466, 0.703702, 0.098017, -0.703702, 0.703702, -0.098017, -0.703702, 0.552895, -0.098017, -0.827466, 0.707107, 0, -0.707107, 0.552895, -0.098017, -0.827466, 0.55557, 0, -0.83147, 0.707107, 0, -0.707107, 0.69352, -0.195091, -0.69352, 0.544895, -0.195091, -0.815493, 0.552895, -0.098017, -0.827466, 0.69352, -0.195091, -0.69352, 0.552895, -0.098017, -0.827466, 0.703702, -0.098017, -0.703702, 0.676659, -0.290285, -0.676659, 0.531647, -0.290285, -0.795667, 0.69352, -0.195091, -0.69352, 0.531647, -0.290285, -0.795667, 0.544895, -0.195091, -0.815493, 0.69352, -0.195091, -0.69352, 0.653281, -0.382684, -0.653281, 0.51328, -0.382684, -0.768178, 0.531647, -0.290285, -0.795667, 0.653281, -0.382684, -0.653281, 0.531647, -0.290285, -0.795667, 0.676659, -0.290285, -0.676659, 0.623612, -0.471397, -0.623612, 0.489969, -0.471397, -0.73329, 0.51328, -0.382684, -0.768178, 0.623612, -0.471397, -0.623612, 0.51328, -0.382684, -0.768178, 0.653281, -0.382684, -0.653281, 0.587938, -0.555571, -0.587938, 0.46194, -0.555571, -0.691341, 0.489969, -0.471397, -0.73329, 0.587938, -0.555571, -0.587938, 0.489969, -0.471397, -0.73329, 0.623612, -0.471397, -0.623612, 0.546601, -0.634394, -0.546601, 0.429461, -0.634394, -0.642734, 0.46194, -0.555571, -0.691341, 0.546601, -0.634394, -0.546601, 0.46194, -0.555571, -0.691341, 0.587938, -0.555571, -0.587938, 0.5, -0.707107, -0.5, 0.392847, -0.707107, -0.587937, 0.429461, -0.634394, -0.642734, 0.5, -0.707107, -0.5, 0.429461, -0.634394, -0.642734, 0.546601, -0.634394, -0.546601, 0.448583, -0.773011, -0.448583, 0.35245, -0.773011, -0.527478, 0.392847, -0.707107, -0.587937, 0.448583, -0.773011, -0.448583, 0.392847, -0.707107, -0.587937, 0.5, -0.707107, -0.5, 0.392847, -0.83147, -0.392847, 0.308658, -0.83147, -0.461939, 0.35245, -0.773011, -0.527478, 0.392847, -0.83147, -0.392847, 0.35245, -0.773011, -0.527478, 0.448583, -0.773011, -0.448583, 0.333327, -0.881922, -0.333327, 0.261894, -0.881922, -0.391952, 0.308658, -0.83147, -0.461939, 0.333327, -0.881922, -0.333327, 0.308658, -0.83147, -0.461939, 0.392847, -0.83147, -0.392847, 0.270598, -0.92388, -0.270598, 0.212607, -0.92388, -0.318189, 0.261894, -0.881922, -0.391952, 0.270598, -0.92388, -0.270598, 0.261894, -0.881922, -0.391952, 0.333327, -0.881922, -0.333327, 0.205262, -0.956941, -0.205262, 0.161273, -0.956941, -0.241362, 0.212607, -0.92388, -0.318189, 0.205262, -0.956941, -0.205262, 0.212607, -0.92388, -0.318189, 0.270598, -0.92388, -0.270598, 0.137949, -0.980785, -0.137949, 0.108386, -0.980785, -0.162211, 0.161273, -0.956941, -0.241362, 0.137949, -0.980785, -0.137949, 0.161273, -0.956941, -0.241362, 0.205262, -0.956941, -0.205262, 0.069308, -0.995185, -0.069308, 0.054455, -0.995185, -0.081498, 0.108386, -0.980785, -0.162211, 0.069308, -0.995185, -0.069308, 0.108386, -0.980785, -0.162211, 0.137949, -0.980785, -0.137949, 0.081498, -0.995185, -0.054455, 0.069308, -0.995185, -0.069308, 0.137949, -0.980785, -0.137949, 0.081498, -0.995185, -0.054455, 0.137949, -0.980785, -0.137949, 0.162211, -0.980785, -0.108386, 0.162211, -0.980785, -0.108386, 0.137949, -0.980785, -0.137949, 0.205262, -0.956941, -0.205262, 0.162211, -0.980785, -0.108386, 0.205262, -0.956941, -0.205262, 0.241362, -0.956941, -0.161273, 0.241362, -0.956941, -0.161273, 0.205262, -0.956941, -0.205262, 0.270598, -0.92388, -0.270598, 0.241362, -0.956941, -0.161273, 0.270598, -0.92388, -0.270598, 0.318189, -0.92388, -0.212607, 0.318189, -0.92388, -0.212607, 0.270598, -0.92388, -0.270598, 0.333327, -0.881922, -0.333327, 0.318189, -0.92388, -0.212607, 0.333327, -0.881922, -0.333327, 0.391952, -0.881922, -0.261894, 0.391952, -0.881922, -0.261894, 0.333327, -0.881922, -0.333327, 0.392847, -0.83147, -0.392847, 0.391952, -0.881922, -0.261894, 0.392847, -0.83147, -0.392847, 0.461939, -0.83147, -0.308658, 0.461939, -0.83147, -0.308658, 0.392847, -0.83147, -0.392847, 0.448583, -0.773011, -0.448583, 0.461939, -0.83147, -0.308658, 0.448583, -0.773011, -0.448583, 0.527478, -0.773011, -0.35245, 0.527478, -0.773011, -0.35245, 0.448583, -0.773011, -0.448583, 0.5, -0.707107, -0.5, 0.527478, -0.773011, -0.35245, 0.5, -0.707107, -0.5, 0.587937, -0.707107, -0.392847, 0.587937, -0.707107, -0.392847, 0.5, -0.707107, -0.5, 0.546601, -0.634394, -0.546601, 0.587937, -0.707107, -0.392847, 0.546601, -0.634394, -0.546601, 0.642734, -0.634394, -0.429461, 0.642734, -0.634394, -0.429461, 0.546601, -0.634394, -0.546601, 0.587938, -0.555571, -0.587938, 0.642734, -0.634394, -0.429461, 0.587938, -0.555571, -0.587938, 0.691342, -0.555571, -0.46194, 0.691342, -0.555571, -0.46194, 0.587938, -0.555571, -0.587938, 0.623612, -0.471397, -0.623612, 0.691342, -0.555571, -0.46194, 0.623612, -0.471397, -0.623612, 0.733291, -0.471397, -0.489969, 0.733291, -0.471397, -0.489969, 0.623612, -0.471397, -0.623612, 0.653281, -0.382684, -0.653281, 0.733291, -0.471397, -0.489969, 0.653281, -0.382684, -0.653281, 0.768178, -0.382684, -0.51328, 0.768178, -0.382684, -0.51328, 0.653281, -0.382684, -0.653281, 0.676659, -0.290285, -0.676659, 0.768178, -0.382684, -0.51328, 0.676659, -0.290285, -0.676659, 0.795667, -0.290285, -0.531647, 0.795667, -0.290285, -0.531647, 0.676659, -0.290285, -0.676659, 0.69352, -0.195091, -0.69352, 0.795667, -0.290285, -0.531647, 0.69352, -0.195091, -0.69352, 0.815493, -0.195091, -0.544895, 0.815493, -0.195091, -0.544895, 0.69352, -0.195091, -0.69352, 0.703702, -0.098017, -0.703702, 0.815493, -0.195091, -0.544895, 0.703702, -0.098017, -0.703702, 0.827466, -0.098017, -0.552895, 0.827466, -0.098017, -0.552895, 0.703702, -0.098017, -0.703702, 0.831469, 0, -0.55557, 0.703702, -0.098017, -0.703702, 0.707107, 0, -0.707107, 0.831469, 0, -0.55557, 0.831469, 0, -0.55557, 0.707107, 0, -0.707107, 0.703702, 0.098017, -0.703702, 0.831469, 0, -0.55557, 0.703702, 0.098017, -0.703702, 0.827466, 0.098017, -0.552895, 0.827466, 0.098017, -0.552895, 0.703702, 0.098017, -0.703702, 0.69352, 0.19509, -0.69352, 0.827466, 0.098017, -0.552895, 0.69352, 0.19509, -0.69352, 0.815493, 0.19509, -0.544895, 0.815493, 0.19509, -0.544895, 0.69352, 0.19509, -0.69352, 0.676659, 0.290285, -0.676659, 0.815493, 0.19509, -0.544895, 0.676659, 0.290285, -0.676659, 0.795667, 0.290285, -0.531648, 0.795667, 0.290285, -0.531648, 0.676659, 0.290285, -0.676659, 0.653281, 0.382683, -0.653281, 0.795667, 0.290285, -0.531648, 0.653281, 0.382683, -0.653281, 0.768178, 0.382683, -0.51328, 0.768178, 0.382683, -0.51328, 0.653281, 0.382683, -0.653281, 0.623612, 0.471397, -0.623612, 0.768178, 0.382683, -0.51328, 0.623612, 0.471397, -0.623612, 0.733291, 0.471397, -0.489969, 0.733291, 0.471397, -0.489969, 0.623612, 0.471397, -0.623612, 0.587938, 0.55557, -0.587938, 0.733291, 0.471397, -0.489969, 0.587938, 0.55557, -0.587938, 0.691342, 0.55557, -0.46194, 0.691342, 0.55557, -0.46194, 0.587938, 0.55557, -0.587938, 0.546601, 0.634393, -0.546601, 0.691342, 0.55557, -0.46194, 0.546601, 0.634393, -0.546601, 0.642735, 0.634393, -0.429462, 0.642735, 0.634393, -0.429462, 0.546601, 0.634393, -0.546601, 0.5, 0.707107, -0.5, 0.642735, 0.634393, -0.429462, 0.5, 0.707107, -0.5, 0.587938, 0.707107, -0.392848, 0.587938, 0.707107, -0.392848, 0.5, 0.707107, -0.5, 0.448584, 0.77301, -0.448584, 0.587938, 0.707107, -0.392848, 0.448584, 0.77301, -0.448584, 0.527479, 0.77301, -0.35245, 0.527479, 0.77301, -0.35245, 0.448584, 0.77301, -0.448584, 0.392847, 0.83147, -0.392847, 0.527479, 0.77301, -0.35245, 0.392847, 0.83147, -0.392847, 0.46194, 0.83147, -0.308658, 0.46194, 0.83147, -0.308658, 0.392847, 0.83147, -0.392847, 0.333328, 0.881921, -0.333328, 0.46194, 0.83147, -0.308658, 0.333328, 0.881921, -0.333328, 0.391952, 0.881921, -0.261894, 0.391952, 0.881921, -0.261894, 0.333328, 0.881921, -0.333328, 0.270598, 0.92388, -0.270598, 0.391952, 0.881921, -0.261894, 0.270598, 0.92388, -0.270598, 0.31819, 0.92388, -0.212608, 0.31819, 0.92388, -0.212608, 0.270598, 0.92388, -0.270598, 0.205262, 0.95694, -0.205262, 0.31819, 0.92388, -0.212608, 0.205262, 0.95694, -0.205262, 0.241363, 0.95694, -0.161274, 0.241363, 0.95694, -0.161274, 0.205262, 0.95694, -0.205262, 0.13795, 0.980785, -0.13795, 0.241363, 0.95694, -0.161274, 0.13795, 0.980785, -0.13795, 0.162212, 0.980785, -0.108386, 0.162212, 0.980785, -0.108386, 0.13795, 0.980785, -0.13795, 0.069309, 0.995185, -0.069309, 0.162212, 0.980785, -0.108386, 0.069309, 0.995185, -0.069309, 0.081498, 0.995185, -0.054455, 0.18024, 0.980785, -0.074658, 0.162212, 0.980785, -0.108386, 0.081498, 0.995185, -0.054455, 0.18024, 0.980785, -0.074658, 0.081498, 0.995185, -0.054455, 0.090556, 0.995185, -0.03751, 0.268188, 0.95694, -0.111087, 0.241363, 0.95694, -0.161274, 0.162212, 0.980785, -0.108386, 0.268188, 0.95694, -0.111087, 0.162212, 0.980785, -0.108386, 0.18024, 0.980785, -0.074658, 0.353553, 0.92388, -0.146447, 0.31819, 0.92388, -0.212608, 0.241363, 0.95694, -0.161274, 0.353553, 0.92388, -0.146447, 0.241363, 0.95694, -0.161274, 0.268188, 0.95694, -0.111087, 0.435514, 0.881921, -0.180396, 0.391952, 0.881921, -0.261894, 0.31819, 0.92388, -0.212608, 0.435514, 0.881921, -0.180396, 0.31819, 0.92388, -0.212608, 0.353553, 0.92388, -0.146447, 0.51328, 0.83147, -0.212608, 0.46194, 0.83147, -0.308658, 0.391952, 0.881921, -0.261894, 0.51328, 0.83147, -0.212608, 0.391952, 0.881921, -0.261894, 0.435514, 0.881921, -0.180396, 0.586103, 0.77301, -0.242772, 0.527479, 0.77301, -0.35245, 0.46194, 0.83147, -0.308658, 0.586103, 0.77301, -0.242772, 0.46194, 0.83147, -0.308658, 0.51328, 0.83147, -0.212608, 0.653281, 0.707107, -0.270598, 0.587938, 0.707107, -0.392848, 0.527479, 0.77301, -0.35245, 0.653281, 0.707107, -0.270598, 0.527479, 0.77301, -0.35245, 0.586103, 0.77301, -0.242772, 0.714168, 0.634393, -0.295818, 0.642735, 0.634393, -0.429462, 0.587938, 0.707107, -0.392848, 0.714168, 0.634393, -0.295818, 0.587938, 0.707107, -0.392848, 0.653281, 0.707107, -0.270598, 0.768178, 0.55557, -0.31819, 0.691342, 0.55557, -0.46194, 0.642735, 0.634393, -0.429462, 0.768178, 0.55557, -0.31819, 0.642735, 0.634393, -0.429462, 0.714168, 0.634393, -0.295818, 0.814789, 0.471397, -0.337497, 0.733291, 0.471397, -0.489969, 0.691342, 0.55557, -0.46194, 0.814789, 0.471397, -0.337497, 0.691342, 0.55557, -0.46194, 0.768178, 0.55557, -0.31819, 0.853553, 0.382683, -0.353553, 0.768178, 0.382683, -0.51328, 0.733291, 0.471397, -0.489969, 0.853553, 0.382683, -0.353553, 0.733291, 0.471397, -0.489969, 0.814789, 0.471397, -0.337497, 0.884098, 0.290285, -0.366205, 0.795667, 0.290285, -0.531648, 0.768178, 0.382683, -0.51328, 0.884098, 0.290285, -0.366205, 0.768178, 0.382683, -0.51328, 0.853553, 0.382683, -0.353553, 0.906127, 0.19509, -0.37533, 0.815493, 0.19509, -0.544895, 0.795667, 0.290285, -0.531648, 0.906127, 0.19509, -0.37533, 0.795667, 0.290285, -0.531648, 0.884098, 0.290285, -0.366205, 0.919431, 0.098017, -0.380841, 0.827466, 0.098017, -0.552895, 0.815493, 0.19509, -0.544895, 0.919431, 0.098017, -0.380841, 0.815493, 0.19509, -0.544895, 0.906127, 0.19509, -0.37533, 0.923879, 0, -0.382683, 0.831469, 0, -0.55557, 0.827466, 0.098017, -0.552895, 0.923879, 0, -0.382683, 0.827466, 0.098017, -0.552895, 0.919431, 0.098017, -0.380841, 0.919431, -0.098017, -0.380841, 0.827466, -0.098017, -0.552895, 0.831469, 0, -0.55557, 0.919431, -0.098017, -0.380841, 0.831469, 0, -0.55557, 0.923879, 0, -0.382683, 0.906127, -0.195091, -0.37533, 0.815493, -0.195091, -0.544895, 0.827466, -0.098017, -0.552895, 0.906127, -0.195091, -0.37533, 0.827466, -0.098017, -0.552895, 0.919431, -0.098017, -0.380841, 0.884097, -0.290285, -0.366205, 0.795667, -0.290285, -0.531647, 0.815493, -0.195091, -0.544895, 0.884097, -0.290285, -0.366205, 0.815493, -0.195091, -0.544895, 0.906127, -0.195091, -0.37533, 0.853553, -0.382684, -0.353553, 0.768178, -0.382684, -0.51328, 0.795667, -0.290285, -0.531647, 0.853553, -0.382684, -0.353553, 0.795667, -0.290285, -0.531647, 0.884097, -0.290285, -0.366205, 0.814789, -0.471397, -0.337497, 0.733291, -0.471397, -0.489969, 0.768178, -0.382684, -0.51328, 0.814789, -0.471397, -0.337497, 0.768178, -0.382684, -0.51328, 0.853553, -0.382684, -0.353553, 0.768178, -0.555571, -0.31819, 0.691342, -0.555571, -0.46194, 0.733291, -0.471397, -0.489969, 0.768178, -0.555571, -0.31819, 0.733291, -0.471397, -0.489969, 0.814789, -0.471397, -0.337497, 0.714168, -0.634394, -0.295818, 0.642734, -0.634394, -0.429461, 0.691342, -0.555571, -0.46194, 0.714168, -0.634394, -0.295818, 0.691342, -0.555571, -0.46194, 0.768178, -0.555571, -0.31819, 0.653281, -0.707107, -0.270598, 0.587937, -0.707107, -0.392847, 0.642734, -0.634394, -0.429461, 0.653281, -0.707107, -0.270598, 0.642734, -0.634394, -0.429461, 0.714168, -0.634394, -0.295818, 0.586103, -0.773011, -0.242772, 0.527478, -0.773011, -0.35245, 0.587937, -0.707107, -0.392847, 0.586103, -0.773011, -0.242772, 0.587937, -0.707107, -0.392847, 0.653281, -0.707107, -0.270598, 0.513279, -0.83147, -0.212607, 0.461939, -0.83147, -0.308658, 0.527478, -0.773011, -0.35245, 0.513279, -0.83147, -0.212607, 0.527478, -0.773011, -0.35245, 0.586103, -0.773011, -0.242772, 0.435513, -0.881922, -0.180395, 0.391952, -0.881922, -0.261894, 0.461939, -0.83147, -0.308658, 0.435513, -0.881922, -0.180395, 0.461939, -0.83147, -0.308658, 0.513279, -0.83147, -0.212607, 0.353553, -0.92388, -0.146446, 0.318189, -0.92388, -0.212607, 0.391952, -0.881922, -0.261894, 0.353553, -0.92388, -0.146446, 0.391952, -0.881922, -0.261894, 0.435513, -0.881922, -0.180395, 0.268187, -0.956941, -0.111087, 0.241362, -0.956941, -0.161273, 0.318189, -0.92388, -0.212607, 0.268187, -0.956941, -0.111087, 0.318189, -0.92388, -0.212607, 0.353553, -0.92388, -0.146446, 0.180239, -0.980785, -0.074658, 0.162211, -0.980785, -0.108386, 0.241362, -0.956941, -0.161273, 0.180239, -0.980785, -0.074658, 0.241362, -0.956941, -0.161273, 0.268187, -0.956941, -0.111087, 0.090555, -0.995185, -0.037509, 0.081498, -0.995185, -0.054455, 0.162211, -0.980785, -0.108386, 0.090555, -0.995185, -0.037509, 0.162211, -0.980785, -0.108386, 0.180239, -0.980785, -0.074658, 0.096133, -0.995185, -0.019122, 0.090555, -0.995185, -0.037509, 0.180239, -0.980785, -0.074658, 0.096133, -0.995185, -0.019122, 0.180239, -0.980785, -0.074658, 0.191341, -0.980785, -0.03806, 0.191341, -0.980785, -0.03806, 0.180239, -0.980785, -0.074658, 0.268187, -0.956941, -0.111087, 0.191341, -0.980785, -0.03806, 0.268187, -0.956941, -0.111087, 0.284706, -0.956941, -0.056632, 0.284706, -0.956941, -0.056632, 0.268187, -0.956941, -0.111087, 0.353553, -0.92388, -0.146446, 0.284706, -0.956941, -0.056632, 0.353553, -0.92388, -0.146446, 0.37533, -0.92388, -0.074658, 0.37533, -0.92388, -0.074658, 0.353553, -0.92388, -0.146446, 0.435513, -0.881922, -0.180395, 0.37533, -0.92388, -0.074658, 0.435513, -0.881922, -0.180395, 0.462338, -0.881922, -0.091965, 0.462338, -0.881922, -0.091965, 0.435513, -0.881922, -0.180395, 0.513279, -0.83147, -0.212607, 0.462338, -0.881922, -0.091965, 0.513279, -0.83147, -0.212607, 0.544895, -0.83147, -0.108386, 0.544895, -0.83147, -0.108386, 0.513279, -0.83147, -0.212607, 0.586103, -0.773011, -0.242772, 0.544895, -0.83147, -0.108386, 0.586103, -0.773011, -0.242772, 0.622203, -0.773011, -0.123764, 0.622203, -0.773011, -0.123764, 0.586103, -0.773011, -0.242772, 0.653281, -0.707107, -0.270598, 0.622203, -0.773011, -0.123764, 0.653281, -0.707107, -0.270598, 0.69352, -0.707107, -0.13795, 0.69352, -0.707107, -0.13795, 0.653281, -0.707107, -0.270598, 0.714168, -0.634394, -0.295818, 0.69352, -0.707107, -0.13795, 0.714168, -0.634394, -0.295818, 0.758157, -0.634394, -0.150807, 0.758157, -0.634394, -0.150807, 0.714168, -0.634394, -0.295818, 0.768178, -0.555571, -0.31819, 0.758157, -0.634394, -0.150807, 0.768178, -0.555571, -0.31819, 0.815493, -0.555571, -0.162212, 0.815493, -0.555571, -0.162212, 0.768178, -0.555571, -0.31819, 0.814789, -0.471397, -0.337497, 0.815493, -0.555571, -0.162212, 0.814789, -0.471397, -0.337497, 0.864975, -0.471397, -0.172054, 0.864975, -0.471397, -0.172054, 0.814789, -0.471397, -0.337497, 0.853553, -0.382684, -0.353553, 0.864975, -0.471397, -0.172054, 0.853553, -0.382684, -0.353553, 0.906127, -0.382684, -0.18024, 0.906127, -0.382684, -0.18024, 0.853553, -0.382684, -0.353553, 0.884097, -0.290285, -0.366205, 0.906127, -0.382684, -0.18024, 0.884097, -0.290285, -0.366205, 0.938553, -0.290285, -0.18669, 0.938553, -0.290285, -0.18669, 0.884097, -0.290285, -0.366205, 0.906127, -0.195091, -0.37533, 0.938553, -0.290285, -0.18669, 0.906127, -0.195091, -0.37533, 0.96194, -0.195091, -0.191342, 0.96194, -0.195091, -0.191342, 0.906127, -0.195091, -0.37533, 0.919431, -0.098017, -0.380841, 0.96194, -0.195091, -0.191342, 0.919431, -0.098017, -0.380841, 0.976062, -0.098017, -0.194151, 0.976062, -0.098017, -0.194151, 0.919431, -0.098017, -0.380841, 0.923879, 0, -0.382683, 0.976062, -0.098017, -0.194151, 0.923879, 0, -0.382683, 0.980785, 0, -0.19509, 0.980785, 0, -0.19509, 0.923879, 0, -0.382683, 0.919431, 0.098017, -0.380841, 0.980785, 0, -0.19509, 0.919431, 0.098017, -0.380841, 0.976062, 0.098017, -0.194151, 0.976062, 0.098017, -0.194151, 0.919431, 0.098017, -0.380841, 0.906127, 0.19509, -0.37533, 0.976062, 0.098017, -0.194151, 0.906127, 0.19509, -0.37533, 0.96194, 0.19509, -0.191342, 0.96194, 0.19509, -0.191342, 0.906127, 0.19509, -0.37533, 0.884098, 0.290285, -0.366205, 0.96194, 0.19509, -0.191342, 0.884098, 0.290285, -0.366205, 0.938553, 0.290285, -0.18669, 0.938553, 0.290285, -0.18669, 0.884098, 0.290285, -0.366205, 0.853553, 0.382683, -0.353553, 0.938553, 0.290285, -0.18669, 0.853553, 0.382683, -0.353553, 0.906127, 0.382683, -0.18024, 0.906127, 0.382683, -0.18024, 0.853553, 0.382683, -0.353553, 0.814789, 0.471397, -0.337497, 0.906127, 0.382683, -0.18024, 0.814789, 0.471397, -0.337497, 0.864975, 0.471397, -0.172054, 0.864975, 0.471397, -0.172054, 0.814789, 0.471397, -0.337497, 0.768178, 0.55557, -0.31819, 0.864975, 0.471397, -0.172054, 0.768178, 0.55557, -0.31819, 0.815493, 0.55557, -0.162212, 0.815493, 0.55557, -0.162212, 0.768178, 0.55557, -0.31819, 0.714168, 0.634393, -0.295818, 0.815493, 0.55557, -0.162212, 0.714168, 0.634393, -0.295818, 0.758157, 0.634393, -0.150807, 0.758157, 0.634393, -0.150807, 0.714168, 0.634393, -0.295818, 0.653281, 0.707107, -0.270598, 0.758157, 0.634393, -0.150807, 0.653281, 0.707107, -0.270598, 0.69352, 0.707107, -0.13795, 0.69352, 0.707107, -0.13795, 0.653281, 0.707107, -0.270598, 0.586103, 0.77301, -0.242772, 0.69352, 0.707107, -0.13795, 0.586103, 0.77301, -0.242772, 0.622204, 0.77301, -0.123764, 0.622204, 0.77301, -0.123764, 0.586103, 0.77301, -0.242772, 0.51328, 0.83147, -0.212608, 0.622204, 0.77301, -0.123764, 0.51328, 0.83147, -0.212608, 0.544895, 0.83147, -0.108386, 0.544895, 0.83147, -0.108386, 0.51328, 0.83147, -0.212608, 0.435514, 0.881921, -0.180396, 0.544895, 0.83147, -0.108386, 0.435514, 0.881921, -0.180396, 0.462339, 0.881921, -0.091965, 0.462339, 0.881921, -0.091965, 0.435514, 0.881921, -0.180396, 0.353553, 0.92388, -0.146447, 0.462339, 0.881921, -0.091965, 0.353553, 0.92388, -0.146447, 0.37533, 0.92388, -0.074658, 0.37533, 0.92388, -0.074658, 0.353553, 0.92388, -0.146447, 0.268188, 0.95694, -0.111087, 0.37533, 0.92388, -0.074658, 0.268188, 0.95694, -0.111087, 0.284707, 0.95694, -0.056632, 0.284707, 0.95694, -0.056632, 0.268188, 0.95694, -0.111087, 0.18024, 0.980785, -0.074658, 0.284707, 0.95694, -0.056632, 0.18024, 0.980785, -0.074658, 0.191342, 0.980785, -0.03806, 0.191342, 0.980785, -0.03806, 0.18024, 0.980785, -0.074658, 0.090556, 0.995185, -0.03751, 0.191342, 0.980785, -0.03806, 0.090556, 0.995185, -0.03751, 0.096134, 0.995185, -0.019122, 0.096134, 0.995185, -0.019122, 0.098017, 0.995185, 0, 0.19509, 0.980785, 0, 0.096134, 0.995185, -0.019122, 0.19509, 0.980785, 0, 0.191342, 0.980785, -0.03806, 0.290284, 0.95694, 0, 0.284707, 0.95694, -0.056632, 0.191342, 0.980785, -0.03806, 0.290284, 0.95694, 0, 0.191342, 0.980785, -0.03806, 0.19509, 0.980785, 0, 0.382683, 0.92388, 0, 0.37533, 0.92388, -0.074658, 0.284707, 0.95694, -0.056632, 0.382683, 0.92388, 0, 0.284707, 0.95694, -0.056632, 0.290284, 0.95694, 0, 0.471396, 0.881921, 0, 0.462339, 0.881921, -0.091965, 0.37533, 0.92388, -0.074658, 0.471396, 0.881921, 0, 0.37533, 0.92388, -0.074658, 0.382683, 0.92388, 0, 0.55557, 0.83147, 0, 0.544895, 0.83147, -0.108386, 0.462339, 0.881921, -0.091965, 0.55557, 0.83147, 0, 0.462339, 0.881921, -0.091965, 0.471396, 0.881921, 0, 0.634393, 0.77301, 0, 0.622204, 0.77301, -0.123764, 0.544895, 0.83147, -0.108386, 0.634393, 0.77301, 0, 0.544895, 0.83147, -0.108386, 0.55557, 0.83147, 0, 0.707107, 0.707107, 0, 0.69352, 0.707107, -0.13795, 0.622204, 0.77301, -0.123764, 0.707107, 0.707107, 0, 0.622204, 0.77301, -0.123764, 0.634393, 0.77301, 0, 0.77301, 0.634393, 0, 0.758157, 0.634393, -0.150807, 0.69352, 0.707107, -0.13795, 0.77301, 0.634393, 0, 0.69352, 0.707107, -0.13795, 0.707107, 0.707107, 0, 0.831469, 0.55557, 0, 0.815493, 0.55557, -0.162212, 0.758157, 0.634393, -0.150807, 0.831469, 0.55557, 0, 0.758157, 0.634393, -0.150807, 0.77301, 0.634393, 0, 0.88192, 0.471397, 0, 0.864975, 0.471397, -0.172054, 0.815493, 0.55557, -0.162212, 0.88192, 0.471397, 0, 0.815493, 0.55557, -0.162212, 0.831469, 0.55557, 0, 0.923879, 0.382683, 0, 0.906127, 0.382683, -0.18024, 0.864975, 0.471397, -0.172054, 0.923879, 0.382683, 0, 0.864975, 0.471397, -0.172054, 0.88192, 0.471397, 0, 0.95694, 0.290285, 0, 0.938553, 0.290285, -0.18669, 0.906127, 0.382683, -0.18024, 0.95694, 0.290285, 0, 0.906127, 0.382683, -0.18024, 0.923879, 0.382683, 0, 0.980785, 0.19509, 0, 0.96194, 0.19509, -0.191342, 0.938553, 0.290285, -0.18669, 0.980785, 0.19509, 0, 0.938553, 0.290285, -0.18669, 0.95694, 0.290285, 0, 0.995184, 0.098017, 0, 0.976062, 0.098017, -0.194151, 0.96194, 0.19509, -0.191342, 0.995184, 0.098017, 0, 0.96194, 0.19509, -0.191342, 0.980785, 0.19509, 0, 0.999999, 0, 0, 0.980785, 0, -0.19509, 0.976062, 0.098017, -0.194151, 0.999999, 0, 0, 0.976062, 0.098017, -0.194151, 0.995184, 0.098017, 0, 0.995184, -0.098017, 0, 0.976062, -0.098017, -0.194151, 0.999999, 0, 0, 0.976062, -0.098017, -0.194151, 0.980785, 0, -0.19509, 0.999999, 0, 0, 0.980785, -0.195091, 0, 0.96194, -0.195091, -0.191342, 0.976062, -0.098017, -0.194151, 0.980785, -0.195091, 0, 0.976062, -0.098017, -0.194151, 0.995184, -0.098017, 0, 0.95694, -0.290285, 0, 0.938553, -0.290285, -0.18669, 0.980785, -0.195091, 0, 0.938553, -0.290285, -0.18669, 0.96194, -0.195091, -0.191342, 0.980785, -0.195091, 0, 0.923879, -0.382684, 0, 0.906127, -0.382684, -0.18024, 0.938553, -0.290285, -0.18669, 0.923879, -0.382684, 0, 0.938553, -0.290285, -0.18669, 0.95694, -0.290285, 0, 0.88192, -0.471397, 0, 0.864975, -0.471397, -0.172054, 0.923879, -0.382684, 0, 0.864975, -0.471397, -0.172054, 0.906127, -0.382684, -0.18024, 0.923879, -0.382684, 0, 0.831469, -0.555571, 0, 0.815493, -0.555571, -0.162212, 0.88192, -0.471397, 0, 0.815493, -0.555571, -0.162212, 0.864975, -0.471397, -0.172054, 0.88192, -0.471397, 0, 0.77301, -0.634394, 0, 0.758157, -0.634394, -0.150807, 0.831469, -0.555571, 0, 0.758157, -0.634394, -0.150807, 0.815493, -0.555571, -0.162212, 0.831469, -0.555571, 0, 0.707106, -0.707107, 0, 0.69352, -0.707107, -0.13795, 0.77301, -0.634394, 0, 0.69352, -0.707107, -0.13795, 0.758157, -0.634394, -0.150807, 0.77301, -0.634394, 0, 0.634392, -0.773011, 0, 0.622203, -0.773011, -0.123764, 0.707106, -0.707107, 0, 0.622203, -0.773011, -0.123764, 0.69352, -0.707107, -0.13795, 0.707106, -0.707107, 0, 0.555569, -0.83147, 0, 0.544895, -0.83147, -0.108386, 0.634392, -0.773011, 0, 0.544895, -0.83147, -0.108386, 0.622203, -0.773011, -0.123764, 0.634392, -0.773011, 0, 0.471396, -0.881922, 0, 0.462338, -0.881922, -0.091965, 0.555569, -0.83147, 0, 0.462338, -0.881922, -0.091965, 0.544895, -0.83147, -0.108386, 0.555569, -0.83147, 0, 0.382682, -0.92388, 0, 0.37533, -0.92388, -0.074658, 0.471396, -0.881922, 0, 0.37533, -0.92388, -0.074658, 0.462338, -0.881922, -0.091965, 0.471396, -0.881922, 0, 0.290284, -0.956941, 0, 0.284706, -0.956941, -0.056632, 0.382682, -0.92388, 0, 0.284706, -0.956941, -0.056632, 0.37533, -0.92388, -0.074658, 0.382682, -0.92388, 0, 0.195089, -0.980785, 0, 0.191341, -0.980785, -0.03806, 0.290284, -0.956941, 0, 0.191341, -0.980785, -0.03806, 0.284706, -0.956941, -0.056632, 0.290284, -0.956941, 0, 0.098016, -0.995185, 0, 0.096133, -0.995185, -0.019122, 0.195089, -0.980785, 0, 0.096133, -0.995185, -0.019122, 0.191341, -0.980785, -0.03806, 0.195089, -0.980785, 0];
//c3dl.BOUNDING_SPHERE_VERTICES = 
c3dl.POINT_VERTICES = [-0.27639,-0.85064,-0.44721,0,0,-1,0.7236,-0.52572,-0.44721,0.7236,-0.52572,-0.44721,0,0,-1,0.7236,0.52572,-0.44721,-0.89442,0,-0.44721,0,0,-1,-0.27639,-0.85064,-0.44721,-0.27639,0.85064,-0.44721,0,0,-1,-0.89442,0,-0.44721,0.7236,0.52572,-0.44721,0,0,-1,-0.27639,0.85064,-0.44721,0.7236,-0.52572,-0.44721,0.7236,0.52572,-0.44721,0.89442,0,0.44721,-0.27639,-0.85064,-0.44721,0.7236,-0.52572,-0.44721,0.27639,-0.85064,0.44721,-0.89442,0,-0.44721,-0.27639,-0.85064,-0.44721,-0.7236,-0.52572,0.44721,-0.27639,0.85064,-0.44721,-0.89442,0,-0.44721,-0.7236,0.52572,0.44721,0.7236,0.52572,-0.44721,-0.27639,0.85064,-0.44721,0.27639,0.85064,0.44721,0.89442,0,0.44721,0.27639,-0.85064,0.44721,0.7236,-0.52572,-0.44721,0.27639,-0.85064,0.44721,-0.7236,-0.52572,0.44721,-0.27639,-0.85064,-0.44721,-0.7236,-0.52572,0.44721,-0.7236,0.52572,0.44721,-0.89442,0,-0.44721,-0.7236,0.52572,0.44721,0.27639,0.85064,0.44721,-0.27639,0.85064,-0.44721,0.27639,0.85064,0.44721,0.89442,0,0.44721,0.7236,0.52572,-0.44721,0.27639,-0.85064,0.44721,0.89442,0,0.44721,0,0,1,-0.7236,-0.52572,0.44721,0.27639,-0.85064,0.44721,0,0,1,-0.7236,0.52572,0.44721,-0.7236,-0.52572,0.44721,0,0,1,0.27639,0.85064,0.44721,-0.7236,0.52572,0.44721,0,0,1,0.89442,0,0.44721,0.27639,0.85064,0.44721,0,0,1];

c3dl.BoundingBox = function ()
{
  //x
  this.length = 0;
  //y
  this.height = 0;
  //z
  this.width = 0;
  
  this.boxverts = [];
  this.lineList =[];
  this.maxMins= [];
  this.realposition = [];
  this.position = [0,0,0];
  this.init = function (vertices)
  {
    if (vertices) {
	  vertices = new C3DL_FLOAT_ARRAY(vertices);
      var lengthVerts= new C3DL_FLOAT_ARRAY(vertices.length/3), widthVerts=new C3DL_FLOAT_ARRAY(vertices.length/3), heightVerts=new C3DL_FLOAT_ARRAY(vertices.length/3), j = 0;
      var j = 0;
	  for (var i = 0; i < vertices.length/3; i++) {
        lengthVerts[i] = vertices[j];
        heightVerts[i] = vertices[j+1];
        widthVerts[i] = vertices[j+2];
        j+=3
      }    
       
      this.maxMins[0] = c3dl.findMax(lengthVerts); 
      this.maxMins[1] = c3dl.findMin(lengthVerts);
      this.maxMins[2] = c3dl.findMax(heightVerts);
      this.maxMins[3] = c3dl.findMin(heightVerts); 
      this.maxMins[4] = c3dl.findMax(widthVerts); 
      this.maxMins[5] = c3dl.findMin(widthVerts);     
     
      this.realposition[0] = (this.maxMins[0] + this.maxMins[1])/2;
      this.realposition[1] = (this.maxMins[2] + this.maxMins[3])/2;
      this.realposition[2] = (this.maxMins[4] + this.maxMins[5])/2;
      this.length=this.maxMins[0]-this.maxMins[1];
      this.height=this.maxMins[2]-this.maxMins[3];
      this.width=this.maxMins[4]-this.maxMins[5];
    }
    for (var i = 0; i <12; i++) {
      this.lineList[i] = new c3dl.Line();
      this.lineList[i].setWidth(2);
    }  

    //F top left 
    this.boxverts[0] =[ this.maxMins[1], this.maxMins[3],  this.maxMins[5]];
    //B top left 
    this.boxverts[1] =[ this.maxMins[1], this.maxMins[3],  this.maxMins[4]];                         
    //F top right                       
    this.boxverts[2] =[ this.maxMins[0], this.maxMins[3],  this.maxMins[5]]; 
    //B top right    
    this.boxverts[3] =[ this.maxMins[0], this.maxMins[3],  this.maxMins[4]];
    //F bottom left 
    this.boxverts[4] =[ this.maxMins[1], this.maxMins[2],  this.maxMins[5]];
    //B bottom left
    this.boxverts[5] =[ this.maxMins[1], this.maxMins[2],  this.maxMins[4]];
    //F bottom right
    this.boxverts[6] =[ this.maxMins[0], this.maxMins[2],  this.maxMins[5]]; 
    //B bottom right  
    this.boxverts[7] =[ this.maxMins[0], this.maxMins[2], this.maxMins[4]];

  }
  
  this.setPosition = function (position)
  {
    for (var i = 0; i <8; i++) {
      this.boxverts[i] = c3dl.subtractVectors(this.boxverts[i], this.position);
    }
    this.position = [position[0], position[1], position[2]];
    this.realposition = [position[0]-this.realposition[0], position[1]-this.realposition[1], position[2]-this.realposition[2]];
    for (var i = 0; i <8; i++) {
      this.boxverts[i] = c3dl.addVectors(this.boxverts[i], this.position);
    }
    
  }
  this.scale = function (scaleVec)
  {
    this.length = this.length * scaleVec[0];
    this.height = this.height * scaleVec[1];
    this.width = this.width * scaleVec[2];
    for (var i = 0; i <8; i++) 
      this.boxverts[i] = c3dl.subtractVectors(this.boxverts[i], this.position);
    for (var i = 0; i <8; i++) 
      this.boxverts[i] = c3dl.multiplyVectorByVector(this.boxverts[i], scaleVec);
    for (var i = 0; i <8; i++) 
      this.boxverts[i] = c3dl.addVectors(this.boxverts[i], this.position);
  }
  
  this.rotateOnAxis = function (axisVec, angle)
  {
    var rotateOnAxisQuat = c3dl.makeQuat(0, 0, 0, 0);
    var rotateOnAxisMat = c3dl.makeZeroMatrix();
    
    if (!c3dl.isValidVector(axisVec))
    {
      c3dl.debug.logWarning('Actor::rotateOnAxis() called with the first parameter not a vector');
      return;
    }
    if (isNaN(angle))
    {
      c3dl.debug.logWarning('Actor::rotateOnAxis() called with the second parameter not a number');
      return;
    }
    if (angle == 0)
    {
      return;
    }

    // Create a proper Quaternion based on location and angle
    c3dl.axisAngleToQuat(axisVec, angle, rotateOnAxisQuat);

    // Create a rotation Matrix out of this quaternion
    rotateOnAxisMat = c3dl.quatToMatrix(rotateOnAxisQuat);

    // Apply changes to the remaining vectors
    //
    for (var i = 0; i <8; i++) {
      this.boxverts[i] = c3dl.subtractVectors(this.boxverts[i], this.position);
    }
    for (var i = 0; i <8; i++) 
      c3dl.multiplyMatrixByVector(rotateOnAxisMat, this.boxverts[i], this.boxverts[i]);
    for (var i = 0; i <8; i++) 
      this.boxverts[i] = c3dl.addVectors(this.boxverts[i], this.position);
  }
  this.getHeight = function ()
  {
    return this.height;
  }
  this.getLength = function ()
  {
    return this.length;
  }
  this.getWidth = function ()
  {
    return this.width;
  }
  this.getPosition = function ()
  {
    return c3dl.subtractVectors(this.position,this.realposition);
  }
  //draw a box using lines
  this.render = function(scene)
  {
    //front of box
    //top left to top right
    this.lineList[0].setCoordinates(this.boxverts[0],this.boxverts[2]);
    //top left to bottom left                            
    this.lineList[1].setCoordinates(this.boxverts[0],this.boxverts[4]); 
    //bottom left to bottom right 
    this.lineList[2].setCoordinates(this.boxverts[4],this.boxverts[6]);
    //bottom right to top right
    this.lineList[3].setCoordinates(this.boxverts[6],this.boxverts[2]);

    //back of box
    //top left to top right
    this.lineList[4].setCoordinates(this.boxverts[1],this.boxverts[3]);
    //top left to bottom left                            
    this.lineList[5].setCoordinates(this.boxverts[1],this.boxverts[5]); 
    //bottom left to bottom right 
    this.lineList[6].setCoordinates(this.boxverts[5],this.boxverts[7]);
    //bottom right to top right
    this.lineList[7].setCoordinates(this.boxverts[7],this.boxverts[3]);
    
    //connectors
    //F top left to B top left
    this.lineList[8].setCoordinates(this.boxverts[0],this.boxverts[1]);
    //F top right to B top right                           
    this.lineList[9].setCoordinates(this.boxverts[2],this.boxverts[3]); 
    //F bottom left to B bottom left 
    this.lineList[10].setCoordinates(this.boxverts[4],this.boxverts[5]);
    //F bottom right to B bottom right  
    this.lineList[11].setCoordinates(this.boxverts[6],this.boxverts[7]);
    
    scene.getRenderer().renderLines(this.lineList);
  }
  this.getCorners = function () 
  {
    return [[(this.boxverts[0][0]).toFixed(2),(this.boxverts[0][2]).toFixed(2)], 
            [(this.boxverts[1][0].toFixed(2)),(this.boxverts[1][2]).toFixed(2)],
            [(this.boxverts[2][0]).toFixed(2),(this.boxverts[2][2]).toFixed(2)],
            [(this.boxverts[3][0]).toFixed(2),(this.boxverts[3][2]).toFixed(2)]];
  }
  this.getCopy = function ()
  {
    var copy = new c3dl.BoundingBox();
    copy.length = this.length;
    copy.height = this.height;
    copy.width = this.width;
    copy.boxverts = c3dl.copyObj(this.boxverts);
    copy.lineList = c3dl.copyObj(this.lineList);
    copy.maxMins= c3dl.copyObj(this.maxMins);
    copy.realposition = c3dl.copyObj(this.realposition);
    copy.position = c3dl.copyObj(this.position);
    return copy;
  }
  this.center = function () 
  {
      //F top left 
    this.boxverts[0] =[ this.boxverts[0][0] - this.realposition[0] , this.boxverts[0][1] - this.realposition[1] , this.boxverts[0][2] - this.realposition[2] ];
    //B top left 
    this.boxverts[1] =[ this.boxverts[1][0] - this.realposition[0] , this.boxverts[1][1] - this.realposition[1],  this.boxverts[1][2] - this.realposition[2] ];                         
    //F top right                       
    this.boxverts[2] =[ this.boxverts[2][0] - this.realposition[0] , this.boxverts[2][1] - this.realposition[1],  this.boxverts[2][2] - this.realposition[2] ]; 
    //B top right    
    this.boxverts[3] =[ this.boxverts[3][0]  - this.realposition[0], this.boxverts[3][1] - this.realposition[1],  this.boxverts[3][2] - this.realposition[2] ];
    //F bottom left 
    this.boxverts[4] =[ this.boxverts[4][0]  - this.realposition[0], this.boxverts[4][1] - this.realposition[1],  this.boxverts[4][2] - this.realposition[2] ];
    //B bottom left
    this.boxverts[5] =[ this.boxverts[5][0]  - this.realposition[0], this.boxverts[5][1] - this.realposition[1],  this.boxverts[5][2] - this.realposition[2] ];
    //F bottom right
    this.boxverts[6] =[ this.boxverts[6][0]  - this.realposition[0], this.boxverts[6][1] - this.realposition[1],  this.boxverts[6][2] - this.realposition[2] ]; 
    //B bottom right  
    this.boxverts[7] =[ this.boxverts[7][0]  - this.realposition[0], this.boxverts[7][1] - this.realposition[1] , this.boxverts[7][2] - this.realposition[2] ];

  }
}



/*
  Copyright (c) 2009 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class c3dl.Actor is a base class for 3D objects.
 */
c3dl.Actor = function ()
{
  // Raw Position Values
  this.left = c3dl.makeVector(1.0, 0.0, 0.0); // Left vector
  this.up = c3dl.makeVector(0.0, 1.0, 0.0); // Up Vector
  this.dir = c3dl.makeVector(0.0, 0.0, 1.0); // Forward Vector
  this.pos = c3dl.makeVector(0.0, 0.0, 0.0); // Position
  this.scaleVec = c3dl.makeVector(1.0, 1.0, 1.0); // Scale
  // Delta Values for Animations
  this.linVel = c3dl.makeVector(0.0, 0.0, 0.0); // Animation of positions
  this.angVel = c3dl.makeVector(0.0, 0.0, 0.0); // Animations of rotation around (side Vector, up Vector, dir Vector)
  this.name = "unnamed";
}

// -------------------------------------------------------
// Getters
/**
 Get the position of the Actor relative to the world origin.
 
 @returns {Array} The position of the Actor.
 */
c3dl.Actor.prototype.getPosition = function ()
{
  return c3dl.copyVector(this.pos);
}

/**
 The the Up Vector of the actor.
 
 @returns {Array} The up Vector of the actor.
 */
c3dl.Actor.prototype.getUp = function ()
{
  return c3dl.copyVector(this.up);
}

/**
 Get the direction of the actor, where the actor is 
 'pointing' or looking'.
 
 @returns {Array} The direction of the actor.
 */
c3dl.Actor.prototype.getDirection = function ()
{
  return c3dl.copyVector(this.dir);
}

/**
 Get the left Vector of the actor.
 
 @returns {Array} The left Vector of the actor.
 */
c3dl.Actor.prototype.getLeft = function ()
{
  return c3dl.copyVector(this.left);
}

/**
 Get the linear velocity of the Actor.
 
 @returns {Array} The linear velocity of the Actor.
 */
c3dl.Actor.prototype.getLinearVel = function ()
{
  return c3dl.copyVector(this.linVel);
}

/**
 Get the angular velocity of the Actor.
 
 @returns {Array} The angular velocity of the Actor.
 */
c3dl.Actor.prototype.getAngularVel = function ()
{
  return c3dl.copyVector(this.angVel);
}

/**
 Get the scale factor of the Actor.  It has a default value 
 of (1,1,1) when created.
 
 @returns {Array} The scale amount of the Actor.
 */
c3dl.Actor.prototype.getScale = function ()
{
  return c3dl.copyVector(this.scaleVec[0], this.scaleVec[1], this.scaleVec[2]);
}

/**
 Get the transformation of this node. Keep in mind that
 if this node is 'animated', the matrix will be changing with 
 each update(). In that case, the matrix this function returns
 will the the state the matrix is in at the time the function is called.
 
 @return {Array}
 */
c3dl.Actor.prototype.getTransform = function ()
{
  var mat = c3dl.makePoseMatrix(this.left, this.up, this.dir, this.pos);
  var smat = c3dl.makeMatrix();
  c3dl.setMatrix(smat, this.scaleVec[0], 0, 0, 0, 0, this.scaleVec[1], 0, 0, 0, 0, 
    this.scaleVec[2], 0, 0, 0, 0, 1);
  mat = c3dl.multiplyMatrixByMatrix(mat, smat);
  return mat;
}


c3dl.Actor.prototype.getRotateMat = function ()
{
  return c3dl.makePoseMatrix(this.left, this.up, this.dir, [0,0,0]);
}

/**
 Get the name of this actor.
 
 @returns {String} actor's name
 */
c3dl.Actor.prototype.getName = function ()
{
  return this.name;
}

// Setters	
/**
 Set the transformation of this actor.
 
 @param {Array} mat
 */
c3dl.Actor.prototype.setTransform = function (mat)
{
  this.left = c3dl.makeVector(mat[0], mat[1], mat[2]);
  this.up = c3dl.makeVector(mat[4], mat[5], mat[6]);
  this.dir = c3dl.makeVector(mat[8], mat[9], mat[10]);
  this.pos = c3dl.makeVector(mat[12], mat[13], mat[14]);
}

/**
 */
c3dl.Actor.prototype.resetTransform = function ()
{
  this.angVel = c3dl.makeVector(0.0, 0.0, 0.0);
  this.linVel = c3dl.makeVector(0.0, 0.0, 0.0);
  this.left = c3dl.makeVector(1.0, 0.0, 0.0);
  this.up = c3dl.makeVector(0.0, 1.0, 0.0);
  this.dir = c3dl.makeVector(0.0, 0.0, 1.0);
  this.pos = c3dl.makeVector(0.0, 0.0, 0.0);
}



/**
 Scale the  Actor relative to its current scaling value.	
 Attempts to scale the x, y or z values of the Actor less 
 than or equal to zero will be ignored.
 
 @param {Array} scaleVec The amount to scale the Actor.
 */
c3dl.Actor.prototype.scale = function (scaleVec)
{
  // none of the values should be less than or equal to zero
  if (scaleVec[0] > 0.0 && scaleVec[1] > 0.0 && scaleVec[2] > 0.0)
  {
    this.scaleVec[0] = this.scaleVec[0] * scaleVec[0]; 
	this.scaleVec[1] = this.scaleVec[1] * scaleVec[1]; 
    this.scaleVec[2] = this.scaleVec[2] * scaleVec[2];
  }
}
 
/**
 Set the new location of the Actor.
 
 @param {Array} vecPos A vector containing the new location for the actor.
 */
c3dl.Actor.prototype.setPosition = function (vecPos)
{
  this.pos[0] = vecPos[0];
  this.pos[1] = vecPos[1];
  this.pos[2] = vecPos[2];
}

/**
 Move the object relative to where it is currently, not relative 
 to the origin.
 
 @param {Array} translation A vector which represents 
 how far away to move the actor from its current location.
 */
c3dl.Actor.prototype.translate = function (translation)
{
  this.pos = c3dl.addVectors(this.pos, translation);
}


/**
 Set the point in space where the Actor will look at (No Animation).
 
 @param {Array} newVec
 */
c3dl.Actor.prototype.setForward = function (newVec)
{
  this.dir = this.pos;
  c3dl.subtractVectors(this.dir, newVec, this.dir);
  c3dl.normalizeVector(this.dir);
  // Adjust the Up and Left vectors accordingly
  c3dl.vectorCrossProduct(this.up, this.dir, this.left);
  c3dl.normalizeVector(this.left);
  c3dl.vectorCrossProduct(this.dir, this.up, this.up);
  c3dl.normalizeVector(this.up);
}

/**
 Set the orientation of Up (No Animation)
 
 @param {Array} newVec
 */
 
c3dl.Actor.prototype.setUpVector = function (newVec)
{
  this.up[0] = newVec[0];
  this.up[1] = newVec[1];
  this.up[2] = newVec[2];
}

/**
 Set a new Linear Velocity that will be added to the Position on every update
 
 @param {Array} newVec
 */
c3dl.Actor.prototype.setLinearVel = function (newVec)
{
  this.linVel[0] = newVec[0];
  this.linVel[1] = newVec[1];
  this.linVel[2] = newVec[2];
}

/**
 Set a new Angular Veclocity that will be added to the rotation on 
 every update.
 
 @param {Array} newVec
 */
c3dl.Actor.prototype.setAngularVel = function (newVec)
{
  this.angVel[0] = newVec[0];
  this.angVel[1] = newVec[1];
  this.angVel[2] = newVec[2];
}

/**
 Set the name of this actor.
 
 @param {String} name The new name of for this actor.
 */
c3dl.Actor.prototype.setName = function (name)
{
  this.name = name;
}

// -------------------------------------------------------
/**
 Rotate Actor on an axis which is centered on the position of 
 the Actor.
 
 @param {Array} axisVec
 @param {float} angle in radians.
 */
c3dl.Actor.prototype.rotateOnAxis = function (axisVec, angle)
{
  var rotateOnAxisQuat = c3dl.makeQuat(0, 0, 0, 0);
  var rotateOnAxisMat = c3dl.makeZeroMatrix();
  
  if (angle == 0)
  {
    return;
  }

  // Create a proper Quaternion based on location and angle
  c3dl.axisAngleToQuat(axisVec, angle, rotateOnAxisQuat);

  // Create a rotation Matrix out of this quaternion
  rotateOnAxisMat = c3dl.quatToMatrix(rotateOnAxisQuat);

  // Apply changes to the remaining vectors
  //
  c3dl.multiplyMatrixByVector(rotateOnAxisMat, this.dir, this.dir);
  c3dl.normalizeVector(this.dir);

  c3dl.multiplyMatrixByVector(rotateOnAxisMat, this.left, this.left);
  c3dl.normalizeVector(this.left);

  c3dl.multiplyMatrixByVector(rotateOnAxisMat, this.up, this.up);
  c3dl.normalizeVector(this.up);
}

/**
 Rotate around the Up Vector by a hard amount (No Animation)
 
 @param {float} angle in radians.
 */
c3dl.Actor.prototype.yaw = function (angle)
{
  if (angle != 0)
  {
    this.rotateOnAxis(this.up, angle);
  }
}

/**
 Rotate around the Dir Vector by a hard amount (No Animation)
 
 @param {float} angle in radians.
 */
c3dl.Actor.prototype.roll = function (angle)
{
  if (angle != 0)
  {
    this.rotateOnAxis(this.dir, angle);
  }
}

/**
 Rotate around the Side Vector by a hard amount (No Animation)
 
 @param {float} angle in radians.
 */
c3dl.Actor.prototype.pitch = function (angle)
{
  if (angle != 0)
  {
    this.rotateOnAxis(this.left, angle);
  }
}

/**
 @private
 
 Called automatically. Update animations, etc.
 
 @param {float} timeStep
 */
c3dl.Actor.prototype.update = function (timeStep)
{

}

/**
 @private
 */
c3dl.Actor.prototype.getCopy = function ()
{
  var actor = new c3dl.Actor();
  actor.clone(this);
  return actor;
}


/**
 */
c3dl.Actor.getObjectType = function ()
{
  return c3dl.COLLADA;
}

/**
 @private
 */
c3dl.Actor.prototype.clone = function (other)
{
  this.left = c3dl.copyVector(other.left);
  this.up = c3dl.copyVector(other.up);
  this.dir = c3dl.copyVector(other.dir);
  this.pos = c3dl.copyVector(other.pos);
  this.scaleVec = c3dl.copyVector(other.scaleVec);
  this.linVel = c3dl.copyVector(other.linVel);
  this.angVel = c3dl.copyVector(other.angVel);
  this.name = other.name;
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/*
 @class
*/
c3dl.Primitive = c3dl.inherit(c3dl.Actor, function ()
{
  c3dl._superc(this);

  // Member Variables
  this.isPickable = true;
  this.visible = true;
});


// -------------------------------------------------------
// Getters
/*
 Can this object be picked when the user clicks on it?  In some scripts using
 the library, it may not make sense for wall, for example to be picked.  If the
 object cannot be picked, it will not tested against the ray which is generated
 then the user clicks the canvas, thus increasing performance.
 
 @returns {bool} true if the object can be picked, false otherwise.
 */
c3dl.Primitive.prototype.getPickable = function ()
{
  return this.isPickable;
}

/*
 Will the Primitive be visible in the scene?
 
 @returns {boolean} true if the object is rendered.
 */
c3dl.Primitive.prototype.isVisible = function ()
{
  return this.visible;
}

// -------------------------------------------------------
// Setters	
/**
 Set the visibility state.
 
 @param {boolean} show Either a true or false value which will 
 show or hide the object when rendering.
 */
c3dl.Primitive.prototype.setVisible = function (show)
{
  this.visible = show;
}

/*
  Set whether this object should be included in picking tests.  By omitting
  objects which should not be interacted with, it can increase performance.

  @param {bool} isPickable true if the object should be included in pikcing tests,
  false otherwise.
*/
c3dl.Primitive.prototype.setPickable = function (isPickable)
{
  this.isPickable = isPickable;
}

/*
  @private
*/
c3dl.Primitive.prototype.getCopy = function ()
{
  var primitive = new c3dl.Primitive();
  primitive.clone(this);
  return primitive;
}

/**
 @private
 */
c3dl.Primitive.prototype.clone = function (other)
{
  c3dl._super(this, arguments, "clone");

  this.visible = other.visible;
  this.isPickable = other.isPickable;
  this.visible = other.visible;
}

/**
 @private
 */
c3dl.Primitive.prototype.render = function (glCanvas3D, scene)
{
}/*
  Copyright (c) 2009 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class c3dl.Point is an object with a position and color which will be
 rendered using WebGL's built-in point rendering (either as a circle or
 square depending on smoothing) or rendered as sphere meshes.<br />
 <br />
 The default rendering mode for any scene renders the points as sphere
 meshes.
 */
c3dl.Point = function ()
{
  // no alpha, but may be implemented in the future. 
  this.color = c3dl.makeVector(0, 0, 0);

  //
  this.position =c3dl.makeVector(0, 0, 0);

  //
  this.visible = true;

  // not completely necessary since the user can handle this easily themselves.
  // Was added just for a bit of convenience.
  this.name = "";

  /**
   Get the name of this point. The name is empty by default.
   
   @returns {String} name of this point.
   */
  this.getName = function ()
  {
    return this.name;
  }

  /**
   Set the name of this point. The default name set is empty.
   
   @param {String} name The name to assign this point.
   */
  this.setName = function (name)
  {
    this.name = name;
  }

  /**
   Get the position of the point.
   
   @returns {Array} Array of 3 values in the order [x,y,z].
   */
  this.getPosition = function ()
  {
    return c3dl.copyObj(this.position);
  }

  /**
   Set the position of point.
   
   @param {Array} pos Array of 3 values in the order [x,y,z] which defines the 
   new coordinate for this point.
   */
  this.setPosition = function (pos)
  {
    if (pos.length == 3)
    {
      this.position = c3dl.copyObj(pos);
    }
    else
    {
      c3dl.debug.logWarning("invalid value passed to Point::setPosition()");
    }
  }

  /**
   Get the color of this point.
   
   @returns {Array} Three floating point values in the order RGB.
   */
  this.getColor = function ()
  {
    return c3dl.copyObj(this.color);
  }

  /**
   Set the color of this point.
   
   @param {Array} color An array of 3 values in the order RGB. Each component 
   ranges from 0.0 to 1.0.
   */
  this.setColor = function (color)
  {
    if (color.length == 3)
    {
      this.color = c3dl.copyObj(color);
    }
    else
    {
      c3dl.debug.logWarning("invalid value passed to Point::setColor()");
    }
  }

  /**
   Get the visibility of the point.
   
   @returns {bool} visible true if the point should be rendered, otherwise false.
   */
  this.isVisible = function ()
  {
    return this.visible;
  }

  /**
   Set the visibility of this point.
   
   @param {bool} visible true if the point should be visible, otherwise false.
   */
  this.setVisible = function (visible)
  {
    this.visible = visible;
  }

  /**
   */
  this.getObjectType = function ()
  {
    return c3dl.POINT;
  }
}/*
  Copyright (c) 2009 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class c3dl.Line represents a line segment in 3D space. The beginning and ending
 coordinates have their own color.  If the beginning and ending colors are different,
 the line will be drawn with a gradient color change.<br />
 <br />
 The default color of the line is black and the default coordinates
 are both [0,0,0], which results in the line not being rendered.The default width
 is 1 pixel.
 */
c3dl.Line = function ()
{
  // begin and end coordinates in the order [x,y,z].
  this.coords = new C3DL_FLOAT_ARRAY([0, 0, 0, 0, 0, 0]);

  // begin and end colors in the order [r,g,b].
  this.colors = new C3DL_FLOAT_ARRAY([0, 0, 0, 0, 0, 0]);

  // Will the line be drawn on render?
  this.visible = true;

  // The default width of the line is 1 pixel.
  this.width = 1.0;

  /**
   Set the begin and end coordinates.
   
   @param {Array} beginCoord Array of 3 values in the order [x,y,z], where 
   the line segment begins.
   
   @param {Array} endCoord Array of 3 values in the order [x,y,z], where 
   the line segment ends.
   */
  this.setCoordinates = function (beginCoord, endCoord)
  {
    if (beginCoord.length == 3 && endCoord.length == 3)
    {
      this.coords[0] = beginCoord[0];
      this.coords[1] = beginCoord[1];
      this.coords[2] = beginCoord[2];

      this.coords[3] = endCoord[0];
      this.coords[4] = endCoord[1];
      this.coords[5] = endCoord[2];
    }
    else
    {
      c3dl.debug.logWarning("invalid values passed to Line::setCoordinates()");
    }
  }


  /**
   Set the color of each end of the line.  A line can rendered using a solid color (by assigning
   both ends of the line the same color), or a color gradient from beginColor and endColor.
   The beginColor sets the color of the first coordinate of the line. The endColor sets the 
   end coordinate of the line. The rendered pixels in between transition from one color to 
   the other.
   
   @param {Array} beginColor An array of 3 values in the order [r,g,b]. Each component must 
   range from 0.0 to 1.0.
   
   @param {Array} endColor An array of 3 values in the order [r,g,b]. Each component must 
   range from 0.0 to 1.0.
   */
  this.setColors = function (beginColor, endColor)
  {
    if (beginColor.length == 3 && endColor.length == 3)
    {
      this.colors[0] = beginColor[0];
      this.colors[1] = beginColor[1];
      this.colors[2] = beginColor[2];

      this.colors[3] = endColor[0];
      this.colors[4] = endColor[1];
      this.colors[5] = endColor[2];
    }
    else
    {
      c3dl.debug.logWarning("invalid values passed to Line::setColors");
    }
  }

  /**
   Set the line's visibility.
   
   @param {bool} visible true if the line should be rendered.
   */
  this.setVisible = function (visible)
  {
    this.visible = visible;
  }

  /**
   Get the visibility of the line.
   
   @returns {bool} true if the line is rendered, otherwise false.
   */
  this.isVisible = function ()
  {
    return this.visible;
  }

  /**		
   Set the width the line in pixels. A line width of 1 is guaranteed to be supported. 
   However, the maximum supported width for lines is implementation dependent. To get the
   maximum supported line width, call Renderer's getMaxLineWidth() once the scene and renderer
   have been initialized.
   
   @param {float} width Specified in pixels. Must be at least 1. Will be rounded to 
   the nearest integer.
   */
  this.setWidth = function (width)
  {
    // if a line width of 0 is passed to WebGL, it will use a line with of 1, so 
    // don't bother allowing the user to specify anything below 1.
    if (width >= 1)
    {
      this.width = width;
    }
  }

  /**
   Get the width the line in pixels.
   
   @returns {float} The width of the line in pixels.
   */
  this.getWidth = function ()
  {
    return this.width;
  }

  /**
   Get the beginning and ending coordinates.
   
   @returns {Array} Array of 6 values. first 3 values represent the coordinates 
   of the beginning of the line. The last 3 values represent the coordinates
   of the end of the line in the order [x,y,z].
   */
  this.getCoordinates = function ()
  {
    return new C3DL_FLOAT_ARRAY([this.coords[0], this.coords[1], this.coords[2], this.coords[3], this.coords[4], this.coords[5]]);
  }

  /**
   Get beginning and ending colors of the line.
   
   @returns {Array} Array of 6 values. First 3 represent beginning color, last 3 represent
   ending color in the order [r,g,b].
   */
  this.getColors = function ()
  {
    return new C3DL_FLOAT_ARRAY([this.colors[0], this.colors[1], this.colors[2], this.colors[3], this.colors[4], this.colors[5]]);
  }

  /**
   */
  this.getObjectType = function ()
  {
    return c3dl.LINE;
  }
}function Frustum(frustumMatrix) {
  this.frustumPlane = [];
  //right
  this.frustumPlane[0] = new Plane();
  this.frustumPlane[0].normal[0]=frustumMatrix[3]-frustumMatrix[0];
  this.frustumPlane[0].normal[1]=frustumMatrix[7]-frustumMatrix[4];
  this.frustumPlane[0].normal[2]=frustumMatrix[11]-frustumMatrix[8];
  this.frustumPlane[0].offset=frustumMatrix[15]-frustumMatrix[12];
  //left
  this.frustumPlane[1] = new Plane();
  this.frustumPlane[1].normal[0]=frustumMatrix[3]+frustumMatrix[0];
  this.frustumPlane[1].normal[1]=frustumMatrix[7]+frustumMatrix[4];
  this.frustumPlane[1].normal[2]=frustumMatrix[11]+frustumMatrix[8];
  this.frustumPlane[1].offset=frustumMatrix[15]+frustumMatrix[12];
  //bottom
  this.frustumPlane[2] = new Plane();
  this.frustumPlane[2].normal[0]=frustumMatrix[3]+frustumMatrix[1];
  this.frustumPlane[2].normal[1]=frustumMatrix[7]+frustumMatrix[5];
  this.frustumPlane[2].normal[2]=frustumMatrix[11]+frustumMatrix[9];
  this.frustumPlane[2].offset=frustumMatrix[15]+frustumMatrix[13];
  //top
  this.frustumPlane[3] = new Plane();
  this.frustumPlane[3].normal[0]=frustumMatrix[3]-frustumMatrix[1];
  this.frustumPlane[3].normal[1]=frustumMatrix[7]-frustumMatrix[5];
  this.frustumPlane[3].normal[2]=frustumMatrix[11]-frustumMatrix[9];
  this.frustumPlane[3].offset=frustumMatrix[15]-frustumMatrix[13];
  //far
  this.frustumPlane[4] = new Plane();
  this.frustumPlane[4].normal[0]=frustumMatrix[3]-frustumMatrix[2];
  this.frustumPlane[4].normal[1]=frustumMatrix[7]-frustumMatrix[6];
  this.frustumPlane[4].normal[2]=frustumMatrix[11]-frustumMatrix[10];
  this.frustumPlane[4].offset=frustumMatrix[15]-frustumMatrix[14] ;
  //near
  this.frustumPlane[5] = new Plane();
  this.frustumPlane[5].normal[0]=frustumMatrix[3]+frustumMatrix[2];
  this.frustumPlane[5].normal[1]=frustumMatrix[7]+frustumMatrix[6];
  this.frustumPlane[5].normal[2]=frustumMatrix[11]+frustumMatrix[10];
  this.frustumPlane[5].offset=frustumMatrix[15]+frustumMatrix[14];
  for(var j=0; j<6; j++) {
    this.frustumPlane[j].normalize();
  }		
  this.sphereInFrustum = function(boundingSphere) {
    for(var i = 0; i < 6; i++) {
	  var pos = boundingSphere.getPosition();					
	  var d = this.frustumPlane[i].normal[0] * pos[0] + this.frustumPlane[i].normal[1]* pos[1] +
              this.frustumPlane[i].normal[2]* pos[2] + this.frustumPlane[i].offset;
	  if(d <=-boundingSphere.getRadius()) {
		return "OUTSIDE"; 
	  }
    }
    return "INSIDE";
  } 
  this.boundingBoxInfrustumPlane= function(pos, size)
  {
    for(var i = 0; i < 6; i++ )
    {
      if( this.frustumPlane[i].normal[0] * (pos[0] - size) + this.frustumPlane[i].normal[1] * (pos[1] - size) + this.frustumPlane[i].normal[2] * (pos[2] - size) + this.frustumPlane[i].offset < 0 )
        return "OUTSIDE";
      if( this.frustumPlane[i].normal[0] * (pos[0] + size) + this.frustumPlane[i].normal[1] * (pos[1] - size) + this.frustumPlane[i].normal[2] * (pos[2] - size) + this.frustumPlane[i].offset < 0 )
        return "OUTSIDE";
      if( this.frustumPlane[i].normal[0] * (pos[0] - size) + this.frustumPlane[i].normal[1] * (pos[1] + size) + this.frustumPlane[i].normal[2] * (pos[2] - size) + this.frustumPlane[i].offset < 0 )
        return "OUTSIDE";
      if( this.frustumPlane[i].normal[0] * (pos[0] + size) + this.frustumPlane[i].normal[1] * (pos[1] + size) + this.frustumPlane[i].normal[2] * (pos[2] - size) + this.frustumPlane[i].offset < 0 )
        return "OUTSIDE";
      if( this.frustumPlane[i].normal[0] * (pos[0] - size) + this.frustumPlane[i].normal[1] * (pos[1] - size) + this.frustumPlane[i].normal[2] * (pos[2] + size) + this.frustumPlane[i].offset < 0 )
        return "OUTSIDE";
      if( this.frustumPlane[i].normal[0] * (pos[0] + size) + this.frustumPlane[i].normal[1] * (pos[1] - size) + this.frustumPlane[i].normal[2] * (pos[2] + size) + this.frustumPlane[i].offset < 0 )
        return "OUTSIDE";
      if( this.frustumPlane[i].normal[0] * (pos[0] - size) + this.frustumPlane[i].normal[1] * (pos[1] + size) + this.frustumPlane[i].normal[2] * (pos[2] + size) + this.frustumPlane[i].offset < 0 )
        return "OUTSIDE";
      if( this.frustumPlane[i].normal[0] * (pos[0] + size) + this.frustumPlane[i].normal[1] * (pos[1] + size) + this.frustumPlane[i].normal[2] * (pos[2] + size) + this.frustumPlane[i].offset < 0 )
        return "OUTSIDE";
    }
    return "INSIDE";
  }
}function Plane() {
  this.normal = new C3DL_FLOAT_ARRAY(3);
  this.offset = null;
  this.init = function(normal, offset) {
		this.normal[0] = normal[0];
		this.normal[1] = normal[1];
		this.normal[2] = normal[2];
		this.offset = offset;
  }
  this.normalize = function() {
    var norm = Math.sqrt( this.normal[0] * this.normal[0] + this.normal[1] * this.normal[1] + 
		    this.normal[2] * this.normal[2]);
	this.normal[0] /= norm;
	this.normal[1] /= norm;
	this.normal[2] /= norm;
	this.offset /= norm;
	}
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class A Scene should be thought of as a scene on a movie set.  A scene 
 would typically contain objects which are moving and a current camera,
 lights, etc.
 */
c3dl.Scene = function ()
{
  // Engine Variables
  var glCanvas3D = null; // WebGL Context (Canvas)
  var renderer = null;
  var camera = null; // Reference to a Camera type
  var projMat = null;

  // Picking is implemented as a class, should be changed
  // to a function. For now we need to make an instance of the class. 
  // We store this in this.pick.
  this.pick;
  this.pickingPrecision = c3dl.PICK_PRECISION_TRIANGLES;

  // This will hold the function the user wants called everytime 
  // there is a mouse down event.
  this.pickingHandler;

  // This is off by default since users will likely only need it when
  // trying to debug something.
  this.boundingVolumesVisible = false;

  // A reference to a model which will actually act as a 
  // SkyBox, except any Model can be used, not just a box.
  var skyModel = null;

  // list of objects in the scene and list of lights
  var objList = []; // An array of objects to draw
  var lightList = [c3dl.MAX_LIGHTS];

  // each scene has its own point attenuation factors giving the user
  // the flexibility to have different factors for each scene.
  var pointAttenuation = c3dl.makeVector(1, 0, 0);
  var pointSize = 5;
  var pointSmoothing = true;

  // default point rendering to spheres to prevent possible crashing
  // when users render points which playing a DVD on OS X.
  var pointRenderingMode = c3dl.POINT_MODE_SPHERE;
  var pauseFlag = false; //Pause the render loop
  var exitFlag = false; // Exits the render loop
  var canvasTag = null;
  var canvas2Dlist = [];

  // Input Handler Variables
  var kybdHandler = null;
  var mouseHandler = null;
  var updateHandler = null;

  // Performance variables
  var timerID = 0;
  var lastTimeTaken = Date.now();
  var numFramesSinceSceneStart = 0;

  // this is re-calculated every second and queried with getFPS();
  var FPS = 0;
  // will be reset after calculating the FPS.
  var FPS_Counter = 0;
  var FPS_LastTimeTaken = Date.now();

  // This will be the color of the background if the user does not change it.
  var backgroundColor = [c3dl.DEFAULT_BG_RED, c3dl.DEFAULT_BG_GREEN, c3dl.DEFAULT_BG_BLUE];
  var ambientLight = c3dl.makeVector(1, 1, 1);
  var thisScn = null;

  // If the user calls addTexture on scene, but the scene does not have
  // a renderer, there's no was for the texture to be created. In that case
  // place the texture path in a queue which will be passed to the renderer 
  // once it is set.
  var textureQueue = [];
  var pointPositions = null;
  //type of culling 
  var culling = "BoundingSphere"

  // -------------------------------------------------------
  /**
   Add a texture to this scene to be used used for assigning to a model,
   particle system etc. 
   
   If the renderer was not set for the scene, the texture will be queued and
   will begin to load once the renderer is set
   
   @param {String} path
   */
/*	this.addTexture = function(path)
	{
		// check path parameter
		if(path)
		{
			if(renderer && renderer.getGLContext())
			{
				renderer.addTexture(path);
			}
			else
			{
				textureQueue.push(path);
			}
		}
		else
		{
			c3dl.debug.logWarning("Invalid parameter, '" + path + "' was passed to Scene's addTexture()");
		}
	}*/

  /**
   
   */
/*	this.getTextureID = function(path)
	{
		if(renderer)
		{
			return renderer.getTextureID(path);
		}
		else
		{
			return -1;
		}
	}*/

  /**
   @returns {Array} 
   */
  this.getPointAttenuation = function ()
  {
    return [pointAttenuation[0], pointAttenuation[1], pointAttenuation[2]];
  }

  /**
   If point smoothing is on, points are rendered as circles, otherwise they are rendered as
   squares.
   
   @returns {bool} true if points will be rendered as circles, false if points are rendered as
   squares.
   */
  this.getPointSmooth = function ()
  {
    return pointSmoothing;
  }

  /**
   @private
   
   When the picking function runs, it needs the projection matrix
   which was used to render the scene. Since one camera can be used for
   many scenes, we can't get the projection from the camera because it would
   change each time a canvas with a different aspect ratio is rendered.
   
   We have to provide a accessor to the projection matrix at the scene level.
   */
  this.getProjectionMatrix = function ()
  {
    return projMat;
  }

  /**
   @private
   
   Will the bounding volumes be drawn on render?
   
   @returns {boolean} true if the bounding volumes will be drawn, false otherwise.
   */
  this.getBoundingVolumeVisibility = function ()
  {
    return this.boundingVolumesVisible;
  }

  /**
   Get the camera of the scene.
   
   @returns {Camera} The camera of the scene.
   */
  this.getCamera = function ()
  {
    return camera;
  }

  /**
   Get the number of objects in the scene.
   
   @returns {int} The number of objects in the object list.
   */
  this.getObjListSize = function ()
  {
    return objList.length;
  }

  /**
   Get the context.
   
   @returns {Context}
   */
  this.getGL = function ()
  {
    return glCanvas3D;
  }

  /**
   Get the amount of frames rendered since the start of the scene.
   @private
   */
  this.getTotalFrameCount = function ()
  {
    return numFramesSinceSceneStart;
  }

  /**
   Get the number of frames rendered in the last second.
   
   @returns {float} the number of frames rendered in the 
   last second.
   */
  this.getFPS = function ()
  {
    return FPS;
  }

  /**
   Get the scene's Renderer
   */
  this.getRenderer = function ()
  {
    return renderer;
  }

  /**
   Get the Scene.
   
   @returns {c3dl.Scene}
   */
  this.getScene = function ()
  {
    return thisScn;
  }

  /**
   Get the SkyModel.
   
   @returns {c3dl.Collada} The Scene's SkyModel.
   */
  this.getSkyModel = function ()
  {
    return skyModel;
  }

  /**
   Get the ambient light of the scene.
   
   @returns {Array} An Array of 3 values in the order RGB.
   */
  this.getAmbientLight = function ()
  {
    return [ambientLight[0], ambientLight[1], ambientLight[2]];
  }

  /**
   Get a reference of a particular object in the scene.
   
   @param indxNum The index number of the object.
   
   @return the reference to the object at index number indxNum or null 
   if indxNum was out of bounds.
   */
  this.getObj = function (indxNum)
  {
    if (isNaN(indxNum))
    {
      c3dl.debug.logWarning("Scene::getObj() called with a parameter that's not a number");
      return null;
    }
    // Check if the index that was asked for is inside the bounds of our array
    if (indxNum < 0 || indxNum >= objList.length)
    {
      c3dl.debug.logWarning("Scene::getObj() called with " + indxNum + ", which is not betwen 0 and " + objList.length);
      return null;
    }

    // We do this because we dont want outsiders modifying the object list,
    // just the object themselves (ie. changing position, orientation, etc)
    return objList[indxNum];
  }


  /**
   Get the type of test which will run when a user clicks on the canvas.
   
   @returns c3dl.PICK_PRECISION_BOUNDING_VOLUME or c3dl.PICK_PRECISION_TRIANGLE.
   */
  this.getPickingPrecision = function ()
  {
    return this.pickingPrecision;
  }


  /**
   @private
   
   @param {boolean} visible true if the bounding volumes should be drawn, otherwise
   set to false.
   */
  this.setBoundingVolumeVisibility = function (visible)
  {
    this.boundingVolumesVisible = visible;
  }


  /**
   Set the functions to call when a key is pressed or released. <br />
   TODO: add keyPress event callback as windows and osx versions of firefox
   handle keyboard events differently.
   
   @param {function} keyUpCB The callback function for the up key.		
   @param {function} keyDownCD The callback function for the down key.
   */
  this.setKeyboardCallback = function (keyUpCB, keyDownCB)
  {
    if (canvasTag)
    {
      // Register True keyboard listeners
      if (keyUpCB != null) document.addEventListener("keyup", keyUpCB, false);
      if (keyDownCB != null) document.addEventListener("keydown", keyDownCB, false);
    }
  }

  /**
   Pass in the functions to call when mouse event occur such as when 
   a button is pressed, released or the mousewheel is scrolled.  The
   scene will call these functions when the events occur.
   
   @param {function} mouseUpCB
   @param {function} mouseDownCB
   @param {function} mouseMoveCB
   @param {function} mouseScrollCB
   */
  this.setMouseCallback = function (mouseUpCB, mouseDownCB, mouseMoveCB, mouseScrollCB)
  {
    if (canvasTag)
    {
      // Register all Mouse listeners
      if (mouseMoveCB != null) canvasTag.addEventListener("mousemove", mouseMoveCB, false);
      if (mouseUpCB != null) canvasTag.addEventListener("mouseup", mouseUpCB, false);
      if (mouseDownCB != null) canvasTag.addEventListener("mousedown", mouseDownCB, false);

      // Firefox uses DOMMouseScroll, Safari and Chrome use mousewheel
      if (mouseScrollCB != null)
      {
        canvasTag.addEventListener("DOMMouseScroll", mouseScrollCB, false);
        canvasTag.addEventListener("mousewheel", mouseScrollCB, false);
      }
    }
  }

  /**
   Tell the scene what function to call when a user clicks on the canvas.
   
   @param {function} pickingHandler The function to call when the user clicks on the canvas.
   */
  this.setPickingCallback = function (pickingHandler)
  {
    if (pickingHandler && pickingHandler instanceof Function)
    {
      // for now we need to make an instance, this needs to be changed.
      this.pick = new c3dl.Picking(this);

      // set the picking handler
      this.pickingHandler = pickingHandler;
      canvasTag.addEventListener("mousedown", this.pick.onMouseDown, false);
    }
    else
    {
      c3dl.debug.logWarning("scene's setPickingCallback() was passed an invalid callback function");
    }
  }

  /**
   Get the function which will be called when the user clicks on the
   canvas.
   
   @returns {Function} the function which is called when the user clicks
   on the canvas.
   */
  this.getPickingCallback = function ()
  {
    return this.pickingHandler;
  }

  /**
   Set how the points attenuate for this scene.
   
   @param {Array} attn with three values.<br />
   first contains constant attenuation<br />
   second contains linear attenuation<br />
   third contains quadratic attenuation<br />
   At least one of the elements must be greater than one or the 
   argument is ignored.
   */
  this.setPointAttenuation = function (attn)
  {
    if (attn.length == 3 && (attn[0] > 0 || attn[1] > 0 || attn[2] > 0))
    {
      pointAttenuation[0] = attn[0];
      pointAttenuation[1] = attn[1];
      pointAttenuation[2] = attn[2];
    }
  }

  /**
   If point smoothing is on, points are rendered as circles, otherwise they are rendered as
   squares.
   
   @returns {bool} true if points are rendered as circles, false if points are rendered as squares.
   */
  this.setPointSmooth = function (smooth)
  {
    pointSmoothing = smooth;
  }

  /**		
   Get the size of the spheres when they are rendered as points.
   
   @returns {float} size the points will be when they are rendered as
   spheres.
   */
  this.getPointSize = function ()
  {
    return pointSize;
  }

  /**
   Sets the point size when rendering points as spheres.
   To change point size when rendering points as circles,
   or using the built-in points, use setPointAttenuation.
   
   @param {float} size Must be greater than zero.
   */
  this.setPointSize = function (size)
  {
    if (size > 0)
    {
      pointSize = size;
    }
  }

  /**
   Set the SkyModel. A SkyModel acts like a skybox, when the camera 
   moves in the scene the SkyModel maintains the same distance from 
   the camera.  This creates the illusion that there are parts to 
   the scene that are very far away which cannot be reached.  
   Applications of this would include creating clouds, or mountain 
   ranges, starfields, etc.  Any Model can be passed in and is not
   restricted to a Cube.  Whatever model that is appropirate should 
   be used.
   
   @param {c3dl.Collada} sky A Model which will maintain the same distance 
   from the Scene's camera.
   */
  this.setSkyModel = function (sky)
  {
    if (sky instanceof c3dl.Collada)
    {
      skyModel = sky;
    }
    else
    {
      c3dl.debug.Warning("Scene::setSkyModel() Inavlid argument passed, was not c3dl.Collada.");
    }
  }

  /**
   Set the function to call everytime the scene is updated.
   
   @param {function} updateCB The function to call everytime the
   scene is updated.
   */
  this.setUpdateCallback = function (updateCB)
  {
    if (canvasTag)
    {
      if (updateCB != null)
      {
        updateHandler = updateCB;
      }
    }
  }

  /**
   Set the renderer used to render the scene.
   
   @param {c3dl.WebGL} renderType
   */
  this.setRenderer = function (renderType)
  {
    // Set the type of renderer to use
    if (renderType instanceof c3dl.WebGL)
    {
      renderer = renderType;
    }
  }

  /**
   @param {String} canvasTagID The id of the canvas, which is
   a property of the canvas tag in the html file.
   */
  this.setCanvasTag = function (canvasTagID)
  {
    // Get the Canvas tag
    canvasTag = document.getElementById(canvasTagID);
    if (canvasTag == null)
    {
      c3dl.debug.logWarning('Scene::setCanvasTag() No canvas tag with name ' + canvasTagID + ' was found.');
    }
  }

  /**
   Return the canvas
   */
  this.getCanvas = function ()
  {
    return canvasTag;
  }

  /**
   Set the Scene's camera.
   
   @param {c3dl.FreeCamera} cam The camera.
   */
  this.setCamera = function (cam)
  {
    // Check to see if we were passed a correct Camera class
    if (cam instanceof c3dl.FreeCamera || cam instanceof c3dl.OrbitCamera)
    {
      camera = cam;
      return true;
    }

    c3dl.debug.logWarning('Scene::setCamera() invalid type of camera.');
    return false;
  }

  /**
   If the scene has been provided with a picking callback, when the user clicks the canvas
   either one or two sets of tests will run.  If the bounding volume constant is passed to 
   this function, a fast, approximate test is run for objects which can be picked against the
   ray generated by the click.  If the triangles constant is passed in, both the ray/bounding volume test 
   will run along with a ray/triangle test for each object which can be picked.
   
   @param {c3dl.PICK_PRECISION_BOUNDING_VOLUME | c3dl.PICK_PRECISION_TRIANGLE} precision The precision test to use when the user clicks the canvas.
   */
  this.setPickingPrecision = function (precision)
  {
    if (precision == c3dl.PICK_PRECISION_BOUNDING_VOLUME || precision == c3dl.PICK_PRECISION_TRIANGLE)
    {
      this.pickingPrecision = precision;
    }
  }


  /**
   @private
   This one just calls addTextToModel()
   //!! need dest as a parameter, probably in pixels, where to put the text
   */
  this.addFloatingText = function (text, fontStyle, fontColour, backgroundColour)
  {
    var box = this.addTextToModel(null, text, fontStyle, fontColour, backgroundColour);
    box.stayInFrontOfCamera = true;
    this.addObjectToScene(box);
  }

  /**
   @private
   Create a 2D canvas, render the text into it, and use that as a texture for model.
   If model is null, create a rectangle and stick the text onto it.
   */
  this.addTextToModel = function (model, text, fontStyle, fontColour, backgroundColour)
  {
    // Create a SPAN element with the string and style matching what the user asked
    // for the floating text.
    var tempSpan = document.createElement('span');
    var tempSpanStyle = document.createElement('style');
    var tempSpanStyleContent = document.createTextNode('span{' + 'font: ' + fontStyle + ';' + 'color: ' + fontColour + '; ' + 'background: ' + backgroundColour + ';}');
    var tempText = document.createTextNode(text);
    tempSpanStyle.appendChild(tempSpanStyleContent);
    tempSpan.appendChild(tempSpanStyle);
    tempSpan.appendChild(tempText);

    // Append it to the body so it's momentarily displayed. I couldn't find a way to measure
    // the text box's size without displaying it.
    document.body.appendChild(tempSpan);

    var actualStringWidth = tempSpan.offsetWidth;
    var actualStringHeight = tempSpan.offsetHeight;
    var stringWidth = c3dl.roundUpToNextPowerOfTwo(tempSpan.offsetWidth);
    var stringHeight = c3dl.roundUpToNextPowerOfTwo(tempSpan.offsetHeight);

    // Now get rid of that element, we only needed it to measure it
    tempSpan.removeChild(tempSpanStyle);
    document.body.removeChild(tempSpan);

    var box;
    if (model == null)
    {
      var whRatio = stringWidth / stringHeight;

      // Model for the plane with the text, size based on whRatio
      var smallCanvasVertices = [
        [-1.0 * (whRatio / 2), -1.0, 0.0], // 0 - bottom left
        [-1.0 * (whRatio / 2), 1.0, 0.0], // 1 - top left
        [1.0 * (whRatio / 2), 1.0, 0.0], // 2 - top right
        [1.0 * (whRatio / 2), -1.0, 0.0], // 3 - bottom right
        ];
      var smallCanvasNormals = [
        [0, 0, -1]
      ];
      var smallCanvasUVs = [
        [0.0, 1.0], // 0 - bottom left
        [0.0, 0.0], // 1 - top left
        [1.0, 0.0], // 2 - top right	
        [1.0, 1.0] // 3 - bottom right
        ];
      var smallCanvasFaces = [
        [0, 0, 0],
        [3, 3, 0],
        [2, 2, 0],
        [0, 0, 0],
        [2, 2, 0],
        [1, 1, 0]
      ];

      box = new Model();
      box.init(smallCanvasVertices, smallCanvasNormals, smallCanvasUVs, smallCanvasFaces);
      //box.setAngularVel(new Array(0.003, 0.000, 0.000));
      //box.pitch(-0.4);
      //!! need something user-specified
      box.setPosition([5, 0, 5]);
    }
    else box = model;

    // Draw the text into the 2D canvas and use it for the above model's texture
    var textureCanvas = this.create2Dcanvas(stringWidth, stringHeight);
    if (textureCanvas.getContext)
    {
      var ctx = textureCanvas.getContext('2d');

      if (fontStyle) ctx.mozTextStyle = fontStyle;

      // Fill everything with backgroundColour if it's specified
      if (backgroundColour)
      {
        ctx.fillStyle = backgroundColour;
        ctx.fillRect(0, 0, stringWidth, stringHeight);
      }

      // Center the text in the 2D canvas
      ctx.translate((stringWidth - actualStringWidth) / 2, stringHeight - (stringHeight - actualStringHeight));

      if (fontColour) ctx.fillStyle = fontColour;
      else ctx.fillStyle = 'black';

      ctx.mozDrawText(text);

      box.setTextureFromCanvas2D(textureCanvas.id);
      //textureManager.addTextureFromCanvas2D(textureCanvas.id);
    }
    else c3dl.debug.logWarning("addFloatingText(): call to create2Dcanvas() failed");
    return box;
  }

  /**
   @private
   Create a 2D canvas for drawing text and other stuff. Keep a 
   reference to it.
   
   @return {CanvasTag}
   */
  this.create2Dcanvas = function (width, height)
  {
    var newCanvas = document.createElement('canvas');
    newCanvas.id = 'changemetorandomstring';
    newCanvas.width = width;
    newCanvas.height = height;
    canvasTag.appendChild(newCanvas);

    canvas2Dlist.push(newCanvas);

    return newCanvas;
  }

  /**
   Set the color of the background. Values are clamped to the 
   range [0,1].
   
   @param {Array} bgColor Array of four values in the order [r,g,b,a].
   */
  this.setBackgroundColor = function (bgColor)
  {
    if (bgColor.length >= 3)
    {
      backgroundColor = bgColor.slice(0, 3);

      if (renderer)
      {
        renderer.setClearColor(backgroundColor);
      }
    }
  }


  /**
   Set how c3dl.Point objects are rendered.
   c3dl.POINT_MODE_POINT will render the points using WebGL's built-in 2D billboarded point primitives
   c3dl.POINT_MODE_SPHERE will render points using sphere objects.
   
   @param {c3dl.POINT_MODE_POINT | c3dl.POINT_MODE_SPHERE} mode 
   */
  this.setPointRenderingMode = function (mode)
  {
    if (mode == c3dl.POINT_MODE_POINT || mode == c3dl.POINT_MODE_SPHERE)
    {
      pointRenderingMode = mode;
    }
    else
    {
      c3dl.debug.logWarning("Invalid mode passed to setPointRenderingMode");
    }
  }

  /**
   Get how the points are rendered in the scene. Either they are rendered using
   
   WebGL's built-in method, or are rendered as sphere meshes.
   
   @returns {c3dl.POINT_MODE_POINT | c3dl.POINT_MODE_SPHERE} rendering mode.
   */
  this.getPointRenderingMode = function ()
  {
    return pointRenderingMode;
  }


  /**
   Get the color of the background.
   
   @returns {Array} Array of three values in the order RGB.
   */
  this.getBackgroundColor = function ()
  {
    return c3dl.copyObj(backgroundColor);
  }

  /**
   Set the ambient light of the scene.
   
   @param {Array} light An array of 3 floating point values 
   ranging from 0 to 1.
   */
  this.setAmbientLight = function (light)
  {
    if (light.length >= 3)
    {
      ambientLight = [light[0], light[1], light[2], 1];
    }
  }


  /**
   Acquire the WebGL Context
   
   @returns {boolean} true if the renderer was initialized, otherwise false.
   */
  this.init = function ()
  {
    if (renderer != null && canvasTag != null)
    {
      // Initialize the renderer
      if (!renderer.createRenderer(canvasTag))
      {
        c3dl.debug.logError("Your browser does not support WebGL.<br />" + "Visit the <a href='http://en.wikipedia.org/wiki/WebGL'>WebGL wiki page</a> for information on downloading a WebGL enabled browser");
        return false;
      }
      // Get the Canvas
      glCanvas3D = renderer.getGLContext();

      // tell the renderer the default color the color buffer should be 
      // every render.
      this.setBackgroundColor(backgroundColor);

      // Set our global (fake static variable) to be used in rendering
      thisScn = this;

      // setup the lights
      // we have an array of elements, but they are all undefined,
      for (var i = 0, len = lightList.length; i < len; i++)
      {
        lightList[i] = null;
      }
      // Initialize the renderer
      return renderer.init(canvasTag.width, canvasTag.height);
    }
    c3dl.debug.logError('Scene::createScene() No renderer was specified.');
    return false;
  }

  /**
   Get a reference to a light from the list in the scene. This is an O(n) 
   operation.
   
   @param {String} lightName the name of the light.
   
   @returns a reference to a light object or null if it was not found.
   */
  this.getLight = function (name)
  {
    for (var i = 0, len = lightList.length; i < len; i++)
    {
      // if we found a match, since we have 'holes' in the array
      // check that the value is not null before calling its method.
      if (lightList[i] && lightList[i].getName() == name)
      {
        return lightList[i];
      }
    }
    return null;
  }

  /**
   Adds a light to a scene if the maximum number of lights in the scene
   has not been exceeded.
   
   @param {c3dl.PositionalLight|c3dl.DirectionalLight|c3dl.SpotLight} light the light to add.
   
   @returns {boolean} true if the light could be added, otherwise returns false.
   */
  this.addLight = function (light)
  {
    // start from the beginning of the list anf find the first empty spot.
    for (var i = 0; i < c3dl.MAX_LIGHTS; i++)
    {
      // either the light was not yet set to null or we are recycling the spot.
      if (lightList[i] == null)
      {
        lightList[i] = light;
        return true;
      }
    }

    // if the iterated over all the lights and didn't find an empty spot,
    // we end up here, returning to indicate the light was not added.
    return false;
  }

  /**
   Remove a light from the scene. The first light found matching the name 
   lightName will be removed.
   
   @param {String} lightName the name of the light
   */
  this.removeLight = function (lightName)
  {
    // There are 2 copies of the light, one in our js code and one in the WebGL
    // state variable.  We need to remove the light object from our list and set
    // the WebGL state variable to all zeros so it will no longer affect the scene.
    // first find the index of the light in our array.
    var lightID = -1;
    for (var i = 0, len = lightList.length; i < len && lightID == -1; i++)
    {
      if (lightList[i] && lightList[i].getName() == lightName)
      {
        lightID = i;
      }
    }

    // now that we have the index, we have to set the corresponding WebGL state
    // to zeros, which will prevent the light from affecting the scene.
    //
    if (lightID != -1)
    {
      // place a 'hole' in the array. This can later be populated with another light.
      // don't delete the light, leave it up to the gc, otherwise
      // the light seems to stay on and can't be removed.		
      lightList[lightID] = null;

      // we removed the light from our list, but WebGL still has
      // a light state which needs to be cleared.  Otherwise the
      // light will still affect the scene.
      renderer.clearLight(lightID);
    }
    return (lightID == -1 ? false : true);
  }

  /**
   @private
   Update the WebGL light state variables with our list of lights
   This happens every frame.
   */
  this.updateLights = function ()
  {
    renderer.updateAmbientLight(this.getAmbientLight());
    renderer.updateLights(lightList);
  }

  /**
   Add the object 'obj' to the scene.
   
   @param {c3dl.Primitive|c3dl.ParticleSystem|c3dl.Point|c3dl.Line} obj A reference to an object.
   
   @return {boolean} True if the object was added to the scene, false otherwise.
   */
  this.addObjectToScene = function (obj)
  {
    var type = obj.getObjectType();

    switch (type)
    {
    case c3dl.LINE:
    case c3dl.POINT:
    case c3dl.PARTICLE_SYSTEM:
    case c3dl.COLLADA:
      objList.push(obj);
      return true;
    }

    c3dl.debug.logWarning("Scene::addObjectToScene() called with an invalid argument.");
    return false;
  }

  /**
   Remove an object from the scene. This is an O(n) operation.
   
   @param {c3dl.Primitive|c3dl.ParticleSystem|c3dl.Point|c3dl.Line} obj The object to remove from the scene.
   
   @return {boolean} true if the object was found and removed from the scene or
   false if the argument 'obj' was not found.
   */
  this.removeObjectFromScene = function (obj)
  {
    var isFound = false;

    if (obj instanceof c3dl.Primitive || obj instanceof c3dl.Point || obj instanceof c3dl.Line || obj instanceof c3dl.ParticleSystem)
    {
      // Check against each item in the list
      for (var i = 0, len = objList.length; i < len; i++)
      {
        if (objList[i] == obj)
        {
          // Remove the item
          objList.splice(i, 1);
          isFound = true;
        }
      }
    }
    else
    {
      c3dl.debug.logWarning('Scene::removeObjectFromScene() called with an invalid argument.');
    }

    return isFound;
  }

  /**
   Start scene sets a default ambient light to white with full 
   intensity.  If this ambient lighting is not desired, call 
   setAmbientLight(..) after this method, which will undo the
   default ambient light values.
   */
  this.startScene = function ()
  {
    if (c3dl.debug.SHARK === true)
    {
      connectShark();
      startShark();
    }
    numFramesSinceSceneStart = 0;
    frameCounter = 0;

    // Safety Checks
    if (glCanvas3D == null) return false;
    if (renderer == null) return false;
    if (camera == null) return false;

    // Start the timer
    lastTimeTaken = Date.now();

    // Benchmark hook:
    if (typeof(benchmarkSetupDone) == "function") benchmarkSetupDone();

    // Create a timer for this object
    timerID = setInterval(this.render, 5);

    this.setAmbientLight([ambientLight[0], ambientLight[1], ambientLight[2]]);
  }

  /**
   @private
   Render Loop
   */
  this.render = function ()
  {
    // calculate FPS. 
    // we update the FPS after a second or more has elapsed.
    if (Date.now() - FPS_LastTimeTaken >= 1000)
    {
      // frames / seconds
      FPS = FPS_Counter / (Date.now() - FPS_LastTimeTaken) * 1000;
      FPS_Counter = 0;
      FPS_LastTimeTaken = Date.now();
    }

    // If a user wants to stop rendering, this is where it happens
    if (exitFlag)
    {
      timerID = clearInterval(timerID);
      if (c3dl.debug.SHARK === true)
      {
        stopShark();
        disconnectShark();
      }
      return;
    }
    if (!pauseFlag){
      // update the camera and objects
      camera.update(Date.now() - lastTimeTaken);
      thisScn.updateObjects(Date.now() - lastTimeTaken);
      lastTimeTaken = Date.now();

      // The user may have added a texture to the scene in 
      // which case, the renderer needs to create them.
      if (textureQueue.length > 0)
      {
        for (var i = 0, len = textureQueue.length; i < len; i++)
        {
          renderer.addTexture(textureQueue[i]);
        }
        // clear out the queue. It will be empty until the
        // user adds new textures.
        textureQueue = [];
      }
      // clear the depth buffer and color buffer. This needs to be 
      // done every frame since objects likely have moved.
      renderer.clearBuffers();

      // we could have 2 canvases with different dimensions, but the same camera.
      // Therefore we need to update the camera with the aspect ratio since it's the 
      // camera that creates the projection matrix.
      // creates the projection matrix
      // this will place the view matrix at the bottom of the matrix stack.
      camera.applyToWorld(canvasTag.width / canvasTag.height);

      // save the projection matrix so if the picking code needs to know what
      // projection matrix was used, it can query the scene.
      projMat = camera.getProjectionMatrix();

      // now that the view matrix has been pushed onto the matrix stack,
      // we can specify the locations of the lights, which will use the top of the
      // matrix stack.
      thisScn.updateLights();

      // render objects in the scene.
      thisScn.renderObjects(glCanvas3D);
    }
    // we just rendered to the back buffer, so to see the changes, swap
    // the front and back buffers.
    //renderer.swapBuffers();
    numFramesSinceSceneStart++;
    FPS_Counter++;
  }

  /**
   @private
   Updates all objects based on time.
   
   @param {float} timeElapsed
   
   @returns {boolean} True if something updated.
   */
  this.updateObjects = function (timeElapsed)
  {
    // Call the User's update callback
    if (updateHandler != null)
    {
      updateHandler(timeElapsed);
    }

    // update the rest of the objects individually
    for (var i = 0, len = objList.length; i < len; i++)
    {
      // we don't need to update lines or points since their
      // positions/coords are controlled by the user in the
      // update callback they write.
      switch (objList[i].getObjectType())
      {
      case c3dl.PARTICLE_SYSTEM:
      case c3dl.COLLADA:
        objList[i].update(timeElapsed);
      }


    }

    // update the SkyModel
    if (skyModel)
    {
      //
      skyModel.update(timeElapsed);

      // move skymodel so the camera is at its center.
      // Let the user scale it and rotate it if they wish.
      skyModel.setPosition(camera.getPosition());
    }
  }

  /**
   @private
   Renders all objects to the screen.
   */
  this.renderObjects = function ()
  {
    // draw the skyModel if there is one.
    if (skyModel)
    {
      //glCanvas3D.disable(glCanvas3D.CULL_FACE);
      glCanvas3D.frontFace(glCanvas3D.CW);
      glCanvas3D.cullFace(glCanvas3D.BACK);

      // We need to be able to draw the SkyModel, but without occluding any
      // objects in the scene.  If the SkyModel is too small, it will occlude
      // other objects. To prevent this, we turn off the depth buffer, that
      // way ANY object drawn will just be drawn ontop of the SkyModel.
      glCanvas3D.disable(glCanvas3D.DEPTH_TEST);

      // When rendering a 'skybox', the lights in the scene must
      // not light the model, since that would destroy the illusion
      // of the geometry being extremely far away.  So all lights
      // must be turned off and texture of the 'skybox' needs to be
      // set to full intensity so the texture is rendered.
      // get renderer's ambient light state
      var prevAmbient = this.getAmbientLight();

      // get renderer's lighting state
      var lightState = renderer.getLighting();

      // turn off renderer's light state
      renderer.setLighting(false);

      // turn rendering ambient to full
      renderer.updateAmbientLight([1, 1, 1]);

      // render skyModel
      skyModel.render(glCanvas3D, this);

      // restore previous ambient light state
      renderer.setLighting(lightState);

      // restore previous lighting state
      renderer.updateAmbientLight(prevAmbient);

      // turn depth buffer back on so other object properly occlude each other.
      glCanvas3D.enable(glCanvas3D.DEPTH_TEST);
    }

    glCanvas3D.enable(glCanvas3D.CULL_FACE);
    glCanvas3D.frontFace(glCanvas3D.CCW);
    glCanvas3D.cullFace(glCanvas3D.BACK);

    // particle systems need to be rendered last, so first render
    // all opaque objects, then render particle systems. This is a bit
    // wasteful since we could have reordered the object list when the 
    // particle system was inserted, but the getObj(index) would then have 
    // been invalidated.
    var particleSystems = [];
    for (var i = 0, len = objList.length; i < len; i++)
    {
      if (objList[i].getObjectType() == c3dl.PARTICLE_SYSTEM)
      {
        particleSystems.push(objList[i]);
      }

      if (objList[i].getObjectType() == c3dl.COLLADA)
      {
        var checker;	
		var cam = this.getCamera();
		var projMatrix = cam.getProjectionMatrix();		
        var viewMatrix = cam.getViewMatrix();
		var frustumMatrix = c3dl.multiplyMatrixByMatrix(projMatrix,viewMatrix);
		var frustumCulling = new Frustum(frustumMatrix);
		//Culling using spheres
		if (culling === "BoundingSphere") {
		  var boundingSpheres = objList[i].getBoundingSpheres();
		  for (var j = 0; j < boundingSpheres.length; j++) {
			checker = frustumCulling.sphereInFrustum(boundingSpheres[j]);
			if (checker === "INSIDE") {	
			  break;
			}
		  }
		  if (checker === "INSIDE") {		
			objList[i].render(glCanvas3D, this);
		  }
        }		  
		//Culling Boxes
		else if (culling === "BoundingBox") {
		  for (var j = 0; j < 3; j++) {
		    box = objList[i].getBoundingBox();
		    sizes = [];
		    sizes[0]= box.getHeight();
		    sizes[1]= box.getLength();
		    sizes[2]= box.getWidth();
	        checker = frustumCulling.boundingBoxInfrustumPlane(box.getPosition(),sizes[j]);
			if (checker === "INSIDE") {	
			  break;
			}
		  }
		  if (checker === "INSIDE") {		
			objList[i].render(glCanvas3D, this);
		  }
	    }
		else {
		  objList[i].render(glCanvas3D, this);
		}
      }
    }
    // POINTS
    // if first time
    //if(pointPositions == null)
    //{
    pointPositions = new Array();
    pointColors = new Array();
    //}
    var currPoint = 0;

    // find all the points and group them together so we can make
    // only 1 call to drawArrays instead of once for each point.
    for (var i = 0, len = objList.length; i < len; i++)
    {
      if (objList[i].getObjectType() == c3dl.POINT && objList[i].isVisible())
      {
/*
				// if the array was already filled once before
				// only need to assign, not push, prevents the need to realloc array
				if( pointPositions.length > 0 && currPoint < pointPositions.length/3)
				{
					pointPositions[currPoint*3] = objList[i].getPosition()[0];
					pointPositions[(currPoint*3)+1] = objList[i].getPosition()[1];
					pointPositions[(currPoint*3)+2] = objList[i].getPosition()[2];
					
					pointColors[currPoint*3] = objList[i].getColor()[0];
					pointColors[(currPoint*3)+1] = objList[i].getColor()[1];
					pointColors[(currPoint*3)+2] = objList[i].getColor()[2];
					currPoint++;
				}
				else
				{
				*/
        pointPositions.push(objList[i].getPosition()[0]);
        pointPositions.push(objList[i].getPosition()[1]);
        pointPositions.push(objList[i].getPosition()[2]);

        pointColors.push(objList[i].getColor()[0]);
        pointColors.push(objList[i].getColor()[1]);
        pointColors.push(objList[i].getColor()[2]);
        //}
      }
    }

    renderer.renderPoints(pointPositions, pointColors, pointAttenuation, this.getPointSmooth(), this.getPointRenderingMode(), pointSize);


    // LINES
    // collect all the lines from the scene, place them into this array
    // and pass the lines to the renderer.
    var lines = [];

    for (var j = 0, len = objList.length; j < len; j++)
    {
      if (objList[j].getObjectType() == c3dl.LINE && objList[j].isVisible())
      {
        lines.push(objList[j]);
      }
    }
    renderer.renderLines(lines);

    // Render the particle systems last because they 
    // have blending
    // glCanvas3D.frontFace(glCanvas3D.CW);
    for (var i = 0, len = particleSystems.length; i < len; i++)
    {
      particleSystems[i].render(glCanvas3D, this);
    }
  }

  /**
   Flags the main loop for exit.
   */
  this.stopScene = function ()
  {
    // This flags the main loop to exit gracefully
    exitFlag = true;
  }
  this.unpauseScene = function ()
  {
    pauseFlag = false;
  }
    this.pauseScene = function ()
  {
    pauseFlag = true;
  }
  /**
   @private
   Loads images before they are actually used.  If a Model is created 
   later in the life of the script with a texture which has not yet 
   been loaded, the Model will be drawn without a texture until the
   texture is loaded.  This function prevents this from happening.
   Alternatively, the textureManager can be acquired from the Scene
   and multiple calls to addTexture() can be called. This method simply 
   serves as a convenience.
   
   <p><b>This must be called after Scene's init()</b></p>
   
   @param {string[]} imagePaths An array of paths of the images 
   relative to the html file which holds the main script.
   */
  this.preloadImages = function (imagePaths)
  {
    if (textureManager)
    {
      for (var i = 0, len = imagePaths.length; i < len; i++)
      {
        textureManager.addTexture(imagePaths[i]);
      }
    }
    else
    {
      c3dl.debug.logError("preloadImage() must be called after Scene's init()");
    }
  }
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @private
 @class A Texture is an image which is to be wrapped around a Model object. A 
 texture has a unique ID which can be used to identify it in WebGL.
 
 <p>To create a texture, call setup() passing in the WebGL context as
 well as the path to the image.</p>
 */
c3dl.Texture = function ()
{
  // textureImage will be created as an Image().
  /**
   @private
   */
  var textureImage = null;
  var isSetup = false;

  /**
   @private
   Get the texture ID, the texture ID is a unique number which
   we can use to notify what texture in WebGL we want
   to work with.
   
   @returns {int} The ID of the texture if the texture has been 
   loaded, 0 otherwise.
   */
  this.getTextureID = function ()
  {
    return textureImage.ID;
  }

  /**	
   @private
   Get the absolute path of the Texture.
   
   @returns {string} The absolute path of the texture using the 
   image's src property.
   */
  this.getAbsolutePath = function ()
  {
    if (textureImage != null)
    {
      return textureImage.src;
    }
    else
    {
      c3dl.debug.logError('getTexturePath() error - texture has not been setup.');
      return false;
    }
  }

  /** 
   @private
   Get the path of the image relative the main.js file.  This will
   be the same path the user passes in when they call setTexture on
   a model.		
   
   @returns {string} The relative path of texture.
   */
  this.getRelativePath = function ()
  {
    return textureImage.relativePath;
  }

  /**
   @private
   Check if the Texture has been setup.
   
   @returns {boolean} True if the Texture has been setup, false otherwise.
   */
  this.getIsSetup = function ()
  {
    return isSetup;
  }

  /**
   @private
   Setup can be called when the object is created to give it a
   texture, but it can also be later changed by calling this method
   again.
   
   Once the Texture has been setup, do not allow the user to set it up 
   again.
   
   @param glCanvas3D
   @param {string} source
   @param sourceCanvas
   
   @return {boolean} true if the Texture could be set up, false 
   if the texture was already setup or if setup failed.
   */
  this.setup = function (glCanvas3D, source, sourceCanvas)
  {
    var returnCode = true;

    // make sure the user passed in correct variables and prevent
    // the user from calling this method more than once.
    if (source != null && glCanvas3D != null && this.getIsSetup() == false)
    {
      if (sourceCanvas == null)
      {
        textureImage = new Image();
        textureImage.src = source;

        // doing this will only store the name of the texture in 
        // the name variable.
        textureImage.relativePath = source;
      }
      else
      {
        textureImage = document.getElementById(sourceCanvas);
        textureImage.relativePath = sourceCanvas;
      }

      // was a bit tricky to pass in glCanvas into the onload function 
      // of the image, so instead they were added as properties
      //	textureImage.ID = 0;	
      textureImage.glCanvas3D = glCanvas3D;

      // genTextures gives us an unused texture image id, like 
      // a primary key only needs to be done once
      // don't wait for load to run since we don't konw when that will
      // be. if the user has given us proper values, we'll probably
      // be able to create the texture, worst case, we have an id
      // not associated with a texture
      textureImage.ID = glCanvas3D.createTexture();
      glCanvas3D.activeTexture(glCanvas3D.TEXTURE0);

      /**
       @private
       */
      textureImage.setupWebGL = function ()
      {
        // bindtexture() sets the selected texture (by id) to be 
        // the current texture.  the current texture is the one 
        // used for any operations such as assigning uv coords, 
        glCanvas3D.bindTexture(glCanvas3D.TEXTURE_2D, this.ID);
      }

      /**
       @private
       Resize the texture so it can be used in WebGL.  The texture 
       may be distorted, but at least it will display something.
       The user will be notified their texture should be modified.		
       */
      textureImage.resizeImage = function ()
      {
        // not power-of-two, so resize it using a 2d canvas
        var w = c3dl.roundUpToNextPowerOfTwo(this.width);
        var h = c3dl.roundUpToNextPowerOfTwo(this.height);
        var canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        var context = canvas.getContext('2d');
        context.drawImage(this, 0, 0, w, h);
        // add a property to the image, so the onload function can access the canvas created here.
        this.canvas = canvas;
      }

      /**
       @private
       Set the function to run when the image is loaded
       */
      textureImage.onload = function ()
      {
        //
        this.setupWebGL();

        try
        {
          // place the texture into video memory
          this.glCanvas3D.texImage2D(glCanvas3D.TEXTURE_2D, 0, glCanvas3D.RGBA, glCanvas3D.RGBA, glCanvas3D.UNSIGNED_BYTE, this);
          this.glCanvas3D.generateMipmap(glCanvas3D.TEXTURE_2D);
          this.isSetup = true;
        }
        catch (err)
        {
          c3dl.debug.logError('Texture exception - tried to call texImage2DHTML()');
        }
      };

      if (sourceCanvas != null)
      {
        textureImage.onload();
      }

      if (this.getIsSetup())
      {
        //!! this should be false, because its initialised as true
        returnCode = true;
      }
    }
    // user passed in a null for either the canvas or the source
    else
    {
      c3dl.debug.logError('null value was passed into texture load function or texture was already setup');
      returnCode = false;
    }

    // if the image could be setup, this variable was set to
    return returnCode;
  }
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/


/**
 @private
 @class TextureManager is a class designed to prevent the same 
 texture from being loaded more than once in the WebGL context.
 Users of the library don't actually have to bother with using it,
 they just have to create their Textures.
 */
c3dl.TextureManager = function (gl)
{
  this.currentID = 1;
  this.keys = [];
  this.values = [];
  this.glCanvas3D = gl;

  /**
   @private
   Add a texture to be used in the script.
   
   @param {String} relativePath The relative path of the Texture from 
   the index.html file.
   */
  this.addTexture = function (relativePath)
  {
    // if its already present, don't readd it
    if (this.getID(relativePath) == -1)
    {
      var texture = new c3dl.Texture();
      if (texture.setup(this.glCanvas3D, relativePath))
      {
        this.keys.push(texture.getTextureID());
        this.values.push(texture);
        this.currentID++;
      }
    }
  }

  /**
   @private	
   */
  this.addTextureFromCanvas2D = function (sourceCanvas)
  {
    if (this.getID(sourceCanvas) == -1)
    {
      var texture = new Texture();
      if (texture.setup(this.glCanvas3D, 'deleteme', sourceCanvas))
      {
        this.keys.push(texture.getTextureID());
        this.values.push(texture);
        this.currentID++;
      }
    }
  }

  /**
   @private	
   Has the Texture already been added?
   
   @param {String} relativePath The relative path of the Texture from 
   the index.html file.
   
   @returns {boolean} True if the texture has already been added, false
   otherwise.
   */
  this.hasTexture = function (relativePath)
  {
    // -1 indicates an invalid texture id
    return this.getID(relativePath) == -1 ? false : true;
  }

  /**
   @private	
   Remove a texture. Currently not implemented.
   
   @param {String} relativePath
   */
  this.removeTexture = function (relativePath)
  {
    // check if it exists
    if (this.getID(relativePath) != -1)
    {
      // remove it from this list?
      // remove it from WebGL
    }
  }

  /**
   @private
   
   Get the ID of a Texture, referenced by 'relativePath'.
   
   @param {String} relativePath The relative path of the Texture from 
   the index.html file.
   
   @returns {int} The ID of the Texture, reutrns -1 if the Texture 
   hasn't been added.
   */
  this.getID = function (relativePath)
  {
    var id = -1;

    for (var i = 0, len = this.values.length; i < len; i++)
    {
      if (this.values[i].getRelativePath() == relativePath)
      {
        id = this.keys[i];
        break;
      }
    }
    return id;
  }

  /**
   @private	
   Get a string representation of this class. Will display all the WebGL 
   texture IDs along with the associated texture path.
   
   @param {null|String} delimiter A string which will separate values. Typically will be 
   ","  ,  "\n" or "&lt;br /&gt;". If none is specified, "," will be used.
   
   @returns {String} A string representation of this object.
   */
  this.toString = function (delimiter)
  {
    // make sure user passed up a string if they actually decided
    // to specify a delimiter.
    if (!delimiter || typeof(delimiter) != "string")
    {
      delimiter = ",";
    }

    // start with en empty string
    var str = "";
    for (var i = 0, len = this.values.length; i < len; i++)
    {
      str += "ID = " + this.keys[i] + delimiter + "Path = " + this.values[i].getRelativePath();

      // only add the comma, if this isn't the last path, we don't
      // want a trailing comma.
      if (i + 1 < this.values.length)
      {
        str += delimiter;
      }
    }
    return str;
  }
}/**
 @private
 
 Check if a texture has the correct dimensions for WebGL.  The texture 
 must not be too small, that is, it must be greater than 1x1. And it must be 
 a power of 2: 2x2, 4x4, 8x8, 16x16, etc.
 
 @param texture
 
 @returns {boolean} true if the image has the correct dimensions, false otherwise.
 */
c3dl.hasCorrectDimensions = function (texture)
{
  // broke down cases where the texture could be invalid so user
  // knows where to look first
  var isCorrect = false;

  // textures cannot have size 0 or 1.
  if (texture.width <= 1 || texture.height <= 1)
  {
    c3dl.debug.logWarning('Texture ' + texture.src + ' is too small.' + 'Dimensions are: ' +
    texture.width + "x" + texture.height + ". " + '<br/>Texture was resized.');
  }

  // Texture width and height must be a power of 2. By performing a 
  // bitwise and, we can see if the bit to the far left is on and all
  // other bits are off, thus, the size must be square.
  // 10(bin) = 2(dec)		= power of 2
  // 100(bin) = 4dec)		= power of 2
  // 1000(bin) = 8(dec)	= power of 2
  // etc..
  else if ((texture.width & (texture.width - 1)) || (texture.height & (texture.height - 1)))
  {
    c3dl.debug.logWarning('Texture ' + texture.src + ' must have a width and height of a power of 2.' + 
    'Dimensions are: ' + texture.width + "x" + texture.height + ". " + 
    'Dimensions must be something like: 2x2, 2x4, 4x4, 4x8, 8x8, 16x8, 16x16, etc..' + 
    '<br />Texture has been resized.');
  }

  // if we didn't satisfy any of the conditionals, texture 
  // should be okay
  else
  {
    isCorrect = true;
  }
  return isCorrect;
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @private
 @class ColladaManager prevents the same collada file from being loaded into 
 memory more than once.
 */
c3dl.ColladaManager =
{
};

// parallel arrays. keys have the filePaths, values have the c3dl.SceneNode root
// nodes.
c3dl.ColladaManager.keys = [];
c3dl.ColladaManager.values = [];

/**
 @private
 Get the scenegraph's root for the filePath.
 
 @param {String} filePath 
 
 @returns c3dl.SceneNode or null if the file has not finished loading.
 
 c3dl.ColladaManager.getSceneGraphRoot = function(filePath)
 {
 var index = c3dl.ColladaManager.getIndex(filePath);
 
 // if it's in the table
 if(index != -1)
 {
 // The loader will set the root once it has finished parsing.
 // Initially when we create the sceneGraph, the root is null
 // indicating the graph hasn't been created.
 return c3dl.ColladaManager.values[index];
 }
 else
 {
 return null;
 }
 }*/


/**
 @private
 Load a collada file at 'filePath'. This method will check if
 the model is already loaded, thus preventing the file being
 loaded twice.
 */
c3dl.ColladaManager.loadFile = function (filePath)
{
  // prevent loading the file twice
  if (c3dl.ColladaManager.isFileLoaded(filePath) == false)
  {
    // create a node which the loader will assign other nodes.
    var rootNode = new c3dl.SceneNode();

    // give the loader a sceneGraph which it will populate with nodes.
    // We know it has finished once it has set the scenegraph's root.

    var colladaLoader = new c3dl.ColladaLoader();
    colladaLoader.load(filePath, rootNode);
    c3dl.ColladaManager.keys.push(filePath);
    c3dl.ColladaManager.values.push(rootNode);
  }
}

/**
 @private
 Make a copy of the sceneGraph
 
 @param {String} filePath
 */
c3dl.ColladaManager.getSceneGraphCopy = function (filePath)
{
  if (c3dl.ColladaManager.isFileLoaded(filePath))
  {
    var i = c3dl.ColladaManager.getIndex(filePath);

    // get a copy of the scenegraph
    var sg = c3dl.ColladaManager.values[i].getCopy();

    //return ColladaManager.values[i];
    return sg;
  }

  // return null?
}

/**
 @private
 Has the file already been loaded?
 
 @param filePath {string}
 
 @return true if the file has already been loaded, otherwise false.
 */
c3dl.ColladaManager.isFileLoaded = function (filePath)
{
  // if its in the 'table', it will return non-negative one.
  return c3dl.ColladaManager.getIndex(filePath) != -1 ? true : false;
}

/**
 @private
 Get the 0-based index of the filePath.  If we have
 that index, we can reference the values array since
 they are parallel.
 */
c3dl.ColladaManager.getIndex = function (filePath)
{
  var index = -1;

  for (var i = 0, len = c3dl.ColladaManager.values.length; i < len; i++)
  {
    if (filePath == c3dl.ColladaManager.keys[i])
    {
      index = i;
      break;
    }
  }
  return index;
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @private
 
 class ColladaLoader is used by the ModelManager to load .DAE (COLLADA) files.
 */
c3dl.ColladaLoader = function ()
{
  var XHR_STATE_COMPLETED = 4;
  var xmlhttp = null;
  this.done = false;
  this.name = "";
  this.rootNode = new c3dl.SceneNode();

  /**
   @private
   Opens the DAE file, reads the vertex, normal and uv data and stores 
   all the data in 'expanded' form into members.
   
   @param {String} relativePath
   @param {c3dl.SceneNode} rootNode
   */
  this.load = function (relativePath, rootNode)
  {
    //
    this.rootNode = rootNode;

    xmlhttp = new XMLHttpRequest();

    //
    xmlhttp.parent = this;

    // call the parse function when XMLHttpRequest is ready.
    xmlhttp.callbackFunc = this.parse;
    xmlhttp.open("GET", relativePath, true);
    xmlhttp.overrideMimeType('text/xml');

    // this may throw an exception if the file isn't found, so 
    // catch the exception and give the user a helpful warning message.
    try
    {
      // send the request
      xmlhttp.send(null);
    }
    catch (err)
    {
      c3dl.debug.logWarning("Could not find file '" + relativePath + "'. Check the path.");
    }

    /**
     @private
     */
    xmlhttp.onreadystatechange = function ()
    {
      // when the state has changed to being finished, 
      if (xmlhttp.readyState == XHR_STATE_COMPLETED)
      {
        // this line may not be totally nnecessary.
        if (xmlhttp.responseXML)
        {
          xmlhttp.responseXML.colladaPath = relativePath;

          // we can now parse by calling the callback which 
          // was set the the parse function.
          this.callbackFunc(xmlhttp.responseXML);
        }
      }
    }
  }


  /**
   @private
   
   Parse a node from the DAE file.  The part of the DAE file
   we are interested with is the scenegraph which is a hierarchical
   structure of nodes.  Nodes therefore can contain other nodes, thus
   we use a recursive function to parse each one.
   
   // clarify nodes in sg nodes in _DOM_
   @param {xmlDocument} xmlObject The DAE DOM.
   @param {} node The node element to parse. the DOM
   @param {c3dl.SceneNode} sgNode The SceneGraph node, not part of the XML DOM.
   */
  this.parseNodeRecursive = function (xmlObject, node, sgNode)
  {
    // set this node's transform
    var translateTag = c3dl.ColladaLoader.getChildNodesByNodeName(node, "translate");

    // node may not have one, so check first
    if (translateTag)
    {
      // string representation of data between <translate> tags.
      var floatValues = c3dl.ColladaLoader.stringsToFloats(translateTag[0].childNodes[0].nodeValue, ' ');

      if (xmlObject.upAxis && xmlObject.upAxis == "Z_UP")
      {
        var temp = floatValues[1];
        floatValues[1] = floatValues[2];
        floatValues[2] = -temp;
      }
      else if (xmlObject.upAxis && xmlObject.upAxis == "X_UP")
      {
        var temp = floatValues[0];
        floatValues[0] = -floatValues[1];
        floatValues[1] = temp;
      }
      sgNode.translate(floatValues);
    }

    // rotations
    var rotationTags = c3dl.ColladaLoader.getChildNodesByNodeName(node, "rotate");

    if (rotationTags)
    {
      // example
      // <rotate sid="rotateZ">0 0 1 15</rotate>
      // <rotate sid="rotateY">0 1 0 0</rotate>
      // <rotate sid="rotateX">1 0 0 0</rotate>
      for (var i = 0, len = rotationTags.length; i < len; i++)
      {
        var floatValues = c3dl.ColladaLoader.stringsToFloats(rotationTags[i].childNodes[0].nodeValue, ' ');

        var vec = [floatValues[0], floatValues[1], floatValues[2]];

        if (xmlObject.upAxis && xmlObject.upAxis == "Z_UP")
        {
          var temp = vec[1];
          vec[1] = vec[2];
          vec[2] = -temp;
        }
        else if (xmlObject.upAxis && xmlObject.upAxis == "X_UP")
        {
          var temp = vec[0];
          vec[0] = -vec[1];
          vec[1] = temp;
        }

        var angle = c3dl.degreesToRadians(floatValues[3]);

        sgNode.rotateOnAxis(vec, angle);
      }
    }

    // <scale> tag
    var scaleTag = c3dl.ColladaLoader.getChildNodesByNodeName(node, "scale");
    if (scaleTag)
    {
      var floatValues = c3dl.ColladaLoader.stringsToFloats(scaleTag[0].childNodes[0].nodeValue, ' ');

      if (xmlObject.upAxis && xmlObject.upAxis == "Z_UP")
      {
        var temp = floatValues[1];
        floatValues[1] = floatValues[2];
        floatValues[2] = temp;
      }
      if (xmlObject.upAxis && xmlObject.upAxis == "X_UP")
      {
        var temp = floatValues[0];
        floatValues[0] = floatValues[1];
        floatValues[1] = temp;
      }

      sgNode.scale(floatValues);
    }

    // <matrix> tag specifies the matrix of the node instead of
    // a scale, translate and rotate.  
    //
    //  The set of 16 numbers can have values with leading or trailing spaces, so we have to 
    // 
    var matrixTag = c3dl.ColladaLoader.getChildNodesByNodeName(node, "matrix");
    if (matrixTag)
    {
      var mat = c3dl.ColladaLoader.stringsToFloats(matrixTag[0].childNodes[0].nodeValue, ' ');

      // If Z-axis is up, any rotations on Y and Z need to be flipped.
      if (xmlObject.upAxis && xmlObject.upAxis == "Z_UP")
      {
        // swap y, z translation
        var temp = mat[7];
        mat[7] = mat[11];
        mat[11] = -temp;

        temp = mat[1];
        mat[1] = mat[2];
        mat[2] = temp;

        temp = mat[4];
        mat[4] = mat[8];
        mat[8] = temp;

        temp = mat[5];
        mat[5] = mat[10];
        mat[10] = temp;
      }

      // If X-axis is up, any rotations on X and Y needs to be flipped.
      if (xmlObject.upAxis && xmlObject.upAxis == "X_UP")
      {
        // swap x, y translation        
        var temp = mat[3];
        mat[3] = -mat[7];
        mat[7] = temp;

        temp = mat[0];
        mat[0] = mat[5];
        mat[5] = temp;

        temp = mat[2];
        mat[2] = mat[6];
        mat[6] = temp;

        temp = mat[8];
        mat[8] = mat[9];
        mat[9] = temp;
      }
      sgNode.setTransform(c3dl.transposeMatrix(mat));
    }

    // At this point, this node's child nodes have been parsed or it
    // did not contain subnodes.
    // get the geometryNodes of this node.
    var geometries = c3dl.ColladaLoader.getChildNodesByNodeName(node, "instance_geometry");

    // base case: we found a geometry leaf node, now instantiate it.
    if (geometries)
    {
      // a node may contain many geometryNodes, so we have to create each one.
      for (var currGeo = 0, len = geometries.length; currGeo < len; currGeo++)
      {
        // the url references a <geometry> element within the <library_geometry>
        var url = geometries[currGeo].getAttribute("url").split('#')[1];

        // A separate function exists to actually create the geometry which can
        // be pretty messy going through the DOM and constructing the geometry.
        sgNode.addChild(this.instantiateGeometry(xmlObject, url, geometries[currGeo]));
      }
    }

    //
    // <instance_node> appears after <instance_geometry>
    //
    var instance_nodes = c3dl.ColladaLoader.getChildNodesByNodeName(node, "instance_node");
    if (instance_nodes)
    {
      // a <node> can contain 0..N <instance_node> so iterate over each one
      for (var currNode = 0, len = instance_nodes.length; currNode < len; currNode++)
      {
        // remove the '#' from the url
        var url = instance_nodes[currNode].getAttribute("url").split('#')[1];
        sgNode.addChild(this.instantiateNode(xmlObject, url));
      }
    }


    // get the DIRECT child nodes of this node.  We can't use
    // getElementsByTagName since its recursive and will
    // return this node's grandchildren, we don't want that. 
    var nodes = c3dl.ColladaLoader.getChildNodesByNodeName(node, "node");

    // recursive case: the node has one or many nodes, therefore
    // we have to parse all of its nodes.
    if (nodes)
    {
      // for each of subnodes, call this function.
      for (var i = 0, len = nodes.length; i < len; i++)
      {
        var scenenode = new c3dl.SceneNode();
        scenenode.setName(nodes[i].getAttribute("name"));
        sgNode.addChild(scenenode);

        // call this function for each of the nodes found.
        this.parseNodeRecursive(xmlObject, nodes[i], scenenode);
      }
    }
  }

  /**
   @private
   
   Get the child element of a parent element in the scenario when a schema can 
   have only one of set of children. For example, the technique element in the 
   common profile can have either constant, lambert, phong or blinn child elements
   which are mutually exclusive.
   
   @returns {object Element}
   
   @param {Array} choiceTagNames Array of strings which contain the tags of
   choices an element can have.
   */
  this.getChoice = function (parentTag, choiceTagNames)
  {
    var choice = null;
    var i = 0;

    // use an iterator just in case the file does not conform to the spec
    // and we can just out of the loop
    while (choice == null && i < choiceTagNames.length)
    {
      choice = parentTag.getElementsByTagName(choiceTagNames[i])[0];
      i++;
    }

    return choice;
  }

  /**
   @private
   Parse is responsible for traversing different parts of the xmlObject
   and constructing the geometries from the data provided.
   
   This function is not called directly, it is called once the xml is 
   finished downloading.
   
   @param {xmlDocument} xmlObject
   */
  this.parse = function (xmlObject)
  {
    // since the xmlhttp object is calling this function, any reference
    // to 'this' refers to the xmlhttp object, but we want to access the members in
    // the object that owns this function, the DAELoader instance.  To
    // do this, simply make a reference to the this.parent which was set
    // earlier, now we can access the members we need.
    var loader = this.parent;

    // get the root element of the xml document, to keep the naming short.
    var root = xmlObject.documentElement;

    // load the images listed in the dae file under the
    // library_images into the texture manager.
    var library_images = root.getElementsByTagName("library_images");

    // <collada> may have 0 or many <library_images>
    for (var libraryImagesIter = 0, len = library_images.length; libraryImagesIter < len; libraryImagesIter++)
    {
      // one <library_images> has <images>. cardinality isn't mentioned in the spec.
      var imageElements = library_images[libraryImagesIter].getElementsByTagName("image");

      // 
      for (var imageElementIter = 0, len2 = imageElements.length; imageElementIter < len2; imageElementIter++)
      {
        // an <image> has exactly one <init_from> which have the uri or the
        // texture.
        //	<image id="file2" name="file2" depth="1">
        //		<init_from>./duckCM.tga</init_from>
        //	</image>
        //
        var init_from = imageElements[imageElementIter].getElementsByTagName("init_from")[0];
      }
    }

    // get the up axis so we can orient the object without making
    // the user do it explicitly.
    //
    //
    var upAxisTag = root.getElementsByTagName("up_axis")[0];
    if (upAxisTag)
    {
      xmlObject.upAxis = upAxisTag.childNodes[0].nodeValue;
    }

    // we start at the scene tag. A document instance 
    // can contain zero or 1 <scene> tags, therefore we
    // can address the 0th element.  If the
    // scene tag is not present, this is an error, as 
    // we are concerned with some sort of visual scene.
    // TODO: handle no scene elements.
    var sceneElement = root.getElementsByTagName("scene")[0];

    // A scene element can contain ZERO OR ONE of each of the following 
    // elements:
    // <instance_visual_scene>
    // <instance_physics_scene>
    // again, we are concerned only with visual stuff right now
    // so if the element <instance_visual_scene> is not present, 
    // its another error. the <instance_visual_scene> has an attribute that acts as
    // a foreign key into an element in the library_visual_scenes
    // tag.
    // TODO: handle no <instance_visual_scene> element. This can occur if the
    // user tries to load a 1.3 Collada instance.
    var instanceVisualSceneElem = sceneElement.getElementsByTagName("instance_visual_scene")[0];

    // get the url attribute of the <instance_visual_scene>
    // this will tell us which scene to load. (we will be loading one scene from the 
    // library of scenes).
    // this has a # in front of it so we have to remove it.
    var visualSceneToLoad = instanceVisualSceneElem.getAttribute("url").split('#')[1];

    // a collada document has ZERO OR MANY <library_visual_scenes>
    // which in turn have ONE OR MANY <visual_scene>'s.
    // a <visual_scene> is the base of a scenegraph, which is what we 
    // want.  Note that even if <library_visual_scenes> has
    // more than one <visual_scene>'s, only one will be loaded.
    // The one to load is the the value found earlier in the 
    // <instance_visual_scene>'s url attribute.
    // so first, go the the collada's/root's <library_visual_scenes>
    // TODO: can't access the first node since there may be many library_visual_scenes,
    // we have to iterate over the libraries until we find the visualScene we want.
    var libraryVisualScenes = root.getElementsByTagName("library_visual_scenes")[0];

    // added 'List' to avoid confusion with 'visualScene', which is the
    // scene we will load.
    // This is the list of visual scenes.  Only one of which we will actually load.
    var visualSceneList = libraryVisualScenes.getElementsByTagName("visual_scene");

    // Find the <visual_scene> element which we want, buy
    // using the 'foreign key' we got from the <instance_visual_scene>.
    var visualScene = null;

    // go over all the visual scenes trying to identify the one we want.
    for (var i = 0, len = visualSceneList.length; i < len; i++)
    {
      if (visualSceneList[i].getAttribute("id") == visualSceneToLoad)
      {
        visualScene = visualSceneList[i];
      }
    }

    // we are at the start of the visual_scene tag, this may have many
    // nodes
    // we now should have the visual_scene to load.
    // A visual scene has ONE OR MANY <node> elements which compose the scenegraph.
    var nodes = c3dl.ColladaLoader.getChildNodesByNodeName(visualScene, "node");

    // there is a change nodes is null if the dae file was edited manually
    // and the nodes were removed. 
    if (nodes)
    {
      // parse each of the 'root' nodes.
      for (var currNode = 0, len = nodes.length; currNode < len; currNode++)
      {
        var scenenode = new c3dl.SceneNode();

        //
        loader.rootNode.addChild(scenenode);
        scenenode.setName(nodes[currNode].getAttribute("name"));

        loader.parseNodeRecursive(xmlObject, nodes[currNode], scenenode);
      }
    }

    // !!!
    c3dl.ColladaQueue.popFront();
    delete xmlObject;
    delete xmlhttp;
  }

  /**
   @private
   
   @param {XMLDocument} xmlObject
   @param {String} target
   */
  this.instantiateMaterial = function (xmlObject, target)
  {
    var tempTexture = null;

    // we now have the material ID which we can look up in the library materials.
    var material = this.findElementInLibrary(xmlObject, "library_materials", "material", target);
    var tempName = target;

    // a <material> has exactly 1 <instance_effect>, so just get the first.
    //
    //<library_materials>
    //	<material id="shine" name="shine">
    //		<instance_effect url="#shine-fx"/>
    //	</material>
    //	<material id="matte" name="matte">
    //		<instance_effect url="#matte-fx"/>
    //	</material>
    //</library_materials>
    var instanceEffect = material.getElementsByTagName("instance_effect")[0];
    var instanceEffectURL = instanceEffect.getAttribute("url").split('#')[1];

    // go to the <library_effects> since we have the <instance_effect>
    // and it points to an entry in the library.
    //
    //
    var effect = this.findElementInLibrary(xmlObject, "library_effects", "effect", instanceEffectURL);

    // An effect has 1..N profiles. Each profile is designed for a specific platform,
    // usage scenario, etc.
    //
    // profile types include:
    // profile_COMMON - used for basic interchange between DCCs.
    // profile_CG - opengl and NVIDIA's Cg shading language.
    // profile_GLSL - opengl & glslang
    // profile_GLES - opengl 1.0 and 1.1
    //
    // Collada book states support for GLES 2.0 and HLSL are in development,
    // has this already been released?
    //
    // Right now we will focus on the fallback, profile_COMMON since it seems to be 
    // the safest profile and will likely be available. This should be understood 
    // by every application. We use it now as a default, later other profiles can 
    // be supported, namely GLSL/GLES.
    var profile_COMMON = effect.getElementsByTagName("profile_COMMON")[0];

    // In each technique in the profile_COMMON profile is one of the  shader 
    // algorithms: blinn, phong, constant or lambert. These shading algorithms
    // are used in DCC tools which do not have adopted a shading language, therefore
    // are using fixed functionality. Blinn shading algorithm is used by most DCC 
    // tools and therefore most common.
    var technique = profile_COMMON.getElementsByTagName("technique")[0];

    // get the texture
    var newparam = profile_COMMON.getElementsByTagName("newparam")[0];

    if (newparam)
    {
      // go to the surface type
      var surface = newparam.getElementsByTagName("surface")[0];

      // get the value between the <init_from> tags
      // the plane would have:
      // <init_from>file1</init_from>
      // it also has a format, but we ignore this for now.
      var init_from = surface.getElementsByTagName("init_from")[0];

      // got the file id.
      var fileID = init_from.childNodes[0].nodeValue;

      // file1 is an id of an image in the <library_images> library
      var texture = this.findElementInLibrary(xmlObject, "library_images", "image", fileID);

      // finally, get the image name
      //<image id="file2" name="file2" depth="1">
      //	<init_from>./duckCM.tga</init_from>
      //</image>
      var textureName = texture.getElementsByTagName("init_from")[0].childNodes[0].nodeValue;

      var resolvedTexture;

      // if the texture is an abosolute path, use it.
      if (c3dl.isPathAbsolute(textureName))
      {
        resolvedTexture = textureName;
      }
      // otherwise, we need to place the path of dae file before the texture.
      else
      {
        resolvedTexture = c3dl.getPathWithoutFilename(xmlObject.colladaPath) + textureName;
      }
      tempTexture = resolvedTexture;
    }

    // get the shading algorithm used.
    // as of right now, we aren't concerned with the algorithm itself, (we use our
    // own custom shading algorithm) but what we want to extract are the properties
    // of the shading method which include diffuse, ambient, specular, etc. components.
    var shadingAlgorithm = this.getChoice(technique, ["blinn", "constant", "phong", "lambert"]);

    var mat = new c3dl.Material();
    //mat.texture = tempTexture;
    mat.setName(tempName);
    mat.setAmbient(this.getColor(shadingAlgorithm, "ambient"));
    mat.setDiffuse(this.getColor(shadingAlgorithm, "diffuse"));
    mat.setEmission(this.getColor(shadingAlgorithm, "emission"));
    mat.setSpecular(this.getColor(shadingAlgorithm, "specular"));
    mat.setShininess(this.getColor(shadingAlgorithm, "shininess"));

    return [mat, tempTexture];
  }

  /**
   @private
   
   The root COLLADA can contain ZERO OR MANY library_geometries node.
   However in our case, since we are importing model data, should
   have at least one library_geometries.  If absent this will cause
   an error.
   
   The library geometries node contains 1 or Many <geometry>
   nodes.
   If library_geometries describes a car,
   there may be several <geometries> which described the chairs,
   seats, body, etc.
   
   @param {XMLDocument} xmlObject
   @param url
   @param instanceGeometryElement
   */
  this.instantiateGeometry = function (xmlObject, url, instanceGeometryElement)
  {
    var root = xmlObject.documentElement;
    var libraryGeometries = root.getElementsByTagName("library_geometries");

    // once not null, we can stop searching.
    var geoToCreate = null;
    var geometry = new c3dl.Geometry();

    // the url provided points to a geometry in a geometry library. We'll need to
    // go through the libraries and find which library it is in.
    // TODO: add breakout when found
    for (var currLib = 0, len = libraryGeometries.length; currLib < len; currLib++)
    {
      var geometries = libraryGeometries[currLib].getElementsByTagName("geometry");
      // for each geometry
      for (var currGeo = 0, len2= geometries.length; currGeo < len2; currGeo++)
      {
        if (geometries[currGeo].getAttribute("id") == url)
        {
          // found it
          geoToCreate = geometries[currGeo];
        }
      }
    }

    var verticesArray = null;
    var vertexStride;

    var normalsArray = null;
    var normalsStride;

    var texCoordsArray = null;
    var texCoordsStride;

    var faces = null;
    var rawFaces;

    // the library geometry will have a <mesh> which will have one or many <triangles>.
    // we have to go over each <triangle> element and construct it.
    // <geometry> contains all the data which describes a geometric object.
    // <geometry> contains <mesh>, which in turn contains collation elements.
    // these collation elements describe parts of the mesh differently either
    // using polygons or lines.
    //
    // a geometry contains only one mesh node, so just get the first index.
    // there are other kinds of meshes a geometry can have, but for now
    // we aren't supporting them (convex_mesh, brep, spline, ...)
    var mesh = geoToCreate.getElementsByTagName("mesh")[0];

    // we'll need to iterate over all the collation elements.
    var collations = [];

    // A mesh is composed of a set of collation elements.
    // Types of collation elements are 
    // <lines>, <linestrips>,
    // <polygons>, <polylist>,
    // <triangles>, <tristrips>, <trifans>
    //
    // polygons can be a set of 3 or more vertices, therefore, we'll need to divide the polygons
    // into triangles since GLES does not support quads or polygon rendering.
    //
    // The library does have means to render lines, but reading this primitive has not been added yet.
    //
    for (var i = 0, len = mesh.childNodes.length; i < len; i++)
    {
      if (mesh.childNodes[i].nodeName == "triangles" || mesh.childNodes[i].nodeName == "polygons" ||
        mesh.childNodes[i].nodeName == "polylist" || mesh.childNodes[i].nodeName =="lines" )
      {
        collations.push(mesh.childNodes[i]);
      }
    }

    // the collation elements have many primitives.
    // <p> element represents a primitive. 
    //
    // currColl = current collation
    for (var currColl = 0, len = collations.length; currColl < len; currColl++)
    {
      // Depending on the type of collation element, the data will be layed out slighly differently.			
      //
      // <triangles> and <polylist> are similar in that they both only have one <p> tag.
      // polylist has an additional <vcount> child element which has a list of integers
      // which states the number of vertices per polygon (which can vary).
      //
      // triangles are always composed of 3 vertices so this element does not require <vcount>
      //
      if (collations[currColl].nodeName == "triangles" || collations[currColl].nodeName == "polylist" ||
	  collations[currColl].nodeName == "lines")
      {
        var p = this.getFirstChildByNodeName(collations[currColl], "p");
        new C3DL_FLOAT_ARRAY(rawFaces = this.mergeChildData(p.childNodes).split(" "));
      }

      // <polygon>s are broken up like this:
      // <p> 0 0 1 1 2 2 3 3 </p>
      // <p> ... </p>
      // each <p> element describes one polygon which can vary in length from others
      //
      else if (collations[currColl].nodeName == "polygons")
      {
        var p_tags = collations[currColl].getElementsByTagName("p");
        rawFaces = new C3DL_FLOAT_ARRAY(collations[currColl].getAttribute("count"));
        for (var i = 0, len2 = p_tags.length; i < len2; i++)
        {
          // need to get rid of the spaces
          var p_line = p_tags[i].childNodes[0].nodeValue.split(" ");
          for (var j = 0, len3 = p_line.length; j < len3; j++)
          {
            rawFaces[i+j](parseInt(p_line[j]));
          }
        }
      }
      // If this message is ever seen, that means I have to write the case for it.
      else
      {
        c3dl.debug.logError(collations[currColl].nodeName + " collation element is not yet supported");
      }

      // At this point, we finished getting the faces for one collation element, the integers which will index
      // into data steams. Now we move onto getting the input data streams.
      //
      // get the inputs which contain the verts, normals, uvs.
      //
      // A collation element first contains the <input> tags, then <vcount> (in the case of
      // <polylist>) and then <p> tags. The <input> tags point to the raw data streams which 
      // 
      // The <input> tags associate a semantic to a data stream. This explains how the raw data
      // stream will be used for this particular context. <input> has a source attribute which
      // points to a source element which contains the raw data.
      //
      var inputs = collations[currColl].getElementsByTagName("input");

      collationElement = new c3dl.PrimitiveSet();

      // The order of the <input> tags can vary, so we can't rely on how they are arranged
      // in most documents.
      for (var i = 0, len2 = inputs.length; i < len2; i++)
      { /**************/
        /*  VERTICES  */
        /**************/
        if (inputs[i].getAttribute("semantic") == "VERTEX")
        {
          this.vertexOffset = inputs[i].getAttribute("offset");
          // need to remove the leading # from the value
          this.vertexSource = inputs[i].getAttribute("source").split('#')[1];

          var vertices = c3dl.ColladaLoader.getNodeWithAttribute(xmlObject, "vertices", "id", 
            this.vertexSource);

          // get the child
          var input = vertices.getElementsByTagName("input")[0];

          // get the <input>s source				
          var posSource = input.getAttribute("source").split('#')[1];

          // the raw data in a long list of floats, we have to group this so the face indices
          // can index into it.
          var data = this.getData(xmlObject, "source", "id", posSource);
          vertexStride = parseInt(data.stride);
          if (xmlObject.upAxis && xmlObject.upAxis == "Z_UP")
          {
            for (var vertIter = 0, len3 = data.values.length; vertIter < len3; vertIter += vertexStride)
            {
              var temp = data.values[vertIter + 1];
              data.values[vertIter + 1] = data.values[vertIter + 2];
              data.values[vertIter + 2] = -temp;
            }
          }
          else if (xmlObject.upAxis && xmlObject.upAxis == "X_UP")
          {
            for (var vertIter = 0, len3 = data.values.length; vertIter < len3; vertIter += vertexStride)
            {
              var temp = data.values[vertIter];
              data.values[vertIter] = -data.values[vertIter + 1];
              data.values[vertIter + 1] = temp;
            }
          }
          verticesArray = this.groupScalarsIntoArray(data.values, 3, vertexStride);
        }

        /**************/
        /*   NORMAL   */
        /**************/
        else if (inputs[i].getAttribute("semantic") == "NORMAL")
        {
          this.normalOffset = inputs[i].getAttribute("offset");
          // need to remove the leading # from the value
          this.normalSource = inputs[i].getAttribute("source").split('#')[1];
          var data = this.getData(xmlObject, "source", "id", this.normalSource);
          normalsStride = parseInt(data.stride);
          // length * stride instead of literal?
          if (xmlObject.upAxis && xmlObject.upAxis == "Z_UP")
          {
            for (var vertIter = 0, len3 = data.values.length; vertIter < len3; vertIter += normalsStride)
            {
              var temp = data.values[vertIter + 1];
              data.values[vertIter + 1] = data.values[vertIter + 2];
              data.values[vertIter + 2] = -temp;
            }
          }
          else if (xmlObject.upAxis && xmlObject.upAxis == "X_UP")
          {
            for (var vertIter = 0, len3 = data.values.length; vertIter < len3; vertIter += normalsStride)
            {		
              var temp = data.values[vertIter];
              data.values[vertIter] = -data.values[vertIter + 1];
              data.values[vertIter + 1] = temp;
            }
          }
          normalsArray = this.groupScalarsIntoArray(data.values, 3, normalsStride);
        }

        /**************/
        /*  TEXCOORD  */
        /**************/
        else if (inputs[i].getAttribute("semantic") == "TEXCOORD")
        {
          this.texCoordOffset = inputs[i].getAttribute("offset");
          // need to remove the leading # from the value
          var uvSource = inputs[i].getAttribute("source").split('#')[1];
          var data = this.getData(xmlObject, "source", "id", uvSource);
          texCoordsStride = parseInt(data.stride);

          // WebGL expects the bottom left corner of the
          // texture in the top left, so we need to flip the texture coordinates
          for (var currUV = 1, len3 = data.values.length; currUV < len3; currUV += texCoordsStride)
          {
            data.values[currUV] = 1 - data.values[currUV];
          }

          // we only want 2 values stored, but we may have to stride either 2 or
          // 3 depending if a zero was added
          // 1.0 1.0 0.0
          //         ^ don't need this.
          texCoordsArray = this.groupScalarsIntoArray(data.values, 2, texCoordsStride);
        }
      }


      // We now have the faces for a collation element and its input data streams,
      // however if the collation element is a <polylist> or <polygon>, we'll need to
      // re-arrange some of the faces since WebGL does not support quads.
      //  The next two conditionals handle these two cases.

      // <polylist> contains a list of polygons, each which can contains a different number 
      // of vertices (one poly has 3 another has 5).  Since we can't render polygons or even
      // quads in GLES, the polygons need to be broken down into triangles. Note, it is assumed
      // only simple convex polygons are used. (no intersections are present and no polygons are
      // concave). If there are intersections or the polygons are concave, they will be represented
      // incorrectly.
      if (collations[currColl].nodeName == "polylist")
      {
        rawFaces = this.splitPolylist(collations[currColl], inputs.length, rawFaces);
      }
      // before we group the individual values in the faces array into
      // arrays so we can easily address values in the arrays for vertices,
      // textures, etc, we have to convert the quads into triangles since
      // WebGL does not support the QUADS primitive mode.
      else if (collations[currColl].nodeName == "polygons")
      {
        // example looks like this:
        // 0,0,1,1,2,2,3,3,4,4,....
        // here is a quad and collada states its winding
        // order is counter clockwise, so our goal
        // to convert it to:
        // 0,0, 1,1, 3,3 3,3 1,1 2,2
        // which is 2 triangles.
        // first thing is to seperate the individual numbers into 'parts'
        // 0,0 is one part,  2,2 is another part.  If there are more
        // inputs, we have to account for that and our parts will be
        // larger
        var partSize = inputs.length;

        // make a new list which uses triangles and which will overrite the quads list.
        var trianglesList = [];

        // knowing the partSize, we can use it as a stride to create a new face list
        // count is an attribute of polygons which lists how many primitives the
        // polygon has. we can use this data to find out how many times we have to
        // change the parts.
		for (var currPrim = 0, count = collations[currColl].getAttribute("count"); currPrim < count; currPrim++)
        {
          var partsArray = [];

          // make an array of array so we can easily index parts
          // use four since a polygon primitive is defined as having 4 points
          for (var currPart = 0; currPart < 4; currPart++)
          {
            var part = [];
            for (currScalar = 0, len2 = inputs.length; currScalar < len2; currScalar++)
            {
              part.push(rawFaces[(currPrim * inputs.length * 4) + (currPart * partSize) + currScalar]);
            }
            partsArray.push(part);
          }

          // need to push on the RAW values, don't push on arrays.
          // TODO: write a function for this.
          for (var s = 0, len2 = partsArray[0].length; s < len2; s++)
          {
            trianglesList.push(partsArray[0][s]);
          }
          for (var s = 0, len2 = partsArray[1].length; s < len2; s++)
          {
            trianglesList.push(partsArray[1][s]);
          }
          for (var s = 0, len2 = partsArray[3].length; s < len2; s++)
          {
            trianglesList.push(partsArray[3][s]);
          }
          for (var s = 0, len2 = partsArray[3].length; s < len2; s++)
          {
            trianglesList.push(partsArray[3][s]);
          }
          for (var s = 0, len2 = partsArray[1].length; s < len2; s++)
          {
            trianglesList.push(partsArray[1][s]);
          }
          for (var s = 0, len2 = partsArray[2].length; s < len2; s++)
          {
            trianglesList.push(partsArray[2][s]);
          }
        }
        // now we can overrite what rawFaces had in it
        rawFaces = new C3DL_FLOAT_ARRAY(trianglesList);
      } // if polygons
      // we don't need a case for triangles since
      // now that we know how many inputs there were, we can group the faces.
      faces = this.groupScalarsIntoArray(rawFaces, inputs.length, inputs.length,collations[currColl].nodeName);

      // each primitive collation element can have a material name. this name matches to the
      // <instance_material>'s symbol attribute value.					
      collationElement.tempMaterial = collations[currColl].getAttribute("material");
	  if (collations[currColl].nodeName !== "lines") {
        collationElement.init(this.expandFaces(faces, verticesArray, this.vertexOffset, vertexStride), 
          this.expandFaces(faces, normalsArray, this.normalOffset, normalsStride), 
          this.expandFaces(faces, texCoordsArray, this.texCoordOffset, 2));
	  }
	  else {
	    collationElement.initLine(verticesArray, faces , collations[currColl].nodeName);
	  }
      geometry.addPrimitiveSet(collationElement);
    } // end iterating over collations

    // get the texture for the geometry
    // go back to the instance_geometry
    // <instance_geometry> has either 0 or 1 <bind_material>, so just get the first if it exsits.
    var bind_material = instanceGeometryElement.getElementsByTagName("bind_material")[0];
    if (bind_material)
    {
      // <bind_material> has exactly 1 <technique_common>, so only get the first.
      var technique_common = bind_material.getElementsByTagName("technique_common")[0];

      // technique_common within instance geometry may have many materials.
      var instance_materials = technique_common.getElementsByTagName("instance_material");

      // iterate over all the <instance_material>'s <technique_common> has.
      for (var im = 0, len2 = instance_materials.length; im < len2; im++)
      {
        // target is the target material to instantiate
        var target = instance_materials[im].getAttribute("target").split('#')[1];

        // symbol links to the primitive collation's material attribute.
        var symbol = instance_materials[im].getAttribute("symbol");

        // we now have the material ID which we can look up in the library materials.
        var material = this.findElementInLibrary(xmlObject, "library_materials", "material", target);

        //
        var matAndTex = this.instantiateMaterial(xmlObject, target);
        var instanceMaterial = matAndTex[0];
        var tex = matAndTex[1];

        var GeoCollations = geometry.getPrimitiveSets();

        // The material was instantiated and now we have to iterate over the collations
        // and find the collation which has a material which matches the material name.
        for (var ic = 0, len = GeoCollations.length; ic < len; ic++)
        {
          if (GeoCollations[ic].tempMaterial == symbol)
          {
            GeoCollations[ic].setMaterial(instanceMaterial);
            GeoCollations[ic].setTexture(tex);
          }
        }
      } // instance_materials loop
    } // bind_material conditional
    return geometry;
  }

  /**
   @private
   @param {XMLDocument} xmlObject
   @param {String} url
   
   @returns {c3dl.SceneNode}
   */
  this.instantiateNode = function (xmlObject, url)
  {
    var root = xmlObject.documentElement;
    var libraryNodes = root.getElementsByTagName("library_nodes");

    // domNode
    var nodeToCreate = null;

    // <collada> may have many <library_node>. We'll need to go through each to find
    // the node with the name we are looking for.
    for (var currLib = 0, len = libraryNodes.length; currLib < len /*&& nodeToCreate == null*/ ; currLib++)
    {
      // get all the nodes in this library.
      var nodes = libraryNodes[currLib].getElementsByTagName("node");

      // find the node in the list.
      for (var currNode = 0, len2 = nodes.length; currNode < len2 /*&& nodeToCreate == null*/ ; currNode++)
      {
        if (nodes[currNode].getAttribute("id") == url)
        {
          // found it
          nodeToCreate = nodes[currNode];
        }
      }
    }

    var inode = new c3dl.SceneNode();
    inode.setName(nodeToCreate.getAttribute("name"));

    this.parseNodeRecursive(xmlObject, nodeToCreate, inode);

    return inode;
  }

  /**
   @private
   This function takes a list of scalar values and 
   groups them into elements inside an array.  This 
   must be done since in the DAE file, the values are
   stored one after another in a linear format. Since
   the triangles/faces use indices to access these scalars,
   we have to group them together so indexing will work 
   properly.
   
   @param {Array} rawScalarValues
   @param {int} numComponentsPerElement
   @param {int} stride
   
   @returns {Array}
   */
  this.groupScalarsIntoArray = function (rawScalarValues, numComponentsPerElement, stride)
  {
    // start off with an empty list
    var listOfArrays = [];

    //
    for (var i = 0, len = rawScalarValues.length; i < len; i += stride)
    {
      var element = new C3DL_FLOAT_ARRAY(numComponentsPerElement);
	  var counter = 0;
      //
      for (var j = i; j < i + numComponentsPerElement; j++)
      {
        element[counter++]=rawScalarValues[j];
      }

      listOfArrays.push(element);
    }

    return listOfArrays;
  }


  /**
   @private
   
   @param {} collation
   @param {int} numInputs
   @param {Array} rawFaces
   */
  this.splitPolylist = function (collation, numInputs, rawFaces)
  {
    // rawFaces = this.splitPolylist(collations[currColl], inputs.length);
    // <vcount> has the count of vertices for each polygon.
    // <vcount> 4 4 4 3 4 5 3 4 .. </vcount>
    var vcountNode = this.getFirstChildByNodeName(collation, "vcount");
    var vcountList = this.mergeChildData(vcountNode.childNodes).split(" ");

    // this counter keeps track of where we are in the vcount list
    // <vcount>4 4 3 4 4 4 5 ... 4 4 3 4</vcount>
    var vcountIndex = 0;

    // 
    var primOffset = 0;

    // since we can only support triangles, we have to make a triangle list
    // and convert any quads to triangles.
    var trianglesList = [];
    //
    var partSize = numInputs;

    // iterate from the 0 to vcount, this is the number of primitives
    // there are in this mesh.  Primitives in a polylist may have
    // more than 4 vertices, we will solve this by making the 
    // triangle fans.
    // Vertices, according to the spec, will be counter clockwise.  Because
    // of this, we should be able to make fans without problems.
    for (var currPrim = 0, count = collation.getAttribute("count"); currPrim < count; currPrim++, vcountIndex++)
    {
      var partsArray = [];
      // the current number in the vcount list may have different values depending, may have 3, 4 or more
      // so we have to iterate for the amount of values in the primitive.
      for (var currPart = 0; currPart < vcountList[vcountIndex]; currPart++)
      {
        var part = [];

        for (currScalar = 0; currScalar < numInputs; currScalar++)
        {
          // first part (primOffset * inputs.length) indexes into the primitive
          // part.  Second part will index into the specific part we want.
          part.push(rawFaces[(primOffset * numInputs) + (currPart * numInputs) + currScalar]);
        }
        partsArray.push(part);
      }
      // set the new value for the primitive offset
      // since the number of vertices vary in a list of primitives,
      // we just keep track how many we have to skip here.
      // 4 3 4 3 3
      // we can't just calculate how many values we have to skip, we acutally
      // have to keep the total count.
      primOffset += parseInt(vcountList[vcountIndex]);

      // the way we will create a triangle fan is by creating a pivot
      // vertex and keep track of the last vertex added.
      // everytime a new vertex is added we will create a triangle from
      // the pivot, the last vertex and the new one.
      // start this as index 1. the first time this main loop runs, 
      // last will actually be the middle vertex, from then on, it 
      // will act as the last one added since before the iteration ends
      // we set last to be the fanIndex
      var last = 1;
      var firstTriangle = true;
      // create a triangle fan
      for (var fanIndex = 0; fanIndex < vcountList[vcountIndex] - 1;)
      {
        // s iterator is for scalar, we are dealing with single values.
        // push on the first 
        for (var s = 0, len = partsArray[0].length; s < len; s++)
        {
          // first
          trianglesList.push(partsArray[0][s]);
        }
        fanIndex++;

        // last
        for (var s = 0, len = partsArray[0].length; s < len; s++)
        {
          trianglesList.push(partsArray[last][s]);
        }

        // if this is the first iteration, increase the fanIndex.
        if (firstTriangle)
        {
          fanIndex++;
          firstTriangle = false;
        }

        for (var s = 0, len = partsArray[0].length; s < len; s++)
        {
          trianglesList.push(partsArray[fanIndex][s]);
        }

        last = fanIndex;
      }
    }
    // overwrite rawFaces with the triangle faces, as if quads never existed.
    //rawFaces = trianglesList;				
    return new C3DL_FLOAT_ARRAY(trianglesList);
  }


  /**
   @private
   @param {XMLDocument} xmlObject
   @param {String} libraryName
   @param {String} elementName
   @param {String} elementAttributeId
   
   @returns
   */
  this.findElementInLibrary = function (xmlObject, libraryName, elementName, elementAttributeId)
  {
    // collada may have many listings of the same library.
    var libraries = xmlObject.getElementsByTagName(libraryName);

    // for all the libraries in the <collada> element
    for (libraryIter = 0, len = libraries.length; libraryIter < len; libraryIter++)
    {
      var elements = libraries[libraryIter].getElementsByTagName(elementName);

      // for all the elements in each library.
      for (elementIter = 0, len2 = elements.length; elementIter < len2; elementIter++)
      {
        // found it
        if (elementAttributeId == elements[elementIter].getAttribute("id"))
        {
          return elements[elementIter];
        }
      }
    }
    // return null if it could not be found.
    return null;
  }


  /**
   @private
   @param {} xmlObject	
   @param {String} nodeName
   @param {String} attributeKey
   @param {String} attributeValue
   
   @return 
   */
  this.getData = function (xmlObject, nodeName, attributeKey, attributeValue)
  {
    var data = new Object();

    // find node that has 'src' value as id
    var nsrc = c3dl.ColladaLoader.getNodeWithAttribute(xmlObject, "source", "id", attributeValue);
    // go to the node's technique common
    var tech_common = nsrc.getElementsByTagName("technique_common")[0];

    // go to its accessor
    var accessor = tech_common.getElementsByTagName("accessor")[0];
    data.stride = accessor.getAttribute("stride");

    // get the source
    var accessorSrc = accessor.getAttribute("source").split("#")[1];

    //
    var float_array = c3dl.ColladaLoader.getNodeWithAttribute(xmlObject, "float_array", "id", accessorSrc);   
    //values in the DAE file are seperated with a space
    // don't use nodeValue since it will be broken up in 4096 chunks
	data.values = new C3DL_FLOAT_ARRAY(this.mergeChildData(float_array.childNodes).split(" "));
    return data;
  }

  /**
   @private
   @param {Array} faces A 2D array which has indices.  Each index points
   to a set of vertex, normal or texture coordinates.
   
   <pre>
   // faces can look like this:
   [
   [0,0,0] , 
   [1,0,1] , 
   [2,0,2] 
   ]
   // first value in each element is vertex index.
   // second value is normal index.
   // third value is uv index.
   </pre>
   
   @param {Array} array The array to expand. For a cube, the array of vertices
   can look like:
   
   <pre>
   [1.00000,1.00000,-1.00000] , [1.00000,-1.00000,-1.00000] , [-1.00000,-1.00000,-1.00000] 
   </pre>
   
   @param offset Refers to the component we are interested in within an array
   in the faces array.  Since the faces array has indices for verts, normals and texcoords,
   using a different index gets us a index which is a 0 based index into a list of 
   coordinates.
   
   <pre>
   here is a faces array.  If we used offset=2, we would get the following indices:
   [0,0,0] , [1,0,1] , [2,0,2] 
   ^         ^         ^
   </pre>
   
   @param {int} numComponentsToExpand
   */
  this.expandFaces = function (faces, array, offset, numComponentsToExpand)
  {
  
    // this is a single dimensional array which hold expanded values.
    var expandedArray = new C3DL_FLOAT_ARRAY(faces.length*3);
	var counter = 0;
    // in the nested loop, we divide the instructions into parts to
    // make it easier to read, but don't allocate these varialbes everytime
    // the loop is executed, so declare them here. This speeds up the parser
    // quite a bit.
    var face;
    var coordIndex;
    var coord;
    var floatValue;

    // for all the faces
    //  [0,0,0] ,   [1,0,1] ,   [2,0,2] 
    //  \    /      \    /      \    /  
    //    \/          \/          \/
    // currFace=0   currFace=1    ...
    for (var currFace = 0, len = faces.length; currFace < len; currFace++)
    {
      // have to be scalar, no arrays
      // each element in the faces array is another array. That second array
      // hold components.
      for (var currComp = 0; currComp < numComponentsToExpand; currComp++)
      {
        // go to a particular face:
        // [3, 1, 4]
        face = faces[currFace];

        // we might be dealing with verts, norms or textures, each has a different offset.
        // then go to a particular value inside denoted by the offset.
        // [3, 1, 4]
        //        ^
        // offset = 2 for tex
        // 4 is an index which refers to the 4th set of tex coords.
        // something like:
        // ["1.0", "0.0"] 
        coordIndex = face[offset];

        // coord is a vertex coord, normal or uv coord retrieved from the
        // 'array' array.
        //
        // ["29.4787", "0", "50.5349"]  -> array[0]
        // ["29.4787", "0", "50.5349"]  -> array[1]
        // ...
        // this is done for each component, for textures, we have 2 components.
        // for normals, we have 3.
        if (array) {
			coord = array[coordIndex][currComp];
		}
        // insert that value into the 1d array.
        expandedArray[counter++]=coord;
      }
    }
    return expandedArray;
  }

  /**
   @private
   Loading is done once all the nodes in the .DAE file have been created and placed
   into the ModelManager.
   
   @returns {bool} true if loading is done, false otherwise. 
   */
  this.doneLoading = function ()
  {
    return this.done;
  }

  /**
   @private
   
   get data from blinn, phong, lambert node
   
   @param {}
   @param {String} str
   */
  this.getColor = function (node, str)
  {
    // ambient, diffuse, specular, etc.
    var component = node != null ? node.getElementsByTagName(str)[0] : null;

    // if the component has a reference parameter, ignore it for now.
    // that component will not be used in the calculations.
    var returnValue = [0, 0, 0];

    // if the component is present (ambient, diffuse, specular)
    if (component)
    {
      var value = this.getChoice(component, ["color", "float", "texture"]);

      if (value.nodeName == "color")
      {
        returnValue = [];
        for (var currNode = 0, len = value.childNodes.length; currNode < len; currNode++)
        {
          returnValue += value.childNodes[currNode].nodeValue;
        }
        returnValue = returnValue.split(" ");
        returnValue = [parseFloat(returnValue[0]), parseFloat(returnValue[1]), parseFloat(returnValue[2])];
        returnValue = returnValue.slice(0, 3);
      }
      //
      else if (value.nodeName == "float")
      {
        returnValue = parseFloat(value.childNodes[0].nodeValue);
      }
      // 
      else if (value.nodeName == "texture")
      {
        returnValue = [1, 1, 1];
      }
    }

    return returnValue;
  }



  /**
   @private
   When reading data in between tags, 
   
   There tends to be a lot of data between tags such as <float_array>
   <float_array id="Teapot-mesh-positions-array" count="1590">29.4787 0 50.5349 ..... 34.093 </float_array>
   
   We can't just read the node value contents because it is broken up into 4096 byte chunks. So 
   we use this function to merge all the chunks together.
   
   @param {String} childNodes
   
   @returns
   */
  this.mergeChildData = function (childNodes)
  {
    var values = [];
    for (var currNode = 0, len = childNodes.length; currNode < len; currNode++)
    {
      values += childNodes[currNode].nodeValue;
    }

    // there are some 3d authoring tools which place a trailing space after a long set of data.
    // for example:
    //
    // <float_array id="Teapot-mesh-positions-array" count="1590">29.4787 0 50.5349 ..... 34.093 </float_array>
    //
    // the trailing space causes problems as when the string is split, an undefined value
    // is placed at the end of the array.  So we will get rid of any trailing spaces here.
    //
    return values.replace(/\s+$/, '');
  }



  /**
   @private
   Get the first child of type 'nodeName' of a element 'searchNode'.
   
   @param {Object Element} searchNode - the element to search.
   @param {String} nodeName - the node to search for.
   
   @returns 
   */
  this.getFirstChildByNodeName = function (searchNode, nodeName)
  {
    for (var i = 0, len = searchNode.childNodes.length; i < len; i++)
    {
      // found it!
      if (searchNode.childNodes[i].nodeName == nodeName)
      {
        return searchNode.childNodes[i];
      }
    }
    return null;
  }

}


/**
 @private	
 
 static method of collada loader. 
 
 @param {} xmlObject
 @param {String} nodeName
 @param {String} attributeKey
 @param {String} attributeValue
 
 @returns 
 */
c3dl.ColladaLoader.getNodeWithAttribute = function (xmlObject, nodeName, attributeKey, attributeValue)
{
  var nodeFound;

  // go to the root of the XML
  var root = xmlObject.documentElement;

  // get all the tags names 'nodeName'
  var elements = root.getElementsByTagName(nodeName);

  // we might have a few tags, we need to find the one with the id specified
  for (var i = 0, len = elements.length; i < len; i++)
  {
    if (elements[i].getAttribute(attributeKey) == attributeValue)
    {
      nodeFound = elements[i];
    }
  }
  return nodeFound;
}


/**
 @private
 Get the child nodes of searchNode which have the name 'nodeName'.
 This funciton is not recursive.  It only returns the <b>direct</b> children.
 
 @param {String} searchNode - the node to search.
 @param {String} nodeName - the nodes to search for.
 
 @returns {Array} array of node elements.
 */
c3dl.ColladaLoader.getChildNodesByNodeName = function (searchNode, nodeName)
{
  var children = [];
  var foundOne = false;

  if (searchNode.childNodes.length > 0)
  {
    for (var i = 0, len = searchNode.childNodes.length; i < len; i++)
    {
      if (searchNode.childNodes[i].nodeName == nodeName)
      {
        children.push(searchNode.childNodes[i]);
        foundOne = true;
      }
    }
  }

  // somehow need to specify if non were found, so 
  // send back a null if that's the case.
  if (foundOne == false)
  {
    children = null;
  }

  return children;
}



/**
 @private
 static method of c3dl.ColladaLoader
 
 Turn a series of strings seperated by 'delimiter' into float values.
 used when we need to convert <translate>0.0 0.0 0.0</translate> into float
 values.
 
 @param {String} numbers A string which contains numbers such as "1.0 0.0 1.0 0.0       0.0 1.0 ..." note the spaces.
 @param {String} delimeter A string which is being used to separate the numbers.
 */
c3dl.ColladaLoader.stringsToFloats = function (numbers, delimeter)
{
  var floatValues = [];

  // Get rid of leading and trailing spaces so they don't interfere with out split().
  // remove leading whitespace
  var trimmedNumbers = numbers.replace(/^\s+/, '');

  // remove trailing whitespace
  trimmedNumbers = trimmedNumbers.replace(/\s+$/, '');

  // remove superfluous whitespace between numbers
  // find one or more instances of whitespace and replace with a single space.
  trimmedNumbers = trimmedNumbers.replace(/\s+/g, ' ');

  // split each number into an element of an array, but they are still
  // strings, so convert them to float.
  var strValues = trimmedNumbers.split(delimeter);

  for (var i = 0, len = strValues.length; i < len; i++)
  {
    floatValues.push(parseFloat(strValues[i]));
  }

  return floatValues;
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @private
 @class ColladaQueue is a queueing system to load collada files.  There
 seems to be issues when two or more files are attempted to be loaded
 in script.  Albeit, if the second model is loaded once the first has
 been completely loaded, then they are both loaded properly.  Therefore
 this class was created for taking care of such serial loading.
 */
c3dl.ColladaQueue =
{

  queue: [],
  firstTime: true,

  /**
   @private
   Are there any more files to load?
   
   @returns {boolean} true if there are no more files to load, false otherwise.
   */
  isEmpty: function ()
  {
    return (c3dl.ColladaQueue.queue.length == 0 ? true : false);
  },

  /**
   @private
   Add a file to load at the end of the list
   
   @param {Collada} colladaInstance
   */
  pushBack: function (colladaInstance)
  {
    c3dl.ColladaQueue.queue.push(colladaInstance);

    // every time scene sees that a file is loaded, it
    // will popFront(), which in turn will load the next
    // file, but for the first file loaded,  we have to
    // do it manually.
    if (c3dl.ColladaQueue.firstTime)
    {
      c3dl.ColladaQueue.firstTime = false;
      c3dl.ColladaManager.loadFile(c3dl.ColladaQueue.queue[0].path);
    }
  },

  /**
   @private	
   Remove the first element from the queue. Do this if the first
   element has finished loading.
   */
  popFront: function ()
  {
    c3dl.ColladaQueue.queue.shift();

    // if there are more files to load, load them.
    if (c3dl.ColladaQueue.isEmpty() == false)
    {
      c3dl.ColladaManager.loadFile(c3dl.ColladaQueue.queue[0].path);
    }

    // if all the models were done, but the user didn't give us	
    // their main functions, we don't want the gif spinning there
    // forever, so turn it off.	
    else if (c3dl.ColladaQueue.isEmpty() == true && c3dl.mainCallBacks.length == 0)
    {
      c3dl.removeProgressBars();
    }

    // otherwise we loaded all the models, we can start rendering.
    else if (c3dl.ColladaQueue.isEmpty() == true && c3dl.mainCallBacks.length != 0)
    {
      c3dl.removeProgressBars();

      for (var i = 0, len = c3dl.mainCallBacks.length; i < len; i++)
      {
        var func = c3dl.mainCallBacks[i].f;
        var tag = c3dl.mainCallBacks[i].t;
        func(tag);
      }
    }
  },

  /**
   @private	
   Get the first element from the queue.
   
   @returns {Collada}
   */
  getFront: function ()
  {
    return c3dl.ColladaQueue.queue[0];
  }
};/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**	
 @class c3dl.Geometry is a container for the primitiveSets of a 
 geometric object.
 */
c3dl.Geometry = function () {
  // a geometry is composed of different collation elements (sets of primitives)
  // collation elements are <triangles>, <polylist>, <polygon>, etc.
  this.primitiveSets = [];
  this.effect = null;

  // the first time geometries are rendered, their VBO's need to
  // be setup. Can't do this when Collada objects are created
  // because we don't yet have a graphics context.
  this.firstTimeRender = true;

  /**
   @private
   
   Used by the collada loader
   */
  this.addPrimitiveSet = function (primitiveSet) {
    this.primitiveSets.push(primitiveSet);
  }

  /**
   @private
   
   Used by the ColladaManager
   */
  this.clone = function (other) {
    // 
    for (var i = 0, len = other.primitiveSets.length; i < len; i++) {
      this.primitiveSets.push(other.primitiveSets[i].getCopy());
    }
  }

  /**
   @private
   
   Used by the ColladaManager
   */
  this.getCopy = function () {
    var geometry = new c3dl.Geometry();
    geometry.clone(this);
    return geometry;
  }

  /**
   @private
   Get the effect of this geometry.
   
   @param {c3dl.Effect} The effect of this geometry.
   */
  this.getEffect = function () {
    return this.effect;
  }

  /**
   Get the array of primitive sets for this geometry.
   
   @returns {Array} The primitive sets for this geometry.
   */
  this.getPrimitiveSets = function () {
    return this.primitiveSets;
  }

  /**
   @private
   
   Does the given ray intersect with any of the geometry's primitive set's
   bounding spheres?
   
   @param {Array} rayOrigin
   @param {Array} rayDir
   */
  this.rayIntersectsEnclosures = function (rayOrigin, rayDir) {
    for (var i = 0, len = this.primitiveSets.length; i < len; i++) {
      if (this.getPrimitiveSets()[i].getType() !== "lines") {
        var bs = this.primitiveSets[i].getBoundingSphere();
        var pos = bs.getPosition();
        var radius = bs.getRadius();
        if (c3dl.rayIntersectsSphere(rayOrigin, rayDir, pos, radius)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   @private
   
   Does the mesh in this geometry node intersect with the ray?
   
   @param {Array} rayOrigin
   @param {Array} rayDir
   */
  this.rayIntersectsTriangles = function (rayOrigin, rayDir) {
    var mat = c3dl.inverseMatrix(c3dl.peekMatrix());
    var rayorigin = c3dl.multiplyMatrixByVector(mat, rayOrigin);
    var raydir = c3dl.normalizeVector(c3dl.multiplyMatrixByDirection(mat, rayDir));

    // allocate and resuse these vertices to prevent allocation and deletion every face.
    var vert1 = new C3DL_FLOAT_ARRAY(3);
    var vert2 = new C3DL_FLOAT_ARRAY(3);
    var vert3 = new C3DL_FLOAT_ARRAY(3);

    for (var i = 0, len = this.primitiveSets.length; i < len; i++) {
      if (this.getPrimitiveSets()[i].getType() !== "lines") {
        var vertices = this.primitiveSets[i].getVertices();

        // Iterate over each face of the object and test it against the ray.
        for (var j = 0, len2 = vertices.length; j < len2; j += 9) {
          // 3 points of a triangle with the object's position offset
          vert1[0] = vertices[j];
          vert1[1] = vertices[j + 1]
          vert1[2] = vertices[j + 2];

          vert2[0] = vertices[j + 3];
          vert2[1] = vertices[j + 4];
          vert2[2] = vertices[j + 5];

          vert3[0] = vertices[j + 6];
          vert3[1] = vertices[j + 7];
          vert3[2] = vertices[j + 8];

          if (c3dl.rayIntersectsTriangle(rayorigin, raydir, vert1, vert2, vert3)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   @private
   
   Called automatically
   */
  this.render = function (glCanvas3D, scene) {
    if (glCanvas3D == null) {
      c3dl.debug.logWarning('Geometry::render() called with a null glCanvas3D');
      return false;
    }
    if (this.getPrimitiveSets()[0].getType() === "lines") {
      scene.getRenderer().renderLines(this.getPrimitiveSets()[0].getLines());
    }
    else {
      // The first time this is rendered, setup VBOs.
      if (this.firstTimeRender == true) {
        // iterate over the primitive sets and setup their VBOs
        for (var i = 0, len = this.primitiveSets.length; i < len; i++) {
          this.primitiveSets[i].setupVBO(glCanvas3D);
        }
        this.firstTimeRender = false;
      }

      scene.getRenderer().renderGeometry(this);

      if (scene.getBoundingVolumeVisibility()) {
        // tell all the collation elements/ primitive sets to render their bounding spheres.
        for (var i = 0, len = this.primitiveSets.length; i < len; i++) {
          var bs = this.primitiveSets[i].getBoundingSphere();
          if (bs) {
            bs.render(scene);
          }
        }
      }
    }
  }

  /**
   @private
   
   Set the effect of this geometry. The geometry has primitive sets, 
   but those cannot be set directly. All primitive sets under this 
   geometric object will be rendered the same.
   
   @param {c3dl.Effect} effect
   */
  this.setEffect = function (effect) {
    this.effect = effect;
  }

  /**
   @private
   
   @param {c3dl.Material} material
   */
  this.setMaterial = function (material) {
    for (var i = 0, len = this.primitiveSets.length; i < len; i++) {
      this.primitiveSets[i].setMaterial(material);
    }
  }


  /**
   @private
   
   @param {} texture
   */
  this.setTexture = function (texture) {
    for (var i = 0, len = this.primitiveSets.length; i < len; i++) {
      this.primitiveSets[i].setTexture(texture);
    }
  }

  /**
   @private
   
   Called automatically
   */
  this.update = function (timeStep, scaleVec, rotateMat) {
    for (var i = 0, len = this.primitiveSets.length; i < len; i++) {
      var bs = this.primitiveSets[i].getBoundingSphere();
      if (bs) {
        var test = c3dl.peekMatrix();
        bs.setPosition([test[12], test[13], test[14]]);
        bs.scale(scaleVec);
        bs.moveCenter(rotateMat);
      }
    }
  }
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**	
 @class c3dl.PrimitiveSet represents a set of primitives within a 
 geometric class. It derives from how .DAE files are structured and is
 roughly equal to a 'primitive collation element'.
 
 <p>All primitive sets in a geometric object share the same coordinate 
 system, so when they are rendered, the matrix stack does not need to 
 be updated or queried. Each primitive set can have its own material 
 and texture if it was defined in the .DAE file.</p>
 
 <p>In the callback function of an effect, the geometry will need to be 
 queried for all its primitive sets. This set will need to be iterated
 and each must be rendered. Since each set can have its own material
 and texture, the context must be sent commands to have the proper 
 states set.</p>
 
 */
c3dl.PrimitiveSet = function ()
{
  this.material = null;
  this.texture = null;
  this.vertices = null;
  this.normals = null;
  this.texCoords = null;
  this.type = null;
  this.lineList = null;
  this.boundingSphere = null;
  this.buffers =
  {
  };

  /**
   @private
   
   @param {Array} vertices
   @param {Array} normals
   @param {Array} texCoords
   */
  this.init = function (vertices, normals, texCoords,type)
  {
    this.vertices = vertices;
    this.normals = normals;
    this.texCoords = texCoords;
    this.boundingSphere = new c3dl.BoundingSphere();
	this.type = type;
    // give the bounding sphere the vertices, so it can properly
    // adjust its radius to completely enclose the object. 
    this.boundingSphere.init(this.vertices);
  }
  this.initLine = function (vertices, faces, type)
  {
    this.vertices = [];
    this.lineList = [];
    for (var i = 0; i < vertices.length; i++) { 
      var xyz = [];
      xyz[0]= parseFloat(vertices[i][0]);
      xyz[1] = parseFloat(vertices[i][1]);
      xyz[2] = parseFloat(vertices[i][2]);
	  this.vertices.push(xyz[0]);
      this.vertices.push(xyz[1]);
      this.vertices.push(xyz[2]);
    }
    this.type = type;
    for (var i = 0; i < faces.length; i+=2) {
      var line = new c3dl.Line();
      var start = faces[i][0];
      var end = faces[i+1][0];
      line.setCoordinates([this.vertices[start*3], this.vertices[start*3+1], this.vertices[start*3+2]],
       [this.vertices[end*3], this.vertices[end*3+1], this.vertices[end*3+2] ]);
      this.lineList.push(line);
    }
  }
  /**
   @private
   
   */
  this.setupVBO = function (glCanvas3D)
  {
    this.buffers.vertices = glCanvas3D.createBuffer();
    this.buffers.normals = glCanvas3D.createBuffer();
    this.buffers.texCoords = glCanvas3D.createBuffer();
    glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.buffers.vertices);
    glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, this.vertices, glCanvas3D.STATIC_DRAW);
    glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.buffers.normals);
    glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, this.normals, glCanvas3D.STATIC_DRAW);
    glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.buffers.texCoords);
    glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, this.texCoords, glCanvas3D.STATIC_DRAW);
  }

  this.getVBOVertices = function ()
  {
    return this.buffers.vertices;
  }

  this.getVBONormals = function ()
  {
    return this.buffers.normals;
  }

  this.getVBOTexCoords = function ()
  {
    return this.buffers.texCoords;
  }

  /**
   @private
   
   Get a semi-deep copy of this object.  The copy will have deep copies
   of the material and texture, but shallow copies of the vertices, normals and
   texCoords.
   
   @returns {c3dl.PrimitiveSet}
   */
  this.getCopy = function ()
  {
    var copy = new c3dl.PrimitiveSet();

    // shallow copy to save memory.
    copy.vertices = this.vertices;
    copy.normals = this.normals;
    copy.texCoords = this.texCoords;
    copy.texture = this.texture;
    copy.lineList = this.lineList;
	copy.type = this.type;
    // get a deep copy of the material since every collada object's primitive set
    // can have its own material.		
    copy.material = this.material ? this.material.getCopy() : null;
	if (this.boundingSphere)
      copy.boundingSphere = this.boundingSphere.getCopy();
    return copy;
  }

  /**
   Get the path of the texture for this primitive set.
   
   @returns {String} path of the texture.
   */
  this.getTexture = function ()
  {
    return this.texture;
  }

  /**		
   Get the single dimensional array of vertices of this primitive set.
   The array of vertices is in the order x,y,z,x,y,z,...
   
   @returns {Array} Vertices are in the order x,y,z,x,y,z,...
   */
  this.getVertices = function ()
  {
    return this.vertices;
  }

  /**
   Get the single dimensional array of normals of this primitive set. 
   The array of normals is in the order nx, ny, nz, nx, ny, nz,...
   
   @returns {Array} Normals are in the order nx, ny, nz, nx, ny, nz,...
   */
  this.getNormals = function ()
  {
    return this.normals;
  }

  /**
   Get the single dimensional array of texture coordinates of this 
   primitive set. The array of texture coords is in the order u, v, u, v,...
   
   @returns {Array} Textures coordinates are in the order u, v, u, v,...
   */
  this.getTexCoords = function ()
  {
    return this.texCoords;
  }

  /**
   Get the material of this primitive set.
   
   @returns {c3dl.Material} Material of this primitive set.
   */
  this.getMaterial = function ()
  {
    return this.material;
  }

  /**
   @private
   
   @returns {c3dl.BoundingSphere}  the updated bounding sphere object.
   */
  this.getBoundingSphere = function ()
  {
    return this.boundingSphere;
  }


  /**
   @private
   Set the material of this primitive set. The material can't be directly
   set by the user, but is set by the library when the .DAE file is being
   loaded.
   
   @param {c3dl.Material}
   */
  this.setMaterial = function (material)
  {
    this.material = material;
  }

  /**
   @private
   Set the texture of this primitive set. The texture can't be directly
   set, but is set when the .DAE file is being loaded.
   
   @param {String} texture Path of the texture.
   */
  this.setTexture = function (texture)
  {
    this.texture = texture;
  }
  this.getLines = function ()
  {
    return this.lineList;
  }
  this.getType = function ()
  {
    return this.type;
  }
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/


/**
 @class
 This is an 'abstract' class which should not be instantiaed.  Doing so will result in a 
 light which will not work and have no effect on the scene.  This class exists to serve as 
 a base class for c3dl.PositionalLight and c3dl.DirectionalLight. To place a light into a 
 scene use a class which derives from this one.
 */
c3dl.Light = function ()
{
  // Derived classes will overide this member so when scene calls getType() it will
  // know its type.
  this.type = c3dl.ABSTRACT_LIGHT;

  // assign names to lights as to make removing them easy.
  this.name = "unnamed";

  // OpenGL assigns default values to lights.  For example light0 already has some
  // properties which will light the scene.  the other lights are off by default. It
  // was decided to zero out all the components for all the lights 0-7 to prevent
  // any confusion.
  this.ambient = c3dl.makeVector(0, 0, 0);
  this.diffuse = c3dl.makeVector(0, 0, 0);
  this.specular = c3dl.makeVector(0, 0, 0);
  //this.on = 0;
  this.on = false;

  /**
   Get the name of this light.
   
   The name can be assigned with SetName() and should be unique.  When getting or 
   removing a light from the scene, the name must be used as an identifier.
   
   @returns {string} the name of the light.
   */
  this.getName = function ()
  {
    return this.name;
  }

  /**
   Get the ambient component of this light.
   
   Ambient light does not have a direction or position, but seems to come from 
   everywhere. If only using ambient light, all objects in the scene would be lit 
   evenly. Assigning an ambient component to a light can seem strange since lights 
   typically tend to attenuate. The functionality is simply provided because OpenGL 
   supports it. Generally, you should use scene.setAmbientLight(array) to place 
   ambient light in the scene.
   
   Regardless of the position of the light in the scene, the ambient component 
   will light the entire surface of all objects in the scene.  Also, if only using
   ambient light, object will tend to appear flat, therefore set the diffuse color
   component to give 'shape' to objects.
   
   @returns {Array} Array of three values in the order RGB.
   */
  this.getAmbient = function ()
  {
    return c3dl.copyVector(this.ambient);
  }

  /**
   Get the difuse component of this light.
   
   Diffuse light is what most people associate with what light is. Diffuse gives 
   shape to the object, making it appear 3D. Diffuse lighting is dependent on the 
   light’s position relative to the object.  For example,  if you were looking 
   at the object directly and the light was behind it, you would likely not see much of
   the light's effect. If you were at the position of the light looking at the object,
   you would see the object light and likely its contour would be less lit.
   
   @returns {Array} Array of three values in the order RGB.
   */
  this.getDiffuse = function ()
  {
    return c3dl.copyVector(this.diffuse);
  }

  /**
   Get the specular component of the light.  
   
   Specular lighting is used to create shiny highlights. Highlights are typically 
   seen on objects such as glass, metal or plastic and are usually white.
   Unlike ambient and diffuse light, specular light takes not only the object's 
   position into account, but also the viewer’s position. The highlights tend to
   'follow' where the camera is looking.
   
   @returns {Array} Array of three values in the order RGB.
   */
  this.getSpecular = function ()
  {
    return c3dl.copyVector(this.specular);
  }

  /**
   Get the type of light this is.
   
   @returns {int} the type of light this is.
   */
  this.getType = function ()
  {
    return this.type;
  }

  /**
   If the light is on, it will affect the colors of the object it hits.
   
   When creating a light, its initial state will be off.
   
   @returns {boolean} true if the light is on, otherwise false.
   */
  this.isOn = function ()
  {
    return this.on;
  }

  /**
   Turn the light on or off.
   
   @param {boolean} isOn true to turn the light on, false to turn it off.
   */
  this.setOn = function (isOn)
  {
    this.on = isOn;
  }

  /**
   Set the name of the light.
   
   The scene can later be queried for the light by this name so the light can be 
   updated or removed.  The default name is "unnamed".
   
   @param {String} name The new name of the light.
   */
  this.setName = function (name)
  {
    this.name = name;
  }

  /**
   Set the ambient color component of this light.
   
   Ambient light does not have a direction or position, but seems to come from 
   everywhere. If only using ambient light, all objects in the scene would be lit 
   evenly. Assigning an ambient component to a light can seem strange since lights 
   typically tend to attenuate. The functionality is simply provided because OpenGL 
   supports it. Generally, you should use scene.setAmbientLight(array) to place 
   ambient light in the scene.
   
   Regardless of the position of the light in the scene, the ambient component 
   will light the entire surface of all objects in the scene. Also, if only using
   ambient light, object will tend to appear flat, therefore set the diffuse color
   component to give 'shape' to objects.
   
   @param {Array} color Array of three values in the order RGB.
   */
  this.setAmbient = function (color)
  {
      this.ambient[0] = color[0];
	  this.ambient[1] = color[1];
	  this.ambient[2] = color[2];  
  }

  /**
   Set the diffuse color component of this light.
   
   Diffuse light is what most people associate with what light is. Diffuse gives 
   shape to the object, making it appear 3D. Diffuse lighting is dependent on the 
   light’s position relative to the object.  For example,  if you were looking 
   at the object directly and the light was behind it, you would likely not see much of
   the light's effect. If you were at the position of the light looking at the object,
   you would see the object light and likely its contour would be less lit.		
   
   @param {Array} color Array of three values in the order RGB.
   */
  this.setDiffuse = function (color)
  {
    this.diffuse[0] = color[0];
	this.diffuse[1] = color[1];
	this.diffuse[2] = color[2]; 
  }

  /**
   Set the specular component of the light.  
   
   Specular lighting is used to create shiny highlights. Highlights are typically 
   seen on objects such as glass, metal or plastic and are usually white.
   Unlike ambient and diffuse light, specular light takes not only the object's 
   position into account, but also the viewer’s position. The highlights tend to
   'follow' where the camera is looking.
   
   @param {Array} color Array of three values in the order RGB.
   */
  this.setSpecular = function (color)
  {
    this.specular[0] = color[0];
    this.specular[1] = color[1];
    this.specular[2] = color[2];
  }
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/


/**
 @class
 A PositionalLight inherits from Light. Unlike DirectionalLight,
 a PositionalLight can have an attenuation factor.
 @see c3dl.Light
 @augments c3dl.Light
 */
c3dl.PositionalLight = function ()
{
  this.position = c3dl.makeVector(0, 0, 0);

  // use OpenGL default attenuation factors.
  // element 0 is for constant attenuation
  // element 1 is for linear attenuation
  // element 2 is for quadratic attenuation
  this.attenuation = c3dl.makeVector(1, 0, 0);

  // need to override the type the abstract class set.
  this.type = c3dl.POSITIONAL_LIGHT;

  /**	 
   Get the attenuation factors of this light. This is an array of three values
   which include constant attenuation, linear attenuation and quadratic attenuation.
   
   @returns {Array} The attenuation factors
   */
  this.getAttenuation = function ()
  {
    return c3dl.copyVector(this.attenuation);
  }

  /**
   Get the position of the light.
   
   @returns {Array} the position of the light.
   */
  this.getPosition = function ()
  {
    return c3dl.copyVector(this.position);
  }

  /**
   Set the attenuation factors of this light.
   
   the attenuation factor is calculated:
   
   attenuation factor = 1 / (C + L*D + Q*D^2) <br />
   C = constant attenuation, 0th element <br />
   L = linear attenuation, 1st element <br />
   Q = quadratic attenuation, 2nd element<br />
   D = distance between light and vertex.<br />
   
   @param {Array} attenuation
   */
  this.setAttenuation = function (attenuation)
  {
    this.attenuation[0] = attenuation[0];
	this.attenuation[1] = attenuation[1];
	this.attenuation[2] = attenuation[2];
  }

  /**
   Set the position of this light.
   
   @param {Array} Position of the light relative to world space.
   */
  this.setPosition = function (vec)
  {
    this.position[0] = vec[0];
	this.position[1] = vec[1];
	this.position[2] = vec[2];
  }
}

c3dl.PositionalLight.prototype = new c3dl.Light;/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/


/**
 @class
 
 A DirectionalLight inherits from Light.  It does not have a position 
 such as a PositionalLight. It only has a direction. Think if a 
 directional light as being infinately far from the scene, but its light
 rays travelling in the direction specified. Since it has no position, 
 it will always light a side of an object.<br />
 <br />
 When specifying the direction, you are specifying where the light rays are going towards.<br />
 <br />
 A DirectionalLight is useful when a scene contains an 2D array of objects aligned in a square. If
 all the objects are to be light the same way, a directional light would be a good choice to add
 to the scene.
 @augments c3dl.Light
 */
c3dl.DirectionalLight = function ()
{
  // WebGL will interpret the light as directional if
  // the last value specified for POSITION is 0 and
  // positional if the last value for POSITION is 1.
  // We use a 'direction' variable, but when given the light direction needs
  // to be specified, we just pass in our this.direction into the POSITION parameter.
  this.direction = c3dl.makeVector(0, 0, 1);
  this.type = c3dl.DIRECTIONAL_LIGHT;

  /**
   Get the direction of this light. The default direction of the light is [0,0,1].
   
   @returns {Array} the direction of the light which will be unit length.
   */
  this.getDirection = function ()
  {
    return c3dl.copyVector(this.direction);
  }

  /**
   Set the direction of this light. The 'dir' argument will be scaled to
   a unit vector before being assigned if not already unit length.
   
   @param {Array} dir Will be scaled to a unit vector before being assigned
   if not already unit length.
   */
  this.setDirection = function (dir)
  {
    this.direction = c3dl.normalizeVector(dir);
  }
}

c3dl.DirectionalLight.prototype = new c3dl.Light;/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class
 
 A spotlight is a PositionalLight which can have a 'cone' of light used to 
 restrict what objects or parts of an object get lit.  All vertices which 
 fall inside the code are lit.
 
 One application of using a spotlight is making a headlight effect.
 @see c3dl.PositionalLight
 @augments c3dl.Light
 @augments c3dl.PositionalLight	
 */
c3dl.SpotLight = function ()
{
  // this will be multiplied by 2 within our shader. 180 is the default OpenGL 
  // value for cutoff.  So we are starting off which a Positional light 
  // since there is no light 'cone'.
  this.cutoff = 180;

  // override the type
  this.type = c3dl.SPOT_LIGHT;

  // the direction where the spot light is pointing.
  this.direction = c3dl.makeVector(0, 0, -1);

  // how concentrated is the light?
  // use the OpenGL default value of zero to indicate uniform 
  // light distribution.
  this.exponent = 0;

  /**
   The cutoff value defines the spread of the cone of the spotlight. The
   value will either be 180 degrees or will range from 0 to 90 degrees. If 
   the value is 180, the spotlight will not have a cone.
   
   @returns {float} the cutoff value.
   */
  this.getCutoff = function ()
  {
    return this.cutoff;
  }

  /**
   Get the direction the spotlight is pointing which will be unit
   length.
   
   @returns {Array} the direction where the spotlight is
   pointing which will be unit length.
   */
  this.getDirection = function ()
  {
    return c3dl.copyVector(this.direction);
  }

  /**
   Get the intensity distribution of light within the cone of light the
   spotlight creates. Higher exponents result in a more focused light.
   
   @returns {float} Exponent will range from 0 to 128 inclusive.
   */
  this.getExponent = function ()
  {
    return this.exponent;
  }

  /**
   The cutoff defines the spread (angle) of the cone of the spotlight. 
   If the angle between the direction of the light and direction of spotlight
   to the vertex being lit is less than the cutoff, the vertex will be lit.
   
   @param {float} cutoff Measured in degrees. Must either be equal 
   to 180 or range between 0 and 90.
   */
  this.setCutoff = function (cutoff)
  {
    if ((cutoff >= 0 && cutoff <= 90) || cutoff == 180)
    {
      this.cutoff = cutoff;
    }
  }

  /**
   Set the direction of the spotlight. The 'dir' argument will be scaled to
   a unit vector before being assigned if not already unit length.
   
   @param {Array} dir Direction the spotlight is pointing. Will be scaled 
   to a unit vector before being assigned if not already unit length.
   */
  this.setDirection = function (dir)
  {
    this.direction = c3dl.normalizeVector(dir);
  }

  /**
   Set the intensity distribution of the light within the cone the spotlight
   creates. Higher exponent values will result in a more focused light.
   
   @param {float} exponent Must range from 0 to 128 inclusive.
   */
  this.setExponent = function (exponent)
  {
    if (exponent >= 0 && exponent <= 128)
    {
      this.exponent = exponent;
    }
  }
}

c3dl.SpotLight.prototype = new c3dl.PositionalLight;/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class c3dl.Material contains values which describe the behaviour of an object when light
 illuminates it.  A material can be applied to an object which will make the object appear
 to be compose of something rough, shiny, metalic, etc. An object may also emit light, in 
 which case a light is not required to be in the scene for the object to be colored/lit.
 */
c3dl.Material = function ()
{
  this.emission = c3dl.makeVector(0, 0, 0);
  this.ambient = c3dl.makeVector(0, 0, 0);
  this.diffuse = c3dl.makeVector(0, 0, 0);
  this.specular = c3dl.makeVector(0, 0, 0);
  this.shininess = 0;
  this.name = "unnamed";

  /**
   Get a deep copy of this object.
   
   @returns {c3dl.Material} a deep copy of this object.
   */
  this.getCopy = function ()
  {
    return c3dl.copyObj(this);
  }

  /**
   Get the color this material emits.
   
   @returns {Array} Three float values in the range 0 - 1 in the order RGB.
   */
  this.getEmission = function ()
  {
    return c3dl.copyVector(this.emission);
  }

  /**
   Get how much ambient light this material reflects.
   
   @returns {Array} Three float values in the range 0 - 1 in the order RGB.
   */
  this.getAmbient = function ()
  {
    return c3dl.copyVector(this.ambient);
  }

  /**
   Get how much diffuse light this material reflects.
   
   @returns {Array} Three float values in the range 0 - 1 in the order RGB.
   */
  this.getDiffuse = function ()
  {
    return c3dl.copyVector(this.diffuse);
  }

  /**
   Get the name of this material.
   
   @returns {String} name of this material.
   */
  this.getName = function ()
  {
    return this.name;
  }

  /**
   Get how much specular light this material reflects.
   
   @returns {Array} Three float values in the range 0 - 1 in the order RGB.
   */
  this.getSpecular = function ()
  {
    return c3dl.copyVector(this.specular);
  }

  /**
   Get how shiny this material is.
   
   @returns {float}
   */
  this.getShininess = function ()
  {
    return this.shininess;
  }

  /**
   Set how much light this material should emit.
   
   Examples of objects emitting their own light include 
   real world lights,
   glow-in-the-dark objects,
   any objects which should not appear black in absence of lights
   
   @param {Array} color Three float values in the range 0 - 1 in the order RGB.
   */
  this.setEmission = function (color)
  {
    if (this.assertColor(color))
    {
      this.emission[0] = color[0];
	  this.emission[1] = color[1];
	  this.emission[2] = color[2];
    }
  }

  /**
   Set how much ambient light this material reflects.
   
   @param {Array} color Three float values in the range 0 - 1 in the order RGB.
   */
  this.setAmbient = function (color)
  {
    if (this.assertColor(color))
    {
      this.ambient[0] = color[0];
	  this.ambient[1] = color[1];
	  this.ambient[2] = color[2];
    }
  }

  /**
   Set how much diffuse light this material reflects.
   
   @param {Array} color Three float values in the range 0 - 1 in the order RGB.
   */
  this.setDiffuse = function (color)
  {
    if (this.assertColor(color))
    {
      this.diffuse[0] = color[0];
	  this.diffuse[1] = color[1];
	  this.diffuse[2] = color[2];
    }
  }

  /**
   Set how much specular light this material reflects.
   
   @param {Array} color Three float values in the range 0 - 1 in the order RGB.
   */
  this.setSpecular = function (color)
  {
    if (this.assertColor(color))
    {
      this.specular[0] = color[0];
	  this.specular[1] = color[1];
	  this.specular[2] = color[2];
    }
  }

  /**
   Set how shiny this material is.
   
   @param {float} shine
   */
  this.setShininess = function (shine)
  {
    // allow negatives? what is the maximum?
    this.shininess = shine;
  }

  /**
   Set a new name for this material. 
   
   The default name for materials is "unnamed".
   
   @param {String} name New name of the material.
   */
  this.setName = function (name)
  {
    this.name = name;
  }

  /**
   Get a string representation of this object.
   
   @returns {String} A string of all the variables and their values 
   seperated by &lt;br /&gt;.
   */
  this.toString = function ()
  {
    var breakStr = "<br />";

    return "Name: " + this.getName() + breakStr + "Emission: " + this.getEmission() + breakStr +
      "Ambient: " + this.getAmbient() + breakStr + "Diffuse: " + this.getDiffuse() + breakStr +
      "Specular: " + this.getSpecular() + breakStr + "Shininess: " + this.getShininess();
  }

  /**
   @private
   
   @param color
   */
  this.assertColor = function (color)
  {
    if (color instanceof Array && color.length == 3)
    {
      return true;
    }
    else
    {
      c3dl.debug.logWarning("Invalid argument passed to material set* method." + 
        "Color values must be arrays with exactly 3 elements.");
      return false;
    }
  }
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class c3dl.Collada represents the model data from a collada file. To
 load a collada file into a scene, the file must first be called
 with c3dl.addModel('plane.dae'). This makes sure the file
 is parsed before it is used. In the main function, you can create
 instances of the collada file:
 <br />
 <br />
 var collada = new c3dl.Collada();<br />
 collada.init('plane.dae');<br />
 
 @augments c3dl.Primitive
 */
c3dl.Collada = c3dl.inherit(c3dl.Primitive, function () {
    c3dl._superc(this);
    this.boundingbox = new c3dl.BoundingBox();
    this.drawboundingbox = false;
    this.path = null;
    this.sceneGraph = null;
});


/**
 Get the path of collada file loaded. This is set when init() 
 is called.
 
 @returns {String}
 */
c3dl.Collada.prototype.getPath = function () {
    if (this.isReady()) {
        return this.path;
    }
}

/**
 Get the angular velocity of the scenegraph's root node.
 
 @returns 
 */
c3dl.Collada.prototype.getAngularVel = function () {
    if (this.isReady()) {
        return this.sceneGraph.getAngularVel();
    }
}

/**
 Get the linear velocity of the scenegraph's root node.
 
 @returns
 */
c3dl.Collada.prototype.getLinearVel = function () {
    if (this.isReady()) {
        return this.sceneGraph.getLinearVel();
    }
}

/**
 Get the position of the scene graph's root.
 
 @returns {Array}
 */
c3dl.Collada.prototype.getPosition = function () {
    if (this.isReady()) {
        return this.sceneGraph.getPosition();
    }
}

/**
 Set the angular velocity of the scenegraph's root node.
 
 @param {Array} vec
 */
c3dl.Collada.prototype.setAngularVel = function (vec) {
    if (this.isReady()) {
        this.sceneGraph.setAngularVel(vec);
    }
}

/**
 Get the up vector of the scenegraph's root node.
 
 @return {Array}
 */
c3dl.Collada.prototype.getUp = function () {
    if (this.isReady()) {
        return this.sceneGraph.getUp();
    }
}

/**
 Get the left vector of the scenegraph's root node.
 
 @return {Array}
 */
c3dl.Collada.prototype.getLeft = function () {
    if (this.isReady()) {
        return this.sceneGraph.getLeft();
    }
}

/**
 Get the direction vector of the scenegraph's root node.
 
 @returns {Array} 
 */
c3dl.Collada.prototype.getDirection = function () {
    if (this.isReady()) {
        return this.sceneGraph.getDirection();
    }
}

/**
 Can this object be picked when the user clicks on it?  In some scripts using
 the library, it may not make sense for wall, for example to be picked.  If the
 object cannot be picked, it will not tested against the ray which is generated
 then the user clicks the canvas, thus increasing performance.
 
 @returns {bool} true if the object can be picked, false otherwise.
 */
c3dl.Collada.prototype.getPickable = function () {
    if (this.isReady()) {
        return this.sceneGraph.getPickable();
    }
}

/**
 Set whether this object should be included in picking tests.  By omitting
 objects which should not be interacted with, it can increase performance.
 
 @param {bool} isPickable true if the object should be included in pikcing tests,
 false otherwise.
 */
c3dl.Collada.prototype.setPickable = function (isPickable) {
    if (this.isReady()) {
        this.sceneGraph.setPickable(isPickable);
    }
}

/**
 Set the linear velocity of the scenegraph's root node.
 
 @param {Array} vec
 */
c3dl.Collada.prototype.setLinearVel = function (vec) {
    if (this.isReady()) {
        this.sceneGraph.setLinearVel(vec);
    }
}

/**
 This should be called after the collada object is created. It will be 
 assigned a structural copy of the collada object which exists in the 
 ColladaManager. This object will then be able to update the 
 transformations without changing the object in the manager class. The
 nodes are copied, however the arrays of vertices, normals, etc are not.
 References exsist within this object which will point to the vertex arrays
 in the manager object.
 
 @param {string} daepath path of the collada file.
 */
c3dl.Collada.prototype.init = function (daePath) {
    this.path = daePath;

    // if the file is already in the manager, just get a copy of it now,
    // otherwise put it in queue.
    // Before the scene begins, the user must first specify all the collada files
    // they will use during the lifetime of the scene.  When the scene begins, all
    // the files they specified will be created and initialized.  Either it will 
    // be the first time (they won't exist in the manager) or they want a new 
    // object, in which case a copy must be created.
    if (c3dl.ColladaManager.isFileLoaded(this.path)) {
        this.sceneGraph = c3dl.ColladaManager.getSceneGraphCopy(this.path);
    }
    else {
        // this will be called if the scene is being initialized and we are 
        // placing collada objects in the manager.
        c3dl.ColladaQueue.pushBack(this);
    }
    if (this.isReady()) {
        c3dl.pushMatrix();
        c3dl.loadIdentity();
        this.boundingbox.init(this.sceneGraph.getAllVerts());
        c3dl.popMatrix();
    }
}

/**
 @private
 
 Called automatically
 
 Update animations for linear velocity and angular velocity.
 
 @param {float} timeStep
 */
c3dl.Collada.prototype.update = function (timeStep) {
    // keep checking to see if the file is done being loaded.
    if (this.isReady()) {
        c3dl.pushMatrix();
        c3dl.loadIdentity();
        this.sceneGraph.update(timeStep);
        c3dl.popMatrix();
        var angVel = this.sceneGraph.getAngularVel();
        this.boundingbox.rotateOnAxis(this.sceneGraph.left, angVel[0] * timeStep);
        this.boundingbox.rotateOnAxis(this.sceneGraph.up, angVel[1] * timeStep);
        this.boundingbox.rotateOnAxis(this.sceneGraph.dir, angVel[2] * timeStep);
        var linVel = this.sceneGraph.getLinearVel();
        linVel = c3dl.multiplyVector(linVel, timeStep);
        var tempPos = c3dl.addVectors(this.sceneGraph.getPosition(), linVel);
        this.boundingbox.setPosition(tempPos);

    }
    else {
        c3dl.debug.logError('You must call addModel("' + this.path + '"); before canvasMain.');

        if (c3dl.ColladaManager.isFileLoaded(this.path)) {
            // get a copy of the scenegraph so we can modify it.
            this.sceneGraph = c3dl.ColladaManager.getSceneGraphCopy(this.path);
        }
    }
}

/**
 @private
 */
c3dl.Collada.prototype.setSceneGraph = function (sg) {
    this.sceneGraph = sg;
}


/**
 @private
 
 Called automatically
 
 Render the collada object.
 
 @param {context} glCanvas3D
 @param {Scene} scene
 */
c3dl.Collada.prototype.render = function (glCanvas3D, scene) {
    if (this.sceneGraph && this.isVisible()) {
        // tell the root to render. The render() calls
        // will propogate down the graph.
        this.sceneGraph.render(glCanvas3D, scene);
        if (this.drawboundingbox) {
            this.boundingbox.render(scene);
        }
    }
}

/**
 Scale the the scenegraph's root node.
 
 @param {Array} scaleVec 
 */
c3dl.Collada.prototype.scale = function (scaleVec) {
    if (this.isReady()) {
        this.boundingbox.scale(scaleVec);
        this.sceneGraph.scale(scaleVec);
    }
}

/**
 Translate the entire Collada object. This will tell the root of the
 Collada scenegraph to translate by 'trans'.
 
 @param {Array} trans
 */
c3dl.Collada.prototype.translate = function (trans) {
    if (this.isReady()) {
        this.sceneGraph.translate(trans);
        this.boundingbox.setPosition(trans);
    }
}

/**
 Place the object to a new location relative to the world origin.
 
 @param {Array} pos 
 */
c3dl.Collada.prototype.setPosition = function (pos) {
    if (this.isReady()) {
        this.sceneGraph.setPosition(pos);
        this.boundingbox.setPosition(pos);
    }
}

/**
 Get the scenegraph of the Collada object.
 
 @returns {c3dl.SceneNode} Root node of the Collada model's scenegraph.
 */
c3dl.Collada.prototype.getSceneGraph = function () {
    return this.sceneGraph;
}

/**
 Set the texture of all the geometry sections (primitive collation elements 
 or primitiveSets) to this texture.
 
 @param {string} texturePath Path of the texture.
 */
c3dl.Collada.prototype.setTexture = function (texturePath) {
    if (this.isReady()) {
        this.sceneGraph.setTexture(texturePath);
    }
}

/**
 Sets the material of all the geometry sections (primitive collation elements 
 or primitiveSets) to this material. Thus, the entire Collada object will be
 rendered using this material.
 
 @param {c3dl.Material} material
 */
c3dl.Collada.prototype.setMaterial = function (material) {
    if (this.isReady()) {
        this.sceneGraph.setMaterial(material);
    }
}

/**
 Set the way this Collada object should be rendered. The 
 Effect will be set to all the nodes within the Collada's
 scenegraph. This should only be called once the scene has
 been initialized since on initialization, the built-in
 effects such as c3dl.effects.GOOCH, c3dl.effects.CARTOON, etc.
 are created.
 
 @param {c3dl.Effect} effect
 */
c3dl.Collada.prototype.setEffect = function (effect) {
    // add type checking?
    this.sceneGraph.setEffect(effect);
}

/**
 Rotate around the up vector by a hard amount.
 
 @param {float} angle in radians.
 */
c3dl.Collada.prototype.rotateOnAxis = function (axisVec, angle) {
    if (this.isReady()) {
        this.sceneGraph.rotateOnAxis(axisVec, angle);
        this.boundingbox.rotateOnAxis(axisVec, angle);
    }
}


/**
 Rotate around the up vector by a hard amount.
 
 @param {float} angle in radians.
 */
c3dl.Collada.prototype.yaw = function (angle) {
    if (this.isReady()) {
        this.sceneGraph.yaw(angle);
        this.boundingbox.rotateOnAxis(this.sceneGraph.up, angle);
    }
}

/**
 Rotate around the side vector by a hard amount.
 
 @param {float} angle in radians.
 */
c3dl.Collada.prototype.pitch = function (angle) {
    if (this.isReady()) {
        this.sceneGraph.pitch(angle);
        this.boundingbox.rotateOnAxis(this.sceneGraph.left, angle);
    }
}

/**
 @private
 */
c3dl.Collada.prototype.isReady = function () {
    return this.sceneGraph != null ? true : false;
}

/**
 Rotate around the direction vector by a hard amount.
 
 @param {float} angle in radians.
 */
c3dl.Collada.prototype.roll = function (angle) {
    if (this.isReady()) {
        this.sceneGraph.roll(angle);
        this.boundingbox.rotateOnAxis(this.sceneGraph.dir, angle);
    }
}

/**
 @private
 */
c3dl.Collada.prototype.getCopy = function () {
    var collada = new Collada();
    collada.clone(this);
    return collada;
}

c3dl.Collada.prototype.getTransform = function () {
    if (this.sceneGraph) {
        return this.sceneGraph.getTransform();
    }
}
/**
 @private
 */
c3dl.Collada.prototype.clone = function (other) {
    c3dl._super(this, arguments, "clone");

    this.path = other.path;
    this.sceneGraph = other.sceneGraph.getCopy();
    this.boundingbox = other.boundingbox.getCopy();
}

/**
 @private
 Does the given ray intersect with this object? This function will
 test the ray against all the geometry nodes in the scenegraph and
 return true as soon as it finds an intersection.
 
 @param {Array} rayOrigin The ray's origin in view space.
 @param {Array} rayDir The ray's direction in view space.
 
 @returns {bool} true if the ray intersects with one of the geometry nodes
 in the scenegraph.
 */
c3dl.Collada.prototype.rayIntersectsEnclosures = function (rayOrigin, rayDir) {
    var result = this.sceneGraph.rayIntersectsEnclosures(rayOrigin, rayDir);
    return result;
}

c3dl.Collada.prototype.getObjectType = function () {
    return c3dl.COLLADA;
}

/**
 @private
 Does the given ray intersect with any of the triangles in this object?
 
 @param {Array} rayOrigin ray's origin in world space.
 @param {Array} rayDir A normalized direction vector.
 
 @returns {bool} true if the ray intersects with any triangle in the object.
 */
c3dl.Collada.prototype.rayIntersectsTriangles = function (rayOrigin, rayDir) {
    // Use the matrix stack, but clear it out first
    c3dl.pushMatrix();
    c3dl.loadIdentity();

    var result = this.sceneGraph.rayIntersectsTriangles(rayOrigin, rayDir);

    // restore the stack to its previous state.
    c3dl.popMatrix();
    return result;
}
c3dl.Collada.prototype.getBoundingSpheres = function () {
    return this.sceneGraph.getBoundingSpheres();
}

c3dl.Collada.prototype.getHeight = function () {
    if (this.isReady()) {
        return this.boundingbox.getHeight();
    }
}
c3dl.Collada.prototype.getWidth = function () {
    if (this.isReady()) {
        return this.boundingbox.getWidth();
    }
}
c3dl.Collada.prototype.getLength = function () {
    if (this.isReady()) {
        return this.boundingbox.getLength();
    }
}
c3dl.Collada.prototype.setHeight = function (height) {
    var curheight = this.getHeight();
    var scaleVec = [];
    if (curheight > height) {
        scaleVec = [1, (1 / (curheight / height)), 1];
    }
    else if (curheight < height) {
        scaleVec = [1, (height / curheight), 1];
    }
    else {
        scaleVec[1, 1, 1];
    }
    this.boundingbox.scale(scaleVec);
    this.sceneGraph.scale(scaleVec);
}

c3dl.Collada.prototype.setLength = function (length) {
    var curlength = this.getLength();
    var scaleVec = [];
    if (curlength > length) {
        scaleVec = [(1 / (curlength / length)), 1, 1];
    }
    else if (curlength < length) {
        scaleVec = [(length / curlength), 1, 1];
    }
    else {
        scaleVec[1, 1, 1];
    }
    this.boundingbox.scale(scaleVec);
    this.sceneGraph.scale(scaleVec);
}

c3dl.Collada.prototype.setWidth = function (width) {
    var curwidth = this.getWidth();
    var scaleVec = [];
    if (curwidth > width) {
        scaleVec = [1, 1, (1 / (curwidth / width))];
    }
    else if (curwidth < width) {
        scaleVec = [1, 1, (width / curwidth)];
    }
    else {
        scaleVec[1, 1, 1];
    }
    this.boundingbox.scale(scaleVec);
    this.sceneGraph.scale(scaleVec);
}

c3dl.Collada.prototype.setSize = function (length, width, height) {
    length = parseFloat(length);
    width = parseFloat(width);
    height = parseFloat(height);
    var curlength = this.boundingbox.getLength();
    var curwidth = this.boundingbox.getWidth();
    var curheight = this.boundingbox.getHeight();
    var scaleVec = [];
    var vecL, vecW, vecH;
    if (curlength > length) {
        vecL = (1 / (curlength / length));
    }
    else if (curlength < length) {
        vecL = length / curlength;
    }
    else {
        vecL = 1;
    }
    if (curheight > height) {
        vecH = (1 / (curheight / height));
    }
    else if (curheight < height) {
        vecH = (height / curheight);
    }
    else {
        vecH = 1;
    }
    if (curwidth > width) {
        vecW = (1 / (curwidth / width));
    }
    else if (curwidth < width) {
        vecW = (width / curwidth);
    }
    else {
        vecW = 1;
    }
    scaleVec = [vecL, vecH, vecW];
    this.scale(scaleVec);
}

c3dl.Collada.prototype.setDrawBoundingBox = function (drawboundingbox) {
    this.drawboundingbox = drawboundingbox;
}

c3dl.Collada.prototype.getBoundingBox = function () {
    return this.boundingbox;
}

c3dl.Collada.prototype.getBoundingBoxCorners = function () {
    return this.boundingbox.getCorners();
}

c3dl.Collada.prototype.centerObject = function () {
    this.sceneGraph.center(this.boundingbox.realposition);
    this.boundingbox.center();
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @private
 
 @class c3dl.SceneNode
 */
c3dl.SceneNode = c3dl.inherit(c3dl.Primitive, function () {
  c3dl._superc(this);

  // An array of c3dl.Actors
  this.children = [];
});

/**
 @private
 
 Get a copy of this node and all its children.
 */
c3dl.SceneNode.prototype.getCopy = function () {
  var sceneNode = new c3dl.SceneNode();
  sceneNode.clone(this);
  return sceneNode;
}

/**
 @private
 */
c3dl.SceneNode.prototype.clone = function (other) {
  c3dl._super(this, arguments, "clone");

  // copy all the children
  for (var i = 0, len = other.children.length; i < len; i++) {
    this.addChild(other.children[i].getCopy());
  }
}

/**
 @private
 
 Add a child to this node
 
 @param child
 */
c3dl.SceneNode.prototype.addChild = function (child) {
  this.children.push(child);
}

/**
 @private
 
 private until function is tested.
 
 Ask every child node if they are named 'nodeName'.
 
 @param nodeName
 */
c3dl.SceneNode.prototype.findNode = function (nodeName) {
  var child = null;

  // check first if this node is the one user is looking for.
  if (nodeName == this.name) {
    child = this;
  }

  // otherwise check the children
  else {
    for (var i = 0, len = this.children.length; i < len; i++) {
      //
      if (this.children[i] instanceof c3dl.SceneNode) {
        child = this.children[i].findNode(nodeName);

        // if we found something it wont be null, so we can
        // skip checking the other nodes
        if (child != null) {
          break;
        }
      }
    }
  }
  return child;
}

/**
 @private
 
 Called automatically.
 
 Update animations, etc.
 
 @param {float} timeStep
 */
c3dl.SceneNode.prototype.update = function (timeStep, scaleVec, rotateMat) {
  c3dl._super(this, arguments, "update");
  c3dl.pushMatrix();
  if (!scaleVec) {
    scaleVec = this.scaleVec;
  }
  else if (this.scaleVec) {
    scaleVec = c3dl.multiplyVectorByVector(scaleVec, this.scaleVec);
  }
  if (!rotateMat) {
    rotateMat = this.getRotateMat();
  }
  else if (this.scaleVec) {
    rotateMat = c3dl.multiplyMatrixByMatrix(rotateMat, this.getRotateMat());
  }
  c3dl.multMatrix(this.getTransform());
  var velVec = c3dl.multiplyVector(this.linVel, timeStep);
  c3dl.addVectors(this.pos, velVec, this.pos);
  totalPos = c3dl.multiplyMatrixByVector(c3dl.peekMatrix(), this.pos);
  for (var i = 0; i < this.children.length; i++) {
    this.children[i].update(timeStep, scaleVec, rotateMat);
  }
  // Apply some rotations to the orientation from the angular velocity
  this.pitch(this.angVel[0] * timeStep);
  this.yaw(this.angVel[1] * timeStep);
  this.roll(this.angVel[2] * timeStep);
  c3dl.popMatrix();
}


/**
 @private
 
 Called automatically.
 
 When scene nodes are rendered, they first push on their matrix 
 onto the stack, and render their children.  By doing this, all 
 children will be rendered relative to their parent which is this node.
 */
c3dl.SceneNode.prototype.render = function (glCanvas3D, scene) {
  c3dl.pushMatrix();
  c3dl.multMatrix(this.getTransform());

  for (var i = 0, len = this.children.length; i < len; i++) {
    this.children[i].render(glCanvas3D, scene);
  }

  c3dl.popMatrix();
}

/**
 @private
 
 Set the texture for all the geometry leaves in the scenegraph.
 This should be used when a Collada file has many meshes and each
 mesh uses the same texture file.
 
 @param {String} textureName
 */
c3dl.SceneNode.prototype.setTexture = function (textureName) {
  for (var i = 0, len = this.children.length; i < len; i++) {
    this.children[i].setTexture(textureName);
  }
}

/**
 @private
 
 */
c3dl.SceneNode.prototype.setMaterial = function (material) {
  for (var i = 0, len = this.children.length; i < len; i++) {
    this.children[i].setMaterial(material);
  }
}

/**
 */
c3dl.SceneNode.prototype.setEffect = function (effect) {
  for (var i = 0, len = this.children.length; i < len; i++) {
    this.children[i].setEffect(effect);
  }
}

/**
 @private
 
 Called automatically
 
 Do any of the triangles in any of the geometry child nodes of this node intersect
 with the given ray?
 
 @param {Array} rayOrigin
 @param {Array} rayDir
 
 @returns {bool} true if any child geometry node has intersected the ray.
 */
c3dl.SceneNode.prototype.rayIntersectsTriangles = function (rayOrigin, rayDir) {
  c3dl.pushMatrix();
  c3dl.multMatrix(this.getTransform());

  var passed = false;

  for (var i = 0, len = this.children.length; i < len; i++) {
    // found a node which passed, we don't have to test the rest of the nodes.
    if (this.children[i].rayIntersectsTriangles(rayOrigin, rayDir)) {
      passed = true;
      break;
    }
  }
  c3dl.popMatrix();
  return passed;
}

/**
 @private
 
 Called automatically.
 
 Do any of the geometry child nodes of this node intersect with the given ray?
 
 @param {Array} rayOrigin
 @param {Array} rayDir
 
 @returns {bool} true if any child geometry node has intersected the ray.
 */
c3dl.SceneNode.prototype.rayIntersectsEnclosures = function (rayOrigin, rayDir) {
  var passed = false;

  // iterate over each child or stop until we find one which has passed the Bounding
  // sphere test.
  for (var i = 0, len = this.children.length; i < len; i++) {
    // found a node which passed, we don't have to test the rest of the nodes.
    if (this.children[i].rayIntersectsEnclosures(rayOrigin, rayDir)) {
      passed = true;
      break;
    }
  }
  return passed;
}

c3dl.SceneNode.prototype.getBoundingSpheres = function () {
  var boundingSpheres = [];
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i] instanceof c3dl.SceneNode) {
      boundingSpheres = boundingSpheres.concat(this.children[i].getBoundingSpheres());
    }
    else if (this.children[i] instanceof c3dl.Geometry) {
      for (var j = 0; j < this.children[i].getPrimitiveSets().length; j++) {
        if (this.children[i].getPrimitiveSets()[j].getBoundingSphere()) {
          boundingSpheres = boundingSpheres.concat(this.children[i].getPrimitiveSets()[j].getBoundingSphere());
        }
      }
    }
  }
  return boundingSpheres;
}

c3dl.SceneNode.prototype.getAllVerts = function () {
  var allverts = [];
  var numverts = 0;
  var temp2 = [],
      temp3 = [];
  c3dl.pushMatrix();
  c3dl.multMatrix(this.getTransform());
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i] instanceof c3dl.SceneNode) {
      allverts = allverts.concat(this.children[i].getAllVerts());
    }
    else if (this.children[i] instanceof c3dl.Geometry) {
      for (var j = 0; j < this.children[i].getPrimitiveSets().length; j++) {
        if (this.children[i].getPrimitiveSets()[j].getBoundingSphere()) {
          var temp = this.children[i].getPrimitiveSets()[j].getBoundingSphere().getMaxMins();
          c3dl.multiplyMatrixByVector(c3dl.peekMatrix(), [temp[0], temp[2], temp[4]], temp2);
          c3dl.multiplyMatrixByVector(c3dl.peekMatrix(), [temp[1], temp[3], temp[5]], temp3);
          allverts = allverts.concat(temp2);
          allverts = allverts.concat(temp3);
        }
      }
    }
  }
  c3dl.popMatrix();
  return allverts;
}

c3dl.SceneNode.prototype.center = function (newcenter) {
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i] instanceof c3dl.SceneNode) {
      this.children[i].center(newcenter);
    }
    else if (this.children[i] instanceof c3dl.Geometry) {
      var temp = new c3dl.SceneNode();
      for (var j = 0; j < this.children.length; j++)
      temp.addChild(this.children[j]);
      this.children = [];
      this.children[i] = temp;
      temp.setTransform(c3dl.makePoseMatrix([1, 0, 0], [0, 1, 0], [0, 0, 1], [-newcenter[0], -newcenter[1], -newcenter[2]]));
    }
  }
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 Check if the context, 'contextVersion' is supported.
 
 @param {float} contextVersion must be c3dl.GLES_CONTEXT_20
 
 @returns {boolean} True if the context 'contextVersion' is 
 supported or false if it's not supported or the 'contextVersion' 
 number was invalid.
 */
c3dl.isContextSupported = function (contextVersion)
{
  var isSupported = true;
  var dynamicCanvas;
  var contextString;

  if (contextVersion != c3dl.GLES_CONTEXT_20)
  {
    return false;
  }
  try
  {
    // create a canvas element in the html
    if (dynamicCanvas = document.createElement('canvas'))
    {
      // ignore the return value of getContext(), if this method does 
      // not throw an exception, we're ok.
      dynamicCanvas.getContext("moz-glweb20");
    }
  }
  catch (err)
  {
    isSupported = false;
  }

  return isSupported;
}

/**
 Create a copy of 'object' and return the copy.  This works with single
 dimensional Arrays and Objects.
 
 @param {Object|Array} object The object to copy.
 
 @returns {Object|Array} A copy of 'object'.
 */
c3dl.copyObj = function (object)
{
  if (object instanceof Array)
  {
    return object.slice();
  }
  else
  {
    var obj = new Object();

    for (i in object)
    {
      obj[i] = object[i];
    }

    return obj;
  }
}

/**
 Is the given path absolute or relative?
 
 @returns {boolean} true if the path is absolute false if relative
 */
c3dl.isPathAbsolute = function (path)
{
  var isAbsolute = false;

  for (var i = 0, len = path.length; i < len && i < 8; i++)
  {
    if (path.charAt(i) == ":")
    {
      isAbsolute = true;
    }
  }

  return isAbsolute;
}

/**
 Given a path to a file, this funciton will return the path without the
 filename.  If the following path was given,
 http://www.site.com/images/file.jpg
 this would be returned
 http://www.site.com/images/
 
 If the path is simply a filename, null will be returned.
 
 @returns {String} the path the user specified without the filename.
 */
c3dl.getPathWithoutFilename = function (path)
{
  var pathWithoutFilename = "";

  if (path != "")
  {
    // find the last slash either forward or backwards in the string.
    var lastForwardSlashPos = path.lastIndexOf('/');
    var lastBackSlashPos = path.lastIndexOf('\\');
    var lastSlashPos = lastForwardSlashPos > lastBackSlashPos ? lastForwardSlashPos : lastBackSlashPos;

    // copy chars from 0 to lastSlashPos
    for (var i = 0; i < lastSlashPos + 1; i++)
    {
      pathWithoutFilename += path[i];
    }
  }
  return pathWithoutFilename;
}

/**
 Get the absolute position of an object in the DOM.
 
 @returns {Array} an array with two elements, x and y.
 */
c3dl.getObjectPosition = function (obj)
{
  var currleft = 0;
  var currtop = 0;

  if (obj.offsetParent)
  {
    do
    {
      currleft += obj.offsetLeft;
      currtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return [currleft, currtop];
  }
}

/**
 @private
 */
c3dl.isValidColor = function (color)
{
  // Check if the value being passed is an array
  if (color instanceof Array)
  {
    // 4 color components: red, green, blue, alpha
    if (color.length == 4)
    {
      for (var i = 0; i < 4; i++)
      {
        // Check for Bad values
        if (isNaN(color[i])) return false;
      }
      return true;
    }
  }
  else
  {
    return false;
  }
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

//
c3dl.light_vs = 



// We need to create our own light structure since we can't access 
// the light() function in the 2.0 context.
"struct Light" +
"{" +

// figure out culling/light bug
//"	int isOn;" +
"	bool isOn;" +
"	int type;" +

"	vec3 ambient;" +
"	vec3 diffuse;" +
"	vec3 specular;" +
"	vec4 position;" +

	// Used if the light is a spotlight
"	vec3 spotDirection;" +
"	float spotExponent;" +
"	float spotCutoff;" +

	// Not used in calculations if the light is directional, since directional
	// lights do not attenuate.
"	float attenuation1;" +
"	float attenuation2;" +
"	float attenuation3;" +
"};" +

"uniform vec3 ambientLightColor;" +

// global lighting state, if this is off, no light calculations 
// are computed.
"uniform bool lightingOn;" +

//
"const int C3DL_MAX_LIGHTS = 7;" +

// custom light structures needed, we can't access WebGL light states.
"uniform Light lights[C3DL_MAX_LIGHTS];" +


/*
	A Spotlight is a positional light with a constraint which prevents light from radiating from
	all directions from the point light.  Instead a cone of light is created which lights up objects.

	Light light - the light in viewspace
	vec3 normal - transformed normal
	vec3 eye - 
	vec3 ecPos - vertex in eye coordinate space. 
	vec3 ambient - 
	vec3 diffuse - 
	vec3 specular - 	
	float shininess - 
*/
"void c3dl_SpotLight(	in Light light, in vec3 normal, in vec3 eye, in vec3 ecPos, " + 
"						inout vec3 ambient, inout vec3 diffuse, inout vec3 specular, " +
"						float shininess)" +
"{" +
"	float nDotVP; " + 
"	float nDotHV; " +
"	float spotDot; " + 
"	float spotAttenuation;" +
"	float attenuation;" + 
"	float d;" +
"	vec3 VP;" +
"	float pf;" +
"	vec3 halfVector;" +

	// calculate the vector from the current vertex to the light.
"	VP = vec3(light.position) - ecPos; " + 

"	vec3 ldir = normalize(light.spotDirection);" +

"	d = length(VP);" +
"	VP = normalize(VP);" + 

"	attenuation = 1.0 / (light.attenuation1 + (light.attenuation2 * d) + (light.attenuation3 * d * d));" +

	// dot product of the vector from vertex to light and light direction.
"	spotDot = dot(-VP, ldir);" +

	// if the vertex falls inside the cone
"	if(spotDot > cos(radians(light.spotCutoff)))" +
"	{" +
"		spotAttenuation = pow(spotDot, light.spotExponent);" +
"	}" +
"	else{" +
"		spotAttenuation = 0.0;" +
"	}" +


"	attenuation *= spotAttenuation;" +

"	halfVector = normalize(VP + eye);" +

"	nDotVP = max(0.0, dot(normal, VP));" + 
"	nDotHV = max(0.0, dot(normal, halfVector));" +

	//
"	if(nDotVP == 0.0){" +
"		pf = 0.0;" +
"	}" +
"	else{"+
"		pf = pow(nDotHV, shininess);" +
"	}" +

"	ambient += light.ambient * attenuation;" +
"	diffuse += light.diffuse * nDotVP * attenuation; " +
"	specular += light.specular * pf * attenuation;" +
"}" +



 
 /*
	A point light is similar to a lightbulb in that light rays radiate out in all directions.
	Unlike directional lights, point lights attenuate with distance.

	Light light - the light in view space
	vec3 normal - 
	vec3 eye - 
	vec3 ecPos - 
	vec3 ambient - 
	vec3 diffuse -
	vec3 specular -  
	float shininess - 
 */
"void c3dl_PointLight(	in Light light, in vec3 normal, in vec3 eye, in vec3 ecPos, " +
"						inout vec3 ambient, inout vec3 diffuse, inout vec3 specular, " +
"						float shininess)" +
"{" +
	// get the vector from the current vertex to the light's position.
"	vec3 VP = vec3(light.position) - ecPos;" +

	// amount of shininess
"	float pf;" +	

	// vector midway between VP and eye
"	vec3 halfVector = normalize(VP + eye);" +

	// get the distance from the current vector to the light position
"	float d = length(VP); " + 

	// normalize the light so it can be used in the dot product operation.
"	VP = normalize(VP);" + 

	// calculate the attenuation
"	float attenuation = 1.0 / (light.attenuation1 + (light.attenuation2 * d) + (light.attenuation3 * d * d));" + 

"	float nDotVP = max(0.0, dot(normal, VP));"+ 
"	float nDotHV = max(0.0, dot(normal, halfVector));" +

	//
"	if(nDotVP == 0.0){" +
"		pf = 0.0;" +
"	}" +
"	else{"+
"		pf = pow(nDotHV, shininess);" +
"	}" +

	// similar to the directional light, except we apply attenuation.
"	ambient += light.ambient * attenuation;" + 
"	diffuse += light.diffuse * nDotVP * attenuation;" + 
"	specular += light.specular * pf * attenuation;" +
"}" +


/*
	Light light - the light in view space
	vec3 normal - 
	vec3 ambient - 
	vec3 diffuse - 
	vec3 specular - 
	float shininess - 
*/
"void c3dl_DirectionalLight(in Light light, in vec3 normal, " +
"							inout vec3 ambient, inout vec3 diffuse, inout vec3 specular," +
"							float shininess)" +
"{" +

	// we have to flip the direction because the script tells the shader 
	// where the light is coming FROM. We have to specify what direction the light
	// is infinately towards.
"	vec3 VP = normalize(vec3(-light.position));" +

"	float powerfactor;" +

"	float nDotVP = max(0.0, dot(normal, VP));" + 
"	float nDotHV = nDotVP;" +

"	if(nDotVP == 0.0){" +
"		powerfactor = 0.0;" +
"	}" +
"	else{"+
"		powerfactor = pow(nDotHV, shininess);" +
"	}" +

"	ambient += light.ambient;" + 
"	diffuse += light.diffuse * nDotVP;" +
"	specular += light.specular * powerfactor;" +
"} ";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.material_vs = 

//
//
"struct Material" +
"{" +
"	vec3 emission;" +
"	vec3 ambient;" +
"	vec3 diffuse;" +
"	vec3 specular;" +

"	float shininess;" +
"};" +

//
"uniform Material material;" +

//
"uniform bool usingMaterial;";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.model_fs = 

"uniform sampler2D myTex;" + 
"uniform int usingTexture;" +

"void main(void) {" + 
//"	if(gl_FrontFacing == false){discard;}" +
	// if the current object being rendered has a texture, use the texel which has the 
	// texture color.  Otherwise we only take the gl_Color into account.
"	if( usingTexture == 1 ){" +

"		vec3 texel = vec3(texture2D(myTex, gl_TexCoord[0].xy));" +
"		gl_FragColor = vec4(texel,1.0) * gl_Color;" + 

"	}" + 
"	else" + 
"	{" + 
"		gl_FragColor = gl_Color;" +
"	}" + 
"}";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.model_vs =   

//
// vertex attributes
//
"attribute vec3 Vertex;" + 
"attribute vec3 Normal;" + 
"attribute vec3 Texture;" + 

// for every model we multiply the projection, view and model matrices
// once to prevent having to do it for every vertex, however we still need
// the view matrix to calculate lighting.
"uniform mat4 modelViewMatrix;" +

// we can calculate this once per model to speed up processing done on the js side.
"uniform mat4 modelViewProjMatrix;" +

// matrix to transform the vertex normals
"uniform mat4 normalMatrix;" + 


"void main(void){" + 

	// create a normal matrix 3x3 out of 4x4
"	mat3 normalMatrix3x3 = mat3(normalMatrix[0][0],normalMatrix[0][1],normalMatrix[0][2]," +
"								normalMatrix[1][0],normalMatrix[1][1],normalMatrix[1][2]," +
"								normalMatrix[2][0],normalMatrix[2][1],normalMatrix[2][2]);" + 
"	vec3 transformNormal = normalize(normalMatrix3x3 * Normal);" + 

//
"	vec3 ambient  = vec3(0.0, 0.0, 0.0);" + 
"	vec3 diffuse  = vec3(0.0, 0.0, 0.0);" + 
"	vec3 specular = vec3(0.0, 0.0, 0.0);" +

	// place the current vertex into view space
	// ecPos = eye coordinate position.
"	vec4 ecPos4 = modelViewMatrix * vec4(Vertex,1.0);" +

	// the current vertex in eye coordinate space
	// perspective divide
"	vec3 ecPos = (vec3(ecPos4))/ecPos4.w;" +

"	vec3 eye = vec3(0.0, 0.0, 1.0);" +
//"	eye = -normalize(ecPos);" +

"	float shine = 1.0;" +
"	if(usingMaterial)" +
"	{" +
"		shine = material.shininess;" +
"	}" +

"	if(lightingOn)" +
"	{" +
		// iterate over all the lights, and keep incrementing color values
		// the color values are passed by reference and modified.
"		for(int i = 0; i < C3DL_MAX_LIGHTS; i++)" +
"		{" +
"			if(lights[i].isOn) " +
"			{" +
"				if(lights[i].type == 1)" +
"				{" +
"					c3dl_DirectionalLight(lights[i], transformNormal, ambient, diffuse, specular, shine);" +
"				}" +

"				else if(lights[i].type == 2) " +
"				{" +
"					c3dl_PointLight(lights[i], transformNormal, eye, ecPos, ambient, diffuse, specular, shine);" +
"				}" +

"				else if(lights[i].type == 3)" +
"				{" +
"					c3dl_SpotLight(lights[i], transformNormal, eye, ecPos, ambient, diffuse, specular, shine);" +
"				}" +
"			}" +
"		}" +
"	}" +

"	if( usingMaterial ){" +
"		gl_FrontColor =	vec4(material.emission +				" +
"							ambientLightColor +					" +
"							ambient * material.ambient +		" +
"							diffuse * material.diffuse +		" +
"							specular * material.specular,1.0);	" +

"	}" +
"	else{" +
"		gl_FrontColor = vec4(ambientLightColor + ambient + diffuse + specular,1.0);" +
"	}" +

"	gl_Position =  modelViewProjMatrix * vec4(Vertex, 1.0);" +
"	gl_TexCoord[0] = vec4(Texture,1.0);" + 
"}";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/
var isDone = false;
/**
 @private
 */
c3dl.std_callback = function (renderingObj)
{
  var progObjID = renderingObj.getProgramObjectID();
  var geometry = renderingObj.getGeometry();
  var renderer = renderingObj.getRenderer();
  var glCanvas3D = renderingObj.getContext();

  glCanvas3D.useProgram(progObjID);

  var modelViewMatrix = c3dl.peekMatrix();
  c3dl.matrixMode(c3dl.PROJECTION);
  var projectionMatrix = c3dl.peekMatrix();
  c3dl.matrixMode(c3dl.MODELVIEW);

  // create a ModelViewProjection matrix.  By doing this, we can multiply
  // 3 matrices together once per model instead of once per vertex
  var modelViewProjMatrix = c3dl.multiplyMatrixByMatrix(projectionMatrix, modelViewMatrix);
  renderer.setUniformMatrix(progObjID, "modelViewMatrix", modelViewMatrix);
  renderer.setUniformMatrix(progObjID, "modelViewProjMatrix", modelViewProjMatrix);

  // render all the collation elements. Every collation element in an object will 
  // have the same tranformation
  for (var coll = 0; coll < geometry.getPrimitiveSets().length; coll++)
  {
    var currColl = geometry.getPrimitiveSets()[coll];

    // MATERIAL
    var mat = currColl.getMaterial();

    if (mat)
    {
      // every primitive collection can have a material associated with it.
      // currColl.material.getEmission()
      renderer.setUniformf(progObjID, "material.emission", mat.getEmission());
      renderer.setUniformf(progObjID, "material.ambient", mat.getAmbient());
      renderer.setUniformf(progObjID, "material.diffuse", mat.getDiffuse());
      renderer.setUniformf(progObjID, "material.specular", mat.getSpecular());
      renderer.setUniformf(progObjID, "material.shininess", mat.getShininess());
      renderer.setUniformi(progObjID, "usingMaterial", true);
    }
    else
    {
      renderer.setUniformi(progObjID, "usingMaterial", false);
    }

    // NORMAL
    var normalAttribLoc = glCanvas3D.getAttribLocation(progObjID, "Normal");

    // if the object acutally has normals and the normal attribute was found
    //			
    if (normalAttribLoc != -1 && currColl.getNormals())
    {
      // the top matrix is the modelview matrix.
      var NormalMatrix = c3dl.inverseMatrix(modelViewMatrix);
      NormalMatrix = c3dl.transposeMatrix(NormalMatrix);
      renderer.setUniformMatrix(progObjID, "normalMatrix", NormalMatrix);
      renderer.setVertexAttribArray(progObjID, "Normal", 3, currColl.getVBONormals());
    }
    else
    {
      glCanvas3D.disableVertexAttribArray(normalAttribLoc);
    }

    // TEXTURE
    var usingTexture = false;

    var texAttribLoc = glCanvas3D.getAttribLocation(progObjID, "Texture");
    var texID = renderer.texManager.getID(currColl.getTexture());

    // if the texture isn't loaded, but this collation element has one, 
    // queue one up
    if (texID == -1 && currColl.getTexture())
    {
      renderer.texManager.addTexture(currColl.getTexture());
    }

    // The following must be fixed: If a collada object was specified as having
    // a texture, but the texture file isn't found, the object will be textured.
    // However, this following condition will run, because the object 'thinks'
    // it has a texture.  the result is the object will not get lit and will
    // appear completely black.  We need to insert another condition which
    // states if the texture is actually present, this should run...
    if (texID != -1 && currColl.getTexture() && currColl.getTexCoords() && texAttribLoc != -1)
    {
      glCanvas3D.activeTexture(glCanvas3D.TEXTURE0);
      glCanvas3D.bindTexture(glCanvas3D.TEXTURE_2D, texID);
      renderer.setVertexAttribArray(progObjID, "Texture", 2, currColl.getVBOTexCoords());
      usingTexture = true;
    }
    else
    {
      glCanvas3D.activeTexture(glCanvas3D.TEXTURE0);
      glCanvas3D.disableVertexAttribArray(texAttribLoc);
      //glCanvas3D.bindTexture(glCanvas3D.TEXTURE_2D,-1);
    }

    // tell the fragment shader if we are using textures or not
    renderer.setUniformi(progObjID, "usingTexture", usingTexture);
    renderer.setUniformi(progObjID, "lightingOn", true);

    // VERTICES
    renderer.setVertexAttribArray(progObjID, "Vertex", 3, currColl.getVBOVertices());
    glCanvas3D.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length / 3);
  }
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.psys_vs = 

"attribute vec3 Vertex;" + 
"attribute vec2 Texture;" + 

"uniform vec4 Color;" +
"uniform mat4 modelViewProjMatrix;" +
"uniform mat4 rot;" +

"void main(void){" +

"	gl_FrontColor = Color;" + 
"	gl_Position = modelViewProjMatrix * vec4( Vertex, 1.0);" +
"	gl_TexCoord[0] = rot * vec4(Texture.s - 0.5, Texture.t - 0.5, 1.0, 1.0);" + 
" gl_TexCoord[0].s += 0.5;" +
" gl_TexCoord[0].t += 0.5;" +
"}";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.psys_fs = 

"uniform sampler2D myTex;" + 
"uniform int usingTexture;" +

"void main(void) {" + 

	// if the current object being rendered has a texture, use the texel which has the 
	// texture color.  Otherwise we only take the gl_Color into account.
"	if( usingTexture == 1 ){" +
"		vec3 texel = vec3(texture2D(myTex, gl_TexCoord[0].xy));" + 
"		gl_FragColor = vec4(texel,1.0) * gl_Color;" + 
"	}" + 
"	else" + 
"	{" + 
"		gl_FragColor = gl_Color;" +
"	}" + 
"}";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.point_vs = 

"attribute vec3 Vertex;" + 
"attribute vec3 Color;" + 

"uniform vec3 attenuation;" +
"uniform mat4 modelViewProjMatrix;" +
"uniform mat4 viewMatrix;" +

"void main(void){" + 

"	vec4 v = vec4(Vertex, 1.0);" +

	// place the point in view space so we can calculate the distance from the camera.
	// get the distance from the camera to the point.
"	float d = length(vec3(viewMatrix * v));" + 

	// the points will attenuate depending on the attenuation factors and 
	// the distance from the camera.
"	gl_PointSize = 1.0/(attenuation[0] + (attenuation[1] * d) + (attenuation[2] * d * d));" +
"	gl_FrontColor = vec4(Color, 1.0); " +
"	gl_Position = modelViewProjMatrix * v;" +

"}";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.point_fs = 

"void main(void){ " + 
"	gl_FragColor = gl_Color;" +
"}";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.point_sphere_vs = 

"attribute vec3 Vertex;" +
 
"uniform vec3 Color;" + 
"uniform mat4 modelViewProjMatrix;" +

"void main(void){" + 
"	gl_FrontColor = vec4(Color, 1.0); " +
"	gl_Position = modelViewProjMatrix * vec4(Vertex, 1.0);" +
"}";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.point_sphere_fs = 

"void main(void){ " + 
"	gl_FragColor = gl_Color;" +
"}";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.line_vs = 

"attribute vec3 Vertex;" + 
"attribute vec3 Color;" + 

"uniform mat4 modelViewProjMatrix;" +

"void main(void)" +
"{" +
"  gl_FrontColor = vec4(Color,1.0);" +
"  gl_Position = modelViewProjMatrix * vec4(Vertex, 1.0);" + 
"}";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.line_fs = 
"void main(void){ " + 
"  gl_FragColor = gl_Color;" +
"}";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.bounding_sphere_vs =

"attribute vec3 Vertex;" +

// calculate once in JS code instead of once per vertex.
"uniform mat4 modelViewProjMatrix;" +

"void main(void){" + 
"  gl_FrontColor = vec4(0.0, 0.0, 0.0, 1.0);" + 
"  gl_Position =  modelViewProjMatrix * vec4(Vertex, 1.0);" + "}";/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.bounding_sphere_fs =
"void main(void) {" +
"  gl_FragColor = gl_Color;" +
"}";/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.greyscale_vs =   

"attribute vec3 Vertex;" + 
"attribute vec3 Normal;" + 
"attribute vec3 Texture;" + 

// for every model we multiply the projection, view and model matrices
// once to prevent having to do it for every vertex, however we still need
// the view matrix to calculate lighting.
"uniform mat4 modelViewMatrix;" +

// we can calculate this once per model to speed up processing done on the js side.
"uniform mat4 modelViewProjMatrix;" +

// matrix to transform the vertex normals
"uniform mat4 normalMatrix;" + 


"void main(void){" + 

	// create a normal matrix 3x3 out of 4x4
"	mat3 normalMatrix3x3 = mat3(normalMatrix[0][0],normalMatrix[0][1],normalMatrix[0][2]," +
"								normalMatrix[1][0],normalMatrix[1][1],normalMatrix[1][2]," +
"								normalMatrix[2][0],normalMatrix[2][1],normalMatrix[2][2]);" + 
"	vec3 transformNormal = normalize(normalMatrix3x3 * Normal);" + 

//
"	vec3 ambient  = vec3(0.0, 0.0, 0.0);" + 
"	vec3 diffuse  = vec3(0.0, 0.0, 0.0);" + 
"	vec3 specular = vec3(0.0, 0.0, 0.0);" +

	// place the current vertex into view space
	// ecPos = eye coordinate position.
"	vec4 ecPos4 = modelViewMatrix * vec4(Vertex,1.0);" +

	// the current vertex in eye coordinate space
	// perspective divide
"	vec3 ecPos = (vec3(ecPos4))/ecPos4.w;" +

"	vec3 eye = vec3(0.0, 0.0, 1.0);" +
//"	eye = -normalize(ecPos);" +


"	float shine = 1.0;" +
"	if(usingMaterial)" +
"	{" +
"		shine = material.shininess;" +
"	}" +

"	if(lightingOn == true)" +
"	{" +
		// iterate over all the lights, and keep incrementing color values
		// the color values are passed by reference and modified.
"		for(int i = 0; i < C3DL_MAX_LIGHTS; i++)" +
"		{" +
"			if(lights[i].isOn) " +
"			{" +
"				if(lights[i].type == 1)" +
"				{" +
"					c3dl_DirectionalLight(lights[i], transformNormal, ambient, diffuse, specular, shine);" +
"				}" +

"				else if(lights[i].type == 2) " +
"				{" +
"					c3dl_PointLight(lights[i], transformNormal, eye, ecPos, ambient, diffuse, specular, shine);" +
"				}" +

"				else if(lights[i].type == 3)" +
"				{" +
"					c3dl_SpotLight(lights[i], transformNormal, eye, ecPos, ambient, diffuse, specular,shine);" +
"				}" +
"			}" +
"		}" +
"	}" +

"	if( usingMaterial ){" +
"		gl_FrontColor =	vec4(material.emission +				" +
"							ambientLightColor +					" +
"							ambient * material.ambient +		" +
"							diffuse * material.diffuse +		" +
"							specular * material.specular,1.0);	" +
"	}" +
"	else{" +
"		gl_FrontColor = vec4(ambientLightColor + ambient + diffuse + specular,1.0);" +
"	}" +

"	gl_Position =  modelViewProjMatrix * vec4(Vertex, 1.0);" +
"	gl_TexCoord[0] = vec4(Texture,1.0);" + 
"}";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.greyscale_fs = 

"uniform sampler2D myTex;" + 
"uniform int usingTexture;" + 
"uniform vec3 color;" +

"void main(void) {" + 
//"	if(gl_FrontFacing == false){discard;}" +
"	vec4 col = gl_Color;" +

	// if the current object being rendered has a texture, use the texel which has the 
	// texture color.  Otherwise we only take the gl_Color into account.
"	if( usingTexture == 1 ){" +

"		vec3 texel = vec3(texture2D(myTex, gl_TexCoord[0].xy));" +
"		col *= vec4(texel,1.0);" + 

"	}" + 

"	float grey = dot(col.rgb, color);" +
"	gl_FragColor = vec4(grey,grey,grey, 1.0);" +
"}";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @private
 */
c3dl.greyscale_callback = function (renderingObj)
{
  //
  var progObjID = renderingObj.getProgramObjectID();
  var renderer = renderingObj.getRenderer();
  var geometry = renderingObj.getGeometry();
  var gl = renderingObj.getContext();
  var effect = geometry.getEffect();

  gl.useProgram(progObjID);
  renderer.setUniformf(progObjID, "color", effect.getParameter("color"));

  var modelViewMatrix = c3dl.peekMatrix();
  c3dl.matrixMode(c3dl.PROJECTION);
  var projectionMatrix = c3dl.peekMatrix();
  c3dl.matrixMode(c3dl.MODELVIEW);

  // create a ModelViewProjection matrix.  By doing this, we can multiply
  // 3 matrices together once per model instead of once per vertex
  var modelViewProjMatrix = c3dl.multiplyMatrixByMatrix(projectionMatrix, modelViewMatrix);
  renderer.setUniformMatrix(progObjID, "modelViewMatrix", modelViewMatrix);
  renderer.setUniformMatrix(progObjID, "modelViewProjMatrix", modelViewProjMatrix);

  // render all the collation elements. Every collation element in an object will 
  // have the same tranformation
  for (var coll = 0; coll < geometry.getPrimitiveSets().length; coll++)
  {
    var currColl = geometry.getPrimitiveSets()[coll];

    // MATERIAL
    var mat = currColl.getMaterial();

    if (mat)
    {
      // every primitive collection can have a material associated with it.
      // currColl.material.getEmission()
      renderer.setUniformf(progObjID, "material.emission", mat.getEmission());
      renderer.setUniformf(progObjID, "material.ambient", mat.getAmbient());
      renderer.setUniformf(progObjID, "material.diffuse", mat.getDiffuse());
      renderer.setUniformf(progObjID, "material.specular", mat.getSpecular());
      renderer.setUniformf(progObjID, "material.shininess", mat.getShininess());
      renderer.setUniformi(progObjID, "usingMaterial", true);
    }
    else
    {
      renderer.setUniformi(progObjID, "usingMaterial", false);
    }

    // NORMAL
    var normalAttribLoc = gl.getAttribLocation(progObjID, "Normal");

    // if the object acutally has normals and the normal attribute was found
    //			
    if (currColl.getNormals())
    {
      // the top matrix is the modelview matrix.
      var NormalMatrix = c3dl.inverseMatrix(modelViewMatrix);
      NormalMatrix = c3dl.transposeMatrix(NormalMatrix);
      renderer.setUniformMatrix(progObjID, "normalMatrix", NormalMatrix);
      renderer.setVertexAttribArray(progObjID, "Normal", 3, currColl.getVBONormals());
    }
    else
    {
      gl.disableVertexAttribArray(normalAttribLoc);
    }

    // TEXTURE
    var usingTexture = false;

    var texAttribLoc = gl.getAttribLocation(progObjID, "Texture");

    //
    var texID = renderer.getTextureID(currColl.getTexture());

    // if the texture isn't loaded, but this collation element has one, 
    // queue one up
    if (texID == -1 && currColl.getTexture())
    {
      renderer.addTexture(currColl.getTexture());
    }

    // The following must be fixed: If a collada object was specified as having
    // a texture, but the texture file isn't found, the object will be textured.
    // However, this following condition will run, because the object 'thinks'
    // it has a texture.  the result is the object will not get lit and will
    // appear completely black.  We need to insert another condition which
    // states if the texture is actually present, this should run...
    if (texID != -1 && currColl.getTexture() && currColl.getTexCoords() && texAttribLoc != -1)
    {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texID);

      //gl.vertexAttribPointer(texAttribLoc, 2, gl.FLOAT, false, 0, currColl.getTexCoords());
      //gl.enableVertexAttribArray(texAttribLoc);	
      renderer.setVertexAttribArray(progObjID, "Texture", 2, currColl.getVBOTexCoords());
      usingTexture = true;
    }
    else
    {
      //gl.activeTexture(gl.TEXTURE0);
      gl.disableVertexAttribArray(texAttribLoc);
      //gl.bindTexture(gl.TEXTURE_2D,-1);
    }

    // tell the fragment shader if we are using textures or not
    renderer.setUniformi(progObjID, "usingTexture", usingTexture);

    // Vertices
    renderer.setVertexAttribArray(progObjID, "Vertex", 3, currColl.getVBOVertices());
    gl.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length / 3);
  }
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.sepia_vs =   

"attribute vec3 Vertex;" + 
"attribute vec3 Normal;" + 
"attribute vec3 Texture;" + 

// for every model we multiply the projection, view and model matrices
// once to prevent having to do it for every vertex, however we still need
// the view matrix to calculate lighting.
"uniform mat4 modelViewMatrix;" +

// we can calculate this once per model to speed up processing done on the js side.
"uniform mat4 modelViewProjMatrix;" +

// matrix to transform the vertex normals
"uniform mat4 normalMatrix;" + 


"void main(void){" + 

	// create a normal matrix 3x3 out of 4x4
"	mat3 normalMatrix3x3 = mat3(normalMatrix[0][0],normalMatrix[0][1],normalMatrix[0][2]," +
"								normalMatrix[1][0],normalMatrix[1][1],normalMatrix[1][2]," +
"								normalMatrix[2][0],normalMatrix[2][1],normalMatrix[2][2]);" + 
"	vec3 transformNormal = normalize(normalMatrix3x3 * Normal);" + 

//
"	vec3 ambient  = vec3(0.0, 0.0, 0.0);" + 
"	vec3 diffuse  = vec3(0.0, 0.0, 0.0);" + 
"	vec3 specular = vec3(0.0, 0.0, 0.0);" +

	// place the current vertex into view space
	// ecPos = eye coordinate position.
"	vec4 ecPos4 = modelViewMatrix * vec4(Vertex,1.0);" +

	// the current vertex in eye coordinate space
	// perspective divide
"	vec3 ecPos = (vec3(ecPos4))/ecPos4.w;" +

"	vec3 eye = vec3(0.0, 0.0, 1.0);" +

"	float shine = 1.0;" +
"	if(usingMaterial)" +
"	{" +
"		shine = material.shininess;" +
"	}" +

"	if(lightingOn)" +
"	{" +
		// iterate over all the lights, and keep incrementing color values
		// the color values are passed by reference and modified.
"		for(int i = 0; i < C3DL_MAX_LIGHTS; i++)" +
"		{" +
"			if(lights[i].isOn) " +
"			{" +
"				if(lights[i].type == 1)" +
"				{" +
"					c3dl_DirectionalLight(lights[i], transformNormal, ambient, diffuse, specular, shine);" +
"				}" +

"				else if(lights[i].type == 2) " +
"				{" +
"					c3dl_PointLight(lights[i], transformNormal, eye, ecPos, ambient, diffuse, specular, shine);" +
"				}" +

"				else if(lights[i].type == 3)" +
"				{" +
"					c3dl_SpotLight(lights[i], transformNormal, eye, ecPos, ambient, diffuse, specular, shine);" +
"				}" +
"			}" +
"		}" +
"	}" +

"	if( usingMaterial ){" +
"		gl_FrontColor =	vec4(material.emission +				" +
"							ambientLightColor +					" +
"							ambient * material.ambient +		" +
"							diffuse * material.diffuse +		" +
"							specular * material.specular,1.0);	" +
"	}" +
"	else{" +
"		gl_FrontColor = vec4(ambientLightColor + ambient + diffuse + specular,1.0);" +
"	}" +

"	gl_Position =  modelViewProjMatrix * vec4(Vertex, 1.0);" +
"	gl_TexCoord[0] = vec4(Texture,1.0);" + 
"}";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.sepia_fs = 

"uniform sampler2D myTex;" + 
"uniform int usingTexture;" +
"uniform vec3 color;" +

"void main(void) {" + 
//"	if(gl_FrontFacing == false){discard;}" +
"	vec4 col = gl_Color;" +

	// if the current object being rendered has a texture, use the texel which has the 
	// texture color.  Otherwise we only take the gl_Color into account.
"	if( usingTexture == 1 ){" +

"		vec3 texel = vec3(texture2D(myTex, gl_TexCoord[0].xy));" +
"		col *= vec4(texel,1.0);" + 

"	}" + 

"	float grey = dot(col.rgb, vec3(0.3, 0.6, 0.1));" +
"	gl_FragColor = vec4(grey * color, 1.0);" +
"}";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @private
 */
c3dl.sepia_callback = function (renderingObj)
{
  var progObjID = renderingObj.getProgramObjectID();
  var renderer = renderingObj.getRenderer();
  var geometry = renderingObj.getGeometry();
  var gl = renderingObj.getContext();
  var effect = geometry.getEffect();

  gl.useProgram(progObjID);

  renderer.setUniformf(progObjID, "color", effect.getParameter("color"));

  var modelViewMatrix = c3dl.peekMatrix();
  c3dl.matrixMode(c3dl.PROJECTION);
  var projectionMatrix = c3dl.peekMatrix();
  c3dl.matrixMode(c3dl.MODELVIEW);

  // create a ModelViewProjection matrix.  By doing this, we can multiply
  // 3 matrices together once per model instead of once per vertex
  var modelViewProjMatrix = c3dl.multiplyMatrixByMatrix(projectionMatrix, modelViewMatrix);
  renderer.setUniformMatrix(progObjID, "modelViewMatrix", modelViewMatrix);
  renderer.setUniformMatrix(progObjID, "modelViewProjMatrix", modelViewProjMatrix);

  // render all the collation elements. Every collation element in an object will 
  // have the same tranformation
  for (var coll = 0; coll < geometry.getPrimitiveSets().length; coll++)
  {
    var currColl = geometry.getPrimitiveSets()[coll];

    // MATERIAL
    var mat = currColl.getMaterial();

    if (mat)
    {
      // every primitive collection can have a material associated with it.
      // currColl.material.getEmission()
      renderer.setUniformf(progObjID, "material.emission", mat.getEmission());
      renderer.setUniformf(progObjID, "material.ambient", mat.getAmbient());
      renderer.setUniformf(progObjID, "material.diffuse", mat.getDiffuse());
      renderer.setUniformf(progObjID, "material.specular", mat.getSpecular());
      renderer.setUniformf(progObjID, "material.shininess", mat.getShininess());
      renderer.setUniformi(progObjID, "usingMaterial", true);
    }
    else
    {
      renderer.setUniformi(progObjID, "usingMaterial", false);
    }

    // NORMAL
    var normalAttribLoc = gl.getAttribLocation(progObjID, "Normal");

    // if the object acutally has normals and the normal attribute was found
    //			
    if (currColl.getNormals())
    {
      // the top matrix is the modelview matrix.
      var NormalMatrix = c3dl.inverseMatrix(modelViewMatrix);
      NormalMatrix = c3dl.transposeMatrix(NormalMatrix);
      renderer.setUniformMatrix(progObjID, "normalMatrix", NormalMatrix);
      renderer.setVertexAttribArray(progObjID, "Normal", 3, currColl.getVBONormals());
    }
    else
    {
      gl.disableVertexAttribArray(normalAttribLoc);
    }

    // TEXTURE
    var usingTexture = false;

    var texAttribLoc = gl.getAttribLocation(progObjID, "Texture");

    //
    var texID = renderer.getTextureID(currColl.getTexture());

    // if the texture isn't loaded, but this collation element has one, 
    // queue one up
    if (texID == -1 && currColl.getTexture())
    {
      renderer.addTexture(currColl.getTexture());
    }

    // The following must be fixed: If a collada object was specified as having
    // a texture, but the texture file isn't found, the object will be textured.
    // However, this following condition will run, because the object 'thinks'
    // it has a texture.  the result is the object will not get lit and will
    // appear completely black.  We need to insert another condition which
    // states if the texture is actually present, this should run...
    if (texID != -1 && currColl.getTexture() && currColl.getTexCoords() && texAttribLoc != -1)
    {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texID);
      renderer.setVertexAttribArray(progObjID, "Texture", 2, currColl.getVBOTexCoords());
      usingTexture = true;
    }
    else
    {
      //glCanvas3D.activeTexture(gl.TEXTURE0);
      gl.disableVertexAttribArray(texAttribLoc);
      //gl.bindTexture(gl.TEXTURE_2D,-1);
    }

    // tell the fragment shader if we are using textures or not
    renderer.setUniformi(progObjID, "usingTexture", usingTexture);

    // Vertices
    renderer.setVertexAttribArray(progObjID, "Vertex", 3, currColl.getVBOVertices());
    gl.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length / 3);
  }
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.cartoon_vs =   

"attribute vec3 Vertex;" + 
"attribute vec3 Normal;" + 
"attribute vec3 Texture;" + 

"varying vec3 norm;" +
"varying vec3 pos;" +

// for every model we multiply the projection, view and model matrices
// once to prevent having to do it for every vertex, however we still need
// the model and view matrices to calculate lighting.
"uniform mat4 modelViewMatrix;" +

// we can calculate this once per model to speed up processing done on the js side.
"uniform mat4 modelViewProjMatrix;" +

// matrix to transform the vertex normals
"uniform mat4 normalMatrix;" + 

/*

*/
"void main(void)" +
"{" + 

	// create a normal matrix 3x3 out of 4x4
"  mat3 normalMatrix3x3 = mat3(normalMatrix[0][0],normalMatrix[0][1],normalMatrix[0][2],normalMatrix[1][0],normalMatrix[1][1],normalMatrix[1][2],normalMatrix[2][0],normalMatrix[2][1],normalMatrix[2][2]);" + 
"  norm = normalize(normalMatrix3x3 * Normal);" + 

"  gl_Position =  modelViewProjMatrix * vec4(Vertex, 1.0);" +
"  pos = vec3( modelViewMatrix * vec4(Vertex,1.0));" +

"  gl_TexCoord[0] = vec4(Texture,1.0);" + 
"}";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.cartoon_fs = 

"uniform sampler2D myTex;" + 
"uniform sampler2D celShadeTex;" + 

"uniform int usingTexture;" +

"varying vec3 norm;" +
"varying vec3 pos;" +

/*
	light
	fragPos
	normal
	intensity
*/
"void c3dl_celPointLight(in Light light, in vec3 fragPos, in vec3 normal, inout float intensity)"+
"{" +
"  vec3 rayDir = vec3(light.position) - fragPos;" +
"  intensity += max(dot(normalize(rayDir),normal),0.0);" +
"}" +

/*
	light
	normal
	intensity
*/
"void c3dl_celDirLight(in Light light, in vec3 normal, inout float intensity)"+
"{" +
"  intensity += max(dot(normalize(vec3(-light.position)),normal), 0.0);" +
"}" +

/*
	light
	fragPos
	normal
	intensity
*/
"void c3dl_celSpotLight(in Light light, in vec3 fragPos, in vec3 normal, inout float intensity)" +
"{" +

	// ray direction goes from light position to fragment.
"  vec3 rayDir = fragPos - vec3(light.position);" +
"  rayDir = normalize(rayDir);" +
"  float spotDot = dot(rayDir, normalize(light.spotDirection));" +

	// if the fragment is within the cone
	// don't light up the back side of the object
"  if( dot(-normal, rayDir ) > 0.0 && spotDot > cos(radians(light.spotCutoff)) )" +
"  {" +
"    intensity += max(dot(-normal, rayDir), 0.0);" +
"  }" +
"}" +

/*
*/
"void main(void)" +
"{" + 

"  if(lightingOn == false)" +
"  {" +
"    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);" +
"  }" +
"  else" +
"  {" +
"    vec3 n = normalize(norm);" +
"    vec4 color = vec4(1.0, 1.0, 1.0, 1.0);" +

"    if( usingTexture == 1 )" +
"    {" +
"      vec3 texel = vec3(texture2D(myTex, gl_TexCoord[0].xy));" +
"      color = vec4(texel,1.0);" + 
"    }" + 

"    float intensity = 0.0;" +

     // iterate over all the lights, and keep incrementing color values
     // the color values are passed by reference and modified.
"    for(int i = 0; i < C3DL_MAX_LIGHTS; i++)" +
"    {" +
"      if(lights[i].isOn == true) " +
"      {" +
"        if(lights[i].type == 1)" +
"        {" +
"          c3dl_celDirLight(lights[i], n, intensity);" +
"        }" +

"       else if(lights[i].type == 2)" +
"       {" +
"         c3dl_celPointLight(lights[i], pos, n, intensity);" +
"       }" +

"       else" + 
"       {" +
"         c3dl_celSpotLight(lights[i], pos, n, intensity);" +
"       }" +
"     }" +
"   }" +

     // The texture wrapping wasn't set, so make sure 
     // we don't sample a wrong value.
"    intensity = clamp(intensity, 0.1, 0.9);" +

"    vec3 celTexel = vec3(texture2D(celShadeTex, vec2(intensity, 0.0)));" +
"    gl_FragColor = color * vec4(celTexel, 1.0);" +
"  }" +
"}";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/


/*
*/
c3dl.cartoon_callback = function (renderingObj)
{
  var renderer = renderingObj.getRenderer();
  var gl = renderingObj.getContext();
  var geometry = renderingObj.getGeometry();
  var effect = geometry.getEffect();
  var programObjID = renderingObj.getProgramObjectID();

  gl.useProgram(programObjID);

  if (effect.getParameter("qMap") == null)
  {
    c3dl.debug.logWarning('"qMap" is a required parameter for c3dl.effects.CARTOON');
    return;
  }

  var modelViewMatrix = c3dl.peekMatrix();
  c3dl.matrixMode(c3dl.PROJECTION);
  var projectionMatrix = c3dl.peekMatrix();
  c3dl.matrixMode(c3dl.MODELVIEW);

  // create a ModelViewProjection matrix.  By doing this, we can multiply
  // 3 matrices together once per model instead of once per vertex
  var modelViewProjMatrix = c3dl.multiplyMatrixByMatrix(projectionMatrix, modelViewMatrix);
  renderer.setUniformMatrix(programObjID, "modelViewMatrix", modelViewMatrix);
  renderer.setUniformMatrix(programObjID, "modelViewProjMatrix", modelViewProjMatrix);

  // Commenting out until a fix is solved for the 2-object outline bug
  // Only render the outline, which is a single pixel thick if the user
  // wants it and the effect exists.
  if (effect.getParameter("outline") == true && renderer.SOLID_COLOR_EFFECT_ID)
  {
    gl.enable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(2.0, 2.0);

    // use the solid color effect since it's fast and we don't have
    // to send unnecessary data.
    var outlineProgID = renderer.SOLID_COLOR_EFFECT_ID;

    gl.enable(gl.CULL_FACES);
    gl.cullFace(gl.FRONT);
    gl.useProgram(outlineProgID);
    renderer.setUniformf(outlineProgID, "color", [0, 0, 0]);

    var modelViewMatrix = c3dl.peekMatrix();
    c3dl.matrixMode(c3dl.PROJECTION);
    var projectionMatrix = c3dl.peekMatrix();
    c3dl.matrixMode(c3dl.MODELVIEW);

    var MVPMatrix = c3dl.multiplyMatrixByMatrix(projectionMatrix, modelViewMatrix);
    renderer.setUniformMatrix(outlineProgID, "modelViewProjMatrix", MVPMatrix);

    var contextWidth = renderer.getContextWidth();
    var contextHeight = renderer.getContextHeight();

    for (var primSet = 0; primSet < geometry.getPrimitiveSets().length; primSet++)
    {
      var currColl = geometry.getPrimitiveSets()[primSet];

      // Prevent C3DL from reporting an error, so check if attrib exsits
      // before trying to set it.
      // This is  a kludge for Safari and Chrome since they want these attributes
      ////////////////////////////
      var normalAttribLoc = gl.getAttribLocation(outlineProgID, "Normal");
      if (normalAttribLoc != -1 && currColl.getNormals())
      {
        renderer.setVertexAttribArray(outlineProgID, "Normal", 3, currColl.getVBONormals());
      }
      var texAttribLoc = gl.getAttribLocation(outlineProgID, "Texture");
      if (texAttribLoc != -1 && currColl.getTexCoords())
      {
        renderer.setVertexAttribArray(outlineProgID, "Texture", 2, currColl.getVBOTexCoords());
      }
      ////////////////////////// End kludge
      renderer.setVertexAttribArray(outlineProgID, "Vertex", 3, currColl.getVBOVertices());

      gl.viewport(1, -1, contextWidth, contextHeight);
      gl.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length / 3);

      gl.viewport(-1, -1, contextWidth, contextHeight);
      gl.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length / 3);

      gl.viewport(-1, 1, contextWidth, contextHeight);
      gl.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length / 3);

      gl.viewport(1, 1, contextWidth, contextHeight);
      gl.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length / 3);
    }

    // restore normal backface culling
    gl.cullFace(gl.BACK);
    gl.viewport(0, 0, contextWidth, contextHeight);
    gl.disable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(0.0, 0.0);
    gl.useProgram(programObjID);
  }

  renderer.setUniformi(programObjID, "lightingOn", true);
  // render all the collation elements. Every collation element in an object will 
  // have the same tranformation
  for (var coll = 0; coll < geometry.getPrimitiveSets().length; coll++)
  {
    var currColl = geometry.getPrimitiveSets()[coll];
    var normalAttribLoc = gl.getAttribLocation(programObjID, "Normal");

    // if the object acutally has normals and the normal attribute was found
    // NORMALS	
    if (currColl.getNormals())
    {
      // the top matrix is the modelview matrix.
      var NormalMatrix = c3dl.inverseMatrix(modelViewMatrix);
      NormalMatrix = c3dl.transposeMatrix(NormalMatrix);
      renderer.setUniformMatrix(programObjID, "normalMatrix", NormalMatrix);
      renderer.setVertexAttribArray(programObjID, "Normal", 3, currColl.getVBONormals());
    }
    else
    {
      gl.disableVertexAttribArray(normalAttribLoc);
    }

    // TEXTURE
    var texAttribLoc = gl.getAttribLocation(programObjID, "Texture");
    var texID = renderer.getTextureID(currColl.getTexture());

    // if the texture isn't loaded, but this collation element has one, 
    // queue one up
    if (texID == -1 && currColl.getTexture())
    {
      renderer.addTexture(currColl.getTexture());
    }

    if (texID != -1 && currColl.getTexture() && currColl.getTexCoords() && texAttribLoc != -1)
    {
      // make texture unit 0 active
      gl.activeTexture(gl.TEXTURE0);

      // bind the collations texture object to texture unit 0 and make it active.
      gl.bindTexture(gl.TEXTURE_2D, texID);

      renderer.setVertexAttribArray(programObjID, "Texture", 2, currColl.getVBOTexCoords());
      renderer.setUniformi(programObjID, "myTex", 0);
      renderer.setUniformi(programObjID, "usingTexture", true);
    }
    else
    {
      gl.disableVertexAttribArray(texAttribLoc);
      renderer.setUniformi(programObjID, "usingTexture", false);
    }

    // Quantization Map
    var qMap = effect.getParameter("qMap");
    shadesTexID = renderer.getTextureID(qMap);

    // if the user added the parameter, but didn't add the texture
    // to the renderer with renderer.addTexture.
    if (shadesTexID == -1)
    {
      renderer.addTexture(qMap);
    }

    gl.activeTexture(gl.TEXTURE1);

    // Minefield is throwing an exception here, but still running?
    gl.bindTexture(gl.TEXTURE_2D, shadesTexID);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    renderer.setUniformi(programObjID, "celShadeTex", 1);

    // VERTICES
    renderer.setVertexAttribArray(programObjID, "Vertex", 3, currColl.getVBOVertices());
    gl.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length / 3);
  }
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.gooch_vs =

"varying vec3 ViewVec;" +
"varying vec3 ecPos;" +
"varying vec3 tnorm;" +

"attribute vec3 Vertex;" + 
"attribute vec3 Normal;" + 
"attribute vec3 dummyAttrib;" +

"uniform mat4 modelViewMatrix;" +
"uniform mat4 modelViewProjMatrix;" +
"uniform mat4 normalMatrix;" + 

"void main(void){" + 

// Dummy attrib so safari and chrome render
// this object properly.
" vec3 dummy = dummyAttrib;" +

"	mat3 normalMatrix3x3 = mat3(normalMatrix[0][0],normalMatrix[0][1],normalMatrix[0][2],normalMatrix[1][0],normalMatrix[1][1],normalMatrix[1][2],normalMatrix[2][0],normalMatrix[2][1],normalMatrix[2][2]);" + 

	// ecPos = vertex in eye coordinate space.
"	ecPos = vec3(modelViewMatrix * vec4(Vertex,1.0));" +
"	tnorm = normalize(normalMatrix3x3 * Normal);" + 

	// a normalized vector pointing from the vector to the light

"	ViewVec = normalize(-ecPos);" +

"	gl_Position =  modelViewProjMatrix * vec4(Vertex, 1.0);" +
"	gl_FrontColor = vec4(0.0, 0.0, 1.0, 1.0); "+
"}";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.gooch_fs = 


"float DiffuseWarm = 0.5;" +
"float DiffuseCool = 0.5; " +

// parameters
"uniform vec3 surfaceColor;" +
"uniform vec3 warmColor;" +
"uniform vec3 coolColor;" +

"varying vec3 ViewVec; " +
"varying vec3 ecPos; "+
"varying vec3 tnorm;" +

/*
	Light light [in]
	vec3 nviewVec [in]
	vec3 ntnorm [in]
	float spec [inout]
	float NdotL [inout]
*/
"void c3dl_goochPointLight(in Light light, in vec3 nviewVec, in vec3 ntnorm, inout float NdotL, inout float spec)" +
"{" +
	// lightVec = dir of light
"	vec3 lightVec = normalize(vec3(light.position) - ecPos);" +
"	vec3 ReflectVec = normalize(reflect(lightVec, ntnorm));" +
"	NdotL = (dot(lightVec, ntnorm) + 1.0) * 0.5;" +

"	spec += max(dot(ReflectVec, -nviewVec), 0.0);" +

"}" +

/*
	light
	nviewVec
	ntnorm
	NdotL
	spec
*/
"void c3dl_goochDirLight(in Light light, in vec3 nviewVec, in vec3 ntnorm,  inout float NdotL, inout float spec)" +
"{"+
	// when the user specifies the the direction of the light, they are
	// specifying the direction the light is going towards.
"	vec3 lightVec = vec3(-light.position);" +

	// calculate how intense the light is. 
	// NdotL is added for each light.
"	NdotL = (dot(lightVec, ntnorm) + 1.0) * 0.5;" +
"	vec3 ReflectVec = normalize(reflect(lightVec, ntnorm));" +
"	spec += max(dot(ReflectVec, -nviewVec), 0.0);" +

"}"+

/*
*/
"void main(void) {" + 

"	vec3 kcool = min(coolColor + DiffuseCool * surfaceColor, 1.0);"+
"	vec3 kwarm = min(warmColor + DiffuseWarm * surfaceColor, 1.0);" +

"	vec3 nviewVec = normalize(ViewVec);" +
"	vec3 ntnorm = normalize(tnorm);" +

"	float NdotL = 0.0;" +	
"	float spec = 0.0;" +

	// Gooch effects should only have one light so the contour of the object
	// is properly rendered. So, only accept the first active light as the light
	// source.
"	bool appliedLight = false;" +

"	if(lightingOn == true)" +
"	{" +
"		for(int i = 0; appliedLight == false && i < C3DL_MAX_LIGHTS; i++) " +
"		{" +
"			if( lights[i].isOn == true)" +
"			{" +
"				if(lights[i].type == 1)" +
"				{" +
"					c3dl_goochDirLight(lights[i], nviewVec, ntnorm, NdotL, spec); "+
"					appliedLight = true;" +
"				}" +
"				else" +
"				{" +
"					c3dl_goochPointLight(lights[i], nviewVec, ntnorm, NdotL, spec); "+
"					appliedLight = true;" +
"				}" +
"			}" +
"		}"+
"	}" +

"	NdotL = clamp(NdotL, 0.0, 1.0);"+
"	vec3 kfinal = mix(kcool, kwarm, NdotL);" +	
"	spec = pow(spec,16.0);" +
"	gl_FragColor = vec4(min(kfinal + spec, 1.0), 1.0);" +
"}";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/*

*/
c3dl.gooch_callback = function (renderingObj)
{
  var renderer = renderingObj.getRenderer();
  var gl = renderingObj.getContext();
  var geometry = renderingObj.getGeometry();
  var effect = geometry.getEffect();
  var programObjID = renderingObj.getProgramObjectID();

  gl.useProgram(programObjID);

  var modelViewMatrix = c3dl.peekMatrix();
  c3dl.matrixMode(c3dl.PROJECTION);
  var projectionMatrix = c3dl.peekMatrix();
  c3dl.matrixMode(c3dl.MODELVIEW);

  var modelViewProjMatrix = c3dl.multiplyMatrixByMatrix(projectionMatrix, modelViewMatrix);
  renderer.setUniformMatrix(programObjID, "modelViewMatrix", modelViewMatrix);
  renderer.setUniformMatrix(programObjID, "modelViewProjMatrix", modelViewProjMatrix);

  // Commenting out until a fix is solved for the 2-object outline bug
  // Only render the outline, which is a single pixel thick if the user
  // wants it and the effect exists.
  if (effect.getParameter("outline") == true && renderer.SOLID_COLOR_EFFECT_ID)
  {
    gl.enable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(2.0, 2.0);

    // use the solid color effect since it's fast and we don't have
    // to send unnecessary data.
    var outlineProgID = renderer.SOLID_COLOR_EFFECT_ID;

    gl.enable(gl.CULL_FACES);
    gl.cullFace(gl.FRONT);
    gl.useProgram(outlineProgID);
    renderer.setUniformf(outlineProgID, "color", [0, 0, 0]);

    var modelViewMatrix = c3dl.peekMatrix();
    c3dl.matrixMode(c3dl.PROJECTION);
    var projectionMatrix = c3dl.peekMatrix();
    c3dl.matrixMode(c3dl.MODELVIEW);

    var MVPMatrix = c3dl.multiplyMatrixByMatrix(projectionMatrix, modelViewMatrix);
    renderer.setUniformMatrix(outlineProgID, "modelViewProjMatrix", MVPMatrix);

    var contextWidth = renderer.getContextWidth();
    var contextHeight = renderer.getContextHeight();

    for (var primSet = 0; primSet < geometry.getPrimitiveSets().length; primSet++)
    {
      var currColl = geometry.getPrimitiveSets()[primSet];

      // Prevent C3DL from reporting an error, so check if attrib exsits
      // before trying to set it.
      // This is  a kludge for Safari and Chrome since they want these attributes
      ////////////////////////////
      var normalAttribLoc = gl.getAttribLocation(outlineProgID, "Normal");
      if (normalAttribLoc != -1 && currColl.getNormals())
      {
        renderer.setVertexAttribArray(outlineProgID, "Normal", 3, currColl.getVBONormals());
      }
      var texAttribLoc = gl.getAttribLocation(outlineProgID, "Texture");
      if (texAttribLoc != -1 && currColl.getTexCoords())
      {
        renderer.setVertexAttribArray(outlineProgID, "Texture", 2, currColl.getVBOTexCoords());
      }
      ////////////////////////// End kludge
      renderer.setVertexAttribArray(outlineProgID, "Vertex", 3, currColl.getVBOVertices());

      gl.viewport(1, -1, contextWidth, contextHeight);
      gl.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length / 3);

      gl.viewport(-1, -1, contextWidth, contextHeight);
      gl.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length / 3);

      gl.viewport(-1, 1, contextWidth, contextHeight);
      gl.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length / 3);

      gl.viewport(1, 1, contextWidth, contextHeight);
      gl.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length / 3);
    }

    // restore normal backface culling
    gl.cullFace(gl.BACK);
    gl.viewport(0, 0, contextWidth, contextHeight);
    gl.disable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(0.0, 0.0);
  }

  gl.useProgram(programObjID);

  //renderer.setUniformi(programObjID, "lightingOn", true);
  // render all the collation elements. Every collation element in an object will
  // have the same tranformation
  for (var coll = 0; coll < geometry.getPrimitiveSets().length; coll++)
  {
    var currColl = geometry.getPrimitiveSets()[coll];

    var dummyAttribLoc = gl.getAttribLocation(programObjID, "dummyAttrib");
    if (dummyAttribLoc !== -1 && currColl.getNormals())
    {
      renderer.setVertexAttribArray(programObjID, "dummyAttrib", 3, currColl.getVBONormals());
    }

    var normalAttribLoc = gl.getAttribLocation(programObjID, "Normal");

    // if the object acutally has normals and the normal attribute was found
    //
    if (normalAttribLoc !== -1 && currColl.getNormals())
    {
      // the top matrix is the modelview matrix.
      var NormalMatrix = c3dl.inverseMatrix(modelViewMatrix);
      NormalMatrix = c3dl.transposeMatrix(NormalMatrix);
      renderer.setUniformMatrix(programObjID, "normalMatrix", NormalMatrix);

      renderer.setVertexAttribArray(programObjID, "Normal", 3, currColl.getVBONormals());
    }
    else
    {
      gl.disableVertexAttribArray(normalAttribLoc);
    }

    renderer.setUniformf(programObjID, "warmColor", effect.getParameter("warmColor"));
    renderer.setUniformf(programObjID, "coolColor", effect.getParameter("coolColor"));
    renderer.setUniformf(programObjID, "surfaceColor", effect.getParameter("surfaceColor"));
    renderer.setVertexAttribArray(programObjID, "Vertex", 3, currColl.getVBOVertices());
    gl.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length / 3);
  }
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.solid_color_vs =   

"attribute vec3 Vertex;" + 
"attribute vec3 Normal;" + 
"attribute vec3 Texture;" + 

// we can calculate this once per model to speed up processing done on the js side.
"uniform mat4 modelViewProjMatrix;" +
"uniform vec3 color;" +

"void main(void){" + 

// Assign so they aren't optimized out
"  vec3 dummy = Normal;" +
"	 gl_TexCoord[0] = vec4(Texture,1.0);" + 

"  gl_FrontColor = vec4(color,1.0);" +
"	 gl_Position =  modelViewProjMatrix * vec4(Vertex, 1.0);" +
"}";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.solid_color_fs = 

"void main(void) {" + 
"  gl_FragColor = gl_Color;" + 
"}";
/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @private
 */
c3dl.solid_color_callback = function (renderingObj)
{
  var progObjID = renderingObj.getProgramObjectID();
  var geometry = renderingObj.getGeometry();
  var effect = geometry.getEffect();
  var renderer = renderingObj.getRenderer();
  var glCanvas3D = renderingObj.getContext();

  glCanvas3D.useProgram(progObjID);

  var modelViewMatrix = c3dl.peekMatrix();
  c3dl.matrixMode(c3dl.PROJECTION);
  var projectionMatrix = c3dl.peekMatrix();
  c3dl.matrixMode(c3dl.MODELVIEW);

  // create a ModelViewProjection matrix.  By doing this, we can multiply
  // 3 matrices together once per model instead of once per vertex
  var modelViewProjMatrix = c3dl.multiplyMatrixByMatrix(projectionMatrix, modelViewMatrix);
  renderer.setUniformMatrix(progObjID, "modelViewProjMatrix", modelViewProjMatrix);
  renderer.setUniformf(progObjID, "color", effect.getParameter("color"));

  // render all the collation elements. Every collation element in an object will 
  // have the same tranformation
  for (var coll = 0; coll < geometry.getPrimitiveSets().length; coll++)
  {
    var currColl = geometry.getPrimitiveSets()[coll];

    // Prevent C3DL from reporting an error, so check if attrib exsits
    // before trying to set it.
    // This is  a kludge for Safari and Chrome since they want these attributes
    ////////////////////////////
    var normalAttribLoc = glCanvas3D.getAttribLocation(progObjID, "Normal");
    if (normalAttribLoc != -1 && currColl.getNormals())
    {
      renderer.setVertexAttribArray(progObjID, "Normal", 3, currColl.getVBONormals());
    }
    var texAttribLoc = glCanvas3D.getAttribLocation(progObjID, "Texture");
    if (texAttribLoc != -1 && currColl.getTexCoords())
    {
      renderer.setVertexAttribArray(progObjID, "Texture", 2, currColl.getVBOTexCoords());
    }
    ////////////////////////// End kludge

    // VERTICES
    renderer.setVertexAttribArray(progObjID, "Vertex", 3, currColl.getVBOVertices());
    glCanvas3D.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length / 3);
  }
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class 
 
 <p>An EffectTemplate is a template for creating many Effects which have
 similar rendering results. Effects instantiated from EffectTemplates 
 achieve different rendering results by changing the parameters of the
 EffectTemplate.</p>
 
 <p>Effects cannot instantiate EffectTemplates until the EffectTemplate has been
 initialized.  However, once initialized, the EffectTemplate can no longer be modified.
 This includes changing the callback, parameters, shaders, etc.</p>
 
 <p>When an effect is instantiated from an effect template, any parameters the effect template
 has which are do not have default values must be set before the object with the effect is rendered.</p>
 */
c3dl.EffectTemplate = function ()
{
  this.vertexShaders = [];
  this.fragmentShaders = [];
  this.isInitialized = false;

  // array of objects.
  this.params = [];
  this.renderingCB = null;

  //
  //
  this.programObjects = [];


  /**
   Call this once the vertex shader, fragment shader and rendering callback have been 
   set and all parameters have been created. Once the EffectTemplate has been initialized,
   neither the shaders, callback or parameters can be changed.
   
   @returns {bool} true if the EffectTemplate was initialized, false otherwise.
   */
  this.init = function ()
  {
    var rc = false;

    // can only be initialize once
    if (this.isInitialized == false)
    {
      // these variables had to be set, parameters variable
      // is optional.
      if (this.renderingCB && this.vertexShaders.length > 0 && this.fragmentShaders.length > 0)
      {
        this.isInitialized = true;
        rc = true;
      }
    }
    return rc;
  }

  /**
   Adds a fragment shader to the list of fragment shaders which need to be compiled.
   The fragment shader strings are literally added together, therefore the order
   which they are added is important. For example, if the material struct it used,
   the variable holding the material string code should be added before the light
   string code since the light code depends on material code.
   
   @param {String} fragmentShader
   */
  this.addFragmentShader = function (fragmentShader)
  {
    if (this.isInitialized == false)
    {
      if (fragmentShader && typeof(fragmentShader) == "string")
      {
        this.fragmentShaders.push(fragmentShader);
      }
      else
      {
        c3dl.debug.logWarning("Invalid argument passed to Effect's addFragmentShader().");
      }
    }
  }

  /**
   Add a parameter which and instance effect can modify. Parameters should be simple, built-in
   types such as Boolean, Number, Array etc. They should not be Objects created with {}.
   
   @param {String} paramName 
   @param paramType Constructor used to create the object such as Boolean, Number, Array, etc.
   @param paramDefaultValue The default value to be used if the user
   does not specify any value. If null, user will have to specify a value, 
   otherwise the object with this effect will not be rendered.
   */
  this.addParameter = function (paramName, paramType, paramDefaultValue)
  {
    if (this.isInitialized == false)
    {
      if (paramName && typeof(paramName) == "string")
      {
        var val;

        if (paramType == Array)
        {
          val = c3dl.copyObj(paramDefaultValue);
        }
        else
        {
          val = paramDefaultValue;
        }

        // Each parameter will be an object, so when copying is done
        // we can iterate the list by simply incrementing by one.
        this.params.push(
        {
          name: paramName,
          type: paramType,
          value: val
        });
      }
      else
      {
        c3dl.debug.logWarning("Invalid argument(s) passed to Effect's addParameter().");
      }
    }
    else
    {
      c3dl.debug.logWarning("Effect addParameter(): cannot be called once an effect has been initialized.");
    }
  }

  /**
   Adds a vertex shader to the list of vertex shaders which need to be compiled.
   The vertex shader strings are literally added together, therefore the order
   which they are added is important. For example, if the material struct it used,
   the variable holding the material string code should be added before the light
   string code since the light code depends on material code.
   
   @param {String} vertexShader
   */
  this.addVertexShader = function (vertexShader)
  {
    if (this.isInitialized == false)
    {
      if (vertexShader && typeof(vertexShader) == "string")
      {
        this.vertexShaders.push(vertexShader);
      }
      else
      {
        c3dl.debug.logWarning("Invalid argument passed to Effect's addVertexShader().");
      }
    }
  }

  /**
   @private
   Renderer will call this when it needs to compile the vertex shaders.
   
   @returns {String[]} vertex shaders.
   */
  this.getVertexShaders = function ()
  {
    return this.vertexShaders;
  }

  /**
   @private
   
   Get the array of all the parameters of this effect template.
   
   @returns {Array} array of objects.
   */
  this.getParameters = function ()
  {
    var ret = [];

    for (var i = 0, len = this.params.length; i < len; i++)
    {
      var val;

      if (typeof this.params[i].value == "Array")
      {
        val = c3dl.copyObj(this.params[i].value);
      }
      else
      {
        val = this.params[i].value;
      }

      ret.push(
      {
        name: this.params[i].name,
        type: this.params[i].type,
        value: val
      });
    }

    return ret;
  }

  /**
   @private
   
   Renderer will call this when it needs to compile the fragment shaders.
   
   @returns {String[]} fragment shaders
   */
  this.getFragmentShaders = function ()
  {
    return this.fragmentShaders;
  }

  /**
   Get the callback which is to be called when the
   geometric object with an effect created from this effect template is rendered.
   
   @returns {Function} The function which will render the geometric object
   with an effect created from this template effect.
   */
  this.getRenderingCallback = function ()
  {
    return this.renderingCB;
  }

  /**
   Set the rendering callback which will be called by the renderer when the
   object with this effect needs to be rendered. The renderer will pass a 
   renderingObject to the function which can be queried for context, renderer,
   effect, etc.
   
   @see c3dl.RenderingObject.
   
   @param {Function} func
   */
  this.setRenderingCallback = function (func)
  {
    if (this.isInitialized == false)
    {
      if (func instanceof Function)
      {
        this.renderingCB = func;
      }
      else
      {
        c3dl.debug.logWarning("Invalid argument passed to Effect's setRenderingCB().");
      }
    }
  }

  /**
   @private
   
   When the renderer compiles the shaders, it returns a program object id. Each
   renderer will have its own id for this particular effect.
   
   @returns {int} -1 if the rendererID was not found in the list
   */
  this.getProgramID = function (rendererID)
  {
    var programID = -1;
    var found = false;

    for (var i = 0, len = this.programObjects.length; found == false && i < len; i++)
    {
      if (found === false)
      {
        if (rendererID == this.programObjects[i].getRendererID())
        {
          found = true;
          programID = this.programObjects[i].getProgramID();
        }
      }
    }
    return programID;
  }

  /**
   @private
   
   @param {c3dl.ProgramObject} programObject
   */
  this.addProgramObject = function (programObject)
  {
    this.programObjects.push(programObject);
  }

  /**
   Get a string representation of this object.
   
   @param {String} [delimiter=","]  A string which will separate values.
   */
  this.toString = function (delimiter)
  {
    if (!delimiter && typeof(delimiter) != "string")
    {
      delimiter = ",";
    }

    return "Initialized = " + this.isInitialized + delimiter + "Vertex Shaders = " + 
      this.vertexShaders + delimiter + "Fragment Shaders = " + this.fragmentShaders + 
      delimiter + "Rendering Callback = " + this.renderingCB + delimiter + "Parameters = " + 
      this.parameters;
  }
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class c3dl.Effect specifies exactly how a geometric object should 
 be rendered. An Effect is an instantiation of an EffectTemplate, which 
 is a template for creating effects with similar results.
 
 <p>
 Effects are composed of a vertex shader, fragment shader and a rendering 
 callback. The shaders perform the transformation, lighting calculations
 and anything else necessary. The callback typically sets the uniform and 
 vertex attributes.
 </p>
 
 <p>
 When the library is told to render an object which has an effect, it will first call
 the rendering callback. This allows the user to do things such as toggle depth
 tests, set the uniform variables, or adjust any other rendering state variables
 required to perform the required rendering. The shader programs are then executed
 and the object is rendered.
 </p>
 
 <p>
 Some effect templates have already been written and using them requires minimal 
 effort.
 <code><pre>
 // c3dl.effects is a namespace which contains premade effects.
 var effect = new c3dl.Effect();
 effect.init(c3dl.effects.GOOCH);
 var teapot = c3dl.Collada();
 teapot.init('teapot.dae');
 // the effect's parameters were not set, so the default Gooch params
 // will be used.
 teapot.setEffect(effect);
 </pre></code>
 </p>
 
 <p>
 In the example above, none of the Gooch parameters were set, therefore
 the default Gooch parameters are used. However, not all effects have 
 default parameters and therefore some need to be set. Wheather an effect
 has default parameters is noted in c3dl.effects.
 </p>
 */
c3dl.Effect = function ()
{
  // the effect this object is instantiating.
  this.effectTemplate = null;

  // these can be changed from the default ones created by the effect template.
  this.instanceParams = [];

  // prevent the effect from being initialized more than once.
  this.isInitialized = false;

  /**
   Call this after the Effect has been created. Once the Effect has been
   created and initialized, its parameters can be set.
   
   @param {c3dl.EffectTemplate} effectTemplate
   */
  this.init = function (effectTemplate)
  {
    //c3dl.debug.logWarning(effectTemplate);
    var check = true;

    if (check || effectTemplate instanceof c3dl.EffectTemplate)
    {
      // keep a reference to the template as it holds the shaders
      // which will need to be compiled during rendering.
      this.effectTemplate = effectTemplate;

      // copy over the parameters which comprise of
      // names, types and default values.
      this.instanceParams = c3dl.copyObj(effectTemplate.getParameters());

      // prevent the Effect from being initialized more than once.
      this.isInitialized = true;
    }
    else
    {
      c3dl.debug.logWarning("Invalid argument passed to c3dl.Effect's init().");
    }
  }

  /**
   Get the EffectTemplate which was used to create this Effect.
   
   @returns {c3dl.EffectTemplate} the effect template which was used to
   create this effect.
   */
  this.getEffectTemplate = function ()
  {
    return this.effectTemplate;
  }

  /**
   Get the value of the parameter 'paramName'.
   
   @param {String} paramName
   
   @returns the value of 'paramName' or null if parameter does not exist or 
   has not been set.
   */
  this.getParameter = function (paramName)
  {
    var isFound = false;
    var returnVal = null;
    for (var i = 0, len = this.instanceParams.length; i < len; i++)
    {
      if (this.instanceParams[i].name == paramName)
      {
        isFound = true;
        returnVal = this.instanceParams[i].value;
      }
    }
    if (!isFound)
    {
      c3dl.debug.logWarning("Effect getParameter(): '" + paramName + "' does not exist.");
    }
    return returnVal;
  }

  /**
   Set the value of the parameter 'paramName' to 'paramvalue'.
   
   @param {String} paramName Name of the parameter to set.
   @param {} paramValue The value to set the parameter.
   
   If the value does not match the parameter's type, a warning will 
   be displayed and the parameter will not be set.
   */
  this.setParameter = function (paramName, paramValue)
  {
    // When the instance effect is initialized, all the default parameters from the effect
    // are copied to the instance effect and then they can be changed with setParameter.
    // Otherwise, there would be no place to store the values.
    if (this.isInitialized == false)
    {
      c3dl.debug.logWarning("Effect must be initialized with init() " + "before setting its parameters.");
    }
    else
    {
      var isFound = false;

      for (var i = 0, len = this.instanceParams.length; !isFound && i < len; i++)
      {
        if (paramName == this.instanceParams[i].name)
        {
          isFound = true;

          // check if the value matches the parameter's type
          if (paramValue.constructor == this.instanceParams[i].type)
          {
            this.instanceParams[i].value = paramValue;
          }
          else
          {
            // The value 'true' does not match parameter 'warmColor' type.
            // The value 'true' cannot be assigned to parameter 'warmColor'
            // because it is the incorrect type. Check the Effect documentation
            // for the correct type.
            c3dl.debug.logWarning("The value '" + paramValue + "' cannot be assigned " + "to parameter '" + paramName + "' because it is the " + "incorrect type. Check the c3dl.effects documentation " + " for the correct type.");
          }
        }
      }
      if (!isFound)
      {
        c3dl.debug.logWarning("Effect setParameter(): '" + paramName + "' does not exist.");
      }
    }
  }
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/


/**
 @class ParticleSystem is used to simulate phenomena such as fire, smoke, rain, etc.
 */
c3dl.ParticleSystem = function ()
{
  // particle uv's won't change so instead of keeping
  // a copy of uv coords in each particle, keep one copy
  // in the particle system.
  this.particleUVs = new C3DL_FLOAT_ARRAY([1, 1, //
                                       1, 0, //
                                       0, 0, //
                                       0, 1]); //
  // winding order of these verts is counter-clockwise, the same as models. This
  // prevents having to change the winding order state in WebGL when rendering.
  this.billboardVerts = new C3DL_FLOAT_ARRAY([1, -1, 0, // bottom right
                                          1,  1, 0, // top right
                                        - 1,  1, 0, // top left
                                        - 1, -1, 0]); // bottom left
  // this particle system's transformation matrix
  this.mat = new C3DL_FLOAT_ARRAY([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

  // list of the Particle objects.
  this.particles;

  // keep a count of the number of dead particles we have 
  // this turns some operations from O(n) to O(1).
  this.numDeadParticles;

  // every particle in this sytem will have the same texture
  this.texture;

  // velocity range of the particles.  When particles
  // are born they are assigned a range between these two
  // values.
  this.minVelocity = c3dl.makeVector(0, 0, 0);
  this.maxVelocity = c3dl.makeVector(0, 0, 0);

  this.maxAngVel = 0;
  this.minAngVel = 0;

  // lifetime range of the particles in seconds. Once the
  // age of a particle has surpassed its lifetime, the particle
  // is no longer updated and rendered.
  this.minLifetime = 0;
  this.maxLifetime = 0;

  // the color range of the particles. The color also contains an
  // alpha component.
  this.minColor = new C3DL_FLOAT_ARRAY([0, 0, 0, 0]);
  this.maxColor = new C3DL_FLOAT_ARRAY([0, 0, 0, 0]);

  //
  //
  this.minSize = 1;
  this.maxSize = 1;

  // acceleration is a property of the subsystem. Every
  // particle in the subsystem will share the same
  // acceleration.
  this.acceleration = new C3DL_FLOAT_ARRAY([0, 0, 0, 0]);

  // blend modes
  this.dstBlend = c3dl.ZERO;
  this.srcBlend = c3dl.ZERO;

  this.blendEq = c3dl.FUNC_ADD;

  // we need the camera vectors to create a billboard.
  // on each update, we check if our local values are the
  // same as the scene's camera. if the scene's camera 
  // was updated, we recalculate our billboard.
  this.camUp = c3dl.makeVector(0, 0, 0);
  this.camLeft = c3dl.makeVector(0, 0, 0);
  this.camDir = c3dl.makeVector(0, 0, 0);

  // if the particle system is playing then the particles are
  // updated and rendered. Otherwise they are
  this.isPlaying = false;

  // how many particles are emitted per second?
  this.emitRate = 0;

  // these are used to calculate how many particles to emit on update.
  this.timeCounter = 0;
  this.isTimeCounterSetup = false;

  // this will be passed to the renderer
  this.particleVerts = null;
  this.particleColors = null;
  this.particleTexCoords = null;

  // VBOS
  this.VBOVertices = null;
  this.VBOColors = null;
  this.VBOTexCoords = null;
  this.firstTimeRender = true;

  /**
   Emit a number of particles all at once. If the amount of particles 
   to emit exceeds the amount which are available, the last remaining
   particles are emitted.  If there are no particles available to emit,
   none are emitted.
   
   @param numToEmit
   */
  this.emit = function (numToEmit)
  {
    // only emit particles if the user passed in a valid number
    // and there is actually space left to emit.
    // If we have a dead particle, that means we can recycle it.
    if (numToEmit <= 0 || this.numDeadParticles == 0)
    {
      return;
    }

    // if we tried to emit more particles than there is enough
    // space for, just emit the last remaining particles, since
    // our array is static, there is nothing we can do except wait
    // for particles to die off.
    //
    // cap the amount of particles to emit.
    numToEmit = (numToEmit > this.numDeadParticles) ? this.numDeadParticles : numToEmit;

    // stay within the bounds and don't emit more than we have.
    // we count down until numParticlesToEmit is zero.
    for (var i = 0, len = this.particles.length; i < len && numToEmit > 0; i++)
    {
      // if we found a dead particle, recycle it.
      if (this.particles[i].isAlive() == false)
      {
        // emit the particle at index i which is recyclable.
        this.emitParticle(i);

        // one less we have to emit
        numToEmit--;
      }
    }
  }

  /**
   @private
   Emit a particle at index 'index'.
   
   @param index
   */
  this.emitParticle = function (index)
  {
    if (index >= 0 && index < this.particles.length)
    {
      this.particles[index].setVelocity([
        c3dl.getRandom(this.minVelocity[0], this.maxVelocity[0]), 
        c3dl.getRandom(this.minVelocity[1], this.maxVelocity[1]), 
        c3dl.getRandom(this.minVelocity[2], this.maxVelocity[2])
        ]);

      this.particles[index].setAge(0);
      this.particles[index].setLifetime(c3dl.getRandom(this.minLifetime, this.maxLifetime));
      this.particles[index].setAlive(true);

      // when the particle is emitted, we assign it the position of the particle system
      // By doing this, moving the particle system will not move the particles.
      this.particles[index].setPosition([this.mat[12], this.mat[13], this.mat[14]]);

      this.particles[index].setColor([
        c3dl.getRandom(this.minColor[0], this.maxColor[0]), 
        c3dl.getRandom(this.minColor[1], this.maxColor[1]), 
        c3dl.getRandom(this.minColor[2], this.maxColor[2]), 
        c3dl.getRandom(this.minColor[3], this.maxColor[3]), 
        ]);

      this.particles[index].setSize(c3dl.getRandom(this.minSize, this.maxSize));

      // we now have one less particle to recycle.
      this.numDeadParticles--;
    }
  }


  /**
   Initialize the subsystem.  This must be called before the particle 
   system is actually used.
   
   @param {integer} numParticles
   */
  this.init = function (numParticles)
  {
    // allocate once since allocation is expensive. We will just recycle the 
    // particles when they die.
    this.particles = new Array(numParticles);

    for (var i = 0; i < numParticles; i++)
    {
      this.particles[i] = new c3dl.Particle();
    }

    this.particleVerts = new C3DL_FLOAT_ARRAY(this.particles.length * 3 * 4);
    this.particleColors = new C3DL_FLOAT_ARRAY(this.particles.length * 4 * 4);
    this.particleTexCoords = new C3DL_FLOAT_ARRAY(this.particles.length * 2 * 4);

    for (var i = 0, len = this.particleColors.length; i < len; i++)
    {
      this.particleColors[i] = 0.0;
    }
    for (var i = 0, len = this.particleVerts.length; i < len; i++)
    {
      this.particleVerts[i] = 0.0;
    }
    for (var i = 0, len = this.particleTexCoords.length; i < len; i++)
    {
      this.particleTexCoords[i] = 0;
    }

    // fix this depending on emission
    this.isPlaying = true;
    this.numDeadParticles = this.particles.length;
  }

  /**
   @private
   is the subsystem ready to render?
   
   @return true if the subsystem is ready to render.
   */
  this.isReady = function ()
  {
    return (this.particles instanceof Array);
  }

  /**
   Get the total amount of particles in the system, including dead ones.
   
   return {int}
   */
  this.getNumParticles = function ()
  {
    return this.particles.length;
  }

  /**
   Get the particle at index i.
   
   @param {int} i the index of the particle to get.
   */
  this.getParticle = function (i)
  {
    if (i >= 0 && i < this.particles.length)
    {
      return this.particles[i];
    }
  }

  /**
   @private
   */
  this.getVertices = function ()
  {
    return this.billboardVerts;
  }

  /**
   @private
   */
  this.getTexCoords = function ()
  {
    return this.particleUVs;
  }

  /**
   @private
   Removed the particle at index 'index' from being update and rendered.
   
   @param 
   */
  this.killParticle = function (index)
  {
    if (index > 0 && index < this.particles.length)
    {
      this.particles[index].setAlive(false);
      this.numDeadParticles++;
    }
  }

  /**
   Set the amount of particles to emit per second. To stop emission, pass in zero.
   
   @param particlesPerSecond
   */
  this.setEmitRate = function (particlesPerSecond)
  {
    if (particlesPerSecond == 0)
    {
      this.emitRate = 0;
      this.isTimeCounterSetup = false;
    }
    else if (particlesPerSecond > 0)
    {
      this.emitRate = particlesPerSecond;
    }
  }


  /**
   @private
   testing funciton
   */
  this.translate = function (vec)
  {
    this.mat[12] += vec[0];
    this.mat[13] += vec[1];
    this.mat[14] += vec[2];
  }

  /**
   Set the position of the particle system.
   
   @param {Array} 
   */
  this.setPosition = function (vec)
  {
    this.mat[12] = vec[0];
    this.mat[13] = vec[1];
    this.mat[14] = vec[2];
  }


  /**
   Get the acceleration of all the particles.  This is usually 
   gravity, but does not have to be.
   */
  this.getAcceleration = function ()
  {
    return new C3DL_FLOAT_ARRAY(this.acceleration);
  }

  /**
   Get blend equation
   */
  this.getBlendEquation = function ()
  {
    return this.blendEq;
  }

  /**
   get the desination blend factor.
   
   @return {int} the destination blend factor.
   */
  this.getDstBlend = function ()
  {
    return this.dstBlend;
  }

  /**
   Get the maximum color range.  The max color range 
   is an array of components which each contain the
   maximum value each component can be assigned. components
   range from 0 to 1.
   
   @returns {Array}
   */
  this.getMaxColor = function ()
  {
    return new C3DL_FLOAT_ARRAY(this.maxColor);
  }

  /**
   Get the minimum color range.
   @returns {Array}
   */
  this.getMinColor = function ()
  {
    return new C3DL_FLOAT_ARRAY(this.minColor);
  }

  /**
   Get the maximum number of seconds for which any particle can live.
   
   @return the maximum number of seconds for which any particle 
   can live.
   */
  this.getMaxLifetime = function ()
  {
    return this.maxLifetime;
  }

  /**
   Get the minimum amount of seconds for which any particle can live.
   
   @return the minimum amount of seconds for which any particle can live.
   */
  this.getMinLifetime = function ()
  {
    return this.minLifetime;
  }

  /**
   */
  this.getMinVelocity = function ()
  {
    return new C3DL_FLOAT_ARRAY(this.minVelocity);
  }

  /**
   Get the maximum values for each xyz component any particle can 
   be assigned when emitted.
   
   @return {Array} the maximum values for each xyz component any particle can 
   be assigned when emitted.
   */
  this.getMaxVelocity = function ()
  {
    return new C3DL_FLOAT_ARRAY(this.maxVelocity);
  }

  /**
   Get the texture which all particles are assigned.
   
   @return {String} the texture which all particles are assigned.
   */
  this.getTexture = function ()
  {
    return this.texture;
  }

  /**
   Get the source blending factor.
   
   @return {int} the source blending factor.
   */
  this.getSrcBlend = function ()
  {
    return this.srcBlend;
  }

  /**
   Set the acceleration of this subsystem. This is commonly gravity, but can be
   any valid vector.
   
   @param {Array} acceleration
   */
  this.setAcceleration = function (acceleration)
  {
    this.acceleration[0] = acceleration[0];
	this.acceleration[1] = acceleration[1];
	this.acceleration[2] = acceleration[2];
	this.acceleration[3] = acceleration[3];
  }

  /**
   Set the destination blend factor. parameter must be one of:
   c3dl.ZERO,
   c3dl.ONE,
   c3dl.SRC_COLOR,
   c3dl.ONE_MINUS_SRC_COLOR,
   c3dl.SRC_ALPHA,	
   c3dl.ONE_MINUS_SRC_ALPHA,
   c3dl.DST_ALPHA,
   c3dl.ONE_MINUS_DST_ALPHA,
   c3dl.DST_COLOR,
   c3dl.ONE_MINUS_DST_COLOR or
   c3dl.SRC_ALPHA_SATURATE
   
   @param {int} dstBlend
   */
  this.setDstBlend = function (dstBlend)
  {
    switch (dstBlend)
    {
    case c3dl.ZERO:
    case c3dl.ONE:
    case c3dl.SRC_COLOR:
    case c3dl.ONE_MINUS_SRC_COLOR:
    case c3dl.SRC_ALPHA:
    case c3dl.ONE_MINUS_SRC_ALPHA:
    case c3dl.DST_ALPHA:
    case c3dl.ONE_MINUS_DST_ALPHA:
    case c3dl.DST_COLOR:
    case c3dl.ONE_MINUS_DST_COLOR:
    case c3dl.SRC_ALPHA_SATURATE:
      this.dstBlend = dstBlend;
      break;
    }
  }

  /**
   Set the maximum color range a particle can be assigned.  Each component
   must range from 0 to 1 inclusive.
   
   @param {Array} maxColor - array of 4 floating point values ranging from 0 to 1 inclusive.
   */
  this.setMaxColor = function (maxColor)
  {
    if (c3dl.isValidColor(maxColor))
    {
      this.maxColor[0] = maxColor[0];
	  this.maxColor[1] = maxColor[1];
	  this.maxColor[2] = maxColor[2];
	  this.maxColor[3] = maxColor[3];
    }
  }

  /**
   Set the minimum color values each particle can be.
   
   @param {Array} minParticleColor the minimum Color values each particle 
   can be.
   */
  this.setMinColor = function (minColor)
  {
    if (c3dl.isValidColor(minColor))
    {
      this.minColor[0] = minColor[0];
	  this.minColor[1] = minColor[1];
	  this.minColor[2] = minColor[2];
	  this.minColor[3] = minColor[3];
    }
  }

  /**
   Set the maximum number of seconds for which any particle can live.
   Value must be greater than zero.
   
   @param {float} maxLifetime
   */
  this.setMaxLifetime = function (maxLifetime)
  {
    if (maxLifetime > 0)
    {
      this.maxLifetime = maxLifetime;
    }
  }

  /**
   Set the minimum amount of seconds for which particles will live.
   Value must be greater than zero.
   
   @param minParticleLifetime the minimum amount of seconds for 
   which the particles can live.
   */
  this.setMinLifetime = function (minLifetime)
  {
    if (minLifetime > 0)
    {
      this.minLifetime = minLifetime;
    }
  }

  /**
   
   */
  this.setMaxSize = function (maxSize)
  {
    if (maxSize > 0)
    {
      this.maxSize = maxSize;
    }
  }

  /**
   
   */
  this.setMinSize = function (minSize)
  {
    if (minSize > 0)
    {
      this.minSize = minSize;
    }
  }

  /**
   Set the minimum velocity of all the particles.
   
   @param {Array} minVelocity the minimum velocity of all the particles.
   */
  this.setMinVelocity = function (minVelocity)
  {
    this.minVelocity[0] = minVelocity[0];
	this.minVelocity[1] = minVelocity[1];
	this.minVelocity[2] = minVelocity[2];
  }

  /**
   Set the maximum velocity of all the particles.
   
   @param {Array} maxVelocity the maximum velocity of all the particles.
   */
  this.setMaxVelocity = function (maxVelocity)
  {
    this.maxVelocity[0] = maxVelocity[0];
	this.maxVelocity[1] = maxVelocity[1];
	this.maxVelocity[2] = maxVelocity[2];
  }

  /**
   */
  this.setMaxAngularVelocity = function (maxAngVel)
  {
    this.maxAngVel = maxAngVel;
  }

  /**
   */
  this.setMinAngularVelocity = function (minAngVel)
  {
    this.minAngVel = minAngVel;
  }

  /**
   (src * srcBlend) Eq (dst * dstBlend)
   
   @param {int} blenEq
   */
  this.setBlendEquation = function (blendEq)
  {
    switch (blendEq)
    {
    case c3dl.FUNC_ADD:
    case c3dl.FUNC_SUBTRACT:
    case c3dl.FUNC_REVERSE_SUBTRACT:
      this.blendEq = blendEq;
      break;
    }
  }


  /**
   Set the Source blending factor.  parameter must be one of:
   c3dl.ZERO,
   c3dl.ONE,
   c3dl.SRC_COLOR,
   c3dl.ONE_MINUS_SRC_COLOR,
   c3dl.SRC_ALPHA,	
   c3dl.ONE_MINUS_SRC_ALPHA,
   c3dl.DST_ALPHA,
   c3dl.ONE_MINUS_DST_ALPHA,
   c3dl.DST_COLOR,
   c3dl.ONE_MINUS_DST_COLOR or
   c3dl.SRC_ALPHA_SATURATE
   
   @param {int} srcBlend
   */
  this.setSrcBlend = function (srcBlend)
  {
    switch (srcBlend)
    {
    case c3dl.ZERO:
    case c3dl.ONE:
    case c3dl.SRC_COLOR:
    case c3dl.ONE_MINUS_SRC_COLOR:
    case c3dl.SRC_ALPHA:
    case c3dl.ONE_MINUS_SRC_ALPHA:
    case c3dl.DST_ALPHA:
    case c3dl.ONE_MINUS_DST_ALPHA:
    case c3dl.DST_COLOR:
    case c3dl.ONE_MINUS_DST_COLOR:
    case c3dl.SRC_ALPHA_SATURATE:
      this.srcBlend = srcBlend;
      break;
    }
  }


  /**
   Set the texure of the particles.
   
   @param {String} textureName
   */
  this.setTexture = function (textureName)
  {
    this.texture = textureName;
  }

  /**
   @private
   Update the positions of the particles if they are alive.  Also,
   calculate how many particles to emit if the emit rate has been
   set.
   
   @param {float} timeStep
   */
  this.update = function (timeStep)
  {
    // only calculate how many to emit if we actually want to 
    // emit particles
    if (this.emitRate > 0)
    {
      // get the time
      if (this.isTimeCounterSetup == false)
      {
        this.timeCounter = timeStep;
        this.isTimeCounterSetup = true;
      }
      else
      {
        this.timeCounter += timeStep;
      }

      // The user supplies the amount of particles to emit per second since people are
      // more accustomed to using seconds than milliseconds.  However timeStep is in 
      // milliseconds, so we calculate how many to emit in 1000 milliseconds.
      var numToEmit = this.timeCounter * this.emitRate / 1000.0;

      // if enough time has elapsed to emit at least one particle, emit however
      // many particles.  Otherwise we will have to wait until next update and
      // check again until we can emit at least one.
      if (numToEmit >= 1)
      {
        // numToEmit may be a float, but emit should only be passed
        // an integer
        this.emit(numToEmit);

        // subtract time from the timeCounter to prevent too
        // many paritcles from being emitted on the next update
        this.timeCounter -= numToEmit / this.emitRate * 1000.0;
      }
    }

    var p = 0,
      j = 0;
    for (var i = 0, len =this.particleColors.length; i < len; i++, j++)
    {
      if (i != 0 && i % 16 == 0)
      {
        p++
        // c3dl.debug.logWarning(p + "   " + this.particles[p].getColor());
      }

      if (j > 3)
      {
        j = 0;
      }
      this.particleColors[i] = this.particles[p].getColor()[j];
    }
    //     c3dl.debug.logWarning(p + "  .   " + this.particleColors);
    // now update the particles
    for (var i = 0, len = this.particles.length; i < len; i++)
    {
      // don't update the particle unless its alive.
      if (this.particles[i].isAlive())
      {
        var timeInSeconds = timeStep / 1000;

        // make shorter variable names to prevent clutter.
        var pos = this.particles[i].getPosition();
        var vel = this.particles[i].getVelocity();

        this.particles[i].translate([
          (vel[0] * timeInSeconds) + this.acceleration[0] * timeInSeconds * timeInSeconds * 0.5,
          (vel[1] * timeInSeconds) + this.acceleration[1] * timeInSeconds * timeInSeconds * 0.5, 
          (vel[2] * timeInSeconds) + this.acceleration[2] * timeInSeconds * timeInSeconds * 0.5]);

        //
        for (var p = 0, j = 0; p < 12; p++, j++)
        {
          if (j > 2)
          {
            j = 0;
          }
          this.particleVerts[i * 12 + p] = this.particles[i].getPosition()[j] + this.getVertices()[p];
        }



        // update the velocity
        this.particles[i].setVelocity([
          vel[0] + (this.acceleration[0] * timeInSeconds), vel[1] + (this.acceleration[1] * timeInSeconds),
          vel[2] + (this.acceleration[2] * timeInSeconds)]);

        // Age the particle
        this.particles[i].setAge(this.particles[i].getAge() + timeInSeconds);

        // kill the particle if it went past its lifetime. If the particle
        // is dead, it won't be updated or rendered until it is recycled.
        if (this.particles[i].getAge() > this.particles[i].getLifetime())
        {
          this.killParticle(i);
        }
      }
    }
  }

  this.getVBOTexCoords = function ()
  {
    return this.VBOTexCoords;
  }

  /**
   */
  this.getVBOVertices = function ()
  {
    return this.VBOVertices;
  }

  /**
   */
  this.getVBOColors = function ()
  {
    return this.VBOColors;
  }

  /**
   @private
   prepare to render the particles. This includes turning off lighting, enabling blending, etc.
   
   @param glCanvas3D
   @param {Scene} scene
   */
  this.preRender = function (glCanvas3D, scene)
  {
    if (this.firstTimeRender === true)
    {
      for (var i = 0, j = 0, len = this.particleTexCoords.length; i < len; i++, j++)
      {
        if (j > 7)
        {
          j = 0;
        }
        this.particleTexCoords[i] = this.particleUVs[j];
      }

      this.VBOColors = glCanvas3D.createBuffer();
      glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.VBOColors);
      glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, this.particleColors, glCanvas3D.STREAM_DRAW);

      this.VBOVertices = glCanvas3D.createBuffer();
      glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.VBOVertices);
      glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, this.particleVerts, glCanvas3D.STREAM_DRAW);

      this.VBOTexCoords = glCanvas3D.createBuffer();
      glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.VBOTexCoords);
      glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, this.particleTexCoords, glCanvas3D.STREAM_DRAW);

      this.firstTimeRender = 0;
    }
    else
    {
      glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.VBOColors);
      glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, this.particleColors, glCanvas3D.STREAM_DRAW);

      glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.VBOVertices);
      glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, this.particleVerts, glCanvas3D.STREAM_DRAW);

      glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.VBOTexCoords);
      glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, this.particleTexCoords, glCanvas3D.STREAM_DRAW);
    }

    // disable writing into the depth buffer. This will prevent
    // the corners of texture overlapping each other.
    glCanvas3D.depthMask(false);

    // blending is expensive, so only enable for things that need it.
    glCanvas3D.enable(glCanvas3D.BLEND);

    // 
    glCanvas3D.blendEquation(this.blendEq);

    //
    glCanvas3D.blendFunc(this.getSrcBlend(), this.getDstBlend());
  }

  /**
   @private
   Re-enable the depth testing, lighting, etc.
   
   @param glCanvas3D
   @param {Scene} scene
   */
  this.postRender = function (glCanvas3D, scene)
  {
    // blending is expensive so turn it off when not needed.
    glCanvas3D.disable(glCanvas3D.BLEND);
    glCanvas3D.depthMask(true);
  }

  /**
   @private
   Draw all the particles which are alive.
   
   @param glCanvas3D
   @param {Scene} scene
   */
  this.render = function (glCanvas3D, scene)
  {
    //
    this.recalculateBillboard(glCanvas3D, scene);

    this.preRender(glCanvas3D, scene);

    scene.getRenderer().renderParticleSystem(this);

    this.postRender(glCanvas3D, scene);
  }

  /**
   */
  this.getObjectType = function ()
  {
    return c3dl.PARTICLE_SYSTEM;
  }


  /**
   @private
   */
  this.recalculateBillboard = function (glCanvas3D, scene)
  {
    // if any of the vectors have changed, we have
    // to recalculate the billboard.
    // if they are equal we don't have to do any more
    if (!(c3dl.isVectorEqual(this.camUp, scene.getCamera().getUp()) &&
      c3dl.isVectorEqual(this.camLeft, scene.getCamera().getLeft()) && 
      c3dl.isVectorEqual(this.camDir, scene.getCamera().getDir())))
    {
      // get local copies of the camera vectors.
      this.camUp = scene.getCamera().getUp();
      this.camLeft = scene.getCamera().getLeft();
      this.camDir = scene.getCamera().getDir();

      var camRight = [-this.camLeft[0], -this.camLeft[1], -this.camLeft[2]];

      var bottomRight = c3dl.subtractVectors(camRight, this.camUp);
      var bottomLeft = c3dl.subtractVectors(this.camLeft, this.camUp);
      var topLeft = c3dl.addVectors(this.camLeft, this.camUp);
      var topRight = c3dl.addVectors(camRight, this.camUp);

      // use counter clockwise order since models vertices are also counter clockwise.
      // This prevents having to change the WebGL state of the winding order when 
      // switching between rendering models and particle systems.			
      this.billboardVerts = [bottomRight[0], bottomRight[1], bottomRight[2], 
                             topRight[0], topRight[1], topRight[2], 
                             topLeft[0], topLeft[1], topLeft[2], 
                             bottomLeft[0], bottomLeft[1], bottomLeft[2]];
    }
  }
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @private
 class Particle.
 */
c3dl.Particle = function ()
{
  // life properties
  this.age = 0;
  this.lifetime = 0;
  this.alive = false;

  // what the particle looks like
  this.color = new C3DL_FLOAT_ARRAY([0, 0, 0, 0]);
  this.size = 0;

  // how the particle moves and its location
  this.position = c3dl.makeVector(0, 0, 0);
  this.velocity = c3dl.makeVector(0, 0, 0);
  this.rotation = 0;
  this.vertices = new C3DL_FLOAT_ARRAY([1, -1, 0, -1, -1, 0, -1, 1, 0, 1, 1, 0]);

  this.transform = new C3DL_FLOAT_ARRAY([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

  /**
   @private
   Get the age of this particle in seconds.
   
   @returns {float}
   */
  this.getAge = function ()
  {
    return this.age;
  }

  /**
   @private	
   */
  this.getPosition = function ()
  {
    return c3dl.copyVector(this.position);
  }

  /**
   @private	
   */
  this.getVelocity = function ()
  {
    return c3dl.copyVector(this.velocity);
  }

  /**
   @private
   Get how long this particle is set to live for.
   
   @returns {float}
   */
  this.getLifetime = function ()
  {
    return this.lifetime;
  }

  /**
   @private	
   Get the color of this particle.
   
   @returns {Array}
   */
  this.getColor = function ()
  {
    return new C3DL_FLOAT_ARRAY(this.color);
  }

  /**
   @private
   */
  this.getSize = function ()
  {
    return this.size;
  }

  /**
   */
  this.setSize = function (s)
  {
    this.size = s;
  }

  /**
   @private	
   */
  this.isAlive = function ()
  {
    return this.alive;
  }

  /**
   @private
   */
  this.getTransform = function ()
  {
    return new C3DL_FLOAT_ARRAY(this.transform);
  }

  /**
   @private
   */
  this.getVertices = function ()
  {
    return new C3DL_FLOAT_ARRAY(verts);
  }

  /**
   @private	
   */
  this.setAge = function (age)
  {
    if (age >= 0)
    {
      this.age = age;
    }
  }

  /**
   @private
   */
  this.setColor = function (c)
  {
    this.color[0] = c[0];
    this.color[1] = c[1];
    this.color[2] = c[2];
    this.color[3] = c[3];
  }

  /**
   @private
   */
  this.setVelocity = function (velocity)
  {
    this.velocity[0] = velocity[0];
	this.velocity[1] = velocity[1];
	this.velocity[2] = velocity[2];
  }

  /**
   @private
   */
  this.setPosition = function (position)
  {
    this.transform[12] = position[0];
    this.transform[13] = position[1];
    this.transform[14] = position[2];
  }

  /**
   @private
   */
  this.setLifetime = function (lifetime)
  {
    if (this.lifetime >= 0)
    {
      this.lifetime = lifetime;
    }
  }

  /**
   @private	
   */
  this.setAlive = function (alive)
  {
    this.alive = alive;
  }

  /**
   @private
   */
  this.translate = function (trans)
  {
    this.transform[12] += trans[0];
    this.transform[13] += trans[1];
    this.transform[14] += trans[2];
  }

  /**
   @private	
   Update the position of the particle.
   
   @param timeStep
   */
  this.update = function (timeStep)
  {
  }

  /**
   @private
   */
  this.render = function (glCanvas3D)
  {
  }
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

// functions for initialization
c3dl.mainCallBacks = [];
c3dl.preloadModels = [];

/**
 @private
 Add a progress bar for each canvas on the page.  Place them in the
 middle of each canvas.  The progress bar is an animated gif placed 
 in the center of the screen.  
 
 The primary purpose of using a progress bar is to notify users
 that collada model files are being parsed.   When the collada
 Queue becomes empty, it will automatically call removeProgressBars().
 */
c3dl.addProgressBars = function ()
{
  // get all the canvases in the DOM.
  var canvases = document.getElementsByTagName('canvas');

  // add a progress bar for each of the canvases.
  for (var i = 0, len = canvases.length; i < len; i++)
  {
    // to place the loading gif in the center of the canvas, we'll need to
    // get the absolute position of the canvas.
    var pos = c3dl.getObjectPosition(canvases[i]);
    var xOffset = pos[0];
    var yOffset = pos[1];
    var progressBar = document.createElement("img");
    progressBar.src = basePath + "/loading.gif";
    progressBar.style.position = 'absolute';
    // place the center of the gif in the center of the canvas
    // First get the middle of the canvas then add the offset from the 
    // top or left corner of the screen, then move the image left 
    // (by subtracting) since positioning the image is relative to 
    // the top left corner of the image.
    progressBar.style.left = (canvases[i].width / 2) + xOffset - (50); //progressBar.width/2); progressbar is not yet loaded
    progressBar.style.top = (canvases[i].height / 2) + yOffset - (50); // so its width and height is zero.
    // make it translucent as to not annoy the user too much.
    progressBar.style.opacity = 0.5;

    // try to force this image above all others.
    progressBar.style.zIndex = 100;

    // make sure the id of each progress bar is unique so we 
    // can remove them all later.
    progressBar.id = 'c3dl_progress_bar_' + i;
    document.body.appendChild(progressBar);
  }
}

/**
 @private
 Remove all the progress bars from the page.  Each canvas will have
 a progress bar if the user of the library used addModel() to add
 a model to be parsed. 
 */
c3dl.removeProgressBars = function ()
{
  // To remove all the loading bars, we just need to get the number of
  // canvases on the page.  Since every canvas will have their own loading
  // bar, we know how many bars there will be.  This will allow us to 
  // create the id's of each individual loading bar.
  var numProgressBars = document.getElementsByTagName('canvas').length;
  for (var i = 0; i < numProgressBars; i++)
  {
    // generate the id's of the progress bars
    var progressBarID = 'c3dl_progress_bar_' + i;
    var progressBar = document.getElementById(progressBarID);
    document.body.removeChild(progressBar);
  }
}

/**
 @private
 This is a function which the browser will call once the loading of the 
 page is done.
 
 Once the page is done loading, this function will place all the models 
 the user will use in the course of the script into the ColladaQueue.  
 Once the Queue detects it is empty, it will call all the 'main' 
 functions the user wants to start automatically.
 
 If the user did not provide the library with main functions, it will be
 up to the user to call those main functions.  If the user did not 
 provide the models they will use in their script, references to models 
 may not exit yet when the main funciton is executed.
 */
c3dl.init = function ()
{
  // if the user does not want to parse any collada models,
  // we don't put anything in the queue and go right ahead and 
  // call the main methods.
  if (c3dl.preloadModels.length == 0)
  {
    for (var i = 0, len = c3dl.mainCallBacks.length; i < len; i++)
    {
      // Each element is an object which holds a function 
      // and a tag.  They were both placed in a wrapper
      // object so we can stick to using arrays for simplicity.
      var func = c3dl.mainCallBacks[i].f;
      var tag = c3dl.mainCallBacks[i].t;
      func(tag);
    }
  }
  // otherwise we will let the collada queue call the main methods
  // once all the models have been parsed.
  // By creating collada objects, they will be placed in the queue.
  // Once the queue is empty, the main methods will be called by
  // the Queue.
  else
  {
    // This will add an animated gif to the DOM, letting
    // the user know that there is loading occuring.
    c3dl.addProgressBars();

    for (var i = 0, len = c3dl.preloadModels.length; i < len; i++)
    {
      var preloadColadda = new c3dl.Collada();
      preloadColadda.init(c3dl.preloadModels[i]);
    }
  }
}

/**
 Add a model to the collada queue to be parsed
 before the main funciton is run. Call this function
 once for each collada file your script will use.
 
 @param {string} model - path to a .dae file.
 */
c3dl.addModel = function (model)
{
  c3dl.preloadModels.push(model);
}

/**
 Add a function to a list of functions to call once the
 page is finished loading.
 
 @param {Function} func - the function to call once the web page
 is finished loading.
 
 @param {String} tagName - the tag name of the canvas associated 
 with the function.
 */
c3dl.addMainCallBack = function (func, tagName)
{
  // put both objects into a wrapper object so later
  // we can access the couple as an array access.
  var obj =
  {
    f: func,
    t: tagName
  };

  c3dl.mainCallBacks.push(obj);
}

// This will make sure the c3dl.init() funciton is called once the web page
// is done loading.
if (document.addEventListener)
{
  document.addEventListener("DOMContentLoaded", c3dl.init, false);
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
  Author: Patrick Lam & Andor Salga
*/

/**
 @private
 @class A Picking class
 */
c3dl.Picking = function (scene)
{
  var scn = scene;
  var cam = scn.getCamera();

  /**
   @private
   Returns an array of 2 elements. The mouse button clicked and an array of object 
   index number in the current scene in sorted order (closet to farthest).
   
   @param {} event
   
   @returns {Array} The mouse button clicked and the array of object index number.
   */
  this.onMouseDown = function (event)
  {
    // user may have switched the camera or the user may have moved the camera 
    // and then clicked, so everytime the user tries to pick something, get the 
    // camera being used at the time of the click.
    cam = scn.getCamera();

    var canvasTag = scn.getCanvas();

    // Get the viewport coordinates, that is the coordinates where the user clicked
    // on the canvas. 
    // The viewport coordinates system:
    //
    // 0,0  _______ w, 0
    //     |       |
    //     |       |
    // 0,h |_______| w,h
    //
    var clickedCanvasCoords = getClickedCoords(event);

    // Convert the viewport coordinates into NDC. Since NDC is normalized, 
    // it's as if we are calculating percentages. Note Y is flipped for NDC.
    // NDC space:
    //
    // -1,1   _______ 1, 1
    //       |       |
    //       |       |
    // -1,-1 |_______| 1,-1
    //
    // go from viewport coords to normalized device coords
    var normalizedDeviceCoords = [(2 * clickedCanvasCoords[0] / canvasTag.width) - 1, -((2 * clickedCanvasCoords[1] / canvasTag.height) - 1), 1, 1];

    var iproj = c3dl.inverseMatrix(scene.getProjectionMatrix());

    // To get the clip coords, we multiply the viewspace coordinates by
    // the projection matrix.
    // Working backwards across the pipeline, we have to take the normalized
    // device coordinates and multiply by the inverse projection matrix to get
    // the clip coordinates.
    var clipCoords = c3dl.multiplyMatrixByVector(iproj, normalizedDeviceCoords);
    // perspective divide
    clipCoords[0] /= clipCoords[3];
    clipCoords[1] /= clipCoords[3];
    clipCoords[2] /= clipCoords[3];

    // flip Y
    clipCoords[2] = -clipCoords[2];

    // The start of the ray is wherever the camera is.
    var rayInitialPoint = cam.getPosition();

    var x = clipCoords[0];
    var y = clipCoords[1];
    var z = clipCoords[2];

    // After this code was written a small bug was found in the freecamera class
    // until I have time to fix it, I'm putting in a quick fix.
    var kludge = c3dl.multiplyVector(cam.getLeft(), -1);
    var viewMatrix = c3dl.makePoseMatrix(kludge, cam.getUp(), cam.getDir(), cam.getPosition());

    // place the ray from clip space into view space
    //
    //
    var rayTerminalPoint = c3dl.multiplyMatrixByVector(viewMatrix, new C3DL_FLOAT_ARRAY([x, y, z, 0]));
    var rayDir = c3dl.normalizeVector(rayTerminalPoint);

    // This array will hold the indices of the objects which pass the boundingSphere/Ray test.
    // The indices are the ones the scene uses to identify objects.
    // All the objects which passed the rough bouding volume test can later on be more thouroughly
    // tested against the ray.  Objects which do 
    var passedBoundsTest = new Array();

    // Collada objects must pass an enclosure test first before their individual
    // triangles are tested against the ray, to speed up this test.
    for (var i = 0, len = scn.getObjListSize(); i < len; i++)
    {
      var currObj = scn.getObj(i);

      // Make sure the object is a Collada before calling getPickable() since
      // not all objects in the scene will have that function.
      if (currObj instanceof c3dl.Collada && currObj.getPickable())
      {
        // do the bounding volumes of the geometry nodes intersect with the given ray?
        if (currObj.rayIntersectsEnclosures(rayInitialPoint, rayDir))
        {
          passedBoundsTest.push(currObj);
        }
      }
    }

    // references of objects which have passed their respective picking tests.
    var objectsPicked = new Array();

    // if the user only wants to only run the test against bounding volumes, just
    // make the array which holds the objects which passed the triangle test point to 
    // the array we just filled up with object indices.  There is no need to recopy 
    // everything into the array which holds the passed triangle tests.	
    if (scn.getPickingPrecision() == c3dl.PICK_PRECISION_BOUNDING_VOLUME)
    {
      objectsPicked = passedBoundsTest;
    }

    // otherwise we will need to run the ray/triangle tests for every object
    else
    {
      // We only test the objects which have passed the bounding volume test.
      // If the ray has not intersected the bounding volume, it can't possibly intersect
      // with any triangle in the object.
      for (var i = 0, len = passedBoundsTest.length; i < len; i++)
      {
        var currObject = passedBoundsTest[i];
        // if the object is a collada object
        if (currObject instanceof c3dl.Collada && currObject.getPickable())
        {
          // if the collada object confirms the ray has intersected it, it will be
          // added to the list of objects the user picked.
          if (currObject.rayIntersectsTriangles(rayInitialPoint, rayDir))
          {
            objectsPicked.push(passedBoundsTest[i]);
          }
        }
      }
    }



    // POINT PICKING
    // get the projection tranformation (either perspective or orthographic)
    var projMatrix = cam.getProjectionMatrix();
    var viewMatrix = cam.getViewMatrix();
    var viewProjMatrix = c3dl.multiplyMatrixByMatrix(projMatrix, viewMatrix);
    if (scn.getPointRenderingMode() == c3dl.POINT_MODE_POINT)
    {
      // for every point in the scene
      for (var i = 0, len = scn.getObjListSize(); i < len; i++)
      {
        if (scn.getObj(i) instanceof c3dl.Point)
        {
          // save attenuation factors for the pointList
          var attenuation = scene.getPointAttenuation();
          var point = scn.getObj(i);

          // get the distance from the point to the camera. The distance is
          // used to calculate the attenuation of the point.
          var pointCoords = point.getPosition();
          var d = c3dl.vectorLength(c3dl.subtractVectors(pointCoords, cam.getPosition()));

          // save the points pixel width.  Get the pixel width by calculating 
          // the attenuation factors of the point.
          var pointPixelSize = 1.0 / (attenuation[0] + (attenuation[1] * d) + (attenuation[2] * d * d));

          // the coordinates in world space.
          var worldSpaceCoords = [pointCoords[0], pointCoords[1], pointCoords[2], 1];

          // project current point to 2D plane
          var clipCoords = c3dl.multiplyMatrixByVector(viewProjMatrix, worldSpaceCoords);

          // perspective divide.
          var normalizedDeviceCoords = [clipCoords[0] / clipCoords[3], clipCoords[1] / clipCoords[3], clipCoords[2] / clipCoords[3]];

          // transform the point from NDC space to viewport space.
          var viewportCoords = [(normalizedDeviceCoords[0] + 1) / 2 * canvasTag.width, (1 - normalizedDeviceCoords[1]) / 2 * canvasTag.height];

          // if points are rendered as circles,
          // test if x,y coords of mouse click falls within circle
          // if passed, add point index to list of points that passed test.
          // add pointList as a list which has one of its points picked.
          if ((scn.getPointSmooth() && isPointInCircle(clickedCanvasCoords, viewportCoords, pointPixelSize)) || (!scn.getPointSmooth() && isPointInSquare(clickedCanvasCoords, viewportCoords, pointPixelSize)))
          {
            objectsPicked.push(point);
          }
        }
      }
    }

    // We can run the rayBounding Sphere test if the points are rendered
    // as spheres.
    else if (scn.getPointRenderingMode() == c3dl.POINT_MODE_SPHERE)
    {
      // for every point in the scene
      for (var i = 0, len = scn.getObjListSize(); i < len; i++)
      {
        if (scn.getObj(i) instanceof c3dl.Point)
        {
          if (c3dl.rayIntersectsSphere(rayInitialPoint, rayDir, scn.getObj(i).getPosition(), scn.getPointSize()))
          {
            objectsPicked.push(scn.getObj(i));
          }
        }
      }
    }


    // Give the option for the user to do whatever they want to objects
    // which were behind the objects picked.
    c3dl.sortObjectsFromCam(scn, cam, objectsPicked);

    // the picking callback is the function the user wants the library to call once
    // someone clicks on the canvas.
    var pickingCB = scn.getPickingCallback();

    // create the object which will contain the methods the user will need to call.
    var pickingResult = createPickingResult(canvasTag, event.which, objectsPicked);
    pickingCB(pickingResult);
  }

  /**
   @private
   
   @param {HTMLCanvasElement} cvs;
   @param {int} btnUsed The button clicked
   @param {Array} objList Array of renferences of objects
   @param {Array} pointLists Array of references of pointsLists which had at least one of their
   points picked.
   @param {Array} points Array of 
   
   @returns {c3dl.PickingResult} a pickingresult with added variables and overridden methods.
   */

  function createPickingResult(cvs, btnUsed, objList)
  {
    var pickingObj = new c3dl.PickingResult();
    //
    pickingObj["canvas"] = cvs;
    pickingObj["getCanvas"] = function ()
    {
      return this.canvas;
    };
    //
    pickingObj["buttonUsed"] = btnUsed;
    pickingObj["getButtonUsed"] = function ()
    {
      return this.buttonUsed;
    };
    //
    pickingObj['objects'] = objList;
    pickingObj['getObjects'] = function ()
    {
      return this.objects;
    };
    return pickingObj;
  }

  /**
   @private
   
   Is the 2D point pointCoords within the squre located at squareCoords with
   a width and height of pointPixelSize
   
   @param pointCoords {Array} Two components [x,y] which defines the 
   point which will be tested to see if is lies within the square.
   
   @param squareCoords {Array} Two components [x,y] which defines the 
   center of the square.
   
   @param squareSize {float} The number of pixels from the center of
   the square to each edge.
   
   @returns {bool} true if the point is within the square, false otherwise.
   */

  function isPointInSquare(pointCoords, squareCoords, squareSize)
  {
    // if the clicked coordinates are inside the square
    if (pointCoords[0] >= squareCoords[0] - squareSize / 2 && pointCoords[0] <= squareCoords[0] + squareSize / 2 && pointCoords[1] >= squareCoords[1] - squareSize / 2 && pointCoords[1] <= squareCoords[1] + squareSize / 2)
    {
      return true;
    }
    return false;
  }


  /**
   @private
   
   Is the point 'pointCoords' within the circle with position circleCoords and diameter 
   circleDiameter? If points have a small Diameter, only a few pixels in width, either 
   this of isPointInSquare can be called. However, if the diamater get larger, we have to
   reject clicking on the circles 'corners' as valid 'hits'.
   
   @param {Array} pointCoords
   
   @param {Array} circleCoords
   
   @param {Array} circleDiameter
   
   @return {bool} true if the point is within the cirlce, otherwise false.
   */

  function isPointInCircle(pointCoords, circleCoords, circleDiameter)
  {
    // Get the vector from pointCoords to circleCoords
    var vec = [pointCoords[0] - circleCoords[0], pointCoords[1] - circleCoords[1]];
    // distance from point to circle
    var d = Math.sqrt((vec[0] * vec[0]) + (vec[1] * vec[1]));

    return (d < circleDiameter / 2 ? true : false);
  }

  /**		
   @private
   Get the coordinates where the user clicked on the canvas.
   
   Screen space is left handed with 0,0 at the top left of the canvas.
   
   @returns {Array} Array of 2 integers, x and y coordinates where the user clicked
   on the canvas.
   */

  function getClickedCoords(event)
  {
    var canvas = scn.getCanvas();
    var canvasPosition = c3dl.getObjectPosition(scn.getCanvas());
    
    // event.clientX and event.clientY contain where the user clicked 
    // on the client area of the browser
    // canvasPosition holds the coordinate of the top left corner where the canvas resides
    // on the client area.
    // window.pageXOffset, window.pageYOffset hold how much the user has scrolled.
    var X = event.clientX - canvasPosition[0] + window.pageXOffset - 1;
    var Y = event.clientY - canvasPosition[1] + window.pageYOffset - 1;
    return [X, Y];
  }

}

/**
 This will sort the objects which have been picked.  This function is O(n2).
 
 Should this function be sped up?  It is currently O(n2), however using a faster sorting algorithm may 
 create more overhead than a bubble sort.  If less than 10 objects need to be sorted, the speed of 
 this function should not be an issue.
 
 @param {c3dl.Scene} scene Scene is needed because we have an array of indices, not actual objects. Since
 scene has the actual list, we can query it with getObj(i) to get the actual object, then its position.
 @param {Array} pickedObjects An array of indices of objects which have passed a bounds test or triangle test.
 @param {c3dl.FreeCamera} camera The camera used in the scene.
 
 @private
 */
c3dl.sortObjectsFromCam = function (scene, camera, pickedObjects)
{
  var cameraPos = camera.getPosition();
  var objAPos, objBPos;
  var distA, distB;
  var camToObjADist, camToObjBDist;
  // used to swap objects
  var temp;
  // Sort all intersecting objects from closet to farthest 
  for (var i = 0, len = pickedObjects.length; i < len; i++)
  {
    for (var j = 0, len2= pickedObjects.length; j < len2; j++)
    {
      objAPos = pickedObjects[i].getPosition();
      objBPos = pickedObjects[j].getPosition();

      // calculate the distance from the camera to the object's center.
      camToObjADist = c3dl.subtractVectors(cameraPos, objAPos);
      camToObjBDist = c3dl.subtractVectors(cameraPos, objBPos);

      // Objects distance from camera
      distA = c3dl.vectorLength(camToObjADist);
      distB = c3dl.vectorLength(camToObjBDist);

      // Swap
      if (distA < distB)
      {
        temp = pickedObjects[i];
        pickedObjects[i] = pickedObjects[j];
        pickedObjects[j] = temp;
      }
    }
  }

  return pickedObjects;
}

/**
 Does the given ray intersect the sphere? When using this function to test
 the ray created by a user click against a boundingsphere, keep the following
 in mind:  When trying to pick the bounding sphere the test will fail if a few
 pixels from the edges of the sphere.  Either it will seem that the test is passing
 when it should not or the test is failing when it should should pass.
 
 This could be because the 'pixel point' associated with the cursor is not at the
 very tip of the cursor where it is expected it to be.  This occurs on osx.
 
 @param {Array} rayInitialPoint The initial point of the ray in world space.
 @param {Array} rayDir A normalized vector which has the ray's direction.
 @param {Array} spherePos position of the sphere.
 @param {float} sphereRadius radius of the sphere.
 
 @returns {boolean} true if the given ray intersects the boundingsphere, otherwise false.
 */
c3dl.rayIntersectsSphere = function (rayInitialPoint, rayD, spherePos, sphereRadius)
{
  // this will hold the result if there was an intersection.
  var hasIntersected = false;

  var rayDir = c3dl.normalizeVector(rayD);

  var v = c3dl.subtractVectors(rayInitialPoint, spherePos);
  var a = c3dl.vectorDotProduct(rayDir,rayDir)
  var b = 2.0 * c3dl.vectorDotProduct(v, rayDir);
  var c = c3dl.vectorDotProduct(v, v) - (sphereRadius * sphereRadius);

  var discriminant = (b * b) - (4.0 * a * c);

  // these will hold the intersection values.
  var q;

  // If the discriminant is less than 0, we cannot get the square root
  // since it would result in an imaginary number.	
  if (discriminant >= 0)
  {	
    var discriminantsqrt = Math.sqrt(discriminant);
	if (b < 0) {
     q = (-b - discriminantsqrt) / 2;
	}
	else {
     q = (-b + discriminantsqrt) / 2;
	}
    var t0 = q / a;
    var t1 = c / q;
    // make sure t0 is smaller than t1
    if (t0 > t1)
    {
        // if t0 is bigger than t1 swap them around
        var temp = t0;
        t0 = t1;
        t1 = temp;
    }
	if (t1 < 0) {
        return false;
    }
    if (t1 > 0 || t0 > 0) {
        hasIntersected = true;
	}
  }
  return hasIntersected;
}

/**
 Test if a ray defined by point 'orig' and direction 'dir' intersects with
 triangle defined by vertices vert0, vert1 and vert2.
 
 @param {Array} orig The ray's origin, which is a vector of 3 values.
 @param {Array} dir The ray's direction, a vector of 3 values.
 @param {Array} vert0 Vertex 0 of the triangle, going counter-clockwise.
 @param {Array} vert1 Vertex1 of the triangle
 @param {Array} vert2 Vertex2 of the triangle
 
 @returns {boolean} true if ray intersects with triangle, false otherwise.
 
 @private
 */
c3dl.rayIntersectsTriangle = function (orig, dir, vert0, vert1, vert2)
{
  // find vectors for the two edges of the triangle which share vert0
  var edge1 = c3dl.subtractVectors(vert1, vert0);
  var edge2 = c3dl.subtractVectors(vert2, vert0);

  // to calculate the area of the triangle:
  // first calculate the area of the parallelogram the two vectors define, 
  // then take half of that result leaving us with the area of the triangle.
  var area = 0.5 * c3dl.vectorLength(c3dl.vectorCrossProduct(edge1, edge2));

  // we'll need the normal of the triangle
  var norm = c3dl.vectorCrossProduct(edge1, edge2);

  // calculate this first to see if we can stop processing.
  var normDotDir = c3dl.vectorDotProduct(norm, dir);

  // if the dot product of two vectors returns 0, that means the vectors are perpendicular. If
  // that is the case, the ray will never intersect the plane and we can return false right here
  // to prevent further processing.
  if (normDotDir == 0)
  {
    return false;
  }

  // If the ray is not parallel to the plane, we need to do the following:
  // 1) find out at what point the ray will intersect the plane (which is defined by the triangle).
  // 2) find out if that point is within the triangle if it is, we have a ray/triangle intersection.
  // The parametric equation of a ray is:
  // R(t) = p + tu
  // where,
  // p is a point, which is the origin of the ray.
  // u is a vector, which is the direction of the ray. 
  // t is a scalar value, which scales the direction of the ray.
  // by passing in values greater than 0 into the equation, we can generate
  // different points along the ray.
  // The equation of a plane is:
  // Ax + By + Cz = D
  // where,
  // (ABC) is the normal of the plane.
  // (xyz) is a point on the plane.
  // we can re-write the equation for a plane
  // n . x = d
  // n is the normal of the plane.
  // x is a point on the plane.
  // So, with the equation of the plane and the ray, we can now
  // substitute the ray equation into the plane equation. What this does
  // is it tells us what value we need we have to set 't' to in order for
  // the ray to intersect the plane, which gives us the point of 
  // intersection. Or, what scalar value must we multiply the direction 
  // of the ray for it to intersect with the ray?
  // we substite R into the plane equation
  // n . R(t) = d
  // R(t) is expanded...
  // n . [p+tu] = d
  // distribute n
  // n.p + tn . u = d
  // We isolate t because we need to find out what scalar value the direction
  // of the ray needs to be scaled by for it to intersect with the plane.
  // t = (d - n.p) / (n.dir)
  //
  var d = c3dl.vectorDotProduct(norm, vert1);
  var normDotRayorig = c3dl.vectorDotProduct(norm, orig);
  var t = (d - normDotRayorig) / normDotDir;

  // Now we have 't', which is the scalar value needed to scale the ray's direction
  // for it to intersect with the plane the triangle defines.
  // We scale the ray's direction 't' times and then add it to the ray's origin to
  // get the point of intersection, POI.
  var scaledDir = c3dl.multiplyVector(dir, t);
  var POI = c3dl.addVectors(orig, scaledDir);

  // area of smaller triangles formed by the 3 vertices and the point of intersection	
  edge1 = c3dl.subtractVectors(vert0, POI);
  edge2 = c3dl.subtractVectors(vert1, POI);
  edge3 = c3dl.subtractVectors(vert2, POI);

  // get the area of the three triangles 'created' where the 
  // ray intersects the triangle's plane. 
  var area1 = 0.5 * c3dl.vectorLength(c3dl.vectorCrossProduct(edge1, edge2));
  var area2 = 0.5 * c3dl.vectorLength(c3dl.vectorCrossProduct(edge2, edge3));
  var area3 = 0.5 * c3dl.vectorLength(c3dl.vectorCrossProduct(edge3, edge1));

  // get the difference between the area of the triangle and the area of the three triangles
  // created where the user clicked. If the user clicked inside the triangle, the difference
  // should be near zero.
  var diff = area - (area1 + area2 + area3);

  // delete edg1, edge2, edge3, area1, area2, area3, normDotDir, normDotRayorig, t, POI, area;
  // since we have done quite a few calculations on floats, 
  // allow a small margin of error.
  return (Math.abs(diff) <= 0.0001);
}/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/


/**
 @class c3dl.PickingResult is contains the result of the user picking something
 in the scene. This object is created within the library and sent to the picking
 callback function. You can query things such as which objects were picked, which 
 canvas and which button was used for the pick.
 */
c3dl.PickingResult = function ()
{
  // NOTE
  // These functions are empty because we only want jsdoc toolkit creating the doc
  // files.  Within the picking code, we create an instance of this class and override
  // these functions. This is done because adding functions such as setButtonUsed, setObjectsHit, etc
  // which the picking code can call allows other code to call those methods as well.
  /**
   Get the mouse button that was used for the pick.
   
   @returns {int} the mouse button used for the pick.
   */
  this.getButtonUsed = function ()
  {
  }

  /**
   Get the canvas the user clicked on.
   
   @returns {HTMLComponent} the canvas the user clicked on.
   */
  this.getCanvas = function ()
  {
  }

  /**
   Get the list of objects which were picked. This list contains points,
   lines and collada objects.
   
   @returns {Array} References to objects which have been picked.
   */
  this.getObjects = function ()
  {
  }
}