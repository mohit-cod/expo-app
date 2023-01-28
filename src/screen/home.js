import * as React from "react";
import { StyleSheet, Pressable, View, Text, TextInput } from "react-native";

function Home(props) {
  const [todoValue, setValue] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [currentEditSection, setCurrentEditSection] = React.useState(null);
  const [editValue, setEditValue] = React.useState("");
  const [todoList, setTodoList] = React.useState([]);
  let createTodo = function (value) {
    if (value.length >= 3) {
      let array = [...todoList];
      array.push(value);
      setTodoList(array);
    } else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  };

  let showEditSection = function (key) {
    setCurrentEditSection(key);
  };
  let deleteTodoItem = function (itemId) {
    let cloneArray = [...todoList];
    cloneArray.splice(itemId, 1);
    setTodoList(cloneArray);
  };

  let updateTodoItem = function (id,updateItem) {
    let cloneArray = [...todoList];
    cloneArray.indexOf(id)
    setTodoList(cloneArray);
  };

  React.useEffect(() => {
    console.log(props);
  }, []);
  return (
    <View style={styles.todoSection}>
      <Text>Todo App</Text>
      <View style={styles.todoBoxOperation}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setValue(text)}
          value={alert ? "Character length must be above 3" : todoValue}
          placeholder="Add you new todo"
        />
        <Pressable onPress={() => createTodo(todoValue)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
      <View>
        {todoList &&
          todoList.map((val, key) => {
            return (
              <View style={styles.todoCard}>
                <View style={styles.upperSection}>
                  <View>
                    <Text style={styles.todoCardText} key={key}>
                      {val}
                    </Text>
                  </View>
                  {currentEditSection == key ? (
                    <Pressable
                      onPress={() => updateTodoItem(key,editValue)}
                      style={styles.cardButton}
                    >
                      <Text style={styles.buttonText}>Update</Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => showEditSection(key)}
                      style={styles.cardButton}
                    >
                      <Text style={styles.buttonText}>Edit</Text>
                    </Pressable>
                  )}

                  <Pressable
                    onPress={() => deleteTodoItem(key)}
                    style={styles.cardButton}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </Pressable>
                </View>
                <View>
                  {currentEditSection == key ? (
                    <TextInput
                      style={styles.inputEdit}
                      onChangeText={(text) => setEditValue(text)}
                      value={
                        alert ? "Character length must be above 3" : editValue
                      }
                      placeholder="Add you new todo"
                    />
                  ) : null}
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  todoSection: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: "white",
  },
  todoBoxOperation: {
    padding: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 4,
  },
  input: {
    padding: 6,
  },
  button: {
    borderWidth: 2,
    margin: 10,
    padding: 4,
    borderColor: "black",
    borderRadius: 4,
    backgroundColor: "#131ACE",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  todoCard: {
    padding: 4,
    margin: 4,
    borderRadius: 4,
    backgroundColor: "black",
  },
  upperSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  todoCardText: {
    fontSize: 16,
    color: "white",
  },
  cardButton: {
    margin: 4,
    borderRadius: 4,
    padding: 4,
    backgroundColor: "#131ACE",
  },
  inputEdit: {
    padding: 4,
    backgroundColor: "white",
  },
});