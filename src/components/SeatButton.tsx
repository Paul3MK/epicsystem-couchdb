import "./SeatButton.css"
import { IonButton } from "@ionic/react"


function SeatButton({guest}: {guest:any}) {
    // STATE

    // FUNCTIONS


    // MAIN
    return(
        guest.value.seated!=1
        ? 
        <IonButton type="submit">Seat Guest</IonButton>
        :
        <IonButton color="success" disabled={true}>Guest Seated</IonButton>
    )

    // perhaps think of including "unseat guest" logic. Can't think of any solid scenarios for this though
}

export default SeatButton