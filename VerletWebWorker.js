let verlet;

self.addEventListener('message', function(e) {

    switch(e.data.func) {

        case "initialize":
            verlet = new VerletIntegration({
                constraintSnapCallback: e.data.constraintSnapped
            });
            break;

        case "setGravity":
            verlet.gravity = e.data.val;
            break;

        case "setIterations":
            verlet.iterations = e.data.val;
            break;

        case "setStageFriction":
            verlet.stageFriction = e.data.val;
            break;

        case "setUseMass": 
            verlet.useMass = e.data.val;
            break;
        
        case "runTimeStep":
            verlet.runTimeStep();

            self.postMessage({
                func: "particles",
                val: verlet.particles
            });

            self.postMessage({
                func: "constraints",
                val: verlet.constraints
            });

            break;

        case "addParticle":
            verlet.addParticle(e.data.val);
            break;

        case "addConstraint":
            verlet.addConstraint(e.data.val);
            break;
    }
}, false);