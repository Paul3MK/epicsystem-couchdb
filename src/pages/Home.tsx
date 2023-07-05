import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import './Home.css';
import { useState } from 'react';
import EpicLayout from '../components/EpicLayout';


const Home: React.FC = () => {
  const [dbInfo, setDbInfo] = useState<PouchDB.Core.DatabaseInfo>()
  const [guestList, setGuestList] = useState<PouchDB.Query.Response<{}>>()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButtons slot="end">
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <EpicLayout/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
