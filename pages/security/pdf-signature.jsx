import React, { useState } from "react";
import { X509Certificate } from "@peculiar/x509";
import { toast } from "react-toastify";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyFileInput from "@components/MyFileInput";
import ObjectOutput from "@components/ObjectOutput";
import { FaCheckCircle, FaExclamationCircle, FaFilePdf, FaCertificate } from "react-icons/fa";

const parsePdfSignatures = (buffer) => {
  const bytes = new Uint8Array(buffer);
  const textDecoder = new TextDecoder("latin1");
  const pdfString = textDecoder.decode(bytes);

  // Search for /Type /Sig or /ByteRange
  const sigMatches = [];
  const sigRegex = /\/Type\s*\/Sig\b/g;
  let match;

  while ((match = sigRegex.exec(pdfString)) !== null) {
    const startIdx = match.index;
    // Extract surrounding dictionary (up to 4000 characters)
    const dictSlice = pdfString.slice(startIdx, startIdx + 4000);

    // Extract ByteRange
    const byteRangeMatch = dictSlice.match(/\/ByteRange\s*\[\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s*\]/);
    const byteRange = byteRangeMatch ? [
      parseInt(byteRangeMatch[1], 10),
      parseInt(byteRangeMatch[2], 10),
      parseInt(byteRangeMatch[3], 10),
      parseInt(byteRangeMatch[4], 10),
    ] : null;

    // Extract SubFilter
    const subFilterMatch = dictSlice.match(/\/SubFilter\s*\/([a-zA-Z0-9._]+)/);
    const subFilter = subFilterMatch ? subFilterMatch[1] : "N/A";

    // Extract Name
    const nameMatch = dictSlice.match(/\/Name\s*\(([^)]+)\)/);
    const signerName = nameMatch ? nameMatch[1] : "Unknown";

    // Extract Reason
    const reasonMatch = dictSlice.match(/\/Reason\s*\(([^)]+)\)/);
    const reason = reasonMatch ? reasonMatch[1] : "Not specified";

    // Extract Location
    const locMatch = dictSlice.match(/\/Location\s*\(([^)]+)\)/);
    const location = locMatch ? locMatch[1] : "Not specified";

    // Extract Date: e.g. /M (D:20230101120000Z)
    const dateMatch = dictSlice.match(/\/M\s*\(D:([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/);
    let signingDate = "N/A";
    if (dateMatch) {
      signingDate = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]} ${dateMatch[4]}:${dateMatch[5]}:${dateMatch[6]} UTC`;
    }

    // Extract PKCS#7 /Contents <hex>
    const contentsMatch = dictSlice.match(/\/Contents\s*<([0-9a-fA-F\s]+)>/);
    let certInfo = null;

    if (contentsMatch) {
      const hex = contentsMatch[1].replace(/\s+/g, "");
      try {
        const rawBytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < hex.length; i += 2) {
          rawBytes[i / 2] = parseInt(hex.substr(i, 2), 16);
        }

        // Search for ASN.1 DER sequence of X.509 certificate (starts with 0x30 0x82)
        for (let j = 0; j < rawBytes.length - 200; j++) {
          if (rawBytes[j] === 0x30 && rawBytes[j + 1] === 0x82) {
            try {
              const certSlice = rawBytes.slice(j);
              const cert = new X509Certificate(certSlice);
              if (cert && cert.subject) {
                certInfo = {
                  subject: cert.subject,
                  issuer: cert.issuer,
                  serialNumber: cert.serialNumber,
                  validFrom: cert.notBefore.toISOString().split("T")[0],
                  validTo: cert.notAfter.toISOString().split("T")[0],
                };
                break;
              }
            } catch {
              // Try next offset
            }
          }
        }
      } catch {
        // Ignored
      }
    }

    sigMatches.push({
      signerName,
      reason,
      location,
      signingDate,
      subFilter,
      byteRange: byteRange ? `[${byteRange.join(", ")}]` : "N/A",
      certificate: certInfo,
    });
  }

  return sigMatches;
};

const PDFSignatureChecker = () => {
  const [file, setFile] = useState(null);
  const [signatures, setSignatures] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (uploadedFile) => {
    if (!uploadedFile) {
      setFile(null);
      setSignatures(null);
      return;
    }

    setFile(uploadedFile);
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const sigs = parsePdfSignatures(e.target.result);
        setSignatures(sigs);
        if (sigs.length > 0) {
          toast.success(`Found ${sigs.length} digital signature(s) in PDF.`);
        } else {
          toast.info("No digital signatures found in this PDF.");
        }
      } catch (err) {
        toast.error("Failed to parse PDF: " + err.message);
        setSignatures([]);
      } finally {
        setLoading(false);
      }
    };
    reader.onerror = () => {
      toast.error("Failed to read file.");
      setLoading(false);
    };
    reader.readAsArrayBuffer(uploadedFile);
  };

  return (
    <TwoColumn leftWidth={45}>
      <TwoColumn.Left>
        <MyCard.Header
          title="PDF Signature Checker"
          helper="Verify and inspect digital signatures, signers, and X.509 certificates in PDF files."
        />

        <div className="space-y-4 mt-4">
          <MyFileInput
            accept=".pdf,application/pdf"
            multiple={false}
            onChange={handleFileChange}
          />

          {file && (
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-dark-secondary flex items-center space-x-3">
              <FaFilePdf className="text-red-500 w-6 h-6 shrink-0" />
              <div className="truncate">
                <p className="font-semibold text-sm truncate text-gray-800 dark:text-gray-200">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
          )}
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header
          title="Verification Result"
          helper={signatures !== null ? `Signatures detected: ${signatures.length}` : "Upload a PDF document to begin"}
        />

        {loading && (
          <div className="p-8 text-center text-gray-400">
            Analyzing PDF structure and signatures...
          </div>
        )}

        {!loading && signatures !== null && (
          <div className="space-y-6 mt-4">
            {signatures.length === 0 ? (
              <div className="p-4 rounded-xl border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800 flex items-center space-x-3">
                <FaExclamationCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-yellow-800 dark:text-yellow-300">
                    No Digital Signatures Detected
                  </h4>
                  <p className="text-xs text-yellow-700 dark:text-yellow-400">
                    This document does not contain cryptographic PDF signatures or the signature dictionary is unsigned.
                  </p>
                </div>
              </div>
            ) : (
              signatures.map((sig, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="p-4 rounded-xl border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 flex items-center space-x-3">
                    <FaCheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0" />
                    <div>
                      <h4 className="font-bold text-green-800 dark:text-green-300">
                        Signature #{idx + 1}: Valid Signature Format Detected
                      </h4>
                      <p className="text-xs text-green-700 dark:text-green-400">
                        SubFilter: {sig.subFilter}
                      </p>
                    </div>
                  </div>

                  <ObjectOutput
                    data={{
                      "Signer Name": sig.signerName,
                      "Signing Date": sig.signingDate,
                      "Reason": sig.reason,
                      "Location": sig.location,
                      "SubFilter": sig.subFilter,
                      "ByteRange": sig.byteRange,
                    }}
                  />

                  {sig.certificate && (
                    <div className="mt-4">
                      <div className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                        <FaCertificate className="mr-1.5 text-blue-500" /> Embedded X.509 Certificate
                      </div>
                      <ObjectOutput
                        data={{
                          "Certificate Subject": sig.certificate.subject,
                          "Certificate Issuer": sig.certificate.issuer,
                          "Serial Number": sig.certificate.serialNumber,
                          "Valid From": sig.certificate.validFrom,
                          "Valid To": sig.certificate.validTo,
                        }}
                      />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {!loading && signatures === null && (
          <div className="p-8 text-center text-gray-400">
            Please choose a PDF file on the left to verify its digital signatures.
          </div>
        )}
      </TwoColumn.Right>
    </TwoColumn>
  );
};

PDFSignatureChecker.title = "PDF signature checker";
export default PDFSignatureChecker;
