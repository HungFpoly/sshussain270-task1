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
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 3,
    5,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  // Load mannequin model
  await loadModel(scene, "assets/test.glb");
  // Chạy animation của mannequin
  scene.animationGroups.forEach((anim) => anim.start(true, 1.0));

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });
}

setupBabylon();
