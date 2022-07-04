import React from 'react';
import {MenuIcon} from "@heroicons/react/outline"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, provider } from '../firebase';
import { useNavigate} from 'react-router-dom';
const Header = () => {
  const [user]=useAuthState(auth);
  const navigate=useNavigate();
  const signIn=(e)=>{
        e.preventDefault();
        auth.signInWithPopup(provider).then(()=>navigate("/channels")).catch((error)=>alert(error.message));
  }
  return (
    <header className='flex items-center justify-between py-4 px-6 bg-discord_blue'>
      <a href='/'>
        <img
          src='https://i.ibb.co/Y8vBXm9/Discord-Logo-Wordmark-White.png'
          alt=''
          className='w-32 h-12 object-contain '
        />
      </a>
      <div className='hidden lg:flex space-x-6 text-white'>
        <a href='https://discord.com/download' className='link'>
          Download
        </a>
        <a href='https://discord.com/download' className='link'>
          Nitro
        </a>
        <a href='https://discord.com/safety' className='link'>
          Safety
        </a>
        <a href='https://support.discord.com/hc/en-us' className='link'>
          Help Center
        </a>
        <a href='/' className='link'>
          Why Discord?
        </a>
      </div>
      <div className='flex space-x-4'>
        <button onClick={!user ?signIn:()=>{navigate("/channels")}} className='bg-white p-2 rounded-full text-xs md:text-sm px-4 focus:outline-none hover:shadow-2xl hover:text-discord_blurple transition duration-200 ease-in-out whitespace-nowrap font-medium'>
          {!user ?"Login":"Open Disocrd"}
        </button>
        <MenuIcon className='h-9 text-white cursor-pointer lg:hidden'/>
      </div>
    </header>
  );
};

export default Header;
