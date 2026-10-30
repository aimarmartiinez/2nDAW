# Exercici 3 - Diari (estructura de components)

## Referencia triada
Portada tipica d'un diari digital (header + menu + noticia destacada + llistat de noticies + sidebar + footer).

## Estructura de components (proposta)
- `DiariPage`
  - `Header` (logo + cercador + boto login)
  - `Nav` (seccions)
  - `Layout`
    - `Main`
      - `NoticiaCard` (reutilitzable)
      - `NoticiaDestacada` (una `NoticiaCard` mes gran)
      - `GridNoticies` (llista de `NoticiaCard`)
    - `Sidebar`
      - `WidgetTemps`
      - `WidgetMesLlegides`
  - `Footer`

## On esta fet al codi
Fitxers principals:
- `src/diari/DiariPage.tsx`
- `src/diari/diari.css`
