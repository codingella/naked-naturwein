"use client";
import Link, { LinkProps } from "next/link";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  children,
  href,
  ...props
}) => {
  const router = useRouter();
  const pathname = usePathname();


  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const transitionContainer = document.querySelector(".transitionContainer");

    transitionContainer?.classList.add("page-transition");
    await sleep(320);
    router.push(href);
    if(href === pathname) {
      await sleep(320);
      transitionContainer?.classList.remove("page-transition");
    }

  };

    // as soon as Next swaps in the new route (i.e. `pathname` changes),
  // clear out our transition class
  useEffect(() => {
    const container = document.querySelector(".transitionContainer")
    if (!container) return
    const transitionContainer = document.querySelector(".transitionContainer");
    transitionContainer?.classList.remove("page-transition");
  }, [pathname])

  return (
    <Link {...props} href={href} onClick={handleTransition}>
      {children}
    </Link>
  );
};