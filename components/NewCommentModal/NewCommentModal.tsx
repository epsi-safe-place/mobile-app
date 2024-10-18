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
  Alert,
} from "react-native";
import Divider from "../Divider/Divider";
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
import { useContext, useEffect, useRef, useState } from "react";
import FleurViolet from "../Svg/FleurViolet";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "expo-linear-gradient";
import ShimmerText from "../ShimmerText/ShimmerText";
import AnimatedNumbers from "react-native-animated-numbers";

import Reanimated, {
  Easing,
  FadeIn,
  FadeInUp,
  FadeOut,
  FlipInEasyX,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import RephraseButton from "../RephraseButton/RephraseButton";
import FeedbackButton from "../FeedbackButton/FeedbackButton";
import colors from "@/app/styles/theme";
import ModalHeader from "../ModalHeader/ModalHeader";
import Moderation from "@/service/api/moderation";
import { calculateScore, getColorScore } from "../../utils/utils";
import NewPostAIButtonModal from "../NewPostAIButtonModal/NewPostAIButtonModal";
import SwipeModal, {
  SwipeModalPublicMethods,
} from "@birdwingo/react-native-swipe-modal";
import { UserContext } from "../contexts/UserContext";
import Posts from "@/service/api/posts";
import Comments from "@/service/api/comments";

const DURATION = 500;
const DELAY = 1000;

interface NewCommentModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  profilePicturePath?: string;
  idPost: string;
}

interface AnalysisResult {
  categories: { [key: string]: boolean };
  category_applied_input_types: { [key: string]: string[] };
  category_scores: { [key: string]: number };
  flagged: boolean;
}

const NewCommentModal: React.FC<NewCommentModalProps> = ({
  modalVisible,
  setModalVisible,
  profilePicturePath,
  idPost,
}) => {
  const profilePictureSource = profilePicturePath
    ? { uri: profilePicturePath }
    : require("../../assets/images/profileDefault.png");
  const textInputRef = useRef<TextInput>(null); // Specify the type as TextInput
  const [postMessage, setPostMessage] = useState("");
  const [sendMessageToAPI, setSendMessageToAPI] = useState(false);
  const [toxicityInfos, setToxicityInfos] = useState<{
    results: AnalysisResult;
    score: number;
  }>({
    results: {
      categories: {}, // Initialize with an empty object or appropriate default values
      category_applied_input_types: {},
      category_scores: {},
      flagged: false, // Set a default value for flagged
    },
    score: 0,
  });
  const [showScore, setShowScore] = useState(true);
  const [isRephrasingModal, setIsRephrasingModal] = useState(true);
  const [canSubmit, setCanSubmit] = useState(false);

  const { user, saveUser, logout } = useContext(UserContext);
  const [username, setUsername] = useState<string>(user ? user.username : "");

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

  const onChangePostMessageText = (input: string) => {
    setPostMessage(input);
  };

  const onCloseModal = () => {
    setModalVisible(false);
    setPostMessage("");
    setSendMessageToAPI(false);
    setShowScore(true);
    setToxicityInfos({
      results: {
        categories: {}, // Initialize with an empty object or appropriate default values
        category_applied_input_types: {},
        category_scores: {},
        flagged: false, // Set a default value for flagged
      },
      score: 0,
    });
  };

  const getToxicityScore = async (input: string) => {
    let toxicity_results = await Moderation.getTextScore(input);
    // let toxicity_results = {
    //   categories: {}, // Initialize with an empty object or appropriate default values
    //   category_applied_input_types: {},
    //   category_scores: {},
    //   flagged: false, // Set a default value for flagged
    // };
    if (typeof toxicity_results === "number") {
      // If toxicity_results is a number, it means an error occurred and we should handle it
      console.error("Error fetching toxicity score:", toxicity_results);
      return;
    }
    let toxicity_score = calculateScore(toxicity_results);
    setToxicityInfos((prev) => ({
      ...prev,
      results: toxicity_results as AnalysisResult, // Ensure the correct type is assigned
      score: toxicity_score,
    }));
    setShowScore(false);
    setCanSubmit(true);
  };

  const opacityScore = useSharedValue<number>(0);
  const opacityButtons = useSharedValue<number>(0);
  const progressiveApparition = () => {
    if (showScore) {
      opacityButtons.value = withDelay(
        0 * DELAY,
        withTiming(0, { duration: DURATION })
      );
      opacityScore.value = withDelay(
        0 * DELAY,
        withTiming(0, { duration: DURATION })
      );
    } else {
      opacityScore.value = withDelay(
        0 * DELAY,
        withTiming(1, { duration: DURATION })
      );
      opacityButtons.value = withDelay(
        1 * DELAY,
        withTiming(1, { duration: DURATION })
      );
    }
  };

  const submitPost = async () => {
    try {
      if (toxicityInfos.score > 50) {
        Alert.alert(
          "Attention !",
          `Votre score est de ${Math.floor(
            toxicityInfos.score
          )}%, il dépasse les 50% préconisés par Safeplace.`,
          [{ text: "OK" }]
        );
      } else {
        await Comments.postOne(
          user?.Id_User,
          postMessage,
          toxicityInfos.score,
          idPost
        );
        onCloseModal();
      }
    } catch (error) {
      Alert.alert("Erreur", "Votre post n'a pas pu être publié", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      console.error("Failed to fetch posts:", error);
    }
  };

  const iaModalRef = useRef<SwipeModalPublicMethods>(null);
  const showModal = () => iaModalRef.current?.show(); // Call this function to show modal
  const hideModal = () => iaModalRef.current?.hide(); // Call this function to hide modal

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

  useEffect(() => {
    if (modalVisible) {
      // showModal();
      textInputRef.current?.focus();
    }
  }, [modalVisible]);

  useEffect(() => {
    progressiveApparition();
  }, [showScore]);

  useEffect(() => {
    // setShowScore(false)
    // console.log(postMessage);

    // if (showScore) {
    //   progressiveApparition();
    // }
    setCanSubmit(false);
    setShowScore(true);
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
      onRequestClose={() => onCloseModal}
    >
      <View style={styles.modalContainer}>
        <ModalHeader
          closeModal={onCloseModal}
          submitPost={submitPost}
          canSubmit={canSubmit}
        >
          Nouveau commentaire
        </ModalHeader>

        <View style={styles.postMessageContainer}>
          <Image style={styles.image} source={profilePictureSource} />
          <Pressable
            style={styles.inputContainer}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.profileName}>
              {user?.first_name}
              {user?.last_name}
            </Text>
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
                  <FleurViolet width={18} height={18} />
                </Reanimated.View>
                <Text style={styles.analyse}>Analyse...</Text>
                {/* <ShimmerText /> */}
              </Reanimated.View>
            )}
          </Pressable>
        </View>
        <View style={styles.scoreContainer}>
          <Reanimated.Text
            style={[styles.scoreLabel, { opacity: opacityScore }]}
          >
            Votre message a obtenu un score de toxicité de
          </Reanimated.Text>
          <Reanimated.View
            style={[styles.scoreResultContainer, { opacity: opacityScore }]}
          >
            <AnimatedNumbers
              animateToNumber={toxicityInfos.score}
              fontStyle={[
                styles.scoreStyle,
                { color: `${getColorScore(toxicityInfos.score)}` },
              ]}
            />
            <Text
              style={[
                styles.percentageSymbol,
                { color: `${getColorScore(toxicityInfos.score)}` },
              ]}
            >
              %
            </Text>
          </Reanimated.View>
          <Reanimated.View
            style={[styles.buttonsContainer, { opacity: opacityButtons }]}
          >
            <RephraseButton
              color={colors.primary}
              onPress={() => {
                setIsRephrasingModal(true);
                showModal();
              }}
            />
            <FeedbackButton
              color={colors.black}
              onPress={() => {
                setIsRephrasingModal(false);
                showModal();
              }}
            />
          </Reanimated.View>
        </View>
      </View>

      <NewPostAIButtonModal
        isRephrasing={isRephrasingModal}
        reference={iaModalRef}
        toxicityInfos={toxicityInfos}
        postMessage={postMessage}
        setPostMessage={setPostMessage}
        setShowScore={setShowScore}
        hideModal={hideModal}
      />
    </Modal>
  );
};

export default NewCommentModal;

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
    fontFamily: "Helvetica-Bold",
    fontSize: 15,
  },
  scoreContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreLabel: {
    paddingTop: 25,
    paddingBottom: 15,
    fontFamily: "Helvetica-Bold",
    color: colors.black,
  },
  scoreResultContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: 20,
  },
  scoreStyle: {
    fontSize: 70,
    fontWeight: "bold",
    fontFamily: "BricolageGrotesque-SemiBold",
  },
  percentageSymbol: {
    paddingVertical: 15,
    fontSize: 20,
    fontWeight: "bold",
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
