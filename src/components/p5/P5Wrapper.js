import React, { useEffect } from 'react';
import p5 from 'p5';

import { invokeIfIsFunction } from 'utils/js/isFunction';


// http://juanddd.com/code/integrate-p5js-with-reactjs-on-es6
function P5Wrapper(props) {
  const { sketch, parentSelectFunc } = props;

  useEffect(_ => {
    const mySketch = new p5(sketch, invokeIfIsFunction(parentSelectFunc));
    invokeIfIsFunction(mySketch.test);
    return()=>{
      mySketch.remove();
    }
  }, [sketch, parentSelectFunc]);

  return <React.Fragment />;
}


export default P5Wrapper;