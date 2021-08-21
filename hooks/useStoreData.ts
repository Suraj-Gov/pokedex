import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function useStoreData<T>(
  key: string
): [parsedData: T | null, setStoreData: (dataObj: T) => Promise<boolean>] {
  const [parsedData, setParsedData] = useState<T | null>(null);

  useEffect(() => {
    (async function () {
      try {
        const storeData = await AsyncStorage.getItem(key);
        if (storeData === null) {
          setParsedData(null);
          return;
        }
        setParsedData(JSON.parse(storeData));
      } catch (err) {
        setParsedData(null);
      }
    })();
  }, []);

  const setStoreData = async (dataObj: T) => {
    try {
      const newStoreData = JSON.stringify(dataObj);
      await AsyncStorage.setItem(key, newStoreData);
      setParsedData(dataObj);
      return true;
    } catch (err) {
      return false;
    }
  };

  return [parsedData, setStoreData];
}
