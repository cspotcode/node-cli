In powershell, you declare the inputs of a script using native syntax.  Then type `./myscript.ps1 <tab>` and get completions.
This happens automatically, because the shell immediately parses `./myscript.ps1` and reads this native syntax to know which flags are available.

```
#!/usr/bin/env pwsh
param(
  <# params declared here, with types, descriptions, optional/required, etc #>
  [string]$input,
  [Switch]$force
)

// ...the rest of ./myscript.ps1...
```

Can we achieve the same with node CLI tools and a bash tab completion handler?

Bash supports a "default" completer which is invoked whenever no other completion handler is installed.
This is the `_completion_loader` function, which is installed as default completer via `complete -D _completion_loader`.

We can install a hook here which automatically installs and removes completers.  It will check if the target script is complete-able via a directive at the top of the script.
Something like this:

```
#!/usr/bin/env ts-node-script
//#bash-auto-completion
import {Option, run} from '@cspotcode/cli';
// ...
```

When our completion loader hook is called, it resolves the target, checks if it's an executable text file with that directive, then auto-installs our completer function.
Our completer function will also *uninstall* itself if it senses it is no longer pointed at a file with that directive.  For example, completions for `./build` are
no longer valid if you `cd` to a directory without a `./build` script.

Our completer function can be fully generic: It invokes the target with a well-known environment variable or CLI flags, and parses the output as completions.
This matches how tools like `yargs` provide completions.

https://stackoverflow.com/a/15859036/531727
