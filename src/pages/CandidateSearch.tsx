import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";

type Status = "loading" | "ready" | "noCandidates";

const CandidateSearch = () => {
  const [candidateQueue, setCandidateQueue] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(
    null
  );
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    getCandidates();
  }, []);

  const getCandidates = async () => {
    setStatus("loading");
    const candidates = await searchGithub();

    if (candidates.length > 0) {
      setCandidateQueue(candidates);
      getCandidateDetails(candidates[0].login);
    } else {
      setStatus("noCandidates");
    }
  };

  const getCandidateDetails = async (username: string) => {
    try {
      const candidateDetails = await searchGithubUser(username);
      // error finding username
      if (candidateDetails && candidateDetails.message === "Not Found") {
        nextCandidate();
      } else if (candidateDetails && candidateDetails.id) {
        setCurrentCandidate(candidateDetails);
        setStatus("ready");
      } else {
        // error finding username
        nextCandidate();
      }
    } catch {
      // ensuring to get new candidate when error finding username
      nextCandidate();
    }
  };

  const saveCandidate = () => {
    if (candidateQueue[0]) {
      const savedCandidates = JSON.parse(
        localStorage.getItem("savedCandidates") || "[]"
      );
      savedCandidates.push(candidateQueue[0]);
      localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
      nextCandidate();
    }
  };

  const skipCandidate = () => {
    nextCandidate();
  };

  const nextCandidate = () => {
    setCandidateQueue((prevQueue) => {
      const [, ...remaining] = prevQueue;
      if (remaining.length > 0) {
        getCandidateDetails(remaining[0].login);
      } else {
        //load more candidates when queue is empty
        getCandidates();
      }
      return remaining;
    });
  };

  return (
    <div>
      {status === "loading" && <p>Loading...</p>}
      {status === "noCandidates" && <p>No more candidates available</p>}
      {status === "ready" && currentCandidate && (
        <div>
          <h2>{currentCandidate.login}</h2>
          <img src={currentCandidate.avatar_url} alt={currentCandidate.login} />
          <p>Location: {currentCandidate.location || "N/A"}</p>
          <p>Email: {currentCandidate.email || "N/A"}</p>
          <p>Company: {currentCandidate.company || "N/A"}</p>
          <p>Bio: {currentCandidate.bio || "N/A"}</p>
          <a href={currentCandidate.html_url} target="_blank">
            Profile Link
          </a>
          <button onClick={saveCandidate}>+</button>
          <button onClick={skipCandidate}>-</button>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
