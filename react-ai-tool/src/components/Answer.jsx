import React, { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStars } from "../helper";

const Answer = ({ ans, indexProp, totalResult, type }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeadingStars(ans));
    }
  }, []);

  return (
    <>
      {indexProp == 0 && totalResult > 1 ? (
        <span className="pt-2 text-xl block text-white">{answer}</span>
      ) : heading ? (
        <span className="pt-2 text-lg block text-white">{answer}</span>
      ) : (
        <span className={type === "q" ? "pl-1" : null}>{answer}</span>
      )}
    </>
  );
};

export default Answer;
