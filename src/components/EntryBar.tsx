import "./EntryBar.css"

import React from "react";
import { IonSearchbar, IonButton } from "@ionic/react";


// const EntryBar = ({ guestName, setCurrentGuest }: {guestName:any, setCurrentGuest:any }) => {
//   return (
//     <div className="entry-bar">
//         <IonSearchbar animated={true} placeholder="Guest Code" showClearButton="focus" onIonChange={ ({detail}) => setCurrentGuest(detail.value)} value={guestName}></IonSearchbar> {/* we use IonInput for autocomplete, IonChange for setting state  */}
//         <IonButton>Clear</IonButton>
//         {/* insert logic to show search autocomplete, with selectable entries*/}
//     </div>
//   );
// };

const EntryBar = ({ guest, onChange, guestList }: {guest:any, onChange:any, guestList:any}) => {
    return (
      <div className="entry-bar">
          <IonSearchbar animated={true} placeholder="Guest Code" showClearButton="focus" onIonChange={onChange}></IonSearchbar> {/* we use IonInput for autocomplete, IonChange for setting state  */}
          <IonButton>Clear</IonButton>
          {/* insert logic to show search autocomplete, with selectable entries*/}
      </div>
    );
  };
  

export default EntryBar;