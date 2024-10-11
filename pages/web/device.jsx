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

    window.addEventListener("resize", () => {
      setDevice((prev) => ({
        ...prev,
        screen: {
          ...prev.screen,
          windowSize: `${window.innerWidth} x ${window.innerHeight}`,
        },
      }));
    });
  }, []);

  return (
    <div className="flex items-start flex-wrap gap-2">
      {Object.keys(device).map((key) => {
        return (
          <MyCard key={key}>
            <MyCard.Header title={objectKeyToHumanReadable(key)} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
              {Object.keys(device[key]).map((subKey) => {
                return (
                  <div
                    key={subKey}
                    className="p-3 bg-gray-100 dark:bg-dark-secondary rounded-lg w-56 max-w-full"
                  >
                    <p className="text-sm text-gray-500 dark:text-dark-secondary">
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
                      <p className="text-lg font-semibold text-ellipsis text-nowrap overflow-hidden">
                        {device[key][subKey]}
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
