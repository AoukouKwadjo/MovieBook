import React from 'react';

const Navigation = () => {
    return (

        <div
        className="w-full px-5 md:px-32 py-4 flex items-center justify-between absolute bg-gradient-to-b from-black to-black/5">

        <button className="md:hidden brightness-125">
            <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                <path
                    d="m13 16.745c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75zm9-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm-4-5c0-.414-.336-.75-.75-.75h-14.5c-.414 0-.75.336-.75.75s.336.75.75.75h14.5c.414 0 .75-.336.75-.75z" />
            </svg>
        </button>

        <button className="brightness-125">
            <img className="h-8 md:h-10 w-auto px-0 mx-0" src="/icon2.png"
            alt="Your Company" />
        </button>

        <div className="hidden md:flex w-2/5 justify-between py-2 px-5 rounded-2xl ">

            <div className="px-5 rounded text-white pb-1 hover:bg-white hover:text-black cursor-pointer"><a href="" className="font-bold text-xl">Movies</a></div>
            <div className="px-5 rounded bg-white text-black pb-1"><a href="" className="font-bold text-xl">Serie</a></div>
            <div className="px-5 rounded text-white pb-1 hover:bg-white hover:text-black cursor-pointer"><a href="" className="font-bold text-xl">Anime</a></div>
        </div>

        <div className="flex gap-5 items-center w-1/6 justify-between">

            <button>
                <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" />
                </svg>
            </button>

            <button>
                <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z" />
                </svg>
            </button>

            <button className="hidden md:block"><img src="" alt=""
                    className="rounded-full h-8 w-8 ring-2 ring-offset-black ring-white ring-offset-4 bg-white/50"/>
            </button>
        </div>

    </div>

    );
}

export default Navigation;



