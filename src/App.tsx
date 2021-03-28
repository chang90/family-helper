import React, { useEffect, useState } from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listLists } from './graphql/queries';
import callGraphQL from './graphql/graphql-api';

// interface ListLists {
//     items: Array<{
//       ListItems: {
//         nextToken: null
//       },
//       createdAt: string,
//       description: string,
//       id: string,
//       title: string,
//       updatedAt: string
//     }>,
//     nextToken: string;
// }

Amplify.configure(awsConfig);

function App() {
  const [list, setList] = useState<any>([]);
  const fetchList = async () => {
    const { data } = await callGraphQL<any>(listLists);
    if (data?.listLists) {
      setList(data.listLists.items);
      console.log(data)
    }
  }

  useEffect(() => {

    fetchList()
  }, []);

  return (
    <AmplifyAuthenticator>
      <div className="App">
        <h1>Hello world</h1>
        <ul>
          {list && list.map((item: { title: string }) => <li key={item.title}>{item.title}</li>)}
        </ul>
        <AmplifySignOut />
      </div>
    </AmplifyAuthenticator>
  );
}

export default App;
