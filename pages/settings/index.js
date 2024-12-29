import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

const Settings = () => {
    const { data: session } = useSession();
    const router=useRouter()
    async function logout(){
        await router.push("/")
        await signOut()
    }
    if(session){
        return (
            <>
             <header>
                <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
                  <div className="sm:flex sm:items-start sm:justify-between">
                    <div>
                
                      <div className="sm:flex sm:gap-4 my-4 flex gap-4 items-center">
                       <div class="h-10 w-10">
                        <Image
                        class="h-full w-full rounded-full object-cover object-center"
                        src={session.user.image}
                        alt="userImage"
                        width={30}
                        height={40}
                        />
                      </div>
                      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                       {session.user.name}
                      </h1>
                     </div>
        
                      <p className="mt-1.5 px-6 text-md text-gray-500 max-w-lg">
                        {session.user.email}
                      </p>
                 
                    </div>
        
                    <div className="flex items-center gap-4">
                      <button
                        className="inline-flex items-center justify-center gap-1.5 rounded border border-red-200 px-5 py-3 text-red-700 transition hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring"
                        onClick={logout}
                      >
                        <span className="text-md font-medium"> Logout </span>
        
                      </button>
                    </div>
                  </div>
                </div>
              </header>
            </>
          )
    }
}

export default Settings;