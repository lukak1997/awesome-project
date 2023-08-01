import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import InputComponent from "./components/InputComponent";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [courseGoal, setCourseGoal] = useState([]);
  const [modalIsVisible, SetModalIsVisible] = useState(false);
  const startAddGoalHandler = () => {
    SetModalIsVisible(true);
  };
  const endAddGoalHandler = () => {
    SetModalIsVisible(false);
  };

  const addGoalHandler = (enterInputText) => {
    setCourseGoal((currentCourseGoal) => [
      ...currentCourseGoal,
      { text: enterInputText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  };
  const handleDelete = (id) => {
    setCourseGoal((currentCourseGoal) => [
      ...currentCourseGoal.filter((goal) => goal.id !== id),
    ]);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Add New Goal"
        color="#a065ec"
        onPress={startAddGoalHandler}
      />
      <InputComponent
        visible={modalIsVisible}
        onAddGoal={addGoalHandler}
        onCancel={endAddGoalHandler}
      />

      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoal}
          renderItem={(itemData) => {
            console.log(itemData);
            return (
              <GoalItem
                text={itemData.item.text}
                onDeleteItem={handleDelete}
                id={itemData.item.id}
              />
            );
          }}
        />
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 50,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: "#1e085a",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    flex: 5,
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "white",
  },
});
