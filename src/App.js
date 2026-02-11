import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:8080/api/assets";

function App() {
  const [assets, setAssets] = useState([]);
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

  const [editId, setEditId] = useState(null);

  // READ – Fetch all assets
  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    const response = await axios.get(API_URL);
    setAssets(response.data);
  };

  // Handle input change
  const handleChange = (e) => {
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  // CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId === null) {
      await axios.post(API_URL, asset);
    } else {
      await axios.put(`${API_URL}/${editId}`, asset);
      setEditId(null);
    }

    resetForm();
    fetchAssets();
  };

  // EDIT
  const handleEdit = (a) => {
    setAsset(a);
    setEditId(a.assetId);
  };

  // DELETE
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
      <h2>Asset Management System</h2>

      {/* CREATE / UPDATE FORM */}
      <form onSubmit={handleSubmit}>
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

      {/* READ – ASSET TABLE */}
      <table border="1">
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
                <button onClick={() => handleEdit(a)}>Edit</button>
                <button onClick={() => handleDelete(a.assetId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
