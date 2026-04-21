import { useEffect, useState } from "react";

export default function SavedOutfits() {
  const [savedOutfits, setSavedOutfits] = useState([]);

  useEffect(() => {
    const fetchSavedOutfits = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/outfit/save");
        const data = await res.json();
        setSavedOutfits(data);
      } catch (err) {
        console.error("❌ Error fetching saved outfits:", err);
      }
    };

    fetchSavedOutfits();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center">💾 Your Saved Outfits</h1>

      {savedOutfits.length === 0 ? (
        <p className="text-center mt-4">No saved outfits yet. Try saving one!</p>
      ) : (
        <div className="row">
          {savedOutfits.map((outfit, idx) => (
            <div key={idx} className="col-md-6 mb-4">
              <div className="card p-3 shadow-sm" style={{ borderRadius: "15px" }}>
                <h5>👗 Base Item: {outfit.baseItem?.name}</h5>
                <h6>🧩 Includes:</h6>
                <ul>
                  {outfit.items.map((item) => (
                    <li key={item._id}>{item.name} ({item.type}, {item.color})</li>
                  ))}
                </ul>
                <p>
                  💡 <strong>Styling Tip:</strong> {outfit.stylingTip}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
