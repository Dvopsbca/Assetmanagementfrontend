import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://assetmanagementbackend-1.onrender.com/api/assets";

const axios = {
  get: async (url) => {
    try {
      const res = await fetch(url);
      console.log("GET status:", res.status);
      if (!res.ok) throw new Error("GET failed");
      return { data: await res.json() };
    } catch (error) {
      console.error("GET Error:", error);
      throw error;
    }
  },

  post: async (url, payload) => {
    try {
      console.log("POST data:", payload);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log("POST status:", res.status);
      if (!res.ok) throw new Error("POST failed");
      return { data: await res.json() };
    } catch (error) {
      console.error("POST Error:", error);
      throw error;
    }
  },

  put: async (url, payload) => {
    try {
      console.log("PUT data:", payload);
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log("PUT status:", res.status);
      if (!res.ok) throw new Error("PUT failed");
      return { data: await res.json() };
    } catch (error) {
      console.error("PUT Error:", error);
      throw error;
    }
  },

  delete: async (url) => {
    try {
      const res = await fetch(url, { method: "DELETE" });
      console.log("DELETE status:", res.status);
      if (!res.ok) throw new Error("DELETE failed");
      return { data: await res.json() };
    } catch (error) {
      console.error("DELETE Error:", error);
      throw error;
    }
  },
};

function App() {
  const [assets, setAssets] = useState([]);
  const [editId, setEditId] = useState(null);

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

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const res = await axios.get(API_URL);
      setAssets(res.data);
    } catch (error) {
      alert("Failed to fetch data");
    }
  };

  const handleChange = (e) => {
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, asset);
        alert("Asset updated successfully");
        setEditId(null);
      } else {
        await axios.post(API_URL, asset);
        alert("Asset added successfully");
      }

      resetForm();
      fetchAssets();

    } catch (error) {
      alert("Failed to save data. Check backend or CORS.");
    }
  };

  const handleEdit = (a) => {
    setAsset(a);
    setEditId(a.assetId);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      alert("Deleted successfully");
      fetchAssets();
    } catch (error) {
      alert("Delete failed");
    }
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