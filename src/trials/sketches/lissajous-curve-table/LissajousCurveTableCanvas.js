import React from 'react';
import 'p5/lib/addons/p5.dom';  // https://github.com/processing/p5.js-sound/issues/137

import P5Wrapper from 'components/p5/P5Wrapper';
import ReferenceCircle from './ReferenceCircle';
import Curve from './Curve';

import { memoedSin, memoedCos, getMemoedP5Sin, getMemoedP5Cos } from 'utils/memoize/memoedFunctions';


// http://juanddd.com/code/integrate-p5js-with-reactjs-on-es6
const lissajousCurveTable = (p5) => {
  // constants
  const itemWidth = 80;
  const halfItemWidth = Math.floor(itemWidth * 0.5);
  const itemDiameter = itemWidth - 10;
  const itemRadius = Math.floor(itemDiameter * 0.5);

  const backgroundColor = 0;
  const color = 255;  

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

  let frameRateSlider;
  const frameRateSliderMin = 1;
  const frameRateSliderMax = 60;
  const frameRateSliderStart = p5.map(1, 0, 1, frameRateSliderMin, frameRateSliderMax);

  let angularPhaseIncSlider;
  const angularPhaseIncSliderMin = 1;
  const angularPhaseIncSliderMax = 400;
  const angularPhaseIncSliderStart = p5.map(0.5, 0, 1, angularPhaseIncSliderMin, angularPhaseIncSliderMax);

  let sliders;

  // variables
  let canvasWidth;
  let canvasHeight;
  let halfCanvasWidth;
  let halfCanvasHeight;

  let cols;
  let rows;

  let canvas = null;
  let angularPhase = 0;

  let horizontalCircles;
  let verticalCircles;
  let allRefCircles;
  let curves = [];

  let numOfCyclesPassed = 0;

  //let angularPhaseInc = 0.05 * p5.TWO_PI;
  let angularPhaseInc = 0.005 * p5.TWO_PI;

  const setFrameRate = _ => {
    const frameRateSliderValue = frameRateSlider.value();
    p5.frameRate(frameRateSliderValue);
  };

  const setAngularPhaseInc = _ => {
    const angularPhaseIncSliderValue = angularPhaseIncSlider.value();
    angularPhaseInc = p5.TWO_PI * (1 / angularPhaseIncSliderValue);
  };

  const handleWindowResize = _ => {
    canvasWidth = window.innerWidth;//p5.windowWidth;
    canvasHeight = window.innerHeight;//p5.windowHeight;
    halfCanvasWidth = Math.floor(canvasWidth * 0.5);
    halfCanvasHeight = Math.floor(canvasHeight * 0.5);

    cols = Math.floor(canvasWidth / itemWidth) - 1;
    rows = Math.floor(canvasHeight / itemWidth) - 1;

    if (canvas) {
      p5.resizeCanvas(canvasWidth, canvasHeight);
    } else {
      canvas = p5.createCanvas(canvasWidth, canvasHeight, renderer);
    }

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

    curves = [];
    verticalCircles.forEach(verticalCircle => {
      horizontalCircles.forEach(horizontalCircle => {
        curves.push(new Curve(p5, color, horizontalCircle, verticalCircle));
      });
    });
    
    sliders.forEach((slider, idx) => {
      slider.position(0.01 * canvasWidth, (0.01 + idx * 0.05) * canvasHeight);
    });    
  };

  p5.setup = _ => {
    p5.background(0);
    frameRateSlider = p5.createSlider(frameRateSliderMin, frameRateSliderMax, frameRateSliderStart);
    angularPhaseIncSlider = p5.createSlider(angularPhaseIncSliderMin, angularPhaseIncSliderMax, angularPhaseIncSliderStart);
    sliders = [frameRateSlider, angularPhaseIncSlider];
    handleWindowResize();    
  };

  p5.draw = _ => {
    setFrameRate();
    setAngularPhaseInc();
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
      //this.asjglkaj();
      numOfCyclesPassed = newNumOfCyclesPassed;
      curves.forEach(curve => {
        curve.reset();
      });
    }
  }

  p5.windowResized = _ => {
    handleWindowResize();
  }

  // test function, accesible from outside
  p5.test = _ => {
    console.log('testing -->');
    console.log(`sketch: ${p5.width}, ${p5.height}`);
    console.log(`canvas: ${canvas.width}, ${canvas.height}`);
  }
};

function LissajousCurveTableCanvas(props) {
  const { parentSelectFunc } = props;
  return (
    <P5Wrapper 
      sketch={lissajousCurveTable}
      parentSelectFunc={parentSelectFunc}
    />
  );
}


export default LissajousCurveTableCanvas;