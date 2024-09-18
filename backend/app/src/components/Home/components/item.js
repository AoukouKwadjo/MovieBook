import React from 'react';


const Item = (props) => {

    const toggleModal=props.modals
    const movie=props.movie

    const id=""

    const modal=(params)=>{
        toggleModal(params)
    }



    return (
    <li onClick={() => modal(id)} key={props.key} className="w-46 md:w-48 flex-shrink-0 snap-center cursor-pointer">
        {movie}
        <div className="space-y-2">
            <div className="h-52 md:h-60 w-full bg-white/30 rounded-lg"></div>
            <div className="space-y-1 px-2">
                <div className="h-2 md:h-4 w-full bg-white/30"></div>
            </div>
            <div className="text-white flex justify-between items-center">
                <p>2010</p>
                <div className="flex gap-3 items-center">
                    <svg className="fill-zinc-500 w-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z" />
                    </svg>
                    <svg className="fill-red-600 w-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
                    </svg>
                    <div className="flex gap-1 items-center text-yellow-500 text-center">
                        <svg className="fill-yellow-500 w-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                        </svg>
                        5.8
                    </div>
                </div>
            </div>
        </div>
    </li>
    );
}

export default Item;
