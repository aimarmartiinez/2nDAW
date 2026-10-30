# TODO 0 - `TaskFormData`

## Solucio

```ts
export interface TaskFormData {
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  category: string
}
```

## Explicacio linia a linia

- `export interface TaskFormData`:
  defineix una interfase exportada que altres fitxers poden importar.
- `title: string`:
  guarda el titol de la tasca com a text.
- `description: string`:
  guarda la descripcio opcional de la tasca.
- `priority: 'low' | 'medium' | 'high'`:
  limita la prioritat als tres valors permesos.
- `dueDate: string`:
  desa la data de venciment en format text.
- `category: string`:
  desa la categoria seleccionada pel formulari.

## Resum

Aquesta interfase defineix l'estructura exacta de les dades del formulari i evita errors de tipatge al `TaskForm`.

