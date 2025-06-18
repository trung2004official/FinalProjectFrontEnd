import React from 'react'

const LoadingSpinner = () => {
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="w-12 h-12 border-4 border-t-transparent border-[CetaceanBlue] rounded-full animate-spin mx-auto">
                </div>
            </div>
        </>
    )
}

export default LoadingSpinner;
