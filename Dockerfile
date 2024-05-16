FROM ruby:3

WORKDIR /usr/src/app

RUN gem install jekyll bundler

COPY entrypoint.sh /entrypoint.sh

EXPOSE 4000
EXPOSE 35729

ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]
CMD ["bundle", "exec", "jekyll", "serve", "--livereload", "--host", "0.0.0.0"]
