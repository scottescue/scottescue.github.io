docker build -t jekyll:scott-escue .
docker run --rm -v "$PWD:/usr/src/app" -p 4000:4000 jekyll:scott-escue
