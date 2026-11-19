class SoundManager {

    static #myself;

    constructor() {
        if(SoundManager.#myself) {
            return SoundManager.#myself;
        }
        this.deathAudio = new Audio("/audios/dog-death.mp3");
        this.hitAudio = new Audio("/audios/dog-hit.mp3"); 
        SoundManager.#myself = this;
    }

    static instance() {
        if(!SoundManager.#myself) {
            return new SoundManager();
        }
        return SoundManager.#myself;
    }

    receiveEvent(event) {
        switch(event.type) {
            case Event.DogIsDeadEvent:
                this.deathAudio.play();
                break;
            case Event.DogHitEvent:
                this.hitAudio.play();
                break;
        }
    }

}