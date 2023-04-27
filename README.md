# new-structure

CLI for creating new react file structure (component or hook).

## Installation

only use in your workspace:
``` sh
# npm
npm i new-structure -g
# yarn
yarn global add new-structure
# pnpm
pnpm add new-structure -g
```

tested in node 14+.

## Usage

in your project's directory, try creating a new component.
``` sh
new-structure NewComponent
```

or hook
``` sh
new-structure useMyHook -t hook
```

The default language is TypeScript. If your project is a JavaScript project, please try adding the `-l` or `--lang` option.
``` sh
new-structure NewComponent -l js
```

if you want to add a configuration file to the current project directory, please use:
``` sh
new-structure init
```

configuration file like this:
``` js
const config = {
  // Which language to use ('ts' or 'js')
  lang: 'ts',
  // structure type ('comp' or 'hook')
  type: 'comp',
  // components directory path
  componentDir: './src/components',
  // hooks directory path
  hookDir: './src/hooks'
}

module.exports = config
```

## Using a shorter alias​
`new-structure` might be hard to type, so you may use a shorter alias like `ns` instead.

### Adding a permanent alias on POSIX systems​
Just put the following line to your `.bashrc`, `.zshrc`, or `config.fish`:
``` sh
alias ns=new-structure
```
### Adding a permanent alias in Powershell (Windows):​
In a Powershell window with admin rights, execute:

``` sh
notepad $profile.AllUsersAllHosts
```

In the `profile.ps1` file that opens, put:

``` sh
set-alias -name ns -value new-structure
```