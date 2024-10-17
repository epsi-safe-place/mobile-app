import React, { useEffect, useState } from "react";
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

// Define a type for the post
type Post = {
  Id_Post: number; // or string, depending on your data structure
  content: string;
  timeAgo: string; // Adjust types as necessary
  name: string; // Add this line to include the name property
  user: {
    // Add this block to define the user property
    first_name: string;
    last_name: string;
  };
  date_creation: string; // Add this line to include the date_creation property
};

const Homepage = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]); // Initialize as an empty array of Post type
  const rotation = useSharedValue(0);

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

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const fetchAllPosts = async () => {
    try {
      const response = await Posts.getAllPosts();
      setPosts(response);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1 }}
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
        posts.sort((a, b) => new Date(b.date_creation).getTime() - new Date(a.date_creation).getTime()).map((post) => (
          <PostView
            key={post.Id_Post} // Use a unique identifier for the key
            profileName={`${post.user.first_name}${post.user.last_name}`} // Corrected usage
            postText={post.content}
            timeAgo={calculateTimeAgo(post.timeAgo)}
            commentAction={() => setCommentModalVisible(true)}
          />
        ))
      ) : (
        <>
          <Skeleton colorMode="light" width={200} />
          <Spacer />
        </>
      )}
      <CommentModal
        modalVisible={commentModalVisible}
        setModalVisible={setCommentModalVisible}
      />
    </ScrollView>
  );
};

export default Homepage;
