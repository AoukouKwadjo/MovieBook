import React, {useEffect, useState} from 'react';
import ApiService from '../../apiService';

const Banner = (props) => {
    const toggleModal=props.toggleModal
    const [movie, setMovie] = useState([]);
    const id="27205"


    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await ApiService.fetchMovies(id);
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };

        fetchMovie();
    }, [id]);


    const modal=(params)=>{
        toggleModal(params)
    }


    return (
    <div className="bg-cover w-full hidden md:block" style={{backgroundImage: 'url("https://image.tmdb.org/t/p/original'+movie['backdrop_path']+'")', backgroundPosition: 'center', backgroundSize: 'cover'}}>
        <div className="flex items-start flex-col gap-5 justify-center bg-gradient-to-tr from-black/60 from-50% to-transparent">

            <div className="w-full">
                <div className="movie-info">

                    <div className="w-full px-8 pb-28 pt-40 backdrop-brightness-150">
                        <div className="lg:ml-20 mt-5 lg:mt-0 lg:w-2/5 brightness-150 flex flex-col gap-8">
                            <p className="text-white text-xl">Duration: {movie['duree']} mn</p>
                            <div className="flex gap-1 flex-wrap text-white text-xl">

                                <svg viewBox="0 0 24 24" className="fill-current w-4 text-orange-500"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z" />
                                </svg>
                                        

                                <p className="ml-1">{movie["vote_average"]} </p>
                                <span className='ml-2'>-</span> 
                                <p className="mx-2"> {movie['tag']}</p>


                            </div>
                            <h2 className="text-6xl text-white font-bold capitalize">{movie['title']}</h2>

                            <p className="text-white mt-2">
                                {movie['description'] ? movie['description'].slice(0, 200) + "..." : "Description non disponible"}
                            </p>

                            <div className=' flex-col space-y-2 px-5 mt-2 text-sm font-semibold text-zinc-300'>

                                <li><span className=' font-bold text-lg mr-2 text-zinc-$00' >Genres :</span>{movie.genres && movie.genres.map((genre) => genre).join(', ')}</li>
                                <li><span className=' font-bold text-lg mr-2 text-zinc-$00' >Age conseillé :</span><span className=' font-bold text-cyan-600' >  {movie['age']} ans</span> et +</li>
                            </div>

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
