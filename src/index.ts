import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";

async function run() {
  const token = getInput("gh-token");
  const label = getInput("label");

  const octokit = getOctokit(token);
  const pullRequest = context.payload.pull_request;

  try {
    await octokit.rest.issues.addLabels({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: pullRequest!.number,
      labels: [label],
    });
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error?.message ?? "Unknown error");
    }
  }
}

run();
