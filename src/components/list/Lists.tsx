import React from 'react';
import {Item} from 'semantic-ui-react';
import List from './List';


const Lists: React.FC<{lists: any, dispatch: any}> = ({lists, dispatch}) => { 
 
  return (
    <Item.Group>
      {lists && lists.map((item: {id: string, title: string, description: string, createdAt: string, imageKey: string; }) => (
      <List key={item.id} {...item} dispatch={dispatch}></List>
      ))}
    </Item.Group>
  );
}

export default Lists;