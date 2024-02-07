# OneBusAway Developer Documentation

Welcome to the GitHub project that powers the official [OneBusAway Developer Documentation](http://developer.onebusaway.org).

# Improve the Documentation

Want to help improve the documentation? Thank you! You can easily improve the official OneBusAway documentation by modifying the Markdown files that comprise it. We welcome any size of contribution, ranging from typos and corrected links, to brand-new tutorials.

# Develop New Features/Fix Bugs

## Prerequisites

* [Ruby](https://www.ruby-lang.org/en/downloads/) >= 2.7
* [Node](https://nodejs.org) >= 12
* [Yarn](https://yarnpkg.com)

## Install

```sh
git clone https://github.com/OneBusAway/onebusaway-docs.git
cd onebusaway-docs
bundle install && yarn install
```

## Development

To start your site in development mode, run `bin/bridgetown start` and navigate to [localhost:4000](https://localhost:4000/)!

### Commands

```sh
# running locally
bin/bridgetown start

# load the site up within a Ruby console (IRB)
bin/bridgetown console
```

> Learn more: [Bridgetown CLI Documentation](https://www.bridgetownrb.com/docs/command-line-usage)

## Deployment

The website built from this project is deployed automatically to a static hosting service on [Render](https://www.render.com). Please contact the maintainers with any questions.
