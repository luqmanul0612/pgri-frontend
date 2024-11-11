import React from 'react'
import LoadingDots from './LoadingDots'

const LoadingDotTable = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center ml-56 -mt-28">
    <div className="bg-white shadow-lg w-[150px] rounded-lg px-5">
      <div className="flex items-center justify-center p-5">
        <LoadingDots />
      </div>
    </div>
  </div>
  )
}

export default LoadingDotTable