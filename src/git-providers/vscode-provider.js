const vscode = window.vscode;

function getPath() {
  return window._PATH;
}

function showLanding() {
  return false;
}

function getCommits(path, last) {
  return new Promise((resolve, reject) => {
    window.addEventListener(
      "message",
      event => {
        const commits = event.data;
        commits.forEach(c => (c.date = new Date(c.date)));
        resolve(commits);
      },
      { once: true }
    );

    vscode.postMessage({
      command: "commits",
      params: {
        path,
        last
      }
    });
  });
}

export default {
  showLanding,
  getPath,
  getCommits
};
