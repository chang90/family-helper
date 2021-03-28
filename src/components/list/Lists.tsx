import React from 'react';
import { Item, List } from 'semantic-ui-react';

const Lists: React.FC<{lists: any}> = ({lists}) => {
  return (
    <Item.Group>
      {lists && lists.map((item: { title: string, description: string, createdAt: string }) => (
      <List key={item.title}>
        <Item>
          <Item.Image
            size='tiny'
            src='https://react.semantic-ui.com/images/wireframe/image.png'
          />
          <Item.Content>
            <Item.Header>{item.title}</Item.Header>
            <Item.Description>{item.description}</Item.Description>
            <Item.Extra>{new Date(item.createdAt).toDateString()}</Item.Extra>
          </Item.Content>
        </Item>
      </List>
      ))}
    </Item.Group>
  );
}

export default Lists;