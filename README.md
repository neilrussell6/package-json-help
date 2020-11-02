package.json help
---

> lists the available scripts in ``package.json``

### Installation

```bash
npm i -D package-json-help
```

### Usage

add to your NPM scripts (in ``package.json``) as follows:
```json
"scripts": {
    "help": "package-json-help.js",
    "_cmd1": "echo HELLO",
    "cmd2": "echo GOODBYE",
    ...
}
```

add a ``help.json`` file,
with keys corresponding to each "public" script in your ``package.json``
and values being the description for that script.

eg. given the above scripts, and the following ``help.json``:
```json
{
  "cmd1": "just says goodbye, in caps"
}
```

running this:
```bash
npm run help
```

will output something like:
```
available commands ...
cmd1    just says goodbye, in caps
```
