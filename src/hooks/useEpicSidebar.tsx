import { useEffect, useState } from "react"
import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';
PouchDB.plugin(PouchdbFind);


export default function useEpicSidebar(user:string) {
    const [error, setError] = useState<unknown>();
    const [seatedArray, setSeatedArray] = useState<null|Array<{}>>(null);
    const [totalSeated, setTotalSeated] = useState<null|number>();
    
    useEffect(() => {
        
        const getData = async(user:string) => {
            const db = new PouchDB("http://localhost:5984/test_wedding", {auth: {username: "admin", password:"hieg"}});


            const sArray = await db.find({
                selector:{
                    seated: 1,
                    seated_by: user
                }
            })

            const total = await db.find({
                selector:{
                    seated: 1
                }
            })

            setSeatedArray(sArray.docs)
            setTotalSeated(total.docs.length)
        }
        
        try{
            getData(user)
        } catch(err){
            setError(err);
        }
    }, [])

    return { seatedArray, totalSeated, error }
}