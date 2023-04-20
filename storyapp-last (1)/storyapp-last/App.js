import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Animated, FlatList, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Change this line
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { playSound } from './sounds';
import StoryCreation from './Story';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
<Stack.Navigator initialRouteName="Home">
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Story" component={StoryCreation} />
</Stack.Navigator>

    </NavigationContainer>
  );
}

function HomeScreen() {
const navigation = useNavigation();

const generateStory = async () => {
  const prompt = `Title: ${title}\nCharacters: ${characters}\nSetting: ${setting}\nPlot: ${plot}\n\nStory:\n`;

  try {
    const response = await fetch('http://localhost:3000/generate-story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const generatedText = await response.json();
    setGeneratedStory(generatedText);
  } catch (error) {
    console.error('Error generating story:', error);
  }
};

  const { width, height } = Dimensions.get('window');
  const [soundMuted, setSoundMuted] = useState(false);

  const toggleSound = () => {
    setSoundMuted(!soundMuted);
    playSound('click');
    console.log(`Sound is now ${soundMuted ? 'muted' : 'unmuted'}`);
  };

  const scrollX = useRef(new Animated.Value(0)).current;

useEffect(() => {
  const loopAnimation = () => {
    Animated.sequence([
      Animated.timing(scrollX, {
        toValue: -(width * (ads.length - 1)),
        duration: 6000 * (ads.length - 1),
        useNativeDriver: true,
      }),
      Animated.timing(scrollX, {
        toValue: 0,
        duration: 50000000,
        useNativeDriver: true,
      }),
    ]).start(loopAnimation);
  };

  loopAnimation();

  return () => {
    scrollX.stopAnimation();
  };
}, [scrollX, width, ads.length]); // Ajoutez ads.length ici


  const onPressWithSound = (callback: () => void) => {
    if (!soundMuted) {
      playSound('click');
    }
    callback();


  };
  const navigateToStoryCreation = () => {
    navigation.navigate('Story');
  };
  const navigateToSavedStories = () => {
    console.log('Navigating to Saved Stories Screen');
  };

  const navigateToProfile = () => {
    console.log('Navigating to Profile Screen');
  };

  const navigateToSharedStories = () => {
    console.log('Navigating to Shared Stories Screen');
  };

  const navigateToSettings = () => {
    console.log('Navigating to Settings Screen');
  };


const renderItem = ({ item }) => (
    <Animated.Image
      style={[styles.adImage, { transform: [{ translateX: scrollX }] }]}
      source={item.source}
      key={item.key}
    />
  );

const ads = [
  { key: '1', source: require('./assets/ad1.jpg') },
  { key: '2', source: require('./assets/ad2.png') },
  { key: '3', source: require('./assets/ad3.jpg') },
  { key: '4', source: require('./assets/ad4.jpg') },
  { key: '5', source: require('./assets/ad5.png') },
  { key: '6', source: require('./assets/ad1.jpg') }, // Dupliquez le premier élément
];


return (
  <ScrollView
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}
  >
  
      {/* Logo de l'application */}
      <Image style={styles.logo} source={require('./assets/StoryApp.png')} />

      {/* Titre de l'application */}
      <Text style={styles.title}>StoryApp</Text>

      {/* Boutons pour accéder aux différents écrans */}
       <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onPressWithSound(navigateToStoryCreation)}
        >
          <Text style={styles.buttonText}>Créer une histoire</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => onPressWithSound(navigateToSavedStories)}
        >
          <Text style={styles.buttonText}>Histoires sauvegardées</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => onPressWithSound(navigateToSharedStories)}
        >
          <Text style={styles.buttonText}>Histoires partagées</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => onPressWithSound(navigateToProfile)}>
          <Text style={styles.buttonText}>Mon profil</Text>
        </TouchableOpacity>
      </View>

      {/* Section "À la une" */}
      <Text style={styles.sectionTitle}>À la une</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.featuredStories}
      >
        {/* Ici, ajoutez des composants pour représenter les histoires mises en avant */}
      </ScrollView>
       {/* Section de publicité */}
      <Text style={styles.sectionTitle}>Publicité</Text>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.adContainer}
        data={ads}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        extraData={ads} // Ajoutez cette ligne
      />

      {/* Boutons de paramètres et de son */}
      <View style={styles.settingsContainer}>
        <TouchableOpacity onPress={() => console.log('Navigating to Settings Screen')}>
          <MaterialIcons name="settings" size={30} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleSound}>
          {soundMuted ? (
            <FontAwesome name="volume-off" size={30} color="#000" />
          ) : (
            <FontAwesome name="volume-up" size={30} color="#000" />
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Styles pour les composants de l'écran d'accueil
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 50,
     // Ajoutez cette ligne
  },
logo: {
width: 120,
height: 120,
marginBottom: 20,
},
title: {
fontSize: 32,
fontWeight: 'bold',
marginBottom: 30,
},
buttonContainer: {
flexDirection: 'row',
flexWrap: 'wrap',
justifyContent: 'space-around',
marginBottom: 30,
},
button: {
backgroundColor: '#6200EE',
paddingHorizontal: 20,
paddingVertical: 10,
borderRadius: 10,
marginBottom: 15,
minWidth: 150,
alignItems: 'center',
},
buttonText: {
color: '#fff',
fontSize: 18,
},
sectionTitle: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 10,
alignSelf: 'flex-start',
marginLeft: 20,
},
featuredStories: {
height: 200,
marginBottom: 30,
},
settingsContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
width: '100%',
paddingHorizontal: 20,
margin : 20,
},

  adContainer: {
    height: 200,
    marginBottom: 30,
  },
adImage: {
  width: 300, 
  height: 200,
  resizeMode: 'cover',
  borderRadius: 10,
  marginRight: 10
},

});
