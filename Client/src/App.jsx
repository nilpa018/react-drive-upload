import { useState, useRef } from "react";

import "./App.css";

function App() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [serverData, setServerData] = useState({});
  const formRef = useRef(null);
  const originURL = window.location.origin;

  const onSubmit = async (evt) => {
    evt.preventDefault();

    if (!formRef) {
      return;
    }

    const response = await fetch(formRef.current.action, {
      method: formRef.current.method,
      body: new FormData(formRef.current),
    });
    const json = await response.json();

    setServerData(json);
    setIsUploaded(true);
  };

  if (isUploaded) {
    return (
      <div className="App">
        <h1>La photo suivant à bien été uploadé sur le drive</h1>
        <img src={import.meta.env.VITE_BACKEND_URL + "/" + serverData.asset} />
        <a href={originURL}>Uploader une autre image</a>
      </div>
    );
  }

  return (
    <>
      <div className="App">
        <h1>Uploader une image vers Google Drive</h1>
        <form
          ref={formRef}
          action={`${import.meta.env.VITE_BACKEND_URL}/upload`}
          method="POST"
          onSubmit={onSubmit}
        >
          <div className="form-group">
            <label for="file-upload">
              Selectionnez un fichier image (.png/.jpg)
            </label>
            <input
              id="file-upload"
              type="file"
              name="asset"
              accept="image/png, image/jpeg"
            />
          </div>
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </>
  );
}

export default App;
