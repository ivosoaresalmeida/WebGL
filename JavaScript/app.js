document.addEventListener('DOMContentLoaded', Start);

//Variables
{
var scene;
var Ambient;
var camera;
var controls;
var renderer; 
var geometry;
var material;
var enviornment;
var materialArray = [];
var loader;
var front = false, back=false, left = false, right=false;
var up = false, down = false;
var Moon;
var Sphere;
var TableGeometry;
var TableMaterial;
var Table;
var lightBSLGeometry;
var lightBSLMaterial;
var lightBSLL,lightBSLD;
var lightBSL;
var SpeakerBase2;
var objetoImportado;
var mixerAnimacao;
var relogio;
var importer;
var light;
var Drone;
var orbitRadius = 9000; 
var date;
}

//Controls
{
    document.addEventListener('keyup',ev=>{
        switch(ev.keyCode)
        {
            case 87: //w 
                front = false;
                break;
    
            case 83: //s 
                back = false;
                break;
    
            case 68: //d 
                right = false;
                break;
    
            case 65: //a 
                left = false;
                break;
    
            case 32: //space
                up = false;
                break;
    
            case 16: //shift
                down = false;
                break;
        }
    })
    
    document.addEventListener('keydown',ev=>{
        switch(ev.keyCode)
        {
            case 87: //w 
                front = true;
                break;
    
            case 83: //s 
                back = true;
                break;
    
            case 68: //d 
                right = true;
                break;
    
            case 65: //a 
                left = true;
                break;
    
            case 32: //space
                up = true;
                break;
    
            case 16: //shift
                down = true;
                break;
    
            case 13: 
                if(ortografica)
                    ortografica = false;
                else ortografica = true;
    
                newcamera = true;
                break;

            case 76: //L
                //Luzes do palco ON
                var vcolor = getRandomColor();

                scene.remove(lightBSL);
                lightBSL = new THREE.SpotLight(vcolor, 3); 
                lightBSL.position.set(-10000, 5000, -20000);
                lightBSL.angle = Math.PI/5;
                var pointG = new THREE.CircleBufferGeometry(1,1,1);
                var pointM = new THREE.MeshBasicMaterial({color: 0x000000});
                var point = new THREE.Mesh(pointG, pointM);
                point.position.set(15000, 10000, -20000);
                scene.add(point);
                lightBSL.target = point;
                scene.add(lightBSL);

                scene.remove(lightBSLL);
                scene.remove(lightBSLD);

                lightBSLGeometry = new THREE.CircleBufferGeometry(600, 1000);
                lightBSLMaterial = new THREE.MeshBasicMaterial({color: vcolor});

                lightBSLL = new THREE.Mesh(lightBSLGeometry, lightBSLMaterial);
                lightBSLL.position.set(-6103, 3000, -13800);
                lightBSLL.rotation.y = Math.PI/2;
                scene.add(lightBSLL); 

                lightBSLD = new THREE.Mesh(lightBSLGeometry, lightBSLMaterial);
                lightBSLD.position.set(-6103, 3000, -26300);
                lightBSLD.rotation.y = Math.PI/2;
                scene.add(lightBSLD);

                break;
                
            case 75: //K
                //Luzes do palco OFF
                scene.remove(lightBSL);
                scene.remove(lightBSLL);
                scene.remove(lightBSLD);

                lightBSL = new THREE.DirectionalLight('#ffffff', 0.25); 
                lightBSL.position.set(-10000, 10000, -20000);
                //lightBSL.lookAt(Table.position);
                scene.add(lightBSL);
                Lights();
                break;
         
            case 74: //J
                /*Todas as Luzes OFF
                scene.remove(lightSphere);
                scene.remove(lightBSL);
                scene.remove(lightBSLL);
                scene.remove(lightBSLD);
                scene.remove(light);
                scene.remove(Ambient);
                Lights();*/
                break;    
                
            case 49: //1
                    Drone.position.y += 50;
                break;

            case 50: //2
                if(Drone.position.y >= 50)
                {
                    Drone.position.y -= 50;
                }
                break;

            
        }
    }) 
    
    document.addEventListener('click', ev=>{
        if(!controls.isLocked)
            controls.lock();
    })
}

function Create_SandePlane()
{
    geometry = new THREE.PlaneGeometry(100000, 100000);

    var FloorSandeTexture = loader.load('./Textures/Sand.jpg');
    FloorSandeTexture.wrapS = FloorSandeTexture.wrapT = THREE.RepeatWrapping;
    FloorSandeTexture.repeat.set(250, 250);
    FloorSandeTexture.anisotropy = 16;
    FloorSandeTexture.encoding = THREE.sRGBEncoding;
    material = new THREE.MeshPhongMaterial({map: FloorSandeTexture});
    material.side = THREE.DoubleSide;
    enviornment = new THREE.Mesh(geometry, material); 

    enviornment.name = "Sand";
    enviornment.rotation.x = - Math.PI / 2; 
    enviornment.position.set(0,0,0);
    enviornment.receiveShadow = true; 

    scene.add(enviornment);  
}

function Create_WaterPlane()
{
    geometry = new THREE.PlaneGeometry(100000, 100000);

    
    var FloorWaterTexture = loader.load('./Textures/Water.jpg');
    FloorWaterTexture.wrapS = FloorWaterTexture.wrapT = THREE.RepeatWrapping;
    FloorWaterTexture.repeat.set(250, 250);
    FloorWaterTexture.anisotropy = 16;
    FloorWaterTexture.encoding = THREE.sRGBEncoding;
    material = new THREE.MeshPhongMaterial({map: FloorWaterTexture});
    material.side = THREE.DoubleSide;
    enviornment = new THREE.Mesh(geometry, material); 

    enviornment.name = "Water";
    enviornment.rotation.x = - Math.PI / 2; 
    enviornment.position.set(0, 10, 60000);
    enviornment.receiveShadow = true; 

    scene.add(enviornment);  
}

//Luzes da lua 
{
light = new THREE.SpotLight('#3300ff', 5); 
light.position.y = 5000;
light.position.z = 1000;
}

function Create_Moon()
{
    var MoonGeometry = new THREE.SphereBufferGeometry(3500, 30, 30);
    var Textureloader = new THREE.TextureLoader();
    var Texture = Textureloader.load('./Textures/Moon.jpg'); 
    var MoonMaterial=new THREE.MeshPhongMaterial({map:Texture});
    Moon = new THREE.Mesh(MoonGeometry, MoonMaterial);

    Moon.position.set(0, 20000, 70000);

    var light = new THREE.PointLight({color: 0x8a8a8a}, 1); 
    light.position.set(0, 15000, 25000);
    light.lookAt(Moon.lookAt);

    scene.add(Moon);
    scene.add(light);
}

function Create_Stage()
{
    var Textureloader1 = new THREE.TextureLoader();
    var Texture1 = Textureloader1.load('./Textures/Metal.jpg');

    var Textureloader2 = new THREE.TextureLoader();
    var Texture2 = Textureloader2.load('./Textures/Aluminium.jpg');

    var Textureloader3 = new THREE.TextureLoader();
    var Texture3 = Textureloader3.load('./Textures/Background.jpg')

    var materialArray = [];
    var texture_ft = new THREE.TextureLoader().load('./Textures/Speaker.jpg');
    var texture_bk = new THREE.TextureLoader().load('./Textures/MetalSpeaker.jpg');
    var texture_up = new THREE.TextureLoader().load('./Textures/MetalSpeaker.jpg');
    var texture_dn = new THREE.TextureLoader().load('./Textures/MetalSpeaker.jpg');
    var texture_rt = new THREE.TextureLoader().load('./Textures/MetalSpeaker.jpg');
    var texture_lf = new THREE.TextureLoader().load('./Textures/MetalSpeaker.jpg');
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}));

    //Base
    var BaseGeometry = new THREE.BoxBufferGeometry(2000, 10000, 15000);
    var BaseMaterial = new THREE.MeshLambertMaterial({map: Texture1});
    var Base = new THREE.Mesh(BaseGeometry,BaseMaterial);
    Base.position.set(-10000, 1001, -20000);
    Base.rotation.z = Math.PI/2;
    scene.add(Base);

    //Back
    var BackGeometry = new THREE.PlaneGeometry(15000, 10000);
    var BackMaterial = new THREE.MeshLambertMaterial({map: Texture3});
    var Back = new THREE.Mesh(BackGeometry, BackMaterial);
    Back.material.side = THREE.DoubleSide;
    Back.position.set(-15000, 7001, -20001);
    Back.rotation.y = Math.PI/2;
    scene.add(Back);

    //Right
    var RightGeometry = new THREE.PlaneGeometry(10000, 12000);
    var RightMaterial = new THREE.MeshLambertMaterial({map: Texture2});
    var Right = new THREE.Mesh(RightGeometry, RightMaterial);
    Right.material.side = THREE.DoubleSide;
    Right.position.set(-10000, 6001, -27501);
    Right.rotation.y = Math.PI;
    scene.add(Right);

    //Left
    var LeftGeometry = new THREE.PlaneGeometry(10000, 12000);
    var LeftMaterial = new THREE.MeshLambertMaterial({map: Texture2});
    var Left = new THREE.Mesh(LeftGeometry, LeftMaterial);
    Left.material.side = THREE.DoubleSide;
    Left.position.set(-10000, 6025, -12498);
    scene.add(Left);

    //Upper
    var UpperGeometry = new THREE.PlaneGeometry(10000, 15000);
    var UpperMaterial = new THREE.MeshLambertMaterial({map: Texture2});
    var Upper = new THREE.Mesh(UpperGeometry, UpperMaterial);
    Upper.material.side = THREE.DoubleSide;
    Upper.position.set(-10000, 12001, -20000);
    Upper.rotation.x = Math.PI/2;
    scene.add(Upper);

    //Shpere and Cylinder
    var SphereGeometry = new THREE.SphereGeometry(1000, 1500);
    var SphereMaterial = new THREE.MeshNormalMaterial({wireframe: false});
    Sphere = new THREE.Mesh(SphereGeometry, SphereMaterial);
    Sphere.position.set(-10000, 10000, -20000);
    scene.add(Sphere);
    var CylinderGeometry = new THREE.CylinderGeometry(25, 25, 2000, 64);
    var CylinderMaterial = new THREE.MeshNormalMaterial({wireframe: false});
    var Cylinder = new THREE.Mesh(CylinderGeometry, CylinderMaterial);
    Cylinder.position.set(-10000, 11000, -20000);
    scene.add(Cylinder);

    lightBSL = new THREE.DirectionalLight('#ffffff', 0.25); 
    lightBSL.position.set(-10000, 10000, -20000);
    //lightBSL.lookAt(Table.position);
    scene.add(lightBSL);

    //SpeakerBase
    var SpeakerBaseGeometry = new THREE.BoxBufferGeometry(1000, 2000, 2500);
    //var SpeakerBaseMaterial = new THREE.MeshLambertMaterial({map: Texture3});
    var SpeakerBase1 = new THREE.Mesh(SpeakerBaseGeometry, materialArray);
    SpeakerBase2 = new THREE.Mesh(SpeakerBaseGeometry, materialArray);
    var SpeakerBase3 = new THREE.Mesh(SpeakerBaseGeometry, materialArray);
    SpeakerBase1.position.set(-4500, 1001, -15000);
    SpeakerBase2.position.set(-4500, 1001, -20000);
    SpeakerBase3.position.set(-4500, 1001, -25000);
    scene.add(SpeakerBase1);
    scene.add(SpeakerBase2);
    scene.add(SpeakerBase3);

    //Speakers
    var SpeakersGeometry = new THREE.BoxBufferGeometry(5000, 10000, 5000);
    //var SpeakersMaterial = new THREE.MeshLambertMaterial({map: Texture3});
    var SpeakerLeft = new THREE.Mesh(SpeakersGeometry, materialArray);
    var SpeakerRight = new THREE.Mesh(SpeakersGeometry, materialArray);
    SpeakerRight.position.set(-7500, 5001, -30004);
    SpeakerLeft.position.set(-7500, 5001, -9997);
    scene.add(SpeakerRight);
    scene.add(SpeakerLeft);

    //Table
    TableGeometry = new THREE.BoxBufferGeometry(2000, 1500, 3000);
    TableMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
    Table = new THREE.Mesh(TableGeometry, TableMaterial);
    Table.position.set(-8000, 2500, -20000);
    scene.add(Table);

    //BigSpotlight
    var BigSpotLightGeometry = new THREE.CylinderBufferGeometry(750, 500, 750, 1000);
    var BigSpotLightMaterial = new THREE.MeshLambertMaterial({map: Texture1});
    var BigSpotlightL = new THREE.Mesh(BigSpotLightGeometry, BigSpotLightMaterial);
    BigSpotlightL.position.set(-6500, 3000, -13800);
    BigSpotlightL.rotation.x = Math.PI/2.5;
    BigSpotlightL.rotation.z = -Math.PI/2;
    scene.add(BigSpotlightL);
    var BigSpotlightD = new THREE.Mesh(BigSpotLightGeometry, BigSpotLightMaterial);
    BigSpotlightD.position.set(-6500, 3000, -26300);
    BigSpotlightD.rotation.x = Math.PI/2.5;
    BigSpotlightD.rotation.z = -Math.PI/2;
    scene.add(BigSpotlightD);

    var SupportGeometry = new THREE.CylinderGeometry( 55, 55, 1000, 64 );
    var SupportMaterial = new THREE.MeshLambertMaterial({map: Texture1});
    var SupportL = new THREE.Mesh(SupportGeometry, SupportMaterial);
    SupportL.position.set(-6500, 2000, -13800);
    scene.add(SupportL);
    var SupportD = new THREE.Mesh(SupportGeometry, SupportMaterial);
    SupportD.position.set(-6500, 2000, -26300);
    scene.add(SupportD); 
}

function Create_Drone()
{
    var Textureloader1 = new THREE.TextureLoader();
    var Texture1 = Textureloader1.load('./Textures/WhiteMetal.jpg');

    var Textureloader2 = new THREE.TextureLoader();
    var Texture2 = Textureloader2.load('./Textures/Aluminium.jpg');

    var BodyGeometry = new THREE.BoxBufferGeometry(1000, 250, 500);
    var BodyMaterial = new THREE.MeshBasicMaterial({map: Texture1});
    var Body = new THREE.Mesh(BodyGeometry, BodyMaterial);
    Body.position.set(0, 225, 0);

    var LegsGeometry = new THREE.CylinderGeometry(20, 20, 150, 64);
    var LegsMaterial = new THREE.MeshBasicMaterial({map: Texture2});
    var Leg1 = new THREE.Mesh(LegsGeometry, LegsMaterial);
    var Leg2 = new THREE.Mesh(LegsGeometry, LegsMaterial);
    var Leg3 = new THREE.Mesh(LegsGeometry, LegsMaterial);
    var Leg4 = new THREE.Mesh(LegsGeometry, LegsMaterial);
    Leg1.position.set(-450, 75, 150);
    Leg2.position.set(-450, 75, -150);
    Leg3.position.set(450, 75, -150);
    Leg4.position.set(450, 75, 150);

    var SupportGeometry = new THREE.CylinderGeometry(20, 20, 400, 64);
    var SupportMaterial = new THREE.MeshBasicMaterial({map: Texture2});
    var Support = new THREE.Mesh(SupportGeometry, SupportMaterial);
    Support.position.set(0, 475, 0);

    var PropellerGeometry = new THREE.RingBufferGeometry(20, 400, 64);
    var PropellerMaterial = new THREE.MeshBasicMaterial({map: Texture1});
    var Propeller = new THREE.Mesh(PropellerGeometry, PropellerMaterial);
    Propeller.position.set(0, 645, 0);
    Propeller.rotation.x = Math.PI/2;
    Propeller.material.side = THREE.DoubleSide;

    Drone = new THREE.Object3D();
    Drone.add(Body);
    Drone.add(Leg1);
    Drone.add(Leg2);
    Drone.add(Leg3);
    Drone.add(Leg4);
    Drone.add(Support);
    Drone.add(Propeller);

    Drone.position.set(5000, 0, -20000);
    scene.add(Drone);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function RandomColors() //luzes da mesa 
{
    scene.remove(Table);

    var materialArray = [];
    //var texture_ft = new THREE.MeshBasicMaterial({color: getRandomColor()});
    var texture_bk = new THREE.TextureLoader().load('./Textures/MetalSpeaker.jpg');
    var texture_up = new THREE.TextureLoader().load('./Textures/MetalSpeaker.jpg');
    var texture_dn = new THREE.TextureLoader().load('./Textures/MetalSpeaker.jpg');
    var texture_rt = new THREE.TextureLoader().load('./Textures/MetalSpeaker.jpg');
    var texture_lf = new THREE.TextureLoader().load('./Textures/MetalSpeaker.jpg');
    materialArray.push(new THREE.MeshBasicMaterial({color: getRandomColor()}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}));

    TableGeometry = new THREE.BoxBufferGeometry(2000, 1500, 3000);
    Table = new THREE.Mesh(TableGeometry, materialArray)
    Table.position.set(-10000, 2500, -20000);
    scene.add(Table); 
}

function Lights() //Luzes nos holofotes apagadas 
{
    lightBSLGeometry = new THREE.CircleBufferGeometry(600, 1000);
    lightBSLMaterial = new THREE.MeshBasicMaterial({color: 0x7a7a7a});

    lightBSLL = new THREE.Mesh(lightBSLGeometry, lightBSLMaterial);
    lightBSLL.position.set(-6103, 3000, -13800);
    lightBSLL.rotation.y = Math.PI/2;
    scene.add(lightBSLL); 

    lightBSLD = new THREE.Mesh(lightBSLGeometry, lightBSLMaterial);
    lightBSLD.position.set(-6103, 3000, -26300);
    lightBSLD.rotation.y = Math.PI/2;
    scene.add(lightBSLD);

}

function Brother()
{
    importer.load('./Objects/Brother.fbx', function(object) {

        mixerAnimacao = new THREE.AnimationMixer(object);

        var action = mixerAnimacao.clipAction(object.animations[0]);
        action.play();

        object.traverse (function(child){
            
            if(child.isMesh)
            {
                child.castShadow = true;
                child.receiverShadow = true;
            }
        
        });

        scene.add(object);

        object.scale.x = 15;
        object.scale.z = 15;
        object.scale.y = 15;
        object.rotation.z = +Math.PI/2;
        object.rotation.y = -Math.PI/2;
        object.position.set(-6100, 2000, -20000);

        objetoImportado = object;

        light.lookAt(objetoImportado.position);
        //scene.add(light);
    }); 
}

function Initialize()
{
    scene = new THREE.Scene();
    Ambient = new THREE.AmbientLight(0x808080)
    scene.add(Ambient);
    scene.background = new THREE.Color(0x003d5c);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 45, 150000);
    camera.position.set(0, 5000, 2000);
    camera.rotation.y = Math.PI;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement); 
    
    controls = new THREE.PointerLockControls(camera, renderer.domElement);

    loader = new THREE.TextureLoader();  
    
    relogio = new THREE.Clock();
    importer = new THREE.FBXLoader();
}

function Start()
{
    Initialize();
    controls.addEventListener('end', renderer);
    
    Create_SandePlane();
    Create_WaterPlane();
    Create_Moon();
    Create_Stage();
    Lights();
    Brother();
    Create_Drone();

    renderer.render(scene, camera);
    requestAnimationFrame(Update);
}

function Update()
{
    if(front)
        controls.moveForward(50);

    if(back)
        controls.moveForward(-50);

    if(right)
        controls.moveRight(50);

    if(left)
        controls.moveRight(-50);

    if(up)
        camera.position.set(camera.position.x,camera.position.y+50,camera.position.z);

    if(down)
        camera.position.set(camera.position.x,camera.position.y-50,camera.position.z);

    Moon.rotateY(Math.PI/540); //180 360 540 720
    Sphere.rotateY(Math.PI/360);
    
    if(Drone.position.y >= 500)
        Drone.rotateY(Math.PI/180);  
    
    if(Drone.position.y >= 6000)
    {
        date = Date.now() * 0.0015;
        Drone.position.set(Math.cos(date) * orbitRadius + 5000, Drone.position.y, Math.sin(date) * orbitRadius - 20000);
    }

    if(mixerAnimacao)
        mixerAnimacao.update(relogio.getDelta());
        
    RandomColors();

    renderer.render(scene, camera);
    requestAnimationFrame(Update);
}