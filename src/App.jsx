import { useEffect, useState } from "react";

const avatar = (seed) =>
  `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
    seed
  )}&radius=12`;

const initialFighters = [
  { id: 1, name: "Survivor", price: 12, strength: 6, agility: 4, img: avatar("Survivor") },
  { id: 2, name: "Scavenger", price: 10, strength: 5, agility: 5, img: avatar("Scavenger") },
  { id: 3, name: "Shadow", price: 18, strength: 7, agility: 8, img: avatar("Shadow") },
  { id: 4, name: "Tracker", price: 14, strength: 7, agility: 6, img: avatar("Tracker") },
  { id: 5, name: "Sharpshooter", price: 20, strength: 6, agility: 8, img: avatar("Sharpshooter") },
  { id: 6, name: "Medic", price: 15, strength: 5, agility: 7, img: avatar("Medic") },
  { id: 7, name: "Engineer", price: 16, strength: 6, agility: 5, img: avatar("Engineer") },
  { id: 8, name: "Brawler", price: 11, strength: 8, agility: 3, img: avatar("Brawler") },
  { id: 9, name: "Infiltrator", price: 17, strength: 5, agility: 9, img: avatar("Infiltrator") },
  { id: 10, name: "Leader", price: 22, strength: 7, agility: 6, img: avatar("Leader") },
];

const App = () => {
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [zombieFighters, setZombieFighters] = useState(initialFighters);

  // Mensaje en pantalla
  const [notice, setNotice] = useState("");

  // ocultat mensaje
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 2500);
    return () => clearTimeout(t);
  }, [notice]);

  // Totales 
  const totalStrength = team.reduce((sum, fighter) => sum + fighter.strength, 0);
  const totalAgility = team.reduce((sum, fighter) => sum + fighter.agility, 0);
  const totalCost = team.reduce((sum, fighter) => sum + fighter.price, 0);

  const handleAddFighter = (fighter) => {
    if (money < fighter.price) {
      const missing = fighter.price - money;
      setNotice(`Not enough money to add ${fighter.name}. You need $${missing} more.`);
      console.log("Not enough money");
      return;
    }

    setNotice(""); 
    setTeam((prevTeam) => [...prevTeam, fighter]);
    setZombieFighters((prevFighters) => prevFighters.filter((f) => f.id !== fighter.id));
    setMoney((prevMoney) => prevMoney - fighter.price);
  };

  const handleRemoveFighter = (fighter) => {
    setTeam((prevTeam) => prevTeam.filter((f) => f.id !== fighter.id));
    setZombieFighters((prevFighters) =>
      [...prevFighters, fighter].sort((a, b) => a.id - b.id)
    );
    setMoney((prevMoney) => prevMoney + fighter.price);
    setNotice(`Removed ${fighter.name}. Refunded $${fighter.price}.`);
  };

  return (
    <>
      <h1>Zombie Fighters</h1>

      <h2>Money: ${money}</h2>

      {/* Mensaje en pantalla */}
      {notice && (
        <p
          role="alert"
          aria-live="polite"
          style={{
            padding: "10px 12px",
            border: "1px solid #f59e0b",
            background: "#fffbeb",
            borderRadius: "10px",
            maxWidth: "700px",
          }}
        >
          {notice}
        </p>
      )}

      <h3>Available Fighters</h3>
      <ul>
        {zombieFighters.map((fighter) => (
          <li key={fighter.id}>
            <img src={fighter.img} alt={fighter.name} width="80" />
            <h4>{fighter.name}</h4>
            <p>Price: {fighter.price}</p>
            <p>Strength: {fighter.strength}</p>
            <p>Agility: {fighter.agility}</p>
            <button onClick={() => handleAddFighter(fighter)}>Add</button>
          </li>
        ))}
      </ul>

      <hr />

      <h3>Your Team</h3>
      <p>Total Cost: {totalCost}</p>
      <p>Total Strength: {totalStrength}</p>
      <p>Total Agility: {totalAgility}</p>

      {team.length === 0 ? (
        <p>Pick some team members!</p>
      ) : (
        <ul>
          {team.map((fighter) => (
            <li key={fighter.id}>
              <img src={fighter.img} alt={fighter.name} width="80" />
              <h4>{fighter.name}</h4>
              <p>Price: {fighter.price}</p>
              <p>Strength: {fighter.strength}</p>
              <p>Agility: {fighter.agility}</p>
              <button onClick={() => handleRemoveFighter(fighter)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default App;