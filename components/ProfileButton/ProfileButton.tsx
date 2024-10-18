import colors from "@/app/styles/theme";
import TouchableScale from "@jonny/touchable-scale";
import React from "react";
import { StyleSheet, Text } from "react-native";

interface ProfileButtonProps {
  title: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ title }) => {
  return (
    <TouchableScale transitionDuration={100} style={styles.buttonStyle}>
      <Text style={styles.buttonTextStyle}>{title}</Text>
    </TouchableScale>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderColor: colors.gray,
    borderWidth: 0.5,
    width: "48%",
    paddingVertical: 5,
    borderRadius: 7,
  },
  buttonTextStyle: {
    alignSelf: "center",
  },
});

export default ProfileButton;
