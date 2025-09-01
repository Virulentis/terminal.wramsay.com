#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Configuration from environment variables
const RESUME_REPO = process.env.VITE_RESUME_REPO || 'Virulentis/resume';
const RESUME_BRANCH = process.env.VITE_RESUME_BRANCH || 'main';
const RESUME_FILE_PATH = process.env.VITE_RESUME_FILE_PATH || 'William_Ramsay_CV.yaml';
// Support both custom token and GitHub Actions built-in token
const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN || process.env.GITHUB_TOKEN || '';

// GitHub raw URL
const githubUrl = `https://raw.githubusercontent.com/${RESUME_REPO}/${RESUME_BRANCH}/${RESUME_FILE_PATH}`;

console.log('🔍 Validating Resume Configuration...\n');

async function validateConfiguration() {
  console.log(`📂 Repository: ${RESUME_REPO}`);
  console.log(`🌿 Branch: ${RESUME_BRANCH}`);
  console.log(`📄 File: ${RESUME_FILE_PATH}`);
  console.log(`� Token: ${GITHUB_TOKEN ? '✅ Provided' : '❌ Not provided (public repos only)'}`);
  console.log(`�🔗 URL: ${githubUrl}\n`);
  
  console.log('⏳ Testing GitHub access...');
  
  try {
    // Prepare headers for authentication
    const headers = {
      'User-Agent': 'Terminal-Portfolio-Validator'
    };
    
    // Add authorization header if token is provided
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }
    
    const response = await fetch(githubUrl, { headers });
    
    if (response.ok) {
      const content = await response.text();
      console.log(`✅ Successfully accessed file!`);
      console.log(`📏 File size: ${content.length} characters`);
      
      // Basic YAML validation
      if (content.includes('cv:')) {
        console.log('✅ File appears to contain CV data');
      } else {
        console.log('⚠️  Warning: File doesn\'t appear to contain expected CV structure');
      }
      
      console.log('\n🎉 Configuration is valid! Your resume should load successfully.');
      
    } else if (response.status === 404) {
      console.log('❌ File not found (404)');
      console.log('\nPossible issues:');
      console.log('  • Repository name is incorrect');
      console.log('  • Branch name is incorrect');
      console.log('  • File path is incorrect');
      if (!GITHUB_TOKEN) {
        console.log('  • Repository is private (add VITE_GITHUB_TOKEN to .env.local)');
      } else {
        console.log('  • Token doesn\'t have access to this repository');
      }
      
    } else if (response.status === 401) {
      console.log('❌ Authentication failed (401)');
      console.log('  • GitHub token is invalid or expired');
      
    } else if (response.status === 403) {
      console.log('❌ Access forbidden (403)');
      console.log('  • Token doesn\'t have sufficient permissions');
      console.log('  • Repository access denied');
      
    } else {
      console.log(`❌ HTTP Error: ${response.status} ${response.statusText}`);
    }
    
  } catch (error) {
    console.log(`❌ Network Error: ${error.message}`);
    console.log('\nPossible issues:');
    console.log('  • No internet connection');
    console.log('  • GitHub is unavailable');
    console.log('  • Invalid repository format');
  }
}

validateConfiguration();
