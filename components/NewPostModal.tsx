import {
  Button,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated,
} from "react-native";
import Divider from "./Divider/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faImages,
  faCamera,
  faMicrophone,
  faHashtag,
  faLocationDot,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";
import globalStyles from "@/app/styles/globalStyles";
import { useEffect, useRef, useState } from "react";
import FleurViolet from "./Svg/FleurViolet";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "expo-linear-gradient";
import ShimmerText from "./ShimmerText/ShimmerText";
import AnimatedNumbers from "react-native-animated-numbers";

import Reanimated, {
  Easing,
  FadeIn,
  FadeInUp,
  FadeOut,
  FlipInEasyX,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import RephraseButton from "./RephraseButton/RephraseButton";
import FeedbackButton from "./FeedbackButton/FeedbackButton";
import colors from "@/app/styles/theme";
import ModalHeader from "./ModalHeader/ModalHeader";
import Moderation from "@/service/api/moderation";

interface NewPostModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  profileName: string;
  profilePicturePath?: string;
}

const NewPostModal: React.FC<NewPostModalProps> = ({
  modalVisible,
  setModalVisible,
  profileName,
  profilePicturePath,
}) => {
  const profilePictureSource = profilePicturePath
    ? { uri: profilePicturePath }
    : require("../assets/images/profileDefault.png");
  const textInputRef = useRef<TextInput>(null); // Specify the type as TextInput
  const [postMessage, setPostMessage] = useState("");
  const [sendMessageToAPI, setSendMessageToAPI] = useState(false);
  const [toxicityScore, setToxicityScore] = useState(0);

  const shimmerAnim = useRef(new Animated.Value(0)).current;

  // FleurVioletSpinning

  const rotateValue = useSharedValue(0);
  const rotatingStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotateValue.value}deg`,
        },
      ],
    };
  });

  useEffect(() => {
    // Start rotating animation (360 degrees repeated)
    rotateValue.value = withRepeat(
      withTiming(360, {
        duration: 2500, // 2 seconds for a full rotation
        easing: Easing.linear,
      }),
      -1, // Infinite loop
      false // No reversing direction
    );
  }, []);

  const onChangePostMessageText = (input: string) => {
    setPostMessage(input);
  };

  const getToxicityScore = async (input: string) => {
    let toxicity_score = (await Moderation.getTextScore(input)) as number; // Type assertion
    setToxicityScore(toxicity_score);
  };

  const onCloseModal = () => {
    setModalVisible(false)
    setPostMessage("")
    setSendMessageToAPI(false)
    setToxicityScore(0)
  }

  useEffect(() => {
    if (modalVisible) {
      textInputRef.current?.focus();
    }
  }, [modalVisible]);

  useEffect(() => {
    setSendMessageToAPI(false);
    if (postMessage.trim() !== "") {
      const timeout = setTimeout(() => {
        setSendMessageToAPI(true);
        getToxicityScore(postMessage);
      }, 3000); // Délai de 2 secondes

      // Nettoyer le timeout lorsqu'un nouveau texte est tapé ou lorsque le composant est démonté
      return () => clearTimeout(timeout);
    }
  }, [postMessage]);

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <ModalHeader closeModal={onCloseModal} />

        <View style={styles.postMessageContainer}>
          <Image style={styles.image} source={profilePictureSource} />
          <Pressable
            style={styles.inputContainer}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.profileName}>{profileName}</Text>
            <TextInput
              ref={textInputRef}
              value={postMessage}
              placeholder="Quoi de neuf ?"
              placeholderTextColor="#999"
              multiline
              style={styles.postTextInput}
              onChangeText={onChangePostMessageText}
            />
            <View style={styles.iconsContainer}>
              <Pressable onPress={() => setModalVisible(true)}>
                <FontAwesomeIcon
                  icon={faImages}
                  size={17}
                  style={globalStyles.textSecondary}
                />
              </Pressable>
              <Pressable onPress={() => setModalVisible(true)}>
                <FontAwesomeIcon
                  icon={faCamera}
                  size={17}
                  style={globalStyles.textSecondary}
                />
              </Pressable>
              <Pressable onPress={() => setModalVisible(true)}>
                <FontAwesomeIcon
                  icon={faMicrophone}
                  size={17}
                  style={globalStyles.textSecondary}
                />
              </Pressable>
              <Pressable onPress={() => setModalVisible(true)}>
                <FontAwesomeIcon
                  icon={faHashtag}
                  size={17}
                  style={globalStyles.textSecondary}
                />
              </Pressable>
              <Pressable onPress={() => setModalVisible(true)}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size={17}
                  style={globalStyles.textSecondary}
                />
              </Pressable>
              <Pressable onPress={() => setModalVisible(true)}>
                <FontAwesomeIcon
                  icon={faBarsStaggered}
                  size={17}
                  style={globalStyles.textSecondary}
                />
              </Pressable>
            </View>

            {postMessage.trim() !== "" && !sendMessageToAPI && (
              <Reanimated.View
                style={[styles.analyseTextContainer]}
                entering={FadeIn}
                exiting={FadeOut}
              >
                <Reanimated.View
                  style={[styles.fleurVioletContainer, rotatingStyle]}
                >
                  <FleurViolet width={15} height={15} />
                </Reanimated.View>
                <Text style={styles.analyse}>Analyse...</Text>
                {/* <ShimmerText /> */}
              </Reanimated.View>
            )}
          </Pressable>
        </View>
        <View>
          <Text>Votre message a obtenu un score de</Text>
          <View style={styles.scoreContainer}>
            <AnimatedNumbers
              animateToNumber={toxicityScore}
              fontStyle={styles.scoreStyle}
            />
            <Text style={styles.percentageSymbol}>%</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <RephraseButton
              color={colors.primary}
              onPress={() => setToxicityScore(35)}
            />
            <FeedbackButton color={colors.black} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewPostModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
  },
  postMessageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
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
    fontSize: 15,
  },
  postTextInput: {
    fontFamily: "Helvetica",
    fontSize: 15,
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 25,
    paddingTop: 10,
  },
  analyseTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  fleurVioletContainer: {
    padding: 2,
  },
  analyse: {
    fontFamily: "Helvetica",
    fontSize: 15,
  },
  scoreContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingVertical: 25,
  },
  scoreStyle: {
    fontSize: 70,
    fontWeight: "bold",
  },
  percentageSymbol: {
    paddingVertical: 15,
  },
  buttonsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
});
