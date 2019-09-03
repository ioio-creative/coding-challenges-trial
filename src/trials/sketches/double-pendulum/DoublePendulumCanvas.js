import React from 'react';
import P5Wrapper from 'components/p5/P5Wrapper';


const doublePendulum = (p5) => {
  p5.setup = _ => {

  };

  p5.draw = _ => {

  };

  p5.windowResized = _ => {

  }

  // test function, accesible from outside
  p5.test = _ => {
    console.log('testing -->');
    console.log(`sketch: ${p5.width}, ${p5.height}`);
    console.log(`canvas: ${canvas.width}, ${canvas.height}`);
  }
};


function DoublePendulumCanvas(props) {
  const { parentSelectFunc } = props;
  return <P5Wrapper
    sketch={doublePendulum}
    parentSelectFunc={parentSelectFunc}
  />
}


export default DoublePendulumCanvas;