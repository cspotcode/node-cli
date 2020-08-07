/// <reference path="./declarations.d.ts" />
import {Yargs, OptionDefinition, YargsInstance} from 'yargs/build/lib/yargs';
import {omit} from 'lodash';
import * as assert from 'assert';

export const META = Symbol();
export const HANDLER = Symbol();

/**
 * Describes how we attach metadata in our decorators
 */
interface ArgumentsClassPrototype {
    [META]: CommandMeta;
}

class CommandMeta {
    options: Record<string, OptionDefinition> = Object.create(null);
    optionNameToInternalNameMapping: Record<string, string> = Object.create(null);
    command = {};
}

// TODO support chaining for flags, e.g. Option.Required, or Option.Optional
export function Option(optionDefinition: OptionDefinition & {name?: string}): PropertyDecorator {
    return (_target: object, _propertyKey) => {
        const propertyKey = _propertyKey as string;
        assert(typeof propertyKey === 'string');
        const target = _target as ArgumentsClassPrototype;
        if(!target[META]) target[META] = new CommandMeta();
        const meta = target[META];
        const cliArgName = optionDefinition.name ?? propertyKey as string;
        meta.options[cliArgName] = omit(optionDefinition, 'name');
        meta.optionNameToInternalNameMapping[cliArgName] = propertyKey as string;
    }
}

interface ZeroArgConstructor<T> {
    new (): T;
}

interface CommandOptions<Args> {
    name: string;
    argsType: ZeroArgConstructor<Args>;
    __yargs__(yargs: YargsInstance): YargsInstance;
}
function command<Args>(commandOptions: CommandOptions<Args>) {

}

export function cli(cliOptions: {
    name: string;
    version: string;
    usage: boolean;
    strict: boolean | 'commands-only';
    completion: boolean;
    __yargs__(yargs: YargsInstance): YargsInstance;
}) {
    const cli = Yargs().strict().demandCommand().completion().command('* <foo> <bar>', 'do stuff', yargs => {
        yargs.positional('foo', {
            demand: false as any as undefined
        })
    });
    const args = cli.parse();
    console.log(args);
}



function prototypeChainToArray(target: any): any[] {
    const ret = [];
    let a = target;
    while(true) {
        ret.push(a);
        a = Object.getPrototypeOf(a);
        if(!a) break;
    }
    return ret;
}