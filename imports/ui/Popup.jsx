import React from 'react';

const Popup= ({show}) => {
  return (
    <div className={show ? "popup" : "hide"}>
      <p>Please sign in or sign up</p>
    </div>
  );
};

export default Popup;
