"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { shadow } from "@/styles/utils";
import { Button } from "./ui/button";
import { ModeToggle } from "./dark-mode";
import LogOutBtn from "./LogOutBtn";
import { useUser } from "@/context/UserContext";


const Header = () => {
  const { user, loading } = useUser();

  return <header className=" relative flex h-24 w-full items-center justify-between px-3 sm:px-8 bg-popover"
    style={{
      boxShadow: shadow,
    }}
  >
    <Link href={'/'} className="flex gap-2 items-center">
      <Image src={'/logo.svg'} width={50} height={50} alt="Logo" />
      <h1 className=" pb-1 text-lg font-semibold leading-3">Nexo <span className="text-blue-500">Notes</span></h1>
    </Link>

    <div className="flex gap-4">
      {loading ? (
        <div className="flex gap-2" aria-hidden="true">
          <div className="w-24 h-9 rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700" />
          <div className="w-20 h-9 rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700" />
        </div>
      ) : user ? (
        <LogOutBtn />
      ) : (
        <>
          <Button asChild className="hidden sm:block">
            <Link href={'/sign-up'}>Sign Up</Link>
          </Button>
          <Button asChild variant={"outline"}>
            <Link href={'/login'}>Login</Link>
          </Button>
        </>
      )}
      <ModeToggle />

    </div>
  </header>;
};

export default Header;
