import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Animated, ImageBackground } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Meditation = () => {
  const [breathsLeft, setBreathsLeft] = useState(3);
  const [selectedBreaths, setSelectedBreaths] = useState(3);
  const [instructions, setInstructions] = useState('Are you ready to start breathing?');
  const [isBreathing, setIsBreathing] = useState(false);
  const circleScale = useRef(new Animated.Value(1)).current;

  const growCircle = () => {
    Animated.timing(circleScale, {
      toValue: 5.3,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  };

  const shrinkCircle = () => {
    Animated.timing(circleScale, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  };

  const breathTextUpdate = (phase) => {
    switch (phase) {
      case 'in':
        setInstructions('Breathe in');
        growCircle();
        setTimeout(() => breathTextUpdate('hold'), 4000);
        break;
      case 'hold':
        setInstructions('Hold Breath');
        setTimeout(() => breathTextUpdate('exhale'), 4000);
        break;
      case 'exhale':
        setInstructions('Exhale Breath Slowly');
        shrinkCircle();
        setTimeout(() => {
          setBreathsLeft((prev) => {
            const newBreathsLeft = prev - 1;
            if (newBreathsLeft > 0) {
              breathTextUpdate('in');
            } else {
              setInstructions("Congratulations! You've completed the breathing session.");
              setIsBreathing(false);
            }
            return newBreathsLeft;
          });
        }, 4000);
        break;
      default:
        break;
    }
  };

  const breathingApp = () => {
    breathTextUpdate('in');
  };

  const startBreathing = () => {
    if (selectedBreaths <= 0) {
      setInstructions('Please select a valid number of breaths.');
      return;
    }
    setIsBreathing(true);
    setInstructions('Get relaxed, and ready to begin breathing');
    setTimeout(() => {
      setInstructions('Breathing is about to begin...');
      setTimeout(() => {
        breathingApp();
      }, 2000);
    }, 2000);
  };

  return (
    <ImageBackground source={require('../../assets/w.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.input}>
          <Text style={styles.label}>Select Breaths</Text>
          <RNPickerSelect
            onValueChange={(value) => {
              setSelectedBreaths(value);
              setBreathsLeft(value);
            }}
            items={[
              { label: '3 Breaths', value: 3, style: { inputIOS: styles.pickerItem, inputAndroid: styles.pickerItem } },
              { label: '5 Breaths', value: 5, style: { inputIOS: styles.pickerItem, inputAndroid: styles.pickerItem } },
              { label: '7 Breaths', value: 7, style: { inputIOS: styles.pickerItem, inputAndroid: styles.pickerItem } },
            ]}
            value={selectedBreaths}
            style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
          />
        </View>
        <View style={styles.circleWrap}>
          <View style={styles.circleOutline} />
          <Animated.View style={[styles.circleProgress, { transform: [{ scale: circleScale }] }]} />
        </View>
        <Text style={styles.breaths}>Breaths remaining: <Text>{breathsLeft}</Text></Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button
          title="Begin"
          onPress={startBreathing}
          disabled={isBreathing}
          color={isBreathing ? '#969696' : '#6236ff'}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 70,
  },
  input: {
    flexDirection: 'column',
    marginBottom: 70,
    alignItems: 'center',
  },
  label: {
    fontSize: 30,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: 200,
    fontWeight: 'bold',
    backgroundColor: '#6236ff',
  },
  pickerItem: {
    fontSize: 38,
    fontWeight: 'bold',
  },
  circleWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 40,
  },
  circleOutline: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'transparent',
    borderWidth: 10,
    borderColor: 'black',
  },
  circleProgress: {
    width: 50,
    height: 50,
    position: 'absolute',
    backgroundColor: '#6236ff',
    borderRadius: 25,
  },
  breaths: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 24,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Meditation;
