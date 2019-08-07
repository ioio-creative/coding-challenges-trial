class Curve {
  constructor(p5, color, refCircleForX, refCircleForY) {
    this.p5 = p5;
    this.color = color;
    this.refCircleForX = refCircleForX;
    this.refCircleForY = refCircleForY;
    this.pointSize = this.refCircleForX.pointSize;

    this.path = [];

    this.reset();
  }

  addPoint() {
    const currPoint = this.p5.createVector(this.refCircleForX.absX, this.refCircleForY.absY);
    this.path.push(currPoint);
    return currPoint;
  }

  drawPoint(point) {
    const {
      p5, pointSize, color
    } = this;
    p5.strokeWeight(pointSize);
    p5.stroke(color);
    p5.point(point.x, point.y);
  }

  drawCurve() {
    const {
      p5, color, path
    } = this;

    p5.stroke(color);
    p5.strokeWeight(1);
    p5.noFill();

    p5.beginShape();
    for (let point of path) {
      //p5.vertex(point.x, point.y);
      p5.curveVertex(point.x, point.y);
    }
    p5.endShape();
  }

  reset() {
    this.path = [];
  }

  draw() {
    const currPoint = this.addPoint();
    this.drawCurve();
    this.drawPoint(currPoint);
  }
}


export default Curve;