/** 
 *  An arrray of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/privacy",
    "/tos"
  ];
  
  /**
   * An array of routes that are used for authentication
   * These routes will redirect logged in users to /settings
   * @type {string[]}
   */
  export const authRoutes = [
    "/login",
    "/forgot-password",
    "/signup",
  ]
  
  /**
   * The prefix for API auth routes
   * These routes that start with this prefix are used for API auth purposes
   * @type {string}
   */
  export const apiAuthPrefix = "/api/auth"
  
  /**
   * The default redirect path after logging in
   * @type {string}
   */
  export const DEFAULT_LOGIN_REDIRECT = "/calendar"