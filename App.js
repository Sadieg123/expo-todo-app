import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

const INITIAL_TASKS = [
  { key: '1', description: 'Buy groceries', completed: false },
  { key: '2', description: 'Walk the dog', completed: true },
  { key: '3', description: 'Read for 30 minutes', completed: false },
  { key: '4', description: 'Finish homework assignment', completed: false },
  { key: '5', description: 'Call mom', completed: true },
];

export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [inputText, setInputText] = useState('');

  const toggleTask = (key) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.key === key ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    const newTask = {
      key: Date.now().toString(),
      description: trimmed,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setInputText('');
  };

  const deleteTask = (key) => {
    setTasks((prev) => prev.filter((task) => task.key !== key));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.taskCard} onPress={() => toggleTask(item.key)}>
      <View style={[styles.checkboxBox, item.completed && styles.checkboxChecked]}>
        {item.completed && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text
        style={[
          styles.taskText,
          item.completed && {
            textDecorationLine: 'line-through',
            textDecorationStyle: 'solid',
            color: '#aaa',
          },
        ]}
      >
        {item.description}
      </Text>
      <TouchableOpacity onPress={() => deleteTask(item.key)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#6C63FF" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Tasks</Text>
          <Text style={styles.headerSub}>
            {completedCount} of {tasks.length} completed
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: tasks.length
                  ? `${(completedCount / tasks.length) * 100}%`
                  : '0%',
              },
            ]}
          />
        </View>

        {/* Task List */}
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.listContent}
        />

        {/* Input Row */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task..."
            placeholderTextColor="#aaa"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={addTask}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6C63FF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
  headerSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
  },
  progressContainer: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 24,
    borderRadius: 3,
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#F4F3FF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: '100%',
    paddingTop: 16,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 10,
    paddingRight: 12,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#6C63FF',
    marginHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#6C63FF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#2D2D2D',
    fontWeight: '500',
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#ff4d4d',
    fontSize: 16,
    fontWeight: '700',
  },
  inputRow: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#F4F3FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#2D2D2D',
  },
  addButton: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 20,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});