"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const TopLoaderProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#BEF264"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default TopLoaderProvider;
