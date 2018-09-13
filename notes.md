# Notes

* Add nodesource PPA
* sudo apt-get install node-js node-typescript
* Run `npm install -g vscode` (after global config for user)
* Run `npm install` in the source tree to get all the dependencies.
* Open this directory in vscode, then press f5 to launch debugger
* See https://code.visualstudio.com/docs/extensions/publish-extension
* Build the package locally with
  * `vsce package --baseImagesUrl https://raw.githubusercontent.com/cheshirekow/cmake_format_vscode/work` so
  that images work.
* Publish with
  * `vsce package --baseImagesUrl https://raw.githubusercontent.com/cheshirekow/cmake_format_vscode/work`
* In the above two cases, replace `<work>` with a branchname or leave it off
  to use master.