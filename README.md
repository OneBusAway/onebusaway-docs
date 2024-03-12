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
## Creating an issue.

- Check if the issue you are going to propose is not duplicate of another issue.
- Open a new issue according to type i.e., if issue is a bug open a new issue by clicking on `Get Started` in the scope of `Bug Report`.
- Give a precise and meaningful name of the issue.
- Describe your issue as good as possible that may ease the process of issue-reviewing by a community member.

## Create a pull request

- Try to keep the pull requests small. A pull request should try its very best to address only a single concern.
- For work in progress pull requests, please use the Draft PR feature.
- Make sure all tests pass and add additional tests for the code you submit.
- Document your reasoning behind the changes. Explain why you wrote the code in the way you did. The code should explain what it does.
- If there's an existing issue, reference to it by adding something like `References/Closes/Fixes/Resolves #123`, where 123 is the issue number. 
- Please fill out the PR Template when making a PR.

> Please note: maintainers may close your PR if it has gone stale or if we don't plan to merge the code.

## Pull request reviews
- Requested changes must be resolved (with code or discussion) before merging.
- If you make changes to a PR, be sure to re-request a review.
- Don't repeadetely tag someone(may be it is not the right time to review your PR), be patient.
- Do not 'resolve conversation' unnecessary raised by a community member or any workflow tools(codeclimate or hound) as they may have some purpose, try to resolve the request changes and if any help wanted tag a community member to give views about that.


### Code Contributors

This project exists because of all the people who have contributed.

<a href="https://github.com/OneBusAway/onebusaway-docs/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=OneBusAway/onebusaway-docs" />
</a>


## The bottom line

We are all humans trying to work together to improve the community. Let's always be kind and appreciate the importance of making compromises. ❤️




