import React, { useState, useEffect, useCallback, useRef } from 'react';

import MyFirstLoadingComponent from './MyFirstLoadingComponent';
import isFunction from 'utils/js/isFunction';
//import sleep from 'utils/sleep';


// https://medium.com/@magbicaleman/intro-to-dynamic-import-in-create-react-app-6305bb397c46
function Dynamic(props) {
  const { loader, loading, delay, timeout, render, ...rest } = props;
  // https://github.com/facebook/react/issues/15209
  const [loaded, setLoaded] = useState(null);
  const [isTimeout, setIsTimeout] = useState(false);
  const [isPastDelay, setIsPastDelay] = useState(false);
  const [error, setError] = useState(null);

  const timeoutHandle = useRef(null);
  const timeoutPromise = useCallback((_, reject) => {
    timeoutHandle.current = setTimeout(_ => {
      console.log('Dynamic: delay resolve trigger!!!');
      reject({
        code: 'TIMEOUT',
        message: 'Dynamic: Timeout when loading module'
      });
    }, timeout)
  }, [timeout]);

  // for timeout functionality: race between loader and timeoutPromise
  useEffect(_ => {
    // use a variable to store whether the loading component is still mounting or not
    let isSubscribed = true;
    Promise.race([
      // // for testing
      // (async _ => {
      //   await sleep(timeout - 1000);
      //   return await loader();
      // })(),
      loader(),
      new Promise(timeoutPromise)
    ])
    // loader()
      .then((loaded) => {
        if (isSubscribed) {
          setLoaded(loaded);
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          if (err.code === 'TIMEOUT') {
            setIsTimeout(true);
          } else {
            setError(err);
          }
        }
      });
    return _ => {
      isSubscribed = false;
      if (timeoutHandle.current) {
        clearTimeout(timeoutHandle.current);
        timeoutHandle.current = null;
      }
    };
  }, [loader, timeoutPromise]);

  // for delay functionality: setIsPastDelay
  const delayTimeoutHandle = useRef(null);
  useEffect(_ => {
    delayTimeoutHandle.current = setTimeout(_ => {
      console.log('Dynamic: delay passed');
      setIsPastDelay(true);
    }, delay);
    return _ => {
      if (delayTimeoutHandle.current) {
        clearTimeout(delayTimeoutHandle.current);
      }
    }
  }, [delay]);

  const Loading = loading;

  let LoadedComponent = null;
  if (loaded) {
    if (isFunction(render)) {
      LoadedComponent = (props) => render(loaded, props);
    } else {
      LoadedComponent = loaded.default;
    }
  }

  const isShowLoading = !Boolean(LoadedComponent);

  return (
    <>
      {
        isShowLoading ?
        <Loading
          error={error}
          timeout={isTimeout}
          pastDelay={isPastDelay}
        />
        :
        <LoadedComponent { ...rest } />
      }
    </>
  );
}


// https://github.com/jamiebuilds/react-loadable
// loader is a function that return a Promise, e.g. dynamic import(), fetch(), etc.
// loading is a Component
// delay in millis
// timeout in millis
// render is a function that accepts (loaded, props) and returns a React element. loaded is what returned from loader
function asyncLoadingComponent(loader, loading = MyFirstLoadingComponent, delay = 200, timeout = 5000, render = null) {
  return (props) => (
    <Dynamic
      loader={loader}
      loading={loading}
      delay = {delay/*timeout - 3000*/}
      timeout = {timeout}
      render = {render}
      {...props}
    />
  );
};


export default asyncLoadingComponent;