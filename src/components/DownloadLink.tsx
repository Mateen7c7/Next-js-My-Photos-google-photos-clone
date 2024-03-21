import React from "react";

export const DownloadLink = ({
  url,
  fileName,
}: {
  url: string;
  fileName?: string;
}) => {
  const handleDownload = () => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName || "downloaded-file";
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  };

  return (
    <button
      className="bg-green-500 text-white px-2 py-1 rounded-md font-medium"
      onClick={handleDownload}
    >
      Download
    </button>
  );
};
