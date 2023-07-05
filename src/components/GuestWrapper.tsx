import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import "./GuestWrapper.css"

import React, { FormEvent } from "react";
import { useState } from "react";
import { GuestCell, GuestCellSelect, GuestCellTextarea} from "./GuestCell"
import PouchDB from "pouchdb";

const GuestWrapper = ({ guest, user }: {guest: any, user:any}) => {

  const [formData, setFormData] = useState({
    additional_guests: 0,
    notes: ""
  });

  const handleChange = (ev:any) => { //the right fix here is to make an interface which extends CustomEvent and defines target: HTMLIon...
    const {name, value} = ev.target;
    setFormData((prevFormData) => ({...prevFormData, [name]:value}));
  }

  const seatGuest = (ev:any) => {
    ev.preventDefault();
    async function send(){
      const db = new PouchDB("http://localhost:5984/test_wedding", {auth: {username: "admin", password:"hieg"}});

      let doc = {
        _id: guest.id,
        _rev: guest.value._rev,
        guest_code: guest.key,
        seated: 1,
        seated_by: user.username,
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
    } catch(err) {
      console.log(err);
    };
  }


  return (
    <form className="guest-wrapper" onSubmit={seatGuest}>
      <div className="guest-bar">
          <div className="guest-info">
              {guest?<span id="guest-code">{guest.key}</span>:<span></span>}
              {guest?<span id="guest-name">{guest.value.name}</span>:<span></span>}
          </div>
          <IonButton type="submit">Seat Guest</IonButton>
      </div>
        {guest?
        <IonGrid>
          <IonRow>
            <IonCol><GuestCell label="Seating Zone" value={guest.value.seating_zone}/></IonCol>
            <IonCol><GuestCell label="Event Access" value="Wedding"/></IonCol>
            <IonCol><GuestCell label="Sub_List" value={guest.value.sub_list}/></IonCol>
            <IonCol><GuestCell label="Guest Group" value={guest.value.guest_group}/></IonCol>
            <IonCol><GuestCell label="Seating Zone" value={guest.value.guest_count}/></IonCol>
            <IonCol><GuestCellSelect formName="additional_guests" label="Additional Guests" onChange={handleChange}/></IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <GuestCellTextarea value={guest.value.notes} formName="notes" label="Notes" onChange={handleChange}></GuestCellTextarea>
            </IonCol>
          </IonRow>
        </IonGrid>
        : <span></span> }
    </form>
  );
};

export default GuestWrapper;