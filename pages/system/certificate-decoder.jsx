import React from "react";
import { toast } from "react-toastify";
import { X509Certificate } from "@peculiar/x509";

import TwoColumn from "@components/TwoColumn";
import ObjectOutput from "@components/ObjectOutput";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyCodeEditor from "@components/MyCodeEditor";

import { FaArrowRight } from "react-icons/fa";

const DigitalCertificateDecoder = () => {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState({});

  const parseOrganization = (organization) => {
    return {
      commonName: organization.getField("CN")[0] || "",
      organization: organization.getField("O")[0] || "",
      organizationUnit: organization.getField("OU")[0] || "",
      country: organization.getField("C")[0] || "",
      state: organization.getField("ST")[0] || "",
      city: organization.getField("L")[0] || "",
    };
  };

  const decodeCertificate = () => {
    try {
      const certificate = new X509Certificate(input);

      const parsedCertificate = {
        subject: parseOrganization(certificate.subjectName),
        issuer: parseOrganization(certificate.issuerName),
        general: {
          serialNumber: certificate.serialNumber,
          validFrom: certificate.notBefore.toString(),
          validTo: certificate.notAfter.toString(),
        },
      };

      setOutput(parsedCertificate);
      console.log(parsedCertificate);
    } catch (error) {
      toast.error(error.message || "An error occurred");
      console.error(error);
    }
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter the certificate to decode">
          <MyButton onClick={decodeCertificate}>
            Decode <FaArrowRight className="ml-2" />
          </MyButton>
        </MyCard.Header>

        <MyCodeEditor
          language="plaintext"
          value={input}
          onChange={setInput}
          options={{ minimap: { enabled: false } }}
        />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Decoded certificate" />

        <div className="flex flex-col overflow-y-auto">
          {output.general && (
            <>
              <div className="font-semibold ">General</div>
              <div className="pt-1 pb-4">
                <ObjectOutput object={output.general} />
              </div>
            </>
          )}

          {output.subject && (
            <>
              <div className="font-semibold ">Subject</div>
              <div className="pt-1 pb-4">
                <ObjectOutput object={output.subject} />
              </div>
            </>
          )}

          {output.issuer && (
            <>
              <div className="font-semibold ">Issuer</div>
              <div className="pt-1 pb-4">
                <ObjectOutput object={output.issuer} />
              </div>
            </>
          )}
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

DigitalCertificateDecoder.title = "Digital Certificate Decoder";
export default DigitalCertificateDecoder;
