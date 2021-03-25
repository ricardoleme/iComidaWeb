import { useRef, useState } from 'react';
import { BACKEND } from '../constants'

//https://github.com/JakeHartnell/react-images-upload

function Restaurantes() {
  const filesElement = useRef(null);
  const [imagem, setImagem] = useState({
    originalname: '',
    path: '',
    size: 0,
    mimetype: ''
  })

  const sendFile = async () => {
    const dataForm = new FormData();
    for (const file of filesElement.current.files) {
      dataForm.append('file', file);
    }
    const res = await fetch(`http://localhost:4000/upload`, {
      method: 'POST',
      body: dataForm,
    });
    const data = await res.json();
    const { originalname, path, size, mimetype } = data.files[0]
    setImagem({ originalname: originalname, path: path, mimetype: mimetype, size: size })
  };

  return (
    <div>
      <input type="file" ref={filesElement} />
      <button onClick={sendFile}>Send file</button>
      {imagem &&
        <img src={`${BACKEND}/${imagem.path}`} title={imagem.originalname} alt="oi" />
      }
    </div>
  );
}

export default Restaurantes;
