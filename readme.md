Here is the updated documentation with the Vite path alias setup integrated directly after the installation step. It explains exactly what elements are introduced, what parts are editable, and the value types involved, with no citations included.

---

# ⚡ RapidCrud

A lightning-fast, zero-config React micro-framework engine designed for automated file-system routing and predictive data pre-fetching.

---

## 📦 Installation & Setup

Install the core package using your preferred node package manager:

```bash
npm i rapidcrud

```

### ⚙️ Required Vite Path Configuration

Because RapidCrud relies on structured file scanning, you must add path aliases to your project build configuration. Update your root `vite.config.js` file to include the `@` alias resolver:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Enforces standardized internal source mapping
    },
  },
});

```

#### 📋 Configuration Reference Details

* **`plugins` Array**:
* **Editable**: Yes. You can append more development plugins here (e.g., visualizers or linters) alongside standard React.
* **Value Type**: `Array` of Vite plugin objects.


* **`resolve.alias` Object**:
* **Editable**: No. The `'@'` alias must point directly to your `./src` directory for the internal routing engine to find your components.
* **Value Type**: `Object` mapping alias strings to absolute filesystem paths resolved via Node's `path` module.



---

## 🚀 Core Features

### 1. Dual-Mode File System Routing

RapidCrud scans two dedicated directories to automatically assemble your application routing landscape natively:

* **Single Pages (`src/pages/`)**: Any `.jsx` file created under this folder automatically maps to a public URL path. For example, `profile.jsx` becomes `http://localhost:port/profile`.
> ⚠️ **Note:** File names are case-sensitive and **must** start with a lowercase letter.


* **Dynamic Pages (`src/dynamicPages/`)**: Create a subfolder whose name acts as the base URL segment. Inside that folder, wrap your file layout name in square brackets (e.g., `[id].jsx` or `[anything].jsx`) to transform it into a fully dynamic route segment. For example, `src/dynamicPages/rollCall/[id].jsx` resolves to `http://localhost:port/rollCall/123`.

#### 📂 Recommended Directory Structure

```text
my-project/
├── src/
│   ├── pages/                  <-- Static application pages folder
│   │   ├── home.jsx            <-- Resolves directly to "/"
│   │   └── profile.jsx         <-- Resolves directly to "/profile"
│   ├── dynamicPages/           <-- Dynamic application routes folder
│   │   └── profiles/           <-- Matching dynamic folder URL segment
│   │       └── [id].jsx        <-- Dynamic parametric component layout
│   ├── app.jsx                 <-- Main application layout wrapper
│   └── main.jsx                <-- Project DOM mounting entry point

```

#### 📋 File Routing Reference Details

* **`src/pages/` Folder Structure**:
* **Editable**: Yes. You can add, delete, or rename files freely to modify your application's static URL mapping.
* **Value Type / Rules**: File extensions must be `.jsx`. Naming conventions strictly require a lowercase starting letter.


* **`src/dynamicPages/` Folder Structure**:
* **Editable**: Yes. You can structure dynamic URL sub-segments by managing folders here.
* **Value Type / Rules**: Subfolders must use standard alpha strings. Layout filenames *must* be wrapped within square brackets `[...]` followed by `.jsx`. The parameter key inside the brackets is extracted as a string variable passed downstream to your pages.



---

## 🛠️ Framework Integration Components

### 🎛️ `<SmartRouter />`

Drop this component directly inside your root `App.jsx` file. It acts as the core foundational layout anchor for your entire application framework because it intercepts path changes and renders your pages cleanly.

```jsx
import React from 'react'
import { SmartLink, SmartRouter } from 'rapidcrud'

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', padding: '20px' }}>
      
      {/* Global Header Layout */}
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

      {/* Global Footer Layout */}
      <footer style={{ borderTop: '1px solid #eaeaea', paddingTop: '20px', textAlign: 'center', color: '#888', fontSize: '14px' }}>
        Built natively using the RapidCrud Performance Engine Architecture
      </footer>
      
    </div>
  )
}

export default App

```

#### 📋 Component Element Details

* **`<SmartRouter />` Component**:
* **Editable / Props**: No. It accepts no props and handles routing automatically. It is a drop-and-forget component.
* **Output/Behavior Type**: Renders valid React JSX elements dynamically inside the application viewport matching the browser's current active `window.location.pathname`.



---

### 🔗 `<SmartLink />`

A highly optimized alternative to standard navigation links. It smoothly manages route changes while simultaneously fetching remote backend payloads ahead of time based on user interactions. This completely removes layout stutter or jarring loading animations.

```jsx
<SmartLink 
    to="/profile"                                           // Target route path. Maps to your file name inside src/pages/
    fetch="https://jsonplaceholder.typicode.com/users/1"    // API endpoint URL. Omit if page doesn't fetch data
    id="profileData"                                        // Storage allocation key. Required if using 'fetch' to pass data downstream
    prefetchOn="hover"                                      // Trigger type: "hover" | "click". Default is "hover"
    priority="high"                                         // Download queue urgency priority: "low" | "medium" | "high". Default is "low"
    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow" // Supports standard Tailwind or custom global CSS classes
    style={{ cursor: 'pointer' }}                           // Standard React inline style fallback objects
    target="_self"                                          // Standard HTML anchor target rules: "_self" | "_blank" | etc.
    aria-label="View user profile"                          // Accessibility string configurations for screen-readers
>
    View Profile Instantly
</SmartLink>

```

#### 📋 Component Element Details

* **`to` Prop**:
* **Editable**: Yes. Change it to route users to different paths.
* **Value Type**: `String`. Must match a valid route path mapped directly to a file name in your `src/pages` or `src/dynamicPages` configuration folders.


* **`fetch` Prop**:
* **Editable**: Yes. Fully customizable backend address target.
* **Value Type**: `String`. A standard valid API resource endpoint URL.


* **`id` Prop**:
* **Editable**: Yes. Must be a unique namespace key.
* **Value Type**: `String`. Serves as the memory state indexing address used by downstream subscriber components.


* **`prefetchOn` Prop**:
* **Editable**: Yes.
* **Value Type**: `String` Enum. Accepts exactly `"hover"` or `"click"`. Defaults internally to `"hover"`.


* **`priority` Prop**:
* **Editable**: Yes.
* **Value Type**: `String` Enum. Accepts exactly `"low"`, `"medium"`, or `"high"`. Defaults internally to `"low"`.


* **`className` / `style` / `target` / `aria-label` Props**:
* **Editable**: Yes.
* **Value Type**: Standard browser runtime strings or native object representations mapping straight down to underlying HTML anchor properties.



---

## 📥 How to Access Pre-Fetched Data

Use the custom hook `useSmartData` provided by the core engine inside your target page component. Pass the unique `"id"` identifier string you specified in your `<SmartLink />` to pull out the active memory state automatically.

```jsx
import React from 'react';
import { useSmartData } from 'rapidcrud';

export default function Profile() {
    // "id" matches the tracking key string passed into your <SmartLink /> component
    const { data, state, error } = useSmartData('profileData');

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

#### 📋 Custom Hook Details

* **`useSmartData('id')` Argument**:
* **Editable**: Yes. Must match the exact `id` string configuration provided inside the initial caller `<SmartLink />` component.
* **Value Type**: `String`.


* **Returned Yield Destructuring Object**:
* **Editable**: No. These parameter fields represent read-only internal memory state variables dispatched straight from the framework engine.
* **Value Schema Matrix:**



| Variable Key | Editable | Value Data Type Structure | Type / Value Examples |
| --- | --- | --- | --- |
| **`data`** | No | `null` | `Object` | `Array` | Contains parsed JSON payload objects on success or remains `null` during runtime transitions. |
| **`state`** | No | `String` (Strict Finite Enum) | Evaluates sequentially across: `"default"`, `"loading"`, `"inPromise"`, `"loaded"`, or `"error"`. |
| **`error`** | No | `null` | `String` | Contains descriptive network error logs like `"Failed to fetch"`, `"404 Not Found"`, or stays `null`. |

---

### 🔄 `<SmartLoad />`

An automated fallback data hydrator component designed specifically for dynamic, parameter-based route pages. If a user opens a link directly, types it manually, or reloads their layout, this element intercepts the blank cache, evaluates the parameters from the active path, and executes an automated backend resolution stream instantly.

```jsx
import React from 'react';
import { SmartLoad } from 'rapidcrud';

export default function DynamicProfile({ params }) {
  return (
    <SmartLoad
      fetch={`https://jsonplaceholder.typicode.com/users/${params.id}`}
      id={`profile_${params.id}_data`}

      // 1. Injects and fires layout wrapper markup ONLY when state evaluates to 'loaded'
      onSuccess={(data) => (
          <div className="p-6 max-w-xl mx-auto">
            <title>User Data</title>
            <h1 className="text-3xl font-bold mb-4 text-white text-center">User Lookup Portal</h1>
            
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h2 className="text-lg font-bold text-green-900">{data.name}</h2>
                <p className="text-gray-600">{data.email}</p>
            </div>
          </div>
      )}
    >
      {/* 2. Handles Loading placeholders and Error messages inline using a declarative render prop function! */}
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

#### 📋 Component Element Details

* **`fetch` Prop**:
* **Editable**: Yes. Use template literals to map URL parameters (`params`) right into your resource fetch requests.
* **Value Type**: `String`. A standard valid API resource endpoint URL.


* **`id` Prop**:
* **Editable**: Yes. Assign a unique cache address tracker for this dynamic entity.
* **Value Type**: `String`.


* **`onSuccess` Prop Callback**:
* **Editable**: Yes. Write your own custom user interface presentation elements inside this render function block.
* **Value Type / Output**: A functional callback returning native React JSX. It is called **only** when the server successfully responds with a `200 OK` structure and the internal state moves to `"loaded"`. It provides a read-only parsed `data` payload parameter (`Object` or `Array`).


* **Component Children Inner Wrapper Block**:
* **Editable**: Yes. Used to manage explicit fallback components like loading spinner placeholders and crash alerts.
* **Value Type / Output**: An inline render function prop block providing an argument object containing read-only fields `{ state, error }`. Your implementation should return custom JSX blocks tracking structural pipeline variations.



---

## 📄 License

Distributed under the MIT License. Built with ⚡ by the RapidCrud Core Engine Development Team.