import dynamic from 'next/dynamic';
import { Spinner } from "flowbite-react";

const CodeEditorCore = dynamic(() => import('./CodeEditorCore'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center w-full h-full min-h-96 border border-gray-200 dark:border-dark-secondary rounded">
      <Spinner className="w-6 h-6" />
    </div>
  ),
});

const MyCodeEditor = (props) => {
  return <CodeEditorCore {...props} />;
};

export default MyCodeEditor;
