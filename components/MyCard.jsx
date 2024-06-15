import { Card } from "flowbite-react";

const MyCard = ({ children, ...props }) => {
  const theme = {
    root: { children: "flex h-full flex-col gap-4 p-6" },
  };

  return (
    <Card theme={theme} {...props}>
      {children}
    </Card>
  );
};

export default MyCard;
