# Rohit Musti

library('tidyverse')
library('jsonlite')

cdata <- read.csv("./completed_raw.csv", skip=1, na.strings=c("", "n/a")) 
cdata <- read.csv("./career_pathways_raw2.csv", skip=1, na.strings=c("", "n/a")) 
  
data <- read.csv("./career_pathways_raw.csv", skip=1, na.strings=c("", "n/a")) 
links <- read.csv("./links_raw.csv", skip=1, na.strings=c("", "n/a")) %>%
  select(c("link", "Org", "Program", "additional.notes", 
           "Notes..age.group..stipend..program.length.")) %>%
  unique()

combined <- full_join(data, links, )

combined <- combined %>%  
  unite('temp', c('Program', 'Org'), na.rm=FALSE, remove=FALSE)

combined <- combined %>%
  filter(combined$temp != "NA_NA") %>%
  select(-c("temp"))

combined <- combined %>%
  separate('Lat.Long', into=c("Lat", "Lon"), sep=",")

cdata <- cdata %>%
  separate('Lat.Long', into=c("Lat", "Lon"), sep=",")


combined$Lat <- as.numeric(combined$Lat)
combined$Lon <- as.numeric(combined$Lon)

cdata$Lat <- as.numeric(cdata$Lat)
cdata$Lon <- as.numeric(cdata$Lon)

combined$otherNotes <- combined$Notes..age.group..stipend..program.length.

combined <- combined %>%
  select(-c("Notes..age.group..stipend..program.length."))

write_json(combined, "career_paths.json")
write_json(cdata, "career_paths.json")

