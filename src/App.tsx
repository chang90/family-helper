import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsConfig from './aws-exports';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listLists } from './graphql/queries';
import callGraphQL from './graphql/graphql-api';
import MainHeader from './components/headers/MainHeader';
import Lists from './components/list/Lists';
import { Button, Container, Form, Icon, Modal } from 'semantic-ui-react';
import { createList, deleteList } from './graphql/mutations';
import { onCreateList, onDeleteList } from './graphql/subscriptions';


interface ListData {

  listLists: {
    items: ListItem[],
    nextToken: string;
  }
}

interface ListItem {
  ListItems: {
    nextToken: null
  },
  createdAt: string,
  description: string,
  id: string,
  title: string,
  updatedAt: string
}

Amplify.configure(awsConfig);

const initialState = {
  id: '',
  title: '',
  description: '',
  lists: [],
  isModalOpen: false,
  modalType: '',
};

function listReducer(state: any = initialState, action: { type: string, value?: any }) {
  let newList;
  switch (action.type) {
    case 'DESCRIPTION_CHANGED':
      return { ...state, description: action.value };
    case 'TITLE_CHANGED':
      return { ...state, title: action.value };
    case 'UPDATE_LISTS':
      return { ...state, lists: [...action.value, ...state.lists] };
    case 'OPEN_MODAL':
      return { ...state, isModalOpen: true, modalType: 'add' };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false,
        title: '',
        description: '',
        id: '',
      };
    case 'DELETE_LIST':
      deleteListById(action.value);
      return { ...state };
    case 'DELETE_LIST_RESULT':
      newList = state.lists.filter((item: { id: string }) => item.id !== action.value);
      return { ...state, lists: newList };
    case 'UPDATE_LIST_RESULT':
      const index = state.lists.findIndex(
        (item: { id: string }) => item.id === action.value.id
      );
      newList = [...state.lists];
      delete action.value.listItems;
      newList[index] = action.value;
      return { ...state, lists: newList };
    case 'EDIT_LIST': {
      const newValue = { ...action.value };
      delete newValue.children;
      delete newValue.listItems;
      delete newValue.dispatch;
      console.log(newValue);
      return {
        ...state,
        isModalOpen: true,
        modalType: 'edit',
        id: newValue.id,
        title: newValue.title,
        description: newValue.description,
      };
    }
    default:
      console.log('Default action for: ', action);
      return state;
  }
}

const deleteListById = async (id: string) => {
  await API.graphql(graphqlOperation(deleteList, { input: { id } }))
}

function App() {
  const [state, dispatch] = useReducer(listReducer, initialState);
  const [lists, setLists] = useState<ListItem[]>([]);

  const fetchList = async () => {
    const { data } = await callGraphQL<ListData>(listLists);
    dispatch({ type: 'UPDATE_LISTS', value: (data as any).listLists.items });
    if (data?.listLists?.items) {
      setLists(data.listLists.items);
    }
    console.log(lists)
  }

  useEffect(() => {
    fetchList()
  }, []);

  useEffect(() => {
    let createListSub =
      API.graphql(graphqlOperation(onCreateList))
    if ("subscribe" in createListSub) {
      createListSub.subscribe({
        next: (object: { value: { data: { onCreateList: any } } }) => {
          console.log('123',object.value.data.onCreateList)
          dispatch({
            type: 'UPDATE_LISTS',
            value: [object.value.data.onCreateList],
          });
        }
      })
    }

    let deleteListSub =
      API.graphql(graphqlOperation(onDeleteList))
    if ("subscribe" in deleteListSub) {
      deleteListSub.subscribe({
        next: (object: { value: { data: { onDeleteList: any } } }) => {
          console.log('onDeleteList called',object.value.data.onDeleteList.id);
          dispatch({
            type: 'DELETE_LIST_RESULT',
            value: object.value.data.onDeleteList.id,
          });
        }
      })
    }

    return () => {
      if ("unsubscribe" in createListSub) {
        (createListSub as any).unsubscribe();
      }
      if ("unsubscribe" in deleteListSub) {
        (deleteListSub as any).unsubscribe();
      }
    }
  }, []);



  const saveList = async () => {
    const { title, description } = state;
    const result = await API.graphql(graphqlOperation(createList, { input: { title, description } }));
    dispatch({ type: 'CLOSE_MODAL' })
    console.log('result', result)
  }

  return (
    <AmplifyAuthenticator>
      <Container>
        <AmplifySignOut />
        <Button className='floatingButton' onClick={() => dispatch({ type: 'OPEN_MODAL' })}>
          <Icon name='plus' className='floatingButton_icon' />
        </Button>
        <MainHeader />
        <Lists lists={state.lists} dispatch={dispatch} />
      </Container>
      <Modal open={state.isModalOpen} dimmer='inverted'>
        <Modal.Header>Create your list</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              error={true ? false : { content: 'Please add a name to your list' }}
              label="Title"
              placeholder="My pretty list"
              value={state.title}
              onChange={(e) => dispatch({ type: 'TITLE_CHANGED', value: e.target.value })}></Form.Input>
            <Form.TextArea
              label='Description'
              placeholder='Things that my pretty list is about'
              value={state.description}
              onChange={(e) => dispatch({ type: 'DESCRIPTION_CHANGED', value: e.target.value })}></Form.TextArea>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative  onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>Cancel</Button>
          <Button positive onClick={() => { saveList() }}>Save</Button>
        </Modal.Actions>
      </Modal>
    </AmplifyAuthenticator>
  );
}

export default App;
