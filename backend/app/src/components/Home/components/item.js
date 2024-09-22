import React from 'react';


const Item = (props) => {

    const toggleModal=props.modals
    const movie=props.movie
    const maxLength = 20; // Limite de la taille du titre à 20 caractères

    
    const id=movie['tmdb_id']

    const modal=(params)=>{
        toggleModal(params)
    }



    return (
    <li onClick={() => modal(id)} key={props.key} className="w-46 md:w-48 flex-shrink-0 snap-center cursor-pointer">
        {/* {console.log(movie)} */}
        <div className="space-y-2">
            <div className="h-52 md:h-60 w-full bg-white/30 rounded-lg" style={{backgroundImage: 'url("https://image.tmdb.org/t/p/original'+movie['poster_path']+'")', backgroundPosition: 'center', backgroundSize: 'cover'}}>
            </div>
            <div className="space-y-1 px-2">
                <div className="h-2 md:h-4 w-full text-white">{movie['title'].length > maxLength ? movie['title'].slice(0, maxLength) + "..." : movie['title']}</div>
            </div>
            <div className="text-white flex justify-between items-center">
                <p>{movie['date'].split('-')[0]}</p>
                <div className="flex gap-3 items-center">
                    <div className="flex gap-1 items-center text-yellow-500 text-center">
                        <svg className="fill-yellow-500 w-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                        </svg>
                        {movie['vote_average']}
                    </div>
                </div>
            </div>
        </div>
    </li>
    );
}

export default Item;
