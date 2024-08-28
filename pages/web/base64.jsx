import React from "react";
import { Card, Button } from "flowbite-react";

const Base64EncoderDecoder = () => {
  return (
    <Card className="w-full">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Base64 Encoder/Decoder
        </div>
      </div>

      <div className="w-full h-full">
        <div className="font-semibold text-gray-800 dark:text-gray-200">
          Input
        </div>
        <textarea className="w-full h-24 border border-gray-200 dark:border-gray-700 p-2" />

        <div className="flex justify-center items-center space-x-4 my-2">
          <Button>Encode</Button>
          <Button className="bg-red-500">Decode</Button>
        </div>

        <div className="font-semibold text-gray-800 dark:text-gray-200">
          Output
        </div>
        <textarea className="w-full h-24 border border-gray-200 dark:border-gray-700 p-2" />
      </div>
    </Card>
  );
};

Base64EncoderDecoder.title = "Base64 Encoder/Decoder";
export default Base64EncoderDecoder;
