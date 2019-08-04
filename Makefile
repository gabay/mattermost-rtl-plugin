TARGET_DIR=gabay.mattermost-plugin-rtl
TARGET=$(TARGET_DIR).tar.gz

SOURCES=main.js plugin.json

all: $(TARGET)

clear:
	rm -rf $(TARGET) $(TARGET_DIR)

$TARGET: $(SOURCES)
	mkdir -p $(TARGET_DIR)
	cp $^ $(TARGET_DIR)
	tar -czf $@ $(TARGET_DIR)
