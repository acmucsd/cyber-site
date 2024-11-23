# ACM Cyber website

This repository contains the code for ACM Cyber website.
The live website is viewable at
**[cyber.acmucsd.com](https://cyber.acmucsd.com/)**

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Development

1. Ensure you have [Node](https://nodejs.org/en) installed.

1. Install the dependencies:

   ```shell
   $ npm install
   ```

1. Populate `.env`. You'll need to get its contents from someone in ACM.

   TODO: Where should we put our `.env` file?

1. Then run the development server:

   ```shell
   $ npm run dev
   ```

   Open <http://localhost:3000> with your browser to see the result.

## How this site was created

This is for anyone who wants to create an ACM website for their community in the future. It was fairly straightforward!

1. We ran `npx create-next-app@latest` and created this repo under acmucsd.

1. We created a new CNAME record for `cyber.acmucsd.com` on AWS Route 53 and pointed it to Vercel's IP.

1. We created a project on Vercel from this repo. It immediately began deploying it to vercel.app.

1. After it finished setting up the project, we went to Domains in the Vercel project settings and added our new domain `cyber.acmucsd.com`. Vercel did some magic setting the domain up on their end, et voila, https://cyber.acmucsd.com/ was up and running.

### Why Next.js?

Our decision to use Next.js was strongly based on maintainability. ACM Cyber is unlikely to recruit a dedicated dev team, so ideally the website should require little maintenance, and adding resources to the website should not require much technical knowledge.

Almost all of ACM's other websites use Next.js, so by sharing the same tech stack, ACM's dev team can maintain this website if any changes are required.

An alternative we considered was creating a build script to deploy a static site to GitHub Pages, which would be free and straightforward. A build script wouldn't require as much technical knowledge to write, but we're concerned that it would be difficult for future teams to maintain the build script, compared to a well documented framework like Next.js. In addition, as ACM is likely to always have a dev team, by using Next.js and Vercel ACM will always have someone familiar with how this website works, even if they are not familiar with this particular codebase. 
