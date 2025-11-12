Create a **Cursor Project Rule** based on the following text. Your goal is to generate a focused, actionable, and properly scoped `.mdc` rule that follows Cursor best practices.

### What to produce

1. **Filename**

   - Pick a concise, descriptive kebab-case filename ending in `.mdc` (e.g., `enforce-react-component-naming.mdc`).

2. **Rule Type & Metadata (front-matter)**

   - Choose the **appropriate rule type** based on the input:
     - **Always Apply**: only if the guidance is universally safe and low-risk across all chats and cmd-k.
     - **Apply Intelligently**: if applicability depends on context; let the Agent infer usage from `description`.
     - **Apply to Specific Files**: if it targets certain paths or file types; include `globs`.
     - **Apply Manually**: if it's situational or potentially intrusive; intended to be @-mentioned.
   - Include **front-matter** keys at the top:
     ```yaml
     ---
     description: <one-sentence purpose, specific and scannable>
     globs: <omit if none, or provide an array/string of patterns>
     alwaysApply: <true|false> # set true only when truly safe and universal
     ---
     ```
   - If file scoping is implied (e.g., "frontend/components", "backend/server", "_.test.ts"), **populate `globs`** accordingly (e.g., `frontend/**`, `backend/server/**`, `\*\*/_.test.ts`).

3. **Placement (nested rules)**

   - Choose the most specific directory for the rule:
     - Prefer a nested `.cursor/rules/` under the relevant area when the text implies scope:
       ```
       project/
         .cursor/rules/                  # project-wide if no specific scope
         frontend/.cursor/rules/         # if clearly frontend
         backend/server/.cursor/rules/   # if clearly backend/server
       ```
   - Output the final save path as:
     - `.cursor/rules/{best-filename}.mdc` for project-wide rules, **or**
     - `<inferred-scope>/.cursor/rules/{best-filename}.mdc` if a scoped path is evident.

4. **Content Requirements (keep < 500 lines)**

   - Be **focused**: if the rule grows large or covers multiple concerns, **split** into multiple composable rules and name each accordingly.
   - Clearly state:
     - **Purpose** (what this targets).
     - **When it applies** (triggers/conditions; tie back to description/globs).
     - **Actionable guidance** (steps, do/don't lists, commands).
   - Provide **concrete examples**:
     - Inline code blocks and/or **referenced files** using `@` (e.g., `@component-template.tsx`, `@express-service-template.ts`).
   - Avoid vagueness; write like internal docs the Agent can execute.

5. **Patterns & Behaviors**

   - Identify the **pattern / behavior / error** to detect or improve.
   - Specify the **decision criteria** (how the Agent knows to apply it).
   - Include **fix/prevention steps**, codified conventions, or **automation steps** (commands, scripts).

6. **Reuse & Composition**

   - If similar guidance may recur in chats, phrase the rule so it's reusable.
   - If you split rules, ensure each references the others briefly (e.g., "See also: `@link-to-related-rule.mdc`").

7. **AGENTS.md Note (when appropriate)**
   - If the input reads like broad project guidance without patterns or actions, keep the `.mdc` rule **small** and also output a suggested **AGENTS.md** snippet the user could place in the relevant directory (root or nested). Do **not** replace the rule; provide the snippet as an optional addition.

### Output format

- Print the **full `.mdc` file content** (including the YAML front-matter) for each rule you create.
- Then print the **intended save path(s)**.
- If you propose multiple rules, print them **separately** with their own filenames and save paths.
- If relevant, include a short **AGENTS.md** snippet afterward.

### Input

\`\`\`
{{INPUT_TEXT}}
\`\`\`

### Save

- Save to the chosen path:
  - `.cursor/rules/{best-filename}.mdc` for project-wide rules, **or**
  - `<scoped-dir>/.cursor/rules/{best-filename}.mdc` if a scoped path is evident.
