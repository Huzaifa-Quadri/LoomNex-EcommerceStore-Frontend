import { useEffect } from "react";
import axios from "axios";

/**
 * Ping Render health API every 14 mins to keep the app active
 */
export function useKeepAlive() {
  useEffect(() => {
    const KEEPALIVE_INTERVAL = 14 * 60 * 1000; // 14 minutes
    const HEALTH_URL = "https://loomnex-ecommercestore-backend.onrender.com/actuator/health";

    const pingServer = async () => {
      try {
        await axios.get(HEALTH_URL);
        console.log("Keep-Alive: Pinged server to prevent sleep.");
      } catch (err) {
        console.warn("Keep-Alive ping failed", err.message);
      }
    };

    pingServer();
    const intervalId = setInterval(pingServer, KEEPALIVE_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);
}
