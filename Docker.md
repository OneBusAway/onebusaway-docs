## Docker Development Environment

---

### Windows
**Prerequisites**
|  Name | Version | Installation |
| --- | --- | --- |
| Git | Latest | [Download & Install](https://git-scm.com/downloads) |
| Docker | Latest | [Follow this guide to install](https://docs.docker.com/desktop/install/windows-install/) |

**Steps to setup**
1. Fork current repository 
 2. Clone the forked repository
    ```bash
    git clone https://github.com/<username>/onebusaway-docs.git
    ```
3. Open `OneBusAway` directory
4. Open `PowerShell` in the current directory
5. Run 
    ```bash
    docker compose up
    ```
6. Wait for the docker container to be prepared
7. Navigate to `http://localhost:4000` in your browser

If you required to restart the server
- Type `Ctrl+C` in terminal to stop the server
- Run `docker compose up` to start the server again

---

### Linux
**Prerequisites**
|  Name | Version | Installation |
| --- | --- | --- |
| Git | Latest | [Download & Install](https://git-scm.com/downloads) |
| Docker Desktop | Latest | [Follow this guide to install](https://docs.docker.com/desktop/install/linux-install/) |
| Docker Engine | Latest | [Follow this guide to install](https://docs.docker.com/engine/install/) |

**NOTE:** You can install any of Docker Desktop or Docker Engine.

**Steps to setup**
1. Fork current repository
2. Clone the forked repository
    ```bash
    git clone https://github.com/<username>/onebusaway-docs.git
    ```
3. Open `OneBusAway` directory
4. Open `Terminal` in the current directory
5. Run 
    ``` bash
    docker compose up
    ```

If you required to restart the server
- Type `Ctrl+C` in terminal to stop the server
- Run `docker compose up` to start the server again

---

### macOS
**Prerequisites**
|  Name | Version | Installation |
| --- | --- | --- |
| Git | Latest | [Download & Install](https://git-scm.com/downloads) |
| Docker | Latest | [Follow this guide to install](https://docs.docker.com/desktop/mac/install/) |

**Steps to setup**
1. Fork current repository
2. Clone the forked repository
    ```bash
    git clone https://github.com/<username>/onebusaway-docs.git
    ```
3. Open `OneBusAway` directory
4. Open `Terminal` in the current directory
5. Run 
    ```bash
    docker compose up
    ```
If you required to restart the server
- Type `Ctrl+C` in terminal to stop the server
- Run `docker compose up` to start the server again

---