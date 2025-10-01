# RecentPapers Component

A production-ready, reusable React component for displaying recent publications from RSS feeds (PubMed, arXiv, etc.).

## Features

- ✅ Clean, modern card-based design with Tailwind CSS
- ✅ Responsive grid layout (1 column mobile, 2 columns desktop)
- ✅ Hover effects with smooth transitions
- ✅ External link indicators
- ✅ Date formatting
- ✅ Icon indicators for author and date
- ✅ Fully reusable with any RSS feed

## Quick Start

### Basic Usage with Static JSON

```jsx
import RecentPapers from './components/RecentPapers';
import papers from './data/barrowPapers.json';

function App() {
  return <RecentPapers papers={papers} limit={10} title="Recent Publications" />;
}
```

### Dynamic RSS Feed Fetching

```jsx
import { useState, useEffect } from 'react';
import RecentPapers from './components/RecentPapers';
import { fetchRSSFeed } from './utils/rssFeedParser';

function App() {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const loadPapers = async () => {
      const data = await fetchRSSFeed('YOUR_RSS_FEED_URL', 10);
      setPapers(data);
    };
    loadPapers();
  }, []);

  return <RecentPapers papers={papers} />;
}
```

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `papers` | Array | **required** | Array of paper objects (see structure below) |
| `limit` | Number | `10` | Maximum number of papers to display |
| `title` | String | `"Recent Publications"` | Section heading text |

### Paper Object Structure

Each paper object should have the following structure:

```javascript
{
  "title": "Paper title here",
  "author": "FirstAuthor et al.",
  "link": "https://pubmed.ncbi.nlm.nih.gov/12345678/",
  "date": "2025-09-27"  // YYYY-MM-DD format
}
```

## RSS Feed Parser Utility

The `rssFeedParser.js` utility provides functions to fetch and parse RSS feeds.

### `fetchRSSFeed(feedUrl, limit)`

Fetches and parses an RSS feed, returning formatted paper objects.

```javascript
import { fetchRSSFeed } from './utils/rssFeedParser';

const papers = await fetchRSSFeed(
  'https://pubmed.ncbi.nlm.nih.gov/rss/search/...',
  10
);
```

**Parameters:**
- `feedUrl` (string): RSS feed URL
- `limit` (number, optional): Max entries to return (default: 10)

**Returns:** `Promise<Array>` of paper objects

### `formatRSSItems(items, limit)`

Converts raw RSS items to the paper format.

```javascript
import { formatRSSItems } from './utils/rssFeedParser';

const formattedPapers = formatRSSItems(rawRSSData, 10);
```

## PubMed RSS Feed Setup

### Getting Your PubMed RSS Feed URL

1. Go to [PubMed](https://pubmed.ncbi.nlm.nih.gov/)
2. Perform your search (e.g., "Barrow Neurological Institute spine")
3. Click "Create RSS" in the right sidebar
4. Copy the RSS feed URL
5. Add `?limit=20` parameter to get more results

Example:
```
https://pubmed.ncbi.nlm.nih.gov/rss/search/[YOUR_SEARCH_ID]/?limit=20
```

## Using with Different Institutions

To create publications pages for different institutions:

1. **Get the RSS feed URL** for that institution
2. **Create a JSON file** with the institution's papers (optional, for caching)
3. **Create a component** similar to `BarrowPublications.jsx`

Example for a new institution:

```jsx
// ClevelandClinicPublications.jsx
import RecentPapers from './RecentPapers';
import papers from '../data/clevelandPapers.json';

const ClevelandClinicPublications = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-8">
          Cleveland Clinic Spine Research
        </h1>
        <RecentPapers
          papers={papers}
          limit={10}
          title="Recent Publications"
        />
      </div>
    </div>
  );
};

export default ClevelandClinicPublications;
```

## CORS Considerations

**Important:** Direct RSS feed fetching from the browser may be blocked by CORS policies.

### Solutions:

1. **Use Static JSON** (Recommended for production)
   - Pre-fetch RSS data and save as JSON
   - Update periodically via build process or scheduled task
   - No CORS issues, faster loading

2. **Backend Proxy**
   - Create an API endpoint on your backend that fetches the RSS
   - Your frontend calls your backend, not PubMed directly

3. **CORS Proxy Service** (Development only)
   - Use services like `cors-anywhere` for testing
   - Not recommended for production

4. **Build-time Static Generation**
   - Fetch RSS data during build (Next.js, Gatsby)
   - Serve as static content

## Styling Customization

The component uses Tailwind CSS. To customize:

### Colors
Change blue accent colors by modifying class names:
- `bg-blue-600` → `bg-purple-600`
- `text-blue-600` → `text-purple-600`
- `border-blue-400` → `border-purple-400`

### Card Spacing
Adjust padding: `p-6` → `p-8`

### Shadow Intensity
Modify shadows: `shadow-md` → `shadow-lg`

### Grid Columns
Change responsive breakpoint:
```jsx
className="grid grid-cols-1 lg:grid-cols-3 gap-6"  // 3 columns on large screens
```

## Example: Integration into Existing Page

```jsx
import RecentPapers from './components/RecentPapers';
import papers from './data/barrowPapers.json';

function ResearchPage() {
  return (
    <section className="py-16 bg-white">
      {/* Your existing content */}
      <div className="map-section">{/* ... */}</div>

      {/* Add recent papers section */}
      <div className="mt-16">
        <RecentPapers
          papers={papers}
          limit={6}
          title="Latest Research from Barrow"
        />
      </div>
    </section>
  );
}
```

## Files Created

1. **`src/components/RecentPapers.jsx`** - Main reusable component
2. **`src/utils/rssFeedParser.js`** - RSS fetching and parsing utility
3. **`src/data/barrowPapers.json`** - Static JSON data for Barrow publications
4. **`src/components/BarrowPublications.jsx`** - Example implementation page

## Dependencies

- React
- Tailwind CSS
- `lucide-react` (for icons)

Install icons if needed:
```bash
npm install lucide-react
```

## Browser Compatibility

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile responsive
- ✅ Uses standard DOM APIs (DOMParser for RSS)

## License

Free to use and modify for your project.
