import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux"; // or pass journals as props

const JournalRead = () => {
  const { id } = useParams(); // get ID from route
  const journals = useSelector((state) => state.journals.journals); // adjust based on your Redux structure

  const journal = journals?.find((j) => j.id === parseInt(id));

  if (!journal) {
    return <p className="text-white/60 text-center mt-10">Journal not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white shadow-lg">
      <h1 className="text-2xl font-bold mb-2">📝 {journal.title}</h1>
      <p className="text-sm text-white/50 mb-4">{journal.date}</p>

      <div className="whitespace-pre-line text-white/90 leading-relaxed">
        {journal.content}
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={() => window.history.back()}
          className="text-sm text-white/60 hover:text-white/90 hover:underline"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default JournalRead;
