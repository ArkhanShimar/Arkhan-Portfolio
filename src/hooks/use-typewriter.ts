"use client";

import { useEffect, useMemo, useState } from "react";

type Options = {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
};

export function useTypewriter({
  words,
  typeSpeed = 80,
  deleteSpeed = 40,
  delayBetweenWords = 1800,
}: Options) {
  const safeWords = useMemo(() => (words.length ? words : [""]), [words]);
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = safeWords[index % safeWords.length];

    if (!deleting && subIndex === word.length) {
      const timeout = setTimeout(() => setDeleting(true), delayBetweenWords);
      return () => clearTimeout(timeout);
    }

    if (deleting && subIndex === 0) {
      const nextCycle = setTimeout(() => {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % safeWords.length);
      }, deleteSpeed);

      return () => clearTimeout(nextCycle);
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [safeWords, index, subIndex, deleting, typeSpeed, deleteSpeed, delayBetweenWords]);

  return safeWords[index % safeWords.length].substring(0, subIndex);
}
