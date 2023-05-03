import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { createItem, deleteItem, getItemById, updateItem } from "../../api/TodoItemAPI";
import LoadingActions from '../../store/actions/LoadingActions';
import { createLoadingSelector } from '../../store/selectors/LoadingSelectors';
import { connectToRedux } from '../../utils/ReduxConnect';
import CreateUpdateItemForm from './CreateUpdateItemForm';

function CreateUpdateItemScreen({ navigation, route, startLoading, stopLoading }) {
  const [item, setItem] = useState();
  const itemId = route.params?.itemId;

  const remove = () => {
    startLoading({ key: 'deleteItem' });
    deleteItem(itemId)
      .then(() => navigation.goBack())
      .finally(() => stopLoading({ key: 'deleteItem' }));
  };

  useFocusEffect(
    useCallback(() => {
      if (itemId) {
        startLoading({ key: 'getItem' });
        getItemById(itemId)
          .then((data = {}) => setItem(data))
          .finally(() => stopLoading({ key: 'getItem' }));
      }
    }, []),
  );

  const submit = data => {
    startLoading({ key: 'saveItem' });
    let request;
    if (data.id) {
      request = updateItem(itemId, data.text);
    } else {
      request = createItem(data.text);
    }

    request
      .then(() => {
        navigation.goBack();
      })
      .finally(() => stopLoading({ key: 'saveItem' }));
  };

  return (
    <CreateUpdateItemForm
      editingItem={item}
      submit={submit}
      remove={remove}
    />
  )
}

CreateUpdateItemScreen.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: CreateUpdateItemScreen,
  stateProps: state => ({ loading: createLoadingSelector()(state) }),
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
  },
});