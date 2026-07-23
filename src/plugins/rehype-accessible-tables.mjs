export default function accessibleTables() {
  return (tree) => {
    const visit = (node) => {
      if (node?.type === 'element' && node.tagName === 'table') {
        node.properties ??= {};
        node.properties.tabIndex = 0;
        node.properties.ariaLabel = 'Scrollable data table';
      }

      // Code blocks scroll horizontally on narrow viewports; a scrollable
      // region must be keyboard-focusable (axe: scrollable-region-focusable).
      if (node?.type === 'element' && node.tagName === 'pre') {
        node.properties ??= {};
        node.properties.tabIndex = 0;
      }

      for (const child of node?.children ?? []) visit(child);
    };

    visit(tree);
  };
}
