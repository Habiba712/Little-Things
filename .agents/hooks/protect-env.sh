#!/bin/sh

# Read the event payload provided by the tool.
INPUT=$(cat)

# Extract the requested file path from the JSON payload.
# Requires jq to be installed.
FILE_PATH=$(printf '%s' "$INPUT" | jq -r '
  .file_path //
  .path //
  .filePath //
  empty
' 2>/dev/null)

# Refuse access to environment files.
case "$(basename "$FILE_PATH")" in
  .env|.env.*)
    echo "BLOCKED: Access to environment files is restricted." >&2
    exit 2
    ;;
esac

# Allow other file reads.
exit 0