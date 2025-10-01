# 📚 How to Update Papers

This guide explains how to update the research papers displayed on the New Research page.

## Quick Summary

Papers are stored as **static JSON files** in `src/data/`. To update them, you have 3 easy options:

---

## ✨ Option 1: Browser Tool (Easiest - No Terminal)

1. **Open the update tool:**
   - Double-click: `scripts/updatePapers-simple.html`
   - OR navigate to it in your browser

2. **Click "Update All Papers"**
   - The tool will fetch latest papers from PubMed
   - Shows status for each institution (green = success)

3. **Copy the JSON:**
   - Click "Copy JSON Output" button
   - The tool shows you the JSON for each file

4. **Paste into JSON files:**
   - Open `src/data/barrowPapers.json`
   - Replace contents with the copied JSON
   - Repeat for other institutions
   - Save the files

5. **Done!** Commit and deploy your changes.

**⚠️ Note:** This may not work due to browser CORS restrictions. If it fails, use Option 2 or 3.

---

## 🔧 Option 2: Manual Copy-Paste (Most Reliable)

1. **Open each RSS feed in your browser:**
   - Barrow: `https://pubmed.ncbi.nlm.nih.gov/rss/search/1fmfIeN4X5QaHfwLTMrvfbsQp6BuAvsIkzEkjuo7xIBqG4TMVB/?limit=20`
   - Hopkins: `https://pubmed.ncbi.nlm.nih.gov/rss/search/1pMPQVclnMM-hpDMUjT6IHHkPCzoicewaMG_03DDXT9nGoiMg3/?limit=15`

2. **View the RSS feed XML** (you'll see titles, dates, authors)

3. **Extract the data manually:**
   - Copy the first 10 entries
   - Format as JSON with fields: `title`, `author`, `link`, `date`

4. **Update the JSON files** in `src/data/`

5. **Save and deploy**

**Format example:**
```json
[
  {
    "title": "Paper Title Here",
    "author": "LastName et al.",
    "link": "https://pubmed.ncbi.nlm.nih.gov/12345678/",
    "date": "2025-09-27"
  }
]
```

---

## 💻 Option 3: Node.js Script (For Developers)

**Prerequisites:** Node.js installed with `jsdom` package

1. **Install jsdom** (one-time):
   ```bash
   npm install jsdom
   ```

2. **Run the update script:**
   ```bash
   node scripts/updatePapers.js
   ```

3. **The script automatically:**
   - Fetches all RSS feeds
   - Parses the XML
   - Updates all JSON files in `src/data/`
   - Shows you a summary

4. **Done!** Commit and deploy.

---

## 📋 RSS Feed URLs

Keep these handy when updating:

| Institution | RSS Feed URL |
|-------------|-------------|
| **Barrow Neurological Institute** | `https://pubmed.ncbi.nlm.nih.gov/rss/search/1fmfIeN4X5QaHfwLTMrvfbsQp6BuAvsIkzEkjuo7xIBqG4TMVB/?limit=20` |
| **Johns Hopkins University** | `https://pubmed.ncbi.nlm.nih.gov/rss/search/1pMPQVclnMM-hpDMUjT6IHHkPCzoicewaMG_03DDXT9nGoiMg3/?limit=15` |

*Add more as you integrate additional institutions*

---

## 🔄 How Often Should I Update?

**Recommended:** Once a week or once a month

Academic publications don't change daily, so updating weekly or monthly is sufficient. Set a calendar reminder!

---

## 🆕 Adding a New Institution

When you get a new RSS feed:

1. **Add the RSS URL to the script:**
   - Edit `scripts/updatePapers.js`
   - Add to the `RSS_FEEDS` object:
   ```javascript
   'cleveland': 'https://pubmed.ncbi.nlm.nih.gov/rss/search/...'
   ```

2. **Run the update script** (creates the JSON file automatically)

3. **Update the code:**
   - Add import in `Newresearch.jsx`:
     ```javascript
     import clevelandPapers from '../data/clevelandPapers.json';
     ```
   - Add to `getPapersForLab()` function:
     ```javascript
     if (labId === 'neuro-cleveland') {
       return clevelandPapers.slice(0, 10);
     }
     ```
   - Update the JSX section for Cleveland to use real papers

4. **Test and deploy!**

---

## 🐛 Troubleshooting

### Browser tool shows CORS errors
- **Solution:** Use Option 2 (manual) or Option 3 (Node.js script)
- Browser security blocks direct RSS fetching from PubMed

### Node script fails with "module not found"
- **Solution:** Run `npm install jsdom` first
- Make sure you're in the project directory

### Papers not showing on site
- Check the JSON file format matches the example
- Make sure `author` field exists (not `authors`)
- Verify the institution ID in `getPapersForLab()` matches

---

## ✅ Quick Checklist

When updating papers:

- [ ] Fetch latest data from RSS feeds
- [ ] Update JSON files in `src/data/`
- [ ] Verify JSON format is correct
- [ ] Test locally (`npm run dev`)
- [ ] Commit changes to git
- [ ] Deploy to production (`npm run deploy`)

---

## 📞 Need Help?

If you run into issues, you can:
1. Check the JSON file format carefully
2. Look at existing working JSON files as examples
3. Use the manual copy-paste method (most reliable)

---

**Last Updated:** October 1, 2025
