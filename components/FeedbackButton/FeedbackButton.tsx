import globalStyles from "@/app/styles/globalStyles";
import colors from "@/app/styles/theme";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import TouchableScale from '@jonny/touchable-scale';

interface FeedbackButtonProps {
  color: string;
  onPress: () => void;
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({ color, onPress }) => {
  return (
    <TouchableScale
    onPress={onPress}
    transitionDuration={100} style={[{ backgroundColor: color, shadowColor: color }, styles.buttonStyle]}>
      <Text style={[styles.buttonTextStyle, { color: colors.white }]}>
        Feedback
      </Text>
    </TouchableScale>
  );
};

export default FeedbackButton;

const styles = StyleSheet.create({
  buttonStyle: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minWidth: "35%",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  buttonTextStyle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 15,
  },
});
