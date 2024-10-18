import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  Touchable,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { UserContext } from "@/components/contexts/UserContext";
import ProfileButton from "@/components/ProfileButton/ProfileButton";
import Posts from "@/service/api/posts";
import { Skeleton } from "moti/skeleton";
import Spacer from "@/components/Spacer/Spacer";
import { calculateTimeAgo } from "@/utils/utils";
import PostView from "@/components/PostView/PostView";
import { router } from "expo-router";
import { Divider } from "react-native-paper";
import Score from "@/components/Score/Score";
import FeedBackAIModal from "@/components/FeedBackAIModal/FeedBackAIModal";
import { SwipeModalPublicMethods } from "@birdwingo/react-native-swipe-modal";

type Post = {
  Id_Post: string; // or string, depending on your data structure
  content: string;
  timeAgo: string; // Adjust types as necessary
  name: string; // Add this line to include the name property
  user: {
    // Add this block to define the user property
    first_name: string;
    last_name: string;
    Id_User: number; // Assuming there's an id property for the user
  };
  date_creation: string; // Add this line to include the date_creation property
  toxic_score: number; // Add this line to include the score property
};

const ProfilePage = () => {
  const { user, saveUser, logout } = useContext(UserContext);

  const [posts, setPosts] = useState<Post[]>([]); // Initialize as an empty array of Post type
  const [score, setScore] = useState(0); // Initialize as an empty array of Post type
  const [refreshing, setRefreshing] = useState(false); // Added for refresh control
  const rotation = useSharedValue(0); // Added for rotation animation

  const iaModalRef = useRef<SwipeModalPublicMethods>(null);
  const showModal = () => iaModalRef.current?.show(); // Call this function to show modal
  const hideModal = () => iaModalRef.current?.hide(); // Call this function to hide modal

  const [selectedPostText, setSelectedPostText] = useState("");

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
      // Filter posts related to the current user
      const filteredPosts = response.filter(
        (post: Post) =>
          post.user.Id_User === (user?.Id_User ? user.Id_User : -1) // Ensure both sides are numbers
      );

      // Calculate the score based on the scores of the last 10 posts
      const lastTenPosts = filteredPosts.slice(0, 10);
      if (lastTenPosts.length > 0) {
        const totalScore = lastTenPosts.reduce(
          (total: number, post: Post) => total + post.toxic_score,
          0
        );
        const averageScore = totalScore / lastTenPosts.length;
        setScore(Math.floor(averageScore));
      } else {
        setScore(0); // Set score to 0 if no posts
      }

      setPosts(filteredPosts);
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
        style={{ paddingHorizontal: 12 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Pressable onPress={() => router.push("/Profile/Settings")}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </Pressable>
        <View style={styles.profileInfosContainer}>
          <View style={{ display: "flex", gap: 8 }}>
            <Text style={styles.profileNameText}>{user?.first_name}</Text>
            <Text>
              @{user?.first_name}
              {user?.last_name}
            </Text>
            <Text>Bordeaux</Text>
            <Score score={score} height={40} />
          </View>
          <Image
            style={styles.image}
            source={require("../../assets/images/profileDefault.png")}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <ProfileButton title="Modifier le profile" />
          <ProfileButton title="Partager le profile" />
        </View>
        <Spacer />
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
                commentAction={() => {}}
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
      </ScrollView>

      <FeedBackAIModal
        reference={iaModalRef}
        postMessage={selectedPostText}
        hideModal={hideModal}
      />
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  profileInfosContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  image: {
    width: "15%",
    aspectRatio: 1,
    borderRadius: 30,
  },
  profileNameText: {
    fontSize: 25,
    fontFamily: "Helvetica-Bold",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
