import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, Text } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

export default function ShimmerText() {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300], // Ajustez ces valeurs selon la longueur du texte
  });

  return (
    <View style={styles.container}>
      <MaskedView
        style={{ flexDirection: 'row' }}
        maskElement={
          <View style={styles.maskContainer}>
            <Text style={styles.text}>Analyser</Text>
          </View>
        }
      >
        {/* Couleur de fond du texte */}
        <View style={styles.background} />

        {/* Effet shimmer */}
        <Animated.View
          style={[
            styles.shimmer,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.8)', 'transparent']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </MaskedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  maskContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    color: 'black', // La couleur du texte n'affecte pas l'effet, mais doit être opaque
    fontWeight: 'bold',
  },
  background: {
    // Couleur de fond du texte
    backgroundColor: '#000',
    ...StyleSheet.absoluteFillObject,
  },
  shimmer: {
    // Superposition de l'effet shimmer
    ...StyleSheet.absoluteFillObject,
  },
});
