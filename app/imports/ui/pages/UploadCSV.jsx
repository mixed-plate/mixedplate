import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const UploadCSV = () => {
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <>
      <div className="fixed-bg" />
      <Container fluid className="content-wrapper py-3">
        <Row className="text-center">
          <Col>
            <h1
              className="display-4 mb-3"
              style={{ fontWeight: 700 }}
            >
              Upload CSV File
            </h1>
            <div className="upload-section">
              <Form>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      color: '#4a4a4a',
                    }}
                  >
                    Choose a CSV file to upload
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    style={{
                      border: '1px solid #4a4a4a',
                      borderRadius: 0,
                      padding: '10px',
                    }}
                  />
                </Form.Group>
                {fileName && (
                  <p
                    style={{
                      fontSize: '1rem',
                      color: '#4a4a4a',
                      fontWeight: 'bold',
                    }}
                  >
                    Selected File: {fileName}
                  </p>
                )}
                <Button
                  className="upload-button"
                  style={{
                    backgroundColor: '#4a4a4a',
                    borderColor: '#4a4a4a',
                    color: 'white',
                    borderRadius: 0,
                    fontSize: '14px',
                    padding: '10px 20px',
                    marginTop: '10px',
                  }}
                >
                  Upload
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UploadCSV;
