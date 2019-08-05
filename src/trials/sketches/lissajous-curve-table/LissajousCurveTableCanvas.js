import React from 'react';
import P5Wrapper from 'components/p5/P5Wrapper';

import ReferenceCircle from './ReferenceCircle';
import Curve from './Curve';

import { memoedSin, memoedCos, getMemoedP5Sin, getMemoedP5Cos } from 'utils/memoize/memoedFunctions';


// http://juanddd.com/code/integrate-p5js-with-reactjs-on-es6
const lissajousCurveTable = (p5) => {
  // constants
  const canvasWidth = p5.windowWidth;
  const canvasHeight = p5.windowHeight;
  const halfCanvasWidth = Math.floor(canvasWidth * 0.5);
  const halfCanvasHeight = Math.floor(canvasHeight * 0.5);

  const itemWidth = 80;
  const halfItemWidth = Math.floor(itemWidth * 0.5);
  const itemDiameter = itemWidth - 10;
  const itemRadius = Math.floor(itemDiameter * 0.5);
  const cols = Math.floor(canvasWidth / itemWidth) - 1;
  const rows = Math.floor(canvasHeight / itemWidth) - 1;

  const backgroundColor = 0;
  const color = 255;

  //const angularPhaseInc = 0.05 * p5.TWO_PI;
  const angularPhaseInc = 0.005 * p5.TWO_PI;

  const renderer = p5.P2D;

  const isUseMemoedTrigo = false;
  const isUseP5Trigo = true;
  let sin, cos;
  if (isUseMemoedTrigo) {
    sin = isUseP5Trigo ? getMemoedP5Sin(p5) : memoedSin;
    cos = isUseP5Trigo ? getMemoedP5Cos(p5) : memoedCos;
  } else {
    sin = isUseP5Trigo ? p5.sin.bind(p5) : Math.sin;
    cos = isUseP5Trigo ? p5.cos.bind(p5) : Math.cos;
  }

  // variables
  let canvas;
  let angularPhase = 0;

  let horizontalCircles;
  let verticalCircles;
  let allRefCircles;
  let curves = [];

  let numOfCyclesPassed = 0;


  p5.setup = _ => {
    canvas = p5.createCanvas(canvasWidth, canvasHeight, renderer);
    p5.background(0);

    // https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
    horizontalCircles = Array(cols).fill(null).map((_, i) => {
      let cx = Math.floor((1.5 + i) * itemWidth);
      let cy = halfItemWidth;
      let angularVel = i + 1;
      return new ReferenceCircle(p5, cx, cy, itemRadius, angularVel, true, color, sin, cos);
    });

    verticalCircles = Array(rows).fill(null).map((_, i) => {
      let cx = halfItemWidth;
      let cy = Math.floor((1.5 + i) * itemWidth);
      let angularVel = i + 1;
      return new ReferenceCircle(p5, cx, cy, itemRadius, angularVel, false, color, sin, cos);
    });

    allRefCircles = horizontalCircles.concat(verticalCircles);

    verticalCircles.forEach(verticalCircle => {
      horizontalCircles.forEach(horizontalCircle => {
        curves.push(new Curve(p5, color, horizontalCircle, verticalCircle));
      });
    });
  };

  p5.draw = _ => {    
    const newNumOfCyclesPassed = Math.floor(angularPhase / p5.TWO_PI);

    p5.background(backgroundColor);
    p5.stroke(color);
    p5.noFill();

    if (renderer === p5.WEBGL) {
      p5.translate(-halfCanvasWidth, -halfCanvasHeight);
    }
    allRefCircles.forEach(refCircle => {
      refCircle.draw(angularPhase);
    });

    curves.forEach(curve => {
      curve.draw(numOfCyclesPassed);
    });

    angularPhase += angularPhaseInc;

    if (newNumOfCyclesPassed !== numOfCyclesPassed) {
      this.asjglkaj();
      numOfCyclesPassed = newNumOfCyclesPassed;
      curves.forEach(curve => {
        curve.reset();
      });      
    }
  }

  // test function, accesible from outside
  p5.test = _ => {
    console.log('testing -->');
    console.log(`sketch: ${p5.width}, ${p5.height}`);
    console.log(`canvas: ${canvas.width}, ${canvas.height}`);
  }
};

function LissajousCurveTableCanvas(props) {
  return <P5Wrapper sketch={lissajousCurveTable} />
}


export default LissajousCurveTableCanvas;