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

---

### Latest Version: 1.0.33 

**Updates:**
* **Component Name Changes**: <SmartLink /> --> <Link/>, <SmartLoad /> --> <Load/>, <SmartRouter /> --> <Router />, useSmartData() --> useData()
* **New Component Added**: <Image/>, <Title/>, <Metadata/>, useLoader()
* **Value Type**: `Array` of Vite plugin objects.


#### 📋 Configuration Reference Details

* **`plugins` Array**:
* **Editable**: Yes. You can append more development plugins here (e.g., visualizers or linters) alongside standard React.
* **Value Type**: `Array` of Vite plugin objects.


* **`resolve.alias` Object**:
* **Editable**: No. The `'@'` alias must point directly to your `./src` directory for the internal routing engine to find your components.
* **Value Type**: `Object` mapping alias strings to absolute filesystem paths resolved via Node's `path` module.



---

## 🚀 Core Features

#### 🔀 Dual-Mode File System Routing

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
│   │   │   └── [id].jsx        <-- Dynamic parametric component layout
│   │   └── dashboard/          <-- Matching dynamic folder URL segment
│   │       └── blog/           
│   │         └── [id].jsx      
│   │       └── userDetails/    
│   │         └── [id].jsx 
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

### 🎛️ `<Router />`

Drop this component directly inside your root `App.jsx` file. It acts as the core foundational layout anchor for your entire application framework because it intercepts path changes and renders your pages cleanly.

```jsx
import React from 'react'
import { Link, Router } from 'rapidcrud'

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', padding: '20px' }}>
      
      {/* Global Header Layout */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eaeaea', paddingBottom: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>⚡ RapidCrud App</h1>
        <nav style={{ display: 'flex', gap: '15px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Home</Link>
          <Link to="/profile" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Profile</Link>
        </nav>
      </header>

      {/* Dynamic Content Pipeline Injected Safely Here */}
      <main style={{ padding: '40px 0' }}>
        <Router />
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

* **`<Router />` Component**:
* **Editable / Props**: No. It accepts no props and handles routing automatically. It is a drop-and-forget component.
* **Output/Behavior Type**: Renders valid React JSX elements dynamically inside the application viewport matching the browser's current active `window.location.pathname`.



---

### 🔗 `<Link />`

A highly optimized alternative to standard navigation links. It smoothly manages route changes while simultaneously fetching remote backend payloads ahead of time based on user interactions. This completely removes layout stutter or jarring loading animations.

```jsx
<Link 
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
</Link>

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

Use the custom hook `useData` provided by the core engine inside your target page component. Pass the unique `"id"` identifier string you specified in your `<Link />` to pull out the active memory state automatically.

```jsx
import React from 'react';
import { useData } from 'rapidcrud';

export default function Profile() {
    // "id" matches the tracking key string passed into your <Link /> component
    const { data, state, error } = useData('profileData');

    console.log("Profile Page - Data State:", { data, state, error });
    
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

* **`useData('id')` Argument**:
* **Editable**: Yes. Must match the exact `id` string configuration provided inside the initial caller `<Link />` component.
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

### 🔄 `<Load />`

An automated fallback data hydrator component designed specifically for dynamic, parameter-based route pages. If a user opens a link directly, types it manually, or reloads their layout, this element intercepts the blank cache, evaluates the parameters from the active path, and executes an automated backend resolution stream instantly.

```jsx
import React from 'react';
import { Load } from 'rapidcrud';

export default function DynamicProfile({ params }) {
  return (
    <Load
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
    </Load>
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

### ⚓ `useLoader()`

An interactive inline data resolution hook that acts similarly to standard React layout side-effects (`useEffect`). It initializes on component mount, automatically validates your application's centralized global cache registries, and fires matching data connection streams immediately. It returns an array destructuring format, completely freeing developers to assign any unique variable tracking name they prefer inside their functional layout code.

```jsx
import React from 'react';
import { useLoader } from 'rapidcrud';

export default function DashboardSummary() {
  // 1. Explicitly name the returned state container whatever you want via array destructuring
  const [adminData] = useLoader('https://jsonplaceholder.typicode.com/users/7');

  return (
    <div>
      {/* 2. Seamlessly track statuses and securely read nested records straight from the hook */}
      {adminData.state === 'loading' && <p>Syncing security records...</p>}
      
      {adminData.state === 'error' && <p>Connection failed: {adminData.error?.message}</p>}

      {adminData.state === 'loaded' && adminData.data && (
        <h1>Welcome back, {adminData.data.name}</h1>
      )}
    </div>
  );
}

```

#### 📋 Component Element Details

* **`url` Input Parameter**:
* **Editable**: Yes. You can change this parameter to target any local or external backend endpoint.
* **Value Type**: `String`. A standard valid API resource string path.


* **Returned Destructured Array Slot**:
* **Editable**: Yes. You can name the variable in the first array slot whatever you want (e.g., `[adminData]`, `[postFeed]`, `[productDetails]`) to maintain clean contextual styling.
* **Value Type**: `Array` containing a single wrapped state telemetry `Object`.


* **Returned Variable Key Fields**:
* **Editable**: No. The nested fields inside the tracking variable object are read-only properties dispatched directly from the framework's internal global publisher-subscriber store.
* **Value Schema Matrix**:



| Key Target Name | Value Data Type Structure | Runtime Return Value Examples |
| --- | --- | --- |
| **`.state`** | `String` (Strict Finite Enum) | Evaluates predictably across: `"default"`, `"loading"`, `"inPromise"`, `"loaded"`, or `"error"`. |
| **`.data`** | `null` | `Object` | `Array` | `String` | Remains `null` during network requests, then automatically updates to house your raw parsed API payload dataset. |
| **`.error`** | `null` | `Object` | Stays `null` unless a network execution failure occurs, at which point it logs detailed exception and error status strings. |

---

### 🏷️ `<Title />`

A lightweight, zero-dependency utility element used to modify the browser's document window head text dynamically. Because it runs purely inside a standard rendering side-effect hook and yields zero visual HTML tree output, it can be dropped anywhere—including nested inside conditional logic, dynamic files, routing buckets, or component response wrappers—to safely keep page tab values in sync with your runtime backend parameters.

```jsx
import React from 'react';
import { useLoader, Title } from 'rapidcrud';

export default function UserProfileCard() {
  // 1. Fetch backend payloads asynchronously using the array hook
  const [adminData] = useLoader('https://jsonplaceholder.typicode.com/users/7');

  return (
    <div>
      {/* 2. Seamlessly render the title tool inside conditional states */}
      {adminData.state === 'loading' && (
        <>
          <Title name="Loading System Profile..." />  {/* Can be Dynamically Changed */}
          <p>Syncing security records...</p>
        </>
      )}

      {adminData.state === 'loaded' && adminData.data && (
        <>
          {/* 3. Inject dynamic template parameters after the stream resolves */}
          <Title name={`Workspace | ${adminData.data.name}`} />
          <h1>Welcome back, {adminData.data.name}</h1>
        </>
      )}
    </div>
  );
}

```

#### 📋 Component Element Details

* **`name` Prop**:
* **Editable**: Yes. You can pass static text strings or dynamic template literal string configurations containing active state parameters.
* **Value Type**: `String`. The literal text value mapped directly down to the browser's native window frame `document.title` property on runtime evaluation.

---


### 🌐 `<Metadata />`

An advanced, SEO configuration component inspired by Next.js architecture, used to manage document window header definitions and platform share parameters dynamically. It tracks input parameters to automatically configure window text labels, append search engine keywords, and update standard description or Open Graph preview definitions (such as a generic platform preview logo link, Android launcher shortcut icons, or iOS apple-touch-icons) straight inside the application HTML `<head>`. Since it operates through an underlying reactive render cycle that actively listens for nested property changes, it updates the tab title and metadata tags dynamically in real time as your background API payloads resolve.

```jsx
import React from 'react';
import { useLoader, Metadata } from 'rapidcrud';

export default function ProfileHub() {
  // 1. Fetch dynamic data packet stream asynchronously using the array hook
  const [adminData] = useLoader('https://jsonplaceholder.typicode.com/users/7');

  return (
    <div>
      {/* 2. Pass real-time changing variables or fixed text strings straight into the config object */}
      <Metadata 
        config={{
          title: `Workspace | ${adminData.data.name}` // Real-time dynamic title update once data loads, Interactive temporary layout loading title
          description: "A centralized command module detailing streaming layout performance analytics.",
          keywords: ["dashboard", "analytics", "realtime", "rapidcrud"],
          image: "https://mywebsite.com/assets/logo-preview.png",
          androidImage: "https://mywebsite.com/assets/android-launcher-icon.png",
          iosImage: "https://mywebsite.com/assets/ios-touch-icon.png"
        }} 
      />
      
      {adminData.state === 'loaded' && adminData.data && (
        <h3>System Operations Console for: {adminData.data.name}</h3>
      )}
    </div>
  );
}

```

#### 📋 Component Element Details

* **`config` Prop**:
* **Editable**: Yes. Accepts configuration objects built with inline ternary operators, fixed literal strings, or direct state references that modify values dynamically over the component lifecycle.
* **Value Type**: `Object`.


* **Nested `config` Parameter Fields**:
* **Editable**: Yes. You can explicitly configure these inner properties to manage your page's structural HTML head elements.
* **Value Schema Matrix**:



| Parameter Attribute | Editable | Value Data Type Structure | Type / Value Examples |
| --- | --- | --- | --- |
| **`.title`** | Yes | `String` | Maps a textual tag straight to the browser window tab `document.title` header. **Supports dynamic data transitions automatically.** |
| **`.description`** | Yes | `String` | Locates or appends a `<meta name="description" />` node inside the HTML head, updating its content string for platform SEO crawlers. |
| **`.keywords`** | Yes | `Array` of `Strings` | Combines elements into a comma-separated list injected into a `<meta name="keywords" />` element to help search engines discover page context. |
| **`.image`** | Yes | `String` | Populates `<meta property="og:image" />` and `<meta name="twitter:image" />` properties inside the head to use as the standard visual logo or card preview when links are shared across standard web channels. |
| **`.androidImage`** | Yes | `String` | Appends or updates standard Android-specific layout tags such as web app manifests or `<link rel="icon" sizes="192x192" />` device shortcuts to preserve accurate branding on Android system interfaces. |
| **`.iosImage`** | Yes | `String` | Dynamically injects Apple-specific `<link rel="apple-touch-icon" />` headers into the document head to serve as high-resolution desktop-grade shortcuts when the layout is pinned on iOS devices. |


---

### 🖼️ `<Image />`

A high-performance, **zero-CSS dependency** media wrapper component built to maximize byte suppression and accelerate image loading speeds across standard network layers. By coupling user-configured sizing properties (`width`/`height`) directly with smart server-side formatting parameters, it automatically forces files into high-density layouts (such as compressed WebP). This significantly lowers asset overhead (e.g., dropping a raw 98KB file down to a tiny 20KB transmission payload) without compromising visual sharpness. It locks elements to their exact designated dimensions using strict inline structural configurations to completely eliminate layout shifts and cumulative layout instability (CLS) during browser load execution.

```jsx
import React from 'react';
import { Image } from 'rapidcrud';

export default function GalleryOverview() {
  return (
    <div className="grid grid-cols-3 gap-6 p-10 bg-slate-900">
      <h2>Media Portfolio Workspace</h2>

      {/* Compresses file footprints, prevents container shifting, and runs accelerated loading tracks */}
      <Image 
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
        alt="Mountain Range Landscape View"
        width={400}
        height={250}
        quality={75}
        className="rounded-2xl border-2 border-emerald-500 shadow-2xl"
      />
    </div>
  );
}

```

#### 📋 Component Element Details

* **`src` Prop**:
* **Editable**: Yes. Points directly to your internal static public project media assets directory or external CDN addresses.
* **Value Type**: `String`.


* **`className` Prop**:
* **Editable**: Yes. Accepts standard Tailwind CSS design syntax declarations or custom CSS utility definitions. All string classes passed here are cleanly dumped directly onto both the underlying element wrapper container and HTML image tag layout structure at runtime.
* **Value Type**: `String`.


* **Custom Sizing & Compression Attributes**:
* **Editable**: Yes. Use these configurations to lock element bounds, strip hidden file metadata, and maximize download velocities without depending on standard style code layouts.
* **Value Schema Matrix**:



| Parameter Attribute | Editable | Value Data Type Structure | Type / Value Examples |
| --- | --- | --- | --- |
| **`alt`** | Yes | `String` | Essential descriptive text used by screen readers and accessibility monitors for search ranking validation. |
| **`width`** | Yes | `Number` | Sets a rigid, immutable width size value in pixels via inline style structures. **Guarantees the element frame size never updates or distorts.** |
| **`height`** | Yes | `Number` | Sets a rigid, immutable height size value in pixels via inline style structures. **Locks container space to protect document flow layout.** |
| **`quality`** | Yes | `Number` (Range: `1` to `100`) | Directly controls asset byte compression levels. Image safely clamps this factor between `60` and `85` to clear away unneeded meta tracking packets, dropping file weights instantly for faster rendering. |

---

## 📄 License

Distributed under the MIT License. Built with ⚡ by Foysal Hossain.