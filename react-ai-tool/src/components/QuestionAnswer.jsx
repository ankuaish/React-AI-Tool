import React from "react";
import Answer from "./Answer";
const QuestionAnswer = ({ index, item }) => {
  return (
    <>
      {" "}
      <div
        key={index + Math.random()}
        className={item.type === "q" ? "flex justify-end" : ""}
      >
        {item.type === "q" ? (
          <li
            className="text-right p-1 border-8 dark:bg-zinc-700 bg-red-100 dark:border-zinc-700 border-red-100 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl w-fit"
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
            <li className="text-left p-1" key={ansIndex + Math.random()}>
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
    </>
  );
};

export default QuestionAnswer;
