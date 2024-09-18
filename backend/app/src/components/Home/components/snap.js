import React, { useEffect, useState } from 'react';
import Item from './item';
import ApiService from '../../apiService';

const Snap = (props) => {

    const title=props.title
    const nbre= props.nbre ? props.nbre : 2
    const snaper = [];
    const items = [];
    const toggleModal=props.toggleModal
    const [popularMovies, setPopularMovies] = useState([]);


    // useEffect(() => {

    //     // Fetch popular movies
    //     ApiService.fetchPopularMovies()
    //     .then(data => setPopularMovies(data))
    //     .catch(error => console.error('Error fetching popular movies:', error));

    // })


    const modal=(params)=>{
        toggleModal(params)
    }

 
    popularMovies.map((movie,i) => (
        items.push(
            <Item key={i} movie={movie} modals={modal} />
        ))
    )

    for (let i = 0; i < nbre; i++) {
        snaper.push(
            <ul key={i} className="flex snap-x snap-mandatory gap-x-4 md:gap-x-8 overflow-x-auto pb-6 no-scrollbar">
                {items}
            </ul>      
        );
    }


    return (

        <div>
            {/* <div className='text-white'>{console.log(popularMovies)}</div>  */}
            <div className=' w-full mt-10'>
                <div class=" flex px-2 py-4 justify-around w-full border-b-2 border-zinc-900">

                    <p class="text-white capitalize text-sm md:text-xl font-bold">
                        <svg class="fill-zinc-500 w-5 inline-block" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path d="M8.625 0c.61 7.189-5.625 9.664-5.625 15.996 0 4.301 3.069 7.972 9 8.004 5.931.032 9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9-1.835 0-2.779-1.265-2.769-2.577.019-2.433 2.737-2.435 4.336-6.423z"/>
                        </svg>
                        <span class="hidden md:inline md:text-3xl">{title}</span>
                    </p>
                    <p class="text-zinc-500">
                        <a href={title +'/popular'}>
                            <svg class="fill-zinc-500 w-5 inline-block" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path d="M8.625 0c.61 7.189-5.625 9.664-5.625 15.996 0 4.301 3.069 7.972 9 8.004 5.931.032 9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9-1.835 0-2.779-1.265-2.769-2.577.019-2.433 2.737-2.435 4.336-6.423z"/>
                            </svg>
                            <span class="hidden md:inline">Popular</span>
                        </a>
                    </p>
                    <p class="text-zinc-500"><a href={title +'/premiere'}>
                        <svg class="fill-zinc-500 w-5 inline-block" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z" />
                        </svg>
                        <span class="hidden md:inline">Premiere</span>
                    </a></p>
                    <p class="text-zinc-500"><a href={title +'/recently'}>
                        <svg class="fill-zinc-500 w-5 inline-block" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                        </svg>
                        <span class="hidden md:inline">Recently Added</span>
                    </a></p>
                </div>

                <div className="flex flex-col pt-10 px-10">
                    {snaper}
                </div>
            </div>
        </div>
    );
}

export default Snap;
