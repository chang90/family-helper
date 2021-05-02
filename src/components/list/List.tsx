import React, { useEffect, useState } from 'react';
import { Icon, Item, Image } from 'semantic-ui-react';
import { Storage } from 'aws-amplify';

const List: React.FC<{ id: string, title: string, description: string, imageKey: string, createdAt: string, dispatch: any }> = (props) => {
  const { id, title, description, imageKey, createdAt, dispatch } = props;
  const [imageUrl, setImageUrl] = useState('https://react.semantic-ui.com/images/wireframe/image.png');
  async function fetchImageUrl() {
    console.log('imageKey', imageKey)
    const imgUrl = await Storage.get(imageKey);
    console.log(imgUrl)
    setImageUrl(imgUrl as string);
  }

  useEffect(() => {
    if (imageKey) {
      fetchImageUrl();
    }
  })

  return (
    <Item>
      <Image size='tiny'
        src={imageUrl}
      />
      <Item.Content>
        <Item.Header>{title}</Item.Header>
        <Item.Description>{description}</Item.Description>
        <Item.Extra>
          {new Date(createdAt).toDateString()}
          <Icon name='trash' onClick={() => dispatch({ type: 'DELETE_LIST', value: id })} />
          <Icon name='edit' onClick={() => dispatch({ type: 'EDIT_LIST', value: props })} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}

export default List;