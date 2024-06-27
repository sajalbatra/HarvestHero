"use client"
import React, { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import DarkMode from "./darkTheme";
export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {

  return (
    <RecoilRoot>
      <DarkMode>
        {children}
        </DarkMode>
    </RecoilRoot>
  );
}
