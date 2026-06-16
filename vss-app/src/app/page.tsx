"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <div className="app">
        <aside className="sidebar" id="sidebar"></aside>
        <div className="main">
          <header className="header" id="header"></header>
          <div className="content" id="content"></div>
          <div className="np" id="np"></div>
        </div>
      </div>
      <div className="ov" id="ov" onClick={() => (window as any).CM?.()}>
        <div className="modal" id="mbox" onClick={(e) => e.stopPropagation()}>
          <div id="mc"></div>
        </div>
      </div>
      <Script src="/js/legacy-app.js" strategy="lazyOnload" />
    </>
  );
}
