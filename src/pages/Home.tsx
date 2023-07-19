import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import './Home.css';
import { useState } from 'react';
import EpicLayout from '../components/EpicLayout';
import { Session, User } from '@supabase/supabase-js';


const Home = ({session}: {session:Session}):React.ReactElement => {

  

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
        <EpicLayout session={session}/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
