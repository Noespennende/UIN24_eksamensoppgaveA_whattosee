import { client } from "../test"
export async function fetchUsers(){
    const data = await client.fetch(`*[_type == "users"]{
        username
    }`)
    
     return data
}