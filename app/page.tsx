'use client'
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b pb-6 pt-8 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30">
          Linux do Connect next-auth online demo
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            By moxz
          </a>
        </div>
      </div>

      <div className="">
        <button className="btn btn-primary text-lg gap-x-5" onClick={() => signIn('linuxdo')}>
          <Image src="/linuxdo.png" alt="Linuxdo" width={26} height={26} />
          Sign in with Linux.do
          </button>
      </div>

      <div></div>
    </main>
  );
}
