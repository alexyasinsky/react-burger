import { useCallback} from "react";


export const useAPI = () => {

  const getData = useCallback(async (url) => {
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка ${response.status}`); 
    }
  }, [])
  
  return {
    getData
  };
};