# GitSearch (AKA GitHub Repo Search App)

![](/screenshots/final_product/Github%20Repo%20Search.png)

Video : https://www.youtube.com/watch?v=ko2_ywRunOE

Available on the web at : https://gitsearch-liard.vercel.app

This is a small app that is designed to do the folllowing actions :

- Search for Repositories on Github using the Github REST API via Octokit, able to sort by Stars/Forks/Updated and also add qualifiers (known as rules in the UI)
- Search for Code within a said Repository
- Search for Issues within a said Repository
- Search for PRs within a said Repository
- Search for Commits within a said Repository

This is handled via a standard React Router with multiple routes pointing within the app + links to the Github Repos themselves.

# How to use/setup

There are two ways to use this, you can either navigate to the app hosted via Vercel on here : https://gitsearch-liard.vercel.app

However this vercel online site does not have the ability to use the "code search" react route as that requires an API key. If you try to use the code search, the search will simply display no results found. Note that the rest of the app works fine (searching commits/prs/repos/issues is fine).

If you want to check out the code search, you will need to do the following :

1. Git clone the repo
   `git clone https://github.com/effeect/github-repo-search-app`
2. cd into the root and run
   `cp default.env .env`
3. Edit the .env with a valid Github token
4. Run `npm start` and the app should start running

# Tools used

I wanted to keep things small and not use any extreme npm packages, at first I was planning to not use a CSS framework (was originally going to use Pure.css and build upon it).

However, I ended up settling on Bulma mostly to speed up development, there is still some custom CSS for the table results and other bits in the app.

I've used the following additional packages :

- react-dom-router ( https://reactrouter.com/ )
- bulma ( https://bulma.io/ )
- React Markdown ( https://www.npmjs.com/package/react-markdown/v/8.0.6)
- DOMPurify ( https://www.npmjs.com/package/dompurify)
- GitHub Octokit to handle the API requests ( https://github.com/octokit/octokit.js/)

Note that prettier was used in the IDE hence the formatting looking super clean.

# What I would change/improve

Whilst I'm happy with the result, there are some things I would like to change/improve in the future upon reflection :

- There is fairly basic error handling and I'm not handling any api errors from GitHub in a nice way. I would like to spend some more time handling it so the UI can respond correctly.
- There is code for a `SearchUser.ts` file under `/api/` however I didn't feel like it fit the scope of this app, however it can be quickly implemented if needed.
- There is a route for a "file viewer" which would allow you to click the code item and view it within the app without going to github directly, however it wasn't particularly great and I decided to just redirect to the specific file on Github. This can be changed.
- Not all qualifiers are included in the search items as some of the qualifiers can get a bit complex. I decided to limit them however the type interfaces are defined so they can be added back in quickly.
- Wanted to implement view transitions for the router `<Link>`'s but I didn't get time to look into it too much.
- The "label" qualifier has an issue where if you don't put "" around the label it will not work.
- I would also like to implement a better way to show off Metadata, I've had some good experciences with Next.js when it comes to handling it however I wasn't wanting to add more npm packages for something relatively small and minor.

# Screenshots :

![](/screenshots/final_product/Github%20Repo%20Search.png)
![](/screenshots/final_product/Github%20Repo%20Menu%20Facebook.png)
![](/screenshots/final_product/CommitSearch.png)
![](/screenshots/final_product/IssueSearch.png)
![](/screenshots/final_product/GithubCode.png)
