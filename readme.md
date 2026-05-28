# RapidCrud

npm: npm i rapidcrud
Current Version: 1.0.2

Features:
1. Routing single page and dynamic page.
    Page Structure Blueprint:
    my-project/
    ├── src/
    │   ├── pages/                  <-- Static application pages folder
    │   │   ├── home.jsx            <-- Resolves directly to "/"
    │   │   └── profile.jsx         <-- Resolves directly to "/profile"
    │   ├── dynamicPages/           <-- Dynamic application routes folder
    │   │   └── profiles/           <-- Your matching dynamic folder URL segment
    │   │       └── [id].jsx        <-- Your dynamic component layout file
    │   ├── app.jsx                 <-- Main application layout wrapper
    │   └── main.jsx                <-- Virtual DOM entry point

Single Page:
"src/pages" is the single pages folder. Any file created under it will be a URL. For example, profile.jsx will become `http://localhost:port/profile`. (Note: name is case-sensitive and must start with a lowercase letter).

```
        Dynamic Page:
            "src/dynamicPages" is the dynamic pages folder. Inside the "src/dynamicPages" folder, create a subfolder with a descriptive name. This subfolder name will be used directly as a URL path segment. Inside that folder, create your dynamic layout file wrapped in square brackets, such as [id].jsx or [anything].jsx (it can literally be named anything inside the brackets). Wrapping the file name inside `[]` makes the path segment fully dynamic.
            
            For Example:
            "src/dynamicPages/rollCall/[id].jsx" resolves automatically to `http://localhost:port/rollCall/123`


2. <SmartRouter /> 
   This component needs to be added directly inside your root App.jsx file. It acts as the core foundational layout anchor for your entire application framework because it intercepts the path configuration and renders all matching pages cleanly.
   
   For Example:

```jsx
    import React from 'react'
    import { SmartLink, SmartRouter } from 'rapidcrud'

    function App() {
      return (
        <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', padding: '20px' }}>
          
          {/* Dynamic Global Header Elements */}
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eaeaea', paddingBottom: '20px' }}>
            <h1 style={{ margin: 0, fontSize: '24px' }}>⚡ RapidCrud App</h1>
            <nav style={{ display: 'flex', gap: '15px' }}>
              <SmartLink to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Home</SmartLink>
              <SmartLink to="/profile" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Profile</SmartLink>
            </nav>
          </header>

          {/* Dynamic Content Pipeline Injected Safely Here */}
          <main style={{ padding: '40px 0' }}>
            <SmartRouter />
          </main>

          {/* Dynamic Global Footer Elements */}
          <footer style={{ borderTop: '1px solid #eaeaea', paddingTop: '20px', textAlign: 'center', color: '#888', fontSize: '14px' }}>
            Built natively using the RapidCrud Performance Engine Architecture
          </footer>
          
        </div>
      )
    }

    export default App
```


3. <SmartLink /> 
   A much smarter, highly optimized way to use standard navigation links. It actively intercepts user intent to smoothly transition routes while simultaneously fetching remote backend payloads ahead of time. This makes your application transitions look entirely seamless and completely removes layout stutter or heavy loading delays.

```jsx
    <SmartLink 
        to="/profile"                                           // Options: Any path string template. Required. Maps directly to your file name inside src/pages/
        fetch="https://jsonplaceholder.typicode.com/users/1"    // Options: Any API URL endpoint string. Optional. Omit completely if it is a static route with no remote data fetching needs.
        id="profileData"                                        // Options: Any unique string key identifier. Required if using the 'fetch' attribute. Used to transmit data packets directly to the destination page.
        prefetchOn="hover"                                      // Options: "hover" | "click". Default fallback: "hover". Determines exactly what cursor interaction triggers the background network fetch.
        priority="high"                                         // Options: "low" | "medium" | "high". Default: "low". Directly controls the browser's internal network download engine urgency levels.
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow transition transform hover:-translate-y-0.5" // Options: Any standard utility string classes or global custom CSS stylesheet definitions.
        style={{ cursor: 'pointer' }}                           // Options: Standard React style configuration object. Optional inline-styling fallback.
        target="_self"                                          // Options: "_self" | "_blank" | "_parent" | "_top". Controls the standard anchor layout rendering rules.
        aria-label="View user profile"                          // Options: Any explicit descriptive text layout string. Ideal for native accessibility setup and reader adjustments.
        >
        View Profile Instantly
    </SmartLink>
```

# How to pull down data cleanly over the next page?
Use the native custom hook provided by the core engine. You pass the unique `"id"` parameter you specified back inside your `<SmartLink />` component, and the `useSmartData` module extracts the asynchronous memory state automatically to present the output records.

```jsx
    import React from 'react';
    import { useSmartData } from 'rapidcrud';

    export default function Profile() {
        const { data, state, error } = useSmartData('profileData'); // Accesses cache allocations directly via the link tracking ID string

        console.log("Profile Page - Smart Data State:", { data, state, error });
        
        return (
            <div>
              <h2>User Profile Dashboard</h2>
              
              {state === 'loading' && <p style={{ color: '#666' }}>Fetching API payloads...</p>}
              {state === 'error' && <p style={{ color: 'red' }}>Error: {error}</p>}
              
              {state === 'loaded' && data ? (
                  <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', marginTop: '15px' }}>
                    <h3>Account Owner: {data.name}</h3>
                    <p><strong>Email:</strong> {data.email}</p>
                    <p><strong>Company:</strong> {data.company?.name}</p>
                    <p><strong>City:</strong> {data.address?.city}</p>
                  </div>
              ) : (
                  state !== 'loading' && <p style={{ color: '#999' }}>No data loaded. Navigate from Home.</p>
              )}
            </div>
        );
    }
```

The output payload hook yields 3 precise structural parameters:
* data  => `null` | `Object` (or `Array`)
* state => `"default"`, `"loading"`, `"inPromise"`, `"loaded"`, `"error"`
* error => `null` | `"Failed to fetch"`, `"404 Not Found"`

| Variable Matrix | Possible Data Types Structure | Typical Value Run Examples |
| :--- | :--- | :--- |
| **data** | `null` \| `Object` (or `Array`) | `null`, `{"name": "Leanne Graham", "id": 1, ...}` |
| **state** | `String` (Strict Finite Enum) | `"default"`, `"loading"`, `"inPromise"`, `"loaded"`, `"error"` |
| **error** | `null` \| `String` | `null`, `"Failed to fetch"`, `"404 Not Found"` |


4. <SmartLoad />
   An automated, declarative element used inside dynamic templates to handle asynchronous network hydrations automatically if there is no pre-existing data stream. If a user deep-links directly into your app or manually reloads a parametric address path, this component recognizes the blank cache, reads the current url parameters, and executes an automated backend resolution stream instantly.

```jsx
    import React, { useState } from 'react';
    import { SmartLoad } from 'rapidcrud';

    export default function DynamicProfile({ params }) {
      return (
        <SmartLoad
          fetch={`https://jsonplaceholder.typicode.com/users/${params.id}`}
          id={`profile_${params.id}_data`}

          // 1. Fires only when the cache state evaluates to 'loaded' successfully
          onSuccess={(data) => (
              <div className="p-6 max-w-xl mx-auto">
                <title>User Data</title>
                <h1 className="text-3xl! text-center font-bold mb-4 text-white">User Lookup Portal</h1>
                
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                    <h2 className="text-lg font-bold text-green-900">{data.name}</h2>
                    <p className="text-gray-600">{data.email}</p>
                </div>
              </div>
          )}
        >
          {/* 2. Handles Loading placeholders AND Error views directly inline via a layout render function! */}
          {({ state, error }) => {
              if (state === 'loading' || state === 'inPromise') {
                  return <div className="text-blue-500 font-medium animate-pulse">Synchronizing profile layout...</div>;
              }

              if (state === 'error') {
                  return (
                      <div className="flex items-center justify-center px-4 mt-4 rounded-3xl text-red-500 font-bold">
                          {error || "An unexpected framework error aborted the view render pipeline."}
                      </div>
                  );
              }

              return null;
          }}
        </SmartLoad>
      );
    }
```

```