import React,{useEffect, useState} from 'react';
import ItemLg from './itemLg';
import ApiService from '../../apiService';


const SnapLg = (props) => {
    const snaper = [];
    const items = [];
    const toggleModal=props.modal
    const [popularMovies, setPopularMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState(props.genre);

    useEffect(() => {
        const fetchMovies = async () => {
        
            try {
                const data = await ApiService.fetchPopularMovies(page,genre);
                setPopularMovies(data);
            } catch (error) {
                console.error('Error fetching popular movies:', error);
            } 
        };
    
        fetchMovies();
    }, [page]);


    const modal=(params)=>{
        toggleModal(params)
    }

    console.log(popularMovies)
    
    popularMovies.map((movie,i) => (
        items.push(
            <ItemLg key={i} movie={movie} modals={modal} />
        ))
    )

    snaper.push(
        <ul key={this} className="flex snap-x snap-mandatory gap-x-4 md:gap-x-8 overflow-x-auto pb-6 no-scrollbar">
            {items}
        </ul>      
    );

    return (
        <div className=''>
            <div class="space-y-6 w-full px-5">
                {snaper}
            </div>
        </div>
    );
}

export default SnapLg;
