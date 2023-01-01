import { useEffect, useState } from "react";
import starterNotes from "../starterNotes";
import starterTags from "../starterTags";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  //checks if value exists
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)();
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(jsonValue);
    }
  });

  localStorage.setItem("NOTES", JSON.stringify(starterNotes));
  localStorage.setItem("TAGS", JSON.stringify(starterTags));

  //if it does, it is updated
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [T, typeof setValue];
}
