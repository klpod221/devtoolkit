import React, { useState } from "react";
import { toast } from "react-toastify";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MySelect from "@components/MySelect";
import MyTabs from "@components/MyTabs";
import CodeOutput from "@components/CodeOutput";

/**
 * Generates an RSA key pair using the Web Crypto API and exports to PEM format.
 * @param {number} modulusLength - Key size in bits (1024, 2048, 4096).
 * @returns {Promise<{publicKey: string, privateKey: string}>}
 */
const generateRSAKeyPair = async (modulusLength) => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );

  const exportToPem = async (key, format, label) => {
    const exported = await window.crypto.subtle.exportKey(format, key);
    const b64 = btoa(String.fromCharCode(...new Uint8Array(exported)));
    const wrapped = b64.match(/.{1,64}/g).join("\n");
    return `-----BEGIN ${label}-----\n${wrapped}\n-----END ${label}-----`;
  };

  const [publicKey, privateKey] = await Promise.all([
    exportToPem(keyPair.publicKey, "spki", "PUBLIC KEY"),
    exportToPem(keyPair.privateKey, "pkcs8", "PRIVATE KEY"),
  ]);

  return { publicKey, privateKey };
};

const RSAKeyGenerator = () => {
  const [keySize, setKeySize] = useState("2048");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    setPublicKey("");
    setPrivateKey("");
    try {
      const { publicKey: pub, privateKey: priv } = await generateRSAKeyPair(parseInt(keySize));
      setPublicKey(pub);
      setPrivateKey(priv);
      toast.success("Key pair generated successfully!");
    } catch (err) {
      toast.error(`Failed to generate keys: ${err.message}`);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="RSA Key Generator" helper="Generate RSA key pairs using the Web Crypto API" />
        <div className="space-y-4 mt-4">
          <MySelect label="Key Size" value={keySize} onChange={(val) => setKeySize(val)}>
            <option value="1024">1024 bits (weak, fast)</option>
            <option value="2048">2048 bits (recommended)</option>
            <option value="4096">4096 bits (strong, slow)</option>
          </MySelect>
          <MyButton onClick={handleGenerate} className="w-full" loading={generating}>
            Generate Key Pair
          </MyButton>
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Public & Private key pair (PEM format)" />
        <div className="mt-4">
          <MyTabs>
            <MyTabs.Tab title="Public Key">
              <CodeOutput output={publicKey} language="text" />
            </MyTabs.Tab>
            <MyTabs.Tab title="Private Key">
              <CodeOutput output={privateKey} language="text" />
            </MyTabs.Tab>
          </MyTabs>
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

RSAKeyGenerator.title = "RSA Key Generator";
export default RSAKeyGenerator;
