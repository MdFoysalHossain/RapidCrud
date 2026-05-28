# ⚡ RapidCrud



A lightning-fast, zero-config React micro-framework engine designed for automated file-system routing and predictive data pre-fetching.

---

## 🚀 Core Features

### 1. Dual-Mode File System Routing

RapidCrud scans two dedicated directories to automatically assemble your application routing landscape natively:

* 
**Single Pages (`src/pages/`)**: Any `.jsx` file created under this folder automatically maps to a public URL path. For example, `profile.jsx` becomes `http://localhost:port/profile`.


> ⚠️ **Note:** File names are case-sensitive and **must** start with a lowercase letter.
> 
> 


* 
**Dynamic Pages (`src/dynamicPages/`)**: Create a subfolder whose name acts as the base URL segment. Inside that folder, wrap your file layout name in square brackets (e.g., `[id].jsx` or `[anything].jsx`) to transform it into a fully dynamic route segment. For example, `src/dynamicPages/rollCall/[id].jsx` resolves to `http://localhost:port/rollCall/123`.



#### 📂 Recommended Directory Structure

```text
my-project/
├── src/
[cite_start]│   ├── pages/                  <-- Static application pages folder [cite: 5]
[cite_start]│   │   ├── home.jsx            <-- Resolves directly to "/" [cite: 6]
[cite_start]│   │   └── profile.jsx         <-- Resolves directly to "/profile" [cite: 6]
[cite_start]│   ├── dynamicPages/           <-- Dynamic application routes folder [cite: 6]
[cite_start]│   │   └── profiles/           <-- Matching dynamic folder URL segment [cite: 6, 7]
[cite_start]│   │       └── [id].jsx        <-- Dynamic parametric component layout [cite: 7]
[cite_start]│   ├── app.jsx                 <-- Main application layout wrapper [cite: 7]
[cite_start]│   └── main.jsx                <-- Project DOM mounting entry point [cite: 7]

```

---

## 🛠️ Framework Integration Components

### 🎛️ `<SmartRouter />`

Drop this component directly inside your root `App.jsx` file. It acts as the core foundational layout anchor for your entire application framework because it intercepts path changes and renders your pages cleanly.

```jsx
import React from 'react'
[cite_start]import { SmartLink, SmartRouter } from 'rapidcrud' [cite: 8]

function App() {
  return (
    [cite_start]<div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', padding: '20px' }}> [cite: 8]
      
      {/* Global Header Layout */}
      [cite_start]<header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eaeaea', paddingBottom: '20px' }}> [cite: 9]
        [cite_start]<h1 style={{ margin: 0, fontSize: '24px' }}>⚡ RapidCrud App</h1> [cite: 9]
        [cite_start]<nav style={{ display: 'flex', gap: '15px' }}> [cite: 9]
          [cite_start]<SmartLink to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Home</SmartLink> [cite: 9, 10]
          [cite_start]<SmartLink to="/profile" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Profile</SmartLink> [cite: 10]
        </nav>
      </header>

      {/* Dynamic Content Pipeline Injected Safely Here */}
      [cite_start]<main style={{ padding: '40px 0' }}> [cite: 10]
        [cite_start]<SmartRouter /> [cite: 11]
      </main>

      {/* Global Footer Layout */}
      [cite_start]<footer style={{ borderTop: '1px solid #eaeaea', paddingTop: '20px', textAlign: 'center', color: '#888', fontSize: '14px' }}> [cite: 11]
        [cite_start]Built natively using the RapidCrud Performance Engine Architecture [cite: 11]
      [cite_start]</footer> [cite: 11]
      
    [cite_start]</div> [cite: 12]
  )
}

[cite_start]export default App [cite: 12]

```

---

### 🔗 `<SmartLink />`

A highly optimized alternative to standard navigation links. It smoothly manages route changes while simultaneously fetching remote backend payloads ahead of time based on user interactions. This completely removes layout stutter or jarring loading animations.

```jsx
<SmartLink 
    to="/profile"                                           // Target route path. [cite_start]Maps to your file name inside src/pages/ [cite: 14, 15]
    fetch="https://jsonplaceholder.typicode.com/users/1"    // API endpoint URL. [cite_start]Omit if page doesn't fetch data [cite: 15, 16]
    id="profileData"                                        // Storage allocation key. [cite_start]Required if using 'fetch' to pass data downstream [cite: 16, 17]
    prefetchOn="hover"                                      // Trigger type: "hover" | "click". [cite_start]Default is "hover" [cite: 17, 18]
    priority="high"                                         // Download queue urgency priority: "low" | "medium" | "high". [cite_start]Default is "low" [cite: 18, 19]
    [cite_start]className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow" // Supports standard Tailwind or custom global CSS classes [cite: 19, 20]
    [cite_start]style={{ cursor: 'pointer' }}                           // Standard React inline style fallback objects [cite: 20, 21, 22]
    target="_self"                                          // Standard HTML anchor target rules: "_self" | [cite_start]"_blank" | etc. [cite: 22, 23]
    [cite_start]aria-label="View user profile"                          // Accessibility string configurations for screen-readers [cite: 23, 24]
>
    View Profile Instantly
[cite_start]</SmartLink> [cite: 24]

```

---

## 📥 How to Access Pre-Fetched Data

Use the custom hook `useSmartData` provided by the core engine inside your target page component. Pass the unique `"id"` identifier string you specified in your `<SmartLink />` to pull out the active memory state automatically.

```jsx
import React from 'react';
[cite_start]import { useSmartData } from 'rapidcrud'; [cite: 25]

export default function Profile() {
    [cite_start]// "id" matches the tracking key string passed into your <SmartLink /> component [cite: 26, 27]
    [cite_start]const { data, state, error } = useSmartData('profileData'); [cite: 26]

    [cite_start]console.log("Profile Page - Smart Data State:", { data, state, error }); [cite: 27]
    
    return (
        <div>
          [cite_start]<h2>User Profile Dashboard</h2> [cite: 28]
          
          [cite_start]{state === 'loading' && <p style={{ color: '#666' }}>Fetching API payloads...</p>} [cite: 28]
          [cite_start]{state === 'error' && <p style={{ color: 'red' }}>Error: {error}</p>} [cite: 28, 29]
          
          {state === 'loaded' && data ? [cite_start]( [cite: 29]
              [cite_start]<div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', marginTop: '15px' }}> [cite: 29]
                [cite_start]<h3>Account Owner: {data.name}</h3> [cite: 29]
                [cite_start]<p><strong>Email:</strong> {data.email}</p> [cite: 30]
                [cite_start]<p><strong>Company:</strong> {data.company?.name}</p> [cite: 30]
                [cite_start]<p><strong>City:</strong> {data.address?.city}</p> [cite: 30]
              [cite_start]</div> [cite: 30]
          ) : (
              [cite_start]state !== 'loading' && <p style={{ color: '#999' }}>No data loaded. Navigate from Home.</p> [cite: 31]
          )}
        </div>
    [cite_start]); [cite: 31]
[cite_start]} [cite: 32]

```

### 📊 Reactive Payload Schema

The custom state payload hook returns 3 precise reactive parameters:

| Output Key | Data Type Structure | Type / Value Examples |
| --- | --- | --- |
| **`data`** | `null` | `Object` | `Array` | <br>`null`, `{"name": "Leanne Graham", ...}` 

 |
| **`state`** | `String` (Strict Finite Enum) | <br>`"default"`, `"loading"`, `"inPromise"`, `"loaded"`, `"error"` 

 |
| **`error`** | `null` | `String` | <br>`null`, `"Failed to fetch"`, `"404 Not Found"` 

 |

---

### 🔄 `<SmartLoad />`

An automated fallback data hydrator component designed specifically for dynamic, parameter-based route pages. If a user opens a link directly, types it manually, or reloads their layout, this element intercepts the blank cache, evaluates the parameters from the active path, and executes an automated backend resolution stream instantly.

```jsx
import React from 'react';
[cite_start]import { SmartLoad } from 'rapidcrud'; [cite: 36, 37]

[cite_start]export default function DynamicProfile({ params }) { [cite: 37]
  return (
    <SmartLoad
      [cite_start]fetch={`https://jsonplaceholder.typicode.com/users/${params.id}`} [cite: 37]
      [cite_start]id={`profile_${params.id}_data`} [cite: 37]

      [cite_start]// 1. Injects and fires layout wrapper markup ONLY when state evaluates to 'loaded' [cite: 37]
      [cite_start]onSuccess={(data) => ( [cite: 37]
          [cite_start]<div className="p-6 max-w-xl mx-auto"> [cite: 38]
            [cite_start]<title>User Data</title> [cite: 38]
            [cite_start]<h1 className="text-3xl font-bold mb-4 text-white text-center">User Lookup Portal</h1> [cite: 38]
            
            [cite_start]<div className="bg-green-50 p-4 rounded-xl border border-green-200"> [cite: 39]
                [cite_start]<h2 className="text-lg font-bold text-green-900">{data.name}</h2> [cite: 39]
                [cite_start]<p className="text-gray-600">{data.email}</p> [cite: 39]
            [cite_start]</div> [cite: 39]
          [cite_start]</div> [cite: 39]
      )}
    >
      [cite_start]{/* 2. Handles Loading placeholders and Error messages inline using a declarative render prop function! [cite: 40] */}
      [cite_start]{({ state, error }) => { [cite: 40]
          [cite_start]if (state === 'loading' || state === 'inPromise') { [cite: 40, 41]
              [cite_start]return <div className="text-blue-500 font-medium animate-pulse">Synchronizing profile layout...</div>; [cite: 41]
          [cite_start]} [cite: 41]

          [cite_start]if (state === 'error') { [cite: 42]
              return (
                  [cite_start]<div className="flex items-center justify-center px-4 mt-4 rounded-3xl text-red-500 font-bold"> [cite: 42]
                      {error || [cite_start]"An unexpected framework error aborted the view render pipeline."} [cite: 42, 43]
                  [cite_start]</div> [cite: 43]
              );
          [cite_start]} [cite: 43]

          [cite_start]return null; [cite: 44]
      [cite_start]}} [cite: 45]
    [cite_start]</SmartLoad> [cite: 45]
  [cite_start]); [cite: 45]
[cite_start]} [cite: 46]

```

---

## 📄 License

Distributed under the MIT License. Built with ⚡ by the RapidCrud Core Engine Development Team.