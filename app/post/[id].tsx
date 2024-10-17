import PostView from "@/components/PostView/PostView";
import Posts from "@/service/api/posts";
import { calculateTimeAgo } from "@/utils/utils";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState, useRef } from "react";
import {
  Pressable,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Divider } from "react-native-paper";
import Comments from "@/service/api/comments";
import colors from "../styles/theme";
import NewPostModal from "@/components/NewPostModal/NewPostModal";
import NewCommentModal from "@/components/NewCommentModal/NewCommentModal";

type Post = {
  Id_Post: string; // Adjusted to string based on the provided data structure
  content: string;
  visibility: string; // Added visibility property
  toxic_score: number; // Added toxic_score property
  image_exists: boolean; // Added image_exists property
  date_creation: string; // Adjusted to include the date_creation property
  verified: boolean; // Added verified property
  Id_User: string; // Added Id_User property
  user: {
    // Adjusted user property to match the provided structure
    Id_User: string;
    name?: string; // Made name optional as it can be null
    last_name: string;
    first_name: string;
    birth_date: string; // Added birth_date property
    mail: string; // Added mail property
    password: string; // Added password property
    isAdmin: boolean; // Added isAdmin property
    seed_totp: string; // Added seed_totp property
  };
  comments: any[]; // Added comments property
};

type Comment = {
  Id_Comment: string;
  content: string;
  date_upload: string;
  toxic_score: number;
  image_exists: boolean;
  verified?: boolean;
  Id_Reply_to_comment?: string;
  Id_Post: string;
  Id_User: string;
  user: {
    Id_User: string;
    name?: string;
    last_name: string;
    first_name: string;
    birth_date: string;
    mail: string;
    password: string;
    isAdmin: boolean;
    seed_totp: string;
  };
  replies: any[];
  image_b64?: string;
};

const PostPage = () => {
  const [post, setPost] = useState<Post | undefined>(undefined); // Adjusted useState to include the Post type and made it optional
  const [comments, setComments] = useState<Comment[]>([]); // Added state for comments
  const local = useLocalSearchParams();
  const scrollViewRef = useRef<ScrollView>(null); // Added useRef for ScrollView

  const [modalVisible, setModalVisible] = useState(false);

  const fetchPostById = async () => {
    try {
      const response = await Posts.getById(
        Array.isArray(local.id) ? local.id[0] : local.id
      ); // Ensure local.id is a string
      setPost(response);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await Comments.getAllComments(); // Removed argument as per the updated requirement
      const filteredComments = response.filter(
        (
          comment: Comment // Explicitly define the type
        ) =>
          comment.Id_Post === (Array.isArray(local.id) ? local.id[0] : local.id)
      ).sort((a: Comment, b: Comment) => // Explicitly define the type
          new Date(b.date_upload).getTime() - new Date(a.date_upload).getTime()
      ); // Sort comments from most recent to oldest
      setComments(filteredComments);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  useEffect(() => {
    fetchPostById();
    fetchComments();
  }, []);

  const handleRefresh = async () => {
    try {
      await fetchPostById();
      await fetchComments();
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true }); // Scroll to top after refresh
    } catch (error) {
      console.error("Failed to refresh:", error);
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={handleRefresh} />
      }
    >
      <TouchableOpacity
        onPress={() => router.replace("/home")}
        style={styles.backButton}
      >
        <Entypo name="chevron-left" size={24} color="black" />
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
      {post && ( // Check if post is defined
        <PostView
          key={post.Id_Post} // Use a unique identifier for the key
          profileName={`${post.user.first_name}${post.user.last_name}`} // Corrected usage
          postText={post.content}
          timeAgo={calculateTimeAgo(post.date_creation)}
          //   commentAction={() => setCommentModalVisible(true)}
          commentAction={() => setModalVisible(true)}
        />
      )}
      <Text style={{ fontSize: 14, fontFamily: "Helvetica-Bold", padding: 10 }}>
        Réponses ({comments.length})
      </Text>
      <Divider />
      {comments.length > 0 ? (
        comments.map((comment) => (
          <PostView
            key={comment.Id_Comment} // Use a unique identifier for the key
            profileName={`${comment.user.first_name}${comment.user.last_name}`} // Corrected usage
            postText={comment.content}
            timeAgo={calculateTimeAgo(comment.date_upload)}
            //   commentAction={() => setCommentModalVisible(true)}
            commentAction={() => setModalVisible(true)}
          />
        ))
      ) : (
        <Text
          style={{
            textAlign: "center",
            fontFamily: "BricolageGrotesque-SemiBold",
            fontSize: 16,
            color: colors.primary,
            paddingVertical: 20,
          }}
        >
          Aucun commentaires
        </Text>
      )}
      <NewCommentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        profilePicturePath=''
        idPost={Array.isArray(local.id) ? local.id[0] : local.id || ""}
      />
    </ScrollView>
  );
};

export default PostPage;

const styles = StyleSheet.create({
  backButton: {
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: "Helvetica",
  },
});

// {posts.length > 0 ? ( // Check if posts array has items
//     posts.sort((a, b) => new Date(b.date_creation).getTime() - new Date(a.date_creation).getTime()).map((post) => (
//       <PostView
//         key={post.Id_Post} // Use a unique identifier for the key
//         profileName={`${post.user.first_name}${post.last_name}`} // Corrected usage
//         postText={post.content}
//         timeAgo={calculateTimeAgo(post.date_creation)}
//         commentAction={() => setCommentModalVisible(true)}
//       />
//     ))
//   ) : (
//     <>
//       <Skeleton colorMode="light" width={200} />
//       <Spacer />
//     </>
//   )}
