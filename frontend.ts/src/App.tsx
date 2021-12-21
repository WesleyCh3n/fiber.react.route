import React, { useState, FC } from "react";

type Props = {
  file: File;
};

const App: FC = () => {
  const [selectedFile, setSelectedFile] = useState<FileList>();
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return ;

    setSelectedFile(e.target.files);
    setIsSelected(true);
  };

  const handleSubmission = () => {
    if (!selectedFile) return;

    Array.from(selectedFile).forEach((file) => {
      const formData = new FormData();

      formData.append('file', file);

      fetch('/upload',
            {
              method: 'POST',
              body: formData,
            })
            .then((res) => res.json())
            .then((result) => {
              console.log('Success:', result);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
    });

  };

  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} multiple/>
      {isSelected ?
        (selectedFile ? Array.from(selectedFile).map(file => <PrintFileInfo file={file} />) : <p></p>) :
        (<p>Select a file to show details</p>)
      }
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  );
}

const PrintFileInfo: FC<Props> = ({file}) => {
  const unixDate = new Date(file.lastModified)

  return(
    <div>
      <p>Filename: {file.name}</p>
      <p>Filetype: {file.type}</p>
      <p>Size in bytes: {file.size}</p>
      <p>lastModified: {unixDate.toDateString()}</p>
    </div>
  )
}

export default App;
