import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Button,
} from "react-native";

export default function App() {
  const [inputField, setInputField] = useState("");
  const [todos, setTodos] = useState([]);
  const [modalView, setModalView] = useState(false);
  const entries =
    Platform.OS !== "web" ? Object.entries(Platform.constants) : [];
  return (
    <View style={styles.container}>
      {entries?.map((el, idx) => (
        <>
          <Text key={idx}>
            {JSON.stringify(el[0])} : {JSON.stringify(el[1])}
          </Text>
        </>
      ))}
      <Text>You are: {Platform.OS}</Text>
      {Platform.OS !== "web" && (
        <>
          <Text>In version: {Platform.Version}</Text>
          <Text>Consts:</Text>
        </>
      )}
      <TextInput
        type="text"
        //defaultValue={""}
        value={inputField}
        onChangeText={(newText) => setInputField(newText)}
        style={styles.input}
        placeholder="Add a todo"
        onSubmitEditing={() => {
          setTodos([...todos, inputField]);
          setInputField("");
        }}
      />
      {todos.map((todo, idx) => (
        <View key={idx} style={styles.todoContainer}>
          <Text
            style={styles.todo}
            onLongPress={() => {
              if (Platform.OS !== "web") setModalView(!modalView);
            }}
          >
            {todo}
          </Text>
          <Button
            title="DELETE"
            style={styles.deleteBtn}
            onPress={() =>
              setTodos([...todos.filter((_todo, id) => id !== idx)])
            }
          />
        </View>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 60,
    width: 200,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "gray",
    textAlign: "center",
  },
  todo: {
    width: 200,
    height: 50,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#DCDCDC",
    margin: 5,
    textAlign: "center",
    textAlignVertical: "center",
  },
  todoContainer: {
    display: "flex",
    flexDirection: "row",
    height: 50,
  },
  deleteBtn: {
    //height: 50,
    width: 100,
  },
});
