TARGET_DIR=gabay.mattermost-rtl-plugin
TARGET=$(TARGET_DIR).tar.gz

SOURCES=src/index.js plugin.json
BUNDLE_SOURCES=main.js plugin.json

all: $(TARGET)

clear:
	rm -f $(TARGET)

$(TARGET): $(SOURCES)
	./node_modules/.bin/webpack --mode=production
	mkdir -p $(TARGET_DIR)
	cp $(BUNDLE_SOURCES) $(TARGET_DIR)
	tar -czf $@ $(TARGET_DIR)
	rm -rf $(TARGET_DIR)
