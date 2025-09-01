#!/usr/bin/env node

import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
config({ path: path.join(__dirname, '..', '.env.local') });

const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN;
const RESUME_REPO = process.env.VITE_RESUME_REPO;
const RESUME_FILE = process.env.RESUME_FILE_NAME + '.yaml';

console.log('🔍 Debugging GitHub API access...');
console.log(`Token: ${GITHUB_TOKEN ? 'Present' : 'Missing'}`);
console.log(`Token length: ${GITHUB_TOKEN ? GITHUB_TOKEN.length : 0}`);
console.log(`Token preview: ${GITHUB_TOKEN ? GITHUB_TOKEN.substring(0, 20) + '...' : 'N/A'}`);

// Test repository access
async function testRepoAccess() {
  try {
    const repoUrl = `https://api.github.com/repos/${RESUME_REPO}`;
    const headers = {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Terminal-Portfolio-Debug'
    };
    
    console.log(`\n🔗 Testing repository access: ${repoUrl}`);
    const response = await fetch(repoUrl, { headers });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Repository accessible: ${data.name}`);
      console.log(`   Private: ${data.private}`);
      console.log(`   Default branch: ${data.default_branch}`);
    } else {
      console.log(`❌ Repository access failed: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.log(`   Error: ${errorText}`);
    }
  } catch (error) {
    console.log(`❌ Repository test error: ${error.message}`);
  }
}

// Test file access
async function testFileAccess() {
  try {
    const fileUrl = `https://api.github.com/repos/${RESUME_REPO}/contents/${RESUME_FILE}`;
    const headers = {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Terminal-Portfolio-Debug'
    };
    
    console.log(`\n📄 Testing file access: ${fileUrl}`);
    const response = await fetch(fileUrl, { headers });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ File accessible: ${data.name}`);
      console.log(`   Size: ${data.size} bytes`);
      console.log(`   Encoding: ${data.encoding}`);
    } else {
      console.log(`❌ File access failed: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.log(`   Error: ${errorText}`);
    }
  } catch (error) {
    console.log(`❌ File test error: ${error.message}`);
  }
}

async function main() {
  await testRepoAccess();
  await testFileAccess();
}

main();
