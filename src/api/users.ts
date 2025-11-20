import { Octokit } from "octokit";

// Setup of the Octokit "kit"
const octokitHandle = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Will plug up if I have time, only working on Repos for now
