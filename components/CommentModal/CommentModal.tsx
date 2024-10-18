import { Modal, Text } from "react-native";

interface CommentModalProps {
    modalVisible: boolean, 
    setModalVisible: (visible: boolean) => void
}

const CommentModal: React.FC<CommentModalProps> = ({modalVisible, setModalVisible}) => {
  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
        <Text>Hello</Text>
    </Modal>
  );
};

export default CommentModal;
