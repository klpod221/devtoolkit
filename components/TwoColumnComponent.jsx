import React from "react";
import MyCard from "@/components/MyCard";

import { BsArrowsExpandVertical } from "react-icons/bs";

const LeftContent = (props) => {
  return <>{props.children}</>;
};

const RightContent = (props) => {
  return <>{props.children}</>;
};

const TwoColumnComponent = (props) => {
  const [width, setWidth] = React.useState(props.leftWidth || 50);

  let leftContent = null;
  let rightContent = null;

  React.Children.forEach(props.children, (child) => {
    if (!React.isValidElement(child)) return;

    if (child.type === LeftContent) {
      leftContent = child.props.children;
    } else if (child.type === RightContent) {
      rightContent = child.props.children;
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
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  React.useEffect(() => {
    if (window.innerWidth < 640) {
      setWidth(100);
    }

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setWidth(100);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex sm:flex-row flex-col h-full">
      <MyCard style={{ width: `${width}%` }} className="mb-4 sm:mb-0">
        {!!leftContent && leftContent}
      </MyCard>

      <div
        id="resize-line"
        className="hidden items-center cursor-ew-resize w-1 relative z-10 group hover:bg-gray-300 dark:hover:bg-gray-600 sm:flex"
        onMouseDown={handleResizeWidth}
        onDoubleClick={() => setWidth(50)}
      >
        <BsArrowsExpandVertical
          id="resize-icon"
          className="text-gray-600 dark:text-gray-400 hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 group-hover:block"
        />
      </div>

      <MyCard style={{ width: `${width === 100 ? 100 : 100 - width}%` }}>
        {!!rightContent && rightContent}
      </MyCard>
    </div>
  );
};

TwoColumnComponent.LeftContent = LeftContent;
TwoColumnComponent.RightContent = RightContent;
export default TwoColumnComponent;
