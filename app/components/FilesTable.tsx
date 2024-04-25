import React from "react";
import FileRow from "../atoms/FileRow";
export default function FilesTable({
  files,
  folders,
  initiateDelete,
}: {
  files: filemetaData[];
  folders: foldermetadata[];
  initiateDelete: ({
    id,
    filename,
    type,
  }: {
    id: string;
    filename: string;
    type: "file" | "folder";
  }) => void;
}) {
  if (files.length == 0 && folders.length == 0) {
    return (
      <div className="flex items-center justify-center h-[50vh] font-semibold">
        No file found
      </div>
    );
  } else {
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
                filekey={""}
                createdAt={folder.createdAt}
                updatedAt={folder.updatedAt}
                size={folder.totalSize}
                id={folder.id}
                initiateDelete={initiateDelete}
              />
            ))}
            {files.map((file) => (
              <FileRow
                name={file.originalname}
                id={file.id}
                key={file.key}
                filekey={file.key}
                type={file.mimetype}
                createdAt={file.createdAt}
                updatedAt={file.updatedAt}
                size={file.size}
                initiateDelete={initiateDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
