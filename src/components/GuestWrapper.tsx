import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import "./GuestWrapper.css"

import React, { FormEvent, useEffect } from "react";
import { useState } from "react";
import { GuestCell, GuestCellSelect, GuestCellTextarea} from "./GuestCell"
import PouchDB from "pouchdb";
import useEpicSidebar from "../hooks/useEpicSidebar";


type F = {
  additional_guests: number,
  notes: string
}

const GuestWrapper = ({ guest, user, formData, formDataUpdate }: {guest: any, user:any, formData:F, formDataUpdate:any}) => {

  const {setFetchState} = useEpicSidebar(user)

  const seatGuest = (ev:any) => {
    ev.preventDefault();
    async function send(){
      const db = new PouchDB("http://localhost:5984/test_wedding", {auth: {username: "admin", password:"hieg"}});

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
      console.log(doc)
      db.put(doc);
    };

    try{
      send();
      setFetchState(true);
    } catch(err) {
      console.log(err);
    };
  }


  return (
    <>
      {guest?
      <form className="guest-wrapper" onSubmit={seatGuest}>
        <div className="guest-bar">
            <div className="guest-info">
                {guest?<span id="guest-code">{guest.key}</span>:<span></span>}
                {guest?<span id="guest-name">{guest.value.name}</span>:<span></span>}
            </div>
            {guest.value.seated!=1 ? <IonButton type="submit">Seat Guest</IonButton> : <IonButton color="success" disabled={true}>Guest Seated</IonButton>}
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