import React from 'react';
import ItemLg from './itemLg';

const SnapLg = (props) => {
    const titles = props.title; 
    const nbre= props.nbre ? props.nbre : 1
    const snaper = [];
    const items = [];
    const toggleModal=props.toggleModal


    const modal=(params)=>{
        toggleModal(params)
    }

    for (let i = 0; i < 10; i++) {
        items.push(
            <ItemLg key={i} modals={modal}/>
        );
    }

    for (let i = 0; i < nbre; i++) {
        snaper.push(
            <ul class="flex snap-x snap-mandatory gap-x-4 md:gap-x-8 overflow-x-auto pb-6 no-scrollbar">
                {items}
            </ul>
        );
    }

    return (
        <div>
            <div class="space-y-6 pt-10 px-5 md:px-10">
                <h2 class="text-xl md:text-3xl md:ml-20 font-semibold text-white capitalize">{titles}</h2>
                {snaper}
            </div>
        </div>
    );
}

export default SnapLg;
