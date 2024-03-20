/* -------------------------------------------------------------------------- */
/*                                FONCTIONS                                   */
/* -------------------------------------------------------------------------- */

// Retour à la ligne après X caractères (chaine de caractères)
function breakLines(text, charactersPerLine) {
    const regex = new RegExp(`.{1,${charactersPerLine}}`, 'g');
    return text.match(regex).join('<br>');
}

// Détails des infos sur les opérateurs
// function operateurInfo(feature) {
//     const operateurContent = document.getElementById("operateur-content");
//     const dataInfos = feature.properties;
//     operateurContent.classList.add("operator-content"); // permet de définir le style en CSS 
//     const noOfferMessage = "Le territoire ne possède actuellement pas d'offre de nos partenaires.";

//     if (dataInfos['opérateur1'] !== noOfferMessage) { //Si la valeur de l'opérateur1 mentionne qu'il n'y a pas de partenaires, alors on affiche pas de contenu.
//         for (let i = 1; i <= 7; i++) {
//             const operateurKey = 'opérateur' + i;
//             const technologieKey = 'technologie' + i;
//             const siteKey = 'site' + i;
//             const priseEnChargeKey = 'prise_encharge' + i;
//             const imgKey = 'Logo' + i;

//             if (dataInfos[operateurKey]) {
//                 // Utilisez innerHTML pour ajouter du contenu à l'élément
//                 // operateurContent.innerHTML += '<div class="tab-pane' + (i === 1 ? ' show active' : '') + '" id="onglet' + i + '">';
//                 operateurContent.innerHTML += '<div class="box">';
//                 operateurContent.innerHTML += '<img class="operator-logo" src="' + dataInfos[imgKey] + '" alt="Logo" style="max-width: 80px; max-height: 80px;">';
//                 operateurContent.innerHTML += '<br><b>Opérateur :</b> ' + dataInfos[operateurKey] + '<br>';
//                 operateurContent.innerHTML += '<b>Technologie :</b> ' + dataInfos[technologieKey] + '<br>';
//                 operateurContent.innerHTML += '<b>Site :</b> <a href="' + dataInfos[siteKey] + '" target="_blank">' + breakLines(dataInfos[siteKey], 40) + '</a><br>'; // Utilisation de la balise <a> pour le lien
//                 operateurContent.innerHTML += '<b>Prise en charge supérieure à 300€ <br>(sous conditions de ressources) :</b> ' + dataInfos[priseEnChargeKey] + '<br>';
//                 operateurContent.innerHTML += '</div>';

//                 operateurContent.innerHTML += '<div style="margin-bottom: 30px;"></div>';

//             }
//         }
//      }
// }


// function operateurInfo(feature) {
//     const operateurContent = document.getElementById("operateur-content");
//     const dataInfos = feature.properties;
//     operateurContent.classList.add("operator-content"); // permet de définir le style en CSS 
//     const noOfferMessage = "Le territoire ne possède actuellement pas d'offre de nos partenaires.";

//     // Nettoyer le contenu précédent
//     operateurContent.innerHTML = '';

//     if (dataInfos['opérateur1'] === noOfferMessage) {
//         // Si 'opérateur1' a la valeur "noOfferMessage", afficher uniquement cette valeur
//         const noOfferElement = document.createElement('div');
//         noOfferElement.className = 'no-offer-message'; // Appliquer la classe CSS pour les boîtes en pointillés
//         noOfferElement.textContent = noOfferMessage;
//         operateurContent.appendChild(noOfferElement);
//     } else {
//         for (let i = 1; i <= 7; i++) {
//             const operateurKey = 'opérateur' + i;
//             const technologieKey = 'technologie' + i;
//             const siteKey = 'site' + i;
//             const priseEnChargeKey = 'prise_encharge' + i;
//             const imgKey = 'Logo' + i;

//             if (dataInfos[operateurKey]) {
//                 // Utilisez innerHTML pour ajouter du contenu à l'élément
//                 const infoElement = document.createElement('div');
//                 infoElement.className = 'operator-separateur';
//                 infoElement.innerHTML += '<img class="operator-logo" src="' + dataInfos[imgKey] + '" alt="Logo" style="max-width: 80px; max-height: 80px;">';
//                 infoElement.innerHTML += '<br><b>Opérateur :</b> ' + dataInfos[operateurKey] + '<br>';
//                 infoElement.innerHTML += '<b>Technologie :</b> ' + dataInfos[technologieKey] + '<br>';
//                 infoElement.innerHTML += '<b>Site :</b> <a href="' + dataInfos[siteKey] + '" target="_blank">' + breakLines(dataInfos[siteKey], 40) + '</a><br>';
//                 infoElement.innerHTML += '<b>Prise en charge supérieure à 300€ <br>(sous conditions de ressources) :</b> ' + dataInfos[priseEnChargeKey] + '<br>';

//                 operateurContent.appendChild(infoElement);
//             }
//         }
//     }
// }

function operateurInfo(feature) {
    const operateurContent = document.getElementById("operateur-content");
    const dataInfos = feature.properties;
    operateurContent.classList.add("operator-content"); // permet de définir le style en CSS 
    const noOfferMessage = "Le territoire ne possède actuellement pas d'offre de nos partenaires.";

    // Nettoyer le contenu précédent
    operateurContent.innerHTML = '';

    if (dataInfos['opérateur1'] === noOfferMessage) {
        // Si 'opérateur1' a la valeur "noOfferMessage", afficher uniquement cette valeur
        const noOfferElement = document.createElement('div');
        noOfferElement.className = 'no-offer-message'; // Appliquer la classe CSS pour les boîtes en pointillés
        noOfferElement.textContent = noOfferMessage;
        operateurContent.appendChild(noOfferElement);
    } else {
        // Créer un tableau pour stocker les données des opérateurs
        const operatorsData = [];

        for (let i = 1; i <= 7; i++) {
            const operateurKey = 'opérateur' + i;
            const technologieKey = 'technologie' + i;
            const siteKey = 'site' + i;
            const priseEnChargeKey = 'prise_encharge' + i;
            const imgKey = 'Logo' + i;

            if (dataInfos[operateurKey]) {
                // Ajouter les données de l'opérateur au tableau
                operatorsData.push({
                    operateur: dataInfos[operateurKey],
                    technologie: dataInfos[technologieKey],
                    site: dataInfos[siteKey],
                    priseEnCharge: dataInfos[priseEnChargeKey],
                    img: dataInfos[imgKey]
                });
            }
        }

        // Mélanger l'ordre des opérateurs
        const shuffledOrder = shuffleArray([...Array(operatorsData.length).keys()]);

        // Afficher les informations des opérateurs dans l'ordre mélangé
        shuffledOrder.forEach(index => {
            const operator = operatorsData[index];
            const infoElement = document.createElement('div');
            infoElement.className = 'operator-separateur'; 
            infoElement.innerHTML += '<img class="operator-logo" src="' + operator.img + '" alt="Logo" style="max-width: 80px; max-height: 80px;">';
            infoElement.innerHTML += '<br><b>Opérateur :</b> ' + operator.operateur + '<br>';
            infoElement.innerHTML += '<b>Technologie :</b> ' + operator.technologie + '<br>';
            infoElement.innerHTML += '<b>Site :</b> <a href="' + operator.site + '" target="_blank">' + breakLines(operator.site, 40) + '</a><br>';
            infoElement.innerHTML += '<b>Prise en charge supérieure à 300€ <br>(sous conditions de ressources) :</b> ' + operator.priseEnCharge + '<br>';

            operateurContent.appendChild(infoElement);
        });
    }
}

// Fonction pour mélanger un tableau
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// Création du contenu de la sidebar
function createSidebarContent(feature) {

    const cardHeader = document.querySelector(".card-header");
    const bntRetourAccueil = document.getElementById("bnt-retour-accueil");
    const operateurContent = document.getElementById("operateur-content");
    const dataInfos = feature.properties;

    operateurContent.innerHTML = '';


    // Récupérer le titre : nom du département séléctionné
    cardHeader.innerHTML = '<div id="nom-programme" ><span><p class="dep-txt-sidebar">' + dataInfos[`dep`] + '</p></span></div>';
    // createListOperateur(feature);
    operateurInfo(feature);
    bntRetourAccueil.style.display = 'block'
    bntRetourAccueil.addEventListener('click', function () {
        sidebar.open('home');
    });

    return operateurContent;
};

/* ------------------------- */
/*  CREATION FICHIERS GEO   */
/* ----------------------- */

// Chargement des données 
async function loadData(chemin) {
    const response = await fetch(chemin);
    const resultat = await response.json();
    return resultat
};

var selectedDepartment = null;

// Création fichier geojson 
function createGeoJSON(data, map) {
    const layer = new L.geoJSON(data, {
        style: {
            color: 'white',
            weight: 1,
            fillColor: '#244a9a', //bleu
            fillOpacity: 1,
            opacity: 1
        },
        onEachFeature: function (feature, layer) {
            layer.on({
                click: function (e) {
                    // Réinitialiser le style du département précédemment sélectionné
                    if (selectedDepartment) {
                        selectedDepartment.setStyle({
                            fillColor: '#244a9a', //bleu
                            weight: 1
                        });
                    }

                    // Appliquer le style au nouveau département
                    layer.setStyle({
                        color: 'white',
                        fillColor: '#e62d3c', //rouge
                        fillOpacity: 1,
                        weight: 2
                    });

                    // Mettre à jour le département sélectionné
                    selectedDepartment = layer;

                    createSidebarContent(feature);
                    sidebar.open('operateur');
                },
                mouseover: handleMouseOver,
                mouseout: handleMouseOut
            });
        }


    })//.bindTooltip(e => e.feature.properties.dep)//
        .addTo(map);

    return layer;
}

// Création fichier geojson : habillage
function createGeoJSONHab(data, map) {
    new L.geoJSON(data, {
        style: {
            color: '#e62d3c', //rouge
            weight: 1,
            fillOpacity: 1
        },
    }).addTo(map);
};

// Création fichier geojson : territoires frontaliers 
function createGeoJSONHabBis(data, map) {
    new L.geoJSON(data, {
        style: {
            color: '#F2E8DC', //beige 
            weight: 1,
            fillOpacity: 1,
        },
    }).addTo(map);
};

// Réinitialiser le style lorsqu'un nouveau département est survolé
function handleMouseOver(e) {
    if (selectedDepartment !== this) {
        this.setStyle({
            color: 'white',
            fillColor: '#e62d3c', //rouge
            fillOpacity: 1,
            weight: 2
        });
    }
}
// Réinitialiser le style lorsque la souris quitte le département
function handleMouseOut(e) {
    if (selectedDepartment !== this) {
        this.setStyle({
            fillColor: '#244a9a', //bleu 
            weight: 1
        })
    }
}

// Réinitialiser le style des départements
function resetDepStyles(depLayerResetStyle) {
    depLayerResetStyle.eachLayer(function (layer) {
        layer.setStyle({
            color: 'white',
            weight: 1,
            fillColor: '#244a9a', //bleu
            fillOpacity: 1,
            opacity: 1
        });
    });
    // Réinitialiser le style du département sélectionné
    if (selectedDepartment) {
        selectedDepartment.setStyle({
            color: 'white',
            weight: 1,
            fillColor: '#244a9a', //bleu
            fillOpacity: 1,
            opacity: 1
        });
    }
}

//Creation de la barre de recherche
function createSearchBar(data, map) {
    var searchControl = new L.Control.Search({
        layer: data,
        propertyName: 'dep',
        marker: false,
        textPlaceholder: 'Rechercher un département',
        position: 'topright',
        collapsed: false,
        zoom: 12
    });
    //Au résultat, on zoom sur les limites du départements recherché puis on y applique le style du departement sélectionné
    searchControl.on('search:locationfound', function (e) {
        var selectedFeature = e.layer;
        // Réinitialiser le style des départements précédemment sélectionnés
        resetDepStyles(data);
        // Appliquer le nouveau style au département sélectionné
        selectedFeature.setStyle({
            color: 'white',
            fillColor: '#e62d3C', //rouge
            fillOpacity: 1,
            weight: 1
        });
        selectedFeature.fire('click');
    });
    //Ajout barre de recherche
    map.addControl(searchControl);

}

//Calcul emprise carte selon taille de l'écran 
function calculateBounds() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    var bounds = L.latLngBounds(
        mymap.containerPointToLatLng([0, 0]),
        mymap.containerPointToLatLng([width, height])
    );

    return bounds;
}
/* -------------------------------------------------------------------------- */
/*                        CREATION OBJETS PRINCIPAUX                          */
/* -------------------------------------------------------------------------- */

/* --------------- */
/*     CARTE      */
/* -------------- */
var mymap = L.map('map').setView([46.603354, -18], 5);

// Mise à jour de l'emprise maximale lors du redimensionnement de la fenêtre
window.addEventListener('resize', function () {
    mymap.setMaxBounds(calculateBounds());
    mymap.panInsideBounds(calculateBounds(), { animate: false });
});
// Initialisation de l'emprise maximale
mymap.setMaxBounds(calculateBounds());
mymap.panInsideBounds(calculateBounds(), { animate: false });

//Sources en bas à droite 
mymap.attributionControl.addAttribution('<a href="https://agence-cohesion-territoires.gouv.fr/" target="_blank">ANCT 2023</a> | <a href="https://www.ign.fr/institut/ressources-pedagogiques" target="_blank">Fond cartographique IGN</a>');

//mymap.dragging.disable(); // empeche le déplacement libre sur l'emprise de la carte 

//Niveau de zoom : Min & Max
mymap.setMinZoom(4);
mymap.setMaxZoom(7);


// ETIQUETTE FIXE TERRITOIRES ULTRAMARINS
const titleCoordinates = [47.80000, -6.3000]; //Position de l'étiquette
const titleText = "Les territoires ultramarins";
const titleMarker = L.marker(titleCoordinates, { icon: L.divIcon({ className: 'etiquette-outreMer', html: titleText }) });
titleMarker.addTo(mymap);



/* --------------- */
/*    SIDEBAR      */
/* -------------- */
const sidebar = L.control.sidebar({
    autopan: false,
    closeButton: true,
    container: 'sidebar',
    position: 'left',
})

sidebar.on('content', function (ev) {
    switch (ev.id) {
        case 'home':
            sidebar.options.autopan = true;
            break;
        case 'search-tab':
            sidebar.options.autopan = true;
            break;
        case 'a-propos':
            sidebar.options.autopan = true;
            break;
        default:
            sidebar.options.autopan = true;
    }
});

sidebar.addTo(mymap);
sidebar.open('home');

/* --------------- */
/*    AJOUT       */
/*  DES DONNEES  */
/* ------------ */
//chargement des données des départements métropole+drom
const fthdInit = loadData("data/geom/data_dep.geojson");
// Ajout couches d'habillage
const contoursIleReprojete = loadData("data/geom/contours_iles_reprojetees.geojson");
const territoiresFrontaliers = loadData("data/geom/territoires_frontaliers.geojson");
const habGuyane = loadData("data/geom/habillage_guyane.geojson");

// Création couches
Promise.all([fthdInit, contoursIleReprojete, territoiresFrontaliers, habGuyane]).then(([fthdLayer, contoursIleReprojeteLayer, territoiresFrontaliersLayer, habGuyaneLayer]) => {
    createGeoJSONHabBis(territoiresFrontaliersLayer, mymap);
    createGeoJSONHabBis(habGuyaneLayer, mymap);
    createGeoJSONHab(contoursIleReprojeteLayer, mymap);

    const fthdData = createGeoJSON(fthdLayer, mymap);
    const bounds = fthdData.getBounds();
    mymap.fitBounds(bounds, { padding: [50, 50] });

    // Barre de recherche
    createSearchBar(fthdData, mymap);


    // Réinitialisation du style de département au clic sur un bouton de la sidebar
    const sidebarTabs = document.querySelector('.leaflet-sidebar-tabs');
    if (sidebarTabs) {
        sidebarTabs.addEventListener('click', function (event) {
            if (event.target.classList.contains('sidebar-button')) {
                resetDepStyles(fthdData);
            }
        });
    }
});