import React from 'react';
import P5Wrapper from 'components/p5/P5Wrapper';

import ReferenceCircle from './ReferenceCircle';


// http://juanddd.com/code/integrate-p5js-with-reactjs-on-es6
const lissajousCurveTable = (p5) => {
  let canvas;

  const canvasWidth = p5.windowWidth;
  const canvasHeight = p5.windowHeight;
  const halfCanvasWidth = Math.floor(canvasWidth * 0.5);
  const halfCanvasHeight = Math.floor(canvasHeight * 0.5);

  let angularPhase = 0;
  const itemWidth = 80;
  const halfItemWidth = Math.floor(itemWidth * 0.5);
  const itemDiameter = itemWidth - 10;
  const itemRadius = Math.floor(itemDiameter * 0.5);
  const cols = Math.floor(canvasWidth / (itemWidth - 1));

  let horizontalCircles;


  p5.setup = _ => {
    canvas = p5.createCanvas(canvasWidth, canvasHeight, p5.WEBGL);
    p5.background(0);

    // https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
    horizontalCircles = Array(cols).fill(null).map((_, i) => {
      let cx = Math.floor((0.5 + i) * itemWidth);
      let cy = halfItemWidth;
      let angularVel = i + 1;
      return new ReferenceCircle(p5, cx, cy, itemRadius, angularVel, true);
    });
  };

  p5.draw = _ => {
    p5.background(0);
    p5.stroke(255);
    p5.noFill();

    p5.translate(-halfCanvasWidth, -halfCanvasHeight);
    horizontalCircles.forEach(horizontalCircle => {
      horizontalCircle.draw(angularPhase);
    });

    angularPhase += 0.01;
  }

  // test function, accesible from outside
  p5.test = _ => {
    console.log('testing -->');
    console.log(`canvas: ${canvas.width}, ${canvas.height}`);
  }
};

function LissajousCurveTableCanvas(props) {
  return <P5Wrapper sketch={lissajousCurveTable} />
}


export default LissajousCurveTableCanvas;