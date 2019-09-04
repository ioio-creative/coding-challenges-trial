import React from 'react';
import P5Wrapper from 'components/p5/P5Wrapper';

var w = window.innerWidth;
var h = window.innerHeight;
var boids = [];
class bird {
  constructor(p5) {
    this.p5 = p5;
    this.nr = 50;
    this.maxSpeed = 6;
    this.maxForce = .05;
    this.acceleration = p5.createVector(0, 0);
    this.position = p5.createVector(p5.random(w), p5.random(h));
    this.velocity = p5.createVector(p5.random(-this.maxSpeed, this.maxSpeed), p5.random(-this.maxSpeed, this.maxSpeed));
    this.radius = 20;
  }

  outOfScreen() {
    if (this.position.x > w + this.radius)
      this.position.x = -this.radius;
    else if (this.position.x < -this.radius)
      this.position.x = w + this.radius;

    if (this.position.y > h + this.radius)
      this.position.y = -this.radius;
    else if (this.position.y < -this.radius)
      this.position.y = h + this.radius;
  }

  align() {
    var neighborhoodRadius = 100;
    var avg = this.p5.createVector(0, 0);
    var total = 0;

    for (var i = 0; i < boids.length; i++) {
      var other = boids[i];
      if (other !== this) {
        var d = this.position.dist(other.position);
        if (d < neighborhoodRadius) {
          avg.add(other.velocity);
          total++;
        }
      }
    }

    if (total > 0) {
      avg.div(total);
      avg.normalize();
      avg.mult(this.maxSpeed);
      let steer = avg.sub(this.velocity);
      steer.limit(this.maxForce);
      return steer;
    }

    return avg;
  }

  separation() {
    var neighborhoodRadius = 50;
    var avg = this.p5.createVector(0, 0);
    var total = 0;

    for (var i = 0; i < boids.length; i++) {
      var other = boids[i];
      if (other !== this) {
        var d = this.position.dist(other.position);
        if (d < neighborhoodRadius) {
          var diff = this.position.sub(other.position);
          diff.normalize();
          diff.div(d);
          avg.add(diff);
          total++;
        }
      }
    }

    if (total > 0) {
      avg.div(total);
    }
    if (avg.mag() > 0) {
      avg.normalize();
      avg.mult(this.maxSpeed);
      avg.sub(this.velocity);
      avg.limit(this.maxForce * 2);
    }

    return avg;
  }

  cohesion() {
    var neighborhoodRadius = 150;
    var avg = this.p5.createVector(0, 0);
    var total = 0;

    for (var i = 0; i < boids.length; i++) {
      var other = boids[i];
      if (other !== this) {
        var d = this.position.dist(other.position);
        if ((d > 0) && d < neighborhoodRadius) {
          avg.add(other.position);
          total++;
        }
      }
    }

    if (total > 0) {
      avg.div(total);
      let desired = avg.sub(this.position);
      desired.normalize();
      desired.mult(this.maxSpeed);
      let steer = desired.sub(this.velocity);
      steer.limit(this.maxForce);
      avg = steer;
    }

    return avg;
  }

  flock() {
    var alignment = this.align();
    var cohesion = this.cohesion();
    var separation = this.separation();
    this.acceleration.add(separation);
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.limit(this.maxSpeed);
    this.velocity.add(this.acceleration);

    this.acceleration.mult(0);

    this.outOfScreen();
  }

  draw() {
    var angle = this.velocity.heading() + this.p5.radians(90);
    this.p5.fill('#fff');

    this.p5.push();
    this.p5.translate(this.position.x, this.position.y);
    this.p5.rotate(angle);
    this.p5.triangle(0, -this.radius, -this.radius * .5, this.radius, this.radius * .5, this.radius);
    this.p5.pop();
  }
}

const sketch = (p5) => {
  var w = window.innerWidth;
  var h = window.innerHeight;
  var numOfBirds = 60;



  p5.setup = () => {
    p5.createCanvas(w, h);

    for (var i = 0; i < numOfBirds; i++) {
      boids.push(new bird(p5));
    }
  }

  p5.draw = () => {
    p5.background('#222');
    p5.noStroke();
    for (var i = 0; i < boids.length; i++) {
      var bird = boids[i];
      bird.flock();
      bird.update();
      bird.draw();
    }
  }
}

const Flocking = (props) => {
  return <P5Wrapper sketch={sketch} />
}


export default Flocking;