# Deploying Freelancer Agenda

This guide explains how to deploy the Freelancer Agenda application to a free hosting provider. **Vercel** is recommended for the best experience with React/Vite apps.

## Option 1: Vercel (Recommended)

1.  **Create a Vercel Account**

    - Go to [vercel.com](https://vercel.com) and sign up (using your GitHub account is easiest).

2.  **Import the Project**

    - On your Vercel dashboard, click **"Add New..."** -> **"Project"**.
    - Find the **FreelancerAgenda** repository in the list and click **"Import"**.

3.  **Configure Project**

    - **Framework Preset**: It should automatically detect **"Vite"**. If not, select it.
    - **Root Directory**: Leave as `./`.
    - **Build Command**: Leave as `npm run build` (or similar).
    - **Output Directory**: Leave as `dist`.
    - **Environment Variables**: None needed for the basic app.

4.  **Deploy**
    - Click **"Deploy"**.
    - Wait a minute for the build to finish.
    - Once complete, you will get a live URL (e.g., `freelancer-agenda.vercel.app`).

## Option 2: Netlify

1.  **Create a Netlify Account**

    - Go to [netlify.com](https://www.netlify.com) and sign up with GitHub.

2.  **Import the Project**

    - Click **"Add new site"** -> **"Import from an existing project"**.
    - Select **GitHub**.
    - Authorize Netlify if asked, then pick the **FreelancerAgenda** repo.

3.  **Configure Build**
    - **Build command**: `npm run build`
    - **Publish directory**: `dist`
    - Click **"Deploy site"**.

## Troubleshooting

- **Page Not Found on Refresh**: This app uses client-side routing. I have added a `vercel.json` file to handle this on Vercel. Netlify usually handles this automatically or may require a `_redirects` file (add `/* /index.html 200` to a `public/_redirects` file if you have issues).
