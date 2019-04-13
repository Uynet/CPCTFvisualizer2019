class CameraEffect extends Event {
    constructor(camera) {
        super();
        /*
        const side = normalize(cross(camera.forward, camera.up));
        let up = normalize(cross(camera.forward, side));
        let forward = normalize(camera.forward);
        */
        function* gen() {
            let t = 0;
            let timeRange = 150;
            while (t++ < 10) {
                let p = vec3(0);
                let f = normalize(camera.forward);
                let amp = Math.exp(-t/4)*15.0;
                f = scala(amp,f);
                p = add(p,f);
                camera.quakeOffset = p;
                yield;
            }
            while (t++ < timeRange) {
                let p = vec3(0);
                let amp = Math.exp(-t/10)*5.0;
                p.x = Rand(amp);
                p.y = Rand(amp);
                p.z = Rand(amp);
                camera.quakeOffset = p;
                yield;
            }
            camera.quakeOffset = vec3(0);
            return;
        };

        this.itt = gen();
        this.func = this.itt;
    }
}