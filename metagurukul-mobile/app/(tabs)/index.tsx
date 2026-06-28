
import { View, Text, StyleSheet, ScrollView, Image, RefreshControl, } from "react-native";
import { Colors } from "../../constants/theme";
import { useEffect, useState } from "react";
import { API } from "../../services/api";
import { TouchableOpacity, FlatList } from "react-native";
import { router } from "expo-router";
import { Dimensions, Animated } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";


export default function Home() {

  const [courses, setCourses] = useState<Course[]>([]);

  const [bundles, setBundles] = useState<Bundle[]>([]);

  const [lastCourse, setLastCourse] = useState<any>(null);

  const width = Dimensions.get("window").width;

  const [user, setUser] = useState<any>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  type Course = {

    _id: string;
    title: string;
    description: string;
    coverImage: string;
    link: string;
    isPaid: boolean;
    price: number;

  };

  type Bundle = {
    _id: string;
    title: string;
    description: string;
    coverImage: string;
    courses: string[];
  };

  useEffect(() => {

    loadUser();

  }, []);

  const loadUser = async () => {

    const userData = await SecureStore.getItemAsync("user");

    if (userData) {

      setUser(JSON.parse(userData));

    }

  };

  useEffect(() => {

    fetchCourses();

  }, []);

  const fetchCourses = async () => {

    try {

      const res = await API.get("/courses");

      setCourses((res.data.courses || res.data).slice(0, 5));

    } catch (e) {

      console.log(e);
    }

  };

  useEffect(() => {

    fetchBundles();

  }, []);

  const fetchBundles = async () => {

    try {

      const res = await API.get("/bundles");

      setBundles(res.data.bundles || res.data);

    }
    catch (e) {

      console.log(e);

    }

  };

  useFocusEffect(

    useCallback(() => {

      loadProgress();

    }, [])

  );

  const loadProgress = async () => {

    const data = await SecureStore.getItemAsync("lastCourse");

    if (data) {

      setLastCourse(JSON.parse(data));

    }

  };

  const onRefresh = async () => {

    setRefreshing(true);

    await Promise.all([
      fetchCourses(),
      fetchBundles(),
      loadProgress(),
      loadUser()
    ]);

    setRefreshing(false);

  };

  return (

    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#7d380a"]}
          tintColor="#7d380a"
        />
      }
    >

      <View style={styles.header}>

        <Text style={styles.logo}>
          Hello {user?.name || "Learner"} 👋
        </Text>

        <Text style={styles.tagline}>
          Continue your learning journey 🚀
        </Text>

        <Text style={styles.tagline}>
          Learn Faster 🚀
        </Text>

      </View>

      {lastCourse && (

        <View style={styles.continueCard}>

          <Text style={styles.sectionTitle}>
            Continue Learning
          </Text>

          <TouchableOpacity

            style={styles.resumeCard}

            onPress={() => router.push({

              pathname: "/courseDetails",

              params: { id: lastCourse.courseId }

            })}

          >
            <Image
              source={{ uri: lastCourse.coverImage }}
              style={styles.image}
            />

            <Text style={styles.resumeTitle}>
              {lastCourse.title}
            </Text>

            <Text style={styles.resumeModule}>
              ▶ Resume Module {lastCourse.index}
            </Text>

          </TouchableOpacity>

        </View>

      )}

      <Text style={styles.sectionTitle}>
        Latest Courses
      </Text>


      <Carousel

        loop

        width={260}

        height={240}

        autoPlay={true}

        autoPlayInterval={3000}

        data={courses}

        scrollAnimationDuration={900}

        onProgressChange={(_, absoluteProgress) => {

          const index = Math.round(absoluteProgress) % courses.length;

          setActiveIndex(index);

        }}

        mode="parallax"

        modeConfig={{

          parallaxScrollingScale: 0.92,

          parallaxScrollingOffset: 40,

          parallaxAdjacentItemScale: 0.8

        }}

        style={{
          width: width
        }}

        containerStyle={{
          paddingHorizontal: (width - 260) / 2
        }}

        renderItem={({ item }) => (

          <TouchableOpacity

            style={styles.courseCard}

            onPress={() => router.push({

              pathname: "/courseDetails",

              params: { id: item._id }

            })}

          >

            <Image
              source={{ uri: item.coverImage }}
              style={styles.image}
            />

            <Text style={styles.courseTitle}>
              {item.title}
            </Text>

          </TouchableOpacity>

        )}

      />
      <View style={styles.dotsContainer}>

        {courses.map((_, index) => (

          <View

            key={index}

            style={[

              styles.dot,

              activeIndex === index && styles.activeDot

            ]}

          />

        ))}

      </View>

      <Text style={styles.sectionTitle}>
        Bundles
      </Text>

      <FlatList

        horizontal
        showsHorizontalScrollIndicator={false}
        data={bundles}

        keyExtractor={(item) => item._id}

        decelerationRate="fast"
        snapToAlignment="start"
        contentContainerStyle={{
          paddingLeft: 20,
          paddingRight: 10
        }}

        renderItem={({ item }) => (

          <TouchableOpacity

            style={styles.bundleCard}
            activeOpacity={0.9}

            onPress={() => router.push({
              pathname: "/bundleDetails",
              params: { id: item._id }
            })}

          >

            <Image
              source={{ uri: item.coverImage }}
              style={styles.bundleImage}
            />

            <View style={styles.bundleOverlay} />

            <View style={styles.bundleContent}>

              <Text style={styles.bundleTitle}>
                {item.title}
              </Text>

              <View style={styles.bundleBadge}>

                <Text style={styles.bundleBadgeText}>
                  {item.courses.length} Courses
                </Text>

              </View>

            </View>

          </TouchableOpacity>

        )}
      />

    </ScrollView>



  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background
  },

  header: {
    padding: 20,
    paddingTop: 60
  },

  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary
  },

  tagline: {
    fontSize: 14,
    color: Colors.muted
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 15
  },

  courseCard: {
    width: 240,
    height: 240,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 12,
    marginHorizontal: 4,
    elevation: 6
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10
  },

  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10
  },

  bundleCard: {
    width: 170,
    height: 140,
    marginRight: 16,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 }
  },

  bundleImage: {
    width: "100%",
    height: "100%",
    position: "absolute"
  },

  bundleOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.25)"
  },

  bundleContent: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 12
  },

  bundleTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 6
  },

  bundleBadge: {
    backgroundColor: "#cd9b3f",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8
  },

  bundleBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600"
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4
  },

  activeDot: {
    backgroundColor: "#7d380a",
    width: 12,
    height: 8
  },

  continueCard: {
    marginTop: 10
  },

  resumeCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    elevation: 4,
  },

  resumeTitle: {
    fontWeight: "bold",
    fontSize: 16
  },

  resumeModule: {
    color: "#7d380a",
    marginTop: 5
  },


});