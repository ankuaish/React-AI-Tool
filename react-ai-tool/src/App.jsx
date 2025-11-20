import { useState } from "react";
import "./App.css";
import { URL } from "./constant";
import Answer from "./components/Answer";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history"))
  );

  const payload = {
    contents: [
      {
        parts: [{ text: question }],
      },
    ],
  };

  const askQuestion = async () => {
    if (localStorage.getItem("history")) {
      let history = JSON.parse(localStorage.getItem("history"));
      history = [question, ...history];
      localStorage.setItem("history", JSON.stringify(history));
    } else {
      localStorage.setItem("history", JSON.stringify([question]));
      setRecentHistory([question]);
    }

    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());
    // console.log(dataString);
    setResult([
      ...result,
      { type: "q", text: question },
      { type: "a", text: dataString },
    ]);
  };
  return (
    <>
      <div className="grid grid-cols-5 h-screen text-center">
        <div className="col-span-1 bg-zinc-800">
          <ul>
            {recentHistory &&
              recentHistory.map((item) => {
                <li>{item}</li>;
              })}
          </ul>
        </div>
        <div className="col-span-4 p-10">
          <div className="container h-110 ">
            <div className="text-zinc-300">
              <ul>
                {result &&
                  result.map((item, index) => (
                    <div
                      key={index + Math.random()}
                      className={item.type === "q" ? "flex justify-end" : ""}
                    >
                      {item.type === "q" ? (
                        <li
                          className="text-right p-1 border-8 bg-zinc-700 border-zinc-700 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl w-fit"
                          key={index + Math.random()}
                        >
                          <Answer
                            ans={item.text}
                            indexProp={index}
                            totalResult={1}
                            type={item.type}
                          />
                        </li>
                      ) : (
                        item.text.map((ansItem, ansIndex) => (
                          <li
                            className="text-left p-1"
                            key={ansIndex + Math.random()}
                          >
                            <Answer
                              ans={ansItem}
                              indexProp={ansIndex}
                              totalResult={item.text.length}
                              type={item.type}
                            />
                          </li>
                        ))
                      )}
                    </div>
                  ))}
              </ul>
              {/* <ul>
                {result &&
                  result.map((item, index) => (
                    <li className="text-left p-1" key={index + Math.random()}>
                      <Answer
                        ans={item}
                        indexProp={index}
                        totalResult={result.length}
                      />
                    </li>
                  ))}
              </ul> */}
            </div>
          </div>
          <div className="bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl border border-zinc-700 flex h-16">
            <input
              type="text"
              className="w-full h-full p-3 outline-none"
              placeholder="Ask me anything"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button onClick={askQuestion}>Ask</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
