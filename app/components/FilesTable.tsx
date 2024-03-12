import React from "react";
import FileRow from "../atoms/FileRow";
export default function FilesTable() {
  return (
    <div className="my-[2rem]">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Modified</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          <FileRow name="Images"  type="folder"/>
          <FileRow name="21 Savage Drake - Middle of the ocean.mp3"  type="audio"/>
          <FileRow name="How to win friends and influence people.pdf"  type="pdf"/>
        </tbody>
      </table>
    </div>
  );
}
