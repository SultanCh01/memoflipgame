import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "../App.css";
function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((result) => {
        if (result.outcome === "accepted") {
          console.log("App installed");
        }
        setDeferredPrompt(null);
        setShowInstallBtn(false);
      });
    }
  };
  return (
    <>
    <div className="home-container">
      <div className="home-box">
        <h1 className="home-title">Memo Flip </h1>
        <p className="home-subtitle">Choose your difficulty level</p>

        <div className="home-buttons">
          <Link to="/easy" className="home-btn easy">Easy Mode</Link>
          <Link to="/medium" className="home-btn medium">Medium Mode</Link>
          <Link to="/hard" className="home-btn hard">Hard Mode</Link>
          <Link to="/nightmare" className="home-btn night">Nightmare</Link>

          {showInstallBtn && (
            <button className="home-btn easy" onClick={handleInstall}>
            Install App
            </button>
          )}
        </div>
      </div>
    </div>
        <Footer/>
        </>
  );
}
export default Home;
