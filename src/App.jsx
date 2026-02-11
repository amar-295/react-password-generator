import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(true);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*()_+=[]{}~`?><";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, number, character, setPassword]); // setPassword is used for optimization (memoization concept) = Keeping the same reference if inputs don’t change
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, password.length);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect( () => {
    passwordGenerator()
  }, [length, number, character, passwordGenerator])

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-full max-w-md rounded-xl bg-slate-800 shadow-lg p-5">

          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Password Generator
          </h1>

          {/* Password display */}
          <div className="flex rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              readOnly
              className="w-full px-4 py-2 text-lg text-orange-500 bg-white outline-none"
              placeholder="password"
              ref={passwordRef}
            />
            <button 
            onClick={copyPasswordToClipboard}
            className="bg-blue-600 text-white px-4 hover:bg-blue-700 transition">
              copy
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 text-orange-400 text-sm">
            {/* Range slider */}
            <input
              type="range"
              min={8}
              max={32}
              value={length}
              className="cursor-pointer accent-blue-600"
              onChange={(e) => { setLength(e.target.value) }}
            />

            <span>Length ({length})</span>

            {/* Numbers */}
            <label htmlFor="numberInput" className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={number}
                id="numberInput"
                className="accent-blue-600"
                onChange={() => {
                  setNumber( (prev) => !prev)
                }}
              />
              Numbers
            </label>

            {/* Characters */}
            <label htmlFor="characterInput" className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={character}
                id="characterInput"
                onChange={() => {
                  setCharacter( (prev) => !prev)
                }}
                className="accent-blue-600"
              />
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
