import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState("");
  const onChange = (event) => setMoney(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (money === "") {
      return;
    }
    setMoney("");
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The coins! {loading ? "" : `(${coins.length})`}</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={money}
          type="text"
          placeholder="Enter your money"
        />
        <button value="enter"></button>
      </form>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {coins.map((coin, index) => (
            <option key={coin.id}>
              {coin.name} ({coin.symbol}) : {money / coin.quotes.USD.price}
              {coin.symbol}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default App;
