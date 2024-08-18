
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { themeState } from "../Recoil/Atoms/themechange";

export default function DarkMode({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  // Read themeState using useRecoilValue
  const themeClass = useRecoilValue(themeState);

  useEffect(() => {
    // Update local state (if needed) based on themeState changes
    localStorage.setItem("themePreference", themeClass);
  }, [themeClass]); // Effect runs whenever themeClass changes

  return (
    <div className={`${themeClass}`}>
      {children}
    </div>
  );
}
