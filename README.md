# My Watch List

A responsive React + TypeScript media discovery app for movies, TV shows, and anime with an interactive watch list feature.

## Overview

`My Watch List` helps users browse popular media, search by category, view details and recommendations, and manage a personal watch list.

Key behaviors:

- Google sign-in using Supabase authentication
- Popular media sections for movies, TV, and anime
- Search page with filters and paginated results
- Details pages showing media info and recommendations
- Watch list management with add/remove and drag/drop behavior
- Responsive UI with Chakra UI, styled components, and custom animations

### Live Site

https://my-media-watch-list.netlify.app/

## Technologies Used

- React 19
- TypeScript
- Vite
- @tanstack/react-router
- Chakra UI
- styled-components
- Supabase Auth
- @tanstack/react-query
- @dnd-kit/react for drag and drop
- TMDB API for movies and TV data
- Jikan API for anime data
- Next Themes for theme support
- ESLint for linting

## Features

- **Google OAuth login** through Supabase
- **Popular media discovery** across movies, TV shows, and anime
- **Search with category filters** and paginated results
- **Media detail pages** with similar/recommended content
- **User watch list** with categorized status and drag/drop support
- **Responsive navigation** for mobile and desktop
- **Toast notifications** for success and error feedback

## Scripts

- `pnpm dev` - start development server
- `pnpm build` - build production bundle
- `pnpm lint` - run ESLint

## Project Structure

- `src/components` - reusable UI components and layout pieces
- `src/routes` - route definitions and page components
- `src/utils` - helpers, hooks, contexts, and API data hooks
- `src/assets` - static assets used by the app
