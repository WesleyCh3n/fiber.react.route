import React, { useState, FC } from "react";

type Props = {
  index: Number;
  file: File;
};

const UploadBar: FC = () => {
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
    <div className="flex justify-center align-content-center">
      <div className="mt-3 mb-3 w-96">
        <input className="form-control block w-full px-3 py-1.5 text-base font-normal
          text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
          rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
          focus:border-blue-600 focus:outline-none shadow-md"
          type="file" name="file" title=" " onChange={changeHandler} multiple/>
        <div className="block rounded-lg shadow-md max-w-sm mt-3 border border-solid border-gray-300">
          <div className="text-gray-700 py-1.5 px-3">
            {isSelected ?
              (selectedFile ? Array.from(selectedFile).map((file, i) => <PrintFileInfo file={file} index={i+1}/>) : <p></p>) :
              (<p className="text-center">Select a file to show details</p>)
            }
          </div>
        </div>
        <div className="flex justify-center">
          <button className="mt-3 px-6 py-2.5 bg-blue-600 text-white font-normal
          text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700
          hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none
          focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-300
          ease-in-out" onClick={handleSubmission}>Submit</button>
        </div>
      </div>
    </div>
  )
};

const PrintFileInfo: FC<Props> = ({file, index}) => {
  // const unixDate = new Date(file.lastModified)

  return(
    <div>
      <p>{index}: {file.name}</p>
      {/* <p>Filetype: {file.type}</p>
        * <p>Size in bytes: {file.size}</p>
        * <p>lastModified: {unixDate.toDateString()}</p> */}
    </div>
  )
}

export default UploadBar;
