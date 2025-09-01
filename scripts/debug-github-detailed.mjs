#!/usr/bin/env node

import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
config({ path: path.join(__dirname, '..', '.env.local') });

const RESUME_REPO = process.env.VITE_RESUME_REPO || 'Virulentis/resume';
const RESUME_BRANCH = process.env.VITE_RESUME_BRANCH || 'main';
const RESUME_FILE_PATH = process.env.VITE_RESUME_FILE_PATH || 'William_Ramsay_CV.yaml';
const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN || process.env.GITHUB_TOKEN || '';

console.log('🔍 GitHub API Debug Script');
console.log('============================');
console.log(`Repository: ${RESUME_REPO}`);
console.log(`Branch: ${RESUME_BRANCH}`);
console.log(`File: ${RESUME_FILE_PATH}`);
console.log(`Token: ${GITHUB_TOKEN ? `${GITHUB_TOKEN.substring(0, 8)}...` : 'NOT PROVIDED'}`);
console.log('');

async function debugGitHubAccess() {
  const headers = {
    'User-Agent': 'Terminal-Portfolio-Debug',
    'Accept': 'application/vnd.github.v3+json'
  };
  
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }
  
  // Test 1: Check if repository exists and is accessible
  console.log('📁 Step 1: Testing repository access...');
  const repoUrl = `https://api.github.com/repos/${RESUME_REPO}`;
  
  try {
    const repoResponse = await fetch(repoUrl, { headers });
    console.log(`   Status: ${repoResponse.status} ${repoResponse.statusText}`);
    
    if (repoResponse.ok) {
      const repoData = await repoResponse.json();
      console.log(`   ✅ Repository found: ${repoData.full_name}`);
      console.log(`   📊 Private: ${repoData.private}`);
      console.log(`   🌿 Default branch: ${repoData.default_branch}`);
      console.log(`   👥 Owner: ${repoData.owner.login}`);
    } else {
      const errorData = await repoResponse.text();
      console.log(`   ❌ Repository access failed`);
      console.log(`   📄 Error details: ${errorData}`);
      
      if (repoResponse.status === 404) {
        console.log('   💡 Possible causes:');
        console.log('      - Repository does not exist');
        console.log('      - Repository is private and token lacks access');
        console.log('      - Token is invalid or expired');
        console.log('      - Token lacks "repo" scope');
      }
    }
  } catch (error) {
    console.log(`   ❌ Network error: ${error.message}`);
  }
  
  console.log('');
  
  // Test 2: Check authentication details
  console.log('🔐 Step 2: Testing authentication...');
  
  if (!GITHUB_TOKEN) {
    console.log('   ❌ No token provided');
    console.log('   💡 For private repos, you need a GitHub Personal Access Token');
    return;
  }
  
  try {
    const userUrl = 'https://api.github.com/user';
    const userResponse = await fetch(userUrl, { headers });
    console.log(`   Status: ${userResponse.status} ${userResponse.statusText}`);
    
    if (userResponse.ok) {
      const userData = await userResponse.json();
      console.log(`   ✅ Authenticated as: ${userData.login}`);
      console.log(`   👤 Account type: ${userData.type}`);
    } else {
      console.log(`   ❌ Authentication failed`);
      const errorData = await userResponse.text();
      console.log(`   📄 Error: ${errorData}`);
    }
  } catch (error) {
    console.log(`   ❌ Auth test error: ${error.message}`);
  }
  
  console.log('');
  
  // Test 3: Check file access
  console.log('📄 Step 3: Testing file access...');
  const fileUrl = `https://api.github.com/repos/${RESUME_REPO}/contents/${RESUME_FILE_PATH}?ref=${RESUME_BRANCH}`;
  
  try {
    const fileResponse = await fetch(fileUrl, { headers });
    console.log(`   Status: ${fileResponse.status} ${fileResponse.statusText}`);
    
    if (fileResponse.ok) {
      const fileData = await fileResponse.json();
      console.log(`   ✅ File found: ${fileData.name}`);
      console.log(`   📏 Size: ${fileData.size} bytes`);
      console.log(`   🔗 SHA: ${fileData.sha}`);
    } else {
      const errorData = await fileResponse.text();
      console.log(`   ❌ File access failed`);
      console.log(`   📄 Error details: ${errorData}`);
      
      if (fileResponse.status === 404) {
        console.log('   💡 Possible causes:');
        console.log(`      - File "${RESUME_FILE_PATH}" does not exist`);
        console.log(`      - Branch "${RESUME_BRANCH}" does not exist`);
        console.log('      - Path is incorrect (case sensitive)');
      }
    }
  } catch (error) {
    console.log(`   ❌ File test error: ${error.message}`);
  }
  
  console.log('');
  
  // Test 4: List repository contents to verify structure
  console.log('📂 Step 4: Listing repository contents...');
  const contentsUrl = `https://api.github.com/repos/${RESUME_REPO}/contents?ref=${RESUME_BRANCH}`;
  
  try {
    const contentsResponse = await fetch(contentsUrl, { headers });
    console.log(`   Status: ${contentsResponse.status} ${contentsResponse.statusText}`);
    
    if (contentsResponse.ok) {
      const contentsData = await contentsResponse.json();
      console.log(`   ✅ Repository contents (${contentsData.length} items):`);
      contentsData.forEach(item => {
        const icon = item.type === 'dir' ? '📁' : '📄';
        const mark = item.name === RESUME_FILE_PATH ? ' ⭐ (TARGET FILE)' : '';
        console.log(`      ${icon} ${item.name}${mark}`);
      });
      
      const targetExists = contentsData.some(item => item.name === RESUME_FILE_PATH);
      if (!targetExists) {
        console.log(`   ⚠️  Target file "${RESUME_FILE_PATH}" not found in repository root`);
      }
    } else {
      console.log(`   ❌ Contents listing failed`);
    }
  } catch (error) {
    console.log(`   ❌ Contents test error: ${error.message}`);
  }
  
  console.log('');
  
  // Test 5: Try raw GitHub URL (fallback method)
  console.log('🌐 Step 5: Testing raw GitHub URL...');
  const rawUrl = `https://raw.githubusercontent.com/${RESUME_REPO}/${RESUME_BRANCH}/${RESUME_FILE_PATH}`;
  
  try {
    const rawHeaders = { 'User-Agent': 'Terminal-Portfolio-Debug' };
    if (GITHUB_TOKEN) {
      rawHeaders['Authorization'] = `token ${GITHUB_TOKEN}`;
    }
    
    const rawResponse = await fetch(rawUrl, { headers: rawHeaders });
    console.log(`   Status: ${rawResponse.status} ${rawResponse.statusText}`);
    
    if (rawResponse.ok) {
      const content = await rawResponse.text();
      console.log(`   ✅ Raw file accessible`);
      console.log(`   📏 Content length: ${content.length} characters`);
      console.log(`   📄 First 100 chars: ${content.substring(0, 100).replace(/\n/g, '\\n')}...`);
    } else {
      console.log(`   ❌ Raw file access failed`);
    }
  } catch (error) {
    console.log(`   ❌ Raw URL test error: ${error.message}`);
  }
  
  console.log('');
  console.log('🎯 Summary & Recommendations:');
  console.log('===============================');
  
  if (!GITHUB_TOKEN) {
    console.log('❌ Missing GitHub token - required for private repositories');
    console.log('💡 Add VITE_GITHUB_TOKEN to your .env.local file');
  } else {
    console.log('✅ GitHub token provided');
    console.log('💡 Next steps:');
    console.log('   1. Verify the repository URL: https://github.com/' + RESUME_REPO);
    console.log('   2. Check that your token has "repo" scope');
    console.log('   3. Ensure the file path is correct (case-sensitive)');
    console.log('   4. Verify the branch name is correct');
  }
}

debugGitHubAccess().catch(console.error);