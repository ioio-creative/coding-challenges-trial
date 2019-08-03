import React, { useState, useEffect } from 'react';
import MyFirstLoadingComponent from './MyFirstLoadingComponent';


// https://medium.com/@magbicaleman/intro-to-dynamic-import-in-create-react-app-6305bb397c46
function Dynamic(props) {
  const { loaderFunc, loadingComponent, ...rest } = props;
  const [myModule, setMyModule] = useState(null);
  useEffect(_ => {
    loaderFunc()
      .then((aModule) => {
        setMyModule(aModule);
      });
  }, [loaderFunc]);
  const Component = myModule ? myModule.default : null;
  const Loading = loadingComponent;
  return (
    <>
      {Component ? <Component {...rest} /> : <Loading />}
    </>
  );
}


function asyncLoadingComponent(loaderFunc, loadingComponent = MyFirstLoadingComponent) {
  return (props) => (
    <Dynamic
      loaderFunc={loaderFunc}
      loadingComponent={loadingComponent}
      {...props}
    />
  );
};


export default asyncLoadingComponent;