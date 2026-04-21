// /src/pages/CalenderOOTD.jsx
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalenderOOTD.css";

export default function CalendarOOTD() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [wardrobe, setWardrobe] = useState([]);
  const [pickedBase, setPickedBase] = useState("");
  const [pickedItems, setPickedItems] = useState([]);
  const [stylingTip, setStylingTip] = useState("");
  const [entries, setEntries] = useState({}); // map dateString -> entry
  const [todayOOTD, setTodayOOTD] = useState(null);

  const formatDate = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};


  useEffect(() => {
    fetchWardrobe();
    fetchEntries();
  }, []);

  useEffect(() => {
    const today = formatDate(new Date());
    setTodayOOTD(entries[today] || null);
  }, [entries]);

  async function fetchWardrobe() {
    try {
      const res = await fetch("http://localhost:5000/api/wardrobe");
      const data = await res.json();
      setWardrobe(data);
    } catch (err) {
      console.error("Failed to fetch wardrobe", err);
    }
  }

  async function fetchEntries() {
    try {
      const res = await fetch("http://localhost:5000/api/calendar");
      const all = await res.json();
      const map = {};
      all.forEach((e) => {
        map[e.date] = e; // backend now normalizes -> "YYYY-MM-DD"
      });
      setEntries(map);
    } catch (err) {
      console.error("Failed to fetch calendar entries", err);
    }
  }

  async function handleSaveForDate(date) {
    if (!pickedBase)
      return alert("Choose a base item first (the item the outfit centers around).");

    const payload = {
      date: formatDate(date),
      baseItem: pickedBase,
      items: pickedItems,
      stylingTip,
    };

    try {
      const res = await fetch("http://localhost:5000/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      const saved = await res.json();
      setEntries((prev) => ({ ...prev, [saved.date]: saved }));
      alert("Saved outfit for " + saved.date);
    } catch (err) {
      console.error(err);
      alert("Error saving outfit. See console.");
    }
  }

  const onClickDay = (date) => {
    setSelectedDate(date);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const key = formatDate(date);
      const entry = entries[key];
      if (entry?.baseItem?.imageUrl) {
        return (
          <div style={{ textAlign: "center", marginTop: 6 }}>
            <img
              src={entry.baseItem.imageUrl}
              alt={entry.baseItem?.name || ""}
              style={{
                width: 28,
                height: 28,
                objectFit: "cover",
                borderRadius: 6,
              }}
            />
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="container py-5">
      <h2 className="mb-3">📅 Outfit Calendar</h2>

      <div className="row">
        {/* Calendar */}
        <div className="col-md-6 mb-4">
          <div className="card p-3">
            <h5>Select a date</h5>
            <Calendar
              onClickDay={onClickDay}
              value={selectedDate}
              tileContent={tileContent}
            />
            <div className="mt-3">
              <strong>Selected:</strong> {formatDate(selectedDate)}
            </div>
          </div>
        </div>

        {/* Outfit Picker */}
        <div className="col-md-6 mb-4">
          <div className="card p-3">
            <h5>Pick outfit for {formatDate(selectedDate)}</h5>

            {/* Base Item */}
            <label className="form-label mt-2">Base item (required)</label>
            <select
              className="form-select"
              value={pickedBase}
              onChange={(e) => setPickedBase(e.target.value)}
            >
              <option value="">-- choose base item --</option>
              {wardrobe.map((w) => (
                <option key={w._id} value={w._id}>
                  {w.name} ({w.type}, {w.color})
                </option>
              ))}
            </select>

            {/* Other Items */}
            <label className="form-label mt-2">Add other items</label>
            <div
              style={{
                maxHeight: 180,
                overflowY: "auto",
                border: "1px solid #eee",
                padding: 8,
                borderRadius: 6,
              }}
            >
              {wardrobe
                .filter((w) => w._id !== pickedBase)
                .map((w) => {
                  const checked = pickedItems.includes(w._id);
                  return (
                    <div
                      key={w._id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 6,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          setPickedItems((prev) =>
                            checked
                              ? prev.filter((id) => id !== w._id)
                              : [...prev, w._id]
                          );
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        {w.imageUrl && (
                          <img
                            src={w.imageUrl}
                            alt={w.name}
                            style={{
                              width: 48,
                              height: 48,
                              objectFit: "cover",
                              borderRadius: 6,
                            }}
                          />
                        )}
                        <div>
                          <div style={{ fontWeight: 600 }}>{w.name}</div>
                          <div style={{ fontSize: 12, color: "#666" }}>
                            {w.type} • {w.color}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Styling Tip */}
            <label className="form-label mt-2">Styling tip (optional)</label>
            <input
              className="form-control"
              value={stylingTip}
              onChange={(e) => setStylingTip(e.target.value)}
              placeholder="Short tip to save"
            />

            {/* Buttons */}
            <div className="mt-3 d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => handleSaveForDate(selectedDate)}
              >
                Save to calendar
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => {
                  if (!wardrobe.length) return alert("No wardrobe items yet");
                  const randomBase =
                    wardrobe[Math.floor(Math.random() * wardrobe.length)];
                  let pool = wardrobe.filter((w) => w._id !== randomBase._id);
                  const randomItems = [];
                  for (let i = 0; i < 2 && pool.length; i++) {
                    const idx = Math.floor(Math.random() * pool.length);
                    randomItems.push(pool[idx]._id);
                    pool.splice(idx, 1);
                  }
                  setPickedBase(randomBase._id);
                  setPickedItems(randomItems);
                  setStylingTip("Quickly generated look");
                }}
              >
                Auto-generate
              </button>
            </div>
          </div>

          {/* Outfit of the Day */}
          <div className="card p-3 mt-3">
            <h5>Outfit of the Day</h5>
            {todayOOTD ? (
              <div style={{ display: "flex", gap: 12 }}>
                {todayOOTD?.baseItem?.imageUrl && (
                  <img
                    src={todayOOTD.baseItem.imageUrl}
                    alt={todayOOTD.baseItem?.name || ""}
                    style={{
                      width: 88,
                      height: 88,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                )}
                <div>
                  <div style={{ fontWeight: 700 }}>
                    {todayOOTD?.baseItem?.name}
                  </div>
                  <div style={{ color: "#666" }}>
                    {todayOOTD?.stylingTip || ""}
                  </div>
                  <div style={{ marginTop: 8 }}>
                    {todayOOTD?.items?.slice(0, 4).map((it) => (
                      <span
                        key={it?._id}
                        style={{ marginRight: 8, fontSize: 13 }}
                      >
                        {it?.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                No OOTD saved for today. You can auto-generate one from the
                calendar panel.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
