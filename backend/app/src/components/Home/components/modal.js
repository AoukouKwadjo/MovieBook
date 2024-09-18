import React from 'react';

const Modal = (props)=> {

    const toggleModal=props.toggleModal
    const isOpen=props.isOpen
    const id=""

    const modal=(params)=>{
        toggleModal(params)
    }

    return (
        <>{isOpen && (
            <div className="fixed top-0 left-0 w-full flex items-center shadow-lg overflow-y-hidden" style={{background: 'rgba(0, 0, 0, 0.5)'}} >

              <div className="container mx-auto lg:px-32 xl:px-48 rounded-lg top-0  fixed " style={{height: '95vh'}}>
                  <div className="bg-gray-900 rounded p-5 relative top-5 h-full overflow-y-hidden">
                      <div className="flex justify-between px-4 pt-2 bg-gray-950 border border-zinc-800 p-4 mb-4 items-center">

                            <div className='flex gap-5'>
                                <button onClick={() => modal(id)}
                                className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" className='stroke-white' width="24" height="24" viewBox="0 0 24 24" 
                                        fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M19 12H6M12 5l-7 7 7 7"/>
                                    </svg>
                                </button>
                                <p className='text-xl text-zinc-200 font-bold capitalize'> 
                                    Shijou Saikyou no Daimaou 
                                    <svg className="fill-red-800 mx-1 brightness-150 w-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 
                                        0-7.327-9.17-8.972-12-3.27z" />
                                    </svg>
                                    <svg className="fill-red-800 mx-1 brightness-150 w-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 
                                        0-7.327-9.17-8.972-12-3.27z" />
                                    </svg> 
                                    <svg className="fill-red-800 mx-1 brightness-150 w-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 
                                        0-7.327-9.17-8.972-12-3.27z" />
                                    </svg> 
                                </p>
                            </div>

                            <div className='w-1/5 flex gap-4'>
                                <button className="flex gap-5 items-center bg-zinc-800 brightness-125 text-white rounded font-semibold
                                    px-3 py-1 shadow-black-light hover:scale-105 transition ease-in-out duration-150 ">

                                    <svg className="fill-white w-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 
                                        0-7.327-9.17-8.972-12-3.27z" />
                                    </svg>
                                </button>    

                                <button className="flex gap-2 text-sm items-center bg-red-800 brightness-125 text-white rounded font-semibold
                                    px-7 py-2 shadow-black hover:scale-105 transition ease-in-out duration-150 ">

                                    <svg viewBox="0 0 24 24" className="w-3 fill-white"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 22v-20l18 10-18 10z" />
                                    </svg>
                                    Download
                                </button>
                            </div>    
                      </div>
                      <div className="modal-body pb-20 h-full overflow-y-scroll"style={{scrollbarWidth: 'none'}}>
                            <div className="image-wrapper">

                                <div className="bg-cover w-full hidden md:block" style={{backgroundImage: 'url("/posts/varvatos.png")'}}>
                                    <div className="w-full min-h-96 bg-gradient-to-tr from-black/85 from-50% to-transparent flex flex-col p-10 justify-end">
                                        <p className='text-white text-5xl font-bold mb-5'>Shijou Saikyou no Daimaou</p>
                                        <button className="flex gap-5 mt-4 items-center bg-red-600 brightness-150 text-white rounded-full font-semibold
                                            px-6 py-3 shadow-light hover:scale-105 transition ease-in-out duration-150 w-1/5">

                                            <svg viewBox="0 0 24 24" className="w-6 fill-white"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 22v-20l18 10-18 10z" />
                                            </svg>
                                            Play Now
                                        </button>
                                    </div>
                                </div>

                                <div className='px-10 py-2 flex justify-between items-center '>

                                    <div className='w-2/5 flex-col space-y-2 text-sm font-semibold text-zinc-300'>

                                        <p><span className=' font-bold text-lg mr-2 text-zinc-$00' >Origine :</span><span className='text-cyan-600' >Light Novel</span></p>
                                        <p><span className=' font-bold text-lg mr-2 text-zinc-$00' >Genres :</span> Action - Comédie - <span className=' font-bold text-red-600' >Ecchi</span> - Fantastique - Slice of Life</p>
                                        <p><span className=' font-bold text-lg mr-2 text-zinc-$00' >Thèmes :</span>  <span className=' font-bold text-red-600' >Démons - Harem</span> - <span className=' font-bold text-green-600' >Réincarnation</span></p>
                                        <p><span className=' font-bold text-lg mr-2 text-zinc-$00' >Age conseillé :</span><span className=' font-bold text-cyan-600' >  18 ans</span> et +</p>
                                        <p><span className=' font-bold text-lg mr-2 text-zinc-$00' > Studio d'animation :</span><span className=' font-bold text-green-600' > BLADE, SILVER LINK.</span></p>
                                    </div>

                                    <div className='text-sm w-1/2  text-zinc-300'>
                                        <p className='m-5 font-semibold text-lg'>
                                            Basé sur le roman Shijou Saikyou no Daimaou, Murabito A ni Tensei suru de Katou Myojin.
                                        </p>

                                        <p>

                                            Varvatos est le roi démon le plus puissant de l'histoire, célèbre jusque dans la mythologie. 
                                            Ayant accompli sa vie de roi, il aspire désormais à une vie ordinaire, et des milliers d'années 
                                            plus tard, il se réincarne en un villageois nommé Ard. Sa magie s'est un peu dégradé, mais il 
                                            n'en reste pas moins extrêmement puissant. Les rumeurs se répandent, de nombreuses femmes viennent 
                                            lui demander de les épouser, la royauté tente de faire de lui le prochain roi, et même d'anciens 
                                            subordonnés tentent désormais de le tuer, mais le Grand Roi Démon se contente d'ignorer tous ces 
                                            gens et continue de suivre sa propre voie...
                                        </p>
                                    </div>

                                </div>



                            </div>
                      </div>
                  </div>
              </div>
          </div>
        )}</>
    );
}

export default Modal;
