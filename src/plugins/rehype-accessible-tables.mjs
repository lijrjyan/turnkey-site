export default function accessibleTables() {
  return (tree) => {
    const visit = (node) => {
      if (node?.type === 'element' && node.tagName === 'table') {
        node.properties ??= {};
        node.properties.tabIndex = 0;
        node.properties.ariaLabel = 'Scrollable data table';
      }

      for (const child of node?.children ?? []) visit(child);
    };

    visit(tree);
  };
}
