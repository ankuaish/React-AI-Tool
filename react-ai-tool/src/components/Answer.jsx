import React, { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStars } from "../helper";

import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";

const Answer = ({ ans, indexProp, totalResult, type }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeadingStars(ans));
    }
  }, []);
  const renderer = {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");

      if (!inline && match) {
        return (
          <SyntaxHighlighter
            {...props}
            language={match[1]}
            style={dark}
            PreTag="div"
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        );
      }

      return (
        <code {...props} className={className}>
          {children}
        </code>
      );
    },
  };
  return (
    <>
      {indexProp == 0 && totalResult > 1 ? (
        <span className="pt-2 text-xl block dark:text-white text-black">
          {answer}
        </span>
      ) : heading ? (
        <span className="pt-2 text-lg block dark:text-white text-black">
          {answer}
        </span>
      ) : (
        <span className={type === "q" ? "pl-1" : null}>
          <ReactMarkdown components={renderer}>{answer}</ReactMarkdown>
        </span>
      )}
    </>
  );
};

export default Answer;
