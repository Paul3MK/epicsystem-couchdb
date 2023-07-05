import { useEffect, useState } from "react"
import PouchDB from 'pouchdb';


export default function useEpicLayout() {
    const [dbInfo, setDbInfo] = useState<PouchDB.Core.DatabaseInfo>();
    const [guestList, setGuestList] = useState<PouchDB.Query.Response<{}> | null>(null); //useful for checks; if guestList is null, we know something hasn't happened
    const [error, setError] = useState<unknown>();
    
    useEffect(() => {
        
        const getData = async() => {
            const db = new PouchDB("http://localhost:5984/test_wedding", {auth: {username: "admin", password:"hieg"}});
            const info = await db.info()
            const filter = await db.query("test1/my_filter", {stale: "ok"})

            setDbInfo(info);
        
            setGuestList(filter);
        }
        
        try{
            getData()
        } catch(err){
            setError(err);
        }
    })

    return { dbInfo, guestList, error }
}