import { useEffect, useState } from "react";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const candidatesArray = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );
    setSavedCandidates(candidatesArray);
  }, []);

  return (
    <div>
      <h2>Saved Candidates</h2>
      {savedCandidates.length === 0 ? (
        <p>No saved candidates</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>GitHub Profile</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>
                  <img
                    src={candidate.avatar_url}
                    alt={candidate.login}
                    width={50}
                    height={50}
                  />
                </td>
                <td>{candidate.login}</td>
                <td>{candidate.login}</td>
                <td>{candidate.location || "N/A"}</td>
                <td>{candidate.email || "N/A"}</td>
                <td>{candidate.company || "N/A"}</td>
                <td>
                  <a href={candidate.html_url} target="_blank">
                    View Profile
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;
