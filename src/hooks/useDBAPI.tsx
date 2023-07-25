import { useEffect, useState } from "react"
import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';
PouchDB.plugin(PouchdbFind);


export default function useDBAPI(user1:string): any{
    const [error, setError] = useState<unknown>();
    const [seatedArray, setSeatedArray] = useState<PouchDB.Core.ExistingDocument<{}>[]|undefined>([]);
    const [totalSeated, setTotalSeated] = useState<null|number>();
    // const [fetchState, setFetchState] = useState<boolean>(false);
    const [DBState, setDBState] = useState<undefined|string>(); // move up
    const [isLoading, setIsLoading] = useState<boolean>()
    
    async function send(doc:any){
        setIsLoading(true)
        const db = new PouchDB("http://localhost:5984/test_wedding", {auth: {username: "admin", password:"hieg"}});

        var res = await db.put(doc);
        setDBState(res.rev);
    };
    
    useEffect(() => {
        // setIsLoading(true)
        const pullDB = async(user:any) => {
            const db = new PouchDB("http://localhost:5984/test_wedding", {auth: {username: "admin", password:"hieg"}});
            console.log("loading state 1"+isLoading)
            setIsLoading(true)
            
            console.log("loading state 2"+isLoading)
            try{
                const seated = await db.find({
                    selector:{
                        seated: 1,
                        seated_by: user?.id
                    }
                })
                const total = await db.find({
                    selector:{
                        seated: 1
                    }
                })
                
                setSeatedArray(seated.docs)
                setTotalSeated(total.docs.length)
                // console.log(seated.docs)
            }catch(err){
                console.log(err)
            }
            console.log("loading state 3"+isLoading)
            setIsLoading(false)

            console.log("loading state 4"+isLoading)
        }
        pullDB(user1)
        // console.log(totalSeated)
        console.log("loading state 5"+isLoading)
      }, [DBState])

    
    return [{ seatedArray, totalSeated, error, isLoading }, setDBState, send]
    // return { seatedArray:["nothing"], totalSeated, error}
}