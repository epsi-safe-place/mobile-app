import colors from "@/app/styles/theme";
import { StyleSheet, Text, View } from "react-native";

interface ScoreProps {
  score: number;
  height?: number; // Added height as an optional prop
}

const Score: React.FC<ScoreProps> = ({ score, height }) => {
  return (
    <View style={[styles.container, { height: height || "auto" }]}>
      <Text style={styles.score}>{score}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1, // Ensures the view is always square
    backgroundColor: colors.primary,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    fontFamily: "Helvetica-Bold",
    color: colors.white,
  },
});

export default Score;
