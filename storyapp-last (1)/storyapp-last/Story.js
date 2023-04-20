import { useState } from 'react';
import { StyleSheet, ScrollView, View, Text,TextInput, TouchableOpacity } from 'react-native';



const StoryCreation = () => {
  const [title, setTitle] = useState('');
  const [characters, setCharacters] = useState('');
  const [setting, setSetting] = useState('');
  const [plot, setPlot] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');

  

 return (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.label}>Titre :</Text>
    <TextInput style={styles.input} value={title} onChangeText={setTitle} />

    <Text style={styles.label}>Personnages :</Text>
    <TextInput
      style={styles.input}
      value={characters}
      onChangeText={setCharacters}
    />

    <Text style={styles.label}>Lieu :</Text>
    <TextInput style={styles.input} value={setting} onChangeText={setSetting} />

    <Text style={styles.label}>Intrigue :</Text>
    <TextInput style={styles.input} value={plot} onChangeText={setPlot} />

    <TouchableOpacity style={styles.button} onPress={generateStory}>
      <Text style={styles.buttonText}>Générer l'histoire</Text>
    </TouchableOpacity>

    {generatedStory && (
      <View style={styles.generatedStoryContainer}>
        <Text style={styles.generatedStory}>{generatedStory}</Text>
      </View>
    )}

    <TouchableOpacity style={styles.muteButton}>
      <Text style={styles.buttonText}>Mute</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.settingsButton}>
      <Text style={styles.buttonText}>Paramètres</Text>
    </TouchableOpacity>
  </ScrollView>
);

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 50,
  },

  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  generatedStoryContainer: {
    borderColor: '#ccc',
    borderWidth:10,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  generatedStory: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default StoryCreation;