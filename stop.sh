#!/bin/bash

echo "Stopping PGRI Frontend app with PM2..."
pm2 stop pgri-frontend
pm2 delete pgri-frontend
