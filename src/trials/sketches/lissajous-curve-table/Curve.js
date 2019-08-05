class Curve {
  constructor(p5, color, refCircleForX, refCircleForY) {
    this.p5 = p5;
    this.color = color;
    this.refCircleForX = refCircleForX;
    this.refCircleForY = refCircleForY;
    this.pointSize = this.refCircleForX.pointSize;

    this.currPoint = null;
    this.path = [];    

    this.reset();
  }

  addPoint() {
    this.currPoint = this.p5.createVector(this.refCircleForX.absX, this.refCircleForY.absY);
    this.path.push(this.currPoint);
  }

  reset() {
    this.currPoint = null;
    this.path = [];
  }

  draw() {
    const {
      p5, color, pointSize, currPoint, path
    } = this;

    this.addPoint();

    p5.stroke(color);
    p5.strokeWeight(1);
    p5.noFill();

    p5.beginShape();
    for (let point of path) {
      p5.vertex(point.x, point.y);
    }
    p5.endShape();

    if (currPoint) {
      p5.strokeWeight(pointSize);
      p5.stroke(color);
      p5.point(currPoint.x, currPoint.y);
    }
  }
}


export default Curve;