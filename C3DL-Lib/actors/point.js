/*
  Copyright (c) 2009 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class c3dl.Point is an object with a position and color which will be
 rendered using WebGL's built-in point rendering or rendered as sphere 
 meshes.<br />
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
//startdebugblock
    if (pos.length == 3)
    {
//closedebugblock
      this.position = c3dl.copyObj(pos);
//startdebugblock	  
    }
    else
    {
      c3dl.debug.logWarning("invalid value passed to Point::setPosition()");
    }
//closedebugblock	
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
//startdebugblock
    if (color.length == 3)
    {
//closedebugblock
      this.color = c3dl.copyObj(color);
//startdebugblock
    }
    else
    {
      c3dl.debug.logWarning("invalid value passed to Point::setColor()");
    }
//closedebugblock	
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
}