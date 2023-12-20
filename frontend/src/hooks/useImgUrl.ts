import { useEffect, useState } from 'react';
import axios from '../services/api/axios';

function useImgUrl(fileName: string): Promise<string | null> {
  
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {

    const getImgUrl = async () => {
      try {
        const response = await axios.get(`/images/${fileName}`);
        setImageUrl(response.data.url);
      } catch (error) {
        //TODO handle
        console.error('Error fetching image URL:', error);
        setImageUrl(null);
      }
    };

    getImgUrl();
  }, [fileName]);

  return new Promise<string | null>((resolve) => {
    resolve(imageUrl);
  });
}

export default useImgUrl;