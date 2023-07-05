import { IonGrid, IonCol, IonRow, IonSelectOption, IonSelect, IonTextarea } from "@ionic/react";
import "./GuestCell.css"

import React from "react";

const GuestCellSelect = ({ label, formName, onChange }: {label: string, formName:string, onChange:any}) => {
  return (
        <IonGrid>
            <IonRow className="ion-justify-content-end">
                <IonCol>
                    <span className="label">{label}</span>
                </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-end">
                <IonCol>
                    <IonSelect name={formName} placeholder="0" onIonChange={onChange}>
                        <IonSelectOption value="0">0</IonSelectOption>
                        <IonSelectOption value="1">1</IonSelectOption>
                        <IonSelectOption value="2">2</IonSelectOption>
                        <IonSelectOption value="3">3</IonSelectOption>
                        <IonSelectOption value="4">4</IonSelectOption>
                        <IonSelectOption value="5">5</IonSelectOption>
                    </IonSelect>
                </IonCol>
            </IonRow>
        </IonGrid>
  );
};

const GuestCell = ({ label, value }: {label: string, value: any}) => {
    return (
          <IonGrid>
              <IonRow>
                  <IonCol>
                      <span className="label">{label}</span>
                  </IonCol>
              </IonRow>
              <IonRow>
                  <IonCol>
                      <span className="value">{value}</span>
                  </IonCol>
              </IonRow> 
          </IonGrid>
    );
  };

const GuestCellTextarea = ({ label, formName, onChange, value }: {label: string, formName: string, onChange:any, value:string}) => {
    return (
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <span className="label">{label}</span>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonTextarea name={formName} placeholder="Any notes?" onIonChange={onChange} defaultValue={value}></IonTextarea>
                    </IonCol>
                </IonRow> 
            </IonGrid>
    );
};
  
  export {GuestCell, GuestCellSelect, GuestCellTextarea};