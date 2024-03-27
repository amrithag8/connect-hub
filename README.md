# Connect Hub - Unified Media Sharing Hub #



https://github.com/amrithag8/connect-hub/assets/127708115/673e00ca-fca2-42b1-82f2-64e4974eb046

#### LiveUrl : https://master--connect-hub-client.netlify.app

## Overview ##
Connect Hub is a social media platform designed for sharing photos and videos with friends, family, and the world. It provides users with vibrant and dynamic platform for users to share their lives, connect with others, and discover new content from around the world.
Essential features include photo and video sharing, story viewing, post interactions, messaging, and personalized content discovery. 

## Component Composition ##
Component composition involves building small, reusable components that are combined to create complex UIs, which is vital for an application like Connect Hub.

1. Reusable UI Components : Components for buttons, modals, inputs, posts, stories, etc., are created for reuse throughout the application.
2. Layout Components : Layout components such as Header, AppBar, Sidebar, and MainContent provide a consistent look across different pages.
3. Protected Route: Redirects unauthenticated users to the login page while allowing authenticated users to access protected content

## Tech Stack ##
 * MongoDB: For storing user data, posts, etc.
 * Express.js: Backend framework.
 * Axios: HTTP client for API requests.
 * React Router DOM: For navigation in React apps.
 * Socket.IO Client: For real-time communication.
 * bcrypt: For password hashing.
 * cors: To enable Cross-Origin Resource Sharing.
 * dotenv: For environment variable management.
 * jsonwebtoken: For JSON Web Token implementation.
 * mongoose: MongoDB modeling for Node.js.
 * nodemailer: To send emails.
 * socket.io: For real-time bidirectional communication.

## Features ##

1. ## Authentication ##
   * Sign-up, log-in, and log-out functionalities.
   * Email otp in change password page.
2. ## Profile Management ##
   * Dedicated profile page with user info.
   * Bio setting and display.
   * Followers and following list.
3. ## Content Posting ##
   * Uploading and sharing images or videos.
   * Viewing short video clips in a special tab.
4. ## Post Interactions ##
   * Liking, commenting posts.
   * Saving posts for later viewing.
5. ## Messaging ##
   * Private user-to-user chats.
   * Notification when received a new message.
6. ## Search ##
   * User search functionality.
7. ## Infinite Scrolling ##
   * Implementation of infinite scroll for endless content loading.
   

