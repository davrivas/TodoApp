import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LocalizationContext } from '../contexts/LocalizationContext';
import TodoListScreen from '../screens/TodoList/TodoListScreen';
import CreateUpdateItemScreen from '../screens/CreateUpdateItem/CreateUpdateItemScreen';
import AddIcon from '../components/AddIcon/AddIcon';

const Stack = createNativeStackNavigator();

export default function TodoItemNavigator() {
  const {t} = React.useContext(LocalizationContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TodoList"
        component={TodoListScreen}
        options={({navigation}) => ({
          // title: t('AbpTodo::Todo'),
          title: 'To do list',
          headerRight: () => <AddIcon onPress={() => navigation.navigate('CreateUpdateItem')}/>,
        })}
      />
      <Stack.Screen
        name="CreateUpdateItem"
        component={CreateUpdateItemScreen}
        options={({ route }) => ({
          // title: t(route.params?.tenantId ? 'AbpTenantManagement::Edit' : 'AbpTenantManagement::NewTenant'),
          title: route.params?.itemId ? 'Update item' : 'Create item'
          })}
      />
    </Stack.Navigator>
  );
}