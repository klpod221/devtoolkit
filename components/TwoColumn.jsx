import React from "react";
import MyCard from "@/components/MyCard";

import { BsArrowsExpandVertical } from "react-icons/bs";

const Left = ({ children }) => {
  return <>{children}</>;
};

const Right = ({ children }) => {
  return <>{children}</>;
};

const TwoColumn = (props) => {
  const [width, setWidth] = React.useState(props.leftWidth || 50);
  const [isMobile, setIsMobile] = React.useState(false);
  const dragCleanupRef = React.useRef(null);

  let LeftContent = null;
  let RightContent = null;

  React.Children.forEach(props.children, (child) => {
    if (!React.isValidElement(child)) return;

    if (child.type === Left) {
      LeftContent = child.props.children;
    } else if (child.type === Right) {
      RightContent = child.props.children;
    }
  });

  const handleResizeWidth = (e) => {
    e.preventDefault();
    const initialWidth = width;
    const initialX = e.clientX;

    const onMouseMove = (e) => {
      const dx = e.clientX - initialX;
      setWidth(
        Math.max(
          10,
          Math.min(90, initialWidth + (dx / window.innerWidth) * 100)
        )
      );
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dragCleanupRef.current = null;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    dragCleanupRef.current = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  };

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (dragCleanupRef.current) {
        dragCleanupRef.current();
      }
    };
  }, []);

  return (
    <div className="flex lg:flex-row flex-col h-full">
      <MyCard
        style={{ width: isMobile ? "100%" : `${width}%` }}
        className="mb-4 lg:mb-0 max-h-screen"
      >
        {!!LeftContent && LeftContent}
      </MyCard>

      <div
        id="resize-line"
        className="hidden items-center cursor-ew-resize w-0 relative z-10 group hover:bg-gray-300 dark:hover:bg-dark-secondary lg:flex border border-gray-200 dark:border-dark m-1"
        onMouseDown={handleResizeWidth}
        onDoubleClick={() => setWidth(50)}
      >
        <BsArrowsExpandVertical
          id="resize-icon"
          className="text-gray-600 hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 group-hover:block"
        />
      </div>

      <MyCard
        style={{ width: isMobile ? "100%" : `${100 - width}%` }}
        className="max-h-screen"
      >
        {!!RightContent && RightContent}
      </MyCard>
    </div>
  );
};

TwoColumn.Left = Left;
TwoColumn.Right = Right;
export default TwoColumn;
