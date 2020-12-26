AFRAME.registerComponent('initfunc', {
    init: async function () {
        this.loaded = false;
        window.addEventListener('gps-camera-update-position', async (e) => {
            if (this.loaded === false) {
                this.loaded = true;
                // alert(`Your initial location is: ${e.detail.position.longitude} ${e.detail.position.latitude}`);
                this.models = {
                    Cafe: ['#coffee-cup', 15],
                    Bar: ['#beer-bottle', 0.3],
                    Restaurant: ['#burger', 0.02]
                };

                const res = await fetch(`https://www.hikar.org/fm/ws/bsvr.php?bbox=${e.detail.position.longitude - 0.01},${e.detail.position.latitude - 0.01},${e.detail.position.longitude + 0.01},${e.detail.position.latitude + 0.01}&outProj=4326&format=json&poi=all`);
                const json = await res.json();

                json.features.forEach(obj => {
                    const entity = document.createElement('a-entity');
                    const model = document.createElement('a-entity');

                    if (obj.properties.featuretype === "unknown" && obj.properties.name != undefined) {
                        type = "Cafe"
                        console.log("Name: " + obj.properties.name + " Type: " + type + " Website: " + obj.properties.website)
                    } else if (obj.properties.featuretype == "bar" || obj.properties.featuretype == "pub") {
                        type = "Bar"
                        console.log("Name: " + obj.properties.name + " Type: " + type + " Website: " + obj.properties.website)
                    } else if (obj.properties.featuretype == "restaurant") {
                        type = "Restaurant"
                        console.log("Name: " + obj.properties.name + " Type: " + type + " Website: " + obj.properties.website)
                    } else {
                        type = "Unknown"
                    }

                    if (type == "Cafe" && obj.properties.name.includes('Cafe')) {
                        model.setAttribute('obj-model', {
                            obj: this.models[type][0],
                            mtl: `${this.models[type][0]}-mtl`
                        });
                        model.setAttribute('position', {
                            x: -2.2,
                            y: 1,
                            z: -1.2
                        });

                        model.setAttribute('scale', {
                            x: this.models[type][1],
                            y: this.models[type][1],
                            z: this.models[type][1]
                        });

                        const sign = document.createElement('a-plane');
                        sign.setAttribute('width', 5);
                        sign.setAttribute('height', 4);
                        sign.setAttribute('look-at', '[camera]');
                        sign.setAttribute('material', {
                            color: 'black'
                        });
                        sign.setAttribute('position', {
                            x: 0,
                            y: 4,
                            z: 0
                        });

                        sign.setAttribute('text', {
                            value: obj.properties.name + "\n" + type,
                            wrapCount: 10,
                            baseline: 'center'
                        });

                        entity.setAttribute('gps-projected-entity-place', {
                            latitude: obj.geometry.coordinates[1],
                            longitude: obj.geometry.coordinates[0]
                        });

                        entity.setAttribute('scale', {
                            x: 10,
                            y: 10,
                            z: 10
                        });

                        entity.appendChild(model);
                        entity.appendChild(sign);

                        entity.addEventListener('click', e => {
                            if(obj.properties.website != undefined){
                                win = window.open(obj.properties.website);
                                win.focus();
                            } 
                        });

                        this.el.sceneEl.appendChild(entity);
                    }

                    else if (type == "Restaurant" && obj.properties.name != undefined) {
                        model.setAttribute('obj-model', {
                            obj: this.models[type][0],
                            mtl: `${this.models[type][0]}-mtl`
                        });
                        model.setAttribute('scale', {
                            x: this.models[type][1],
                            y: this.models[type][1],
                            z: this.models[type][1]
                        });

                        model.setAttribute('position', {
                            y: -1.6
                        });

                        const sign = document.createElement('a-plane');
                        sign.setAttribute('width', 5);
                        sign.setAttribute('height', 4);
                        sign.setAttribute('look-at', '[camera]');
                        sign.setAttribute('material', {
                            color: 'black'
                        });
                        sign.setAttribute('position', {
                            x: 0,
                            y: 4,
                            z: 0
                        });

                        sign.setAttribute('text', {
                            value: obj.properties.name + "\n" + type,
                            wrapCount: 10,
                            baseline: 'center'
                        });

                        entity.setAttribute('gps-projected-entity-place', {
                            latitude: obj.geometry.coordinates[1],
                            longitude: obj.geometry.coordinates[0]
                        });

                        entity.setAttribute('scale', {
                            x: 10,
                            y: 10,
                            z: 10
                        });

                        entity.appendChild(model);
                        entity.appendChild(sign);

                        entity.addEventListener('click', e => {
                            if(obj.properties.website != undefined){
                                win = window.open(obj.properties.website);
                                win.focus();
                            } 
                        });

                        this.el.sceneEl.appendChild(entity);
                    }

                    else if (type == "Bar" && obj.properties.name != undefined) {
                        model.setAttribute('obj-model', {
                            obj: this.models["Bar"][0],
                            mtl: `${this.models["Bar"][0]}-mtl`
                        });
                        model.setAttribute('position', {
                            y: 0
                        });
                        model.setAttribute('scale', {
                            x: this.models["Bar"][1],
                            y: this.models["Bar"][1],
                            z: this.models["Bar"][1]
                        });

                        const sign = document.createElement('a-plane');
                        sign.setAttribute('width', 5);
                        sign.setAttribute('height', 4);
                        sign.setAttribute('look-at', '[camera]');
                        sign.setAttribute('material', {
                            color: 'black'
                        });
                        sign.setAttribute('position', {
                            x: 0,
                            y: 4,
                            z: 0
                        });

                        sign.setAttribute('text', {
                            value: obj.properties.name + "\n" + type,
                            wrapCount: 10,
                            baseline: 'center'
                        });

                        entity.setAttribute('gps-projected-entity-place', {
                            latitude: obj.geometry.coordinates[1],
                            longitude: obj.geometry.coordinates[0]
                        });

                        entity.setAttribute('scale', {
                            x: 10,
                            y: 10,
                            z: 10
                        });                    

                        entity.appendChild(model);
                        entity.appendChild(sign);

                        entity.addEventListener('click', e => {
                            if(obj.properties.website != undefined){
                                win = window.open(obj.properties.website);
                                win.focus();
                            } 
                        });

                        this.el.sceneEl.appendChild(entity);
                    }

                    else {
                        // console.log("Type " + type + " Name " + obj.properties.name)
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

