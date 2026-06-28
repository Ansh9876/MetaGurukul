import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { API } from "../services/api";

type Module = {
  _id: string;
  moduleNumber: number;
  title: string;
  videoLink: string;
};

type Course = {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  link: string;
  modules: Module[];
};

export default function CourseDetails() {

  const { id } = useLocalSearchParams();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const res = await API.get("/courses/" + id);
      setCourse(res.data.course || res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!course) {
    return (
      <View style={styles.loader}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const playlist = [
    {
      title: course.title,
      videoUrl: course.link
    },
    ...course.modules.map(module => ({
      title: module.title,
      videoUrl: module.videoLink
    }))
  ];

  return (

    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* COVER IMAGE WITH PLAY BUTTON */}
      <View style={styles.imageWrapper}>

        <Image
          source={{ uri: course.coverImage }}
          style={styles.image}
        />

        <View style={styles.imageOverlay} />

        <TouchableOpacity
          style={styles.playButton}
          onPress={() => router.push({
            pathname: "/videoPlayer",
            params: {
              playlist: JSON.stringify(playlist),
              index: "0",
              courseId: course._id,
              title: course.title,
              coverImage: course.coverImage
            }
          })}
        >
          <Text style={styles.playText}>▶</Text>
        </TouchableOpacity>

      </View>

      {/* TITLE */}
      <Text style={styles.title}>{course.title}</Text>

      {/* DESCRIPTION */}
      <Text style={styles.description}>{course.description}</Text>

      {/* MAIN LESSON */}
      <Text style={styles.moduleTitle}>Course Content</Text>

      <TouchableOpacity
        style={styles.mainVideoCard}
        onPress={() => router.push({
          pathname: "/videoPlayer",
          params: {
            playlist: JSON.stringify(playlist),
            index: "0",
            courseId: course._id,
            title: course.title,
            coverImage: course.coverImage
          }
        })}
      >
        <Text style={styles.moduleNumber}>▶ Main Lesson</Text>
        <Text style={styles.moduleName}>{course.title}</Text>
      </TouchableOpacity>

      {/* MODULES */}
      <Text style={styles.moduleTitle}>Modules</Text>

      {course.modules?.map((module, i) => (

        <TouchableOpacity
          key={module._id}
          style={styles.moduleCard}
          onPress={() => router.push({
            pathname: "/videoPlayer",
            params: {
              playlist: JSON.stringify(playlist),
              index: String(i + 1),
              courseId: course._id,
              title: course.title,
              coverImage: course.coverImage
            }
          })}
        >

          <View style={styles.moduleLeft}>
            <Text style={styles.moduleNumberText}>
              {module.moduleNumber}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.moduleName}>{module.title}</Text>
          </View>

          <Text style={styles.playSmall}>▶</Text>

        </TouchableOpacity>

      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  /* IMAGE SECTION */
  imageWrapper: {
    height: 220
  },

  image: {
    width: "100%",
    height: "100%",
    position: "absolute"
  },

  imageOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)"
  },

  playButton: {
    position: "absolute",
    alignSelf: "center",
    top: "40%",
    backgroundColor: "#7d380a",
    width: 65,
    height: 65,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8
  },

  playText: {
    color: "#fff",
    fontSize: 24
  },

  /* TEXT */
  title: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 15
  },

  description: {
    fontSize: 15,
    marginHorizontal: 15,
    color: "#555"
  },

  moduleTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 15,
    color: "#7d380a"
  },

  /* MAIN CARD */
  mainVideoCard: {
    backgroundColor: "#fff3e0",
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cd9b3f",
    elevation: 4
  },

  moduleNumber: {
    fontWeight: "bold",
    color: "#cd9b3f"
  },

  moduleName: {
    fontSize: 16,
    marginTop: 4
  },

  /* MODULE CARD */
  moduleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 15,
    borderRadius: 12,
    elevation: 3
  },

  moduleLeft: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: "#7d380a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },

  moduleNumberText: {
    color: "#fff",
    fontWeight: "bold"
  },

  playSmall: {
    fontSize: 18,
    color: "#7d380a"
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }

});