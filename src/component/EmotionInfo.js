import React, { useState } from 'react';
import { Text, ScrollView, TextInput, View, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';

// Sample image import
import backgroundImage from '../../assets/w.jpg'; // Adjust the path based on your project structure

const styles = {
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'transparent', // Set background color to transparent
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensure the image covers the entire container
    justifyContent: 'center', // Center the content vertically
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  searchBar: {
    flex: 1,
    marginLeft: 10,
  },
  emotionContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  emotionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subEmotionText: {
    marginBottom: 5,
    color: '#666',
  },
};
  const emotionData = [
    {
      title: 'Feeling Happy?',
      content: [
        'Playful: You feel lighthearted and in the mood for fun. You might feel aroused (excitement) or cheeky (teasing). (Sub-feelings: Aroused - feeling excited and energetic, Cheeky - feeling playfully teasing)',
        'Content: You feel satisfied and at peace. You might feel free or joyful. (Sub-feelings: Free - feeling unrestricted and happy, Joyful - feeling full of happiness)',
        'Interested: You feel curious and engaged with something. You might feel inquisitive or enthusiastic. (Sub-feelings: Inquisitive - eager to learn more, Enthusiastic - feeling excited and passionate)',
        'Proud: You feel good about yourself and your accomplishments. You might feel successful or confident. (Sub-feelings: Successful - feeling like you achieved something, Confident - feeling sure of yourself and your abilities)',
        'Accepted: You feel like you belong and are valued by others. You might feel respected or loved. (Sub-feelings: Respected - feeling admired by others, Loved - feeling cared for and cherished)',
        'Powerful: You feel strong and capable. You might feel courageous or creative. (Sub-feelings: Courageous - feeling brave and willing to take risks, Creative - feeling inspired and imaginative)',
        'Peaceful: You feel calm and serene. You might feel loving or thankful. (Sub-feelings: Loving - feeling affection for others, Thankful - feeling grateful for what you have)',
        'Trusting: You feel open and believe in others. You might feel sensitive or intimate. (Sub-feelings: Sensitive - easily affected by the emotions of others, Intimate - feeling close and connected to someone)',
        'Optimistic: You feel hopeful and positive about the future. You might feel inspired or motivated. (Sub-feelings: Inspired - feeling motivated and full of ideas, Motivated - feeling driven to achieve something)',
      ],
    },
    {
      title: 'Feeling Down?',
      content: [
        'Bored: You don\'t feel interested or motivated to do anything. You might feel like time is dragging. (Sub-feelings: Indifferent - lacking interest, Apathetic - lacking enthusiasm)',
        'Busy: You have a lot to do and feel overwhelmed by your workload. You might feel rushed and stressed. (Sub-feelings: Pressured - feeling forced to do something, Rushed - feeling like you don\'t have enough time)',
        'Stressed: You feel overwhelmed and out of control. There\'s too much on your plate and you\'re struggling to cope. (Sub-feelings: Overwhelmed - feeling burdened by too much, Out of control - feeling like things are happening to you, not the other way around)',
        'Tired: You lack energy and feel sleepy. You might have trouble focusing on tasks. (Sub-feelings: Sleepy - needing to rest, Unfocused - having trouble concentrating)',
      ],
    },
    {
      title: 'Feeling Scared?',
      content: [
        'Scared: You feel afraid and helpless in a situation. (Sub-feelings: Helpless - feeling unable to control what\'s happening, Frightened - feeling intense fear)',
        'Anxious: You\'re worried about something that might happen. You might feel overwhelmed by your worries. (Sub-feelings: Overwhelmed - feeling burdened by too much, Worried - feeling concerned about the future)',
        'Insecure: You doubt yourself and your abilities. You might feel inadequate or inferior to others. (Sub-feelings: Inadequate - feeling like you\'re not good enough, Inferior - feeling less than others)',
        'Weak: You feel worthless and insignificant. (Sub-feelings: Worthless - feeling like you have no value, Insignificant - feeling unimportant)',
        'Rejected: You feel excluded or like someone is pushing you away. You might feel persecuted or targeted. (Sub-feelings: Excluded - feeling left out, Persecuted - feeling like you\'re being treated unfairly)',
        'Threatened: You feel nervous and exposed to danger. (Sub-feelings: Nervous - feeling on edge, Exposed - feeling vulnerable)',
      ],
    },
    {
      title: 'Feeling Angry?',
      content: [
        'Let Down: You feel disappointed and betrayed by someone\'s actions. You might feel resentful. (Sub-feelings: Betrayed - feeling like someone broke your trust, Resentful - feeling bitterness towards someone)',
        'Humiliated: You feel disrespected and ridiculed. (Sub-feelings: Disrespected - feeling like someone doesn\'t value you, Ridiculed - feeling mocked or made fun of)',
        'Bitter: You feel angry and resentful about something that happened in the past. You might feel indignant or violated. (Sub-feelings: Indignant - feeling like something unfair happened, Violated - feeling like someone crossed a line)',
        'Mad: You feel intense anger. You might feel furious or jealous. (Sub-feelings: Furious - feeling extremely angry, Jealous - feeling envy towards someone)',
        'Aggressive: You feel provoked and hostile. You might want to lash out. (Sub-feelings: Provoked - feeling like someone is making you angry, Hostile - feeling unfriendly and aggressive)',
        'Frustrated: You feel annoyed and like you can\'t get something done. (Sub-feelings: Infuriated - feeling intensely frustrated, Annoyed - feeling mildly irritated)',
        'Distant: You withdraw from others and feel numb. (Sub-feelings: Withdrawn - feeling like you don\'t want to connect with others, Numb - feeling emotionally disconnected)',
        'Critical: You judge others and their actions harshly. You might feel skeptical or dismissive. (Sub-feelings: Skeptical - doubting something is true, Dismissive - not taking something seriously)',
      ],
    },
    {
      title: 'Feeling Disgusted?',
      content: [
        'Disapproving: You don\'t like something and might be judging it harshly. You might feel judgmental or embarrassed by it. (Sub-feelings: Judgmental - forming negative opinions about something, Embarrassed - feeling ashamed about something)',
        'Disappointed: You\'re sad that something fell short of your expectations. You might feel appalled or revolted by it. (Sub-feelings: Appalled - feeling shocked and disgusted, Revolted - feeling extreme disgust)',
        'Awful: You find something unpleasant or offensive. You might feel nauseated or find it detestable. (Sub-feelings: Nauseated - feeling like you might vomit, Detestable - finding something extremely unpleasant)',
        'Repelled: You feel strong disgust and want to stay away from something. You might feel horrified or hesitant about it. (Sub-feelings: Horrified - feeling extreme fear and disgust, Hesitant - feeling unsure about approaching something)',
      ],
    },
    {
      title: 'Feeling Sad?',
      content: [
        'Lonely: You feel isolated and alone. You might feel abandoned or disconnected from others. (Sub-feelings: Isolated - feeling cut off from social connection, Abandoned - feeling like someone left you alone)',
        'Vulnerable: You feel exposed and easily hurt. You might feel like a victim or fragile. (Sub-feelings: Victimized - feeling like someone is hurting you unfairly, Fragile - feeling easily broken)',
        'Despair: You feel a deep sense of hopelessness and sadness. You might feel grief or powerless. (Sub-feelings: Grief - deep sorrow, especially after a loss, Powerless - feeling like you have no control)',
        'Guilty: You feel like you\'ve done something wrong. You might feel ashamed or remorseful. (Sub-feelings: Ashamed - feeling bad about yourself because of something you did, Remorseful - feeling sorry for something you did)',
        'Depressed: You feel a general sense of sadness and worthlessness. You might feel inferior or empty. (Sub-feelings: Inferior - feeling less than others, Empty - feeling a lack of purpose or meaning)',
        'Hurt: You feel emotional pain, often caused by someone\'s actions or words. You might feel embarrassed or disappointed. (Sub-feelings: Embarrassed - feeling ashamed about yourself, Disappointed - sad that something fell short of your expectations)',
      ],
    },
    {
      title: 'Feeling Surprised?',
      content: [
        'Startled: You experience a sudden jolt or shock. You might feel momentarily disoriented or apprehensive. (Sub-feelings: Alarmed - feeling sudden fear or anxiety, Jittery - feeling nervous or on edge)',
        'Intrigued: You feel a surge of curiosity due to the unexpected. You might wonder what caused the surprise and want to learn more. (Sub-feelings: Curious - having a strong desire to know or learn something, Perplexed - feeling confused but interested)',
        'Delighted: You experience a sudden feeling of joy or pleasure from the surprise. You might feel excited or happy. (Sub-feelings: Thrilled - feeling intense excitement and delight, Elated - feeling overjoyed and triumphant)',
        'Hopeful: You experience a surge of optimism due to the unexpected. You might feel that positive possibilities have opened up. (Sub-feelings: Anticipatory - feeling excited about something that is going to happen, Optimistic - feeling positive about the future)',
       
      ]
      
    },
  ];


const EmotionInfo = () => {
  const [searchText, setSearchText] = useState('');

  const filteredData = emotionData.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View animation="fadeInDown" duration={500} style={styles.searchBarContainer}>
          <Icon name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchBar}
            placeholder="Search for an emotion..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {filteredData.map((item, index) => (
          <Animatable.View
            key={index}
            animation="fadeInUp"
            duration={500}
            delay={index * 100}
            style={styles.emotionContainer}
          >
            <Text style={styles.emotionTitle}>{item.title}</Text>
            {item.content.map((text, subIndex) => (
              <Text key={subIndex} style={styles.subEmotionText}>{text}</Text>
            ))}
          </Animatable.View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

export default EmotionInfo;
