/**
 * @author mrdoob / http://mrdoob.com
 * @author willy-vvu / http://willy-vvu.github.io
 */

THREE.MorphAnimation = function ( mesh ) {

	this.mesh = mesh;
	this.frames = mesh.morphTargetInfluences.length;
	this.currentTime = 0;
	this.duration = 1000;
	this.loop = true;
	this.lastFrame = 0;
	this.currentFrame = 0;

	this.isPlaying = false;

};

THREE.MorphAnimation.prototype = {

	constructor: THREE.MorphAnimation,

	play: function () {

		this.isPlaying = true;

	},

	pause: function () {

		this.isPlaying = false;

	},

	update: function ( delta ) {

		if ( this.isPlaying === false ) return;

		this.currentTime += delta;

		if ( this.loop === true && this.currentTime > this.duration ) {

			this.currentTime %= this.duration;

		}

		this.currentTime = Math.min( this.currentTime, this.duration );

		var interpolation = this.duration / this.frames;
		var frame = Math.floor( this.currentTime / interpolation );

		if ( frame != this.currentFrame ) {

			this.mesh.morphTargetInfluences[ this.lastFrame ] = 0;
			this.mesh.morphTargetInfluences[ this.currentFrame ] = 1;
			this.mesh.morphTargetInfluences[ frame ] = 0;

			this.lastFrame = this.currentFrame;
			this.currentFrame = frame;

		}

		this.mesh.morphTargetInfluences[ frame ] = ( this.currentTime % interpolation ) / interpolation;
		this.mesh.morphTargetInfluences[ this.lastFrame ] = 1 - this.mesh.morphTargetInfluences[ frame ];

	}

};
