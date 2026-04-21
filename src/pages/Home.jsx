import { Link } from "react-router-dom";
import "./Home.css";
import OutfitCalender from "./CalenderOOTD"; 

export default function Home() {
  return (
    <div className="home-wrapper">
      <div className="container py-5">

        {/* Main Hero */}
        <div className="row align-items-center mb-4">
          <div className="col-md-6">
            <h1 className="brand-name">ClosetCraft</h1>
            <p className="lead">
              Your serene digital wardrobe — plan, organize, and cherish your outfits.
              Keep your style fresh, easy, and inspiring.
            </p>
            <Link to="/wardrobe" className="btn btn-primary mt-3">
              Get Started
            </Link>
          </div>

          <div className="col-md-6 text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQrrI62J1wJQEOFMVIUoynQdSTI38srxfS6g&s"
              alt="Wardrobe"
              className="hero-img img-fluid"
            />
          </div>
        </div>

        {/* App Info Section */}
        <div className="row justify-content-center mt-5">
          <div className="col-md-10">
            <div className="info-text">
              <h3>Why ClosetCraft?</h3>
              <p>
                ClosetCraft is your ultimate companion for effortless fashion planning. Whether you're heading to a brunch,
                office, or a last-minute getaway — you can build outfits from your own wardrobe in seconds.
              </p>
              <p>
                Forget the morning confusion. Digitize your closet, visualize your looks, and express your style.
                Your wardrobe deserves a little more magic ✨
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="row text-center mt-5">
          <div className="col-md-4 mb-4">
            <div className="feature-card shadow-lg p-4 rounded-3">
              <h5>👗 Outfit Planner</h5>
              <p>Mix & match your clothes to create endless fresh looks.</p>
              <Link to="/outfit" className="btn btn-card">
                Plan Now
              </Link>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card shadow-lg p-4 rounded-3">
              <h5>🧺 Easy Wardrobe</h5>
              <p>Organize your clothes neatly by season & style.</p>
              <Link to="/wardrobe" className="btn btn-card">
                See Wardrobe
              </Link>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card shadow-lg p-4 rounded-3">
              <h5>💖 Saved Looks</h5>
              <p>Bookmark your favorite outfits for quick styling.</p>
              <Link to="/saved" className="btn btn-card">
                View Saved
              </Link>
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="mt-5">
          <h3 className="text-center mb-4">📅 Outfit Calendar</h3>
          <OutfitCalender /> {/* ✅ Added calendar here */}
        </div>

      </div>
    </div>
  );
}
