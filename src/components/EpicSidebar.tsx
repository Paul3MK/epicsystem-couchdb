// import "./EpicSidebar.css"
import React, { useState } from "react";
import GuestWrapper from "./GuestWrapper";
import EntryBar from "./EntryBar";
import useEpicSidebar from "../hooks/useEpicSidebar";
import { IonCol, IonGrid, IonRow, SearchbarCustomEvent } from "@ionic/react";
import { User } from "@supabase/supabase-js"

function EpicSidebar(user:any) {

    const { seatedArray, totalSeated, error} = useEpicSidebar(user.id)
    const [currentTime, setCurrentTime] = useState<string|null>(null)

    setInterval(()=>{
        var d = new Date()
        var ctime = d.toLocaleTimeString("en-GB");
        setCurrentTime(ctime)

    }, 1000)
    
    return(
        <div className="sidebar-wrapper">
            <div className="sidebar-infobox">
                <div className="sidebar-infobox_cell">
                    <span>current time</span>
                    <span>{currentTime}</span>
                </div>
                <div className="sidebar-infobox_cell">
                    <span>guests seated</span>
                    <span>{seatedArray?.length}</span>
                </div>
                <div className="sidebar-infobox_cell">
                    <span>total guests</span>
                    <span>{totalSeated}</span>
                </div>
            </div>

        </div>
    )
}


export default EpicSidebar