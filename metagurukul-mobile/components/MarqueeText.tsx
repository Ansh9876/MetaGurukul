import { View, Animated, StyleSheet, Text, LayoutChangeEvent } from "react-native";
import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
};

export default function MarqueeText({ text }: Props) {

  const translateX = useRef(new Animated.Value(0)).current;

  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {

    if (textWidth === 0 || containerWidth === 0) return;

    // If text fits → no animation needed
    if (textWidth <= containerWidth) return;

    Animated.loop(
      Animated.timing(translateX, {
        toValue: -textWidth,
        duration: 8000,
        useNativeDriver: true
      })
    ).start();

  }, [textWidth, containerWidth]);

  return (

    <View
      style={styles.container}
      onLayout={(e: LayoutChangeEvent) =>
        setContainerWidth(e.nativeEvent.layout.width)
      }
    >

      <Animated.View
        style={{
          flexDirection: "row",
          transform: [{ translateX }]
        }}
      >

        {/* Original text */}
        <Text
          style={styles.text}
          onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
        >
          {text}
        </Text>

        {/* Duplicate for smooth loop */}
        <Text style={[styles.text, { marginLeft: 40 }]}>
          {text}
        </Text>

      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden"
  },

  text: {
    fontSize: 15,
    fontWeight: "700"
  }
});