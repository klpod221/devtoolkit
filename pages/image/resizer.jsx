import React from "react";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyFileInput from "@components/MyFileInput";
import MyImage from "@components/MyImage";

import { FaArrowRight } from "react-icons/fa";
import MyInput from "@components/MyInput";

const Resizer = () => {
  const [image, setImage] = React.useState(null);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter your image here">
          <MyButton size="sm" onClick={() => convertToJSON()}>
            Resize
            <FaArrowRight className="ml-2" />
          </MyButton>
        </MyCard.Header>

        <MyFileInput
          type="image"
          multiple={false}
          onChange={setImage}
          size="small"
        />

        <div className="flex flex-wrap mb-4 space-x-2">
          {image && (
            <div className="relative group overflow-hidden rounded-lg w-40 h-40">
              <MyImage
                src={URL.createObjectURL(image)}
                alt="image"
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>

        <div className="flex flex-wrap mb-4 space-x-2 w-full">
          <MyInput
            label="Width <small class='text-gray-500'>(px)</small>"
            placeholder="Width"
            type="number"
          />
          <MyInput
            label="Height <small class='text-gray-500'>(px)</small>"
            placeholder="Height"
            type="number"
          />
        </div>
      </TwoColumn.Left>
      <TwoColumn.Right></TwoColumn.Right>
    </TwoColumn>
  );
};

Resizer.title = "Resizer";
export default Resizer;
