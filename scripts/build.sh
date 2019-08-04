#!/bin/bash

TARGET_DIR=gabay.mattermost-rtl-plugin
TARGET=$(TARGET_DIR).tar.gz

./node_modules/.bin/webpack --mode=production

mkdir -p $(TARGET_DIR)
cp main.js plugin.json $(TARGET_DIR)
tar -czf $@ $(TARGET_DIR)
rm -rf $(TARGET_DIR)