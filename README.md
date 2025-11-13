# Create Cursor Rule from Selection

> [!NOTE]
> This is not an official Cursor extension. It's a hobby project created by an individual and is not affiliated with or endorsed by Cursor.

A Cursor extension that helps you quickly create Cursor project rules (`.mdc` files) from selected text or terminal output. Simply select text in your editor or terminal, and the extension will open Cursor chat with a comprehensive prompt to generate a properly scoped rule file.

## Features

- **Quick Rule Creation**: Select text in editor or terminal and create a rule with one command
- **Smart Prompting**: Automatically generates a comprehensive prompt following Cursor best practices
- **Proper Scoping**: Guides the AI to create rules with appropriate `globs`, `alwaysApply`, and nested directory placement
- **Context-Aware**: Works with both editor selections and terminal output

## Usage

1. **From Editor**: Select text in any editor, right-click, and choose "Create Cursor Rule from Selection"
2. **From Terminal**: Select text in the terminal, right-click, and choose "Create Cursor Rule from Selection"
3. **From Clipboard**: If no text is selected, the extension will try to use clipboard content

The extension will:

- Open Cursor chat
- Paste a comprehensive prompt for creating the rule
- Guide the AI to generate a properly formatted `.mdc` file with appropriate metadata

## Requirements

- Cursor IDE (for the chat functionality)

## Extension Settings

This extension contributes the following command:

- `cursor-rules.createFromSelection`: Create a Cursor rule from the current selection

## Installation

### From VSIX File (Recommended)

1. Download the `cursor-create-rule-from-selection-0.0.#.vsix` file from the [GitHub repository](https://github.com/natemcgrady/cursor-rule-extension)
2. Install the extension using Cursor:
   ```bash
   cursor --install-extension cursor-create-rule-from-selection-0.0.#.vsix
   ```

### From Cursor Marketplace (hopefully coming soon)

1. Open Cursor
2. Go to Extensions view (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Create Cursor Rule from Selection"
4. Click Install

## License

MIT

## Customizing the Prompt

The extension uses a prompt template file to generate the instructions sent to Cursor chat. You can customize this prompt to better suit your needs.

### How to Modify the Prompt

1. **Locate the prompt template file**: `prompt-template.md` (in the extension root directory)

2. **Edit the template**: Open `prompt-template.md` and modify the prompt text as needed. The template uses `{{INPUT_TEXT}}` as a placeholder that will be replaced with the selected text.

3. **Rebuild the extension**: After making changes, rebuild the extension:

   ```bash
   npm run build
   ```

4. **Reload the extension**: In Cursor, press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) and run "Developer: Reload Window" to apply your changes.

### Prompt Template Structure

The prompt template is a Markdown file that contains instructions for the AI. Key points:

- Use `{{INPUT_TEXT}}` as a placeholder for where the selected text will be inserted
- The template should guide the AI to create properly formatted `.mdc` rule files
- You can customize the instructions, examples, and formatting requirements

### Example Customization

If you want to add specific requirements or change the output format, simply edit `prompt-template.md`. For example, you could:

- Add project-specific conventions
- Modify the rule structure requirements
- Change the file naming conventions
- Add additional validation steps

After editing, remember to rebuild and reload the extension for changes to take effect.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
