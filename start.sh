#!/bin/bash

echo "Starting PGRI Frontend app with PM2..."
pm2 start ecosystem.config.js
pm2 save
