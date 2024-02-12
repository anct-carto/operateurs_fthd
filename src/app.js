/* -------------------------------------------------------------------------- */
/*                                FONCTIONS                                   */
/* -------------------------------------------------------------------------- */

// Retour à la ligne après X caractères (chaine de caractères)
function breakLines(text, charactersPerLine) {
    const regex = new RegExp(`.{1,${charactersPerLine}}`, 'g');
    return text.match(regex).join('<br>');
}

// Détails des infos sur les opérateurs
function operateurInfo(feature) {
    const operateurContent = document.getElementById("operateur-content");
    const dataInfos = feature.properties;
    operateurContent.classList.add("operator-content"); // permet de définir le style en CSS 
    operateurContent.innerHTML = '<div class="dep-txt-sidebar">' + dataInfos['dep'] + '</div>';

    const noOfferMessage = "Le territoire ne possède actuellement pas d'offre de nos partenaires.";

    if (dataInfos['opérateur1'] !== noOfferMessage) { //Si la valeur de l'opérateur1 mentionne qu'il n'y a pas de partenaires, alors on affiche pas de contenu.
        for (let i = 1; i <= 7; i++) {
            const operateurKey = 'opérateur' + i;
            const technologieKey = 'technologie' + i;
            const siteKey = 'site' + i;
            const priseEnChargeKey = 'prise_encharge' + i;
            const imgKey = 'Logo' + i;

            if (dataInfos[operateurKey]) {
                // Utilisez innerHTML pour ajouter du contenu à l'élément
                // operateurContent.innerHTML += '<div class="tab-pane' + (i === 1 ? ' show active' : '') + '" id="onglet' + i + '">';
                operateurContent.innerHTML += '<div class="box">';
                operateurContent.innerHTML += '<img class="operator-logo" src="' + dataInfos[imgKey] + '" alt="Logo" style="max-width: 80px; max-height: 80px;">';
                operateurContent.innerHTML += '<br><b>Opérateur :</b> ' + dataInfos[operateurKey] + '<br>';
                operateurContent.innerHTML += '<b>Technologie :</b> ' + dataInfos[technologieKey] + '<br>';
                operateurContent.innerHTML += '<b>Site :</b> <a href="' + dataInfos[siteKey] + '" target="_blank">' + breakLines(dataInfos[siteKey], 40) + '</a><br>'; // Utilisation de la balise <a> pour le lien
                operateurContent.innerHTML += '<b>Prise en charge supérieure à 300€ <br>(sous conditions de ressources) :</b> ' + dataInfos[priseEnChargeKey] + '<br>';
                operateurContent.innerHTML += '</div>';

                operateurContent.innerHTML += '<div style="margin-bottom: 30px;"></div>';

            }
        }
    }
}

//Liste des opérateurs partenaires pour chaque DEP
function createListOperateur(feature){
    const listOperateurs = document.querySelector(".liste-operateurs");
    listOperateurs.classList.add("operator-list");

    // Boucle pour ajouter chaque opérateur
    for (let i = 1; i <= 7; i++) {
        const operateurKey = 'opérateur' + i;
        const operateurValue = feature.properties[operateurKey];

        // Vérification si la valeur de l'opérateur n'est pas null
        if (operateurValue !== null && operateurValue !== undefined) {
            // Ajout d'un élément de liste à la liste
            const listItem = document.createElement('li');
            listItem.classList.add('nav-item');

            // Création du contenu du li (sans lien)
            listItem.innerHTML = '<span class="nav-link' + (i === 1 ? ' active' : '') + '" id="onglet' + i + '-tab">' + operateurValue + '</span>';

            // Ajout du li à la liste
            listOperateurs.appendChild(listItem);
        }
    }  
    
};

// Création du contenu de la sidebar
function createSidebarContent(feature) {
    
    const listOperateurs = document.querySelector(".liste-operateurs");
    const bntOperateur = document.getElementById("bnt-operateur");
    const bntRetourListe = document.getElementById("bnt-retour-liste");
    const operateurContent = document.getElementById("operateur-content");
    const dataInfos = feature.properties;
    
    operateurContent.innerHTML = '';
    
    //gestion des styles
    listOperateurs.style.display ='block';
    bntOperateur.style.display= 'block';
    bntRetourListe.style.display='none';
    operateurContent.style.display='none';


    // Initialisation du contenu
    listOperateurs.innerHTML = '<div id="nom-programme" class="dep-txt-sidebar"><span><p class="title-card-header">' + dataInfos[`dep`] + '</p></span></div>';

    createListOperateur(feature);
    operateurInfo(feature);
    if (dataInfos['opérateur1'] !== "Le territoire ne possède actuellement pas d'offre de nos partenaires.") {
        bntOperateur.style.display = 'block'; //Si un territoire possède pas de partenaire, alors le bouton ne s'affiche pas. 

        bntOperateur.addEventListener('click', function() {
            //gestion des styles
            operateurContent.style.display='block';
            listOperateurs.style.display ='none';
            bntRetourListe.style.display ='block';
            bntOperateur.style.display ='none';
        });

        bntRetourListe.addEventListener('click', function(){
            //gestion des styles
            bntRetourListe.style.display='none';
            listOperateurs.style.display ='block';
            operateurContent.style.display='none';
            bntOperateur.style.display ='block';

        });
    } else {
        bntOperateur.style.display = 'none';

    }
   
    
    return listOperateurs;
}


///////////////////////////////
// CREATION FICHIERS GEO     //
///////////////////////////////

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
            fillColor: '#e8ded2',
            fillOpacity: 1,
            opacity: 1
        },
        onEachFeature: function (feature, layer) {
            layer.on({
                click: function (e) {
                    // Réinitialiser le style du département précédemment sélectionné
                    if (selectedDepartment) {
                        selectedDepartment.setStyle({
                            fillColor: '#e8ded2',
                            weight: 1
                        });
                    }

                    // Appliquer le style au nouveau département
                    layer.setStyle({
                        color: 'white',
                        fillColor: '#313778',
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
        
    }).addTo(map);

    return layer;
}

// Création fichier geojson : habillage
function createGeoJSONHab(data, map) {
    new L.geoJSON(data, {
        style: {
            color: '#313778',
            weight: 1,
            fillOpacity: 1
        },
    }).addTo(map);
};

// Création fichier geojson : territoires frontaliers 
function createGeoJSONHabBis(data, map) {
    new L.geoJSON(data, {
        style: {
            color: '#e8ded2',
            weight: 1,
            fillOpacity: 0.3,
        },
    }).addTo(map);
};

// Réinitialiser le style lorsqu'un nouveau département est survolé
function handleMouseOver(e) {
    if (selectedDepartment !== this) {
        this.setStyle({
            color: 'white',
            fillColor: '#313778',
            fillOpacity: 1,
            weight: 2
        });
    }
}
// Réinitialiser le style lorsque la souris quitte le département
function handleMouseOut(e) {
    if (selectedDepartment !== this) {
        this.setStyle({
            fillColor: '#e8ded2',
            weight: 1
        });
    }
}

// Réinitialiser le style des départements
function resetDepStyles(depLayerResetStyle) {
    depLayerResetStyle.eachLayer(function (layer) {
        layer.setStyle({
            color: 'white',
            weight: 1,
            fillColor: '#e8ded2',
            fillOpacity: 1,
            opacity: 1
        });
    });
    // Réinitialiser le style du département sélectionné
    if (selectedDepartment) {
        selectedDepartment.setStyle({
            color: 'white',
            weight: 1,
            fillColor: '#e8ded2',
            fillOpacity: 1,
            opacity: 1
        });
    }
}


//Creation de la searchBar
function createSearchBar(data, map){
    //Ajour d'une barre de recherche par département
    var searchControl = new L.Control.Search({
        layer: data,
        propertyName: 'dep',
        marker: false,
        textPlaceholder: 'Rechercher un département',
        position: 'topleft'
    });

    searchControl.on('search:collapsed', function () {
        resetDepStyles(data);
    });

    //Au résultat, on zoom sur les limites du départements recherché puis on y applique le style du departement sélectionné
    searchControl.on('search:locationfound', function (e) {

        var selectedFeature = e.layer;

        // Réinitialiser le style des départements précédemment sélectionnés
        resetDepStyles(data);

        // Appliquer le nouveau style au département sélectionné
        selectedFeature.setStyle({
            color: 'white',
            fillColor: '#313778',
            fillOpacity: 1,
            weight: 1
        });        
        selectedFeature.fire('click');

    });

    //Ajouter le controle de la search bar sur la carte
    map.addControl(searchControl);

}

/* -------------------------------------------------------------------------- */
/*                        CREATION OBJETS PRINCIPAUX                          */
/* -------------------------------------------------------------------------- */

/* --------------- */
/*     CARTE      */
/* -------------- */
var mymap = L.map('map');

// bloquer le déplacement de la carte de gauche à droite
mymap.dragging.disable();

//Niveau de zoom : Min & Max
mymap.setMinZoom(5);
mymap.setMaxZoom(7);

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

/* -------------------------------- */
/*        COUCHES DE DONNNEES       */
/* -------------------------------- */
//chargement des données des départements métropole+drom
const fthdInit = loadData("data/geom/data_dep.geojson");

// // Ajout d'une nouvelle couches d'habillages
const contoursOutreMer = loadData("data/geom/contours_outre_mer.geojson");
const contoursIleReprojete = loadData("data/geom/contours_iles_reprojetees.geojson");
const territoiresFrontaliers= loadData("data/geom/territoires_frontaliers.geojson");

// Création couche principale
Promise.all([fthdInit]).then(([fthdLayer]) => {
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
                // Autres actions à effectuer lors du clic sur un élément de la classe sidebar-button
            }
        });
    }
});

// Création couches contours DROM COM 
Promise.all([contoursOutreMer, contoursIleReprojete]).then(([contoursOutreMerLayer, contoursIleReprojeteLayer]) => {
    createGeoJSONHab(contoursOutreMerLayer, mymap);
    createGeoJSONHab(contoursIleReprojeteLayer, mymap);
});

// Création couche territoires frontaliers 
Promise.all([territoiresFrontaliers]).then(([territoiresFrontaliersLayer]) => {
    createGeoJSONHabBis(territoiresFrontaliersLayer, mymap);
});


