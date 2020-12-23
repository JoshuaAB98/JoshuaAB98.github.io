AFRAME.registerComponent('initfunc', {
    init: async function () {
        this.loaded = false;
        window.addEventListener('gps-camera-update-position', async (e) => {
            if (this.loaded === false) {
                this.loaded = true;
                alert(`Your initial location is: ${e.detail.position.longitude} ${e.detail.position.latitude}`);
                this.models = {
                    cafe: ['#coffee-cup', 15],
                    bar: ['#beer-bottle', 0.3],
                    restaurant: ['#burger', 0.02]
                };

                // const res = await fetch('https://hikar.org/course/imm/world.php');
                const res = await fetch(`https://www.hikar.org/fm/ws/bsvr.php?bbox=${e.detail.position.longitude-0.1},${e.detail.position.latitude-0.1},${e.detail.position.longitude+0.1},${e.detail.position.latitude+0.1}&outProj=4326&format=json&poi=all`);
                const json = await res.json();

                json.features.forEach(obj => {
                    const entity = document.createElement('a-entity');
                    const model = document.createElement('a-entity');

                    if (obj.properties.featuretype == "cafe" && obj.properties.name != undefined) {
                        model.setAttribute('obj-model', {
                            obj: this.models[obj.properties.featuretype][0],
                            mtl: `${this.models[obj.properties.featuretype][0]}-mtl`
                        });
                        model.setAttribute('position', {
                            x: -2.2,
                            y: 2.7,
                            z: -1.2
                        });
                        console.log("This is a cafe object")
                        this.el.sceneEl.appendChild(setObj(entity, model, obj, this.models));
                    } else if (obj.properties.featuretype == "restaurant" && obj.properties.name != undefined) {
                        model.setAttribute('obj-model', {
                            obj: this.models[obj.properties.featuretype][0],
                            mtl: `${this.models[obj.properties.featuretype][0]}-mtl`
                        });
                        console.log("This is a restaurant object")
                        this.el.sceneEl.appendChild(setObj(entity, model, obj, this.models));
                    } else if (obj.properties.featuretype == "bar" && obj.properties.name != undefined) {
                        model.setAttribute('obj-model', {
                            obj: this.models[obj.properties.featuretype][0],
                            mtl: `${this.models[obj.properties.featuretype][0]}-mtl`
                        });
                        model.setAttribute('position', {
                            y: 2
                        });
                        console.log("This is a bar object")
                        this.el.sceneEl.appendChild(setObj(entity, model, obj, this.models));
                    } else {
                        console.log("Unknown type " + obj.properties.featuretype + " Or unknown name " + obj.properties.name)
                    }
                });
            }
        })
    }
});

navigator.geolocation.watchPosition(pos => {
    document.getElementById('position').innerHTML = `<strong>Your Longitude is: ${pos.coords.longitude.toFixed(3)} You Latitude is: ${pos.coords.latitude.toFixed(3)}</strong>`;
},
    e => { document.getElementById('position').innerHTML = `<strong>An error occurred: ${e}</strong>`; },
    { enableHighAccuracy: true, maximumAge: 5000 }
);

function setObj(entity, model, obj, models)
{
    console.log("Name: " + obj.properties.name + " X: " + obj.geometry.coordinates[0] + " Y: " + obj.geometry.coordinates[1] + " Type: " + obj.properties.featuretype)

    model.setAttribute('scale', {
        x: models[obj.properties.featuretype][1],
        y: models[obj.properties.featuretype][1],
        z: models[obj.properties.featuretype][1]
    });

    const sign = document.createElement('a-plane');
    sign.setAttribute('width', 5);
    sign.setAttribute('height', 2);
    sign.setAttribute('look-at', '[camera]');
    sign.setAttribute('material', {
        color: 'black'
    });
    sign.setAttribute('position', {
        x: 0,
        y: 5,
        z: 0
    });

    sign.setAttribute('text', {
        value: obj.properties.name,
        wrapCount: 10,
        baseline: 'center'
    });

    entity.setAttribute('position', {
        x: obj.geometry.coordinates[0],
        y: 0,
        z: obj.geometry.coordinates[1]
    });
    console.log("Setting X and Z to: " + obj.geometry.coordinates[0] + " " + obj.geometry.coordinates[1])

    entity.appendChild(model);
    entity.appendChild(sign);
    model.addEventListener('click', e => {
        alert(obj.properties.name);
        console.log("Object Clicked: " + obj.properties.name)
    });
    console.log(entity)

    return entity
}
