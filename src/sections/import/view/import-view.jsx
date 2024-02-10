
import axios from 'axios';
import Dropzone from 'react-dropzone'
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';

// ----------------------------------------------------------------------

export default function ImportView() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const uploadFiles = (files) => {
    files.forEach((file) => {
      if (file.name.endsWith('.zip') || file.name.endsWith('.csv')) {
        const formData = new FormData();
        formData.append("file", file);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        };
        axios.post("/api/upload/csv ", formData, config).then(resp => {
          navigate("/cashflow")
        }
        ).catch(() => navigate("/login"));
      }
    });
  };


  return (

    <Container>
      <Dropzone onDrop={uploadFiles}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag & drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    </Container>
  );
}
