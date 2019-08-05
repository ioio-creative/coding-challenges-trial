class ReferenceCircle {
  constructor(p5, cx, cy, radius, angularVel, isHorizontalRef, color, cos, sin) {
    this.p5 = p5;
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    this.diameter = radius * 2;
    this.pointSize = 0.1 * this.diameter;
    this.angularVel = angularVel;
    this.isHorizontalRef = isHorizontalRef;
    this.color = color;
    this.cos = cos || p5.cos;
    this.sin = sin || p5.sin;    

    // public variables
    this.absX = 0;
    this.absY = 0;
  }

  draw(angularPhase) {
    const {
      p5, cx, cy, radius, diameter, pointSize, angularVel, isHorizontalRef, color, cos, sin
    } = this;

    p5.strokeWeight(1);
    p5.stroke(color);
    p5.ellipse(cx, cy, diameter, diameter);

    const relX = radius * cos(angularVel * angularPhase - p5.PI);
    const relY = radius * sin(angularVel * angularPhase - p5.PI);
    this.absX = cx + relX;
    this.absY = cy + relY;

    p5.strokeWeight(pointSize);
    p5.stroke(color);
    p5.point(this.absX, this.absY);

    p5.stroke(color, 150);
    p5.strokeWeight(1);
    if (isHorizontalRef) {
      p5.line(this.absX, 0, this.absX, p5.height);
    } else {
      p5.line(0, this.absY, p5.width, this.absY);
    }
  }
}


export default ReferenceCircle;