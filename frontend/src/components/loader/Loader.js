import React from 'react'

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__element first">
        <div className="loader__circle first"></div>
      </div>
      <div className="loader__element second">
        <div className="loader__circle second"></div>
      </div>
    </div>
  );
}

export default Loader;