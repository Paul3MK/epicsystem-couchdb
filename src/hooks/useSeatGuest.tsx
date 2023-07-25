import PouchDB from 'pouchdb';
import useDBAPI from './useDBAPI';


export default function useSeatGuest(user:any){
    const [{}, setDBS] = useDBAPI(user.id);

    
    async function send(doc:any){
        const db = new PouchDB("http://localhost:5984/test_wedding", {auth: {username: "admin", password:"hieg"}});

        var res = await db.put(doc);
        await setDBS(res.rev);
    };


    try{
        return send
    } catch(err) {
        return err
    };
}

