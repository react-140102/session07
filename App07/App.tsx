/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [todos, setTodos] = useState<Todo[]>([]);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    (async () => {
      const resp = await axios.get<Todo[]>(
        'https://jsonplaceholder.typicode.com/todos',
      );
      setTodos(resp.data);
    })();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {todos.map(t => (
          <TodoItem todo={t} key={t.id} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const TodoItem = ({todo}: {todo: Todo}) => {
  return (
    <View style={styles.container}>
      <Text>{todo.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    fontSize: 18,
    borderBottomColor: Colors.lighter,
    borderBottomWidth: 1,
  },
});

export default App;
