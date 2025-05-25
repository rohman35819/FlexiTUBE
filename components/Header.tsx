
export default function Header() {
  return (
    <header className="header">
      <input type="text" placeholder="Telusuri" className="search" />
      <div className="header-right">
        <button className="icon">➕</button>
        <div className="icon notification">
          🔔<span className="badge">9+</span>
        </div>
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          className="avatar"
        />
      </div>
    </header>
  );
}
