require('aframe-osm-3d');

AFRAME.registerComponent('initfunc', {

    init: async function () {

        console.log("Stage 1")

        window.addEventListener('gps-camera-update-position', e => {
            this.el.setAttribute('terrarium-dem', {
                lat: e.detail.position.latitude,
                lon: e.detail.position.longitude
            })
        });

        this.el.addEventListener('elevation-available', e => {
            camera = document.getElementById("camera")
            camera.object3D.position.y = e.detail.elevation + 1.6;
        });

        this.el.addEventListener('osm-data-loaded', e => {
            this.models = {
                Cafe: ['#coffee-cup', 15],
                Bar: ['#beer-bottle', 0.3],
                Restaurant: ['#burger', 0.02]
            };

            console.log("Stage 2")

            e.detail.pois.forEach(peak => {

                const entity = document.createElement('a-entity');
                const model = document.createElement('a-entity');

                if (peak.properties.featuretype === "unknown" && peak.properties.name != undefined) {
                    type = "Cafe"
                } else if (peak.properties.featuretype == "bar" || peak.properties.featuretype == "pub") {
                    type = "Bar"
                } else if (peak.properties.featuretype == "restaurant") {
                    type = "Restaurant"
                } else {
                    type = "Unknown"
                }

                if (type == "Cafe" && peak.properties.name.includes('Cafe')) {
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
                        value: peak.properties.name + "\n" + type,
                        wrapCount: 10,
                        baseline: 'center'
                    });

                    entity.setAttribute('gps-projected-entity-place', {
                        latitude: peak.geometry.coordinates[1],
                        longitude: peak.geometry.coordinates[0]
                    });

                    entity.setAttribute('elevation', peak.geometry.coordinates[2])

                    entity.setAttribute('scale', {
                        x: 10,
                        y: 10,
                        z: 10
                    });

                    entity.setAttribute('position', {
                        y: peak.geometry.coordinates[2]
                    });

                    entity.appendChild(model);
                    entity.appendChild(sign);

                    entity.addEventListener('click', e => {
                        if (peak.properties.website != undefined) {
                            win = window.open(peak.properties.website);
                            win.focus();
                        }
                        else {
                            alert("No website available...")
                        }
                    });

                    console.log(entity.getDOMAttribute('gps-projected-entity-place'))

                    this.el.sceneEl.appendChild(entity);
                }

                else if (type == "Restaurant" && peak.properties.name != undefined) {
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
                        value: peak.properties.name + "\n" + type,
                        wrapCount: 10,
                        baseline: 'center'
                    });

                    entity.setAttribute('gps-projected-entity-place', {
                        latitude: peak.geometry.coordinates[1],
                        longitude: peak.geometry.coordinates[0]
                    });

                    entity.setAttribute('scale', {
                        x: 10,
                        y: 10,
                        z: 10
                    });

                    entity.setAttribute('position', {
                        y: peak.geometry.coordinates[2]
                    });

                    entity.appendChild(model);
                    entity.appendChild(sign);

                    entity.addEventListener('click', e => {
                        if (peak.properties.website != undefined) {
                            win = window.open(peak.properties.website);
                            win.focus();
                        }
                        else {
                            alert("No website available...")
                        }
                    });

                    console.log(entity.getDOMAttribute('gps-projected-entity-place'))

                    this.el.sceneEl.appendChild(entity);
                }

                else if (type == "Bar" && peak.properties.name != undefined) {
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
                        value: peak.properties.name + "\n" + type,
                        wrapCount: 10,
                        baseline: 'center'
                    });

                    entity.setAttribute('gps-projected-entity-place', {
                        latitude: peak.geometry.coordinates[1],
                        longitude: peak.geometry.coordinates[0]
                    });

                    entity.setAttribute('scale', {
                        x: 10,
                        y: 10,
                        z: 10
                    });

                    entity.setAttribute('position', {
                        y: peak.geometry.coordinates[2]
                    });

                    entity.appendChild(model);
                    entity.appendChild(sign);

                    entity.addEventListener('click', e => {
                        if (peak.properties.website != undefined) {
                            win = window.open(peak.properties.website);
                            win.focus();
                        }
                        else {
                            alert("No website available...")
                        }
                    });

                    console.log(entity.getDOMAttribute('gps-projected-entity-place'))

                    this.el.sceneEl.appendChild(entity);
                }

                else {
                    // console.log("Type " + type + " Name " + obj.properties.name)
                }
            });
        });
    }
});

navigator.geolocation.watchPosition(pos => {
    document.getElementById('position').innerHTML = `<strong>Your Longitude is: ${pos.coords.longitude.toFixed(3)} You Latitude is: ${pos.coords.latitude.toFixed(3)}</strong>`;
},
    e => { document.getElementById('position').innerHTML = `<strong>An error occurred: ${e}</strong>`; },
    { enableHighAccuracy: true, maximumAge: 5000 }
);