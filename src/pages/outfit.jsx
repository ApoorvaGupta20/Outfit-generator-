import { useState, useEffect } from "react";

export default function Outfit() {
  const [wardrobe, setWardrobe] = useState([]);
  const [suggestions, setSuggestions] = useState(null);

  useEffect(() => {
    const fetchWardrobe = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/wardrobe");
        const data = await res.json();
        setWardrobe(data);
      } catch (err) {
        console.error("❌ Error fetching wardrobe:", err);
      }
    };
    fetchWardrobe();
  }, []);

  const getSuggestions = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/outfit/suggest/${id}`);
      const data = await res.json();
      console.log("✅ Outfit data:", data);
      setSuggestions(data);
    } catch (err) {
      console.error("❌ Error fetching suggestions:", err);
    }
  };

  // ✅ Improved Save Function
  const saveOutfit = async () => {
    if (!suggestions) return;

    try {
      const payload = {
        baseItem: suggestions.baseItem?._id || suggestions.baseItem,
        items: Object.values(suggestions.outfit || {})
          .flat()
          .map((i) => (typeof i === "object" ? i._id : i)), 
        stylingTip: suggestions.stylingTip || "",
      };

      console.log("📦 Payload being sent:", payload);

      // ✅ First check if this outfit already exists in backend
      const checkRes = await fetch("http://localhost:5000/api/outfit/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const checkData = await checkRes.json();

      if (checkRes.ok && checkData.exists) {
        alert("⚠️ This outfit is already saved!");
        return;
      }

      // ✅ Save new outfit if not duplicate
      const res = await fetch("http://localhost:5000/api/outfit/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("✅ Outfit saved successfully!");
      } else {
        const err = await res.json();
        alert("❌ Error saving outfit: " + err.error);
      }
    } catch (err) {
      console.error("❌ Error saving outfit:", err);
      alert("❌ Failed to save outfit.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Your Personal Wardrobe Assistant 👗</h1>

      <h3>Your Tops</h3>
      <div className="row">
        {wardrobe
          .filter((item) => item.type === "top")
          .map((item) => (
            <div key={item._id} className="col-md-4 mb-4">
              <div className="card h-100">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    className="card-img-top"
                    alt={item.name}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.color}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => getSuggestions(item._id)}
                  >
                    Get Outfit Ideas
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {suggestions && (
        <div className="mt-5">
          <h4>✨ Suggested Outfit:</h4>
          <div className="row">
            {["tops", "bottoms", "shoes", "accessories"].map(
              (category) =>
                suggestions.outfit[category]?.length > 0 && (
                  <div key={category} className="col-md-3 mb-4">
                    <h5>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h5>
                    {suggestions.outfit[category].map((item) => (
                      <div key={item._id || item} className="card mb-2">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            className="card-img-top"
                            alt={item.name}
                          />
                        )}
                        <div className="card-body p-2">
                          <h6 className="card-title mb-1">{item.name}</h6>
                          <small className="text-muted">{item.color}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                )
            )}
          </div>
          <div className="alert alert-info mt-3">
            💡 <strong>Styling Tip:</strong> {suggestions.stylingTip}
          </div>

          {/* ✅ Save Button  */}
          <button className="btn btn-success mt-3" onClick={saveOutfit}>
            💾 Save This Look
          </button>
        </div>
      )}
    </div>
  );
}
