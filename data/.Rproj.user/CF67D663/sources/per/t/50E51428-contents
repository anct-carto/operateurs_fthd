# I Chargement des librairies -----------
library(sf)
library(rgdal)
library(tidyverse)
library(readxl)
library(writexl)
library(RSQLite)
library(here)

#chargement des données initiales ---- 
geom_init<-st_read("N://DST/Carto/INTERACTIVITE/fthd_operateurs/data/geom/source/geom_dep_com.geojson")



data_init<-read_excel("N://DST/Carto/INTERACTIVITE/fthd_operateurs/data/Fichier carto_Cohésion numérique.xlsx")%>%
  rename("insee_dep"="INSEE dptmt")%>%
  rename("dep"="Département")%>%
  rename("Logo1"="Logo")%>%
  rename("Logo7"="logo7")%>%
  rename("prise_encharge1"="Prise en charge supérieure à 300€ (sous conditions de ressources)")%>%
  rename("prise_encharge2"="Prise en charge supérieure à 300€ (sous conditions de ressources)2")%>%
  rename("prise_encharge3"="Prise en charge supérieure à 300€ (sous conditions de ressources)3")%>%
  rename("prise_encharge4"="Prise en charge supérieure à 300€ (sous conditions de ressources)4")%>%
  rename("prise_encharge5"="Prise en charge supérieure à 300€ (sous conditions de ressources)5")%>%
  rename("prise_encharge6"="Prise en charge supérieure à 300€ (sous conditions de ressources)6")%>%
  rename("prise_encharge7"="Prise en charge supérieure à 300€ (sous conditions de ressources)7")%>%
  mutate(insee_dep = ifelse(nchar(insee_dep) == 1, paste0("0", insee_dep), insee_dep))


data<-data_init

#Je viens modifier les chemins des images indiquées dans le tableur initial 
# Définir les correspondances entre opérateurs et logos----
correspondances <- list(
  SFR = "img/Logo_SFR.png",
  Dyrun = "img/Logo_DYRUN.png",
  APINET = "img/Logo_APINET.png",
  Dauphin = "img/Logo_Dauphin.png",
  Nordnet = "img/Logo_Nordnet.png",
  Numerisat = "img/Logo_Numerisat.png",
  Orange = "img/Logo_Orange.png",
  Outremer = "img/Logo_Outremer.png",
  Skysat = "img/Logo_Skysat.png",
  STOI = "img/Logo_STOI.png",
  Weaccess = "img/Logo_Weaccess.png",
  Xankom = "img/Logo_Xankom.png"
)

# Boucle pour parcourir chaque paire de colonnes "opérateur" et "logo"
for (i in 1:7) {
  operateur_col <- paste0("opérateur", i)
  logo_col <- paste0("Logo", i)
  
  data<- data %>%
    mutate({{logo_col}} := case_when(
      .data[[operateur_col]] == "SFR" ~ correspondances$SFR,
      .data[[operateur_col]] == "SRR" ~ correspondances$SFR,
      .data[[operateur_col]] == "Dyrun" ~ correspondances$Dyrun,
      .data[[operateur_col]] == "Apinet" ~ correspondances$APINET,
      .data[[operateur_col]] == "Dauphin Télécom" ~ correspondances$Dauphin,
      .data[[operateur_col]] == "Nordnet" ~ correspondances$Nordnet,
      .data[[operateur_col]] == "Numérisat" ~ correspondances$Numerisat,
      .data[[operateur_col]] == "Orange" ~ correspondances$Orange,
      .data[[operateur_col]] == "Outremer Télécom" ~ correspondances$Outremer,
      .data[[operateur_col]] == "SKYSAT" ~ correspondances$Skysat,
      .data[[operateur_col]] == "STOI" ~ correspondances$STOI,
      .data[[operateur_col]] == "Weaccess Group" ~ correspondances$Weaccess,
      .data[[operateur_col]] == "Xankom" ~ correspondances$Xankom,
      
      TRUE ~ .data[[logo_col]]
    ))
}



#Je vais venir joindre les données des opérateur à ma couche geojson---- 
data_geom<-geom_init%>%
  left_join(data, by="insee_dep")



#export de la nouvelle couche de données
st_write(obj = data_geom,
         dsn = ("N://DST/Carto/INTERACTIVITE/fthd_operateurs/data/geom/data_dep.geojson"),
         driver = "GeoJSON", delete_layer = T, append = F)
