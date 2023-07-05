import "./EpicLayout.css"
import React, { useState } from "react";
import GuestWrapper from "./GuestWrapper";
import EntryBar from "./EntryBar";
import useEpicLayout from "../hooks/useEpicLayout"
import { IonCol, IonGrid, IonRow, SearchbarCustomEvent } from "@ionic/react";


const EpicLayout:React.FC = () => {
    const [currentGuest, setCurrentGuest] = useState<{}>();
    const [user, setUser] = useState<{}>({
        username: "paul",
        type: "admin"
    });
    const { dbInfo, guestList, error } = useEpicLayout();

    const getGuest = (ev: SearchbarCustomEvent) => {
        const k = ev.target.value
        if (guestList) {
            let set = guestList.rows.filter((guest)=>{return guest.key == k?.toUpperCase()})
            setCurrentGuest(set[0])
        }
    }
    return (
        <div className="padding-global">
            <div className="container">
                <div className="padding-section-standard">
                    <EntryBar guest={currentGuest} onChange={getGuest} guestList={guestList} />
                    <IonGrid>
                        <IonRow>
                            <IonCol size="8">
                                <GuestWrapper guest={currentGuest} user={user}/>
                            </IonCol>
                            <IonCol size="3" offset="1">
                                {/* <EpicSidebar /> */}
                                <span>Heya</span>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    {/* <EpicRecents /> */}
                </div>
            </div>
        </div>
    );
};
export default EpicLayout;
