import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  Modal,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faImages,
  faCamera,
  faMicrophone,
  faHashtag,
  faLocationDot,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";
import { Menu, Provider } from "react-native-paper"; // Importer Menu
import globalStyles from "@/app/styles/globalStyles";
import Divider from "../Divider/Divider";
import NewPostModal from "../NewPostModal/NewPostModal";
import { UserContext } from "../contexts/UserContext";

interface HomePostMessageProps {
  profilePicturePath?: string;
}

const HomePostMessage: React.FC<HomePostMessageProps> = ({
  profilePicturePath,
}) => {
  const profilePictureSource = profilePicturePath
    ? { uri: profilePicturePath }
    : require("../../assets/images/profileDefault.png");

  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const { user, saveUser, logout } = useContext(UserContext);
  const [username, setUsername] = useState<string>(user ? user.username : "");

  return (
    <Provider>
      <View style={styles.container}>
        <Image style={styles.image} source={profilePictureSource} />
        <Pressable
          style={styles.inputContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.profileName}>{user?.first_name}{user?.last_name}</Text>
          <Text style={[globalStyles.textSecondary, styles.whatsNew]}>
            Quoi de neuf ?
          </Text>
          <View style={styles.iconsContainer}>
            <Pressable onPress={() => setModalVisible(true)}>
              <FontAwesomeIcon
                icon={faImages}
                size={20}
                style={globalStyles.textSecondary}
              />
            </Pressable>
            <Pressable onPress={() => setModalVisible(true)}>
              <FontAwesomeIcon
                icon={faCamera}
                size={20}
                style={globalStyles.textSecondary}
              />
            </Pressable>
            <Pressable onPress={() => setModalVisible(true)}>
              <FontAwesomeIcon
                icon={faMicrophone}
                size={20}
                style={globalStyles.textSecondary}
              />
            </Pressable>
            <Pressable onPress={() => setModalVisible(true)}>
              <FontAwesomeIcon
                icon={faHashtag}
                size={20}
                style={globalStyles.textSecondary}
              />
            </Pressable>
            <Pressable onPress={() => setModalVisible(true)}>
              <FontAwesomeIcon
                icon={faLocationDot}
                size={20}
                style={globalStyles.textSecondary}
              />
            </Pressable>
            <Pressable onPress={() => setModalVisible(true)}>
              <FontAwesomeIcon
                icon={faBarsStaggered}
                size={20}
                style={globalStyles.textSecondary}
              />
            </Pressable>
          </View>
        </Pressable>

        {/* Modale */}
        <NewPostModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          profilePicturePath={profilePicturePath}
        />
      </View>
    </Provider>
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
    width: "10%",
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
    fontSize: 16,
  },
  whatsNew: {
    fontFamily: "Helvetica",
    fontSize: 16,
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 25,
    paddingTop: 10,
  },
  modalContainer: {
    backgroundColor: "white",
  },
  modalHeader: {
    paddingVertical: 12,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
