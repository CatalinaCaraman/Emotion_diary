import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';

const Statistics = () => {
  const [emotionalData, setEmotionalData] = useState(null);
  const [emotionFrequency, setEmotionFrequency] = useState([]);
  const [weeklyEmotions, setWeeklyEmotions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('emotionalStateData');
        if (data) {
          const parsedData = JSON.parse(data);
          setEmotionalData(parsedData);
          calculateStatistics(parsedData);
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    fetchData();
  }, []);

  const calculateStatistics = (data) => {
    // Calculate emotion frequency
    const frequency = data.emotions.reduce((acc, emotion) => {
      acc[emotion] = (acc[emotion] || 0) + 1;
      return acc;
    }, {});
    const emotionFreqArray = Object.keys(frequency).map((key) => ({
      emotion: key,
      count: frequency[key],
    }));
    setEmotionFrequency(emotionFreqArray);

    // Calculate weekly emotions
    const weeklyEmotions = data.emotions.slice(-7); // Assuming data.emotions is an array of daily emotions
    setWeeklyEmotions(weeklyEmotions);
  };

  if (!emotionalData) {
    return (
      <View>
        <Text>Loading statistics...</Text>
      </View>
    );
  }

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0.1,
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView>
      <Text>Emotional Statistics:</Text>
      <Text>The emotions you felt most often:</Text>
      <BarChart
        data={{
          labels: emotionFrequency.map((item) => item.emotion),
          datasets: [
            {
              data: emotionFrequency.map((item) => item.count),
            },
          ],
        }}
        width={screenWidth - 16}
        height={220}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
      <Text>Your emotions during the week:</Text>
      <BarChart
        data={{
          labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
          datasets: [
            {
              data: weeklyEmotions.map((emotion) => emotion.length),
            },
          ],
        }}
        width={screenWidth - 16}
        height={220}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
    </ScrollView>
  );
};

export default Statistics;
