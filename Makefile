
all: dist/helloworld.pdf
	[ ! -d "dist/" ] && mkdir dist/ || echo
	node_modules/.bin/webpack
	cp index.html dist/
	cp node_modules/pdfjs-dist/es5/build/pdf.worker.js dist/
	cp node_modules/pdfjs-dist/es5/build/pdf.js dist/

dist/helloworld.pdf:
	wget -O dist/helloworld.pdf https://raw.githubusercontent.com/mozilla/pdf.js/master/examples/learning/helloworld.pdf

serve:
	python3 -m http.server

.PHONY: all serve
