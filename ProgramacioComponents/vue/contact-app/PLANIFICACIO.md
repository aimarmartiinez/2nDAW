# 📝 Planificació del Projecte: Gestió de Contactes (RA2)

## 🚀 Fase 1: Configuració i Models de Dades
- [x] Configurar l'entorn de l'API: Instal·lar `json-server` i crear `db.json`.
- [x] Definir els models de dades: Crear `src/data/types.ts` amb les interfícies `Contacte`, `Grup` i `Historial`.
- [x] Implementar el servei d'API: Crear les funcions per fer les crides (Fetch/Axios).

## 🎨 Fase 2: Disseny i Estructura Base
- [x] Definir el sistema de disseny: Crear `main.css` amb variables CSS per a colors, ombres i tipografia.
- [x] Establir el Layout: Crear la barra inferior (navbar) i el contenidor principal.
- [x] Configurar el Router: Definir les rutes principals (Contactes, Grups, Estadístiques).

## 📁 Fase 3: Gestió de Grups (CRUD)
- [x] Llistat de Grups: Mostrar els grups disponibles amb els seus colors.
- [x] Formulari de Grup: Implementar la creació i edició de grups.
- [x] Eliminació de Grups: Afegir confirmació abans d'eliminar.

## 👤 Fase 4: Gestió de Contactes (CRUD)
- [x] Formulari de Contacte: Implementar `v-model` per a tots els camps.
- [x] Validacions de dades:
    - [x] Nom obligatori i cognoms (mínim 2 caràcters).
    - [x] Telèfon format internacional E.164.
    - [x] Correu electrònic amb format correcte.
    - [x] Control de telèfons duplicats.
- [x] Generació d'Avatars: Crear avatars automàtics amb les inicials si no hi ha foto.
- [x] Eliminació de Contactes: Implementar confirmació de seguretat.

## 🔍 Fase 5: Llistat, Filtres i Cerques
- [x] Llistat Dinàmic: Mostrar contactes ordenats alfabèticament amb `v-for`.
- [x] Cercador en temps real: Filtrar per nom o cognom.
- [x] Filtres per Grup: Filtrar els contactes segons el grup seleccionat.
- [ ] Ordenació: Alternar entre ordre alfabètic i data d'afegiment.

## 📊 Fase 6: Estadístiques i Funcions Avançades
- [x] Propietats Computades (`computed`):
    - [x] Total de contactes per grup.
    - [x] Contactes recents (últims 7 dies).
    - [x] Extracció dinàmica de grups des de les dades.
- [x] Gestió de Favorits: Marcar/desmarcar contactes com a preferits.
- [ ] Historial: Mostrar el registre de crides i missatges.

## ✨ Fase 7: Poliment i UX Premium
- [ ] Animacions: Afegir transicions suaus en els llistats i modals.
- [ ] Disseny Responsive: Assegurar que l'app es vegi bé en mòbils i tauletes.
- [ ] Revisió final: Verificar que es compleixen tots els requisits de l'enunciat.
