import * as React from "react";
import { useEffect } from "react";

export default function VideoPlayer() {
  useEffect(() => {
    const videoEl = document.querySelector(".background-video2");
    const handleVideoEnd = () => window.close();

    videoEl.addEventListener("ended", handleVideoEnd);

    return () => {
      videoEl.removeEventListener("ended", handleVideoEnd);
    };
  }, []);

  return (
    <>
      <video className="background-video2" autoPlay>
        <source src="/rolled.mp4" type="video/mp4" />
      </video>
    </>
  );
}
