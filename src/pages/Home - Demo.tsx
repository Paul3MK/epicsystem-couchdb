import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { Filesystem, Directory, FileInfo } from "@capacitor/filesystem"
import { useState } from 'react';


const noop = () => true;
const Home: React.FC = () => {
  const [notes, setNotes] = useState<FileInfo[]>([])
  const mkDir = async() => {
    return await Filesystem.mkdir({
      path: "notes",
      directory: Directory.Documents
    })
  }
  const readDir = async() => {
    return await Filesystem.readdir({
      path: "notes",
      directory: Directory.Documents
    })
  }
  const initFilesystem = () => {
    mkDir()
    .then(noop, noop)
    .then(readDir)
    .then(({files})=>{
      setNotes(
        files.sort(
          (a: FileInfo, b: FileInfo) => parseInt(b.name.replace(/note-/, "").replace(/.txt/, "")) - parseInt(a.name.replace(/note-/, "").replace(/.txt/, ""))
        )
      );
    });
  };
  

  useIonViewDidEnter(() => {
    initFilesystem()
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/edit">Add </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        {notes.map((note)=>(
          <IonItem key={note.name}>{note.name}</IonItem>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
