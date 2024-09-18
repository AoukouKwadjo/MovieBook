import React, { useEffect, useState } from 'react';
import Banner from './components/Banner';
import Navigation from './components/navigation';
import '../../index.css';
import Snap from './components/snap';
import SnapLg from './components/snapLg';
import Modal from './components/modal';


const Home = () => {
  const [isOpen,setIsOpen] = useState(false)
  const [data,setData] = useState(false)

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
        <SnapLg title='favorite' toggleModal={toggleModal} />

        <Modal data={data} isOpen={isOpen} toggleModal={toggleModal}  />

      </div>
     

    );
}

export default Home;
