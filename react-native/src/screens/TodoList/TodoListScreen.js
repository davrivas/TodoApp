import { Box, Text, HStack, Pressable } from 'native-base';
import { getItems } from "../../api/TodoItemAPI";
import React from 'react';
import { LocalizationContext } from '../../contexts/LocalizationContext';
import DataList from '../../components/DataList/DataList';
import { StyleSheet, View } from 'react-native';

function TodoListScreen({ navigation }) {
  const { t } = React.useContext(LocalizationContext);

  return (
    <>
      <Box
        w={{
          base: '100%',
          md: '25%',
        }}
      >
        <DataList
          navigation={navigation}
          fetchFn={getItems}
          render={({ item }) => (
            <Pressable
              onPress={() => navigateToCreateUpdateItemScreen(navigation, item)}
            >
              <Box
                borderBottomWidth="1"
                borderColor="coolGray.200"
                pl="2"
                pr="5"
                py="2"
              >
                <Text color="coolGray.800" bold>
                  {item.text}
                </Text>
              </Box>
            </Pressable>
          )}
          showFilter={false}
        ></DataList>

      </Box>
      <View style={styles.container}>
        <Text color={'#666'}>Made by David Rivas, { new Date().getFullYear() } </Text>
      </View>
    </>
  );
}

const navigateToCreateUpdateItemScreen = (navigation, item = {}) => {
  navigation.navigate('CreateUpdateItem', {
    itemId: item.id,
  });
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10
  },
});

export default TodoListScreen;