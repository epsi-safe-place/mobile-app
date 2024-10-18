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
import { calculateScore } from "@/utils/utils";
import Moderation from "@/service/api/moderation";

interface AnalysisResult {
  categories: { [key: string]: boolean };
  category_applied_input_types: { [key: string]: string[] };
  category_scores: { [key: string]: number };
  flagged: boolean;
}

interface FeedBackAIModalProps {
  reference: React.RefObject<SwipeModalPublicMethods>;
  postMessage: string;
  hideModal: () => void;
}

const FeedBackAIModal: React.FC<FeedBackAIModalProps> = ({
  reference,
  postMessage,
  hideModal,
}) => {
  const [isTextLoaded, setTextIsLoaded] = useState(false);
  const [rephrasedText, setRephrasedText] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // Nouveau état pour gérer la visibilité du modal
  const [toxicityInfos, setToxicityInfos] = useState<{
    results: AnalysisResult;
    score: number;
  }>(); // Nouveau état pour gérer la visibilité du modal

  const getToxicityScore = async (input: string) => {
    try {
      const toxicity_results = await Moderation.getTextScore(input);
      if (typeof toxicity_results === "number") {
        // Gestion des erreurs si toxicity_results est un nombre (par exemple, un code d'erreur)
        console.error("Error fetching toxicity score:", toxicity_results);
        return null;
      }
      const toxicity_score = calculateScore(toxicity_results);

      // Retourner les résultats au lieu de mettre à jour l'état
      return {
        results: toxicity_results as AnalysisResult,
        score: toxicity_score,
      };
    } catch (error) {
      console.error("Error in getToxicityScore:", error);
      return null;
    }
  };

  const getFeedBackText = async () => {
    const toxicityInfos = await getToxicityScore(postMessage);

    if (toxicityInfos) {
      try {
        // Appel à l'API de reformulation avec les informations de toxicité
        const response = (await Rephrasing.getFeedback(
          toxicityInfos,
          postMessage
        )) as { data: { choices: { message: { content: string } }[] } };

        // Extraction du texte de feedback
        let textResponse = response.data.choices[0].message.content;
        textResponse = textResponse.replace(/^"|"$/g, ""); // Suppression des guillemets au début et à la fin
        setFeedbackText(textResponse);
        setTextIsLoaded(true);
      } catch (error) {
        console.error("Error in getFeedBackText:", error);
      }
    } else {
      console.error("Impossible d'obtenir les informations de toxicité");
    }
  };

  const displayContent = () => {
    return (
      <View>
        <TypeAnimation
          cursor={false}
          style={styles.normalText}
          sequence={[
            {
              text: feedbackText,
              typeSpeed: 10,
            },
          ]}
        />

        <Reanimated.View
          style={styles.buttonContainer}
          entering={FadeIn}
          exiting={FadeOut}
        >
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
        </Reanimated.View>
      </View>
    );
  };

  useEffect(() => {
    if (isModalVisible) {
      getFeedBackText();
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
        <View style={styles.titleContainer}>
          <DoubleAIStarBlack width={28} height={28} />
          <Text style={[styles.modalTitle, { color: colors.black }]}>
            Obtenir un feedback
          </Text>
        </View>
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

export default FeedBackAIModal;

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
