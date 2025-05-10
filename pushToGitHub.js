// pushToGitHub.js

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ==== CONFIGURATION ====
const GITHUB_REPO_URL = 'https://github.com/Lohitha-kakumani'; // <-- CHANGE THIS
const PROBLEM_TITLE = 'TwoSum';  // You can dynamically pass this from scraper
const LANGUAGE = 'cpp'; // Change based on actual code language: cpp, py, java

// ==== 1. Create Filename ====
const date = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
const fileName = `${date}_${PROBLEM_TITLE}.${LANGUAGE}`;
const folderPath = path.join(__dirname, 'submissions');
const filePath = path.join(folderPath, fileName);

// ==== 2. Sample Code from GFG (replace this with scraped code) ====
const code = `// Sample GFG code for ${PROBLEM_TITLE}\n#include <iostream>\nusing namespace std;\nint main() { cout << "Hello GFG!"; return 0; }`;

// ==== 3. Save Code to File ====
if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
fs.writeFileSync(filePath, code);
console.log(`✅ Code saved to: ${filePath}`);

// ==== 4. Git Commands ====
try {
  // Initialize git if not already done
  if (!fs.existsSync(path.join(__dirname, '.git'))) {
    execSync('git init', { stdio: 'inherit' });
    execSync(`git remote add origin ${GITHUB_REPO_URL}`, { stdio: 'inherit' });
  }

  // Stage, commit, and push
  execSync('git add .', { stdio: 'inherit' });
  execSync(`git commit -m "Added ${fileName}"`, { stdio: 'inherit' });
  execSync('git branch -M main', { stdio: 'inherit' }); // Set branch to main
  execSync('git push -u origin main', { stdio: 'inherit' });

  console.log('🚀 Pushed to GitHub successfully!');
} catch (err) {
  console.error('❌ Git Push Failed:', err.message);
}
