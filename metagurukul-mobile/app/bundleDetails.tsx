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
import { Ionicons } from "@expo/vector-icons";

type Course = {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
};

type Bundle = {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  courses: Course[];
};

export default function BundleDetails() {

  const { id } = useLocalSearchParams();
  const [bundle, setBundle] = useState<Bundle | null>(null);

  useEffect(() => {
    fetchBundle();
  }, []);

  const fetchBundle = async () => {
    try {
      const res = await API.get("/bundles/" + id);
      setBundle(res.data.bundle || res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!bundle) {
    return (
      <View style={styles.loader}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (

    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* COVER IMAGE (NO PLAY BUTTON) */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: bundle.coverImage }}
          style={styles.image}
        />
        <View style={styles.overlay} />
      </View>

      {/* TITLE */}
      <Text style={styles.title}>{bundle.title}</Text>

      {/* DESCRIPTION */}
      <Text style={styles.description}>{bundle.description}</Text>

      {/* COURSES */}
      <Text style={styles.courseTitle}>Courses in this bundle</Text>

      {bundle.courses?.map((course) => (

        <TouchableOpacity
          key={course._id}
          style={styles.courseCard}
          activeOpacity={0.9}
          onPress={() => router.push({
            pathname: "/courseDetails",
            params: { id: course._id }
          })}
        >

          {/* IMAGE */}
          <Image
            source={{ uri: course.coverImage }}
            style={styles.courseImage}
          />

          {/* CONTENT */}
          <View style={styles.courseContent}>

            <Text
              style={styles.courseName}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {course.title}
            </Text>

            <Text style={styles.viewCourse}>
              Watch Course
            </Text>

          </View>

          {/* ARROW */}
          <Ionicons
            name="chevron-forward"
            size={18}
            color="#7d380a"
          />

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

  /* IMAGE */
  imageWrapper: {
    height: 220
  },

  image: {
    width: "100%",
    height: "100%",
    position: "absolute"
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.2)"
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

  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 15,
    color: "#7d380a"
  },

  /* CARD */
  courseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginBottom: 12,
    padding: 12,
    borderRadius: 14,

    // 👇 better shadow
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 }
  },

  courseImage: {
    width: 65,
    height: 65,
    borderRadius: 10,
    marginRight: 12
  },

  courseContent: {
    flex: 1,
    paddingRight: 6   // 👈 prevents text touching arrow
  },

  courseName: {
    fontWeight: "600",
    fontSize: 15,
    flexShrink: 1   // 👈 important fix
  },

  viewCourse: {
    color: "#cd9b3f",
    marginTop: 4,
    fontSize: 13
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }

});