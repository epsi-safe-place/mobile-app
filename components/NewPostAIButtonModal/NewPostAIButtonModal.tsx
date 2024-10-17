import TouchableScale from "@jonny/touchable-scale";
import {
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SwipeModal, {
  SwipeModalPublicMethods,
} from "@birdwingo/react-native-swipe-modal";
import { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-native-type-animation";
import DoubleAIStar from "../Svg/DoubleAIStarWhite";
import colors from "@/app/styles/theme";
import DoubleAIStarPurple from "../Svg/DoubleAIStarPurple";
import { Skeleton } from "moti/skeleton";
import { LinearGradient } from "expo-linear-gradient";
import Rephrasing from "@/service/api/rephrasing";
import Reanimated, { FadeIn, FadeOut } from "react-native-reanimated";
import globalStyles from "@/app/styles/globalStyles";
import DoubleAIStarBlack from "../Svg/DoubleAIStarBlack";

interface AnalysisResult {
  categories: { [key: string]: boolean };
  category_applied_input_types: { [key: string]: string[] };
  category_scores: { [key: string]: number };
  flagged: boolean;
}

interface NewPostAIButtonModalProps {
  isRephrasing: boolean;
  reference: React.RefObject<SwipeModalPublicMethods>;
  toxicityInfos: { results: AnalysisResult; score: number };
  postMessage: string;
  setPostMessage: (input: string) => void;
  setShowScore: (visible: boolean) => void,
  hideModal: () => void;
}

const NewPostAIButtonModal: React.FC<NewPostAIButtonModalProps> = ({
  isRephrasing,
  reference,
  toxicityInfos,
  postMessage,
  setPostMessage,
  setShowScore,
  hideModal,
}) => {
  const [isTextLoaded, setTextIsLoaded] = useState(false);
  const [rephrasedText, setRephrasedText] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // Nouveau état pour gérer la visibilité du modal

  const rephraseTheText = async () => {
    let response = (await Rephrasing.getRephrasing(
      toxicityInfos,
      postMessage
    )) as { data: { choices: { message: { content: string } }[] } }; // Ensure choices is an array
    let textResponse = response.data.choices[0].message.content; // Access the first element safely
    textResponse = textResponse.replace(/^"|"$/g, ""); // Remove double quotes from the start and end
    setRephrasedText(textResponse);
    // setRephrasedText(
    //   "Je voudrais aborder les retards que nous rencontrons souvent. Cela complique un peu les choses pour moi, et j'aimerais discuter de comment nous pourrions améliorer la situation. Merci de votre compréhension !"
    // );
    setTextIsLoaded(true);
  };

  const getFeedBackText = async () => {
    let response = (await Rephrasing.getFeedback(
      toxicityInfos,
      postMessage
    )) as { data: { choices: { message: { content: string } }[] } }; // Ensure choices is an array
    let textResponse = response.data.choices[0].message.content; // Access the first element safely
    textResponse = textResponse.replace(/^"|"$/g, ""); // Remove double quotes from the start and end
    setFeedbackText(textResponse);
    setTextIsLoaded(true);
  };

  const displayContent = () => {
    return (
      <View>
        <TypeAnimation
          cursor={false}
          style={styles.normalText}
          sequence={[
            {
              text: isRephrasing ? rephrasedText : feedbackText,
              typeSpeed: 10,
            },
          ]}
        />

        <Reanimated.View
          style={styles.buttonContainer}
          entering={FadeIn}
          exiting={FadeOut}
        >
          {isRephrasing ? (
            <TouchableScale
              transitionDuration={100}
              onPress={() => {
                setPostMessage(rephrasedText)
                setShowScore(true)
                hideModal();
              }}
              style={[
                {
                  backgroundColor: colors.black,
                  shadowColor: colors.black,
                  borderRadius: 10,
                  marginBottom: 25,
                },
              ]}
            >
              <ImageBackground
                borderRadius={10}
                source={require("../../assets/images/primaryMeshGradient.jpeg")}
                style={[{ shadowColor: colors.primary }, styles.buttonStyle]}
              >
                <DoubleAIStar width={18} height={18} />
                <Text style={[styles.buttonTextStyle, { color: colors.white }]}>
                  Appliquer les modifications
                </Text>
              </ImageBackground>
            </TouchableScale>
          ) : (
            <TouchableScale
              transitionDuration={100}
              onPress={() => {
                hideModal();
              }}
              style={[
                {
                  backgroundColor: colors.black,
                  shadowColor: colors.black,
                  borderRadius: 10,
                  marginBottom: 25,
                },
                styles.buttonStyle,
              ]}
            >
              <Text style={[styles.buttonTextStyle, { color: colors.white }]}>
                J'ai compris !
              </Text>
            </TouchableScale>
          )}
        </Reanimated.View>
      </View>
    );
  };

  useEffect(() => {
    if (isModalVisible) {
      if (isRephrasing) {
        rephraseTheText();
      } else {
        getFeedBackText();
      }
    }
  }, [isModalVisible]); // Utiliser l'état isModalVisible pour lancer l'appel API uniquement lorsque le modal est visible

  return (
    <SwipeModal
      maxHeight={500}
      bg="white"
      ref={reference}
      onShow={() => setIsModalVisible(true)}
      onHide={() => {
        setRephrasedText("");
        setFeedbackText("");
        setTextIsLoaded(false);
        setIsModalVisible(false);
      }}
    >
      <ScrollView style={styles.container}>
        {isRephrasing ? (
          <View style={styles.titleContainer}>
            <DoubleAIStarPurple width={28} height={28} />
            <Text style={[styles.modalTitle, { color: colors.primary }]}>
              Reformulation par IA
            </Text>
          </View>
        ) : (
          <View style={styles.titleContainer}>
            <DoubleAIStarBlack width={28} height={28} />
            <Text style={[styles.modalTitle, { color: colors.black }]}>
              Obtenir un feedback
            </Text>
          </View>
        )}
        <View>
          {!isTextLoaded && rephrasedText == "" && feedbackText == "" ? (
            <Reanimated.View entering={FadeIn} exiting={FadeOut}>
              <Skeleton colorMode="light" width={250} />
              <Spacer />
              <Skeleton colorMode="light" width="100%" />
              <Spacer />
              <Skeleton colorMode="light" width={200} />
              <Spacer />
              <Skeleton colorMode="light" width={280} />
              <Spacer />
              <Skeleton colorMode="light" width={100} />
              <Spacer />
              <Skeleton colorMode="light" width={250} />
            </Reanimated.View>
          ) : (
            displayContent()
          )}
        </View>
      </ScrollView>
    </SwipeModal>
  );
};

export default NewPostAIButtonModal;

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    paddingBottom: 20,
  },
  modalTitle: {
    fontFamily: "BricolageGrotesque-Bold",
    fontSize: 25,
  },
  normalText: {
    fontFamily: "Helevetica",
    fontSize: 18,
  },
  buttonContainer: {
    paddingVertical: 20,
  },
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
