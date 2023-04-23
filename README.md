# new-structure

CLI for creating new react file structure (component or hook)

## Installation


only use in your workspace
``` bash
# npm
npm i new-structure -g
# yarn
yarn global add new-structure
# pnpm
pnpm add new-structure -g
```


## Usage

in your project's directory, try creating a new component
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

## Using a shorter alias​
`new-structure` might be hard to type, so you may use a shorter alias like `ns` instead.

### Adding a permanent alias on POSIX systems​
Just put the following line to your `.bashrc`, `.zshrc`, or `config.fish`:
```sh
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