import globalStyles from "@/app/styles/globalStyles";
import { Image, Text, View, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons/faImages";
import { faCamera } from "@fortawesome/free-solid-svg-icons/faCamera";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons/faMicrophone";
import { faHashtag } from "@fortawesome/free-solid-svg-icons/faHashtag";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons/faBarsStaggered";
import React from "react";

interface HomePostMessageProps {
  profileName: string;
  profilePicturePath?: string;
}

const HomePostMessage: React.FC<HomePostMessageProps> = ({
  profileName,
  profilePicturePath,
}) => {
  const profilePictureSource = profilePicturePath
    ? { uri: profilePicturePath }
    : require("../assets/images/profileDefault.png"); // Remplacez par le chemin par défaut si l'image n'est pas fournie

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={profilePictureSource} />
      <View style={styles.inputContainer}>
        <Text style={styles.profileName}>{profileName}</Text>
        <Text style={[globalStyles.textSecondary, styles.whatsNew]}>
          Quoi de neuf ?
        </Text>
        <View style={styles.iconsContainer}>
          <FontAwesomeIcon
            icon={faImages}
            size={20}
            style={[globalStyles.textSecondary, styles.iconStyle]}
          />
          <FontAwesomeIcon
            icon={faCamera}
            size={20}
            style={[globalStyles.textSecondary, styles.iconStyle]}
          />
          <FontAwesomeIcon
            icon={faMicrophone}
            size={20}
            style={[globalStyles.textSecondary, styles.iconStyle]}
          />
          <FontAwesomeIcon
            icon={faHashtag}
            size={20}
            style={[globalStyles.textSecondary, styles.iconStyle]}
          />
          <FontAwesomeIcon
            icon={faBarsStaggered}
            size={20}
            style={[globalStyles.textSecondary, styles.iconStyle]}
          />
          <FontAwesomeIcon
            icon={faLocationDot}
            size={20}
            style={[globalStyles.textSecondary, styles.iconStyle]}
          />
        </View>
      </View>
    </View>
  );
};

export default HomePostMessage;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    width: "12%",
    aspectRatio: 1,
    borderRadius: 30,
  },
  inputContainer: {
    width: "80%",
    paddingHorizontal: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  profileName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 18,
  },
  whatsNew: {
    fontFamily: "Helvetica",
    fontSize: 18,
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 25,
    paddingTop: 10,
  },
  iconStyle: {},
});
