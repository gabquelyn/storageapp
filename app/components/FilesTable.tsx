import React from "react";
import FileRow from "../atoms/FileRow";
export default function FilesTable({
  files,
  folders,
}: {
  files: filemetaData[];
  folders: foldermetadata[];
}) {
  return (
    <div className="my-[2rem]">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Created</th>
            <th>Size</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {folders.map((folder) => (
            <FileRow
              name={folder.foldername}
              key={folder.id}
              type="folder"
              createdAt={folder.createdAt}
              updatedAt={folder.updatedAt}
              size={folder.totalSize}
              id={folder.id}
            />
          ))}
          {files.map((file) => (
            <FileRow
              name={file.originalname}
              id={file.id}
              type={file.mimetype}
              createdAt={file.createdAt}
              updatedAt={file.updatedAt}
              size={file.size}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
