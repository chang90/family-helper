import { Storage } from 'aws-amplify';
import {v4 as uuidv4} from 'uuid';

const useS3 = () => {
  const saveToS3 = (fileName: File ) => {
    if(!fileName) return;
    const [file, extension] = fileName.name.split(".")
    const mimeType = fileName.type;
    const key = `images/lists/${file}_${uuidv4()}.${extension}`;
    const result = Storage.put(key, fileName, {
      contentType: mimeType,
      metadata: {
        app: 'family helper'
      } 
    });
    console.log(result)
    return key;
  }
  return [saveToS3]
}

export default useS3;