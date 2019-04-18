class ConsoleEvent extends Event {
    constructor(user,score) {
        super();
        function* gen() {
            let t = 5;
            //wait
            while (t++ < 0) yield;
            let prev = user.score - score;
            let next = user.score;
            let text = user.name + " solved problem!";
            text += "    " + prev + "pts >" + next + "pts";
            let cons = new Console(text);
            world.Add(cons);
            while (t++ < 250) yield;
            cons.Remove();
            return;
        };
        this.itt = gen();
        this.func = this.itt;
    }
}