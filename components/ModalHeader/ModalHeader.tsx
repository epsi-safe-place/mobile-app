import { Button, StyleSheet, View, Text } from "react-native";
import Divider from "../Divider/Divider";

interface ModalHeaderProps {
    closeModal: () => void;
    submitPost: () => void
}

const ModalHeader: React.FC<ModalHeaderProps> = ({closeModal, submitPost}) => {
  return (
    <View>
      <View style={styles.modalHeader}>
        <Button
          title="Annuler"
          color="#171717"
          onPress={closeModal}
        />
        <Text style={styles.modalTitle}>Nouvelle publication</Text>
        <Button title="Publier" color="#171717" onPress={submitPost} />
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
