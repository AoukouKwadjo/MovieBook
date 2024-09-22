import React from 'react';

const ItemLg = (props) => {

    const toggleModal=props.modals
    const movie=props.movie

    const modal=(params)=>{
        toggleModal(params)
    }

    console.log(movie)


    return (
    <li onClick={() => modal(movie['tmdb_id'])} key={props.key} class="w-2/3 md:w-1/4 flex-shrink-0 snap-center cursor-pointer">
        <div class="space-y-6 rounded border border-white/30 p-3">
            <div class="h-24 md:h-40 bg-white/30" style={{backgroundImage: 'url("https://image.tmdb.org/t/p/original'+movie.backdrop_path+'")', backgroundPosition: 'center', backgroundSize: 'cover'}}></div>
        </div>
    </li>
    );
}

export default ItemLg;
