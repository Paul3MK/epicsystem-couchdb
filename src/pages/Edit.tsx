import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonButtons, IonBackButton, IonButton, useIonRouter } from "@ionic/react"
import { useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router";
import "react-quill/dist/quill.snow.css";
import "./Edit.css"
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";

const Edit = () => {
    const [content, setContent] = useState("");
    const { id } = useParams<{id:any}>()
    const router = useIonRouter();
    const save = async() => {
        const fileName = `note-${Date.now()}.txt`;
        await Filesystem.writeFile({
            path: `notes/${fileName}`,
            data: content || "",
            directory: Directory.Documents,
            encoding: Encoding.UTF8
        });
        router.goBack(); 
    }
    return (
        <IonPage>
        <IonHeader>
            <IonToolbar>
            <IonTitle>Edit</IonTitle>
            <IonButtons slot="end">
                <IonButton onClick={save}>Save</IonButton>
            </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <ReactQuill theme="snow" value={content} onChange={setContent}/>
        </IonContent>
        </IonPage>
    )
}

export default Edit