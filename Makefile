TARGET_DIR=gabay.mattermost-plugin-rtl.tar
TARGET=$TARGET_DIR.tar.gz

SOURCES=main.js plugin.json

all: $TARGET

clear:
	rm -rf $TARGET $TARGET_DIR

$TARGET: $SOURCES
	mkdir -p $TARGET_DIR
	cp $SOURCES $TARGET_DIR
	tar -czf $TARGET $TARGET_DIR
