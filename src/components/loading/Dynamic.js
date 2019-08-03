import React, { useState, useEffect } from 'react';


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
    <div>
      {Component ? <Component {...rest} /> : <Loading />}
    </div>
  );
}


export default Dynamic;