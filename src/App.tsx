import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listLists } from './graphql/queries';
import callGraphQL from './graphql/graphql-api';
import MainHeader from './components/headers/MainHeader';
import Lists from './components/list/Lists';
import { Button, Container, Form, Icon, Modal } from 'semantic-ui-react';


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
  title: '',
  description: ''
}

function listReducer(state = initialState, action: {type: string, value: string}) {
  switch (action.type) {
    case 'DESCRIPTION_CHANGED':
      return {...state, description: action.value};
    case 'TITLE_CHANGED':
      return {...state, title: action.value};
    default:
      console.log('Default action for: ', action)
      return state
  }
}

function App() {


  const [state, dispatch] = useReducer(listReducer, initialState);
  const [lists, setLists] = useState<ListItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchList = async () => {
    const { data } = await callGraphQL<ListData>(listLists);
    if (data?.listLists?.items) {
      setLists(data.listLists.items);
    }
  }

  useEffect(() => {

    fetchList()
  }, []);

  const toggleModal = (shouldOpen: boolean) => {
    setIsModalOpen(shouldOpen);
  }

  return (
    <AmplifyAuthenticator>
      <Container>
        <AmplifySignOut />
        <Button className='floatingButton' onClick={() => toggleModal(true)}>
          <Icon name='plus' className='floatingButton_icon' />
        </Button>
        <MainHeader />
        <Lists lists={lists} />
      </Container>
      <Modal open={isModalOpen} dimmer='inverted'>
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
          <Button negative onClick={() => { toggleModal(false) }}>Cancel</Button>
          <Button positive onClick={() => { toggleModal(false) }}>Save</Button>
        </Modal.Actions>
      </Modal>
    </AmplifyAuthenticator>
  );
}

export default App;
