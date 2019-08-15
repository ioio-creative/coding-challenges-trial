import React, { useState, useEffect, useCallback } from 'react';

import MyFirstLoadingComponent from './MyFirstLoadingComponent';
import isFunction from 'utils/js/isFunction';


// https://medium.com/@magbicaleman/intro-to-dynamic-import-in-create-react-app-6305bb397c46
function Dynamic(props) {
  const { loader, loading, delay, timeout, render, ...rest } = props;
  // https://github.com/facebook/react/issues/15209
  const [loaded, setLoaded] = useState(null);
  const [isTimeout, setIsTimeout] = useState(false);
  const [isPastDelay, setIsPastDelay] = useState(false);
  const [error, setError] = useState(null);

  const timeOutPromise = useCallback((_, reject) => {
    setTimeout(_ => {
      console.log('delay resolve trigger!!!');
      reject({
        code: 'TIMEOUT',
        message: 'Timeout when loading module'
      });
    }, timeout)
  }, [timeout]);

  useEffect(_ => {
    Promise.race([
      loader(),
      new Promise(timeOutPromise)
    ])
    // loader()
      .then((loaded) => {
        setLoaded(loaded);
      })
      .catch((err) => {
        if (err.code === 'TIMEOUT') {
          setIsTimeout(true);
        } else {
          setError(err);
        }
      });
  }, [loader, timeOutPromise]);

  const Loading = loading;
  let LoadedComponent = null;
  if (loaded) {
    if (isFunction(render)) {
      LoadedComponent = (props) => render(loaded, props);
    } else {
      LoadedComponent = loaded.default;
    }
  }

  const isShowLoading = error || isTimeout || isPastDelay;

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
          (LoadedComponent && <LoadedComponent { ...rest } />)
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
      delay = {delay}
      timeout = {timeout}
      render = {render}
      {...props}
    />
  );
};


export default asyncLoadingComponent;