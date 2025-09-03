import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

export default function App() {
  const [word, setWord] = useState("");          // User input
  const [definition, setDefinition] = useState(""); // API result
  const [error, setError] = useState("");        // Error handling

  async function fetchData() {
    try {
      if (!word) {
        setError("Please enter a word");
        return;
      }
      setError("");
      setDefinition("Loading...");

      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);

      if (!response.ok) {
        throw new Error("Could not fetch resource");
      }

      const data = await response.json();
      console.log(data);

      const def = data[0].meanings[0].definitions[0].definition;
      setDefinition(def);

    } catch (err) {
      console.error(err);
      setDefinition("");
      setError("Word not found or API error");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dictionary Lookup</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a word"
        value={word}
        onChangeText={setWord}
      />

      <Button title="Search" onPress={fetchData} />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <ScrollView style={styles.result}>
        <Text style={styles.definition}>{definition}</Text>
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: "100%",
    marginBottom: 10,
    borderRadius: 5,
  },
  result: {
    marginTop: 20,
    width: "100%",
  },
  definition: {
    fontSize: 18,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});
