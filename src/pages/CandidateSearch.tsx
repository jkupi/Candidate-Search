import { useState, useEffect } from 'react';
import { searchGithub, /*searchGithubUser*/ } from '../api/API';

const CandidateSearch:React.FC = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const loadCandidates = async () => {
      const candidates = await searchGithub();
      setCurrentCandidate(candidates[0]);
    };
    loadCandidates();
  }, []);

  return (
    <div>
      {currentCandidate ? (
        <div>
          <h2>{currentCandidate.login}</h2>
          <img src={currentCandidate.avatar_url} alt={currentCandidate.login} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CandidateSearch;
