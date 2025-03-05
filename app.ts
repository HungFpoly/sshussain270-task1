import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

async function loadModel(scene: BABYLON.Scene, url: string) {
    return new Promise<BABYLON.AbstractMesh>((resolve, reject) => {
        BABYLON.SceneLoader.ImportMesh("", url, "", scene, (meshes) => {
            if (meshes.length > 0) {
                resolve(meshes[0]); // Trả về mesh gốc
            } else {
                reject("Không tìm thấy mesh nào");
            }
        });
    });
}

async function setupBabylon() {
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 3, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Load mannequin model
    const mannequin = await loadModel(scene, "assets/mannequin.glb");
    const mannequinSkeleton = scene.skeletons[0]; // Skeleton của mannequin

    // Load shirt model
    const shirt = await loadModel(scene, "assets/white_shirt.glb");

    // Adjust the position of the shirt
    shirt.position = new BABYLON.Vector3(0, 0.05, -0.13); // Change the coordinates as needed

    // Gán skeleton của mannequin cho áo
    if (shirt.skeleton && mannequinSkeleton) {
        shirt.skeleton = mannequinSkeleton;
    } else {
        console.error("Không tìm thấy skeleton");
    }

    // Chạy animation của mannequin và áo cùng hướng
    scene.animationGroups.forEach((anim) => {
        anim.targetedAnimations.forEach((targetAnim) => {
            if (targetAnim.target === mannequin || targetAnim.target === shirt) {
                anim.start(true, 0);
            }
        });
    });

    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener("resize", () => {
        engine.resize();
    });
}

setupBabylon();
