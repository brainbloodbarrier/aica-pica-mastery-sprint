#!/bin/bash

# WS2 Production Deployment Script
# Date: November 13, 2025
# Version: 2.0.0-ws2

set -e

echo "🚀 Starting WS2 Production Deployment..."

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BRANCH="ws2-core-features"
MAIN_BRANCH="main"
VERSION="2.0.0-ws2"
APP_DIR="web-app"

# Functions
check_branch() {
    current_branch=$(git branch --show-current)
    if [ "$current_branch" != "$MAIN_BRANCH" ]; then
        echo -e "${YELLOW}Warning: Not on main branch. Current branch: $current_branch${NC}"
        read -p "Continue anyway? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

run_tests() {
    echo "🧪 Running tests..."
    cd $APP_DIR

    # Install dependencies
    echo "📦 Installing dependencies..."
    npm install --legacy-peer-deps

    # Run unit tests
    echo "🔬 Running unit tests..."
    npm test -- --watchAll=false || {
        echo -e "${RED}❌ Tests failed!${NC}"
        exit 1
    }

    # Build check
    echo "🏗️ Building application..."
    npm run build || {
        echo -e "${RED}❌ Build failed!${NC}"
        exit 1
    }

    # Lint check
    echo "🔍 Running linter..."
    npm run lint || {
        echo -e "${YELLOW}⚠️ Linting warnings found${NC}"
    }

    cd ..
    echo -e "${GREEN}✅ All tests passed!${NC}"
}

deploy_staging() {
    echo "🎭 Deploying to staging..."
    cd $APP_DIR

    # Deploy to Vercel staging
    echo "📤 Pushing to Vercel staging..."
    vercel --prod=false --confirm || {
        echo -e "${RED}❌ Staging deployment failed!${NC}"
        exit 1
    }

    # Get staging URL
    STAGING_URL=$(vercel ls --json | jq -r '.[0].url')
    echo -e "${GREEN}✅ Staging deployed at: https://$STAGING_URL${NC}"

    cd ..

    # Open staging URL for testing
    echo "🌐 Opening staging URL..."
    open "https://$STAGING_URL" 2>/dev/null || xdg-open "https://$STAGING_URL" 2>/dev/null || echo "Please open: https://$STAGING_URL"
}

run_e2e_tests() {
    echo "🤖 Running E2E tests on staging..."
    cd $APP_DIR

    # Install Cypress if not present
    if ! command -v cypress &> /dev/null; then
        echo "Installing Cypress..."
        npm install cypress --save-dev
    fi

    # Run E2E tests against staging
    CYPRESS_BASE_URL="https://$STAGING_URL" npx cypress run || {
        echo -e "${YELLOW}⚠️ Some E2E tests failed. Review the results.${NC}"
        read -p "Continue to production? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    }

    cd ..
    echo -e "${GREEN}✅ E2E tests completed!${NC}"
}

deploy_production() {
    echo "🚀 Deploying to PRODUCTION..."
    echo -e "${YELLOW}⚠️ This will deploy to PRODUCTION. Are you sure?${NC}"
    read -p "Type 'DEPLOY' to confirm: " confirmation

    if [ "$confirmation" != "DEPLOY" ]; then
        echo -e "${RED}Deployment cancelled.${NC}"
        exit 1
    fi

    cd $APP_DIR

    # Create git tag
    echo "🏷️ Creating release tag..."
    git tag -a "v$VERSION" -m "Release: WS2 Core Features - $VERSION"
    git push origin "v$VERSION"

    # Deploy to production
    echo "📤 Deploying to Vercel production..."
    vercel --prod --confirm || {
        echo -e "${RED}❌ Production deployment failed!${NC}"
        exit 1
    }

    # Get production URL
    PROD_URL="aica-pica.vercel.app"
    echo -e "${GREEN}✅ Production deployed at: https://$PROD_URL${NC}"

    cd ..
}

monitor_deployment() {
    echo "📊 Monitoring deployment..."

    # Check if site is accessible
    echo "🔍 Checking site accessibility..."
    if curl -s -o /dev/null -w "%{http_code}" "https://$PROD_URL" | grep -q "200"; then
        echo -e "${GREEN}✅ Site is accessible!${NC}"
    else
        echo -e "${RED}❌ Site is not accessible!${NC}"
        echo "Rolling back..."
        vercel rollback --confirm
        exit 1
    fi

    # Open monitoring dashboard
    echo "📈 Opening monitoring dashboard..."
    open "https://vercel.com/dashboard" 2>/dev/null || echo "Please check: https://vercel.com/dashboard"

    # Show deployment summary
    echo ""
    echo "========================================="
    echo -e "${GREEN}🎉 DEPLOYMENT SUCCESSFUL!${NC}"
    echo "========================================="
    echo "Version: $VERSION"
    echo "Production URL: https://$PROD_URL"
    echo "Features deployed:"
    echo "  ✅ Hearts/Lives System"
    echo "  ✅ Neurons Currency"
    echo "  ✅ Confidence Rating"
    echo "  ✅ Spaced Repetition"
    echo "  ✅ Daily Goals"
    echo "  ✅ Achievements System"
    echo "  ✅ Enhanced Streaks"
    echo "  ✅ Review Dashboard"
    echo "========================================="
}

rollback() {
    echo -e "${RED}🔄 EMERGENCY ROLLBACK${NC}"
    cd $APP_DIR
    vercel rollback --confirm
    echo -e "${YELLOW}Rollback initiated. Check status at: https://vercel.com/dashboard${NC}"
    cd ..
}

# Main execution
main() {
    echo "========================================="
    echo "   WS2 Production Deployment Script"
    echo "   Version: $VERSION"
    echo "========================================="
    echo ""

    # Check prerequisites
    command -v node >/dev/null 2>&1 || { echo "Node.js is required but not installed."; exit 1; }
    command -v vercel >/dev/null 2>&1 || { echo "Vercel CLI is required. Install with: npm i -g vercel"; exit 1; }
    command -v git >/dev/null 2>&1 || { echo "Git is required but not installed."; exit 1; }

    # Menu
    echo "Select deployment option:"
    echo "1) Full deployment (staging → testing → production)"
    echo "2) Staging only"
    echo "3) Production only (dangerous!)"
    echo "4) Run tests only"
    echo "5) Emergency rollback"
    echo "6) Exit"

    read -p "Enter option (1-6): " option

    case $option in
        1)
            check_branch
            run_tests
            deploy_staging
            run_e2e_tests
            deploy_production
            monitor_deployment
            ;;
        2)
            check_branch
            run_tests
            deploy_staging
            ;;
        3)
            echo -e "${RED}⚠️ WARNING: Skipping staging!${NC}"
            check_branch
            run_tests
            deploy_production
            monitor_deployment
            ;;
        4)
            run_tests
            ;;
        5)
            rollback
            ;;
        6)
            echo "Deployment cancelled."
            exit 0
            ;;
        *)
            echo "Invalid option"
            exit 1
            ;;
    esac
}

# Run main function
main
