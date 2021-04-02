import React from 'react';
import { Icon, Item, List } from 'semantic-ui-react';

const Lists: React.FC<{lists: any, dispatch: any}> = ({lists, dispatch}) => {  
  return (
    <Item.Group>
      {lists && lists.map((item: {id: string, title: string, description: string, createdAt: string }) => (
      <List key={item.id}>
        <Item>
          <Item.Image
            size='tiny'
            src='https://react.semantic-ui.com/images/wireframe/image.png'
          />
          <Item.Content>
            <Item.Header>{item.title}</Item.Header>
            <Item.Description>{item.description}</Item.Description>
            <Item.Extra>
              {new Date(item.createdAt).toDateString()}
              <Icon name='trash' onClick={() => dispatch({type:'DELETE_LIST', value: item.id})}/>
              <Icon name='edit' onClick={() => dispatch({type:'EDIT_LIST', value: item})}/>
            </Item.Extra>
          </Item.Content>
        </Item>
      </List>
      ))}
    </Item.Group>
  );
}

export default Lists;