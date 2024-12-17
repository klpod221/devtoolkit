import React from "react";

import passwordStrengthAnalyser from "@utils/passwordStrengthAnalyser";

import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ObjectOutput from "@components/ObjectOutput";

const PasswordStrengthChecker = () => {
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [timeToCrack, setTimeToCrack] = React.useState("");
  const [output, setOutput] = React.useState({});

  React.useEffect(() => {
    if (password === "") {
      setOutput({
        passwordLength: 0,
        entropy: 0,
        charsetSetSize: 0,
        score: "0 / 100",
      });
      return;
    }

    const analysis = passwordStrengthAnalyser(password);

    setTimeToCrack(analysis.crackDuration);
    setOutput({
      passwordLength: analysis.passwordLength,
      entropy: Math.round(analysis.entropy * 100) / 100,
      charsetSetSize: analysis.charsetLength,
      score: Math.round(analysis.score * 100) + " / 100",
    });
  }, [password]);

  return (
    <MyCard className="w-full max-w-4xl">
      <MyInput
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={setPassword}
        label="Password"
        placeholder="Enter your password"
        className="w-full"
        autoComplete="new-password" // disable chrome autofill for password
        additional={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="focus:outline-none"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        }
      />

      <div className="rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 dark:border-dark-secondary dark:bg-dark w-full p-4">
        <div className="text-center">
          <p className="text-2xl font-bold">
            {timeToCrack === "" ? "N/A" : timeToCrack}
          </p>
          <p className="text-sm text-gray-500">
            Time to crack password with 2e10 guesses per second
          </p>
        </div>
      </div>

      <ObjectOutput data={output} />
    </MyCard>
  );
};

PasswordStrengthChecker.title = "Password Strength Checker";
export default PasswordStrengthChecker;
