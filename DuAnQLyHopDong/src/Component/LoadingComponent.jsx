import React from 'react'
import ReactLoading from 'react-loading';

const LoadingComponent = () => {
  return (
    <div className="overL">
      <ReactLoading type="spinningBubbles" color="#ffff" height={100} width={100} className="iconLoading" />
      <div className="bg-overlay" />
    </div>
  )
}

export default LoadingComponent