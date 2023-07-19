import "./SearchBar.css"

import React from "react";
import { IonSearchbar, IonButton } from "@ionic/react";

const SearchBar = ({ guest, onChange, guestList, reset, guestCode }: {guest:any, onChange:any, guestList:any, reset:any, guestCode:string|undefined|null}) => {
    return (
      <div className="entry-bar">
          <IonSearchbar animated={true} placeholder="Guest Code" showClearButton="focus" onIonChange={onChange} value={guestCode}></IonSearchbar> {/* we use IonInput for autocomplete, IonChange for setting state  */}
          <IonButton onClick={reset}>Reset</IonButton>
          {/* insert logic to show search autocomplete, with selectable entries*/}
      </div>
    );
  };
  

export default SearchBar;