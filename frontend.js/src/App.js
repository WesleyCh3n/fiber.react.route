import { useState } from "react";

const App = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

  const handleSubmission = () => {
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

  const sayHello = function () {
    fetch("/api")
      .then((res) => {
        console.log(res)
      })
      .then(data => {
        console.log(data)
      })
  };

  return (
    <div>
      Hello world: <button onClick={sayHello}>Fetch</button>
      <br/><br/>
      <input type="file" name="file" onChange={changeHandler} />
      {isSelected ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:{' '}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  );
}

export default App;
