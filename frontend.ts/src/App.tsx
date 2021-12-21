import React, { useState, FC } from "react";

type Props = {
  file: File | undefined;
};

const App: FC = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return ;

		setSelectedFile(e.target.files[0]);
		setIsSelected(true);
	};

  const handleSubmission = () => {
    if (!selectedFile) return;

    const formData = new FormData();

    formData.append('file', selectedFile);

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
  };

  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} />
      {isSelected ?
        (<PrintFileInfo file={selectedFile} />) :
        (<p>Select a file to show details</p>)
      }
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  );
}

const PrintFileInfo: FC<Props> = ({file}) => {
  return(
    <div>
      <p>Filename: {file?.name}</p>
      <p>Filetype: {file?.type}</p>
      <p>Size in bytes: {file?.size}</p>
      <p>
        lastModified:{' '}
        {file?.lastModified}
      </p>
    </div>
  )
}

export default App;
