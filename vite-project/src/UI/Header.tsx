// // export default function Header({appTitle} : {appTitle : string})
// // {
// //     return(
// //         <>
// //                <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
// //                    <div className="container-fluid">
// //                          <a className="navbar-brand" href="#">{appTitle}</a>            
// //                     </div>
// //                </nav>

// //         </>
// //     )
// // }

//import React, { useState } from 'react';

// // interface Person {
// //   id: number;
// //   name: string;
// //   age: number;
// // }

// // const EditableTable: React.FC = () => {
// //   // Define the table data
// //   const [data, setData] = useState<Person[]>([
// //     { id: 1, name: 'John Doe', age: 30 },
// //     { id: 2, name: 'Jane Smith', age: 25 },
// //   ]);

// //   // To track the row being edited
// //   const [editingRow, setEditingRow] = useState<number | null>(null);
// //   const [editedData, setEditedData] = useState<Person | null>(null);

// //   // Handle edit button click
// //   const handleEdit = (rowId: number) => {
// //     setEditingRow(rowId);
// //     const currentRow = data.find((item) => item.id === rowId);
// //     if (currentRow) {
// //       setEditedData({ ...currentRow });
// //     }
// //   };

// //   // Handle saving the edited data
// //   const handleSave = () => {
// //     if (editedData && editingRow !== null) {
// //       const updatedData = data.map((item) =>
// //         item.id === editingRow ? { ...editedData } : item
// //       );
// //       setData(updatedData);
// //       setEditingRow(null);
// //       setEditedData(null);
// //     }
// //   };

// //   // Handle input changes
// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Person) => {
// //     if (editedData) {
// //       setEditedData({ ...editedData, [field]: e.target.value });
// //     }
// //   };

// //   return (
// //     <div>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Name</th>
// //             <th>Age</th>
// //             <th>Action</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {data.map((person) => (
// //             <tr key={person.id}>
// //               <td>
// //                 {editingRow === person.id ? (
// //                   <input
// //                     type="text"
// //                     value={editedData?.name || ''}
// //                     onChange={(e) => handleInputChange(e, 'name')}
// //                   />
// //                 ) : (
// //                   person.name
// //                 )}
// //               </td>
// //               <td>
// //                 {editingRow === person.id ? (
// //                   <input
// //                     type="number"
// //                     value={editedData?.age || ''}
// //                     onChange={(e) => handleInputChange(e, 'age')}
// //                   />
// //                 ) : (
// //                   person.age
// //                 )}
// //               </td>
// //               <td>
// //                 {editingRow === person.id ? (
// //                   <button onClick={handleSave}>Save</button>
// //                 ) : (
// //                   <button onClick={() => handleEdit(person.id)}>Edit</button>
// //                 )}
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default EditableTable;

import React, { useState } from "react";

type RowData = {
  id: number;
  name: string;
  age: number;
};

const EditableRows: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>([
    { id: 1, name: "Alice", age: 24 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 22 },
  ]);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [editingRow, setEditingRow] = useState<RowData | null>(null);

  // Function to handle click on row
  const handleRowClick = (id: number) => {
    if (selectedRowId === id) {
      // Toggle editing state off if the same row is clicked
      setSelectedRowId(null);
      setEditingRow(null);
    } else {
      setSelectedRowId(id);
      const row = rows.find((r) => r.id === id) || null;
      setEditingRow(row);
    }
  };

  // Function to handle changes to row data
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof RowData) => {
    if (editingRow) {
      setEditingRow({
        ...editingRow,
        [field]: e.target.value,
      });
    }
  };

  // Function to save changes
  const handleSave = () => {
    if (editingRow) {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === editingRow.id ? { ...row, ...editingRow } : row
        )
      );
      setEditingRow(null);
      setSelectedRowId(null);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} onClick={() => handleRowClick(row.id)}>
              <td>
                {selectedRowId === row.id && editingRow ? (
                <input
                  type="text"
                  value={editingRow.name}
                  onChange={(e) => handleInputChange(e, "name")}
                />
              ) :
               (
                row.name
              )}
              </td>

              
              <td>{selectedRowId === row.id && editingRow ? (
                <input
                  type="number"
                  value={editingRow.age}
                  onChange={(e) => handleInputChange(e, "age")}
                />
              ) : (
                row.age
              )}</td>
              <td>
                {selectedRowId === row.id && editingRow ? (
                  <button onClick={handleSave}>Save</button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableRows;
