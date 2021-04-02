import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsConfig from './aws-exports';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listLists } from './graphql/queries';
import callGraphQL from './graphql/graphql-api';
import MainHeader from './components/headers/MainHeader';
import Lists from './components/list/Lists';
import { Button, Container, Icon } from 'semantic-ui-react';
import { deleteList } from './graphql/mutations';
import { onCreateList, onDeleteList, onUpdateList } from './graphql/subscriptions';
import ListModal from './components/models/ListModal';


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
      console.log('UPDATE_LIST_RESULT', newList)
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let createListSub =
      API.graphql(graphqlOperation(onCreateList))
    if ("subscribe" in createListSub) {
      createListSub.subscribe({
        next: (object: { value: { data: { onCreateList: any } } }) => {
          dispatch({
            type: 'UPDATE_LISTS',
            value: [object.value.data.onCreateList],
          });
        }
      })
    }

    let editListSub =
      API.graphql(graphqlOperation(onUpdateList))
    if ("subscribe" in editListSub) {
      editListSub.subscribe({
        next: (object: { value: { data: { onUpdateList: any } } }) => {
          console.log('onUpdateList called', object.value.data.onUpdateList);
          dispatch({
            type: 'UPDATE_LIST_RESULT',
            value: object.value.data.onUpdateList
          });
        }
      })
    }

    let deleteListSub =
      API.graphql(graphqlOperation(onDeleteList))
    if ("subscribe" in deleteListSub) {
      deleteListSub.subscribe({
        next: (object: { value: { data: { onDeleteList: any } } }) => {
          console.log('onDeleteList called', object.value.data.onDeleteList.id);
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
      if ("unsubscribe" in editListSub) {
        (editListSub as any).unsubscribe();
      }
    }
  }, []);






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
      <ListModal state={state} dispatch={dispatch} />
    </AmplifyAuthenticator>
  );
}

export default App;
