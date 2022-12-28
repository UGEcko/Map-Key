import { Environment, LOOKUP } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"

export class multiEnv {
    /**
     * A class to aid in the manipulation of multiple environment pieces at once.
     * @param ids The ids for your environment pieces. Including the lookup that should be used for each.
     * @param forEach The code to execute on each env piece.
     */
    constructor(public ids: [string, LOOKUP][], public forEach?: (x: Environment) => void){
        this.ids = ids;
        this.forEach = forEach;
    }
    /**
     * Pushes the envs to the diff.
     */
    push(){
        this.ids.forEach(x =>{
            const env = new Environment(x[0],x[1]);
            if(this.forEach){
                this.forEach(env);
            }
        })
    }
}