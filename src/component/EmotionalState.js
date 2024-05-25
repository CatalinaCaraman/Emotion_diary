import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = {
  container: {
    flex: 1,
    padding: 10,
  },
  currentDateContainer: {
    marginBottom: 20,
  },
  currentDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4682B4',
  },
  
  emotionButton: {
    padding: 16,
    marginRight: 13,
    borderRadius: 40,
    height: 55,
    marginBottom: 20,
  },
  emotionButtonText: {
    fontSize: 16,
  },
  subEmotionsContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  subEmotionButton: {
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 10,
  },
  subEmotionButtonText: {
    fontSize: 14,
  },
 
  journalingContainer: {
    marginBottom: 20,
  },
  journalingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  journalingInput: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
  },
  questionsContainer: {
    marginBottom: 20,
  },
  questionItem: {
    marginBottom: 15,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  answerInput: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    minHeight: 50,
  },
  saveButton: {
    marginBottom: 20,
  },
  selectedEmotionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'lightblue',
    borderWidth: 2,
    borderRadius: 20,
    padding: 5,
  },
  selectedEmotionItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 1,
  },
  selectedEmotionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  noEmotionsText: {
    fontStyle: 'italic',
    color: '#999',
  },
};
const emotionsData = {
  bad: [
    { text: 'Bored', subEmotions: ['Indifferent', 'Apathetic'] },
    { text: 'Busy', subEmotions: ['Pressured', 'Rushed'] },
    { text: 'Stressed', subEmotions: ['Overwhelmed', 'Out of control'] },
    { text: 'Tired', subEmotions: ['Sleepy', 'Unfocused'] },
  ],
  fearful: [
    { text: 'Scared', subEmotions: ['Helpless', 'Frightened'] },
    { text: 'Anxious', subEmotions: ['Overwhelmed', 'Worried'] },
    { text: 'Insecure', subEmotions: ['Inadequate', 'Inferior'] },
    { text: 'Weak', subEmotions: ['Worthless', 'Insignificant'] },
    { text: 'Rejected', subEmotions: ['Excluded', 'Persecuted'] },
    { text: 'Threatened', subEmotions: ['Nervous', 'Exposed'] },
  ],
  angry: [
    { text: 'Let down', subEmotions: ['Betrayed', 'Resentful'] },
    { text: 'Humiliated', subEmotions: ['Disrespected', 'Ridiculed'] },
    { text: 'Bitter', subEmotions: ['Indignant', 'Violated'] },
    { text: 'Mad', subEmotions: ['Furious', 'Jealous'] },
    { text: 'Aggressive', subEmotions: ['Provoked', 'Hostile'] },
    { text: 'Frustrated', subEmotions: ['Infuriated', 'Annoyed'] },
    { text: 'Distant', subEmotions: ['Withdrawn', 'Numb'] },
    { text: 'Critical', subEmotions: ['Skeptical', 'Dismissive'] },
  ],
  disgusted: [
    { text: 'Disapproving', subEmotions: ['Judgmental', 'Embarrassed'] },
    { text: 'Disappointed', subEmotions: ['Appalled', 'Revolted'] },
    { text: 'Awful', subEmotions: ['Nauseated', 'Detestable'] },
    { text: 'Repelled', subEmotions: ['Horrified', 'Hesitant'] },
  ],
  sad: [
    { text: 'Lonely', subEmotions: ['Isolated', 'Abandoned'] },
    { text: 'Vulnerable', subEmotions: ['Victimized', 'Fragile'] },
    { text: 'Despair', subEmotions: ['Grief', 'Powerless'] },
    { text: 'Guilty', subEmotions: ['Ashamed', 'Remorseful'] },
    { text: 'Depressed', subEmotions: ['Inferior', 'Empty'] },
    { text: 'Hurt', subEmotions: ['Embarrassed', 'Disappointed'] },
  ],
  happy: [
    { text: 'Playful', subEmotions: ['Aroused', 'Cheeky'] },
    { text: 'Content', subEmotions: ['Free', 'Joyful'] },
    { text: 'Interested', subEmotions: ['Curious', 'Inquisitive'] },
    { text: 'Proud', subEmotions: ['Successful', 'Confident'] },
    { text: 'Accepted', subEmotions: ['Respected', 'Valued'] },
    { text: 'Powerful', subEmotions: ['Courageous', 'Creative'] },
    { text: 'Peaceful', subEmotions: ['Loving', 'Thankful'] },
    { text: 'Trusting', subEmotions: ['Sensitive', 'Intimate'] },
    { text: 'Optimistic', subEmotions: ['Hopeful', 'Inspired'] },
  ],
  surprised: [
    { text: 'Startled', subEmotions: ['Shocked', 'Dismayed'] },
    { text: 'Confused', subEmotions: ['Disillusioned', 'Perplexed'] },
    { text: 'Amazed', subEmotions: ['Astonished', 'Awe'] },
    { text: 'Excited', subEmotions: ['Eager', 'Energetic'] },
  ],
};

// Function to determine the color based on the emotion
const getEmotionColor = (emotion, subEmotion1, subEmotion2) => {
  const emotionColors = {
    angry: '#97051D',
    disgusted: '#04361D',
    happy: '#FFA200',
    sad: '#2997FF',
    bad: '#44444B',
    fearful: '#7323A8',
    surprised: '#FF4700',
  };

  const subEmotionColors1 = {
    angry: '#F6082F',
    disgusted: '#075B31',
    happy: '#FFBB46',
    sad: '#77BDFF',
    bad: '#737380',
    fearful: '#9E46D9',
    surprised: '#FF692E',
  };

  const subEmotionColors2 = {
    angry: '#FB8397',
    disgusted: '#043604',
    happy: '#FFCC74',
    sad: '#588ABA',
    bad: '#A7A7B0',
    fearful: '#7A5692',
    surprised: '#FF9B74',
  };

  if (subEmotion2) return subEmotionColors2[emotion];
  if (subEmotion1) return subEmotionColors1[emotion];
  return emotionColors[emotion];
};

const EmotionalState = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(moment().format('D MMMM YYYY'));
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [selectedSubEmotion1, setSelectedSubEmotion1] = useState('');
  const [selectedSubEmotion2, setSelectedSubEmotion2] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [journalEntry, setJournalEntry] = useState('');
  const [questions, setQuestions] = useState([
    { text: 'What situation caused the emotions you are feeling?' },
    { text: 'What bodily sensations are you experiencing (stomach ache, chills, warmth)?' },
    { text: 'How can you connect the sensations in your body with your emotions?' },
    { text: 'What conclusions can you draw from this situation?' },
  ]);

  const handleEmotionPress = (emotion) => {
    setSelectedEmotion(emotion);
    setSelectedSubEmotion1('');
    setSelectedSubEmotion2('');
    setSelectedEmotions([emotion]);
  };
  
  const handleSubEmotion1Press = (subEmotion) => {
    setSelectedSubEmotion1(subEmotion);
    setSelectedEmotions([selectedEmotion, subEmotion]);
  };

  const handleSubEmotion2Press = (subEmotion) => {
    setSelectedSubEmotion2(subEmotion);
    setSelectedEmotions([selectedEmotion, selectedSubEmotion1, subEmotion]);
  };

  const handleJournalEntryChange = (text) => {
    setJournalEntry(text);
  };

  const handleSave = async () => {
    try {
      const savedData = {
        emotions: selectedEmotions,
        journalEntry,
        questions: questions.map((question) => ({
          text: question.text,
          answer: question.answer,
        })),
      };
      await AsyncStorage.setItem('emotionalStateData', JSON.stringify(savedData));
      alert('The data was saved successfully! <3');
    } catch (error) {
      alert(error);
    }
    navigation.goBack();
  };

  const ListOfSelectedEmotions = ({ selectedEmotions }) => {
    return (
      <View style={styles.selectedEmotionsContainer}>
        {selectedEmotions.length > 0 ? (
          selectedEmotions.map((emotion) => (
            <View key={emotion} style={styles.selectedEmotionItem}>
              <Text style={styles.selectedEmotionText}>{emotion}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noEmotionsText}>No emotions selected</Text>
        )}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        {/* Display current date */}
        <View style={styles.currentDateContainer}>
          <Text style={styles.currentDateText}>Today: {currentDate}</Text>
        </View>

        {/* Emotion wheel - Main emotions */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {Object.keys(emotionsData).map((emotion) => (
            <TouchableOpacity
              key={emotion}
              style={[styles.emotionButton, { backgroundColor: getEmotionColor(emotion) }]}
              onPress={() => handleEmotionPress(emotion)}
            >
              <Text style={styles.emotionButtonText}>{emotion}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sub-emotions (if a main emotion is selected) */}
        {selectedEmotion && (
          <View style={styles.subEmotionsContainer}>
            {emotionsData[selectedEmotion].map((subEmotion1) => (
              <TouchableOpacity
                key={subEmotion1.text}
                style={[styles.subEmotionButton, { backgroundColor: getEmotionColor(selectedEmotion, subEmotion1.text) }]}
                onPress={() => handleSubEmotion1Press(subEmotion1.text)}
              >
                <Text style={styles.subEmotionButtonText}>{subEmotion1.text}</Text>
              </TouchableOpacity>
            ))}
            {selectedSubEmotion1 && (
              <View style={styles.subSubEmotionsContainer}>
                {emotionsData[selectedEmotion].find((item) => item.text === selectedSubEmotion1)?.subEmotions.map(
                  (subEmotion2) => (
                    <TouchableOpacity
                      key={subEmotion2}
                      style={[styles.subEmotionButton, { backgroundColor: getEmotionColor(selectedEmotion, selectedSubEmotion1, subEmotion2) }]}
                      onPress={() => handleSubEmotion2Press(subEmotion2)}
                    >
                      <Text style={styles.subEmotionButtonText}>{subEmotion2}</Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            )}
          </View>
        )}
        {/* List of selected emotions */}
        <ListOfSelectedEmotions selectedEmotions={selectedEmotions} />

        {/* Journal */}
        <View style={styles.journalingContainer}>
          <Text style={styles.journalingLabel}>Journal:</Text>
          <TextInput
            style={styles.journalingInput}
            multiline={true}
            numberOfLines={4}
            placeholder="What's on your mind..."
            value={journalEntry}
            onChangeText={handleJournalEntryChange}
          />
        </View>

        {/* Questions */}
        <ScrollView style={styles.questionsContainer}>
          {questions.map((question, index) => (
            <View key={index} style={styles.questionItem}>
              <Text style={styles.questionText}>{question.text}</Text>
              <TextInput
                style={styles.answerInput}
                multiline={true}
                placeholder="Tell me..."
                onChangeText={(text) => {
                  const newQuestions = [...questions];
                  newQuestions[index].answer = text;
                  setQuestions(newQuestions);
                }}
              />
            </View>
          ))}
        </ScrollView>

        {/* Save button */}
        <Button title="Save data" style={styles.saveButton} onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

export default EmotionalState;
