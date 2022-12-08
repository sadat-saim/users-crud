import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Assignment = () => {
  const [rest, setRest] = useState("");
  const { register, handleSubmit } = useForm();

  const handleUserInput = (data) => {
    console.log(data);
    const { sentence, letter } = data;
    let sentenceArr = sentence.toLowerCase().split("");

    if (sentenceArr.indexOf(letter.toLowerCase()) === -1) {
      toast("No match found!");
    }

    const newRest = sentence
      .split("")
      .slice(sentenceArr.indexOf(letter.toLowerCase()) + 1)
      .join("");
    console.log(newRest);
    setRest(newRest);
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(handleUserInput)}
        className="grid place-content-center mt-6"
      >
        <input
          type="text"
          placeholder="Enter a sentence..."
          className="input input-bordered w-full max-w-xs"
          {...register("sentence", { required: true })}
        />
        <input
          type="text"
          placeholder="Enter a letter..."
          className="input input-bordered w-full max-w-xs my-3"
          {...register("letter", { required: true })}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {rest && (
        <p className="text-center font-semibold mt-3 text-xl">Output: {rest}</p>
      )}
    </div>
  );
};

export default Assignment;
