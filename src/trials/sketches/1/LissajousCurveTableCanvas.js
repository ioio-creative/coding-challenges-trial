import React from 'react';
import P5Wrapper from 'components/p5/P5Wrapper';


// http://juanddd.com/code/integrate-p5js-with-reactjs-on-es6
const lissajousCurveTable = (p5) => {
  let canvas;

  const canvasWidth = p5.windowWidth;
  const canvasHeight = p5.windowHeight;

  p5.setup = _ => {
    canvas = p5.createCanvas(canvasWidth, canvasHeight, p5.WEBGL);
    p5.background(0, 0, 0);
  };

  p5.draw = _ => {

  }

  // test function, accesible from outside
  p5.test = () => {
    console.log('testing -->');
    console.log(`canvas: ${canvas.width}, ${canvas.height}`);
  }
};

function LissajousCurveTableCanvas(props) {
  return <P5Wrapper sketch={lissajousCurveTable} />
}


export default LissajousCurveTableCanvas;