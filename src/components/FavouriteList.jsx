import React, { useEffect } from "react";

function FavouriteList({data}){
    useEffect(() => {
        data.map(pokemon => {
            console.log(pokemon);
        })
    })
    return <div>{JSON.stringify(data, null, 2)}</div>
}

export default FavouriteList;