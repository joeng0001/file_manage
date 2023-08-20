import {currentUser} from '@clerk/nextjs'


export default async function Page(){

    const user =await currentUser();
    
    // console.log(user)

    return(
        <main>
            <h1> onboarding</h1>
            {/* <div>{user}</div> */}
        </main>
    )
}