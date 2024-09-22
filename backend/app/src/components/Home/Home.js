import React, { useEffect, useState } from 'react';
import Banner from './components/Banner';
import Navigation from './components/navigation';
import '../../index.css';
import Snap from './components/snap';
import Entete from './components/entete';
import Wraper from './components/wraper';
import SnapLg from './components/snapLg';
import Modal from './components/modal';


const Home = () => {
  const [isOpen,setIsOpen] = useState(false)
  const [data,setData] = useState(false)
  const [id,setId] = useState("")

  const toggleModal=(id)=>{
      setId(id)
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
        <Entete title='popular' />
        <Snap  genre='12' toggleModal={toggleModal} />
        <Snap  genre='35' toggleModal={toggleModal} />
        {/* <Entete title='all' /> */}
        <Wraper toggleModal={toggleModal} genre={'16'} />
        <Snap  genre='10402' toggleModal={toggleModal} />
        <Snap  genre='14' toggleModal={toggleModal} />
        <Snap  genre='9648' toggleModal={toggleModal} />
        <Wraper toggleModal={toggleModal} genre={'10751'} />
        <Snap  genre='18' toggleModal={toggleModal} />
        <Snap  genre='80' toggleModal={toggleModal} />
        <Snap  genre='878' toggleModal={toggleModal} />
        <Wraper toggleModal={toggleModal} genre={'10752'} />

        <Modal data={data} isOpen={isOpen} id={id} toggleModal={toggleModal}  />

      </div>
     

    );
}

export default Home;
