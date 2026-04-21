import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Wardrobe.css"; // ✅ Custom styles for this page

export default function Wardrobe() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    color: "",
    imageUrl: "",
    type: "",
    season: "",
    style: ""
  });

  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [outfit, setOutfit] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch("http://localhost:5000/api/wardrobe");
    const data = await res.json();
    setWardrobeItems(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/wardrobe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      setFormData({
        name: "",
        category: "",
        color: "",
        imageUrl: "",
        type: "",
        season: "",
        style: ""
      });
      fetchItems();
    }
  };

  const handleSuggest = async (id) => {
    const res = await fetch(`http://localhost:5000/api/outfit/suggest/${id}`);
    const data = await res.json();
    setOutfit(data);
  };

  const handleRandomSuggest = async () => {
    const res = await fetch("http://localhost:5000/api/outfit/suggest");
    const data = await res.json();
    setOutfit(data);
  };

  const filteredItems = wardrobeItems.filter(
    (item) =>
      (filterType === "" || item.type === filterType) &&
      (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.color.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="container py-5">
      {/* ✅ Add Form */}
      <div className="card p-4 mb-5 shadow-sm wardrobe-form">
        <h3 className="mb-3">Add New Item</h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <input className="form-control" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="color" placeholder="Color" value={formData.color} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <select className="form-select" name="type" value={formData.type} onChange={handleChange} required>
                <option value="">Select Type</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="shoes">Shoes</option>
                <option value="accessory">Accessory</option>
              </select>
            </div>
            <div className="col-md-4">
              <input className="form-control" name="season" placeholder="Season" value={formData.season} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="style" placeholder="Style" value={formData.style} onChange={handleChange} />
            </div>
          </div>
          <button className="btn btn-primary mt-3">Add Item</button>
        </form>
      </div>

      {/* ✅ Filter & Search */}
      <div className="card p-3 mb-4 shadow-sm wardrobe-filters">
        <div className="row">
          <div className="col-md-4 mb-2">
            <select
              className="form-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="top">Tops</option>
              <option value="bottom">Bottoms</option>
              <option value="shoes">Shoes</option>
              <option value="accessory">Accessories</option>
            </select>
          </div>
          <div className="col-md-8">
            <input
              className="form-control"
              type="text"
              placeholder="Search by name, category or color..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ✅ Wardrobe Grid */}
      <h2 className="mb-4">👚 Your Wardrobe</h2>
      {filteredItems.length === 0 ? (
        <p>No items match your search or filter.</p>
      ) : (
        <div className="row g-4">
          {filteredItems.map(item => (
            <div className="col-md-4 col-sm-6" key={item._id}>
              <div className="card h-100 shadow-sm wardrobe-card fade-in">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: "250px" }}>
                    <span className="text-muted">No Image</span>
                  </div>
                )}
                <div className="card-body">
                  <h5>{item.name}</h5>
                  <p className="text-muted small">
                    {item.type} | {item.color} <br />
                    {item.season && <span className="badge bg-info me-1">{item.season}</span>}
                    {item.style && <span className="badge bg-secondary">{item.style}</span>}
                  </p>
                  <button className="btn btn-outline-primary btn-sm" onClick={() => handleSuggest(item._id)}>
                    Get Outfit Ideas
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Generated Outfit */}
      {outfit && (
        <div className="card p-4 mt-5 shadow-sm wardrobe-outfit">
          <h4>✨ Outfit Suggestion for: {outfit.item?.name}</h4>

          <div className="row g-4">
            {["tops", "bottoms", "shoes", "accessories"].map((type) =>
              outfit.outfit[type]?.length > 0 && (
                outfit.outfit[type].map((part) => (
                  <div className="col-md-4" key={part._id}>
                    <div className="card h-100 shadow-sm">
                      {part.imageUrl ? (
                        <img
                          src={part.imageUrl}
                          alt={part.name}
                          className="card-img-top"
                          style={{ height: "220px", objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          className="d-flex align-items-center justify-content-center bg-light"
                          style={{ height: "220px" }}
                        >
                          <span className="text-muted">No Image</span>
                        </div>
                      )}
                      <div className="card-body">
                        <h6 className="mb-1">{part.name}</h6>
                        <p className="text-muted small mb-1">{part.type} | {part.color}</p>
                        {part.season && (
                          <span className="badge bg-info me-1">{part.season}</span>
                        )}
                        {part.style && (
                          <span className="badge bg-secondary">{part.style}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )
            )}
          </div>

          <div className="alert alert-info mt-4">
            💡 <strong>Styling Tip:</strong> {outfit.stylingTip}
          </div>
        </div>
      )}
    </div>
  );
}
