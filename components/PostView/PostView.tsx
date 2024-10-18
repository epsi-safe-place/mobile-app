import React, { useRef, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHeart,
  faComment,
  faShare,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import globalStyles from "@/app/styles/globalStyles";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import colors from "@/app/styles/theme";
import * as Haptics from "expo-haptics";
import Score from "../Score/Score";
import { router } from "expo-router";
import { SwipeModalPublicMethods } from "@birdwingo/react-native-swipe-modal";
import NewPostAIButtonModal from "../NewPostAIButtonModal/NewPostAIButtonModal";
import FeedBackAIModal from "../FeedBackAIModal/FeedBackAIModal";

interface PostViewProps {
  profileName: string;
  postID: string;
  score: number;
  profilePicturePath?: string;
  postText: string;
  timeAgo: string;
  commentAction: () => void;
  showModal: () => void;
  setSelectedPostText: (input: string) => void;
}

const PostView: React.FC<PostViewProps> = ({
  profileName,
  postID,
  score,
  profilePicturePath,
  postText,
  timeAgo,
  commentAction,
  showModal,
  setSelectedPostText,
}) => {
  const profilePictureSource = profilePicturePath
    ? { uri: profilePicturePath }
    : require("../../assets/images/profileDefault.png");

  const [isLiked, setIsLiked] = useState(false);
  const [isRephrasingModal, setIsRephrasingModal] = useState(false);

  return (
    <Pressable
      onLongPress={() => {
        setSelectedPostText(postText);
        showModal();
      }}
      onPress={() => router.push(`/post/${postID}`)}
    >
      <View style={styles.container}>
        {/* Colonne 1 : Image de profil */}
        <Image style={styles.image} source={profilePictureSource} />
        {/* Colonne 2 : Informations utilisateur et post */}
        <View style={styles.postContainer}>
          <View style={styles.header}>
            <Text style={styles.profileName}>{profileName}</Text>
            <Text style={[globalStyles.textSecondary, styles.timeAgo]}>
              {timeAgo}
            </Text>
          </View>

          {/* Contenu du post */}
          <Text style={[globalStyles.text, styles.postText]}>{postText}</Text>

          {/* Boutons d'interaction */}
          <View style={styles.iconsContainer}>
            <TouchableOpacity
              onPress={() => {
                setIsLiked(!isLiked);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              {/* <FontAwesomeIcon icon={faHeart} size={18} style={styles.iconStyle} /> */}
              {isLiked ? (
                <AntDesign name="heart" size={18} color={colors.primary} />
              ) : (
                <AntDesign name="hearto" size={18} color={colors.primary} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={commentAction}>
              <FontAwesome name="comment-o" size={18} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="share" size={18} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="send" size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        <Score score={score} height={40} />
      </View>
    </Pressable>
  );
};

export default PostView;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  image: {
    width: "10%",
    aspectRatio: 1,
    borderRadius: 30,
  },
  postContainer: {
    width: "80%",
    paddingHorizontal: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 5,
  },
  profileName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 16,
  },
  timeAgo: {
    fontFamily: "Helvetica",
    fontSize: 16,
  },
  postText: {
    fontSize: 16,
  },
  iconsContainer: {
    paddingTop: 10,
    flexDirection: "row",
    gap: 20,
  },
  iconStyle: {},
});
