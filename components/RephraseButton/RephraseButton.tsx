import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import AIStar from "../Svg/AIStar";
import globalStyles from "@/app/styles/globalStyles";
import colors from "@/app/styles/theme";
import DoubleAIStar from "../Svg/DoubleAIStarWhite";
import TouchableScale from "@jonny/touchable-scale";

interface RephraseButtonProps {
  color: string;
  onPress: () => void;
}

const RephraseButton: React.FC<RephraseButtonProps> = ({ color, onPress }) => {
  return (
    <TouchableScale transitionDuration={100} onPress={onPress}>
      <ImageBackground
        borderRadius={10}
        source={require("../../assets/images/primaryMeshGradient.jpeg")}
        style={[{ shadowColor: color }, styles.buttonStyle]}
      >
        <DoubleAIStar width={18} height={18} />
        <Text style={[styles.buttonTextStyle, { color: colors.white }]}>
          Reformuler
        </Text>
      </ImageBackground>
    </TouchableScale>
  );
};

export default RephraseButton;

const styles = StyleSheet.create({
  buttonStyle: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minWidth: "35%",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    borderCurve: "continuous",
  },
  buttonTextStyle: {
    fontFamily: globalStyles.title.fontFamily,
    fontSize: 15,
  },
});
