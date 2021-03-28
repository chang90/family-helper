import React, { useEffect, useState } from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listLists } from './graphql/queries';
import callGraphQL from './graphql/graphql-api';
import MainHeader from './components/headers/MainHeader';
import Lists from './components/list/Lists';
import { Button, Container, Icon } from 'semantic-ui-react';


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

function App() {
  const [lists, setLists] = useState<ListItem[]>([]);
  const fetchList = async () => {
    const { data } = await callGraphQL<ListData>(listLists);
    if (data?.listLists?.items) {
      setLists(data.listLists.items);
    }
  }

  useEffect(() => {

    fetchList()
  }, []);

  return (
    <AmplifyAuthenticator>
      <AmplifySignOut />
      <Button className='floatingButton'>
        <Icon name='plus' className='floatingButton_icon' />
      </Button>
      <Container>
        <MainHeader />
        <Lists lists={lists} />
      </Container>
    </AmplifyAuthenticator>
  );
}

export default App;
