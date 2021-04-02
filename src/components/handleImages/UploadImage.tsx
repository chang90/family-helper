import React, { useRef, useState } from 'react';
import { Button, Header, Image } from 'semantic-ui-react';


const UploadImage: (input:any) => void = ({getSelectedFile}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState('https://react.semantic-ui.com/images/wireframe/image.png')



  const handleInputChange = (event: {target: HTMLInputElement}) => {
    if(event?.target?.files) {
      const fileToUpload = event.target.files[0];
      if (!fileToUpload) return;
      const fileSampleUrl = URL.createObjectURL(fileToUpload);
      setImage(fileSampleUrl);
      getSelectedFile(fileToUpload);
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