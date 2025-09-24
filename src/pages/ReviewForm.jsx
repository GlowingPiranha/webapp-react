import { useState } from "react";
import axios from "axios";

export default function ReviewForm({ movieId, onNewReview }) {
  const [name, setName] = useState("");
  const [vote, setVote] = useState(5);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log({ movieId, name, vote, text });

    try {
      const res = await axios.post("http://localhost:3000/movies/reviews", {
        movie_id: movieId,
        name,
        vote,
        text,
      });

      // Aggiunge la recensione subito alla lista
      onNewReview(res.data);

      // Resetta il form
      setName("");
      setVote(5);
      setText("");
    } catch (err) {
      setError("Errore nell'invio della recensione");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>Write a review</h5>
      {error && <p className="text-danger">{error}</p>}

      <div className="mb-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          required
        />
      </div>

      <div className="mb-2">
        <select
          value={vote}
          onChange={(e) => setVote(Number(e.target.value))}
          className="form-select"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <textarea
          placeholder="Write here your review"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-control"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Send..." : "Send review"}
      </button>
    </form>
  );
}
