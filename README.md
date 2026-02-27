# TaskFlow

A simple, focused productivity app built to help user stay organized without the typical app clutter. I used React and Vite , and kept the styling in CSS to keep things lightweight.

## What it does

- **Direct Task Control:** Quick add, toggle completion, and instant delete with a hover tooltip so you don't miss.
- **Smart Filtering:** Easily switch between All, Pending, and Done views to keep your workspace tidy.
- **Custom Category System:** Comes with 'Work', 'Study', and 'Personal' by default, but you can create (and delete) your own custom categories on the fly.
- **Local-First Persistence:** Zero server dependency. Everything is saved to your browser's LocalStorage, so your data stays on your machine.
- **Visual Progress:** A theme-adaptive progress bar that updates in real-time as you check off tasks.
- **Completion Celebration:** A custom-built canvas confetti engine that triggers a burst when you finish a task.
- **Clean Theme Support:** High-contrast Dark Mode by default, with a one-click toggle for Light Mode.
- **Safe State Reset:** A "Clear All" safety prompt to wipe your local data only when you're 100% sure.
- **Modern & Responsive:** Fully responsive layout that looks great on both mobile and high-res desktops.

## Tech Stack

- **React** (Functional components + Hooks)
- **Vite** (Build pipeline)
- **CSS** 
- **Canvas API** 

## How to run it locally

1. Make sure you have Node installed.
2. Clone the repo and jump into the folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Check it out at `localhost:5173`.

## Deployment
deployed at https://taskflowproductivity.netlify.app/

## License
MIT.
