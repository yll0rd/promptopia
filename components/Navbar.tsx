"use client";

import {ClientSafeProvider, getProviders, LiteralUnion, signIn, signOut, useSession} from "next-auth/react";
import Image from "next/image"
import Link from "next/link"
import {useEffect, useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {type BuiltInProviderType} from "next-auth/providers/index";

const Nav = () => {
  // const isUserLoggedIn = false;
    const { data: session } = useSession()
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
  const [toggleDropDown, setToggleDropDown] = useState(false)

  useEffect(() => {
    const fetchProviders = async () => {
        return await getProviders()
    }

    fetchProviders().then(setProviders)
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href='/' className="flex gap-2 flex-center">
        <Image 
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
          />
          <p className="logo_text">Promptopia</p>

      </Link>


      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={'/create-prompt'} className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={() => signOut()} className="outline_btn">
              Sign Out
            </button>


            <Link href={'/profile'}>
              {/*<Image*/}
              {/*  src={session?.user.image}*/}
              {/*  width={37}*/}
              {/*  height={37}*/}
              {/*  className="rounded-full"*/}
              {/*  alt="profile" */}
              {/*/>*/}
                <Avatar className="w-[37px] h-[37px]">
                    <AvatarImage src={session.user.image as string} />
                    <AvatarFallback>{session.user.name?.slice(0,2)}</AvatarFallback>
                </Avatar>
            </Link>

          </div>
        ): (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign in
              </button>
            ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            {/*<Image*/}
            {/*    src={session?.user.image}*/}
            {/*    width={37}*/}
            {/*    height={37}*/}
            {/*    className="rounded-full"*/}
            {/*    alt="profile"*/}
            {/*    onClick={() => setToggleDropDown(prev => !prev)}*/}
            {/*  />*/}
              <Avatar className="w-[37px] h-[37px]" onClick={() => setToggleDropDown(prev => !prev)}>
                  <AvatarImage src={session.user.image as string} />
                  <AvatarFallback>{session.user.name?.slice(0,2)}</AvatarFallback>
              </Avatar>
            
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}

          </div>
        ): (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign In
              </button>
            ))}
          </>
        )}
      </div>

    </nav>
  )
}

export default Nav