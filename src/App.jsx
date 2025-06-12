import { useState, useEffect } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setCountries([]);
      return;
    }

    const delay = setTimeout(() => {
      fetchCountry(searchTerm);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  const fetchCountry = async (name) => {
    try {
      setError(null);
      const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      if (!response.ok) throw new Error("Stát nenalezen");

      const data = await response.json();
      setCountries(data);
    } catch (err) {
      setCountries([]);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Vyhledávání států</h1>
      <input
        type="text"
        placeholder="Např. France, Germany..."
        className="p-2 rounded text-black w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-6 space-y-4">
        {countries.map((country) => (
          <div
            key={country.cca3}
            className="bg-gray-800 p-4 rounded-lg shadow flex items-center gap-4"
          >
            <img src={country.flags.svg} alt={country.name.common} className="w-12 h-8" />
            <div>
              <p className="text-lg font-semibold">{country.name.common}</p>
              <p>Hlavní město: {country.capital?.[0] || "N/A"}</p>
              <p>Populace: {country.population.toLocaleString("cs-CZ")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;