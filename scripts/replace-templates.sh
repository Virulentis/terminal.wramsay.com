#!/bin/bash

# Script to replace template placeholders locally (mirrors GitHub Actions workflow)

RESUME_FILE_PATH='William_Ramsay_CV.yaml'

echo "🔄 Starting template replacement..."

# Read the CV YAML file and extract name and location
if [ -f "$RESUME_FILE_PATH" ]; then
    echo "✓ Using local CV file: $RESUME_FILE_PATH"
    NAME=$(grep -m 1 "name:" "$RESUME_FILE_PATH" | sed 's/.*name: //' | sed 's/["'\'']//' | xargs)
    LOCATION=$(grep -m 1 "location:" "$RESUME_FILE_PATH" | sed 's/.*location: //' | sed 's/["'\'']//' | xargs)
else
    echo "⚠️  CV file not found, using fallback values"
    NAME="William Ramsay"
    LOCATION="Vancouver, BC"
fi

echo "📝 Name: $NAME"
echo "📍 Location: $LOCATION"

# Check if index.html has placeholders
if grep -q "{{DEVELOPER_NAME}}" index.html; then
    echo "🔍 Found placeholders in index.html, replacing..."
    
    # Replace placeholders in index.html
    sed -i.bak "s/{{DEVELOPER_NAME}}/$NAME/g" index.html
    sed -i.bak "s/{{DEVELOPER_LOCATION}}/$LOCATION/g" index.html
    
    echo "✅ Template placeholders replaced successfully"
    echo "💾 Backup saved as index.html.bak"
else
    echo "ℹ️  No placeholders found in index.html (already replaced or different format)"
fi

echo "🎉 Template replacement complete!"