import React, {useEffect, useState} from 'react';
import ApiService from '../../apiService';
import SnapLg from './snapLg';

const Wraper = (props) => {

    const [movie, setMovie] = useState([]);
    const toggleModal=props.toggleModal

    const genre=props.genre

    const modal=(params)=>{
        toggleModal(params)
    }

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await ApiService.fetchPopularMovies(1,genre);
                setMovie(data[0]);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };

        fetchMovie();
    }, [1]);

    return(
        <div className="bg-cover mx-10  my-4 bg-zinc-700" style={{backgroundImage: 'url("https://image.tmdb.org/t/p/original'+movie['backdrop_path']+'")', backgroundPosition: 'center', backgroundSize: 'cover'}}>
                    <div
                        className="bg-gradient-to-tr from-black/60 from-30%  to-transparent pt-80">
    
                        <SnapLg modals={modal} genre={genre} />
                        
                    </div>
                    <div className="w-full flex bg-black/60 py-5 px-10 items-start gap-10">
                        <p className="text-white font-bold uppercase flex flex-col items-center gap-1 cursor-pointer hover:scale-105">General Information <span className="w-2 h-2 bg-red-600 rounded-full"></span></p>
                        <p className="text-white font-bold uppercase flex flex-col items-center gap-1 cursor-pointer hover:scale-105">Similar</p>
                        <p className="text-white font-bold uppercase flex flex-col items-center gap-1 cursor-pointer hover:scale-105">Reviews & details</p>
                        <p className="flex items-center gap-3 self-center"> 
                            <svg className="fill-zinc-500 w-5 inline-block cursor-pointer hover:scale-110" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z"/>
                            </svg>
                            <svg className="fill-zinc-500 w-6 inline-block cursor-pointer hover:scale-110" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/>
                            </svg>
                        </p>
                    </div>
                </div>
    );
}

export default Wraper;
