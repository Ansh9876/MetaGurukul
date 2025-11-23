import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/pages/admin/watchcourses.css"; // add styles as needed

const WatchCourse = () => {
  const { id } = useParams(); // course id
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [playlist, setPlaylist] = useState([]); // [{ title, link }]
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState([]); // indexes
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // progress from server
  const [serverProgressLoaded, setServerProgressLoaded] = useState(false);
  const playerRef = useRef(null); // DOM node for YT player
  const playerInstance = useRef(null); // YT.Player instance
  const saveIntervalRef = useRef(null);

  const token = localStorage.getItem("token");

  // 1) Fetch course and build playlist (main video first)
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        const data = res.data;
        const list = [
          { title: `${data.title} - Introduction`, link: data.link }, // main first
          ...(data.modules || []).map((m) => ({ title: m.title, link: m.videoLink })),
        ];
        setCourse(data);
        setPlaylist(list);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  // 2) Load saved progress from backend (moduleIndex + currentTime + completedModules)
  useEffect(() => {
    const fetchProgress = async () => {
      if (!token || !playlist.length) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/progress/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const p = res.data || {};
        if (p && Object.keys(p).length) {
          setCurrentIndex(p.moduleIndex ?? 0);
          setCompleted(p.completedModules ?? []);
          // We'll set current time after player loads (see loadPlayer)
          playerInstance.current && playerInstance.current.seekTo(p.currentTime || 0, true);
        }
      } catch (err) {
        console.error("Error fetching progress:", err);
      } finally {
        setServerProgressLoaded(true);
      }
    };
    fetchProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlist, token]);

  // 3) Ensure YT Iframe API script is loaded and create player
  useEffect(() => {
    if (!playlist.length) return;

    // load script once
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    // When API ready, create player
    const onYouTubeAPIReady = () => {
      createPlayer();
    };

    // If API already loaded
    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      // attach global callback (YT sets this)
      window.onYouTubeIframeAPIReady = onYouTubeAPIReady;
    }

    // cleanup: destroy player and intervals
    return () => {
      if (playerInstance.current) {
        playerInstance.current.destroy();
        playerInstance.current = null;
      }
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
        saveIntervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlist]);

  // Helper: extract YouTube video ID (works for many URL forms)
  const extractYouTubeId = (url) => {
    if (!url) return null;
    const re =
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
    const m = url.match(re);
    return m ? m[1] : null;
  };

  // Create or reload the YT player for currentIndex
  const createPlayer = () => {
    if (!playlist.length) return;

    const vid = extractYouTubeId(playlist[currentIndex].link);
    if (!vid) {
      console.warn("current playlist item not a youtube link:", playlist[currentIndex]);
      return;
    }

    // destroy previous instance
    if (playerInstance.current) {
      playerInstance.current.destroy();
      playerInstance.current = null;
    }

    // create new player
    playerInstance.current = new window.YT.Player(playerRef.current, {
      height: "100%",
      width: "100%",
      videoId: vid,
      playerVars: {
        autoplay: 1,
        controls: 1,
        rel: 0,
        modestbranding: 1,
      },
      events: {
        onReady: (e) => {
          // if server progress was loaded, seek to that time
          if (serverProgressLoaded) {
            restoreTimeFromServer();
          }
          // start saving periodically
          startAutoSave();
        },
        onStateChange: onPlayerStateChange,
      },
    });
  };

  // When currentIndex changes, recreate player for new video
  useEffect(() => {
    if (!playlist.length) return;
    // recreate player to load new video
    if (window.YT && window.YT.Player) {
      createPlayer();
    }
    // mark course completed if index past end
    if (currentIndex >= playlist.length) {
      setIsCourseCompleted(true);
    } else {
      setIsCourseCompleted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // On state change get ended, playing etc.
  const onPlayerStateChange = (event) => {
    // YT.PlayerState.ENDED === 0
    if (event.data === window.YT.PlayerState.ENDED) {
      // mark current as completed and move next
      setCompleted((prev) => {
        if (!prev.includes(currentIndex)) return [...prev, currentIndex];
        return prev;
      });

      if (currentIndex < playlist.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        // playlist finished
        setIsCourseCompleted(true);
        // final save
        saveProgressToServer({
          moduleIndex: playlist.length - 1,
          currentTime: 0,
          completedModules: [...new Set([...completed, currentIndex])],
        });
      }
    }
  };

  // Restore time after player is ready (seek)
  const restoreTimeFromServer = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/progress/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const p = res.data || {};
      const t = p.currentTime || 0;
      if (playerInstance.current && typeof playerInstance.current.seekTo === "function") {
        // seek after a small delay to ensure player ready
        setTimeout(() => {
          playerInstance.current.seekTo(t, true);
        }, 300);
      }
    } catch (err) {
      console.error("restoreTime error", err);
    }
  };

  // Start periodic save every 5s
  const startAutoSave = () => {
    if (!token) return;
    if (saveIntervalRef.current) clearInterval(saveIntervalRef.current);
    saveIntervalRef.current = setInterval(async () => {
      if (!playerInstance.current) return;
      const time = playerInstance.current.getCurrentTime();
      await saveProgressToServer({
        moduleIndex: currentIndex,
        currentTime: Math.floor(time),
        completedModules: completed,
      });
    }, 5000);
  };

  // Save progress to server
  const saveProgressToServer = async ({ moduleIndex, currentTime, completedModules }) => {
    if (!token) return;
    try {
      await axios.post(
        "http://localhost:5000/api/progress/save",
        {
          courseId: id,
          moduleIndex,
          currentTime,
          completedModules,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Error saving progress", err);
    }
  };

  // Manual Next/Prev controls (also used by onended)
  const handleNext = () => {
    if (!completed.includes(currentIndex)) setCompleted((p) => [...p, currentIndex]);
    if (currentIndex < playlist.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsCourseCompleted(true);
    }
  };
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  // Progress percent for UI
  const progressPercent = playlist.length
    ? Math.round((completed.length / playlist.length) * 100)
    : 0;

  if (loading) {
    return <div style={{ padding: 24 }}>Loading course...</div>;
  }

  return (
    <div className="course-player-layout">
      {/* Sidebar */}
      <aside className="course-sidebar">
        <button className="sidebar-back" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="course-details">
          <h2>{course?.title}</h2>
          <p>{course?.description}</p>
          <p style={{ marginTop: 12, fontWeight: 600 }}>Progress: {progressPercent}%</p>
          <div className="progress-bar-outer" style={{ width: "100%", height: 8, background: "#eee", borderRadius: 6 }}>
            <div style={{ width: `${progressPercent}%`, height: "100%", background: "#cead60", borderRadius: 6 }} />
          </div>
        </div>

        <ul className="lesson-list">
          {playlist.map((it, idx) => (
            <li
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                cursor: "pointer",
                padding: "10px 12px",
                background: idx === currentIndex ? "#cead60" : "transparent",
                color: idx === currentIndex ? "#000" : "#111",
                margin: "6px 0",
                borderRadius: 8,
              }}
            >
              <div style={{ fontSize: 13, opacity: 0.9 }}>
                {idx === 0 ? "Main Course Video" : `Module ${idx}`}
              </div>
              <div style={{ fontSize: 14 }}>{it.title}</div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main player */}
      <main className="course-main">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>{playlist[currentIndex]?.title}</h2>
          <div>
            <button onClick={handlePrev} disabled={currentIndex === 0} style={{ marginRight: 8 }}>
              ← Previous
            </button>
            <button onClick={handleNext}>Complete & Next →</button>
          </div>
        </div>

        <div className="video-box" style={{ marginTop: 16, height: "70vh" }}>
          {/* player mount point */}
          <div ref={playerRef} style={{ width: "100%", height: "100%" }} />
        </div>

        {isCourseCompleted && (
          <div style={{ marginTop: 20, padding: 16, background: "#e6ffe6", borderRadius: 8 }}>
            🎉 Course completed — congratulations! You can revisit modules anytime.
          </div>
        )}
      </main>
    </div>
  );
};

export default WatchCourse;
