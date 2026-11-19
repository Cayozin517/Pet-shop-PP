class Dog {

    static #myself;

    constructor() {
        if (Dog.#myself) {
            return Dog.#myself;
        }
        this.name = "Bruce Twist";
        this.life = 500;
        this.screamed = false;

        this.dogIsDeadEvent = new Event(Event.DogIsDeadEvent, this.life);
        this.dogHitEvent = new Event(Event.DogHitEvent, this.life);
        this.dogIsDeadEvent.addObserver(InterfaceManager.instance());
        this.dogIsDeadEvent.addObserver(SoundManager.instance());
        this.dogHitEvent.addObserver(InterfaceManager.instance());
        this.dogHitEvent.addObserver(SoundManager.instance());

        Dog.#myself = this;


        this.state = new HappyState(this);
    }

    static instance() {
        if (!Dog.#myself) {
            return new Dog();
        }
        return Dog.#myself;
    }

    setState(newState) {
        this.state = newState;
    }

    receiveDamage(damage) {

        this.state.receiveDamage(damage);
    }
}