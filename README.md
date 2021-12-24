# Serve remote git branches as REST API

> **Warning:** A work in progress

It executes `git ls-remote` command, and return the result as JSON or TXT.

It can be helpful for integration with [Jenkins](https://www.jenkins.io/) Parameter plugin.

```txt
$ curl http://localhost:8080/api/v1/repos/kingsimba/nc-runtime/branches
["master","message_loop"]

$ curl http://localhost:8080/api/v1/repos/kingsimba/nc-runtime/branches?type=txt
master
message_loop

$ curl http://localhost:8080/api/v1/repos/kingsimba/xxxxxxx/branches?type=txt
{"error":"ERROR: Repository not found.\nfatal: Could not read from remote repository.\n\nPlease make sure you have the correct access rights\nand the repository exists.\n"}
```
