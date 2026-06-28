import { View, Text, StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useRef } from "react";
import * as SecureStore from 'expo-secure-store';
import { usePlayer } from "../context/PlayerContext";

export default function VideoPlayer() {



    const { playlist, index, courseId, title, coverImage } = useLocalSearchParams();

    const [currentTime, setCurrentTime] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const playerRef = useRef<any>(null);
    const [playing, setPlaying] = useState(true);

    const [loading, setLoading] = useState(true);

    // ✅ Safe parsing
    let videos: any[] = [];

    try {
        videos = playlist ? JSON.parse(playlist as string) : [];
    } catch (e) {
        console.log("Playlist parse error:", e);
    }

    const [currentIndex, setCurrentIndex] = useState(
        Number(index) || 0
    );

    const { setCurrentTrack, setIsPlaying } = usePlayer();

    // ✅ Extract YouTube ID
    const getYoutubeId = (url: string) => {
        const regex = /v=([^&]+)/;
        const match = url.match(regex);
        return match ? match[1] : "";
    };

    // ✅ When video ends → go next
    const onStateChange = (state: string) => {

        if (state === "ready") {
            setTimeout(() => {
                setPlaying(true);
            }, 300);
        }

        // ✅ IMPORTANT FIX
        if (state === "playing" || state === "paused") {
            setLoading(false);
        }

        if (state === "ended") {
            if (currentIndex < videos.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setLoading(true);
            }
        }
    };

    // ✅ Save progress (module + time)
    const saveProgress = async () => {
        try {
            await SecureStore.setItemAsync(
                "lastCourse",
                JSON.stringify({
                    courseId,
                    index: currentIndex,
                    title,
                    coverImage,
                    time: currentTime
                })
            );
        } catch (e) {
            console.log("Save error:", e);
        }
    };

    // ✅ Save when time or module changes
    useEffect(() => {
        saveProgress();
    }, [currentIndex, currentTime]);

    // ✅ Update global player
    useEffect(() => {
        if (videos.length > 0) {
            setCurrentTrack({
                title: videos[currentIndex].title,
                audioUrl: videos[currentIndex].videoUrl,
                index: currentIndex,
                playlist: videos
            });

            setIsPlaying(true);
        }
    }, [currentIndex]);

    // ✅ Load saved time
    useEffect(() => {
        const loadTime = async () => {
            try {
                const data = await SecureStore.getItemAsync("lastCourse");

                if (data) {
                    const parsed = JSON.parse(data);

                    if (parsed.courseId === courseId) {
                        setStartTime(parsed.time || 0);
                    }
                }
            } catch (e) {
                console.log("Load error:", e);
            }
        };

        loadTime();
    }, []);

    // ✅ Seek to saved time
    useEffect(() => {
        if (playerRef.current && startTime > 0) {
            playerRef.current.seekTo(startTime, true);
        }
    }, [startTime]);

    // ✅ Fallback UI
    if (!videos || videos.length === 0) {
        return (
            <View style={styles.loader}>
                <Text>No videos found</Text>
            </View>
        );
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // fallback

        return () => clearTimeout(timer);
    }, [currentIndex]);

    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                {videos[currentIndex].title}
            </Text>

             
            <YoutubePlayer
                ref={playerRef}
                height={300}
                play={playing}
                videoId={getYoutubeId(videos[currentIndex].videoUrl)}
                onChangeState={onStateChange}
                onProgress={(e: { currentTime: number }) => {
                    setCurrentTime(e.currentTime);
                }}
                initialPlayerParams={{
                    start: startTime,
                    autoplay: true,
                    controls: true,
                    modestbranding: true,
                    rel: false
                }}

            />

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#000"
    },

    title: {
        color: "#fff",
        fontSize: 18,
        margin: 10
    },

    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 300,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        pointerEvents: "none" // 🔥 IMPORTANT
    }
});