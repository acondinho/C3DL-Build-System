/*
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
}