---
name: git-workflow
description: Flujo de commits y push en este proyecto. Úsalo cuando vayas a hacer commit o push, o cuando el comando `git commit -m "$(cat <<'EOF'...)"` (heredoc) falle.
---

# Git workflow — ebecerra-web

## Workaround obligatorio para commits

El heredoc `git commit -m "$(cat <<'EOF'...)"` **falla en este entorno**. Usa siempre este flujo:

```bash
# 1. Escribir el mensaje con la herramienta Write a un archivo temporal
#    (ej: commit-msg.txt en la raíz del proyecto)

# 2. Commit + limpieza
git commit -F commit-msg.txt && rm commit-msg.txt

# 3. Push inmediato
git push
```

## Reglas

- **Idioma:** mensajes en español.
- **Estilo:** descriptivos, en imperativo ("Añadir X", "Corregir Y", "Migrar Z").
- **Autonomía:** push inmediato tras cada commit, sin pedir aprobación previa.
- **Granularidad:** commits frecuentes, no acumular cambios grandes.
- **Co-autoría:** añadir al final del mensaje:
  ```
  Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
  ```

## Anti-patrones

- No usar `git commit --amend` salvo petición explícita del usuario.
- No usar `--no-verify` ni saltar hooks.
- No usar `git add -A` — añadir archivos por nombre específico para evitar incluir secretos o binarios grandes por error.
