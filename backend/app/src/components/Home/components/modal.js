import React, { useEffect, useState} from 'react';
import ApiService from '../../apiService';
import Comment from './comment';

const Modal = (props)=> {

    const { toggleModal, isOpen, id } = props;
    const [movie, setMovie] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await ApiService.fetchMovies(id);
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const data = await ApiService.fetchComments(id);
                setComments(data || []); // Assurez-vous que data.comments est un tableau
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchMovie();
        fetchComments();
    }, [id]);

    console.log(id)
    

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
                                    {movie['original_title']}
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

                                <div className="bg-cover w-full hidden md:block" style={{backgroundImage: 'url("https://image.tmdb.org/t/p/original'+movie['backdrop_path']+'")', backgroundPosition: 'center', backgroundSize: 'cover'}}>
                                    <div className="w-full min-h-96 bg-gradient-to-tr from-black/50 from-50% to-transparent flex flex-col p-10 justify-end">
                                        <p className='text-white text-5xl font-bold mb-5'>{movie['title']}</p>
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

                                        <p><span className=' font-bold text-lg mr-2 text-zinc-$00' >Origine :</span><span className='text-cyan-600' >{movie['production']}</span></p>
                                        <p><span className=' font-bold text-lg mr-2 text-zinc-$00' >Genres :</span>{movie.genres && movie.genres.map((genre) => genre).join(', ')}</p>
                                        <p><span className=' font-bold text-lg mr-2 text-zinc-$00' >Thèmes :</span>  {movie.themes && movie.themes.map((theme) => theme).join(', ')}</p>
                                        <p><span className=' font-bold text-lg mr-2 text-zinc-$00' >Age conseillé :</span><span className=' font-bold text-cyan-600' >  18 ans</span> et +</p>
                                        <p><span className=' font-bold text-lg mr-2 text-zinc-$00' > Studio d'animation :</span><span className=' font-bold text-green-600' >{movie['studio']}</span></p>
                                    </div>

                                    <div className='text-sm w-1/2  text-zinc-300'>
                                        <p className='m-5 font-semibold text-lg'>
                                            {movie["tag"]}
                                        </p>

                                        <p>

                                            {movie['description']}
                                        </p>
                                    </div>

                                </div>
                                <div className='flex flex-col gap-10 px-20 mt-10 py-5 border-2 bg-black/50 text-zinc-400 border-zinc-600'>
                                    {comments.length > 0 ? (
                                        comments.map((comment) => (
                                            <Comment key={comment.url} comment={comment} />
                                        ))
                                    ) : (
                                        <p>No comments available.</p>
                                    )}
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
