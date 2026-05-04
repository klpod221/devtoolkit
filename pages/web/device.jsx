import React from "react";
import { Tooltip } from "flowbite-react";

import objectKeyToHumanReadable from "@utils/objectKeyToHumanReadable";

import MyCard from "@components/MyCard";

const DeviceInformation = () => {
  const [device, setDevice] = React.useState({
    screen: {
      size: "",
      orientation: null,
      orientationAngle: null,
      colorDepth: null,
      pixelRatio: null,
      windowSize: "",
    },
    device: {
      vendor: null,
      language: null,
      os: "",
      browser: "",
    },
  });

  React.useEffect(() => {
    const screen = {
      size: `${window.screen.width} x ${window.screen.height}`,
      orientation: window.screen.orientation.type,
      orientationAngle: window.screen.orientation.angle,
      colorDepth: window.screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
      windowSize: `${window.innerWidth} x ${window.innerHeight}`,
    };

    const device = {
      vendor: window.navigator.vendor,
      language: window.navigator.language,
      platform: window.navigator.platform,
      userAgent: window.navigator.userAgent,
    };

    setDevice({ screen, device });

    const handleResize = () => {
      setDevice((prev) => ({
        ...prev,
        screen: {
          ...prev.screen,
          windowSize: `${window.innerWidth} x ${window.innerHeight}`,
        },
      }));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {Object.keys(device).map((key) => {
        return (
          <MyCard key={key} className="w-full max-w-4xl mx-auto">
            <MyCard.Header title={objectKeyToHumanReadable(key)} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {Object.keys(device[key]).map((subKey) => {
                return (
                  <div
                    key={subKey}
                    className="p-3 bg-gray-100 dark:bg-dark-secondary rounded-lg w-full flex flex-col justify-center min-w-0"
                  >
                    <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-1">
                      {objectKeyToHumanReadable(subKey)}
                    </p>
                    <Tooltip
                      content={device[key][subKey]}
                      position="bottom"
                      trigger="hover"
                      theme={{
                        target: "w-full",
                      }}
                    >
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate w-full">
                        {device[key][subKey] || "N/A"}
                      </p>
                    </Tooltip>
                  </div>
                );
              })}
            </div>
          </MyCard>
        );
      })}
    </div>
  );
};

DeviceInformation.title = "Device Information";
export default DeviceInformation;
