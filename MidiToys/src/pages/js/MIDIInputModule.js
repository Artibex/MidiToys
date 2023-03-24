//Takes input from a MIDI capable device and sends it into the InputManager

export class MIDIInputModule 
{
    inputManager;

    constructor(inputManager) {
        this.inputs = [];
        this.inputDevices = [];
        this.inputManager = inputManager; 

        // navigator.requestMIDIAccess();
        this.ConnectMIDIDevice();

        //setTimeout(this.GetMIDIInputs(), 2000);
        this.GetMIDIInputs();
      }

    ConnectMIDIDevice() {
        if (navigator.requestMIDIAccess) {
          navigator.requestMIDIAccess()
          .then((midiAccess) => {
              for (let input of midiAccess.inputs.values()) {
                this.inputs.push(input);
                this.inputDevices.push(input.name);
                
                //console.log(input.name);
              input.onmidimessage = this.HandleMidiMessage.bind(this);
            }
          });
      } else {
        console.log('WebMIDI is not supported in this browser.');
      }
    }

    HandleMidiMessage(message) {
        //console.log("HANDLE MIDI Message");
        this.inputManager.GetMIDIInput(message);
      }

    GetMIDIInputs() {
      // console.log("Available MIDI Devices:" + this.inputDevices);
      // console.log(this.inputDevices);
      // console.log(this.inputDevices[0]);
      return this.inputDevices;
      // for(let i = 0; i < this.inputDevices.length; i++) {
      //   console.log(this.inputDevices[i]);
      //   console.log("WRITE midi device name");
      // }

  }
}