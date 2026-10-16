---
name: "source-command-adapt-client-section"
description: "Adapt a selected client-website section as content only, designing it with this project's design system (do not copy the client's layout/styles)."
---

# source-command-adapt-client-section

Use this skill when the user asks to run the migrated source command `adapt-client-section`.

## Command Template

# Adapt client section (content → our design)

I am going to select a section from the client's existing website using the browser DOM inspector.

This section/content exists on the client's website, but it does **not** exist on the reference website we are cloning.

Your task is to **use the selected client section as the CONTENT SOURCE only**, while designing the section according to the **new website's design system**.

### Important rule

**Do NOT copy the client's existing design.**

The client's website is only providing:

* Content
* Text
* Information
* Images/assets if relevant
* Data/numbers
* Section purpose and meaning

The **design must come from our new website**, not from the client's old website.

### Design approach

Before implementing the section:

1. Inspect the selected client section carefully and understand:

   * What information it communicates
   * Its purpose
   * Content hierarchy
   * Important headings
   * Supporting text
   * Numbers/statistics
   * Cards/items
   * Images or other assets

2. Inspect the existing pages/sections of our new website and identify the established design language:

   * Typography
   * Font sizes and weights
   * Colors and CSS variables
   * Spacing
   * Container widths
   * Border radius
   * Cards
   * Buttons
   * Icons
   * Section backgrounds
   * Grid/flex layouts
   * Visual hierarchy
   * Responsive behavior
   * Existing reusable components

3. Design the selected content as if **it was originally created for our new website**.

4. The new section should feel like a natural part of the website. A user should NOT feel that this section came from a different website.

### Reuse existing design

Prefer reusing existing:

* Components
* UI patterns
* CSS variables
* Tailwind utilities
* Typography styles
* Buttons
* Cards
* Containers
* Section layouts

Do not create a completely unrelated visual style just because this content is new.

If an existing component can reasonably represent the content, reuse it.

If the content requires a new component, create one that follows the same design language and component structure as the rest of the website.

### Do not blindly reproduce the old section

Do NOT:

* Copy the client's layout
* Copy their colors if they conflict with our design
* Copy their typography
* Copy their spacing
* Copy their card design
* Copy their navigation/UI patterns
* Reproduce their section pixel-for-pixel

Instead, preserve the **meaning and useful content** while translating it into our website's visual language.

### Content preservation

Do not unnecessarily rewrite or remove the client's content.

Keep the important information intact, but you may:

* Rearrange content
* Group related information
* Split content into cards
* Combine related content
* Change the presentation
* Change the layout
* Improve hierarchy
* Shorten repetitive UI text when appropriate

The goal is:

**Client website → Content**

**Reference/new website → Design language**

**You → Combine them into one cohesive section**

### Responsive design

The section must follow the responsive behavior of the rest of our website.

Do not simply make the desktop layout smaller on mobile.

Use the existing project's responsive patterns and breakpoints. Make sure the content remains readable and visually balanced on desktop, tablet, and mobile.

### Before coding

First explain briefly:

1. What you understood from the selected client section.
2. What content you think should be preserved.
3. Which existing design patterns/components from our website you will reuse.
4. Your proposed layout for this section.

Then implement it.

Do not modify unrelated sections or pages.
Only make the changes necessary to add this section and any required reusable component/styles.

### Extra context

Any text after this command is additional context (target page, placement, component name, notes). Use it if provided.
