import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';


function ListModal({state, dispatch, saveList, changeList}) {
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