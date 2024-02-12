# I Chargement des librairies -----------
library(sf)
library(rgdal)
library(tidyverse)
library(readxl)
library(writexl)
library(RSQLite)
library(here)



geom_init<-st_read(here("geom/source/centroide_fr_drom_com.gpkg"), layer="cheflieu-reg")

dep_init <-st_read("N://DST/Carto/INTERACTIVITE/fthd_operateurs/data/geom/source/fr-drom-4326-pur-style1-dep.geojson")

#modification de la projection  des données
geom_cheflieu <- st_transform(geom_init, crs = st_crs(4326))

#Chargement des fichiers des iles 
st_bart_init<-st_read("geom/source/st-barth.gpkg")
st_martin_init<-st_read("geom/source/st-martin.gpkg")
st_pierre_et_miquelon_init<-st_read("geom/source/st_pierre_et_miquelon.gpkg")

#couche des contours des iles
contours_iles_init<-st_read("geom/source/contours_iles.geojson")

#couche des territoires frontaliers en min 
ter_front_init<- st_read("geom/source/territoire-frontalier-fra-4326-pur.geojson")

#couche habillage Guyane
hab_guyane_init<- st_read("geom/source/hab_guyane_src.geojson")


#Modification de la projection des données 
dep<-st_transform(dep_init, crs = st_crs(4326))
st_bart<-st_transform(st_bart_init, crs = st_crs(4326))
st_martin<-st_transform(st_martin_init, crs = st_crs(4326))
st_pierre_et_miquelon<-st_transform(st_pierre_et_miquelon_init, crs = st_crs(4326))

contours_iles_reprojetees<-st_transform(contours_iles_init, crs=st_crs(4326))

ter_front<-st_transform(ter_front_init, crs=st_crs(4326))

hab_guyane<-st_transform(hab_guyane_init, crs=st_crs(4326))

#Creation d'une nouvelle couche qui contient tous les departements et les iles du programme
geom_st_martin<- st_martin%>%
  summarise(insee_dep="978", insee_reg="", geometry = st_union(geom))

geom_st_bart<-st_bart%>%
  summarise(insee_dep="977", insee_reg="", geometry = st_union(geom))

geom_st_pierre_et_miquelon<-st_pierre_et_miquelon%>%
  summarise(insee_dep="975", insee_reg="", geometry = st_union(geom))


#on vient regrouper l'ensemble de nos geometries dans un seul et même geojson
geom_final<- rbind(dep, geom_st_martin, geom_st_bart, geom_st_pierre_et_miquelon)


#Export des données transformées 
st_write(obj = geom_cheflieu,
         dsn = here(paste0("geom/chef_lieu_reg.geojson")),
         driver = "GeoJSON", delete_layer = TRUE, append = FALSE)

st_write(obj = geom_final,
         dsn = here(paste0("geom/source/geom_dep_com.geojson")),
         driver = "GeoJSON", delete_layer = TRUE, append = FALSE)


st_write(obj = contours_iles_reprojetees,
         dsn = here(paste0("geom/contours_iles_reprojetees.geojson")),
         driver = "GeoJSON", delete_layer = TRUE, append = FALSE)

st_write(obj = ter_front,
         dsn = here(paste0("geom/territoires_frontaliers.geojson")),
         driver = "GeoJSON", delete_layer = TRUE, append = FALSE)

st_write(obj = hab_guyane,
         dsn = here(paste0("geom/habillage_guyane.geojson")),
         driver = "GeoJSON", delete_layer = TRUE, append = FALSE)

