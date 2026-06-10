const commitTracker = document.getElementById('commit-tracker');
const owner = 'jesche487';
const repo = 'personal-website';

if (commitTracker) {
  fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`, {
    cache: 'no-cache',
    headers: {
      Accept: 'application/vnd.github+json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      return response.json();
    })
    .then((json) => {
      if (!Array.isArray(json) || json.length === 0) {
        throw new Error('No commit data returned.');
      }
      const commit = json[0];
      const sha = commit.sha ? commit.sha.slice(0, 7) : 'unknown';
      const dateString = commit.commit?.author?.date || commit.commit?.committer?.date;
      const date = dateString ? new Date(dateString).toISOString().slice(0, 10) : 'unknown date';
      const commitUrl = `https://github.com/${owner}/${repo}/commit/${commit.sha}`;
      commitTracker.innerHTML = `Latest published commit: <a href="${commitUrl}" target="_blank" rel="noopener noreferrer">${sha}</a> · ${date}`;
    })
    .catch(() => {
      commitTracker.textContent = 'Latest published commit information is unavailable right now.';
    });
}
