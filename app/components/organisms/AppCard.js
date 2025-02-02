import React from 'react'

function AppCard({ color, bg, text, icon, figure ,withNairaSign}) {
    return (
        <div className='bg-white px-5 space-y-1 py-6 rounded-lg'>
            <div>
                <div className={`h-8 w-8 ${bg} flex items-center justify-center ${color} bg-opacity-5 rounded-lg`}>
                    {icon}
                </div>
                <div></div>
            </div>
            <div className='text-gray-400 text-xs'>{text}</div>
            {
                figure?.toLocaleString('en-US') === undefined ? (
                    <div className='preload w-7 h-7'></div>
                ) : (
                    <div className='text-3xl font-bold'>{withNairaSign && "₦"}{figure?.toLocaleString('en-US')}</div>
                )
            }
        </div>
    )
}

export default AppCard