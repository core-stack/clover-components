export const useTab = () => {
  const openNewTab = (href: string, onCloseTab?: () => void) => {
    const newTab = window.open(href, "_blank");
    if (newTab) {
      const interval = setInterval(() => {
        if (newTab.closed) {
          clearInterval(interval);
          onCloseTab?.();
        }
      }, 500);
    }
  };
  return { openNewTab };
}