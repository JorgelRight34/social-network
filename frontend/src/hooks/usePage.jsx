import { useEffect, useState } from "react";

const usePage = () => {
  const [page, setPage] = useState(1);
  const [stopFetching, setStopFetching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (stopFetching) {
        return;
      }

      const { scrollTop, scrollHeight } = document.documentElement;
      const { innerHeight } = window;

      // Check if scrolled to the bottom
      if (scrollTop + innerHeight >= scrollHeight) {
        setPage((prev) => prev + 1);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return [page, setPage, stopFetching];
};

export default usePage;
