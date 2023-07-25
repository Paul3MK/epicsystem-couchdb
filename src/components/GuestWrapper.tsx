import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import "./GuestWrapper.css"

import React, { FormEvent, useEffect } from "react";
import { useState } from "react";
import { GuestCell, GuestCellSelect, GuestCellTextarea} from "./GuestCell"
import PouchDB from "pouchdb";
import NameBar from "./NameBar";
import SeatButton from "./SeatButton";
import useSeatGuest from "../hooks/useSeatGuest";


type F = {
  additional_guests: number,
  notes: string
}

const GuestWrapper = ({ guest, user, formData, formDataUpdate, update }: {guest: any, user:any, formData:F, formDataUpdate:any, update:any}) => {
  // STATE
  const [error, setError] = useState<unknown>();
  
  const [fetchState, setFetchState] = useState<boolean>(false);
  // const [fullGuest, setFullGuest] = useState<any>({});
  

  // HOOKS
  

  // const {setFetchState} = useSidebar(user)
  

  const seatGuest = (ev:any) => {
    ev.preventDefault();

    let doc = {
      _id: guest.id,
      _rev: guest.value._rev,
      guest_code: guest.key,
      seated: 1,
      seated_by: user.id,
      additional_guests: formData.additional_guests,
      seated_time: Date.now(),
      name: guest.value.name,
      guest_count: guest.value.guest_count,
      sub_list: guest.value.sub_list,
      guest_group: guest.value.guest_group,
      seating_zone: guest.value.seating_zone,
      notes: formData.notes
    };

    update(doc)
  
  }


  return (
    <>
      {guest?
      <form className="guest-wrapper" onSubmit={seatGuest}>
        <div className="guest-bar">
            <NameBar guest={guest}/>
            <SeatButton guest={guest} />
        </div>
        <IonGrid>
          <IonRow>
            <IonCol><GuestCell label="Seating Zone" value={guest.value.seating_zone}/></IonCol>
            <IonCol><GuestCell label="Event Access" value="Wedding"/></IonCol>
            <IonCol><GuestCell label="Sub_List" value={guest.value.sub_list}/></IonCol>
            <IonCol><GuestCell label="Guest Group" value={guest.value.guest_group}/></IonCol>
            <IonCol><GuestCell label="Seating Zone" value={guest.value.guest_count}/></IonCol>
            <IonCol><GuestCellSelect formName="additional_guests" label="Additional Guests" onChange={formDataUpdate} value={formData.additional_guests}/></IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <GuestCellTextarea value={formData.notes} formName="notes" label="Notes" onChange={formDataUpdate} ></GuestCellTextarea>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
      :<div className="placeholder-box">Look up a guest using the search bar!</div>}
    </>
  );
};

export default GuestWrapper;