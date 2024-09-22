import React from 'react';

const Comment = (props)=> {
    const comment=props.comment

    return (
        <div class="w-full min-h-6 border-zinc-500 bg-black/30 shadow-sm shadow-black border px-4 rounded py-1 space-y-4 pb-2">
        <div class="flex items-center w-full h-8 space-x-2">
        {
            comment.avatar ? (
                <img
                src={`https://image.tmdb.org/t/p/original/${comment.avatar}`}
                alt="User Avatar"
                className="h-full rounded-full w-8"
                />
            ) : (
                <svg
                className="h-full rounded-full w-8 bg-zinc-400 p-1"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
                    fill="#000000"
                />
                <path
                    d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
                    fill="#000000"
                />
                </svg>
            )
        }

            
            <h3 class=" font-bold capitalize">{comment.name}</h3>
            <p class="text-zinc-500 font-bold"> {comment.date} ago</p>
            <p class="border-2 border-zinc-400 text-zinc-400 rounded flex h-5 items-center">Owner</p>
        </div>
        <div class=" flex flex-col px-5">
            <p class="">{comment.content}</p>

            <div class="flex gap-2 mt-5">
                <svg class="w-7 rounded-full border-2 border-gray-600 p-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.10627 18.2468C5.29819 16.0833 2 13.5422 2 9.1371C2 4.27416 7.50016 0.825464 12 5.50063L14 7.49928C14.2929 7.79212 14.7678 7.79203 15.0607 7.49908C15.3535 7.20614 15.3534 6.73127 15.0605 6.43843L13.1285 4.50712C17.3685 1.40309 22 4.67465 22 9.1371C22 13.5422 18.7018 16.0833 15.8937 18.2468C15.6019 18.4717 15.3153 18.6925 15.0383 18.9109C14 19.7294 13 20.5 12 20.5C11 20.5 10 19.7294 8.96173 18.9109C8.68471 18.6925 8.39814 18.4717 8.10627 18.2468Z" fill="#1C274C"/>
                </svg>
                
                <svg class="w-7 rounded-full border-2 border-gray-600 p-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.0802 7.89712C11.1568 5.96571 11.6952 5 12.5 5C13.3048 5 13.8432 5.96571 14.9198 7.89712L15.1984 8.3968C15.5043 8.94564 15.6573 9.22007 15.8958 9.40114C16.1343 9.5822 16.4314 9.64942 17.0255 9.78384L17.5664 9.90622C19.6571 10.3793 20.7025 10.6158 20.9512 11.4156C21.1999 12.2153 20.4872 13.0487 19.0619 14.7154L18.6932 15.1466C18.2881 15.6203 18.0856 15.8571 17.9945 16.1501C17.9034 16.443 17.934 16.759 17.9953 17.3909L18.051 17.9662C18.2665 20.19 18.3742 21.3019 17.7231 21.7962C17.072 22.2905 16.0932 21.8398 14.1357 20.9385L13.6292 20.7053C13.073 20.4492 12.7948 20.3211 12.5 20.3211C12.2052 20.3211 11.927 20.4492 11.3708 20.7053L10.8643 20.9385C8.90677 21.8398 7.928 22.2905 7.27688 21.7962C6.62575 21.3019 6.7335 20.19 6.94899 17.9662L7.00474 17.3909C7.06597 16.759 7.09659 16.443 7.00548 16.1501C6.91438 15.8571 6.71186 15.6203 6.30683 15.1466L5.93808 14.7154C4.51276 13.0487 3.8001 12.2153 4.04881 11.4156C4.29751 10.6158 5.34288 10.3793 7.43361 9.90622L7.9745 9.78384C8.56862 9.64942 8.86568 9.5822 9.1042 9.40114C9.34272 9.22007 9.4957 8.94565 9.80165 8.3968L10.0802 7.89712Z" fill="#1C274C"/>
                    <path d="M4.86752 2.50058C4.89751 2.3948 5.08528 2.39416 5.11598 2.49974C5.25618 2.98185 5.51616 3.69447 5.90928 4.08495C6.30241 4.47543 7.01676 4.73058 7.49981 4.86752C7.6056 4.89751 7.60623 5.08528 7.50065 5.11598C7.01854 5.25618 6.30592 5.51616 5.91545 5.90928C5.52497 6.30241 5.26981 7.01676 5.13287 7.49981C5.10288 7.6056 4.91511 7.60623 4.88441 7.50065C4.74421 7.01854 4.48424 6.30592 4.09111 5.91545C3.69798 5.52497 2.98363 5.26981 2.50058 5.13287C2.3948 5.10288 2.39416 4.91511 2.49974 4.88441C2.98185 4.74421 3.69447 4.48424 4.08495 4.09111C4.47543 3.69798 4.73058 2.98363 4.86752 2.50058Z" fill="#1C274C"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19 3.25C19.4142 3.25 19.75 3.58579 19.75 4V4.25H20C20.4142 4.25 20.75 4.58579 20.75 5C20.75 5.41421 20.4142 5.75 20 5.75H19.75V6C19.75 6.41421 19.4142 6.75 19 6.75C18.5858 6.75 18.25 6.41421 18.25 6V5.75H18C17.5858 5.75 17.25 5.41421 17.25 5C17.25 4.58579 17.5858 4.25 18 4.25H18.25V4C18.25 3.58579 18.5858 3.25 19 3.25Z" fill="#1C274C"/>
                </svg>
                2.5
            </div>
        </div>
    </div> 
    );
}

export default Comment;
