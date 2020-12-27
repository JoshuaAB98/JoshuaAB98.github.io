require('aframe-osm-3d');

AFRAME.registerComponent('initfunc', {

    init: async function () {

        console.log("Part 0")

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

            e.detail.pois.forEach(obj => {

                const entity = document.createElement('a-entity');
                const model = document.createElement('a-entity');

                if (obj.properties.featuretype === "unknown" && obj.properties.name != undefined) {
                    type = "Cafe"
                    // console.log("Name " + obj.properties.name + " Lat " + obj.geometry.coordinates[1] + " Lon " + obj.geometry.coordinates[0] + " Elevation " + obj.geometry.coordinates[2])
                } else if (obj.properties.featuretype == "bar" || obj.properties.featuretype == "pub") {
                    type = "Bar"
                    // console.log("Name " + obj.properties.name + " Lat " + obj.geometry.coordinates[1] + " Lon " + obj.geometry.coordinates[0] + " Elevation " + obj.geometry.coordinates[2])
                } else if (obj.properties.featuretype == "restaurant") {
                    type = "Restaurant"
                    // console.log("Name " + obj.properties.name + " Lat " + obj.geometry.coordinates[1] + " Lon " + obj.geometry.coordinates[0] + " Elevation " + obj.geometry.coordinates[2])
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

                    entity.setAttribute('elevation', obj.geometry.coordinates[2])

                    entity.setAttribute('scale', {
                        x: 10,
                        y: 10,
                        z: 10
                    });

                    entity.setAttribute('position', {
                        y: obj.geometry.coordinates[2]
                    });

                    entity.appendChild(model);
                    entity.appendChild(sign);

                    entity.addEventListener('click', e => {
                        if (obj.properties.website != undefined) {
                            win = window.open(obj.properties.website);
                            win.focus();
                        }
                        else {
                            alert("No website available...")
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

                    entity.setAttribute('position', {
                        y: obj.geometry.coordinates[2]
                    });

                    entity.appendChild(model);
                    entity.appendChild(sign);

                    entity.addEventListener('click', e => {
                        if (obj.properties.website != undefined) {
                            win = window.open(obj.properties.website);
                            win.focus();
                        }
                        else {
                            alert("No website available...")
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

                    entity.setAttribute('position', {
                        y: obj.geometry.coordinates[2]
                    });

                    entity.appendChild(model);
                    entity.appendChild(sign);

                    entity.addEventListener('click', e => {
                        if (obj.properties.website != undefined) {
                            win = window.open(obj.properties.website);
                            win.focus();
                        }
                        else {
                            alert("No website available...")
                        }
                    });

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

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(registration => {
            console.log('Registered successfully.');
        })
        .catch(e => {
            console.error(`Service worker registration failed: ${e}`);
        });
} else {
    alert('Sorry, offline functionality not available, please update your browser!');
}

let deferredPrompt;
const addBtn = document.getElementById('add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';
  
    addBtn.addEventListener('click', (e) => {
      // hide our user interface that shows our A2HS button
      addBtn.style.display = 'none';
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
    });
  });
