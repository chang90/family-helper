import React, { useEffect, useRef, useState } from 'react';
import { Button, Header, Image } from 'semantic-ui-react';
import { Storage } from 'aws-amplify';


const UploadImage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState('https://react.semantic-ui.com/images/wireframe/image.png')
  const [fileName, setFileName] = useState<any>();

  useEffect(() => {
    if(!fileName) return;

    const [file, extension] = fileName.name.split(".")[1]
    const mimeType = fileName.type;
    const key = `images/lists/${file}.${extension}`;
    const result = Storage.put(key, file, {
      contentType: mimeType,
      metadata: {
        app: 'family helper'
      } 
    });
    console.log(result)
  },[fileName])

  const handleInputChange = (event: {target: HTMLInputElement}) => {
    if(event?.target?.files) {
      const fileToUpload = event.target.files[0];
      if (!fileToUpload) return;
      const fileSampleUrl = URL.createObjectURL(fileToUpload);
      setImage(fileSampleUrl);
      setFileName(fileToUpload)
    }

  }
  return (
    <>
      <Header as='h4'>Upload your image</Header>
      <Image
      size='tiny'
      src={image}
      />
      <input type='file' onChange={handleInputChange} className='hide' ref={inputRef}/>
      <Button onClick={() => inputRef?.current?.click()}>Upload Image</Button>
    </>
  );
}

export default UploadImage;