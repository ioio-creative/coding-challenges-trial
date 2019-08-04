class ReferenceCircle {
  constructor(p5, cx, cy, radius, angularVel, isHorizontalRef) {
    this.p5 = p5;
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    this.diameter = radius * 2;
    this.angularVel = angularVel;
    this.isHorizontalRef = isHorizontalRef;

    // constants
    this.color = 255;

    // public variables
    this.pointX = 0;
    this.pointY = 0;
  }

  draw(angularPhase) {
    const {
      p5, cx, cy, radius, diameter, angularVel, isHorizontalRef, color
    } = this;

    p5.strokeWeight(1);
    p5.stroke(color);
    p5.ellipse(cx, cy, diameter, diameter);

    const x = radius * p5.cos(angularVel * angularPhase - p5.HALF_PI);
    const y = radius * p5.sin(angularVel * angularPhase - p5.HALF_PI);
    this.pointX = cx + x;
    this.pointY = cy + y;

    p5.strokeWeight(8);
    p5.stroke(color);
    p5.point(this.pointX, this.pointY);

    p5.stroke(color, 50);
    p5.strokeWeight(1);
    if (isHorizontalRef) {
      p5.line(this.pointX, 0, this.pointX, p5.height);
    } else {
      p5.line(0, this.pointY, p5.width, this.pointY);
    }
  }
}


export default ReferenceCircle;