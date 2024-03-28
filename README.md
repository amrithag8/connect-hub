# Connect Hub - Media Sharing Hub #



https://github.com/amrithag8/connect-hub/assets/127708115/aa5a167a-1883-4ba1-bd95-1f912688bbbe

## LiveUrl : https://master--connect-hub-client.netlify.app

# Overview #
Connect Hub provides a vibrant and dynamic platform for users to share their lives, connect with others, and discover new content from around the world. Whether users are aspiring photographers, social influencers, or simply looking to stay connected with friends. It incorporates essential features for photo and video sharing, story viewing, post interactions, messaging, and personalized content discovery.

# Component Composition #
Component composition involves building small, reusable components that are combined to create complex UIs, which is vital for an application like Connect Hub.

1. Reusable UI Components: Components for buttons, modals, inputs, posts, stories, etc., are created for reuse throughout the application.
2. Layout Components: Layout components such as Header, Sidebar, and MainContent provide a consistent look across different pages.
3. Protected Route: Redirects unauthenticated users to the login page while allowing authenticated users to access protected content.
4. State Management: Utilize the Context API for global state management.
5. Responsive Design: Ensure components work seamlessly across various devices.

By embracing these best practices, Connect Hub not only replicates popular social media functionalities but also ensures a robust, maintainable, and scalable architecture.   

# Tech Stack #

* MongoDB: For storing user data, posts, etc.
* Express.js: Backend framework for RESTful API.
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

# Features #

1. ## Authentication ##
   * Sign-up, log-in, and log-out functionalities.
   * Email otp verification during password change.

2. ## Profile Management ##
   * Dedicated profile page with user info.
   * Bio setting and display.
   * Followers and following.

3. # Content Posting #
   *Uploading and sharing images or videos.
   * Viewing short video clips and images in a special tab.

4. # Stories #
   *Adding and viewing temporary stories.

5. # Post Interactions #
   * Liking, commenting, and sharing posts.
   * Saving posts for later viewing.

6. # Messaging #
   * Private user-to-user chats.
   * Number of unseen chat shown when new message received.
  
7. # Search #
   * User search functionality.

8. # Infinite Scrolling #
 ``* Implementation of infinite scroll for endless content loading.
   






