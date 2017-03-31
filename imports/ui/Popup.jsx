import React from 'react';

const Popup= () => {
  if (!Meteor.user()) {
    return (
      <div className="popup">
        <p>Please sign in or sign up</p>
      </div>
    );
  } else {
    return <div></div>
  }
};

export default Popup;
