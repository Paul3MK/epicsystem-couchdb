// import "./Sidebar.css"
import React, { useState } from "react";
import GuestWrapper from "./GuestWrapper";
import EntryBar from "./SearchBar";
import useDBAPI from "../hooks/useDBAPI";
import { IonCol, IonGrid, IonRow, SearchbarCustomEvent } from "@ionic/react";
import { User } from "@supabase/supabase-js"

interface PouchDBSeatedArray extends PouchDB.Core.ExistingDocument<{}>{
    guest_code: string,
    name: string,
    event_access: string,
    additional_guests: number,
    seating_zone: string

}

function Sidebar({user, seatedArray, totalSeated}:{user:any, seatedArray:PouchDBSeatedArray[]|undefined, totalSeated:number}) {
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


export default Sidebar