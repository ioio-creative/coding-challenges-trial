import React, { useState, useEffect } from 'react';
import MyFirstLoadingComponent from './MyFirstLoadingComponent';


// https://medium.com/@magbicaleman/intro-to-dynamic-import-in-create-react-app-6305bb397c46
function Dynamic(props) {
  const { loaderFunc, loadingComponent, timeoutTimeInMs = 5000, ...rest } = props;
  const [MyModule, setMyModule] = useState(() => loadingComponent);
  const [componentParams, setComponentParams] = useState({isLoading: true});

  const timeOutPromise = useCallback((_, reject) => {
    setTimeout(() => {
      console.log('delay resolve trigger!!!');
      reject({
        code: 'TIMEOUT',
        message: 'Timeout when loading module'
      });
    }, timeoutTimeInMs)
  }, [timeoutTimeInMs]);
  useEffect(_ => {
    Promise.race([
      loaderFunc(),
      new Promise(timeOutPromise)
    ])
    // loaderFunc()
      .then((aModule) => {
        // setMyModule(aModule);
        setComponentParams(rest);
        setMyModule(()=>aModule.default);
      }, (error) => {
        setComponentParams({
          error: error.code,
          message: error.message
        });
      });
  }, [loaderFunc, timeOutPromise]);
  // const Component = myModule ? myModule.default : null;
  // const Loading = loadingComponent;
  return (
    <>
      {/*Component ? <Component {...rest} /> : <Loading />*/}
      {MyModule && <MyModule {...componentParams} />}
    </>
  );
}


function asyncLoadingComponent(loaderFunc, loadingComponent = MyFirstLoadingComponent, timeoutTimeInMs = 5000) {
  return (props) => (
    <Dynamic
      loaderFunc={loaderFunc}
      loadingComponent={loadingComponent}
      timeoutTimeInMs = {timeoutTimeInMs}
      {...props}
    />
  );
};


export default asyncLoadingComponent;