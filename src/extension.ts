import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

async function openChatAndPasteText(text: string): Promise<void> {
  // Save current clipboard to restore later
  let savedClipboard = "";
  try {
    savedClipboard = await vscode.env.clipboard.readText();
  } catch {
    // Ignore clipboard read errors
  }

  await vscode.env.clipboard.writeText(text);

  // Open chat window, delay for UI to be ready, and restore clipboard if fails
  try {
    await vscode.commands.executeCommand("composer.newAgentChat");
    await new Promise((resolve) => setTimeout(resolve, 100));
  } catch {
    if (savedClipboard) {
      await vscode.env.clipboard.writeText(savedClipboard);
    }
    vscode.window.showErrorMessage(
      "Could not open chat. Please open chat manually and paste the text."
    );
    return;
  }

  await vscode.commands.executeCommand("editor.action.clipboardPasteAction");

  // Restore original clipboard after paste completes (non-blocking)
  setTimeout(async () => {
    if (savedClipboard) {
      try {
        await vscode.env.clipboard.writeText(savedClipboard);
      } catch {
        // Ignore clipboard write errors during restore
      }
    }
  }, 1000);
}

export function activate(context: vscode.ExtensionContext) {
  const cmd = vscode.commands.registerCommand(
    "cursor-rules.createFromSelection",
    async () => {
      let text = "";

      const editor = vscode.window.activeTextEditor;
      if (editor && !editor.selection.isEmpty) {
        text = editor.document.getText(editor.selection).trim();
      }

      if (!text) {
        let savedClipboard = "";
        try {
          savedClipboard = await vscode.env.clipboard.readText();
        } catch {
          // Ignore clipboard read errors
        }

        try {
          await vscode.commands.executeCommand(
            "workbench.action.terminal.copySelection"
          );
        } catch {
          // Ignore terminal copy errors
        }
        await new Promise((resolve) => setTimeout(resolve, 200));

        let newClipboard = "";
        try {
          newClipboard = await vscode.env.clipboard.readText();
        } catch {
          // Ignore clipboard read errors
        }
        if (newClipboard) {
          const trimmed = newClipboard.trim();
          if (
            trimmed &&
            (trimmed !== savedClipboard.trim() || !savedClipboard.trim())
          ) {
            text = trimmed;
          } else if (savedClipboard && savedClipboard.trim()) {
            text = savedClipboard.trim();
          }
        }
      }

      if (!text) {
        vscode.window.showWarningMessage(
          "No text selected. Please select text in an editor or terminal."
        );
        return;
      }

      // Load prompt template from file
      let promptTemplate = "";
      try {
        const promptPath = path.join(
          context.extensionPath,
          "src",
          "prompt-template.md"
        );
        promptTemplate = fs.readFileSync(promptPath, "utf8");
      } catch (error) {
        vscode.window.showErrorMessage(
          `Failed to load prompt template: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
        return;
      }

      // Replace placeholder with actual text
      const prompt = promptTemplate.replace("{{INPUT_TEXT}}", text);

      await openChatAndPasteText(prompt);
    }
  );

  context.subscriptions.push(cmd);
}

export function deactivate() {}
