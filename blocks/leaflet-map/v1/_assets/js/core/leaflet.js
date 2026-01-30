document.addEventListener('DOMContentLoaded', function () {
    if ( document.getElementById('leafletMap') ) {
        //Generate our map marker
        const mapMarker = L.Icon.extend({
            options: {
                iconSize: [30, 40],
                iconAnchor: [15, 40],
                popupAnchor: [0, 0],  // Overlap popup with marker icon
            }
        });

        const defaultIcon = new mapMarker({ iconUrl: themeURL.themeURL + '/_assets/images/pointer.svg' });

        // Initialize basic map with site options marker
        const mymap = L.map('leafletMap', {
            scrollWheelZoom: false,
            zoomSnap: 0.2,
            zoomDelta: 0.3
        });

        // Add OpenStreetMap tile layer (hidden)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            opacity: 0
        }).addTo(mymap);

        // Set initial view
        mymap.setView([lat, long], 3);

        // Set map view based on current window width
        function setMapViewForWidth() {
            if (window.innerWidth > 1280) {
                mymap.setView([lat, long], 3);
            } else if (window.innerWidth > 768) {
                mymap.setView([lat, long], 2);
            } else {
                mymap.setView([lat, long], 1);
            }
        }

        // Apply responsive view on load
        setMapViewForWidth();

        // Add doodle-border class to all popup content wrappers
        mymap.on('popupopen', function() {
            const popupContentWrappers = document.getElementsByClassName('leaflet-popup-content-wrapper');
            Array.from(popupContentWrappers).forEach(wrapper => {
                wrapper.classList.add('doodle-border');
                wrapper.classList.add('doodle-map-popup');
            });
        });

        // Overlay continents fill (dark green) above tiles - continent-only outlines
        // Using Natural Earth data from GitHub
        fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson')
            .then(response => response.json())
            .then(data => {
                // Group countries by continent
                const continents = {};
                data.features.forEach(feature => {
                    const continent = feature.properties.CONTINENT || 'Unknown';
                    if (!continents[continent]) {
                        continents[continent] = [];
                    }
                    continents[continent].push(feature);
                });
                
                // Create a feature for each continent (countries within same continent grouped)
                const continentFeatures = [];
                Object.keys(continents).forEach(continentName => {
                    const continentCountries = continents[continentName];
                    continentCountries.forEach(country => {
                        continentFeatures.push(country);
                    });
                });
                
                // Filter out Antarctica
                const filteredData = {
                    ...data,
                    features: data.features.filter(feature => {
                        const name = feature.properties.NAME || '';
                        const continent = feature.properties.CONTINENT || '';
                        return name !== 'Antarctica' && continent !== 'Antarctica';
                    })
                };
                
                // Render all countries with green fill and same color borders to hide internal borders
                L.geoJSON(filteredData, {
                    style: {
                        fillColor: '#105E33',
                        fillOpacity: 1,
                        color: '#105E33',  // Same color as fill to hide internal country borders
                        weight: 4,
                        smoothFactor: 4
                    },
                    interactive: false
                }).addTo(mymap);
            })
            .catch(error => {
                console.error('Error loading Natural Earth data:', error);
            });

        // Create a feature group to hold all markers
        const markersGroup = L.featureGroup().addTo(mymap);

        // Add site options marker
        const siteMarker = L.marker([lat, long], { icon: defaultIcon });
        siteMarker.bindPopup("<b>" + title + "</b>", {autoClose: false}).openPopup();
        markersGroup.addLayer(siteMarker);

        if (typeof (areasglobal) != 'undefined' && areasglobal != null) {
            if (areasglobal.areasCovered) {
                const request = new XMLHttpRequest();
                const mapPointsUrl = areasglobal.areas_api;

                request.open('GET', mapPointsUrl, true);

                request.onload = function (i) {
                    if (request.status >= 200 && request.status < 400) {
                        // Success!
                        const data = JSON.parse(request.responseText);

                        if (data) {
                            data.forEach(data => {
                                if (data.lat && data.long) {
                                    // Foreach location, add a map marker
                                    const marker = L.marker([data.lat, data.long], { icon: defaultIcon });

                                    // Add link to location page
                                    if (data.status == 'publish') {
                                        marker.bindPopup("<b>" + data.title + "</b><br/>" + "<a class='block mt-1' href='" + data.url + "'>View Location</a>");
                                    } else {
                                        marker.bindPopup("<b>" + data.title + "</b>");
                                    }
                                    markersGroup.addLayer(marker);
                                }
                            });
                            
                            // Center the map on the main marker after adding locations
                            window.addEventListener('resize', () => {
                                setMapViewForWidth();
                            });
                            
                            // Force the main location's popup to open
                            setTimeout(() => {
                                siteMarker.openPopup();
                            }, 100);
                        }
                    }
                };

                request.onerror = function () {
                    // There was a connection error of some sort
                };

                request.send();
            } else {
                // const markersGroup = L.featureGroup().addTo(mymap);
                
                // // Add markers to the group
                // const siteMarker = L.marker([lat, long], { icon: defaultIcon });
                // siteMarker.bindPopup("<b>" + title + "</b>");
                // markersGroup.addLayer(siteMarker);
                
                // const marker = L.marker([lat, long], { icon: defaultIcon });
                // marker.bindPopup("<b>" + title + "</b>").openPopup();
                // markersGroup.addLayer(marker);

                // // Set the view to the marker's position (zoom level is adjusted for SVG)
                // mymap.setView([lat, long], 7.7);
            }

            //remove attribution
            document.getElementsByClassName('leaflet-control-attribution')[0].style.fontSize = '0px';
        }
    }
});