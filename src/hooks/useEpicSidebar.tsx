import { useEffect, useState } from "react"
import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';
PouchDB.plugin(PouchdbFind);


export default function useEpicSidebar(user:string): any{
    const [error, setError] = useState<unknown>();
    const [seatedArray, setSeatedArray] = useState<PouchDB.Core.ExistingDocument<{}>[]|undefined>([]);
    const [totalSeated, setTotalSeated] = useState<null|number>();
    const [fetchState, setFetchState] = useState<boolean>(false);
    
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
        } finally{
        }
    }, [fetchState])

    if (seatedArray) return { seatedArray, totalSeated, error, setFetchState }
    // return { seatedArray:["nothing"], totalSeated, error}
}