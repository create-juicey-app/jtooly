import { useState, useEffect } from "react";
import { MongoClient } from "mongodb";

export default function Home({ text }) {
  const [displayText, setDisplayText] = useState(text);
  const [inputText, setInputText] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleUpdateClick = async () => {
    const response = await fetch("/api/modify-text", {
      method: "POST",
      body: JSON.stringify({ text: inputText }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.message === "Text updated successfully") {
      setDisplayText(inputText);
    } else {
      console.log("Failed to update text");
    }
  };

  if (!isAuthenticated) {
    return (
      <div>
        <p>Please enter the password to access this page:</p>
        <input type="password" onChange={(e) => setIsAuthenticated(e.target.value === 'your_password_here')}/>
      </div>
    );
  }

  return (
    <div>
      <p>{displayText}</p>
      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={handleUpdateClick}>Update text</button>
    </div>
  );
}

export async function getServerSideProps() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const collection = client.db("test").collection("jrn");
  const result = await collection.findOne({});
  client.close();

  return { props: { text: result.text } };
}
