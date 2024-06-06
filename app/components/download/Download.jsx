import React from 'react'
import Image from 'next/image'
import GooglePlay from '../../assets/googleButton.png'
import AppStore from '../../assets/appStoreButton.png'
import DownloadPng from '../../assets/downloadImg.png'

 const Download = () => {
  return (
    <div 
    className='lg:grid grid-cols-2 download'
    style={{
        height: 'auto',
        backgroundColor: '#0F0F0F'
    }}
    >
        <div className="gridContent flex items-center flex-col justify-center p-4">
          <h1 className='lg:text-6xl text-white font-bold text-3xl'>
            Download Vilox <br className='hidden lg:block' /> App 
          </h1>
          <div className=" ml-0 pl-0 buttonDivs flex my-10 space-x-6 items-center" >
           <a href="">
           <Image src={GooglePlay} alt="" />
           </a>
           <a href="">
           <Image src={AppStore} alt="" />
           </a>
        </div>
        </div>
        <div className="gridContent">
          <Image src={DownloadPng}  />
        </div>
    </div>
  )
}
 export default Download