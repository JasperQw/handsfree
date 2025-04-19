import { Accelerometer } from "expo-sensors";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "expo-router";

const useShakingDetect = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [accelerationData, setAccelerationData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    let subscription = Accelerometer.addListener((accelerometerData) => {
      setAccelerationData(accelerometerData);
    });

    const unsubscribe = () => {
      subscription && subscription.remove();
    };

    return () => unsubscribe();
  }, []);

  const SHAKE_THRESHOLD = 2;

  useEffect(() => {
    const { x, y, z } = accelerationData;

    const accelerationMagnitude = Math.sqrt(x * x + y * y + z * z);
    if (accelerationMagnitude > SHAKE_THRESHOLD) {
      if (pathname !== "/sos") {
        router.push("/sos");
      }
    }
  }, [accelerationData]);
};

export default useShakingDetect;
