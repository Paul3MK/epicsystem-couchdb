import useEpicSidebar from "../hooks/useEpicSidebar"
// import "./EpicRecents.css"

import { IonGrid, IonCol, IonRow } from "@ionic/react"

interface PouchDBSeatedArray extends PouchDB.Core.ExistingDocument<{}>{
    guest_code: string,
    name: string,
    event_access: string,
    additional_guests: number,
    seating_zone: string

}

function EpicRecents(user:any){
    const {seatedArray}:{seatedArray:PouchDBSeatedArray[]|undefined} = useEpicSidebar(user.id);
    return (
        <IonGrid className="grid-base">
            <IonRow>
                <IonCol>
                    <span className="grid-header-text">id</span>
                </IonCol>
                <IonCol>
                    <span className="grid-header-text">guest name</span>
                </IonCol>
                <IonCol>
                    <span className="grid-header-text">guest no.</span>
                </IonCol>
                <IonCol>
                    <span className="grid-header-text">seating zone</span>
                </IonCol>
            </IonRow>
            {seatedArray?.map((element) => (
                <IonRow key={element.guest_code}>
                    <IonCol>
                        <span className="grid-text">{element.guest_code}</span>
                    </IonCol>
                    <IonCol>
                        <span className="grid-text">{element.name}</span>
                    </IonCol>
                    <IonCol>
                        <span className="grid-text">{element.additional_guests+1}</span>
                    </IonCol>
                    <IonCol>
                        <span className="grid-text">{element.seating_zone}</span>
                    </IonCol>
                </IonRow>
            ))}
        </IonGrid>
    )
}

export default EpicRecents