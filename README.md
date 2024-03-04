# OneBusAway Developer Documentation

Welcome to the GitHub project that powers the official [OneBusAway Developer Documentation](http://developer.onebusaway.org).

## Improve the Documentation

Want to help improve the documentation? Thank you! You can easily improve the official OneBusAway documentation by modifying the Markdown files that comprise it. We welcome any size of contribution, ranging from typos and corrected links, to brand-new tutorials.

## Develop New Features/Fix Bugs

### Prerequisites

Ensure you have the following installed on your system:

- [Ruby](https://www.ruby-lang.org/en/downloads/) (version >= 2.7)
- [Node.js](https://nodejs.org) (version >= 12)
- [Yarn](https://yarnpkg.com)

### Setting Up Development Environment

#### For Windows Users (via Windows Subsystem for Linux - WSL)

1. Install the [Windows Subsystem for Linux (WSL)](https://gorails.com/setup/windows/10) if you haven't already.
2. After setting up WSL, navigate to the project directory in your Linux subsystem.
3. Fork the repository by clicking the "Fork" button on the [repository page](https://github.com/OneBusAway/onebusaway-docs).
4. Clone the forked repository:

    ```sh
    git clone https://github.com/YourUsername/onebusaway-docs.git
    cd onebusaway-docs
    ```

5. Install dependencies:

    ```sh
    bundle install
    yarn install
    ```

    If you encounter any errors, you may run:

    ```sh
    yarn add glob
    ```

6. If CSS is not working properly, rebuild frontend assets:

    ```sh
    bin/bridgetown frontend:build
    ```

#### For Linux Users

1. Fork and clone the repository as described above.
2. Navigate to the project directory.
3. Install dependencies:

    ```sh
    bundle install
    yarn install
    ```

### Development

To start the site in development mode, run:

```sh
bin/bridgetown start
```

### Additional Commands

Load the site up within a Ruby console (IRB)

```sh
bin/bridgetown console
```

> Learn more: [Bridgetown CLI Documentation](https://www.bridgetownrb.com/docs/command-line-usage)

## Deployment

The website built from this project is deployed automatically to a static hosting service on [Render](https://www.render.com). Please contact the maintainers with any questions.
