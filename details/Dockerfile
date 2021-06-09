FROM ruby:2.7.1

WORKDIR /usr/src/app
COPY Gemfile /usr/src/app
RUN bundle install
COPY server.rb /usr/src/app
EXPOSE 8080
CMD ["ruby", "server.rb"]