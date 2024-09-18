import React, { useState } from 'react';

const Banner = (props) => {
    const toggleModal=props.toggleModal

    const id=""

    const modal=(params)=>{
        toggleModal(params)
    }


    return (
    <div className="bg-cover w-full hidden md:block" style={{backgroundImage: 'url(/storage/app/public/posts/poster8.jpg)'}}>
        <div className="flex items-start flex-col gap-5 justify-center bg-gradient-to-tr from-black/85 from-50% to-transparent">

            <div className="w-full">
                <div className="movie-info">

                    <div className="w-full px-8 pb-28 pt-48 backdrop-brightness-150">
                        <div className="lg:ml-20 mt-5 lg:mt-0 lg:w-2/5 brightness-150 flex flex-col gap-8">
                            <p className="text-white text-xl">Duration: 51 mn</p>
                            <div className="flex flex-wrap items-center text-white text-xl">

                                <svg viewBox="0 0 24 24" className="fill-current w-4 text-orange-500"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z" />
                                </svg>

                                <span className="ml-1">7.5</span>
                                <span className="mx-2"> Saison <span className="text-red-600">8</span>- Episode <span
                                        className="text-red-600"> 14</span> - Still Gotha Mean Something</span>


                            </div>
                            <h2 className="text-6xl text-white font-bold capitalize">Original title</h2>

                            <p className="text-white mt-8">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab sit sapiente quae maxime
                                aperiam adipisci! Odit, accusantium architecto. Animi, eligendi aut ex at iusto
                            </p>

                            <div className="mt-12 flex gap-10">
                                <button className="flex gap-5 items-center bg-red-600 brightness-150 text-white rounded-full font-semibold
                                    px-6 py-3 shadow-light hover:scale-105 transition ease-in-out duration-150"
                                    onClick={()=>modal(id)}>

                                    <svg viewBox="0 0 24 24" className="w-6 fill-white"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 22v-20l18 10-18 10z" />
                                    </svg>
                                    Play Thriller
                                </button>

                                <button
                                    className="flex gap-5 items-center bg-black brightness-150 text-white rounded-full font-semibold
                                    px-6 py-3 shadow-black-light hover:scale-105 transition ease-in-out duration-150"
                                    onClick={()=>modal(id)}>

                                    <svg className="fill-white w-6" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24">
                                        <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                                    </svg>
                                    Add List
                                </button>
                            </div>
                        </div>
                    </div>

                   
                </div>
            </div>
        </div>
    </div>
    );
}

export default Banner;
