import React from 'react';

const ItemLg = (props) => {

    const toggleModal=props.modals

    const id=""

    const modal=(params)=>{
        toggleModal(params)
    }



    return (
    <li onClick={() => modal(id)} key={props.key} class="w-2/3 md:w-1/3 flex-shrink-0 snap-center cursor-pointer">
        <div class="space-y-6 rounded border border-white/30 p-3">
            <div class="h-28 md:h-52 w-12/12 bg-white/30"></div>
            <div class="space-y-1">
                <div class="h-2 md:h-4 w-10/12 bg-white/30"></div>
            </div>
        </div>
    </li>
    );
}

export default ItemLg;
