import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:8080/api/assets";

function App() {
  const [assets, setAssets] = useState([]);
<<<<<<< HEAD
=======
  const [editId, setEditId] = useState(null);

>>>>>>> 6cec90b41cf5899f9f2734d2c70e82201f3b43a1
  const [asset, setAsset] = useState({
    assetName: "",
    assetType: "",
    assetCategory: "",
    serialNumber: "",
    modelNumber: "",
    purchaseDate: "",
    purchaseCost: "",
    vendorName: "",
    assetStatus: "Available",
    assignedTo: "",
    location: "",
    warrantyExpiryDate: ""
  });

<<<<<<< HEAD
  const [editId, setEditId] = useState(null);

  // READ – Fetch all assets
=======
>>>>>>> 6cec90b41cf5899f9f2734d2c70e82201f3b43a1
  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
<<<<<<< HEAD
    const response = await axios.get(API_URL);
    setAssets(response.data);
  };

  // Handle input change
=======
    const res = await axios.get(API_URL);
    setAssets(res.data);
  };

>>>>>>> 6cec90b41cf5899f9f2734d2c70e82201f3b43a1
  const handleChange = (e) => {
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

<<<<<<< HEAD
  // CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId === null) {
      await axios.post(API_URL, asset);
    } else {
      await axios.put(`${API_URL}/${editId}`, asset);
      setEditId(null);
=======
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`${API_URL}/${editId}`, asset);
      setEditId(null);
    } else {
      await axios.post(API_URL, asset);
>>>>>>> 6cec90b41cf5899f9f2734d2c70e82201f3b43a1
    }

    resetForm();
    fetchAssets();
  };

<<<<<<< HEAD
  // EDIT
=======
>>>>>>> 6cec90b41cf5899f9f2734d2c70e82201f3b43a1
  const handleEdit = (a) => {
    setAsset(a);
    setEditId(a.assetId);
  };

<<<<<<< HEAD
  // DELETE
=======
>>>>>>> 6cec90b41cf5899f9f2734d2c70e82201f3b43a1
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchAssets();
  };

  const resetForm = () => {
    setAsset({
      assetName: "",
      assetType: "",
      assetCategory: "",
      serialNumber: "",
      modelNumber: "",
      purchaseDate: "",
      purchaseCost: "",
      vendorName: "",
      assetStatus: "Available",
      assignedTo: "",
      location: "",
      warrantyExpiryDate: ""
    });
  };

  return (
    <div className="container">
<<<<<<< HEAD
      <h2>Asset Management System</h2>

      {/* CREATE / UPDATE FORM */}
      <form onSubmit={handleSubmit}>
=======
      <h1>Asset Management System</h1>

      <form className="asset-form" onSubmit={handleSubmit}>
>>>>>>> 6cec90b41cf5899f9f2734d2c70e82201f3b43a1
        <input name="assetName" placeholder="Asset Name" value={asset.assetName} onChange={handleChange} required />
        <input name="assetType" placeholder="Asset Type" value={asset.assetType} onChange={handleChange} />
        <input name="assetCategory" placeholder="Asset Category" value={asset.assetCategory} onChange={handleChange} />
        <input name="serialNumber" placeholder="Serial Number" value={asset.serialNumber} onChange={handleChange} />
        <input name="modelNumber" placeholder="Model Number" value={asset.modelNumber} onChange={handleChange} />
        <input type="date" name="purchaseDate" value={asset.purchaseDate} onChange={handleChange} />
        <input name="purchaseCost" placeholder="Purchase Cost" value={asset.purchaseCost} onChange={handleChange} />
        <input name="vendorName" placeholder="Vendor Name" value={asset.vendorName} onChange={handleChange} />

        <select name="assetStatus" value={asset.assetStatus} onChange={handleChange}>
          <option>Available</option>
          <option>Assigned</option>
          <option>Under Maintenance</option>
          <option>Retired</option>
        </select>

        <input name="assignedTo" placeholder="Assigned To" value={asset.assignedTo} onChange={handleChange} />
        <input name="location" placeholder="Location" value={asset.location} onChange={handleChange} />
        <input type="date" name="warrantyExpiryDate" value={asset.warrantyExpiryDate} onChange={handleChange} />

        <button type="submit">
          {editId ? "Update Asset" : "Add Asset"}
        </button>
      </form>

<<<<<<< HEAD
      {/* READ – ASSET TABLE */}
      <table border="1">
=======
      <table>
>>>>>>> 6cec90b41cf5899f9f2734d2c70e82201f3b43a1
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Category</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
<<<<<<< HEAD

=======
>>>>>>> 6cec90b41cf5899f9f2734d2c70e82201f3b43a1
        <tbody>
          {assets.map((a) => (
            <tr key={a.assetId}>
              <td>{a.assetId}</td>
              <td>{a.assetName}</td>
              <td>{a.assetType}</td>
              <td>{a.assetCategory}</td>
              <td>{a.assetStatus}</td>
              <td>{a.assignedTo}</td>
              <td>
<<<<<<< HEAD
                <button onClick={() => handleEdit(a)}>Edit</button>
                <button onClick={() => handleDelete(a.assetId)}>Delete</button>
=======
                <button className="edit" onClick={() => handleEdit(a)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(a.assetId)}>Delete</button>
>>>>>>> 6cec90b41cf5899f9f2734d2c70e82201f3b43a1
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
