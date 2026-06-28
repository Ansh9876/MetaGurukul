import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput
} from "react-native";
import { Colors } from "../../constants/theme";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { API } from "../../services/api";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Courses() {

  type Course = {
    _id: string;
    title: string;
    description: string;
    coverImage: string;
    link: string;
    isPaid: boolean;
    price: number;
  };

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  const handleSearch = (text: string) => {
    setSearch(text);

    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredCourses(filtered);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      const data = res.data.courses || res.data;

      setCourses(data);
      setFilteredCourses(data);

    } catch (error) {
      console.log("Course fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text>Loading courses...</Text>
      </View>
    );
  }

  return (

    <SafeAreaView style={styles.container} edges={['top']}>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#777" />

        <TextInput
          placeholder="Search courses..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
      </View>

      {/* LIST */}
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}

        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => router.push({
              pathname: "/courseDetails",
              params: { id: item._id }
            })}
          >

            {/* IMAGE */}
            <View style={styles.imageWrapper}>
              <Image
                source={{
                  uri: item.coverImage || "https://picsum.photos/400/200"
                }}
                style={styles.image}
              />

              <View style={styles.overlay} />

              {/* PLAY ICON */}
              <View style={styles.playIcon}>
                <Ionicons name="play" size={16} color="#fff" />
              </View>
            </View>

            {/* CONTENT */}
            <View style={styles.content}>

              <Text style={styles.courseTitle} numberOfLines={1}>
                {item.title}
              </Text>

              <Text style={styles.desc} numberOfLines={2}>
                {item.description}
              </Text>

              <View style={styles.footer}>
                <Text style={styles.viewText}>View Course</Text>
                <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
              </View>

            </View>

          </TouchableOpacity>

        )}

        ListEmptyComponent={
          <Text style={styles.empty}>
            No courses found
          </Text>
        }
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 12
  },

  /* SEARCH */
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6
  },

  searchInput: {
    flex: 1,
    padding: 12,
    marginLeft: 5
  },

  /* CARD */
  card: {
    backgroundColor: "#fff",
    marginBottom: 18,
    borderRadius: 18,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10
  },

  imageWrapper: {
    height: 160
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
    backgroundColor: "rgba(0,0,0,0.25)"
  },

  playIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#7d380a",
    padding: 8,
    borderRadius: 20
  },

  content: {
    padding: 12
  },

  courseTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.primary
  },

  desc: {
    color: "#666",
    marginTop: 4,
    fontSize: 13
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },

  viewText: {
    color: Colors.primary,
    fontWeight: "600"
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#777"
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }

});