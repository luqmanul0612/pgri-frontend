#!/bin/bash

echo "Pulling latest code from Git..."
git pull || { echo "Git pull failed"; exit 1; }

echo "Installing dependencies..."
npm ci

echo "Building the app..."
npm run build
npm next build

echo "Restarting PGRI Frontend app with PM2..."
pm2 restart pgri-frontend
pm2 save
