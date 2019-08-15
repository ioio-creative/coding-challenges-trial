import React, { useState, useEffect } from 'react';
import MyFirstLoadingComponent from './MyFirstLoadingComponent';


// https://medium.com/@magbicaleman/intro-to-dynamic-import-in-create-react-app-6305bb397c46
function Dynamic(props) {
  const { loaderPromiseFunc, loadingComponent, timeoutTimeInMs = 5000, ...rest } = props;
  // https://github.com/facebook/react/issues/15209
  const [MyModule, setMyModule] = useState(_ => loadingComponent);
  const [componentParams, setComponentParams] = useState({ isLoading: true });

  const timeOutPromise = useCallback((_, reject) => {
    setTimeout(_ => {
      console.log('delay resolve trigger!!!');
      reject({
        code: 'TIMEOUT',
        message: 'Timeout when loading module'
      });
    }, timeoutTimeInMs)
  }, [timeoutTimeInMs]);

  useEffect(_ => {
    Promise.race([
      loaderPromiseFunc(),
      new Promise(timeOutPromise)
    ])
    // loaderPromiseFunc()
      .then((aModule) => {
        setComponentParams(rest);
        setMyModule(_ => aModule.default);
      }, (error) => {
        setComponentParams({
          error: {
            code: error.code,
            message: message
          }
        });
      });
  }, [loaderPromiseFunc, timeOutPromise]);

  return (
    <>
      {MyModule && <MyModule {...componentParams} />}
    </>
  );
}


function asyncLoadingComponent(loaderPromiseFunc, loadingComponent = MyFirstLoadingComponent, timeoutTimeInMs = 5000) {
  return (props) => (
    <Dynamic
      loaderPromiseFunc={loaderPromiseFunc}
      loadingComponent={loadingComponent}
      timeoutTimeInMs = {timeoutTimeInMs}
      {...props}
    />
  );
};


export default asyncLoadingComponent;