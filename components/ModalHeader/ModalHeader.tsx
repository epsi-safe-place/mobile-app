import { Button, StyleSheet, View, Text } from "react-native";
import Divider from "../Divider/Divider";
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

interface ModalHeaderProps {
  closeModal: () => void;
  submitPost: () => void;
  children: React.ReactNode;
  canSubmit: boolean;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  closeModal,
  submitPost,
  children,
  canSubmit,
}) => {
  return (
    <View>
      <View style={styles.modalHeader}>
        <Button title="Annuler" color="#171717" onPress={closeModal} />
        <Text style={styles.modalTitle}>{children}</Text>
        {canSubmit ? (
          <Reanimated.View entering={FadeIn} exiting={FadeOut}>
            <Button title="Publier" color="#171717" onPress={submitPost} />
          </Reanimated.View>
        ) : (
          <Button title="Publier" color="transparent" onPress={() => {}} />
        )}
      </View>
      <Divider width={0.2} color="#BEBEBE" />
    </View>
  );
};

export default ModalHeader;

const styles = StyleSheet.create({
  modalHeader: {
    paddingVertical: 12,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
