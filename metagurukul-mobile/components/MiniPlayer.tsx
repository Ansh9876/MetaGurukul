import { View, Text, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import { usePlayer } from "../context/PlayerContext";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MarqueeText from "./MarqueeText";

export default function MiniPlayer() {

    const { currentTrack, isPlaying, setIsPlaying, setCurrentTrack } = usePlayer();
    if (!currentTrack || !currentTrack.playlist) return null;

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        const nextIndex = currentTrack.index + 1;

        if (nextIndex < currentTrack.playlist.length) {
            setCurrentTrack({
                ...currentTrack,
                index: nextIndex,
                title: currentTrack.playlist[nextIndex].title,
                audioUrl: currentTrack.playlist[nextIndex].videoUrl
            });
        }
    };

    const handlePrev = () => {
        const prevIndex = currentTrack.index - 1;

        if (prevIndex >= 0) {
            setCurrentTrack({
                ...currentTrack,
                index: prevIndex,
                title: currentTrack.playlist[prevIndex].title,
                audioUrl: currentTrack.playlist[prevIndex].videoUrl
            });
        }
    };

    return (

        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.9}
            onPress={() => router.push({
                pathname: "/videoPlayer",
                params: {
                    playlist: JSON.stringify(currentTrack.playlist),
                    index: String(currentTrack.index)
                }
            })}
        >

            {/* LEFT SIDE */}
            <View style={styles.info}>
                <MarqueeText text={currentTrack.title} />

                <Text style={styles.subtitle}>
                    Playing now
                </Text>
            </View>

            {/* CONTROLS */}
            <View style={styles.controls}>

                <Pressable
                    onPress={handlePrev}
                    style={({ pressed }) => [
                        styles.iconButton,
                        pressed && styles.pressed
                    ]}
                >
                    <Ionicons name="play-skip-back" size={18} />
                </Pressable>

                <Pressable
                    onPress={handlePlayPause}
                    style={({ pressed }) => [
                        styles.mainButton,
                        pressed && styles.pressedMain
                    ]}
                >
                    <Ionicons
                        name={isPlaying ? "pause" : "play"}
                        size={20}
                        color="#fff"
                    />
                </Pressable>

                <Pressable
                    onPress={handleNext}
                    style={({ pressed }) => [
                        styles.iconButton,
                        pressed && styles.pressed
                    ]}
                >
                    <Ionicons name="play-skip-forward" size={18} />
                </Pressable>

            </View>

        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({

    container: {
        position: "absolute",
        bottom: 78,
        left: 10,
        right: 10,

        backgroundColor: "#f8bd5d",
        borderRadius: 14,

        paddingVertical: 8,
        paddingHorizontal: 12,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        elevation: 8,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },

        borderWidth: 1,
        borderColor: "#f1f1f1"
    },

    info: {
        flex: 1,
        marginRight: 10,
        maxWidth: "60%"
    },

    title: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111"
    },

    subtitle: {
        fontSize: 11,
        color: "#888",
        marginTop: 2
    },

    controls: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },

    iconButton: {
        padding: 6,
        borderRadius: 8
    },

    pressed: {
        backgroundColor: "#f0f0f0"
    },

    mainButton: {
        backgroundColor: "#7d380a",
        padding: 8,
        borderRadius: 50
    },

    pressedMain: {
        opacity: 0.7
    },
});