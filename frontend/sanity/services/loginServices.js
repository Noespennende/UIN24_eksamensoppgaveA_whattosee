import { client } from "../client"
export async function fetchUsers(){
    const data = await client.fetch(`*[_type == "users"]{
        username
    }`)
    
     return data
}

export async function fetchLoggedInUser() {
    const loggedInUser = localStorage.getItem('LoggedInUser');

    if (loggedInUser) {
        
            const userData = await client.fetch(`*[_type == "users" && username == $loggedInUser][0]`, { loggedInUser });
            return userData;
       
        }   
}