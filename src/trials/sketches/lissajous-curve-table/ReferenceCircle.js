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

  drawCircle() {
    const {
      p5, cx, cy, diameter, color
    } = this;
    p5.strokeWeight(1);
    p5.stroke(color);
    p5.ellipse(cx, cy, diameter, diameter);
  }

  calculateCurrPoint(angularPhase) {
    const {
      p5, cx, cy, radius, angularVel, cos, sin
    } = this;
    const relX = radius * cos(angularVel * angularPhase - p5.PI);
    const relY = radius * sin(angularVel * angularPhase - p5.PI);
    this.absX = cx + relX;
    this.absY = cy + relY;
  }

  drawCurrPoint() {
    const {
      p5, pointSize, color, absX, absY
    } = this;
    p5.strokeWeight(pointSize);
    p5.stroke(color);
    p5.point(absX, absY);
  }

  drawReferenceLine() {
    const {
      p5, isHorizontalRef, color
    } = this;
    p5.stroke(color, 150);
    p5.strokeWeight(1);
    if (isHorizontalRef) {
      p5.line(this.absX, 0, this.absX, p5.height);
    } else {
      p5.line(0, this.absY, p5.width, this.absY);
    }
  }

  draw(angularPhase) {
    this.drawCircle();
    this.calculateCurrPoint(angularPhase);
    this.drawCurrPoint();
    this.drawReferenceLine();
  }
}


export default ReferenceCircle;