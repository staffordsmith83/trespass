# Trespass

The Idea: When you are exploring around remote areas, it is often tempting to go down an ephemeral track. But is that private property? Who owns the land? This app uses an old (but mostly in date!) copy of the West Australian Governments Cadastral dataset to show you the ownership type of the land surrounding your location.

The dataset is hosted on my personal Geoserver, and the IP of this will be obscured. This is because the dataset must be purchased.


## Geoserver Setup

I will provide a docker image of the geoserver later.
For now, you need to have Geoserver serving a layer called 'CadastrePolygonLGATE_217_1' in a workspace called 'trespass'


## Angular setup

Enter the web address of your geoserver in the environment file, then:

```
npm install
ng serve -o
```

