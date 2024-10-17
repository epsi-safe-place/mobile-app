import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart, faComment, faShare, faBookmark } from "@fortawesome/free-solid-svg-icons";
import globalStyles from "@/app/styles/globalStyles";

interface PostViewProps {
    profileName: string;
    profilePicturePath?: string;
    postText: string;
    timeAgo: string;
}

const PostView: React.FC<PostViewProps> = ({
    profileName,
    profilePicturePath,
    postText,
    timeAgo,
}) => {
    const profilePictureSource = profilePicturePath
        ? { uri: profilePicturePath }
        : require("../assets/images/profileDefault.png");

    return (
        <View style={styles.container}>
            {/* Colonne 1 : Image de profil */}
            <Image style={styles.image} source={profilePictureSource} />

            {/* Colonne 2 : Informations utilisateur et post */}
            <View style={styles.postContainer}>
                <View style={styles.header}>
                    <Text style={styles.profileName}>{profileName}</Text>
                    <Text style={[globalStyles.textSecondary, styles.timeAgo]}>{timeAgo}</Text>
                </View>

                {/* Contenu du post */}
                <Text style={[globalStyles.textPrimary, styles.postText]}>
                    {postText}
                </Text>

                {/* Boutons d'interaction */}
                <View style={styles.iconsContainer}>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faHeart} size={18} style={styles.iconStyle} />

                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faComment} size={18} style={styles.iconStyle} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faShare} size={18} style={styles.iconStyle} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faBookmark} size={18} style={styles.iconStyle} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default PostView;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    image: {
        width: "12%",
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
        gap: 5
    },
    profileName: {
        fontFamily: "Helvetica-Bold",
        fontSize: 18,
    },
    timeAgo: {
        fontFamily: "Helvetica",
        fontSize: 14,
    },
    postText: {
        fontSize: 16,
    },
    iconsContainer: {
        paddingTop: 10,
        flexDirection: "row",
        gap: 20
    },
    iconStyle: {
    },
});