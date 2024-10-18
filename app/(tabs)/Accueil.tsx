import React, { useContext, useEffect, useRef, useState } from "react";
import Divider from "@/components/Divider/Divider";
import HomePostMessage from "@/components/HomePostMessage/HomePostMessage";
import PostView from "@/components/PostView/PostView";
import FleurViolet from "@/components/Svg/FleurViolet";
import {
  ScrollView,
  View,
  RefreshControl,
  TouchableOpacity,
  Touchable,
  Pressable,
  SafeAreaView,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";
import CommentModal from "@/components/CommentModal/CommentModal";
import Posts from "@/service/api/posts";
import { Skeleton } from "moti/skeleton";
import Spacer from "@/components/Spacer/Spacer";
import { calculateTimeAgo } from "@/utils/utils";
import SafePlaceLogo from "@/components/Svg/SafePlaceLogo";
import { router } from "expo-router";
import { UserContext } from "@/components/contexts/UserContext";
import FeedBackAIModal from "@/components/FeedBackAIModal/FeedBackAIModal";
import { SwipeModalPublicMethods } from "@birdwingo/react-native-swipe-modal";

// Define a type for the post
type Post = {
  Id_Post: string; // or string, depending on your data structure
  content: string;
  timeAgo: string; // Adjust types as necessary
  name: string; // Add this line to include the name property
  user: {
    // Add this block to define the user property
    first_name: string;
    last_name: string;
    Id_User: string;
  };
  date_creation: string; // Add this line to include the date_creation property
  toxic_score: number;
};

const Homepage = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]); // Initialize as an empty array of Post type
  const rotation = useSharedValue(0);

  const { user, saveUser, logout } = useContext(UserContext);
  const [username, setUsername] = useState<string>(user ? user.username : "");

  const [selectedPostText, setSelectedPostText] = useState("");

  const iaModalRef = useRef<SwipeModalPublicMethods>(null);
  const showModal = () => iaModalRef.current?.show(); // Call this function to show modal
  const hideModal = () => iaModalRef.current?.hide(); // Call this function to hide modal

  const onRefresh = async () => {
    setRefreshing(true);
    // Démarrer l'animation de rotation
    startRotation();
    // Fetch all posts
    await fetchAllPosts();
    // Arrêter l'animation après le chargement
    setRefreshing(false);
    cancelAnimation(rotation);
    rotation.value = 0;
  };

  const startRotation = () => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1, // Répéter indéfiniment
      false // Ne pas inverser la direction à chaque répétition
    );
  };

  const fetchAllPosts = async () => {
    try {
      const response = await Posts.getAllPosts();
      const filteredPosts = response.filter(
        (post: Post) => post.user.Id_User !== user?.Id_User // Compare the user Ids directly
      );
      setPosts(response);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ paddingVertical: 12 }}>
          <View style={{ paddingLeft: 25, paddingBottom: 20 }}>
            <SafePlaceLogo height={30} width={156} />
          </View>
          <HomePostMessage />
        </View>
        <Divider />
        {posts.length > 0 ? ( // Check if posts array has items
          posts
            .sort(
              (a, b) =>
                new Date(b.date_creation).getTime() -
                new Date(a.date_creation).getTime()
            )
            .map((post) => (
              <PostView
                // Use a unique identifier for the key
                key={post.Id_Post}
                postID={post.Id_Post}
                profileName={`${post.user.first_name}${post.user.last_name}`} // Corrected usage
                score={post.toxic_score}
                postText={post.content}
                timeAgo={calculateTimeAgo(post.date_creation)}
                commentAction={() => setCommentModalVisible(true)}
                showModal={showModal}
                setSelectedPostText={setSelectedPostText}
              />
            ))
        ) : (
          <View style={{ padding: 12 }}>
            <Skeleton colorMode="light" width="100%" height={100} />
            <Spacer />
            <Skeleton colorMode="light" width="100%" height={100} />
            <Spacer />
            <Skeleton colorMode="light" width="100%" height={100} />
            <Spacer />
          </View>
        )}
        <CommentModal
          modalVisible={commentModalVisible}
          setModalVisible={setCommentModalVisible}
        />
      </ScrollView>

      <FeedBackAIModal
        reference={iaModalRef}
        postMessage={selectedPostText}
        hideModal={hideModal}
      />
    </SafeAreaView>
  );
};

export default Homepage;
