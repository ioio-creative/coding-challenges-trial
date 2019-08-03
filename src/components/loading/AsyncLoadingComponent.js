import React from 'react';
import Dynamic from './Dynamic';
import MyFirstLoadingComponent from './MyFirstLoadingComponent';


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