import "./Home.css"
import React, { useState } from "react";
import GuestWrapper from "../components/GuestWrapper";
import Sidebar from "../components/Sidebar";
import Recents from "../components/Recents";
import SearchBar from "../components/SearchBar";
import useHome from "../hooks/useHome"
import { IonCol, IonGrid, IonRow, SearchbarCustomEvent } from "@ionic/react";
import { Session } from "@supabase/supabase-js";

type Guest = {
    _id: string,
    _rev: string,
    guest_code: string,
    seated: number,
    seated_by: string,
    additional_guests: number,
    seated_time: Date,
    name: string,
    guest_count: number,
    sub_list: string,
    guest_group: string,
    seating_zone: string,
    notes: string
}

type PDBRecord = {

}


const Home = ({session}: {session:Session}) => {
    // STATE
    const [currentGuest, setCurrentGuest] = useState<any>();
    const { dbInfo, guestList, error } = useHome();
    const [formData, setFormData] = useState({
        additional_guests: currentGuest?.value.additional_guests,
        notes: currentGuest?.value.notes
      });
    const [guestCode, setGuestCode] = useState<string|undefined|null>();
    
    // FUNCTIONS
    const handleChange = (ev:any) => { //the right fix here is to make an interface which extends CustomEvent and defines target: HTMLIon...
        const {name, value} = ev.target;
        setFormData((prevFormData) => ({...prevFormData, [name]:value}));
    }

    const resetCurrentGuest = () => {
        setCurrentGuest(undefined)
        setGuestCode(null)
    }


    const getGuest = (ev: SearchbarCustomEvent) => {
        const k = ev.target.value
        setGuestCode(k)
        if (guestList && k) {
            let set = guestList.rows.filter((guest)=>{return guest.key == k?.toUpperCase()})
            if(set[0])setCurrentGuest(set[0])
            setFormData(()=>({additional_guests: set[0]?.value.additional_guests, notes: set[0]?.value.notes}))

        }
        else{
            setCurrentGuest(null)
            setFormData(()=>({additional_guests: null, notes: null}))
        }
    }

    // MAIN
    return (
        <div className="padding-global">
            <div className="container">
                <div className="padding-section-standard">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="8">
                                <SearchBar guest={currentGuest} onChange={getGuest} guestList={guestList} reset={resetCurrentGuest} guestCode={guestCode}/>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="8">
                                <GuestWrapper guest={currentGuest} user={session.user} formData={formData} formDataUpdate={handleChange}/>
                            </IonCol>
                            <IonCol size="3" offset="1">
                                <Sidebar user={session.user}/>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <Recents user={session.user}/>
                </div>
            </div>
        </div>
    );
};
export default Home;
