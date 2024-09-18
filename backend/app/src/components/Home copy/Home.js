import React, { useEffect, useState } from 'react';
import Banner from './components/Banner';
import Navigation from './components/navigation';
import '../../index.css';
import Snap from './components/snap';
import SnapLg from './components/snapLg';


const Home = () => {
  const [isOpen,setIsOpen] = useState(false)
  const toggleModal=(items)=>{
      setIsOpen(!isOpen)
  }

  useEffect(() => {
      if (isOpen) {
          
          console.log('API request triggered');
      }
  }, [isOpen]); 

  
    return (
      <div>
        <Navigation/>
        <Banner name='test' toggleModal={toggleModal}/>
        <Snap title='trending' toggleModal={toggleModal} />
        <SnapLg title='popular' toggleModal={toggleModal} />
        <Snap title=' most ranked' nbre='4' toggleModal={toggleModal} />
        <SnapLg title={['favorite']} toggleModal={toggleModal} />

        {isOpen && (

          <div className="fixed top-0 left-0 w-full h-full flex items-center shadow-lg overflow-y-auto"
              style={{background: 'rgba(0, 0, 0, 0.5)'}} >
              <div className="container mx-auto lg:px-32 xl:px-48 rounded-lg overflow-y-auto">
                  <div className="bg-gray-900 rounded">
                      <div className="flex justify-end px-4 pt-2">
                          <button onClick={toggleModal}
                              className="text-3xl leading-none hover:text-gray-300">&times;</button>
                      </div>
                      <div className="modal-body px-8 py-8">
                          <div className="video-wrapper">
                              <video controls src="{{vite::asset('/storage/app/public/trailer/trailer2.mp4')}}"
                                  className="responsive-container w-full h-full"
                                  allow="autoplay; encrypted-media" allowfullscreen></video>
                              {/* <iframe src="" frameborder="0" className="responsive-iframe absolute top-0 left-0 w-full h-full" width="560" height="315" allow="autoplay; encrypted-media" allowfullscreen></iframe> */}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          )}

      </div>
     

    );
}

export default Home;
