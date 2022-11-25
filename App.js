import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Pressable, View, Text, Animated } from "react-native";
import React, { useRef, useState } from "react";
import Feather from "@expo/vector-icons/Feather";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedIcon = Animated.createAnimatedComponent(Feather);

export default function App() {
  const [joined, setJoined] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const success = useRef(new Animated.Value(0)).current;
  const textColor = useRef(new Animated.Value(0)).current;
  const gradient = useRef(new Animated.Value(1)).current;

  const join = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start(showSuccess);
  };

  const showSuccess = () => {
    Animated.timing(success, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start(showJoined);
  };

  const showJoined = () => {
    setJoined(true);
    setTimeout(() => {
      Animated.timing(success, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start(fadeIn);
      Animated.timing(textColor, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }, 1500);
  };

  const fadeIn = () => {
    Animated.timing(gradient, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={join}>
        <AnimatedLinearGradient
          colors={["#8559F3", "#FF3183"]}
          start={{ x: 0.7, y: 0 }}
          style={[styles.gradient, { opacity: gradient }]}
        />
        <View
          style={[
            styles.gradient,
            {
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Animated.Text
            style={[
              styles.text,
              {
                opacity: fadeAnim,
                color: textColor.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["#fff", "#473F4E"],
                }),
              },
            ]}
          >
            {joined ? "Joined" : "Join"}
          </Animated.Text>
          <AnimatedIcon
            name="check"
            size={32}
            color="#fff"
            style={{ position: "absolute", opacity: success }}
          />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "500",
  },
  gradient: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 120,
  },
});
