import React, {useState, useEffect} from 'react';
import Item from './item';
import ApiService from '../../apiService';

const Snap = (props) => {

    const snaper = [];
    const items = [];
    const toggleModal=props.toggleModal
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

 
    popularMovies.map((movie,i) => (
        items.push(
            <Item key={i} movie={movie} modals={modal} />
        ))
    )

    snaper.push(
        <ul key={this} className="flex snap-x snap-mandatory gap-x-4 md:gap-x-8 overflow-x-auto pb-6 no-scrollbar">
            {items}
        </ul>      
    );


    return (

        <div>
            <div className="flex flex-col pt-8 px-10">
                {snaper}
            </div>
        </div>
    );
}

export default Snap;
