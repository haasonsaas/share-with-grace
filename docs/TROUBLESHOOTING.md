# 404 Error Troubleshooting Documentation

## Issue Description
Users are experiencing a 404 "Not Found" error when attempting to access the route `/index.html` in the Chrome extension. The error occurs despite having React Router configured for navigation.

## Root Cause Analysis
The persistent 404 error stems from a fundamental mismatch between SPA routing expectations and Chrome extension file serving:

1. **SPA Routing vs. Static File Serving**
   - React Router expects a server to serve `index.html` for any route
   - Chrome extensions load files directly from the filesystem
   - No server exists to rewrite/redirect requests in the extension context

2. **Chrome Extension Context**
   - Popup loads as a static file (`chrome-extension://.../index.html`)
   - No server to intercept and rewrite requests
   - Direct navigation to `/index.html` fails as it's treated as a file path

3. **Router Type Implications**
   - `HashRouter`: Works in extensions by keeping routing client-side
   - `BrowserRouter`: Fails as it expects server-side route handling

## Attempted Solutions

### Solution 1: Add Redirect Route
**Changes Made:**
- Added `Navigate` component import from `react-router-dom`
- Added a new route to handle `/index.html`:
  ```typescript
  <Route path="/index.html" element={<Navigate to="/" replace />} />
  ```

**Expected Outcome:**
- Any requests to `/index.html` would automatically redirect to the root path `/`
- The `replace` prop would replace the current history entry instead of adding a new one

**Result:**
- The 404 error persisted because the router never initializes when the file isn't found

### Solution 2: Switch to BrowserRouter
**Changes Made:**
- Replaced `HashRouter` with `BrowserRouter`:
  ```typescript
  import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
  ```
- Updated the router component:
  ```typescript
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/index.html" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  ```

**Rationale:**
- Chrome extensions can use browser history
- `BrowserRouter` uses the HTML5 History API
- Better compatibility with Chrome extension popup windows
- More natural integration with manifest.json's `default_popup` setting

**Result:**
- The 404 error continued to occur due to missing server-side route handling

## Recommended Solution
1. **Use HashRouter Exclusively**
   ```typescript
   import { HashRouter, Routes, Route } from "react-router-dom";
   
   <HashRouter>
     <Routes>
       <Route path="/" element={<Index />} />
       <Route path="*" element={<NotFound />} />
     </Routes>
   </HashRouter>
   ```

2. **Navigation Guidelines**
   - Use hash-based URLs (e.g., `index.html#/settings`)
   - Never attempt to navigate to `/index.html` as a route
   - Treat `index.html` only as the entry point file

3. **Implementation Notes**
   - Remove the `/index.html` route and redirect
   - Ensure all internal navigation uses hash-based paths
   - Configure extension to always load from `index.html`

## Additional Investigation
1. Examined `manifest.json`:
   - Found `"default_popup": "index.html"` configuration
   - Identified web accessible resources configuration
   - Confirmed proper CSP settings

2. Reviewed `vite.config.ts`:
   - Found specific build configuration for Chrome extension
   - Identified asset directory structure
   - Noted entry point configuration

## Current Status
The issue can be resolved by:
1. Reverting to `HashRouter`
2. Removing the `/index.html` route
3. Using hash-based navigation throughout the extension

This solution aligns with Chrome extension best practices and the limitations of the extension context. 