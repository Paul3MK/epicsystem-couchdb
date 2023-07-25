import "./NameBar.css"
import { useState } from "react"



function NameBar({guest}: {guest:any}) {
    //STATE



    // FUNCTIONS


    // MAIN
    return (
        <div>
            <span>{guest.key}</span>
            <span>{guest.value.name}</span>
        </div>
    )
}

export default NameBar