import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import useS3 from '../../hooks/useS3';
import UploadImage from '../handleImages/UploadImage';
import { API, graphqlOperation } from 'aws-amplify';
import { createList, updateList } from '../../graphql/mutations';


function ListModal({state, dispatch}) {
  const [uploadToS3] = useS3();
  const [fileToUpload, setFileToUpload] = useState()

  const getSelectedFile = (fileName) => {
    setFileToUpload(fileName);
  }

  const saveList = async () => {
    const imageKey = uploadToS3(fileToUpload)
    const { title, description } = state;
    const result = await API.graphql(graphqlOperation(createList, { input: { title, description, imageKey } }));
    dispatch({ type: 'CLOSE_MODAL' })
    console.log('result', result)
  }

  const changeList = async () => {
    const { id, title, description } = state;
    const result = await API.graphql(
      graphqlOperation(updateList, { input: { id, title, description } })
    );
    dispatch({ type: 'CLOSE_MODAL' });
    console.log('Edit data with result: ', result);
  }

  return (
    <Modal open={state.isModalOpen} dimmer='inverted'>
    <Modal.Header>
      {state.modalType === 'add'? 'Create ' : 'Edit '}
      your list</Modal.Header>
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
          <UploadImage getSelectedFile={getSelectedFile}/>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button negative  onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>Cancel</Button>
      <Button positive onClick={() => { state.modalType === 'add' ? saveList() : changeList() }}>{state.modalType === 'add' ? 'Save' : 'Update'}</Button>
    </Modal.Actions>
  </Modal>
  );
}

export default ListModal;