import { useEffect, useState } from "react";

function useHashChange() {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash;
      setHash(newHash);
    };

    // Listen to hashchange events
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return hash;
}

export default useHashChange;
