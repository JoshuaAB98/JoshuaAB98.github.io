longitude = -2.455
latitude = 50.610

AFRAME.registerComponent('initfunc', {

    init: async function () {

        this.models = {
            cafe: ['#coffee-cup', 15],
            bar: ['#beer-bottle', 0.3],
            restaurant: ['#burger', 0.02]
        };

        const res = await fetch('https://hikar.org/course/imm/world.php');
        const json = await res.json();

        console.log("Before forEach loop")

        json.forEach(obj => {
            const entity = document.createElement('a-entity');
            const model = document.createElement('a-entity');

            console.log("Name: " + obj.name + " X: " + obj.x + " Y: " + obj.y + " Z: " + obj.z + " Type: " + obj.type)


            if (obj.type == "cafe") {
                model.setAttribute('obj-model', {
                    obj: this.models[obj.type][0],
                    mtl: `${this.models[obj.type][0]}-mtl`
                });
                model.setAttribute('position', {
                    x: -2.2,
                    y: 2.7,
                    z: -1.2
                });
                console.log("This is a cafe object")
            } else if (obj.type == "restaurant") {
                model.setAttribute('obj-model', {
                    obj: this.models[obj.type][0],
                    mtl: `${this.models[obj.type][0]}-mtl`
                });
                console.log("This is a restaurant object")
            } else if (obj.type == "bar") {
                model.setAttribute('obj-model', {
                    obj: this.models[obj.type][0],
                    mtl: `${this.models[obj.type][0]}-mtl`
                });
                model.setAttribute('position', {
                    y: 2
                });
                console.log("This is a bar object")
            } else {
                model.setAttribute('obj-model', {
                    obj: this.models[obj.type][0],
                    mtl: `${this.models[obj.type][0]}-mtl`
                });
            }

            model.setAttribute('scale', {
                x: this.models[obj.type][1],
                y: this.models[obj.type][1],
                z: this.models[obj.type][1]
            });

            const sign = document.createElement('a-plane');
            // sign.setAttribute('geometry', 'primitive: box')
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
                value: obj.name,
                wrapCount: 10,
                baseline: 'center'
            });

            entity.setAttribute('position', {
                x: obj.x,
                y: 0,
                z: obj.z
            });
            entity.appendChild(model);
            entity.appendChild(sign);
            model.addEventListener('click', e => {
                alert(obj.name);
                console.log("Object Clicked: " + obj.name)
            });


            this.el.sceneEl.appendChild(entity);
        });
    }
});

navigator.geolocation.watchPosition(pos => {
    document.getElementById('position').innerHTML = `<strong>Your Longitude is: ${pos.coords.longitude.toFixed(3)} You Latitude is: ${pos.coords.latitude.toFixed(3)}</strong>`;
},
    e => { document.getElementById('position').innerHTML = `<strong>An error occurred: ${e}</strong>`; },
    { enableHighAccuracy: true, maximumAge: 5000 }
);
