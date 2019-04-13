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
            while (t++ < timeRange) {
                let p = vec3(0);
                let amp = Math.exp(-t/10)*5.0;
                p.x = Rand(amp);
                p.y = Rand(amp);
                p.z = Rand(amp);
                camera.quakeOffset = p;
                yield;
            }
            return;
        };

        this.itt = gen();
        this.func = this.itt;
    }
}