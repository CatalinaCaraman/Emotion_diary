import React from 'react';
import { View, Image, Button } from 'react-native';

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 400,
        width: '30%',
    },
    buttonWrapper: {
        marginBottom: 10, // Add margin between buttons
        borderRadius: 10, // Apply border radius to the wrapper View
        overflow: 'hidden', // Ensure content is clipped to rounded borders
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
};

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/w3.jpg')} style={styles.backgroundImage} />
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <Button
                        title="How are you feeling today?"
                        onPress={() => navigation.navigate('EmotionalState')}
                        color="#131455"
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                        title="Just breath?"
                        onPress={() => navigation.navigate('Meditation')}
                        color="#131455"
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                        title="INFO"
                        onPress={() => navigation.navigate('EmotionInfo')}
                        color="#131455"
                    />
                </View>
            </View>
        </View>
    );
};

export default HomeScreen;
