Hypothetical examples of the API in action

```typescript
#!/usr/bin/env ts-node-script
import {Option, run, Handler, Builder, Validator} from '@cspotcode/cli';
class CommandOptions {
    @Option()
    force: boolean = false;
    @Option()
    input!: string;
}
class Command extends CommandOptions {
    async [Validator]() {
        
    }
    [Builder]() {

    }
    async [Handler]() {
      
    }
    // or static implementations
    static async [Handler](args: CommandOptions) {
    
    }
    // or use assignment
    static [Handler] = main;
}

// Or attach them to a plain function?
main[Validator] = function(args: CommandOptions) {

}

// Benefit of a plain function is that you have a plain JS API, too.
export function main(args: CommandOptions) {
    
}
main({
    input: '/foo/bar.txt',
    force: true,
});
```

Stripped down example of writing a shell script:
```typescript
#!/usr/bin/env ts-node-script
import {Option, run, Handler} from '@cspotcode/cli';
class Options {
    @Option()
    input!: string;
    @Option()
    force: boolean = false;
    [Handler] = main;
}
run(Options, async (args) => {
    
});
```
