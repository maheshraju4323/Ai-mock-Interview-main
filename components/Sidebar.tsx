import React from 'react'
import {cn} from "@/lib/utils"
import Image from "next/image";
import SideBarItem from './SideBarItem';
import { UserButton, SignOutButton, SignedIn } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';

type Props = {
  className?: string
}

const Sidebar = ({className}: Props) => {
  return (
    <div className={cn("flex h-[100vh] lg:w-[20vw] w-full px-0 lg:px-4 border-r-2 flex-col left-0 top-0 justify-between py-4",className)} >
      <div>
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3" >
          <Image src="/logo.svg" height={40} width={40} alt="logo" />
          <h1 className='text-2xl font-semibold text-black-600 tracking-wide' >Techo</h1>
        </div>
        <div className='flex flex-col gap-y-5 flex-1' >
          <SideBarItem label="Learn" href='/dashboard/learn' iconSrc="/home.svg" />
          <SideBarItem label="Leaderboard" href='/dashboard/leaderboard' iconSrc="/medal.svg" />
          <SideBarItem label="quest" href='/dashboard/quest' iconSrc="/archery.svg" />
          <SideBarItem label="shop" href='/dashboard/shop' iconSrc="/shop.svg" />
        </div>
      </div>
      <SignedIn>
        <div className="p-3 border-t flex items-center justify-between">
          <UserButton afterSignOutUrl="/" />
          <SignOutButton redirectUrl="/">
            <button className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium px-2 py-1 rounded-md hover:bg-red-50 transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </SignOutButton>
        </div>
      </SignedIn>
    </div>
  )
}

export default Sidebar