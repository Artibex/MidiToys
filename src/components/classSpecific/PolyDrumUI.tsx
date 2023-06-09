import { createSignal, createEffect } from "solid-js";
import { CanvasManager } from "@canvasmanager";
import { ToyManager } from "@toymanager";
import * as utils from "@utils";
import * as ui from "@ui"

var tManager = new ToyManager();
const canvasManager = new CanvasManager();

export default function SetupContainer( props: {channel: number}) {
    var channel = props.channel;
    var toy;
    var updateToy = false;

    const [useEffect, setUseEffect] = createSignal(true);
    const [toyTypeName, setToyTypeName] = createSignal("ToyType");


    //Special settings
    const [shapeLimit, setShapeLimit] = createSignal(20);
    const [polySides, setPolySides] = createSignal(3);
    const [startSize, setStartSize] = createSignal(500);
    const [xSizeChange, setXSizeChange] = createSignal(0.98);
    const [ySizeChange, setYSizeChange] = createSignal(0.98);

    const [xSpawnScale, setXSpawnScale] = createSignal(1);
    const [ySpawnScale, setYSpawnScale] = createSignal(1);

    const [alphaDecrease, setAlphaDecrease] = createSignal(0);
    const [rotationSpeed, setRotationSpeed] = createSignal(0.01);
    const [strokeWidth, setStrokeWidth] = createSignal(10);
    const [strokeWidthDecrease, setStrokeWidthDecrease] = createSignal(1);
    const [xSpawnOffset, setXSpawnOffset] = createSignal(1);
    const [ySpawnOffset, setYSpawnOffset] = createSignal(1);

    createEffect(() => {
        if(useEffect()) {
            UpdateToyValues();
        }
    })

    function UpdateComponent() {
        // console.log("UPDATE PolyDrum toy");
        LoadToy();
    }

    const ToyChanged = () => {
        // Handle the event...
        // console.log("DEFAULT UI event");
        setUseEffect(false);
        UpdateUIValues();
        setUseEffect(true);
    };

    function LoadToy() {
        var t = utils.InitToy(channel, toy, UpdateComponent);
        if(toy != t) {
            toy = t;
            toy.SubscribeToToyChangedEvent(UpdateUIValues);
            UpdateUIValues();
        }
    }

    function UpdateUIValues() {
        // console.log("UPDATE SPECIAL UI values");
        if (typeof window !== 'undefined') {
            toy = utils.InitToy(channel, toy, ToyChanged);

            if(toy != undefined) {
                setUseEffect(false);

                setToyTypeName(toy.toyType);
                setShapeLimit(toy.shapeLimit);
                setPolySides(toy.polySides);
                setStartSize(toy.startSize);
                setXSizeChange(toy.xSizeChange);
                setYSizeChange(toy.ySizeChange);
                setXSpawnScale(toy.xSpawnScale)
                setYSpawnScale(toy.ySpawnScale);

                setAlphaDecrease(toy.alphaDecrease);
                setRotationSpeed(toy.rotationSpeed);
                setStrokeWidth(toy.strokeWidth);
                setStrokeWidthDecrease(toy.strokeWidthDecrease);
                setXSpawnOffset(toy.xSpawnOffset);
                setYSpawnOffset(toy.ySpawnOffset);

                setUseEffect(true);
            }
        }
    }
    
    function UpdateToyValues() {
        // console.log("UPDATE PolyDrum toy values");
        if (typeof window !== 'undefined') {

            if(toy != undefined) {
                //Remove old objects
                // toy.RemoveChildrenFromLayer();

                toy.shapeLimit = shapeLimit();
                toy.polySides = polySides();
                toy.startSize = startSize();
                toy.xSizeChange = xSizeChange();
                toy.ySizeChange = ySizeChange();
                toy.xSpawnScale = xSpawnScale();
                toy.ySpawnScale = ySpawnScale();

                toy.alphaDecrease = alphaDecrease();
                toy.rotationSpeed = rotationSpeed();
                toy.strokeWidth = strokeWidth();
                toy.strokeWidthDecrease = strokeWidthDecrease();
                toy.xSpawnOffset = xSpawnOffset();
                toy.ySpawnOffset = ySpawnOffset();

                //Reload Keyboard
                try{
                    if(updateToy) toy.SetupKeyboard();
                    else updateToy = true;
                } catch {}
            }
        }
    }

    function RenderUI() {
        return(
            <>
                <ui.NumberSliderUIElement 
                    name={"Shape Limit"}
                    minMaxStep={[1,100,1]}
                    value={shapeLimit()}
                    onChange={setShapeLimit}
                />
                <ui.NumberSliderUIElement 
                    name={"Poly Sides"}
                    minMaxStep={[2,20,1]}
                    value={polySides()}
                    onChange={setPolySides}
                />
                <ui.NumberSliderUIElement 
                    name={"Rotation Speed"}
                    factor={100}
                    minMaxStep={[-1000,1000,1]}
                    value={rotationSpeed()}
                    onChange={setRotationSpeed}
                />
            <br></br>
            <ui.NumberSliderUIElement 
                    name={"Start Size"}
                    minMaxStep={[1,1000,1]}
                    value={startSize()}
                    onChange={setStartSize}
                />   
            <ui.NumberSliderUIElement 
                    name={"Stroke Size"}
                    minMaxStep={[1,200,1]}
                    value={strokeWidth()}
                    onChange={setStrokeWidth}
                />                             
            <br></br>
            <ui.NumberSliderUIElement 
                    factor={100}
                    name={"X Scale Start"}
                    minMaxStep={[50,300,1]}
                    value={xSpawnScale()}
                    onChange={setXSpawnScale}
                />
            <ui.NumberSliderUIElement 
                    factor={100}
                    name={"Y Scale Start"}
                    minMaxStep={[50,300,1]}
                    value={ySpawnScale()}
                    onChange={setYSpawnScale}
                />

            <br></br>
            <ui.NumberSliderUIElement 
                    factor={100}
                    name={"X Scale Change"}
                    minMaxStep={[50,120,1]}
                    value={xSizeChange()}
                    onChange={setXSizeChange}
                />
            <ui.NumberSliderUIElement 
                    factor={100}
                    name={"Y Scale Change"}
                    minMaxStep={[50,120,1]}
                    value={ySizeChange()}
                    onChange={setYSizeChange}
                />
            <br></br>
            <ui.NumberSliderUIElement 
                    factor={100}
                    name={"Stroke Change"}
                    minMaxStep={[50,120,1]}
                    value={strokeWidthDecrease()}
                    onChange={setStrokeWidthDecrease}
                />    
            <ui.NumberSliderUIElement 
                    factor={100}
                    name={"Alpha Change"}
                    minMaxStep={[0,10,1]}
                    value={alphaDecrease()}
                    onChange={setAlphaDecrease}
                />    
            <br></br>
            <ui.NumberSliderUIElement 
                    factor={100}
                    name={"X SpawnOffset"}
                    minMaxStep={[0,200,1]}
                    value={xSpawnOffset()}
                    onChange={setXSpawnOffset}
                />    
            <ui.NumberSliderUIElement 
                    factor={100}
                    name={"Y Spawn Offset"}
                    minMaxStep={[0,200,1]}
                    value={ySpawnOffset()}
                    onChange={setYSpawnOffset}
                />    
            </>
        )
    }

    canvasManager.SubscribeOneFPS(UpdateComponent);
    return (
        // ui.DetailsFillerCenter(toy.toyType + " Settings", RenderUI());
        <ui.DetailsFillerCenter summeryName={toyTypeName() + " Settings"} content={RenderUI()} />
    )

}