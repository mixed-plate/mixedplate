import React, { useState } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import * as XLSX from 'xlsx';

const UploadCSV = () => {
  const [rows, setRows] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryString = evt.target.result;
      // Parse the XLSX/XLSM file
      const workbook = XLSX.read(binaryString, { type: 'binary' });
      // Get the first sheet name
      const firstSheetName = workbook.SheetNames[0];
      // Get the first worksheet
      const worksheet = workbook.Sheets[firstSheetName];
      // Convert worksheet to a 2D array
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });
      setRows(data);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <Container fluid className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control
              type="file"
              accept=".xlsm,.xlsx,.xls"
              onChange={handleFileUpload}
              style={{
                border: '1px solid #4a4a4a',
                borderRadius: 0,
                padding: '10px',
                marginBottom: '100px',
              }}
            />
          </Form.Group>

          {rows.length > 0 && (
            <Card
              style={{
                borderRadius: 0,
                borderColor: '#4a4a4a',
                borderWidth: '2px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <div style={{ overflowX: 'auto', padding: '0' }}>
                <table
                  border="1"
                  cellPadding="5"
                  style={{
                    borderCollapse: 'collapse',
                    margin: '0 auto',
                    width: '100%',
                    borderColor: '#ccc',
                  }}
                >
                  <tbody>
                    {rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            style={{
                              whiteSpace: 'nowrap',
                              border: '1px solid #ccc',
                              padding: '8px',
                              fontSize: '0.9rem',
                            }}
                          >
                            {cell !== undefined ? cell.toString() : ''}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UploadCSV;
