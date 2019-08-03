import React from 'react';


function MyFirstLoadingComponent(props) {
  const { isLoading, error } = props;
  // Handle the loading state
  if (isLoading) {
    return <div id="loading-screen">Now Loading ...</div>;
  }
  // Handle the error state
  else if (error) {
    console.error(error);
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  else {
    return null;
  }
};


export default  MyFirstLoadingComponent;