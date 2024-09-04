"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import ReactCardFlip from "react-card-flip";
import { useEffect, useRef, useState, useMemo } from "react";
import ShootingStarBorder from "@/components/ShootingStarBorder";
import StarsBackground from "@/components/StarsBackground";

export default function Card() {
  const { data } = useSession() as any;
  const user = data?.user as any;

  const [isFlipped, setIsFlipped] = useState(false);
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const [size, setSize] = useState({ width: "auto", height: "auto" });

  const getTrustLevelStyle = useMemo(() => {
    if (!user) return {};
    switch (user.trust_level) {
      case 1:
        return { card: "bg-gray-100", text: "text-gray-800" };
      case 2:
        return { card: "bg-violet-900", text: "text-white" };
      case 3:
        return { card: "bg-black/90", text: "text-yellow-400" };
      case 4:
        return { card: "bg-purple-100", text: "text-purple-800" };
      default:
        return { card: "bg-purple-100", text: "text-purple-800" };
    }
  }, [user]);

  const handleClick = (e: any) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    if (frontRef.current) {
      const { offsetWidth, offsetHeight } = frontRef.current;
      setSize({
        width: offsetWidth,
        height: offsetHeight,
      });
    }
  }, [user]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between py-24 overflow-hidden`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed left-0 top-0 flex w-full justify-center border-b pb-6 pt-8 border-neutral-800 bg-zinc-800/50 from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border  lg:p-4">
          Linux do Connect next-auth online demo
        </div>
        <div className="fixed bottom-8 left-0 flex h-48 w-full items-end justify-center lg:static lg:size-auto lg:bg-none">
          <button
            className="btn bg-yellow-300 hover:bg-yellow-300/60 border-yellow-300 hover:border-yellow-300/60 text-lg gap-x-5"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center rounded-md">
        {user ? (
          <Tilt
            perspective={2000}
            scale={1}
            glareEnable={true}
            glareMaxOpacity={0.9}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            trackOnWindow={true}
            className="rounded-md"
          >
            <ShootingStarBorder>
              <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                {user?.trust_level >= 4 ? (
                  <div
                    ref={frontRef}
                    onClick={handleClick}
                    className="isolate rounded-lg ring-1 ring-base-content/5 group gap-x-8 w-96 hover:cursor-pointer"
                  >
                    <StarsBackground className="isolate rounded-lg ring-1 ring-base-content/5 group gap-x-8 w-96 hover:cursor-pointer">
                      <CardFront user={user} />
                    </StarsBackground>
                  </div>
                ) : (
                  <div
                    ref={frontRef}
                    onClick={handleClick}
                    className={`isolate flex flex-col items-center rounded-lg bg-base-300/10 ring-1 ring-base-content/5 hover:cursor-pointer group gap-x-8 w-96 glass ${getTrustLevelStyle.card} ${getTrustLevelStyle.text}`}
                  >
                    <CardFront user={user} />
                  </div>
                )}
                {/* </ShootingStarBorder>
              <ShootingStarBorder> */}
                {user?.trust_level >= 4 ? (
                  <div
                    ref={backRef}
                    onClick={handleClick}
                    className="isolate rounded-lg ring-1 ring-base-content/5 group gap-x-8 w-96 hover:cursor-pointer"
                    style={{ width: size.width, height: size.height }}
                  >
                    <StarsBackground
                      className="isolate rounded-lg ring-1 ring-base-content/5 group gap-x-8 w-96 hover:cursor-pointer"
                      style={{ width: size.width, height: size.height }}
                    >
                      <div className="w-full h-full flex items-center justify-center p-2">
                        <CardBack />
                      </div>
                    </StarsBackground>
                  </div>
                ) : (
                  <div
                    ref={backRef}
                    onClick={handleClick}
                    className={`isolate flex flex-col items-center rounded-lg bg-base-300/10 ring-1 ring-base-content/5 hover:cursor-pointer group p-2 ${getTrustLevelStyle.card} ${getTrustLevelStyle.text}`}
                    style={{ width: size.width, height: size.height }}
                  >
                    <CardBack />
                  </div>
                )}
                {/* </ShootingStarBorder> */}
              </ReactCardFlip>
            </ShootingStarBorder>
          </Tilt>
        ) : (
          <div className="w-96 h-40 skeleton rounded-md"></div>
        )}
      </div>

      <div></div>
    </main>
  );
}

const CardFront = ({ user }: { user: any }) => {
  return (
    <div className="w-full h-full px-8 py-4 rounded-md flex flex-col items-center justify-between">
      <div className="flex flex-row gap-x-8 justify-between w-full">
        <div className="py-8">
          {user?.avatar_url ? (
            <Image
              src={user?.avatar_url}
              alt={""}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="rounded-full skeleton w-10 h-10"></div>
          )}
        </div>
        <div className="flex-1 flex justify-start items-center">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            <dt className="font-semibold text-left text-sm flex items-center">
              用户名
            </dt>
            <dd className="tex-lg flex items-center">{user?.username}</dd>
            <dt className="font-semibold text-left text-sm flex items-center">
              昵称
            </dt>
            <dd className="tex-lg flex items-center">{user?.name}</dd>
            <dt className="font-semibold text-left text-sm flex items-center">
              信任等级
            </dt>
            <dd className="flex items-center gap-x-0.5">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center">
                  {index < (user?.trust_level as number) ? (
                    <StarFillSvg />
                  ) : (
                    <StarEmptySvg />
                  )}
                </div>
              ))}
            </dd>
          </dl>
        </div>
      </div>
      <div className="font-sans font-light text-sm pt-2"><b className="font-bold">ID&nbsp;</b> {user?.id}</div>
    </div>
  );
};

const CardBack = () => {
  return (
    <div className="w-full flex flex-col gap-x-8 justify-between h-full items-center">
      <div></div>
      <Image
        src={"/linuxdo.png"}
        alt={""}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="shimmer text-sm pb-2 font-bold">
        真诚、友善、团结、专业
      </div>
    </div>
  );
};

const StarFillSvg = () => {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
        fill="currentColor"
      />
    </svg>
  );
};

const StarEmptySvg = () => {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
};
