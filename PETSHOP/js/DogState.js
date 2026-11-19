
class DogState {
    constructor(dog) {
        this.dog = dog;
    }

    receiveDamage(damage) {}
}

// estado eeliz 
class HappyState extends DogState {
    constructor(dog) {
        super(dog);
        InterfaceManager.instance().setHappyDogFace();
    }

    receiveDamage(damage) {
        this.dog.life = Math.max(this.dog.life - damage, 0);
        this.dog.dogHitEvent.data = this.dog.life;

        if (this.dog.life === 0) {
            this.dog.dogIsDeadEvent.raise();
            this.dog.setState(new DeadState(this.dog));
        } else {
            this.dog.dogHitEvent.raise();
            this.dog.setState(new HurtState(this.dog));
        }
    }
}

// machucado (temporario, volta ao feliz em 250ms)
class HurtState extends DogState {
    constructor(dog) {
        super(dog);
        InterfaceManager.instance().setHitDogFace();

        setTimeout(() => {
            // so volta a ficar feliz se n tiver morto nesse meio tempo  
            if (this.dog.life > 0) {
                this.dog.setState(new HappyState(this.dog));
            }
        }, 250);
    }

    receiveDamage(damage) {
        this.dog.life = Math.max(this.dog.life - damage, 0);
        this.dog.dogHitEvent.data = this.dog.life;

        if (this.dog.life === 0) {
            this.dog.dogIsDeadEvent.raise();
            this.dog.setState(new DeadState(this.dog));
        } else {
            this.dog.dogHitEvent.raise();
            // reinicia o estado machucado
            this.dog.setState(new HurtState(this.dog));
        }
    }
}

// estado morto (n sofre mais dano)
class DeadState extends DogState {
    constructor(dog) {
        super(dog);
        InterfaceManager.instance().setDeadDogFace();
    }

    receiveDamage(damage) {

        console.log(`${this.dog.name} já está morto e não pode mais receber dano.`);
    }
}